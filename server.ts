import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

// Ensure the User-Agent header is set as required in the prompt guides.
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to escape/truncate
  const truncate = (str: string, max = 150) => {
    if (!str) return "No provisto";
    return str.length > max ? str.substring(0, max) + '...' : str;
  };

  // API Route for generating AI recommendation
  app.post("/api/recommendation", async (req, res) => {
    try {
      const { businessData, quizAnswers, scorePercentage, topAreasToReview } = req.body;
      
      if (!businessData || typeof scorePercentage !== 'number') {
        return res.status(400).json({ error: "Invalid payload." });
      }

      const prompt = `
      Eres un asesor experto en cumplimiento sanitario de la empresa Tecnialimentos en Panamá.
      Debes proporcionar una breve y profesional recomendación (máximo 4 párrafos cortos) para este negocio,
      basada en la siguiente información del diagnóstico inicial.
      
      IMPORTANTE: TODO REPORTE DEBE ENTONAR PRUDENCIA. 
      No afirmes incumplimientos legales definitivos. 
      No digas "estás incumpliendo". 
      Usa frases como "podría requerir revisión", "conviene validar", "sería recomendable confirmar", "puede representar una brecha operativa".
      
      Información del negocio:
      - Empresa: ${truncate(businessData.companyName)}
      - Contacto: ${truncate(businessData.contactName)} (${truncate(businessData.role)})
      - Tipo de Negocio: ${truncate(businessData.businessType)}
      - Estado actual: ${truncate(businessData.businessState)}
      - Ubicación: ${truncate(businessData.district)}, ${truncate(businessData.province)}
      
      Resultado del Diagnóstico:
      - Puntaje: ${scorePercentage}%
      - Áreas que requieren mayor atención: ${(topAreasToReview || []).join(', ')}
      
      Escribe en formato Markdown, con subtítulos si es necesario. Da un tono B2B, confiable y como experto/mentor. Sugiere que contactar a Tecnialimentos es el siguiente paso lógico.
      `;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash", 
          contents: prompt,
        });
        res.json({ recommendation: response.text });
      } catch (geminiError) {
        console.error("Gemini Request Failed:", geminiError);
        // Fallback message so frontend doesn't crash functionality if AI quota hits or fails
        res.json({ 
          recommendation: "### Análisis Preliminar\n\nEn base a sus resultados, hemos identificado que cuenta con áreas de oportunidad en su operación actual. Es muy importante validar estos procesos para asegurar un nivel de cumplimiento adecuado ante las normativas en Panamá.\n\nLe sugerimos contactar con un consultor de Tecnialimentos para una revisión estructurada de su caso, lo que le permitirá formalizar su operación con confianza." 
        });
      }
    } catch (error: any) {
      console.error("Recommendation Validation Error:", error);
      res.status(500).json({ error: "Internal server error occurred." }); // hide error.message
    }
  });

  // API Route for capturing Diagnostic Leads
  app.post("/api/diagnostic-lead", async (req, res) => {
    try {
      const { businessData = {}, answers = {}, result = {}, aiRecommendation = "" } = req.body;
      const { contactName, companyName, role, whatsapp, email, province, district, businessType, businessState } = businessData;
      const scorePercentage = result.scorePercentage;
      const diagnosticLevel = result.level;
      const topAreasToReview = result.topAreasToReview || [];
      const breaches = result.breaches || [];
      const commercialTags = breaches.map((b: any) => b.commercialTag) || [];
      const recommendedServices = result.suggestedServices || [];

      // 2. Valida campos mínimos
      if (
        !contactName || 
        !companyName || 
        !whatsapp || 
        !email || 
        !businessType || 
        typeof scorePercentage === 'undefined' || 
        !diagnosticLevel || 
        !topAreasToReview || 
        !commercialTags || 
        !recommendedServices || 
        !aiRecommendation
      ) {
        console.error("Refused to capture lead: Missing validated fields in payload.");
        return res.status(400).json({ error: "Faltan datos obligatorios para el registro del diagnóstico." });
      }

      // Helper to limit string lengths
      const limitStr = (str: any, max = 500) => {
        if (!str) return "";
        const s = String(str);
        return s.length > max ? s.substring(0, max) + "..." : s;
      };

      // 6. Prioridad comercial calculation
      let priorityComercial = "Baja";
      const hasHigh = breaches.some((b: any) => b.priority === 'high');
      const hasMedium = breaches.some((b: any) => b.priority === 'medium');
      if (hasHigh) {
        priorityComercial = "Alta";
      } else if (hasMedium) {
        priorityComercial = "Media";
      }

      // Log directly to console structure ready for monitoring
      console.log("----- NUEVO LEAD DE DIAGNÓSTICO -----");
      console.log(JSON.stringify({ businessData, result, priorityComercial }, null, 2));
      console.log("-------------------------------------");

      let stored = false;

      // 8 & 9 & 10. Google Sheets Integration
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
      const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || "Leads Diagnóstico";

      if (spreadsheetId && clientEmail && privateKey) {
        try {
          const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
          });

          const sheets = google.sheets({ version: "v4", auth });
          
          const rowValues = [
            new Date().toLocaleString("es-PA", { timeZone: "America/Panama" }), // Fecha
            limitStr(contactName),
            limitStr(companyName),
            limitStr(role, 200),
            limitStr(whatsapp, 100),
            limitStr(email, 200),
            limitStr(province, 200),
            limitStr(district, 200),
            limitStr(businessType, 200),
            limitStr(businessState, 200),
            `${scorePercentage}%`,
            diagnosticLevel,
            limitStr(topAreasToReview.join(', '), 1000),
            limitStr(commercialTags.join(', '), 1000),
            limitStr(recommendedServices.join(', '), 1000),
            priorityComercial,
            limitStr(aiRecommendation, 5000),
            JSON.stringify(answers),
            "Diagnóstico gratuito web", // Fuente
            "Nuevo diagnóstico" // Estado comercial
          ];

          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${tabName}!A:T`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [rowValues]
            }
          });
          
          stored = true;
          console.log(`[Google Sheets] Lead registrado exitosamente en la pestaña "${tabName}"`);
        } catch (sheetsError) {
          // 11. Si Google Sheets falla, registrar error solo en consola del servidor, no romper el flujo del usuario.
          console.error("Error al registrar lead en Google Sheets:", sheetsError);
        }
      } else {
        console.warn("[Google Sheets] Configuración incompleta de variables de entorno para Google Sheets.");
      }

      // 12. Responder con stored true/false según guardado
      res.status(200).json({ success: true, stored });
    } catch (error) {
      console.error("Lead Capture Exception:", error);
      // Still send 200 to user flow so they see results without blocking at frontend
      res.status(200).json({ success: true, stored: false }); 
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support React Router fallback if needed
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

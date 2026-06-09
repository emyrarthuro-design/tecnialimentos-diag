import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

function validateEnvironmentConfig() {
  const geminiConfigured = !!process.env.GEMINI_API_KEY;
  const spreadsheetConfigured = !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmailConfigured = !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKeyConfigured = !!process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const tabNameConfigured = !!process.env.GOOGLE_SHEETS_TAB_NAME;

  console.log(`[ENV CHECK] GEMINI_API_KEY: ${geminiConfigured ? "configurada" : "faltante"}`);
  console.log(`[ENV CHECK] GOOGLE_SHEETS_SPREADSHEET_ID: ${spreadsheetConfigured ? "configurada" : "faltante"}`);
  console.log(`[ENV CHECK] GOOGLE_SHEETS_CLIENT_EMAIL: ${clientEmailConfigured ? "configurada" : "faltante"}`);
  console.log(`[ENV CHECK] GOOGLE_SHEETS_PRIVATE_KEY: ${privateKeyConfigured ? "configurada" : "faltante"}`);
  console.log(`[ENV CHECK] GOOGLE_SHEETS_TAB_NAME: ${tabNameConfigured ? "configurada" : 'fallback "Leads Diagnóstico"'}`);
}

validateEnvironmentConfig();

// Ensure the User-Agent header is set as required in the prompt guides.
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "placeholder_for_missing_key",
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

      // Check if GEMINI_API_KEY is configured
      if (!process.env.GEMINI_API_KEY) {
        console.warn("[Gemini] GEMINI_API_KEY faltante. Se retornará el fallback de recomendación.");
        return res.json({ 
          recommendation: "### Análisis Preliminar\n\nEn base a sus resultados, hemos identificado que cuenta con áreas de oportunidad en su operación actual. Es muy importante validar estos procesos para asegurar un nivel de cumplimiento adecuado ante las normativas en Panamá.\n\nLe sugerimos contactar con un consultor de Tecnialimentos para una revisión estructurada de su caso, lo que le permitirá formalizar su operación con confianza." 
        });
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
      const body = req.body || {};

      // 1. Normalización: Soporta tanto estructura "plana" como "anidada" de Tecnialimentos
      let incoming = { ...body };
      if (body.businessData && body.result) {
        incoming.contactName = body.businessData.contactName;
        incoming.companyName = body.businessData.companyName;
        incoming.role = body.businessData.role;
        incoming.whatsapp = body.businessData.whatsapp;
        incoming.email = body.businessData.email;
        incoming.province = body.businessData.province;
        incoming.district = body.businessData.district;
        incoming.businessType = body.businessData.businessType;
        incoming.businessState = body.businessData.businessState;
        
        incoming.scorePercentage = body.result.scorePercentage;
        incoming.diagnosticLevel = body.result.level === 'High' ? 'Alto' : body.result.level === 'Medium' ? 'Medio' : 'Crítico';
        incoming.topAreasToReview = body.result.topAreasToReview || [];
        
        const breachesList = body.result.breaches || [];
        incoming.commercialTags = breachesList.map((b: any) => b.commercialTag) || [];
        incoming.recommendedServices = body.result.suggestedServices || [];
        incoming.detectedBreaches = breachesList.map((b: any) => ({
          breachId: b.breachId,
          commercialTag: b.commercialTag,
          recommendedService: b.recommendedService,
          priority: b.priority,
          category: b.category,
          weight: b.weight,
          critical: b.critical
        }));
        incoming.categoryScores = body.result.categoryScores || [];
        incoming.totalRawScore = body.result.totalRawScore || 0;
        incoming.totalMaxPossibleScore = body.result.totalMaxPossibleScore || 0;
        incoming.aiRecommendation = body.aiRecommendation;
        incoming.answers = body.answers || {};
      }

      const {
        contactName,
        companyName,
        role = "",
        whatsapp,
        email,
        province = "",
        district = "",
        businessType,
        businessState = "",
        scorePercentage,
        diagnosticLevel,
        topAreasToReview,
        commercialTags,
        recommendedServices,
        detectedBreaches = [],
        categoryScores = [],
        totalRawScore = 0,
        totalMaxPossibleScore = 0,
        aiRecommendation,
        answers = {}
      } = incoming;

      // 2. Valida campos mínimos obligatorios
      if (
        !contactName || 
        !companyName || 
        !whatsapp || 
        !email || 
        !businessType || 
        typeof scorePercentage === 'undefined' || 
        !diagnosticLevel || 
        !Array.isArray(topAreasToReview) || 
        !Array.isArray(commercialTags) || 
        !Array.isArray(recommendedServices) || 
        !aiRecommendation
      ) {
        console.warn("Validación fallida en /api/diagnostic-lead. Campos incompletos.");
        return res.status(400).json({
          success: false,
          error: "Payload incompleto para registrar el diagnóstico."
        });
      }

      // Helper para limitar la longitud de los campos string antes de mandarlos a la celda
      const limitStr = (str: any, max = 500) => {
        if (!str) return "";
        const s = String(str);
        return s.length > max ? s.substring(0, max) + "..." : s;
      };

      // 7. Cálculo preciso de Prioridad Comercial
      let priorityComercial = "Baja";
      if (Array.isArray(detectedBreaches) && detectedBreaches.length > 0) {
        const priorities = detectedBreaches.map((b: any) => {
          if (!b) return "";
          if (typeof b === 'string') return b.toLowerCase();
          if (b.priority) return String(b.priority).toLowerCase();
          return "";
        });

        if (priorities.includes("high") || priorities.includes("alta")) {
          priorityComercial = "Alta";
        } else if (priorities.includes("medium") || priorities.includes("media")) {
          priorityComercial = "Media";
        } else if (priorities.includes("low") || priorities.includes("baja")) {
          priorityComercial = "Baja";
        }
      }

      // Registro en consola estructurado
      console.log("----- NUEVO LEAD DE DIAGNÓSTICO -----");
      console.log(`Empresa: ${companyName} | Contacto: ${contactName} | WhatsApp: ${whatsapp}`);
      console.log(`Puntaje: ${scorePercentage}% | Nivel: ${diagnosticLevel} | Prioridad: ${priorityComercial}`);
      console.log("-------------------------------------");

      let stored = false;

      // 8, 9 & 10. Configuración de Google Sheets
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
      const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || "Leads Diagnóstico";

      if (spreadsheetId && clientEmail && privateKey) {
        try {
          // Clean private key from potential quotes and replace escaped newlines
          let cleanedKey = privateKey.trim();
          if (cleanedKey.startsWith('"') && cleanedKey.endsWith('"')) {
            cleanedKey = cleanedKey.substring(1, cleanedKey.length - 1);
          } else if (cleanedKey.startsWith("'") && cleanedKey.endsWith("'")) {
            cleanedKey = cleanedKey.substring(1, cleanedKey.length - 1);
          }
          cleanedKey = cleanedKey.replace(/\\n/g, "\n");

          const auth = new google.auth.JWT({
            email: clientEmail,
            key: cleanedKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
          });

          const sheets = google.sheets({ version: "v4", auth });
          
          // Construye la fila para Google Sheets con las 20 columnas exactas
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
            JSON.stringify({
              answers,
              categoryScores,
              totalRawScore,
              totalMaxPossibleScore,
              detectedBreaches
            }),
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
        } catch (sheetsError: any) {
          // 11. Si Google Sheets falla, registrar el error solo en consola del servidor, no romper el flujo del usuario.
          console.error("Error al registrar lead en Google Sheets:", sheetsError);
          
          const isPermissionError = sheetsError?.message && (
            sheetsError.message.includes("permission") || 
            sheetsError.message.includes("caller does not have permission") ||
            String(sheetsError.status) === "403"
          );

          if (isPermissionError) {
            console.error("==================================================================================================================");
            console.error("[CUIDADO] ALERTA DE CONFIGURACIÓN DE GOOGLE SHEETS: ERROR DE PERMISOS (403)");
            console.error(`La cuenta de servicio "${clientEmail}" NO tiene permisos de acceso al Google Sheet actual.`);
            console.error("CÓMO SOLUCIONARLO:");
            console.error(`1. Abre tu Google Sheet con ID: "${spreadsheetId}"`);
            console.error("2. Haz clic en el botón 'Compartir' (Share) arriba a la derecha.");
            console.error(`3. Agrega el correo de la cuenta de servicio como 'Editor':`);
            console.error(`   👉  ${clientEmail}  👈`);
            console.error("4. Guarda el cambio. ¡Y listo! Vuelve a enviar el diagnóstico para verificar.");
            console.error("==================================================================================================================");
          }
        }
      } else {
        console.warn("[Google Sheets] Configuración incompleta. Lead no almacenado.");
      }

      // responder exitosamente para no romper el flujo del cliente, indicando si se guardó en sheets
      res.status(200).json({ success: true, stored });
    } catch (error) {
      console.error("Lead Capture Exception:", error);
      res.status(200).json({ success: true, stored: false }); 
    }
  });

  // Safe email masking helper for config diagnostics
  function maskEmail(email: string | undefined): string {
    if (!email) return "No provisto";
    const parts = email.split("@");
    if (parts.length !== 2) return "Formato no válido";
    const name = parts[0];
    const domain = parts[1];
    const maskedName = name.length > 5 ? name.substring(0, 5) + "..." : name + "...";
    let maskedDomain = domain;
    if (domain.length > 15) {
      maskedDomain = "..." + domain.substring(domain.length - 15);
    }
    return `${maskedName}@${maskedDomain}`;
  }

  // Diagnostic config-check API endpoint
  app.get("/api/config-check", (req, res) => {
    const geminiConfigured = !!process.env.GEMINI_API_KEY;
    const spreadsheetIdConfigured = !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmailConfigured = !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKeyConfigured = !!process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const ready = spreadsheetIdConfigured && clientEmailConfigured && privateKeyConfigured;
    const clientEmailRaw = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    
    res.json({
      gemini: {
        configured: geminiConfigured
      },
      googleSheets: {
        spreadsheetIdConfigured,
        clientEmailConfigured,
        privateKeyConfigured,
        clientEmailMasked: clientEmailConfigured ? maskEmail(clientEmailRaw) : "No provisto",
        tabName: process.env.GOOGLE_SHEETS_TAB_NAME || "Leads Diagnóstico",
        ready
      }
    });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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

  // API Route for generating AI recommendation
  app.post("/api/recommendation", async (req, res) => {
    try {
      const { businessData, quizAnswers, scorePercentage, topAreasToReview } = req.body;
      
      const prompt = `
      Eres un asesor experto en cumplimiento sanitario de la empresa Tecnialimentos en Panamá.
      Debes proporcionar una breve y profesional recomendación (máximo 4 párrafos cortos) para este negocio,
      basada en la siguiente información del diagnóstico inicial.
      
      IMPORTANTE: TODO REPORTE DEBE ENTONAR PRUDENCIA. 
      No afirmes incumplimientos legales definitivos. 
      No digas "estás incumpliendo". 
      Usa frases como "podría requerir revisión", "conviene validar", "sería recomendable confirmar".
      
      Información del negocio:
      - Empresa: ${businessData.companyName}
      - Contacto: ${businessData.contactName} (${businessData.role})
      - Tipo de Negocio: ${businessData.businessType}
      - Estado actual: ${businessData.businessState}
      - Ubicación: ${businessData.district}, ${businessData.province}
      
      Resultado del Diagnóstico:
      - Puntaje: ${scorePercentage}%
      - Áreas que requieren mayor atención: ${topAreasToReview.join(', ')}
      
      Escribe en formato Markdown, con subtítulos si es necesario. Da un tono B2B, confiable y como experto/mentor. Sugiere que contactar a Tecnialimentos es el siguiente paso lógico.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
      });

      res.json({ recommendation: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Error generating recommendation" });
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

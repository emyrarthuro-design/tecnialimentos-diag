import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Markdown from 'react-markdown';
import { AlertCircle, CheckCircle2, AlertTriangle, MessageCircle, FileText, Settings, Loader2, ShieldCheck } from "lucide-react";
import { BusinessData, DiagnosticResult, AnswerType } from "../types";
import { calculateDiagnosticStatus } from "../utils";

interface ResultScreenProps {
  businessData: BusinessData;
  answers: Record<number, AnswerType>;
}

export function ResultScreen({ businessData, answers }: ResultScreenProps) {
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const calcResult = calculateDiagnosticStatus(answers);
    setResult(calcResult);

    const fetchAiRecommendation = async () => {
      try {
        const response = await fetch('/api/recommendation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessData,
            quizAnswers: answers,
            scorePercentage: calcResult.scorePercentage,
            topAreasToReview: calcResult.topAreasToReview
          })
        });
        const data = await response.json();
        
        const recText = data.recommendation || "No se pudo generar la recomendación en este momento. Por favor, contacte a nuestros asesores.";
        setAiRecommendation(recText);
        
        // Asynchronously save lead data now that we have all context
        fetch('/api/diagnostic-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessData,
            answers,
            result: calcResult,
            aiRecommendation: recText
          })
        }).catch(err => console.error("Lead submission error silently caught", err));
        
      } catch (err) {
        setAiRecommendation("Error de conexión al generar la recomendación. Contacte a soporte si el problema persiste.");
      } finally {
        setLoadingAi(false);
      }
    };

    fetchAiRecommendation();
  }, [answers, businessData]);

  if (!result) return null;

  const { scorePercentage, level, topAreasToReview, suggestedServices } = result;

  const levelConfig = {
    High: {
      color: 'text-green-600',
      bg: 'bg-green-100',
      border: 'border-green-200',
      icon: CheckCircle2,
      label: 'Nivel Alto',
      text: 'Tu operación tiene buen nivel de cumplimiento inicial. Conviene revisar pequeños detalles para mantenimiento.',
      lights: ['border-slate-50 bg-slate-100', 'border-slate-50 bg-slate-100', 'bg-[#25D366] border-green-300 animate-pulse shadow-green-200']
    },
    Medium: {
      color: 'text-amber-500',
      bg: 'bg-amber-100',
      border: 'border-amber-200',
      icon: AlertTriangle,
      label: 'Nivel Medio',
      text: 'Tienes documentación y procesos base, pero hay brechas operativas que sería recomendable confirmar.',
      lights: ['border-slate-50 bg-slate-100', 'bg-amber-400 border-amber-200 animate-pulse shadow-amber-100', 'border-slate-50 bg-slate-100']
    },
    Critical: {
      color: 'text-red-600',
      bg: 'bg-red-100',
      border: 'border-red-200',
      icon: AlertCircle,
      label: 'Revisión prioritaria recomendada',
      text: 'Según tus respuestas, hay áreas importantes que conviene revisar antes de una inspección, apertura, ampliación o trámite sanitario. Esto no significa que exista un incumplimiento definitivo, pero sí indica que sería recomendable validar la situación con orientación técnica.',
      lights: ['bg-red-500 border-red-300 animate-pulse shadow-red-200', 'border-slate-50 bg-slate-100', 'border-slate-50 bg-slate-100']
    }
  };

  const currentLevel = levelConfig[level];

  const whatsappMessage = encodeURIComponent(
    `Hola Tecnialimentos. Acabo de completar el diagnóstico sanitario de mi empresa *${businessData.companyName}* (${businessData.businessType}).\n\n` +
    `*Resultado:* ${scorePercentage}% (${currentLevel.label})\n` +
    `*Principales áreas a revisar:*\n${topAreasToReview.map(a => `- ${a}`).join('\n')}\n\n` +
    `Me gustaría recibir orientación técnica inicial sobre cómo resolver estas brechas operativas.`
  );
  // Using a generic panama number for demo, ideally this comes from env or config.
  const whatsappUrl = `https://wa.me/50766953832?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Informe de Diagnóstico Inicial</h2>
          <p className="text-slate-500">Reporte inicial para {businessData.companyName}</p>
        </div>
        <div className="text-right">
          <span className="block text-xs font-bold text-slate-400 uppercase">Puntaje Total</span>
          <span className={`text-4xl font-black ${currentLevel.color}`}>{scorePercentage}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 shrink-0">
        
        {/* Score Card / Traffic Light */}
        <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Nivel de Cumplimiento</h3>
          <div className="flex flex-col gap-2 mb-4">
            <div className={`w-12 h-12 rounded-full border-4 shadow-lg ${currentLevel.lights[0]}`}></div>
            <div className={`w-12 h-12 rounded-full border-4 shadow-lg ${currentLevel.lights[1]}`}></div>
            <div className={`w-12 h-12 rounded-full border-4 shadow-lg ${currentLevel.lights[2]}`}></div>
          </div>
          <span className={`text-xl font-bold ${currentLevel.color}`}>{currentLevel.label}</span>
          <p className="text-[11px] text-center text-slate-400 mt-2">{currentLevel.text}</p>
        </div>

        {/* AI Recommendations Card */}
        <div className="md:col-span-8 bg-blue-900 text-white p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-700/30 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <ShieldCheck className="w-5 h-5 text-blue-300" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200">Recomendación Personalizada (IA)</h3>
          </div>
          <div className="relative z-10 text-sm text-blue-50 leading-relaxed min-h-[100px] flex-1">
            {loadingAi ? (
              <div className="flex flex-col items-center justify-center h-full space-y-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                <p>Generando análisis experto...</p>
              </div>
            ) : (
              <div className="prose prose-sm prose-invert max-w-none">
                <div className="markdown-body">
                  <Markdown>{aiRecommendation}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alerta Prudente si existe al menos una brecha crítica */}
      {result.breaches?.some(b => b.critical) && (
        <div className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-normal">
            Detectamos al menos un área prioritaria que conviene validar con orientación técnica. Esto no significa un incumplimiento definitivo, pero sí puede ser importante revisarlo antes de una inspección, apertura, ampliación o trámite sanitario.
          </p>
        </div>
      )}

      {/* Resultado por áreas */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider text-left">Resultado por áreas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {result.categoryScores?.map((cat) => (
            <div key={cat.category} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block leading-tight mb-2">
                  {cat.label}
                </span>
              </div>
              <div>
                <div className="mt-2 flex flex-col">
                  {cat.percentage !== null ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-black ${
                          cat.percentage >= 80 ? 'text-green-600' : cat.percentage >= 50 ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {cat.percentage}%
                        </span>
                        <span className="text-xs text-slate-400 font-medium">cumplimiento</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium block mt-1">
                        Puntos: {cat.score} de {cat.maxPossible} aplicables
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 italic">No aplica para este diagnóstico</span>
                  )}
                </div>
                {cat.percentage !== null && (
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        cat.percentage >= 80 ? 'bg-green-500' : cat.percentage >= 50 ? 'bg-amber-400' : 'bg-red-500'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas and Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-0">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Principales áreas a revisar</h3>
            {topAreasToReview.length > 0 ? (
              <div className="space-y-3 overflow-y-auto pr-2">
                {topAreasToReview.map((area, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${level === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                      0{i + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-700">{area}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm p-3">No se detectaron brechas críticas en este diagnóstico inicial.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-0">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Servicios Sugeridos</h3>
            {suggestedServices.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-auto">
                {suggestedServices.map((service, i) => (
                  <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100 transition-colors">
                    {service}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm mb-auto">Nuestros asesores crearán una ruta a su medida.</p>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 mb-4 italic">
                Nota: Este diagnóstico es orientativo y no reemplaza una revisión técnica completa.
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-100 active:scale-[0.98] transition-transform"
              >
                <MessageCircle className="w-6 h-6" />
                Contactar Consultor por WhatsApp
              </a>
            </div>
          </div>
      </div>
    </motion.div>
  );
}

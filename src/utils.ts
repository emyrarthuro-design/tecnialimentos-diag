import { DiagnosticResult, QuizState, AnswerType, DiagnosticBreach } from './types';
import { QUESTIONS, SERVICES } from './data';

export function calculateDiagnosticStatus(answers: Record<number, AnswerType>): DiagnosticResult & { rawScore: number, maxPossible: number } {
  let score = 0;
  let maxPossibleScore = 0;
  
  const weakAreas: { index: number, id: number, text: string, questionText: string, answer: AnswerType }[] = [];
  const breaches: DiagnosticBreach[] = [];

  Object.entries(answers).forEach(([questionId, answerType]) => {
    const id = parseInt(questionId, 10);
    const question = QUESTIONS.find((q) => q.id === id);
    if (!question) return;

    if (answerType === 'Sí') {
      score += 5;
      maxPossibleScore += 5;
    } else if (answerType === 'No estoy seguro' || answerType === 'No') {
      if (answerType === 'No estoy seguro') score += 2;
      else score += 0;
      
      maxPossibleScore += 5;
      weakAreas.push({ index: id, id, text: question.shortText, questionText: question.text, answer: answerType });

      let commercialTag = "General";
      let recommendedService = "Asesoría Sanitaria";
      let priority: 'high' | 'medium' | 'low' = 'low';

      switch(id) {
        case 2:
        case 3:
        case 4:
        case 5:
          commercialTag = "Legal/Permisos";
          recommendedService = "Ruta Licencia Sanitaria 360";
          priority = 'high';
          break;
        case 6:
          commercialTag = "Producto";
          recommendedService = "Ruta Producto en Regla";
          priority = 'high';
          break;
        case 7:
          commercialTag = "Transporte";
          recommendedService = "Ruta Transporte Seguro";
          priority = 'medium';
          break;
        case 9:
          commercialTag = "Ampliación";
          recommendedService = "Ruta Ampliación Comercial";
          priority = 'medium';
          break;
        case 10:
        case 11:
        case 12:
          commercialTag = "Personal/Salud";
          recommendedService = "Jornadas de Personal en Regla";
          priority = 'high';
          break;
        case 13:
          commercialTag = "Capacitación";
          recommendedService = "Capacitación de personal";
          priority = 'medium';
          break;
        case 17:
        case 18:
        case 20:
          commercialTag = "Procesos";
          recommendedService = "Manuales y procedimientos";
          priority = 'medium';
          break;
        case 15:
        case 16:
        case 19:
          commercialTag = "Calidad/Detección";
          recommendedService = "Auditoría sanitaria";
          priority = id === 16 ? 'high' : 'medium'; // Control temperaturas is high
          break;
      }

      breaches.push({
        breachId: id,
        questionText: question.text,
        answer: answerType,
        commercialTag,
        recommendedService,
        priority
      });
    }
  });

  const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
  
  let level: 'High' | 'Medium' | 'Critical' = 'Critical';
  if (percentage >= 80) level = 'High';
  else if (percentage >= 50) level = 'Medium';

  // Find top 3 areas to review based on negative answers (No or No estoy seguro)
  // Sort high priority first
  breaches.sort((a, b) => {
    const pVal = { high: 3, medium: 2, low: 1 };
    return pVal[b.priority] - pVal[a.priority];
  });

  const topAreasToReview = breaches.slice(0, 3).map(b => weakAreas.find(w => w.id === b.breachId)?.text || "Área a revisar");

  // Suggest services based on weak areas
  const suggestedServices = new Set<string>();
  breaches.forEach(b => suggestedServices.add(b.recommendedService));

  if (suggestedServices.size === 0) {
    if (level === 'High') {
      suggestedServices.add("Auditoría sanitaria");
    } else {
      suggestedServices.add("Ruta Licencia Sanitaria 360");
    }
  }

  return {
    scorePercentage: percentage,
    level,
    topAreasToReview,
    suggestedServices: Array.from(suggestedServices).slice(0, 3), // Max 3 services
    breaches,
    rawScore: score,
    maxPossible: maxPossibleScore
  };
}

// Ensure tailwind config correctly merges class names.
// Simple utility for cn() if needed.
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

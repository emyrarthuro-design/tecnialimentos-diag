import { DiagnosticResult, QuizState, AnswerType } from './types';
import { QUESTIONS, SERVICES } from './data';

export function calculateDiagnosticStatus(answers: Record<number, AnswerType>): DiagnosticResult & { rawScore: number, maxPossible: number } {
  let score = 0;
  let maxPossibleScore = 0;
  
  const weakAreas: { index: number, id: number, text: string }[] = [];

  Object.entries(answers).forEach(([questionId, answerType]) => {
    const id = parseInt(questionId, 10);
    const question = QUESTIONS.find((q) => q.id === id);
    if (!question) return;

    if (answerType === 'Sí') {
      score += 5;
      maxPossibleScore += 5;
    } else if (answerType === 'No estoy seguro') {
      score += 2;
      maxPossibleScore += 5;
      weakAreas.push({ index: id, id, text: question.shortText });
    } else if (answerType === 'No') {
      score += 0;
      maxPossibleScore += 5;
      weakAreas.push({ index: id, id, text: question.shortText });
    }
  });

  const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
  
  let level: 'High' | 'Medium' | 'Critical' = 'Critical';
  if (percentage >= 80) level = 'High';
  else if (percentage >= 50) level = 'Medium';

  // Find top 3 areas to review based on negative answers (No or No estoy seguro)
  // Just take the first 3 for simplicity or we can prioritize
  const topAreasToReview = weakAreas.slice(0, 3).map((w) => w.text);

  // Suggest services based on weak areas
  const suggestedServices = new Set<string>();
  
  weakAreas.forEach((area) => {
    switch(area.id) {
      case 2:
      case 3:
      case 4:
      case 5:
        suggestedServices.add("Ruta Licencia Sanitaria 360");
        break;
      case 6:
        suggestedServices.add("Ruta Producto en Regla");
        break;
      case 7:
        suggestedServices.add("Ruta Transporte Seguro");
        break;
      case 9:
        suggestedServices.add("Ruta Ampliación Comercial");
        break;
      case 10:
      case 11:
      case 12:
        suggestedServices.add("Jornadas de Personal en Regla");
        break;
      case 13:
        suggestedServices.add("Capacitación de personal");
        break;
      case 17:
      case 18:
      case 20:
        suggestedServices.add("Manuales y procedimientos");
        break;
      case 15:
      case 16:
      case 19:
        suggestedServices.add("Auditoría sanitaria");
        break;
    }
  });

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
    rawScore: score,
    maxPossible: maxPossibleScore
  };
}

// Ensure tailwind config correctly merges class names.
// Simple utility for cn() if needed.
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

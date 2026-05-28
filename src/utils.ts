import { DiagnosticResult, QuizState, AnswerType, DiagnosticBreach } from './types';
import { QUESTIONS, SERVICES } from './data';

export function calculateDiagnosticStatus(answers: Record<number, AnswerType>): DiagnosticResult & { rawScore: number, maxPossible: number } {
  let score = 0;
  let maxPossibleScore = 0;
  
  const breaches: DiagnosticBreach[] = [];

  // Grouping for categories
  const CATEGORY_LABELS: Record<string, string> = {
    permisologia_documental: "Permisología y cumplimiento documental",
    personal_manipulador: "Personal manipulador",
    control_sanitario_operativo: "Control sanitario operativo",
    procesos_calidad_inocuidad: "Procesos, calidad e inocuidad"
  };

  // Convert answers and calculate score & maxPossibleScore
  Object.entries(answers).forEach(([questionId, answerType]) => {
    const id = parseInt(questionId, 10);
    const question = QUESTIONS.find((q) => q.id === id);
    if (!question) return;

    if (answerType === 'Sí') {
      score += question.weight;
      maxPossibleScore += question.weight;
    } else if (answerType === 'No estoy seguro') {
      score += (question.weight * 0.4);
      maxPossibleScore += question.weight;
    } else if (answerType === 'No') {
      score += 0;
      maxPossibleScore += question.weight;
    } else {
      // "No aplica" is completely excluded from the calculation
      return;
    }

    // Capture breaches for No or No estoy seguro
    if (answerType === 'No' || answerType === 'No estoy seguro') {
      breaches.push({
        breachId: id,
        questionText: question.text,
        answer: answerType,
        commercialTag: question.commercialTag,
        recommendedService: question.recommendedService,
        priority: question.priority,
        category: question.category,
        weight: question.weight,
        critical: question.critical
      });
    }
  });

  const percentage = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
  
  let level: 'High' | 'Medium' | 'Critical' = 'Critical';
  if (percentage >= 80) level = 'High';
  else if (percentage >= 50) level = 'Medium';

  // Sort breaches by priority (high > medium > low), then critical (true > false), then weight (higher > lower)
  breaches.sort((a, b) => {
    const pVal = { high: 3, medium: 2, low: 1 };
    const pDiff = pVal[b.priority] - pVal[a.priority];
    if (pDiff !== 0) return pDiff;

    if (a.critical !== b.critical) {
      return a.critical ? -1 : 1;
    }

    return b.weight - a.weight;
  });

  // Mostrar como máximo 3 áreas principales a revisar
  const topAreasToReview = breaches.slice(0, 3).map(b => {
    const q = QUESTIONS.find(qy => qy.id === b.breachId);
    return q ? q.shortText : "Área a revisar";
  });

  // Suggest up to 3 unique service types
  const suggestedServicesSet = new Set<string>();
  breaches.forEach(b => suggestedServicesSet.add(b.recommendedService));
  let suggestedServices = Array.from(suggestedServicesSet).slice(0, 3);

  if (suggestedServices.length === 0) {
    if (level === 'High') {
      suggestedServices.push("Auditoría sanitaria");
    } else {
      suggestedServices.push("Ruta Licencia Sanitaria 360");
    }
  }

  // Calculate desglose por categoría
  const categoryScores = Object.keys(CATEGORY_LABELS).map((catKey) => {
    let catScore = 0;
    let catMaxPossible = 0;

    QUESTIONS.filter((q) => q.category === catKey).forEach((q) => {
      const ansObj = answers[q.id];
      if (!ansObj || ansObj === 'No aplica') return;

      if (ansObj === 'Sí') {
        catScore += q.weight;
        catMaxPossible += q.weight;
      } else if (ansObj === 'No estoy seguro') {
        catScore += (q.weight * 0.4);
        catMaxPossible += q.weight;
      } else if (ansObj === 'No') {
        catMaxPossible += q.weight;
      }
    });

    const catPercentage = catMaxPossible > 0 ? Math.round((catScore / catMaxPossible) * 100) : null;

    return {
      category: catKey,
      score: Number(catScore.toFixed(1)),
      maxPossible: catMaxPossible,
      percentage: catPercentage,
      label: CATEGORY_LABELS[catKey]
    };
  });

  return {
    scorePercentage: percentage,
    level,
    topAreasToReview,
    suggestedServices,
    breaches,
    rawScore: Number(score.toFixed(1)),
    maxPossible: maxPossibleScore,
    categoryScores,
    totalRawScore: Number(score.toFixed(1)),
    totalMaxPossibleScore: maxPossibleScore
  };
}

// Ensure tailwind config correctly merges class names.
// Simple utility for cn() if needed.
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

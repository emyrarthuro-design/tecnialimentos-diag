export type AppState = 
  | 'welcome' 
  | 'captureInfo' 
  | 'diagnostic' 
  | 'results';

export interface BusinessData {
  contactName: string;
  companyName: string;
  role: string;
  whatsapp: string;
  email: string;
  province: string;
  district: string;
  businessType: string;
  businessState: string;
}

export type AnswerType = 'Sí' | 'No' | 'No estoy seguro' | 'No aplica';

export interface Question {
  id: number;
  text: string;
  shortText: string;
  category: string;
  weight: number;
  critical: boolean;
  commercialTag: string;
  recommendedService: string;
  priority: 'high' | 'medium' | 'low';
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, AnswerType>;
}

export interface DiagnosticBreach {
  breachId: number;
  questionText: string;
  answer: AnswerType;
  commercialTag: string;
  recommendedService: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  weight: number;
  critical: boolean;
}

export interface DiagnosticCategoryScore {
  category: string;
  score: number;
  maxPossible: number;
  percentage: number | null;
  label: string;
}

export interface DiagnosticResult {
  scorePercentage: number;
  level: 'High' | 'Medium' | 'Critical';
  topAreasToReview: string[];
  suggestedServices: string[];
  breaches: DiagnosticBreach[];
  categoryScores?: DiagnosticCategoryScore[];
  totalRawScore?: number;
  totalMaxPossibleScore?: number;
}

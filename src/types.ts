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
  shortText: string; // Used for "Áreas a revisar" reporting
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, AnswerType>;
}

export interface DiagnosticResult {
  scorePercentage: number;
  level: 'High' | 'Medium' | 'Critical';
  topAreasToReview: string[];
  suggestedServices: string[];
}

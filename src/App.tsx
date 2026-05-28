import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppState, BusinessData, AnswerType } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CaptureInfo } from './components/CaptureInfo';
import { DiagnosticQuiz } from './components/DiagnosticQuiz';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [answers, setAnswers] = useState<Record<number, AnswerType> | null>(null);

  const handleStart = () => {
    setAppState('captureInfo');
  };

  const handleInfoComplete = (data: BusinessData) => {
    setBusinessData(data);
    setAppState('diagnostic');
  };

  const handleDiagnosticComplete = (finalAnswers: Record<number, AnswerType>) => {
    setAnswers(finalAnswers);
    setAppState('results');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 font-sans text-slate-900 border-slate-200">
      <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shrink-0 gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-tight">Tecnialimentos</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Diagnóstico Sanitario</p>
          </div>
        </div>
        {businessData && (
          <div className="flex items-center gap-4">
             <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
               Sesión: {businessData.companyName || 'Nueva'}
             </span>
          </div>
        )}
      </header>

      <main className="flex-1 p-6 sm:p-8 flex justify-center items-start overflow-y-auto">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {appState === 'welcome' && (
              <WelcomeScreen key="welcome" onStart={handleStart} />
            )}
            {appState === 'captureInfo' && (
              <CaptureInfo key="capture" onComplete={handleInfoComplete} />
            )}
            {appState === 'diagnostic' && (
              <DiagnosticQuiz key="diagnostic" onComplete={handleDiagnosticComplete} />
            )}
            {appState === 'results' && businessData && answers && (
              <ResultScreen key="results" businessData={businessData} answers={answers} />
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 px-6 sm:px-8 py-3 flex flex-col sm:flex-row justify-between items-center shrink-0 gap-2 sm:gap-0 mt-auto">
        <div className="flex gap-6">
          <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Términos de Uso</a>
          <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Política de Privacidad</a>
        </div>
        <p className="text-[10px] font-medium text-slate-400">© {new Date().getFullYear()} Tecnialimentos Panamá. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

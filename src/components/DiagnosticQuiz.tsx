import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { QUESTIONS } from "../data";
import { AnswerType, QuizState } from "../types";

interface DiagnosticQuizProps {
  onComplete: (answers: Record<number, AnswerType>) => void;
}

export function DiagnosticQuiz({ onComplete }: DiagnosticQuizProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {}
  });

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[state.currentQuestionIndex];
  
  // Calculate real progress based on current index out of total questions
  const progress = (state.currentQuestionIndex / totalQuestions) * 100;
  
  const currentAnswer = state.answers[currentQuestion.id];

  const handleOptionSelect = (option: AnswerType) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: option
      }
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    
    if (state.currentQuestionIndex < totalQuestions - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      onComplete(state.answers);
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Pregunta {state.currentQuestionIndex + 1} de {totalQuestions}
          </span>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <motion.div 
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {currentQuestion.text}
          </h3>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {(['Sí', 'No', 'No estoy seguro', 'No aplica'] as AnswerType[]).map((option) => {
              const isSelected = currentAnswer === option;
              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  type="button"
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.99] w-full text-left ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                      : 'border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-medium text-lg">{option}</span>
                  {isSelected && <ArrowRight className="w-5 h-5 text-blue-600 animate-pulse" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-100 gap-4">
            {state.currentQuestionIndex > 0 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                !currentAnswer
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
              }`}
            >
              {state.currentQuestionIndex === totalQuestions - 1 ? 'Ver Resultado' : 'Siguiente'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

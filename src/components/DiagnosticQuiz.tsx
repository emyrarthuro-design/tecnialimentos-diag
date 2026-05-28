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
  const progress = ((state.currentQuestionIndex) / totalQuestions) * 100;

  const handleAnswer = (answer: AnswerType) => {
    const newAnswers = { ...state.answers, [currentQuestion.id]: answer };
    
    if (state.currentQuestionIndex < totalQuestions - 1) {
      // Small timeout to allow user to see selection feedback if we want, but instant is fine
      setState({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answers: newAnswers
      });
    } else {
      // Done
      setState({ ...state, answers: newAnswers });
      onComplete(newAnswers);
    }
  };

  const currentAnswer = state.answers[currentQuestion.id];

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

          <div className="grid grid-cols-1 gap-3">
            {(['Sí', 'No', 'No estoy seguro', 'No aplica'] as AnswerType[]).map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.99] ${
                  currentAnswer === option 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 text-slate-700'
                }`}
              >
                <span className="font-medium text-lg">{option}</span>
                {currentAnswer === option && <ArrowRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

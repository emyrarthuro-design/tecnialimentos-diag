import { motion } from "motion/react";
import { ClipboardList, ArrowRight, ShieldCheck, FileCheck } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto py-12 px-6"
    >
      <div className="flex justify-center mb-8">
        <div className="bg-blue-50 p-4 rounded-full border border-blue-100">
          <ShieldCheck className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 text-center mb-6 leading-tight">
        ¿Tu negocio de alimentos está <span className="text-blue-600">preparado para cumplir?</span>
      </h1>
      
      <p className="text-lg text-slate-600 font-sans text-center mb-8 leading-relaxed">
        Responde este diagnóstico inicial y descubre en pocos minutos qué áreas de tu operación podrían necesitar revisión en <strong>permisos, documentación, personal manipulador y controles básicos de calidad.</strong>
      </p>
      
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mb-10 flex gap-4 items-start">
        <FileCheck className="w-6 h-6 text-slate-400 shrink-0 mt-1" />
        <p className="text-sm text-slate-600">
          <strong className="text-slate-800">Nota técnica:</strong> Este diagnóstico es orientativo, está diseñado especialmente para empresas en Panamá y no reemplaza una revisión técnica completa.
        </p>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-700 text-white font-bold rounded-xl overflow-hidden transition-transform active:scale-[0.98] hover:bg-blue-800 shadow-lg shadow-blue-100"
        >
          <span className="relative text-lg">Iniciar diagnóstico gratuito</span>
          <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

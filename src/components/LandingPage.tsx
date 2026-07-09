import { motion } from "motion/react";
import { 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  Settings, 
  ClipboardList, 
  FileText, 
  Truck, 
  CheckCircle2, 
  HelpCircle, 
  Phone 
} from "lucide-react";

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* 1. Header (Floating or sticky-like container) */}
      <nav id="inicio" className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-100">
              <img 
                src="https://lh3.googleusercontent.com/d/1cnqvgf36HHvAi9mXHU-Ywua33mhFTncB" 
                alt="Logo Tecnialimentos" 
                className="w-full h-full object-contain p-0.5" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xl font-bold text-blue-900 tracking-tight leading-tight block">Tecnialimentos</span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider block">Soluciones Sanitarias</span>
            </div>
          </div>

          {/* Simple Navigation Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection("inicio")} className="hover:text-blue-600 transition-colors cursor-pointer">Inicio</button>
            <button onClick={() => scrollToSection("problema")} className="hover:text-blue-600 transition-colors cursor-pointer">Por Qué Nosotros</button>
            <button onClick={() => scrollToSection("diagnostico")} className="hover:text-blue-600 transition-colors cursor-pointer">Diagnóstico</button>
            <button onClick={() => scrollToSection("servicios")} className="hover:text-blue-600 transition-colors cursor-pointer">Servicios</button>
            <button onClick={() => scrollToSection("proceso")} className="hover:text-blue-600 transition-colors cursor-pointer">Proceso</button>
          </div>

          <button 
            onClick={onStartQuiz}
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Hacer diagnóstico gratuito
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative bg-gradient-to-br from-white via-slate-50 to-blue-50 py-16 sm:py-24 px-6 overflow-hidden">
        {/* Subtle geometric line details inspired by the horizontal lines of the logo */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Centered larger logo element with higher presence */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <div className="flex items-center justify-center w-[320px] sm:w-[520px] md:w-[640px] transition-transform hover:scale-102">
              <img 
                src="https://lh3.googleusercontent.com/d/1cnqvgf36HHvAi9mXHU-Ywua33mhFTncB" 
                alt="Logo Tecnialimentos Grande" 
                className="w-full h-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-6 text-base sm:text-lg md:text-xl font-bold text-blue-900 tracking-normal bg-blue-50 border border-blue-100/80 px-6 py-3 rounded-full shadow-xs">
              Soluciones sanitarias para negocios de alimentos en Panamá
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 font-bold text-xs px-3.5 py-1.5 rounded-full border border-blue-100 mb-6 tracking-wide">
              <ShieldCheck className="w-4 h-4" /> Consultoría Sanitaria Especializada en Panamá
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 tracking-tight leading-tight mb-6"
          >
            Cumple, ordena y prepara tu negocio de alimentos con acompañamiento técnico especializado
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Tecnialimentos ayuda a restaurantes, plantas, distribuidores, marcas de alimentos y negocios gastronómicos a validar permisos, documentación sanitaria, procesos e inocuidad antes de trámites, inspecciones o crecimiento operativo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
          >
            <button 
              onClick={onStartQuiz}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl active:scale-[0.98] hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-lg cursor-pointer"
            >
              Hacer diagnóstico gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://wa.me/50766953832?text=Hola,%20quisiera%20conversar%20con%20un%20asesor%20sobre%20los%20servicios%20de%20Tecnialimentos."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all text-lg shadow-xs"
            >
              <Phone className="w-5 h-5 text-blue-600" />
              Hablar con un asesor
            </a>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-slate-400 italic"
          >
            * El diagnóstico es orientativo y no reemplaza una revisión técnica completa.
          </motion.p>
        </div>
      </header>

      {/* 3. Sección Problema */}
      <section id="problema" className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              ¿Sabes si tu negocio está preparado para una revisión sanitaria?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Muchos negocios de alimentos operan con permisos vencidos, documentos incompletos, carnés sin control, registros sanitarios pendientes o procesos internos sin evidencia. El problema suele aparecer cuando llega una inspección, se necesita abrir una nueva operación o se quiere formalizar un producto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Permisos y documentación</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mantenemos al día desde tu aviso de operación firmado hasta la Licencia Sanitaria de Funcionamiento necesaria para operar de manera conforme.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Personal manipulador</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Evita sanciones graves garantizando que 100% de tu personal tenga vigente su carné blanco y su carné verde de manipulación técnica.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Controles sanitarios y procesos</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Asegura el control riguroso de plagas, fumigaciones certificadas, registros diarios de limpieza y temperatura, indispensables frente a MINSA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección Diagnóstico */}
      <section id="diagnostico" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2">Herramienta Gratuita</span>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Empieza con un autodiagnóstico inicial
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Responde un diagnóstico rápido y conoce qué áreas conviene revisar en tu negocio: permisos, documentación, personal manipulador, fumigación, controles sanitarios, manuales, registros y preparación ante inspecciones.
            </p>
            <button 
              onClick={onStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Iniciar diagnóstico gratuito
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 md:p-12 md:w-1/2 text-white flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 relative">
            {/* Ambient grid lines in dark card */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-200 mb-6 tracking-wide uppercase">¿Qué incluye la evaluación?</h3>
            <ul className="space-y-4">
              {[
                "25 preguntas ponderadas específicas de Panamá",
                "Resultado general detallado por categoría",
                "Brechas principales críticas identificadas en tiempo real",
                "Recomendación orientativa generada con IA",
                "Siguiente paso sugerido y enlace directo de asesoramiento"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm sm:text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Sección Servicios */}
      <section id="servicios" className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block">Nuestras Soluciones Corporativas</span>
            <h2 className="text-3xl font-bold text-blue-900">
              Servicios que pueden ayudarte después del diagnóstico
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Brindamos cobertura total a tus necesidades técnicas de cumplimiento alimentario con consultores de alta trayectoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Cards */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Licencia Sanitaria de Funcionamiento</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                Para negocios que necesitan operar con documentación sanitaria alineada a su actividad real.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Certificación de Planta</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                Para plantas procesadoras que necesitan ordenar expediente, auditoría v2, manuales e inspección.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Registro Sanitario</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                Para marcas o productos empacados que requieren validar documentación y trámite ante MINSA.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Licencia Sanitaria de Transporte</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                Para empresas que movilizan alimentos y necesitan formalizar el transporte sanitario.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Constancia de Inspección</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                Para negocios que requieren revisión, expediente formalizado y preparación ante inspección.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Jornadas de Carnés Blanco y Verde</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                Para equipos manipuladores de alimentos que necesitan certificaciones vigentes sin demoras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sección Proceso */}
      <section id="proceso" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block font-display">La metodología</span>
            <h2 className="text-3xl font-bold text-blue-900">¿Cómo trabajamos?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">01</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Diagnóstico inicial</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Identificamos posibles brechas en permisos, documentación y operación.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">02</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Revisión técnica</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Validamos qué aplica exactamente según el tipo de negocio, actividad y etapa actual.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">03</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Ruta de acción</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Definimos si necesitas licencia, registro, auditoría, manuales, capacitación o preparación para inspección.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">04</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Acompañamiento</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Te ayudamos a ordenar documentos, expediente, procesos y seguimiento constante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Sección CTA Final */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 py-16 px-6 text-white text-center sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Antes de avanzar, identifica qué debe revisar tu negocio
          </h2>
          <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10">
            El diagnóstico gratuito no reemplaza una revisión técnica completa, pero te ayuda a detectar áreas prioritarias y tomar mejores decisiones antes de una inspección, apertura, ampliación o trámite sanitario.
          </p>
          <button 
            onClick={onStartQuiz}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-900 font-bold rounded-xl active:scale-[0.98] hover:bg-slate-50 transition-all shadow-md text-lg cursor-pointer"
          >
            Hacer diagnóstico gratuito
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 text-blue-600 transition-transform" />
          </button>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-md overflow-hidden border border-slate-100 flex items-center justify-center">
                <img 
                  src="https://lh3.googleusercontent.com/d/1cnqvgf36HHvAi9mXHU-Ywua33mhFTncB" 
                  alt="Logo Tecnialimentos" 
                  className="w-full h-full object-contain p-0.5" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-bold text-blue-900 tracking-tight">Tecnialimentos</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Soluciones técnicas integrales y cumplimiento regulatorio para la industria de alimentos y bebidas en Panamá.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection("diagnostico")} className="hover:text-blue-600 transition-colors">Diagnóstico</button>
            <button onClick={() => scrollToSection("servicios")} className="hover:text-blue-600 transition-colors">Servicios</button>
            <a href="https://wa.me/50766953832" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Contacto</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidad</a>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Tecnialimentos Panamá. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0 font-medium">Calidad alimentaria y legalidad para tu negocio</p>
        </div>
      </footer>
    </div>
  );
}

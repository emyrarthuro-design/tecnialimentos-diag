import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Phone,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BookOpen,
  Award,
  Utensils,
  Factory,
  GlassWater,
  Hotel,
  Bike,
  Store,
  Package,
  TrendingUp,
  BarChart3,
  Sparkles,
  Building2,
  Briefcase,
  Target
} from "lucide-react";

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  const [activeProcess, setActiveProcess] = useState<number | null>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trámites y Procesos de acompañamiento data
  const processes = [
    {
      id: "dmo",
      title: "Diagnóstico y mejora operativa",
      steps: [
        "Revisión inicial de la operación.",
        "Identificación de brechas, mermas, reprocesos o cuellos de botella.",
        "Priorización de oportunidades de mejora.",
        "Diseño de plan de acción.",
        "Acompañamiento en implementación.",
        "Seguimiento con indicadores."
      ]
    },
    {
      id: "einp",
      title: "Expansión, innovación o nuevos productos",
      steps: [
        "Revisión de la idea o necesidad de crecimiento.",
        "Análisis de requisitos técnicos, operativos y sanitarios.",
        "Evaluación de procesos, capacidad y recursos.",
        "Diseño de ruta de implementación.",
        "Preparación documental, técnica u operativa.",
        "Acompañamiento hasta la ejecución del proyecto."
      ]
    },
    {
      id: "lsf",
      title: "Licencia Sanitaria de Funcionamiento",
      steps: [
        "Evaluación de requisitos para su actividad: Identificamos los requisitos sanitarios que aplican según el tipo de establecimiento.",
        "Plan de acción personalizado: Diseñamos una ruta de trabajo para cumplir con las exigencias del MINSA.",
        "Gestión documental del trámite: Preparamos y revisamos toda la documentación requerida para la solicitud.",
        "Presentación y seguimiento del expediente: Gestionamos el trámite y damos seguimiento continuo ante el MINSA.",
        "Preparación para la inspección oficial: Le asesoramos para que su establecimiento esté listo para la visita sanitaria.",
        "Acompañamiento hasta la emisión de la Licencia Sanitaria: Permanecemos a su lado durante el proceso hasta la emisión de la Licencia Sanitaria, cuando corresponda según la evaluación y respuesta de la autoridad competente."
      ]
    },
    {
      id: "cp",
      title: "Certificación de Planta",
      steps: [
        "Diagnóstico integral de la planta: Evaluamos infraestructura, flujo de procesos, equipos y condiciones sanitarias.",
        "Identificación de oportunidades de mejora: Entregamos un diagnóstico técnico con las acciones necesarias para cumplir la normativa.",
        "Adecuación técnica de la planta: Asesoramos en la implementación de mejoras en infraestructura, procesos y controles sanitarios.",
        "Desarrollo del sistema documental: Elaboramos manuales, procedimientos, registros y demás documentación requerida.",
        "Preparación para la inspección sanitaria: Verificamos que la planta esté lista para la evaluación oficial del MINSA.",
        "Acompañamiento durante el proceso de Certificación de Planta: Brindamos soporte durante la inspección y el proceso de evaluación hasta la emisión de la certificación, cuando corresponda según la autoridad competente."
      ]
    },
    {
      id: "rs",
      title: "Registro Sanitario",
      steps: [
        "Propuesta técnica comercial por producto o categoría.",
        "Solicitud de fichas técnicas, fórmulas y documentos de respaldo.",
        "Pago de timbres de registro y gestión de análisis de laboratorios.",
        "Elaboración de expediente completo y envío formal a las autoridades.",
        "Evaluación técnica, seguimiento y subsanación de observaciones.",
        "Emisión y entrega del registro sanitario oficial."
      ]
    },
    {
      id: "ta",
      title: "Transporte de Alimentos",
      steps: [
        "Propuesta técnica para vehículos o flota de distribución.",
        "Recopilación de requisitos de vehículos y armado del expediente.",
        "Envío de expediente técnico formal a las autoridades correspondientes.",
        "Evaluación e inspección física de las unidades de transporte.",
        "Aprobación de los controles de temperatura y limpieza de las unidades.",
        "Emisión de la licencia sanitaria de transporte o constancia oficial."
      ]
    },
    {
      id: "cis",
      title: "Constancia de Inspección Sanitaria",
      steps: [
        "Propuesta comercial de acuerdo con el tipo de establecimiento.",
        "Recopilación de documentación operativa preliminar.",
        "Auditoría interna rápida y recomendaciones de mejora.",
        "Preparación de expediente de inspección y formatos internos.",
        "Evaluación o inspección en sitio por parte de las autoridades.",
        "Emisión formal y entrega al cliente de la constancia de inspección."
      ]
    },
    {
      id: "cb",
      title: "Carnet Blanco",
      steps: [
        "Coordinación y programación de la jornada de salud.",
        "Toma de muestras de laboratorio, revisión médica general y pagos.",
        "Pago oficial de derechos de trámite al MINSA.",
        "Retiro de carnet tramitado y verificado por la autoridad.",
        "Revisión de vigencia y entrega directa de carnets al cliente."
      ]
    },
    {
      id: "cv",
      title: "Carnet Verde",
      steps: [
        "Coordinación de la jornada de capacitación técnica obligatoria.",
        "Impartición de la capacitación sanitaria y aplicación de examen.",
        "Armado de expedientes individuales con fotos, carnet blanco y evaluación.",
        "Entrega de documentos físicos, sustentación y pago de expedientes al MINSA.",
        "Retiro de carnets verdes emitidos y entrega final para el personal."
      ]
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* 1. Header */}
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
            <button onClick={() => scrollToSection("tramites")} className="hover:text-blue-600 transition-colors cursor-pointer">Rutas de Acompañamiento</button>
            <button onClick={() => scrollToSection("proceso")} className="hover:text-blue-600 transition-colors cursor-pointer">Metodología</button>
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
        {/* Subtle geometric line details inspired by the logo */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Centered logo */}
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
            <span className="mt-6 text-sm sm:text-base md:text-lg font-bold text-blue-900 tracking-normal bg-blue-50 border border-blue-100/80 px-6 py-2.5 rounded-full shadow-xs">
              Transformación estratégica y operativa para empresas de alimentos
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-blue-900 tracking-tight leading-tight mb-6"
          >
            Construye una empresa de alimentos más ordenada, eficiente y preparada para crecer
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Tecnialimentos acompaña a restaurantes, plantas, distribuidores, marcas de alimentos y empresas gastronómicas a profesionalizar su operación, fortalecer sus procesos, cumplir requisitos sanitarios y tomar mejores decisiones para crecer con estructura.
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
            * El diagnóstico es orientativo y ayuda a identificar áreas que requieren revisión técnica, operativa o sanitaria.
          </motion.p>
        </div>
      </header>

      {/* 3. Sección "Por Qué Nosotros" */}
      <section id="problema" className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              Tu empresa puede vender más, pero seguir perdiendo eficiencia por falta de estructura
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Muchos negocios de alimentos crecen, abren nuevas líneas, aumentan producción o atienden más clientes, pero continúan operando con procesos improvisados, controles débiles, dependencia del dueño, documentación incompleta o decisiones sin información suficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1 flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Del emprendimiento a la empresa</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ayudamos a negocios de alimentos que han crecido a pasar de una operación informal o dependiente del dueño a una empresa más organizada, documentada y preparada para sostener su crecimiento.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1 flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Procesos, eficiencia y rentabilidad</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Identificamos cuellos de botella, reprocesos, mermas, falta de estándares, problemas de coordinación, debilidades de inventario y costos invisibles que pueden afectar la productividad y la rentabilidad.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1 flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Calidad, cumplimiento y confianza</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Integramos cumplimiento sanitario, inocuidad, documentación, capacitación y preparación para inspecciones dentro de una visión más amplia de calidad, reputación y crecimiento empresarial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Ideal Para" */}
      <section className="py-16 px-6 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block">A quiénes acompañamos</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 tracking-tight">
            Diseñado para empresas de alimentos que quieren ordenar, crecer y profesionalizar su operación
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Trabajamos con dueños, gerentes y equipos técnicos que necesitan mejorar su operación, fortalecer calidad, cumplir requisitos y preparar nuevas etapas de crecimiento.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { label: "Dueños de restaurantes", icon: Utensils },
              { label: "Cadenas gastronómicas", icon: Store },
              { label: "Gerentes generales", icon: Briefcase },
              { label: "Directores de operaciones", icon: Target },
              { label: "Gerentes de producción", icon: Factory },
              { label: "Responsables de calidad", icon: ShieldCheck },
              { label: "Hoteles y cocinas institucionales", icon: Hotel },
              { label: "Plantas de alimentos", icon: Building2 },
              { label: "Productores agroindustriales", icon: Package },
              { label: "Marcas alimentarias", icon: Sparkles },
              { label: "Distribuidores", icon: Truck },
              { label: "Empresas en expansión", icon: TrendingUp }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-3xs flex flex-col items-center text-center transition-all hover:shadow-xs hover:border-blue-400 group">
                  <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Sección Diagnóstico */}
      <section id="diagnostico" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2">Evaluación Estratégica Gratuita</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              Empieza con un diagnóstico inicial
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Completa una evaluación rápida para identificar brechas en permisos, documentación, personal manipulador, controles sanitarios, procesos, registros y preparación operativa. Este diagnóstico te ayuda a entender qué áreas conviene revisar antes de una inspección, apertura, expansión o nuevo proyecto.
            </p>
            <div className="mb-6">
              <button 
                onClick={onStartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                Iniciar diagnóstico gratuito
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 italic mt-2 leading-relaxed">
              El diagnóstico no reemplaza una revisión técnica completa, pero puede ser el primer paso para ordenar prioridades y convertir una situación operativa en un plan de acción.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 md:p-12 md:w-1/2 text-white flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 relative">
            {/* Ambient grid lines in dark card */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-200 mb-6 tracking-wide uppercase">¿Qué incluye la evaluación?</h3>
            <ul className="space-y-4">
              {[
                "Preguntas basadas en requisitos sanitarios, documentación y controles operativos.",
                "Diagnóstico por categorías para visualizar el nivel de cumplimiento y organización.",
                "Identificación de brechas que requieren atención prioritaria.",
                "Recomendaciones orientativas para fortalecer cumplimiento, procesos y control.",
                "Siguiente paso sugerido para conversar con Tecnialimentos si tu empresa necesita acompañamiento."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-xs sm:text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Sección Servicios */}
      <section id="servicios" className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block">Portafolio de Soluciones</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
              Soluciones para ordenar, profesionalizar y hacer crecer empresas de alimentos
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Acompañamos a empresas de alimentos en operación, procesos, calidad, cumplimiento sanitario, documentación, capacitación, innovación y crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Diagnóstico y mejora operativa */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Eficiencia y productividad</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Diagnóstico y mejora operativa</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Evaluamos cómo funciona tu operación, identificamos brechas, pérdidas, cuellos de botella, reprocesos, falta de estándares y oportunidades para mejorar productividad, control y rentabilidad.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Auditamos procesos clave en planta o cocina, mapeamos flujos de trabajo y diseñamos un plan de acción con indicadores claros de mejora.</p>
              </div>
            </div>

            {/* Service 2: Transformación estratégica y operativa */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Estructura empresarial</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Transformación estratégica y operativa</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Acompañamos a empresas de alimentos que necesitan pasar de una operación desordenada o dependiente de personas clave a una estructura más profesional, medible y preparada para crecer.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Definimos roles, estandarizamos procedimientos, implementamos sistemas de seguimiento y ordenamos la gestión operativa integral.</p>
              </div>
            </div>

            {/* Service 3: Desarrollo, innovación y crecimiento */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Nuevas líneas y expansión</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Desarrollo, innovación y crecimiento</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Apoyamos proyectos de nuevos productos, expansión, rediseño de procesos, entrada a nuevos mercados, preparación para cadenas, creación de nuevas líneas y decisiones estratégicas de crecimiento.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Validamos viabilidad técnica, formulación, vida útil, escalabilidad industrial y acompañamos el proyecto desde la idea hasta el anaquel.</p>
              </div>
            </div>

            {/* Service 4: Sistema Documental de Inocuidad */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">BPM, SSOP y HACCP</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Sistema Documental de Inocuidad</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Diseñamos manuales, programas, formatos, registros e indicadores adaptados a la operación real de cada empresa, integrando BPM, SSOP, HACCP y controles de inocuidad.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p className="italic text-blue-700 font-medium">No utilizamos formatos genéricos. Diseñamos manuales y registros a la medida de la operación real del establecimiento.</p>
              </div>
            </div>

            {/* Service 5: Capacitación en Inocuidad Alimentaria */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Users className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Formación de equipos</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Capacitación en Inocuidad Alimentaria</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Fortalecemos las competencias del equipo mediante capacitaciones en BPM, HACCP, limpieza y desinfección, manipulación higiénica, control de temperaturas, alérgenos, cultura de inocuidad y otros temas aplicables.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Diseñamos un Plan Anual de Capacitación, impartimos sesiones prácticas y entregamos evidencias para cumplimiento oficial.</p>
              </div>
            </div>

            {/* Service 6: Licencia Sanitaria de Funcionamiento */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <FileCheck className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Opera legalmente y con respaldo sanitario.</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Licencia Sanitaria de Funcionamiento</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                La Licencia Sanitaria de Funcionamiento es la autorización emitida por el MINSA que certifica que un establecimiento cumple con las condiciones sanitarias requeridas para desarrollar actividades relacionadas con la producción, procesamiento, almacenamiento, distribución o comercialización de alimentos.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Revisamos los requisitos aplicables, preparamos la documentación, organizamos el expediente y acompañamos el proceso ante la autoridad sanitaria.</p>
              </div>
            </div>

            {/* Service 7: Certificación de Planta */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Settings className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Demuestra que tu planta cumple con los requisitos de infraestructura e inocuidad.</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Certificación de Planta</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                La Certificación de Planta acredita que una instalación de alimentos cumple con las condiciones higiénico-sanitarias, las Buenas Prácticas de Manufactura y los controles de inocuidad necesarios para garantizar procesos seguros y conformes con la normativa sanitaria vigente.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Realizamos un diagnóstico técnico de la planta, verificamos brechas de cumplimiento, elaboramos la documentación requerida y acompañamos la gestión del trámite.</p>
              </div>
            </div>

            {/* Service 8: Registro Sanitario */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <ClipboardList className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Comercializa tus productos de forma legal en Panamá.</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Registro Sanitario</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                El Registro Sanitario es la autorización que permite la fabricación, importación y comercialización de alimentos, garantizando que el producto cumple con los requisitos técnicos, de inocuidad y de etiquetado establecidos por la normativa sanitaria.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Preparamos y validamos la documentación técnica, revisamos requisitos de producto, apoyamos la organización del expediente y damos seguimiento al trámite ante la autoridad sanitaria.</p>
              </div>
            </div>

            {/* Service 9: Constancia de Inspección Sanitaria */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <FileText className="w-5.5 h-5.5" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">Cumple con los requisitos sanitarios para operar con tranquilidad.</span>
              <h4 className="text-lg sm:text-xl font-bold text-blue-900 mb-2.5">Constancia de Inspección Sanitaria</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                La Constancia de Inspección Sanitaria es el documento emitido por las Direcciones Regionales de Control de Alimentos y Vigilancia Veterinaria que acredita que un establecimiento de interés sanitario de bajo riesgo o un servicio de transporte de alimentos cumple con los requisitos sanitarios exigidos para desarrollar sus actividades.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Evaluamos las condiciones del establecimiento o servicio, identificamos los requisitos aplicables, preparamos la documentación necesaria y acompañamos el proceso de inspección o renovación.</p>
              </div>
            </div>

            {/* Service 10: Carnet Blanco y Carnet Verde */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide block">Personal manipulador</span>
                  <h4 className="text-lg sm:text-xl font-bold text-blue-900">Carnet Blanco y Carnet Verde</h4>
                </div>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Acompañamos a empresas en la coordinación, seguimiento y control de requisitos del personal manipulador, incluyendo certificado de buena salud (Carnet Blanco) y adiestramiento sanitario en buenas prácticas de higiene (Carnet Verde).
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Orientamos sobre requisitos oficiales, coordinamos jornadas directas de salud y adiestramiento, y organizamos los expedientes de tu personal de forma oportuna.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sección: Rutas de Acompañamiento */}
      <section id="tramites" className="py-20 px-6 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block font-display">Flujos de Trabajo</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">Rutas de acompañamiento según la necesidad de tu empresa</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Cada empresa puede necesitar una ruta distinta: ordenar procesos, preparar documentación, capacitar al equipo, desarrollar nuevos productos, gestionar permisos o prepararse para una inspección.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {processes.map((proc, index) => {
              const isOpen = activeProcess === index;
              return (
                <div 
                  key={proc.id} 
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveProcess(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-blue-900 hover:bg-slate-50/80 transition-colors focus:outline-hidden cursor-pointer"
                  >
                    <span className="text-base sm:text-lg flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-600 text-xs font-extrabold">
                        {index + 1}
                      </span>
                      {proc.title}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-6 pt-1 border-t border-slate-100 bg-slate-50/40">
                          <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-4">Ruta técnica de acompañamiento ({proc.steps.length} pasos):</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {proc.steps.map((step, i) => (
                              <div key={i} className="flex gap-2.5 items-start bg-white p-3 rounded-xl border border-slate-100 shadow-3xs">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black shrink-0 mt-0.5">
                                  0{i + 1}
                                </span>
                                <span className="text-xs text-slate-600 leading-normal font-medium">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Sección Metodología / ¿Cómo Acompañamos? */}
      <section id="proceso" className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block font-display">Nuestra Metodología</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">¿Cómo acompañamos a una empresa de alimentos?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">01</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Diagnóstico inicial</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Identificamos brechas en operación, documentación, procesos, cumplimiento, personal, calidad e inocuidad.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">02</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Revisión técnica y empresarial</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Analizamos la situación según el tipo de empresa, su etapa de crecimiento, actividad, estructura operativa y requisitos aplicables.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">03</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Ruta de acción</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Diseñamos una ruta personalizada que puede incluir mejora de procesos, documentación, capacitación, permisos, registros, expansión, desarrollo de productos o preparación para inspecciones.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">04</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Implementación acompañada</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Acompañamos al equipo en la organización de documentos, estandarización de procesos, gestión de trámites, formación del personal y ejecución de mejoras.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">05</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Seguimiento y próximo nivel</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Brindamos seguimiento para sostener los cambios, preparar nuevas etapas, mejorar indicadores y fortalecer la capacidad de crecimiento de la empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="py-12 px-6 bg-blue-50/50 border-t border-b border-blue-100 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 border border-blue-100 shadow-3xs shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-sm sm:text-base md:text-lg font-medium text-blue-900 max-w-2xl text-center sm:text-left leading-relaxed">
            Tecnialimentos acompaña a empresas de alimentos en decisiones que combinan operación, calidad, cumplimiento y crecimiento. No llegamos solamente a revisar documentos: ayudamos a construir estructuras más claras, eficientes y sostenibles.
          </p>
        </div>
      </section>

      {/* 8. Sección CTA Final */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 py-16 px-6 text-white text-center sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Da el siguiente paso hacia una operación más ordenada y preparada para crecer
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10">
            El diagnóstico gratuito te ayuda a detectar áreas prioritarias. Si tu empresa necesita ordenar procesos, fortalecer calidad, preparar documentación, capacitar al equipo, gestionar permisos o evaluar una expansión, Tecnialimentos puede acompañarte en cada etapa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={onStartQuiz}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-900 font-bold rounded-xl active:scale-[0.98] hover:bg-slate-50 transition-all shadow-md text-lg cursor-pointer"
            >
              Hacer diagnóstico gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 text-blue-600 transition-transform" />
            </button>
            <a 
              href="https://wa.me/50766953832?text=Hola,%20quisiera%20conversar%20con%20un%20asesor%20sobre%20los%20servicios%20de%20Tecnialimentos."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-blue-200/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-lg"
            >
              <Phone className="w-5 h-5 text-blue-400" />
              Hablar con un asesor
            </a>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
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
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Tecnialimentos acompaña a empresas de alimentos en transformación operativa, cumplimiento sanitario, inocuidad, documentación, capacitación, desarrollo de proyectos y crecimiento empresarial en Panamá.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection("diagnostico")} className="hover:text-blue-600 transition-colors cursor-pointer">Diagnóstico</button>
            <button onClick={() => scrollToSection("servicios")} className="hover:text-blue-600 transition-colors cursor-pointer">Servicios</button>
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

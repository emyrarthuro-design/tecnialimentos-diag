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
  HelpCircle, 
  Phone,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BookOpen,
  Award,
  MapPin,
  Activity
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
      id: "lsf",
      title: "Licencia Sanitaria de Funcionamiento",
      steps: [
        "Envío de propuesta personalizada.",
        "Solicitud de aviso de operaciones y documentos iniciales.",
        "Factura de arranque del trámite.",
        "Auditoría técnica interna y aplicación de correcciones.",
        "Elaboración de expediente completo y manuales específicos.",
        "Seguimiento activo ante el MINSA, inspección oficial, aprobación y emisión de la licencia."
      ]
    },
    {
      id: "cp",
      title: "Certificación de Planta",
      steps: [
        "Propuesta técnica y recopilación de documentación inicial.",
        "Auditoría técnica de diagnóstico en sitio.",
        "Correcciones de infraestructura, procesos y armado del expediente.",
        "Elaboración de manuales específicos y pagos correspondientes.",
        "Evaluación técnica y coordinación de la inspección oficial del MINSA.",
        "Acompañamiento en inspección y obtención de la certificación."
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
            <button onClick={() => scrollToSection("tramites")} className="hover:text-blue-600 transition-colors cursor-pointer">Trámites</button>
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
            Cumple, ordena y prepara tu negocio de alimentos con acompañamiento técnico sanitario
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Tecnialimentos ayuda a restaurantes, plantas, distribuidores, marcas de alimentos y negocios gastronómicos en Panamá a revisar permisos, documentación sanitaria, personal manipulador, controles de inocuidad, registros y procesos antes de trámites, inspecciones o crecimiento operativo.
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

      {/* 3. Sección "Por Qué Nosotros" */}
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
            {/* Card 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-display">Permisos y documentación</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nos aseguramos de que tus permisos y documentación sanitaria estén completos, actualizados y listos para que tu negocio opere con cumplimiento y tranquilidad.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-display">Personal manipulador</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mantén a tu equipo preparado y en cumplimiento con la normativa sanitaria. Te acompañamos en el control y seguimiento de los requisitos que deben cumplir los manipuladores de alimentos para garantizar una operación segura.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-3xs transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 font-display">Controles sanitarios y procesos</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fortalecemos los controles que garantizan la inocuidad de tus alimentos: temperaturas, recepción de materias primas, control del aceite, limpieza y desinfección, registros operativos y, como parte del sistema, el programa de control de plagas y fumigaciones certificadas.
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
              Empieza con un autodiagnóstico
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Completa una evaluación rápida y descubre si tu negocio está preparado para cumplir con los requisitos sanitarios. Identifica brechas en permisos, documentación, personal manipulador, controles de inocuidad, registros y procesos antes de que se conviertan en un problema.
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
            <p className="text-xs text-slate-500 italic mt-2">
              Convierte tu diagnóstico en un plan de acción. Te ayudamos a pasar del diagnóstico a la implementación, con soluciones prácticas y acompañamiento técnico en cada etapa del proceso.
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
                "25 preguntas basadas en los requisitos sanitarios aplicables en Panamá.",
                "Diagnóstico por categorías, con una visión clara del nivel de cumplimiento de tu negocio.",
                "Identificación de brechas críticas que requieren atención inmediata.",
                "Recomendaciones personalizadas para fortalecer el cumplimiento sanitario.",
                "Plan de acción sugerido con la opción de recibir asesoría especializada de Tecnialimentos."
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block">Nuestras Soluciones Corporativas</span>
            <h2 className="text-3xl font-bold text-blue-900">
              Servicios que pueden ayudarte después del diagnóstico
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Te acompañamos en permisos, registros, documentación, auditorías, capacitación y controles sanitarios para que tu negocio opere con mayor orden, cumplimiento y trazabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Licencia Sanitaria de Funcionamiento */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Licencia Sanitaria de Funcionamiento</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Gestionamos tu Licencia Sanitaria de Funcionamiento para que tu negocio cumpla con los requisitos del MINSA, esté preparado para inspecciones y pueda desarrollar sus actividades de forma legal y segura.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">Qué es:</strong> Es la autorización emitida por el Ministerio de Salud que certifica que un establecimiento de alimentos cumple con las condiciones sanitarias exigidas para operar.</p>
                <p><strong className="text-slate-700">¿Quiénes la necesitan?:</strong> Todo establecimiento que produzca, procese, prepare, manipule, envase, almacene, distribuya, importe o comercialice alimentos, según la normativa aplicable.</p>
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Revisamos requisitos, preparamos documentación, gestionamos el trámite y acompañamos el proceso hasta la obtención de la licencia.</p>
              </div>
            </div>

            {/* Service 2: Certificación de Planta */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Certificación de Planta</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Acredita que tu planta cumple con las condiciones sanitarias exigidas por el MINSA para producir, procesar o envasar alimentos de forma segura y conforme a la normativa vigente.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">¿Quiénes la necesitan?:</strong> Empresas de productos cárnicos, lácteos, alimentos diversos, suplementos alimenticios, productos pesqueros, acuícolas y otras plantas de procesamiento sujetas a control sanitario.</p>
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Realizamos diagnóstico técnico, verificamos cumplimiento, elaboramos documentación requerida y gestionamos el trámite.</p>
              </div>
            </div>

            {/* Service 3: Registro Sanitario */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Registro Sanitario</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Obtén la autorización sanitaria que permite comercializar alimentos de forma legal en Panamá, garantizando el cumplimiento de la normativa vigente.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">¿Quiénes lo necesitan?:</strong> Fabricantes, importadores y empresas que elaboran o comercializan alimentos y suplementos alimenticios que requieren autorización sanitaria antes de su venta.</p>
                <div className="pt-1">
                  <p className="font-bold text-slate-700 mb-1">Beneficios:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                    <li>Autoriza la comercialización legal.</li>
                    <li>Demuestra cumplimiento sanitario.</li>
                    <li>Genera confianza ante clientes y distribuidores.</li>
                    <li>Vigencia de 5 años con opción de renovación.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 4: Constancia de Inspección Sanitaria para Transporte */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Inspección Sanitaria para Transporte de Alimentos</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Acredita que tu servicio de transporte cumple con los requisitos sanitarios exigidos para el traslado seguro de alimentos y productos regulados.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">¿Quiénes la necesitan?:</strong> Transporte terrestre de alimentos, servicios de delivery de alimentos listos para consumo y transporte de productos higiénicos sujetos a control sanitario.</p>
                <div className="pt-1">
                  <p className="font-bold text-slate-700 mb-1">Beneficios:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                    <li>Cumplimiento ante MINSA.</li>
                    <li>Respaldo durante inspecciones en vía.</li>
                    <li>Mayor confianza en la inocuidad durante el transporte.</li>
                    <li>Vigencia de 3 años, con opción de renovación.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service 5: Constancia de Inspección para Establecimientos de Bajo Riesgo */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Inspección para Locales de Bajo Riesgo</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Obtén la constancia que acredita que tu negocio cumple con los requisitos sanitarios para la preparación, manipulación y expendio de alimentos.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">¿Quiénes la necesitan?:</strong> Mercados, productores artesanales, ferias, puestos de venta, fondas, kioscos, refresquerías, cocinas, comedores no industriales, hostales, cabañas y otros establecimientos donde se preparen, manipulen o expendan alimentos.</p>
              </div>
            </div>

            {/* Service 6: Carnet Blanco */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Carnet Blanco (Salud)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Obtén el certificado que acredita que el manipulador de alimentos cumple con las condiciones de salud requeridas para desempeñar sus funciones de forma segura.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">¿Quiénes lo necesitan?:</strong> Toda persona que manipule, prepare, procese, transporte o comercialice alimentos en establecimientos de interés sanitario.</p>
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Orientamos sobre requisitos, coordinamos el proceso y damos seguimiento para que tu personal obtenga su Carnet Blanco de forma oportuna.</p>
              </div>
            </div>

            {/* Service 7: Carnet Verde */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Carnet Verde (Capacitación)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Certifica que el manipulador de alimentos ha recibido la capacitación sanitaria necesaria para aplicar buenas prácticas de higiene e inocuidad.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">¿Quiénes lo necesitan?:</strong> Manipuladores de alimentos que deban demostrar capacitación oficial en manipulación higiénica de alimentos. Se obtiene después del Carnet Blanco y de completar la capacitación correspondiente.</p>
              </div>
            </div>

            {/* Service 8: Sistema Documental de Inocuidad */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Sistema Documental de Inocuidad</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Creamos la documentación que tu empresa necesita para cumplir con la normativa sanitaria y gestionar la inocuidad de forma organizada y eficiente.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p className="font-bold text-slate-700">Incluye:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                  <li>Manual de BPM (Buenas Prácticas de Manufactura).</li>
                  <li>Procedimientos SSOP (Sanitización estándar).</li>
                  <li>Plan HACCP personalizado.</li>
                  <li>Formatos, registros de control, indicadores y seguimiento.</li>
                </ul>
                <p className="italic text-blue-700 pt-1 font-medium">No utilizamos formatos genéricos. Diseñamos manuales, programas y registros adaptados a los procesos, productos y necesidades específicas de cada establecimiento.</p>
              </div>
            </div>

            {/* Service 9: Capacitación en Inocuidad Alimentaria */}
            <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl flex flex-col hover:border-blue-400 transition-all hover:shadow-xs group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-3">Capacitación en Inocuidad Alimentaria</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Fortalece las competencias de tu equipo con programas de capacitación diseñados para cumplir con los requisitos del MINSA, mejorar la inocuidad y promover una cultura de cumplimiento.
              </p>
              <div className="border-t border-slate-200/60 pt-4 mt-auto space-y-2 text-xs text-slate-500">
                <p><strong className="text-slate-700">Temas posibles:</strong> BPM, HACCP, Limpieza y desinfección, Control de temperaturas, Manejo integrado de plagas, Alérgenos, Contaminación cruzada.</p>
                <p><strong className="text-slate-700">Cumplimiento normativo:</strong> El MINSA solicita que los establecimientos mantengan un programa documentado de capacitación, realizando al menos dos capacitaciones al año y conservando la evidencia para inspecciones.</p>
                <p><strong className="text-slate-700">Cómo ayuda Tecnialimentos:</strong> Diseñamos un Plan Anual de Capacitación, impartimos capacitaciones, elaboramos material de apoyo y entregamos listas de asistencia, evaluaciones y constancias oficiales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sección Nueva: Trámites y Procesos que Acompañamos */}
      <section id="tramites" className="py-20 px-6 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block font-display">Acompañamiento Paso a Paso</span>
            <h2 className="text-3xl font-bold text-blue-900">Trámites y Procesos que Acompañamos</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Haz clic en cada trámite para ver la ruta simplificada de acompañamiento técnico sanitario que diseñamos para tu negocio.
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
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-blue-900 hover:bg-slate-50/80 transition-colors focus:outline-hidden"
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

      {/* 7. Sección Proceso / ¿Cómo Trabajamos? */}
      <section id="proceso" className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider mb-2 block font-display">La metodología</span>
            <h2 className="text-3xl font-bold text-blue-900">¿Cómo trabajamos?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">01</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Diagnóstico inicial</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Realizamos una evaluación de tu negocio para identificar brechas en permisos, documentación, procesos, personal manipulador y cumplimiento sanitario.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">02</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Revisión técnica</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Analizamos los requisitos que aplican según el tipo de establecimiento, la actividad que desarrolla y la normativa sanitaria vigente.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">03</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Plan de acción</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Diseñamos una ruta de trabajo personalizada que puede incluir permisos, registros sanitarios, manuales, programas de inocuidad, capacitación o preparación para inspecciones.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">04</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Implementación</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Te acompañamos en la organización de la documentación, elaboración de manuales y registros, gestión de trámites, capacitación del personal e implementación de los controles necesarios.
              </p>
            </div>

            <div className="relative">
              <div className="text-5xl font-extrabold text-blue-100 mb-4">05</div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">Seguimiento continuo</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Brindamos asesoría permanente para mantener tu negocio en cumplimiento, preparar renovaciones, atender inspecciones y fortalecer la inocuidad de tus procesos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Sección CTA Final */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 py-16 px-6 text-white text-center sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Convierte tu diagnóstico en un plan de acción sanitario
          </h2>
          <p className="text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10">
            El diagnóstico gratuito te ayuda a detectar áreas prioritarias. Si tu negocio necesita avanzar con permisos, documentación, capacitación, registros, manuales o preparación para una inspección, Tecnialimentos puede acompañarte en cada etapa.
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
            <p className="text-xs text-slate-500 max-w-sm">
              Soluciones técnicas en cumplimiento sanitario, inocuidad alimentaria, documentación, capacitación y trámites ante autoridades sanitarias para negocios de alimentos en Panamá.
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

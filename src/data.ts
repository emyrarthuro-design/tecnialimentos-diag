import { Question } from './types';

export const BUSINESS_TYPES = [
  "Restaurante",
  "Cafetería",
  "Food truck",
  "Dark kitchen",
  "Panadería o pastelería",
  "Catering o banquetes",
  "Hotel con operación de alimentos",
  "Planta procesadora",
  "Marca de producto empacado",
  "Distribuidor de alimentos",
  "Supermercado, minisúper o tienda gourmet",
  "Empresa con personal manipulador de alimentos",
  "Otro"
];

export const BUSINESS_STATES = [
  "Ya estoy operando",
  "Estoy por abrir",
  "Estoy formalizando el negocio",
  "Estoy ampliando actividades",
  "Estoy preparando una inspección",
  "No estoy seguro"
];

export const PROVINCES = [
  "Bocas del Toro",
  "Coclé",
  "Colón",
  "Chiriquí",
  "Darién",
  "Herrera",
  "Los Santos",
  "Panamá",
  "Veraguas",
  "Panamá Oeste",
  "Comarcas"
];

// The questions specified in the weighted matrix of 25 inquiries
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Tu negocio cuenta con un Aviso de Operaciones vigente y registrado ante el MICI en Panamá?",
    shortText: "Aviso de Operaciones",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "falta_aviso_operaciones",
    recommendedService: "Revisión documental inicial",
    priority: "high"
  },
  {
    id: 2,
    text: "¿Tu negocio de alimentos cuenta con la Licencia Sanitaria de Funcionamiento vigente expedida por el MINSA?",
    shortText: "Licencia Sanitaria",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "falta_licencia_sanitaria",
    recommendedService: "Ruta Licencia Sanitaria 360",
    priority: "high"
  },
  {
    id: 3,
    text: "¿La actividad comercial descrita en tu Aviso de Operaciones coincide exactamente con la operación que realizas hoy?",
    shortText: "Actividad Comercial",
    category: "permisologia_documental",
    weight: 3,
    critical: false,
    commercialTag: "actividad_no_actualizada",
    recommendedService: "Revisión / aumento de actividad",
    priority: "high"
  },
  {
    id: 4,
    text: "¿Tienes a mano toda la documentación legal de la empresa (Pacto Social, Registro Público, cédula del representante) al día?",
    shortText: "Expediente Legal",
    category: "permisologia_documental",
    weight: 3,
    critical: false,
    commercialTag: "expediente_incompleto",
    recommendedService: "Preparación de expediente",
    priority: "high"
  },
  {
    id: 5,
    text: "¿Cuentas con notas, poderes firmados, o autorizaciones listos para agilizar trámites ante entidades públicas?",
    shortText: "Poderes y Autorizaciones",
    category: "permisologia_documental",
    weight: 2,
    critical: false,
    commercialTag: "falta_autorizacion",
    recommendedService: "Gestión documental",
    priority: "medium"
  },
  {
    id: 6,
    text: "Si fabricas u ofreces alimentos empacados para distribución, ¿cuentan todos con Registro Sanitario vigente del MINSA o APA?",
    shortText: "Registro Sanitario",
    category: "permisologia_documental",
    weight: 4,
    critical: true,
    commercialTag: "falta_registro_sanitario",
    recommendedService: "Ruta Producto en Regla",
    priority: "high"
  },
  {
    id: 7,
    text: "Si transportas materias primas o productos terminados, ¿los vehículos cuentan con Licencia Sanitaria de Transporte?",
    shortText: "Licencia de Transporte",
    category: "permisologia_documental",
    weight: 2,
    critical: false,
    commercialTag: "falta_licencia_transporte",
    recommendedService: "Ruta Transporte Seguro",
    priority: "medium"
  },
  {
    id: 8,
    text: "Si vendes alcohol como complemento en tu local, ¿la actividad de expendio de licor está aprobada y actualizada?",
    shortText: "Permiso de Licor",
    category: "permisologia_documental",
    weight: 2,
    critical: false,
    commercialTag: "requiere_aumento_licor",
    recommendedService: "Ruta Ampliación Comercial",
    priority: "medium"
  },
  {
    id: 9,
    text: "Si estás por abrir o ampliar, ¿conoces los requerimientos y planos aprobados previamente para evitar cierres?",
    shortText: "Planificación de Permisos",
    category: "permisologia_documental",
    weight: 3,
    critical: false,
    commercialTag: "necesita_orientacion",
    recommendedService: "Diagnóstico técnico / ruta de cumplimiento",
    priority: "medium"
  },
  {
    id: 10,
    text: "¿Todo el personal que manipula alimentos en tu establecimiento cuenta con el Carnet Blanco (Buena Salud) vigente de la Región de Salud de Panamá?",
    shortText: "Carnet Blanco",
    category: "personal_manipulador",
    weight: 5,
    critical: true,
    commercialTag: "falta_carnet_blanco",
    recommendedService: "Jornada Carnet Blanco",
    priority: "high"
  },
  {
    id: 11,
    text: "¿Todo el personal manipulador de alimentos de tu negocio cuenta con el Carnet Verde de Adiestramiento Sanitario vigente expedido por una Escuela de Manipuladores aprobada?",
    shortText: "Carnet Verde",
    category: "personal_manipulador",
    weight: 5,
    critical: true,
    commercialTag: "falta_carnet_verde",
    recommendedService: "Jornada Carnet Verde",
    priority: "high"
  },
  {
    id: 12,
    text: "¿Tienes implementado un cronograma, alertas o sistema de control de vencimiento de los Carnets Blanco y Verde del personal?",
    shortText: "Control de Carnets",
    category: "personal_manipulador",
    weight: 3,
    critical: false,
    commercialTag: "sin_control_vencimientos",
    recommendedService: "Jornadas recurrentes de personal",
    priority: "medium"
  },
  {
    id: 13,
    text: "¿Recibe tu personal entrenamiento continuo o capacitación técnica documentada en temas de higiene, BPM e inocuidad alimentaria?",
    shortText: "Capacitación de Personal",
    category: "personal_manipulador",
    weight: 3,
    critical: false,
    commercialTag: "requiere_capacitacion",
    recommendedService: "Capacitación de personal",
    priority: "medium"
  },
  {
    id: 14,
    text: "¿Tu establecimiento tiene un certificado de control de plagas y fumigación vigente expedido por una empresa autorizada en Panamá?",
    shortText: "Certificado de Fumigación",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "falta_fumigacion",
    recommendedService: "Preparación para inspección",
    priority: "medium"
  },
  {
    id: 15,
    text: "¿Cuentas con bitácoras escritas o registros diarios que evidencien las tareas de limpieza, desinfección y tipo de sanitizantes que usas?",
    shortText: "Registros de Limpieza",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "sin_registros_limpieza",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 16,
    text: "¿Llevas un control diario registrado por escrito de las temperaturas internas de equipos de refrigeración y congelación?",
    shortText: "Control de Temperaturas",
    category: "control_sanitario_operativo",
    weight: 4,
    critical: true,
    commercialTag: "sin_control_temperatura",
    recommendedService: "Auditoría sanitaria",
    priority: "high"
  },
  {
    id: 17,
    text: "¿Cuentas con manuales de buenas prácticas de manufactura (BPM), procedimientos escritos o estándar de lavado de manos documentados?",
    shortText: "Manuales de Procesos",
    category: "procesos_calidad_inocuidad",
    weight: 3,
    critical: false,
    commercialTag: "falta_manuales",
    recommendedService: "Manuales y procedimientos",
    priority: "medium"
  },
  {
    id: 18,
    text: "¿La distribución del local garantiza la separación física para evitar contaminación cruzada entre área sucia (desechos, lavado) y área limpia (preparación)?",
    shortText: "Separación de Áreas",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "riesgo_operativo",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 19,
    text: "¿La apariencia operativa del negocio, orden de equipos, vestimenta del personal e higiene general transmiten total confianza al cliente final?",
    shortText: "Higiene y Apariencia",
    category: "control_sanitario_operativo",
    weight: 2,
    critical: false,
    commercialTag: "brecha_experiencia_cliente",
    recommendedService: "Auditoría de calidad operativa",
    priority: "low"
  },
  {
    id: 20,
    text: "¿Cuentas con procesos establecidos para que la calidad analítica y de inocuidad se mantenga idéntica aun cuando haya alta rotación de personal?",
    shortText: "Estándares de Calidad",
    category: "procesos_calidad_inocuidad",
    weight: 3,
    critical: false,
    commercialTag: "falta_estandarizacion",
    recommendedService: "Manuales + capacitación",
    priority: "medium"
  },
  {
    id: 21,
    text: "¿Cuentas con un proveedor certificado de control de plagas que entregue informes de dosificación, croquis de estaciones y recomendaciones técnicas?",
    shortText: "Control de Plagas",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "falta_proveedor_plagas",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 22,
    text: "¿Verificas y registras documentalmente la procedencia, lote y origen seguro de todas tus materias primas e insumos alimentarios?",
    shortText: "Trazabilidad de Materias",
    category: "procesos_calidad_inocuidad",
    weight: 3,
    critical: false,
    commercialTag: "sin_trazabilidad",
    recommendedService: "Manuales y procedimientos",
    priority: "medium"
  },
  {
    id: 23,
    text: "¿Están todos los alimentos almacenados debidamente rotulados con fecha de apertura/vencimiento, lote y con una rotación sistemática del tipo 'Primero en entrar, Primero en salir'?",
    shortText: "Rotulación y Rotación",
    category: "control_sanitario_operativo",
    weight: 2,
    critical: false,
    commercialTag: "falta_rotulacion",
    recommendedService: "Auditoría de calidad operativa",
    priority: "medium"
  },
  {
    id: 24,
    text: "¿Cuenta el negocio con registros periódicos escrupulosos como lavado de tanques de agua, análisis microbiológico anual o cloro residual?",
    shortText: "Calidad de Agua",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: true,
    commercialTag: "falta_analisis_agua",
    recommendedService: "Auditoría sanitaria",
    priority: "high"
  },
  {
    id: 25,
    text: "¿Cuentas con un procedimiento preestablecido para localizar, retener y retirar del mercado de forma acelerada cualquier producto que presente un riesgo sanitario?",
    shortText: "Retiro de Productos",
    category: "procesos_calidad_inocuidad",
    weight: 2,
    critical: false,
    commercialTag: "sin_procedimiento_recall",
    recommendedService: "Manuales y procedimientos",
    priority: "low"
  }
];

export const SERVICES = [
  "Ruta Licencia Sanitaria 360",
  "Ruta Producto en Regla",
  "Ruta Planta Certificada",
  "Ruta Transporte Seguro",
  "Ruta Inspección Preparada",
  "Ruta Ampliación Comercial",
  "Jornadas de Personal en Regla",
  "Manuales y procedimientos",
  "Capacitación de personal",
  "Auditoría sanitaria"
];

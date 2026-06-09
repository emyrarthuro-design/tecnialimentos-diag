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

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Tiene aviso de operación firmado?",
    shortText: "Aviso de operación firmado",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "falta_aviso_operaciones",
    recommendedService: "Revisión documental inicial",
    priority: "high"
  },
  {
    id: 2,
    text: "¿La actividad del Aviso de Operación coincide con lo que realmente hace?",
    shortText: "Actividad del Aviso",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "actividad_no_actualizada",
    recommendedService: "Revisión / aumento de actividad",
    priority: "high"
  },
  {
    id: 3,
    text: "¿La dirección del Aviso coincide con la ubicación real del local?",
    shortText: "Dirección del Aviso",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "direccion_no_coincide",
    recommendedService: "Revisión documental inicial",
    priority: "high"
  },
  {
    id: 4,
    text: "¿Tiene Licencia Sanitaria de Funcionamiento vigente?",
    shortText: "Licencia Sanitaria de Funcionamiento",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "falta_licencia_sanitaria",
    recommendedService: "Ruta Licencia Sanitaria 360",
    priority: "high"
  },
  {
    id: 5,
    text: "¿La Licencia Sanitaria de Funcionamiento coincide con la actividad real del negocio?",
    shortText: "Licencia Sanitaria de Funcionamiento vs actividad real",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "licencia_no_coincide",
    recommendedService: "Ruta Licencia Sanitaria 360",
    priority: "high"
  },
  {
    id: 6,
    text: "¿Todo el personal tiene certificado de buena salud vigente (carné blanco)?",
    shortText: "Certificado de buena salud / Carné blanco",
    category: "personal_manipulador",
    weight: 3,
    critical: true,
    commercialTag: "falta_carnet_blanco",
    recommendedService: "Jornada Carnet Blanco",
    priority: "high"
  },
  {
    id: 7,
    text: "¿Todo el personal tiene carné de manipulador de alimentos vigente (carné verde)?",
    shortText: "Carné de manipulador de alimentos / Carné verde",
    category: "personal_manipulador",
    weight: 3,
    critical: true,
    commercialTag: "falta_carnet_verde",
    recommendedService: "Jornada Carnet Verde",
    priority: "high"
  },
  {
    id: 8,
    text: "¿Tiene certificado municipal de fumigación vigente?",
    shortText: "Certificado municipal de fumigación",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: true,
    commercialTag: "falta_fumigacion",
    recommendedService: "Preparación para inspección",
    priority: "high"
  },
  {
    id: 9,
    text: "¿La empresa fumigadora cuenta con permiso sanitario vigente?",
    shortText: "Permiso sanitario de empresa fumigadora",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "fumigadora_no_autorizada",
    recommendedService: "Preparación para inspección",
    priority: "medium"
  },
  {
    id: 10,
    text: "¿Tiene Plan de Manejo Integrado de Plagas?",
    shortText: "Plan de Plagas",
    category: "control_sanitario_operativo",
    weight: 1,
    critical: false,
    commercialTag: "falta_plan_plagas",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 11,
    text: "¿Usan químicos aprobados para la industria de alimentos?",
    shortText: "Químicos aprobados para alimentos",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: true,
    commercialTag: "quimicos_no_aptos",
    recommendedService: "Auditoría sanitaria",
    priority: "high"
  },
  {
    id: 12,
    text: "¿Tiene fichas técnicas y registros sanitarios de los químicos que utilizan?",
    shortText: "Fichas técnicas y registros sanitarios de químicos",
    category: "control_sanitario_operativo",
    weight: 1,
    critical: false,
    commercialTag: "falta_fichas_quimicos",
    recommendedService: "Auditoría sanitaria",
    priority: "low"
  },
  {
    id: 13,
    text: "¿Tiene letrero de no fumar visible y del tamaño 8 1/2 x 14 pulgadas?",
    shortText: "Letrero de no fumar 8 1/2 x 14",
    category: "control_sanitario_operativo",
    weight: 1,
    critical: false,
    commercialTag: "falta_letreros_no_fumar",
    recommendedService: "Preparación para inspección",
    priority: "low"
  },
  {
    id: 14,
    text: "¿Tiene trampa de grasa instalada y funcional, si aplica?",
    shortText: "Trampa de Grasa",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "falta_trampa_grasa",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 15,
    text: "¿Tiene registros de limpieza de la trampa de grasa?",
    shortText: "Limpieza de Trampa",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "sin_registro_limpieza_trampa",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 16,
    text: "¿Tiene resultados de laboratorio de calidad de agua?",
    shortText: "Análisis de Agua",
    category: "control_sanitario_operativo",
    weight: 1,
    critical: false,
    commercialTag: "falta_analisis_agua",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 17,
    text: "¿Compra materias primas a proveedores formales y aprobados por MINSA?",
    shortText: "Proveedores formales aprobados por MINSA",
    category: "procesos_calidad_inocuidad",
    weight: 3,
    critical: false,
    commercialTag: "proveedores_no_aprobados",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 18,
    text: "¿Tiene Manual BPM con 2 años de vigencia y firmado?",
    shortText: "Manual BPM vigente y firmado",
    category: "procesos_calidad_inocuidad",
    weight: 3,
    critical: false,
    commercialTag: "falta_manual_bpm",
    recommendedService: "Manuales y procedimientos",
    priority: "medium"
  },
  {
    id: 19,
    text: "¿Tiene Manual SSOP vigente por 2 años y firmado?",
    shortText: "Manual SSOP vigente y firmado",
    category: "procesos_calidad_inocuidad",
    weight: 3,
    critical: false,
    commercialTag: "falta_manual_poes",
    recommendedService: "Manuales y procedimientos",
    priority: "medium"
  },
  {
    id: 20,
    text: "¿Se llevan registros de la limpieza y desinfección realizadas?",
    shortText: "Registros de limpieza y desinfección",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: false,
    commercialTag: "sin_registros_limpieza",
    recommendedService: "Auditoría sanitaria",
    priority: "medium"
  },
  {
    id: 21,
    text: "¿Se llevan registros de temperatura de congeladores y refrigeradores?",
    shortText: "Registros de temperatura",
    category: "control_sanitario_operativo",
    weight: 3,
    critical: true,
    commercialTag: "sin_control_temperatura",
    recommendedService: "Auditoría sanitaria",
    priority: "high"
  },
  {
    id: 22,
    text: "¿Tiene expediente sanitario organizado?",
    shortText: "Expediente Sanitario",
    category: "permisologia_documental",
    weight: 3,
    critical: false,
    commercialTag: "expediente_desorganizado",
    recommendedService: "Preparación de expediente",
    priority: "medium"
  },
  {
    id: 23,
    text: "¿Tiene control de vencimientos de permisos, carnés y certificados?",
    shortText: "Control de Vencimientos",
    category: "permisologia_documental",
    weight: 1,
    critical: false,
    commercialTag: "sin_control_vencimientos",
    recommendedService: "Seguimiento documental recurrente",
    priority: "medium"
  },
  {
    id: 24,
    text: "Si produce alimentos empacados, ¿tiene Registro Sanitario vigente?",
    shortText: "Registro Sanitario",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "falta_registro_sanitario",
    recommendedService: "Ruta Producto en Regla",
    priority: "high"
  },
  {
    id: 25,
    text: "Si es planta, ¿tiene Certificación de Planta vigente, cuando aplica?",
    shortText: "Certificación de Planta",
    category: "permisologia_documental",
    weight: 5,
    critical: true,
    commercialTag: "falta_certificacion_planta",
    recommendedService: "Ruta Planta Certificada",
    priority: "high"
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
  "Auditoría sanitaria",
  "Seguimiento documental recurrente"
];

// Internally validate questions for type-safety and compliance
QUESTIONS.forEach((q) => {
  if (
    q.id === undefined ||
    !q.text ||
    !q.shortText ||
    q.weight === undefined ||
    q.weight <= 0 ||
    !q.category ||
    !q.commercialTag ||
    !q.recommendedService ||
    !q.priority ||
    q.critical === undefined
  ) {
    console.error(`ERROR: Pregunta incompleta detectada en QUESTIONS: ID ${q.id}`, q);
  }
  const genericTags = ["General", "Legal/Permisos", "Producto", "Transporte", "Procesos", "Calidad/Detección"];
  if (genericTags.includes(q.commercialTag)) {
    console.error(`ERROR: Pregunta ID ${q.id} tiene una etiqueta comercial genérica prohibida: ${q.commercialTag}`);
  }
});

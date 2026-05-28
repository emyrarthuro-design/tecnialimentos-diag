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

// The questions specified in the prompt
export const QUESTIONS: Question[] = [
  { id: 1, shortText: "Aviso de Operaciones", text: "¿Tu negocio cuenta con Aviso de Operaciones vigente?" },
  { id: 2, shortText: "Licencia Sanitaria", text: "¿Tu negocio cuenta con Licencia Sanitaria de Funcionamiento?" },
  { id: 3, shortText: "Actividad Comercial", text: "¿La actividad comercial registrada coincide con lo que actualmente realiza tu negocio?" },
  { id: 4, shortText: "Documentación Legal", text: "¿Tienes a mano los documentos legales básicos de la empresa para iniciar trámites?" },
  { id: 5, shortText: "Poderes y Autorizaciones", text: "¿Cuentas con notas, poderes o autorizaciones listas para trámites ante entidades?" },
  { id: 6, shortText: "Registro Sanitario", text: "Si vendes productos empacados, ¿cuentas con Registro Sanitario?" },
  { id: 7, shortText: "Licencia de Transporte", text: "Si transportas alimentos, ¿cuentas con Licencia Sanitaria de Transporte?" },
  { id: 8, shortText: "Permiso de Licor", text: "Si vendes licor como acompañamiento de alimentos, ¿tu actividad está aprobada o actualizada?" },
  { id: 9, shortText: "Permisos Previos", text: "Si estás por abrir o ampliar tu operación, ¿sabes qué permisos necesitas antes de iniciar?" },
  { id: 10, shortText: "Carnet Blanco", text: "¿Todo tu personal manipulador de alimentos cuenta con Carnet Blanco vigente?" },
  { id: 11, shortText: "Carnet Verde", text: "¿Todo tu personal manipulador de alimentos cuenta con Carnet Verde vigente?" },
  { id: 12, shortText: "Control de Carnets", text: "¿Llevas un control de vencimiento de los carnets del personal?" },
  { id: 13, shortText: "Capacitación de Personal", text: "¿Tu personal recibe capacitación periódica en manipulación, higiene e inocuidad?" },
  { id: 14, shortText: "Certificado de Fumigación", text: "¿Tu negocio cuenta con certificado de fumigación vigente?" },
  { id: 15, shortText: "Registros de Limpieza", text: "¿Tienes registros o evidencia de limpieza y desinfección?" },
  { id: 16, shortText: "Control de Temperaturas", text: "¿Llevas control de temperaturas en refrigeración, congelación o almacenamiento?" },
  { id: 17, shortText: "Procesos Documentados", text: "¿Tienes procesos documentados para manipulación, almacenamiento o preparación de alimentos?" },
  { id: 18, shortText: "Separación de Áreas", text: "¿Tienes separación adecuada entre áreas de limpieza, almacenamiento, preparación y desechos?" },
  { id: 19, shortText: "Apariencia y Confianza", text: "¿Tu operación transmite orden, limpieza y confianza al cliente final?" },
  { id: 20, shortText: "Estándares Internos", text: "¿Tienes estándares internos para mantener una experiencia consistente aunque cambie el personal?" }
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

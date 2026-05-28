# Tecnialimentos — Diagnóstico Inicial de Cumplimiento Sanitario

Web app B2B diseñada para captar leads y prospectos calificados de negocios de alimentos en Panamá mediante un diagnóstico interactivo y gratuito de permisos, documentación, personal manipulador y controles básicos de calidad.

## Objetivo Comercial

El propósito central de esta herramienta es la captación de clientes de alto valor (B2B) en Panamá para **Tecnialimentos**. La aplicación evalúa el nivel de preparación sanitaria, detecta brechas operativas críticas y registra automáticamente los datos del prospecto en una hoja de cálculo centralizada de **Google Sheets** para que el equipo comercial realice un seguimiento estructurado e inmediato.

---

## Stack Técnico

- **Frontend:** React (usando Vite para el bundle ultra rápido, TypeScript para tipado estricto y Tailwind CSS para estilizado responsivo e intuitivo).
- **Backend:** Node.js con Express para gestionar de forma segura las credenciales e integraciones de las APIs del lado servidor.
- **Inteligencia Artificial:** Google Gemini API (`@google/genai`) para generar una recomendación experta prudente y personalizada.
- **Base de Datos / Almacenamiento:** Google Sheets API (`googleapis`) para persistencia directa de leads sin necesidad de infraestructuras complejas de bases de datos.

---

## Flujo de Usuario

1. **Bienvenida de Marca:** Mensaje introductorio libre de lenguaje alarmista que establece el valor del diagnóstico gratuito.
2. **Formulario de Registro de Lead:** Captura de datos de contacto (nombre, empresa, cargo, whatsapp, correo) e información preliminar del negocio.
3. **Cuestionario de 20 preguntas:** Preguntas interactivas agrupadas y diseñadas para mapear de manera amigable las responsabilidades sanitarias más comunes.
4. **Pantalla de Resultados y Semáforo:** Visualización del puntaje de cumplimiento (0 a 100%) bajo niveles definidos (Alto, Medio, Crítico) y con un lenguaje prudente y consultivo.
5. **Recomendación con IA:** Generación en tiempo real de sugerencias expertas contextualizadas mediante un modelo seguro de lenguaje (Gemini), redactado desde un tono mentor de apoyo comercial.
6. **Línea Directa (CTA a WhatsApp):** Generación automática de un enlace cargado con un mensaje directo de WhatsApp para el equipo consultor detallando la empresa, nivel obtenido, puntaje y las 3 principales áreas a revisar.
7. **Registro Asíncrono de Leads:** Envío automático del payload estructurado hacia la hoja de cálculo de Google Sheets.

---

## Variables de Entorno

Debes proveer las siguientes variables en tu entorno de despliegue o en un archivo `.env` en la raíz (puedes estructurar tu archivo `.env.local` basado en `.env.example`):

```env
# Gemini
GEMINI_API_KEY=

# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_TAB_NAME=Leads Diagnóstico
```

---

## Configuración de Google Sheets para el MVP

Para habilitar el registro automatizado de leads en tu hoja de cálculo, realiza los siguientes pasos:

1. **Crear Hoja de Cálculo:** Crea una hoja de cálculo en Google Drive y asígnale el nombre `Tecnialimentos - Leads Diagnóstico Sanitario`.
2. **Crear Pestaña:** En la hoja, asegúrate de crear una pestaña llamada exactamente `Leads Diagnóstico` (o el nombre que asignes en `GOOGLE_SHEETS_TAB_NAME`).
3. **Habilitar APIs:** Ve a tu consola de Google Cloud (Google Cloud Console), habilita la API de Google Sheets para tu proyecto.
4. **Crear Service Account:** Crea una cuenta de servicio (Service Account) dentro de "APIs y Servicios -> Credenciales".
5. **Obtener Clave JSON:** Genera y descarga una clave en formato JSON.
6. **Configurar Credenciales:** 
   - Copia el campo `client_email` de la llave JSON y colócalo en `GOOGLE_SHEETS_CLIENT_EMAIL`.
   - Copia el campo `private_key` de la llave JSON y colócalo en `GOOGLE_SHEETS_PRIVATE_KEY` (soporta saltos de línea con `\n`).
   - Copia el ID de la url de la hoja de cálculo y colócalo en `GOOGLE_SHEETS_SPREADSHEET_ID`.
7. **Compartir la Hoja:** Comparte el documento en Drive dando acceso de **Editor** al correo del Service Account original (`client_email`).

---

## Columnas Esperadas en Google Sheets

La fila se añade de manera ordenada al final de la pestaña con exactamente estas 20 columnas:

1. **Fecha** - Marca de tiempo con hora local de Panamá en la que se completó el diagnóstico.
2. **Nombre contacto** - El nombre del usuario/prospecto.
3. **Empresa** - Nombre comercial del negocio.
4. **Cargo** - El puesto de trabajo del contacto.
5. **WhatsApp** - Enlace o número telefónico del contacto.
6. **Email** - Correo electrónico de comunicación.
7. **Provincia** - Provincia de ubicación en Panamá.
8. **Distrito** - Distrito de ubicación en Panamá.
9. **Tipo de negocio** - Giro (restaurante, planta, catering, etc.).
10. **Estado del negocio** - Si está operando actualmente o es una apertura nueva.
11. **Puntaje** - Porcentaje de cumplimiento obtenido (ej. `62%`).
12. **Nivel** - Calificación calificada (Alto, Medio, Crítico).
13. **Brechas principales** - Hasta 3 principales brechas de cumplimiento detectadas.
14. **Etiquetas comerciales** - Keywords de brechas operativas detectadas para facilitar segmentación.
15. **Servicios sugeridos** - Servicios recomendados de Tecnialimentos en base a brechas identificadas.
16. **Prioridad comercial** - Estimado de urgencia comercial calculada (Alta, Media, Baja).
17. **Recomendación IA** - El texto con formato markdown redactado dinámicamente por la IA.
18. **Respuestas completas JSON** - Diccionario plano con las respuestas de cada una de las 20 preguntas del cuestionario.
19. **Fuente** - Fijo en: `Diagnóstico gratuito web`.
20. **Estado comercial** - Fijo al ingresar en: `Nuevo diagnóstico`.

---

## Scripts del Proyecto

Accede al directorio del proyecto y ejecuta estos comandos:

- `npm install` - Instala las dependencias del proyecto.
- `npm run dev` - Inicia el servidor de desarrollo local integrado en el puerto 3000.
- `npm run build` - Genera el compilado de producción unificado (React frontend estático y el servidor compiled backend).
- `npm run start` - Despliega y pone en marcha la versión compilada en producción.
- `npm run lint` - Ejecuta revisiones rápidas del compilador de TypeScript.

---

## Endpoints de la API

### 1. `POST /api/recommendation`
Genera el reporte prudente y la retroalimentación cualitativa de experiencia usando el SDK oficial de Google Gemini.
- **Payload esperado:** Mapeos con información de contacto y resultados porcentuales.
- **Acción:** Retorna una guía estructurada en markdown que fomente una consultoría técnica, utilizando frases preventivas ("podría requerir revisión", "conviene validar").

### 2. `POST /api/diagnostic-lead`
Se encarga de procesar los datos de entrada, calcular la prioridad comercial basada en la severidad de las brechas y persistir el registro en Google Sheets.
- **Validación mínima obligatoria:** `contactName`, `companyName`, `whatsapp`, `email`, `businessType`, `scorePercentage`, `diagnosticLevel`, `topAreasToReview`, `commercialTags`, `recommendedServices` y `aiRecommendation`.
- **Cero Interrupciones:** Si la conexión a la API de Google Sheets presenta problemas o no está configurada, el endpoint procesará un registro en consola y retornará exitosamente `{ success: true, stored: false }` para evitar caídas en la experiencia de usuario o la navegación web del cliente.

---

## Seguridad

- **Nunca realices commit** ni dejes rastros de los archivos `.env` o `.env.local` en tu repositorio git.
- Mantén seguras y bajo resguardo tus claves privadas `GEMINI_API_KEY` y `GOOGLE_SHEETS_PRIVATE_KEY`.
- No utilices datos reales en la plantilla `.env.example`.

---

## Fuera de Alcance del MVP Actual

Los siguientes módulos permanecen explícitamente fuera del actual prototipo del diagnóstico MVP gratuito para simplificar la captación:
- Pasarelas e integraciones de pagos en línea.
- Generación y descarga directa en el navegador de reportes PDF avanzados.
- Módulos de autenticación, logotipos de ingreso o perfiles de clientes.
- Integraciones complejas con CRM de terceros o automatizaciones tipo Make/Zapier Webhooks en este estadio.

---

## Roadmap Futuro

- [ ] Implementar diagnósticos pagados para auditorías profundas en sitio.
- [ ] Posibilidad de descontar el valor del diagnóstico pagado en la contratación final de un servicio técnico de Tecnialimentos.
- [ ] Conectar un webhook robusto para sincronizar automáticamente los leads con el CRM interno.
- [ ] Envío automatizado de reporte ejecutivo con un PDF personalizado en el correo electrónico.
- [ ] Panel web interno restringido para análisis de métricas y conversión de leads.

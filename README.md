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
3. **Cuestionario de 25 preguntas (Matriz Ponderada):** Preguntas interactivas oficiales del Excel de autodiagnóstico técnico, ponderadas de 1 a 5 de acuerdo con su nivel de riesgo y normativa de respaldo (total máximo de 79 puntos base). Las opciones de respuesta contemplan *Sí*, *No*, *No estoy seguro* y *No aplica*.
4. **Pantalla de Resultados y Semáforo:** Visualización del puntaje de cumplimiento ponderado en una escala de 0 a 100%, clasificado en tres niveles de cumplimiento (Nivel Alto, Nivel Medio y Revisión prioritaria recomendada) con lenguaje riguroso pero prudente.
5. **Resultado por Áreas:** Desglose del cumplimiento en cada una de las 4 categorías principales: Permisología y cumplimiento documental; Personal manipulador; Control sanitario operativo; y Procesos, calidad e inocuidad.
6. **Recomendación con IA:** Generación en tiempo real de sugerencias expertas mediante Google Gemini, enfocada en guiar al cliente sobre los pasos preventivos sugeridos.
7. **Línea Directa (CTA a WhatsApp):** Generación de enlace hacia WhatsApp directo al equipo consultor (+507 6695-3832) detallando nombre de empresa, tipo de negocio, puntaje obtenido, nivel visible y principales 3 áreas a revisar.
8. **Registro Asíncrono de Leads:** Envío continuo del diagnóstico comercial completo a Google Sheets.

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
18. **Respuestas completas JSON** - Estructura completa serializada en JSON que contiene un diccionario con las respuestas a las 25 preguntas, el desglose de `categoryScores` (puntuación y aplicable por área), la lista de `detectedBreaches` (cada brecha con ponderación, criticidad, tag comercial y servicio asociado), `totalRawScore` y `totalMaxPossibleScore`. Esto facilita análisis y segmentación comercial técnica en el backend.
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

## Matemática de Scoring y Operación

El autodiagnóstico calcula dinámicamente el cumplimiento técnico basándose exactamente en las siguientes directrices y fórmulas:

### 1. Ponderaciones por Pregunta (Weights)
Cada una de las 25 preguntas tiene asignado un puntaje de ponderación (`weight`) derivado de la matriz oficial del autodiagnóstico. En condiciones estándar donde todas las preguntas aplican, la sumatoria es de **79 puntos**.

### 2. Tratamiento de Respuestas
- **Sí:** Suma el 100% de la ponderación asignada a la pregunta (`weight`). Se incrementa tanto el score como el valor máximo posible.
- **No estoy seguro:** Suma un **40%** de la ponderación asignada de manera preventiva. Se incrementa el score parcial (`weight * 0.4`) y el valor máximo total de la pregunta.
- **No:** Suma **0** puntos al score, pero incrementa el total de puntos máximos posibles por el peso íntegro de la pregunta.
- **No aplica:** **Se excluye en su totalidad**. Esto significa que ni aporta puntos al score obtenido ni se acumula en el total máximo aplicable de la fórmula.

### 3. Fórmula de Cumplimiento
El porcentaje de cumplimiento general y de cada categoría se calcula como:
```
scorePercentage = Math.round((Score / MaxPossibleScore) * 100)
```
En caso de que todas las preguntas sean marcadas como "No aplica" (lo que arroja puntos máximos = 0), el porcentaje resultante se establece en `0%` de manera estable.

### 4. Segmentación Comercial y Brechas
Cualquier respuesta calificada como *No* o *No estoy seguro* genera automáticamente una "Brecha Detectada". Éstas se ordenan bajo estrictas directrices comerciales:
1. **Prioridad Comercial:** `high` > `medium` > `low`
2. **Severidad:** Críticas (`critical: true`) primero.
3. **Ponderación:** Mayor peso (`weight`) primero.

El sistema utiliza las 3 principales brechas para la redacción del mensaje dinámico de WhatsApp y para sugerir directamente hasta 3 servicios específicos unificados (sin switches fijos, de forma automatizada por metadatos).

---

---

## Configuración de variables de entorno

Para que el sistema de autodiagnóstico pueda almacenar leads de manera automatizada en Google Sheets y generar recomendaciones hiper-personalizadas utilizando inteligencia artificial mediante Google Gemini, debes preparar la configuración de entorno en tu servidor o crear un archivo local `.env.local` con las siguientes variables:

```env
# Gemini API Key
GEMINI_API_KEY=tu_clave_api_de_gemini

# Google Sheets Spreadsheet Integration
GOOGLE_SHEETS_SPREADSHEET_ID=tu_spreadsheet_id_de_google_sheets
GOOGLE_SHEETS_CLIENT_EMAIL=tu_correo_de_cuenta_de_servicio@proyecto.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_TAB_NAME=Leads Diagnóstico
```

*Nota:* Asegúrate de mantener estas variables a nivel del entorno de ejecución o en archivos protegidos. El archivo `.env.example` sirve como referencia segura y no contiene llaves reales.

---

## Cómo verificar si la configuración está lista

Para validar que las variables de entorno se han cargado de manera correcta, segura y sin errores sintácticos en el servidor, puedes visitar el endpoint de diagnóstico técnico interno:

`GET /api/config-check`

Este endpoint responderá únicamente con booleanos de estado y el nombre de la hoja, garantizando la seguridad al enmascarar correos y nunca divulgar contraseñas o private keys secretas:

```json
{
  "gemini": {
    "configured": true
  },
  "googleSheets": {
    "spreadsheetIdConfigured": true,
    "clientEmailConfigured": true,
    "privateKeyConfigured": true,
    "clientEmailMasked": "tecni...@...iam.gserviceaccount.com",
    "tabName": "Leads Diagnóstico",
    "ready": true
  }
}
```

Si el parámetro `googleSheets.ready` se muestra como `true` y `gemini.configured` se muestra como `true`, la configuración de la integración está lista para operar al 100% en producción.

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

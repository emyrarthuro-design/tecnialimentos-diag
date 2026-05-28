# Tecnialimentos - Diagnóstico Sanitario

Herramienta B2B de captación de leads mediante un diagnóstico inicial gratuito de cumplimiento sanitario para negocios de alimentos en Panamá.

## Descripción
Esta herramienta permite a restaurantes, cafeterías, plantas procesadoras y otros negocios de alimentos completar un cuestionario de 20 preguntas sobre permisos, documentación, personal y controles de calidad. Al finalizar, genera un informe de nivel de cumplimiento y recomendaciones accionables.

## Funcionalidades Principales
- **Diagnóstico Inicial:** 20 preguntas técnicas con opciones "Sí", "No", "No estoy seguro", "No aplica".
- **Cálculo de Resultados:** Puntaje base y categorización por niveles (Alto, Medio, Crítico).
- **IA Integrada:** Genera una breve recomendación experta (usando Gemini) basada en los resultados específicos.
- **Flujo de Captación (Lead Generation):** Captura datos comerciales clave antes de iniciar y los registra directamente en Google Sheets como backend central de almacenamiento.
- **WhatsApp CTA:** Redirige a WhatsApp con un mensaje pre-cargado que detalla las brechas y solicita asesoría.

## Stack Tecnológico
- **Frontend:** React, Vite, Tailwind CSS, Motion (Framer), TypeScript.
- **Backend:** Node.js, Express (servidor integrado con Vite).
- **IA:** Google Gemini SDK (`@google/genai`).
- **Base de Datos / Almacenamiento:** Google Sheets (con Service Account).
- **Despliegue:** Google AI Studio / Cloud Run.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (no lo subas a tu repositorio) con las variables documentadas en `.env.example`:

- `GEMINI_API_KEY`: Requerida para las recomendaciones de IA.
- `GOOGLE_SHEETS_SPREADSHEET_ID`: Requerida. El ID del archivo de Google Sheets.
- `GOOGLE_SHEETS_CLIENT_EMAIL`: Requerida. El correo del Service Account de Google Cloud.
- `GOOGLE_SHEETS_PRIVATE_KEY`: Requerida. La llave privada del Service Account (admite saltos de línea escapados `\n`).
- `GOOGLE_SHEETS_TAB_NAME`: Opcional. Nombre de la pestaña donde insertar los registros (por defecto se usa `"Leads Diagnóstico"`).
- `APP_URL`: Se autoinyecta en AI Studio.

> **¡Atención de Seguridad!** 
> Nunca hagas commit del archivo `.env`. Las llaves como la de Gemini o de tu Google Sheets son sensibles.

## Configuración de Google Sheets para el MVP

Para que el registro funcione correctamente, asegúrate de realizar los siguientes pasos de configuración preliminar:

1. **Compartir Acceso:** Abre tu hoja de cálculo en el navegador y haz clic en "Compartir". Agrega el valor de `GOOGLE_SHEETS_CLIENT_EMAIL` como editor de la hoja.
2. **Estructura de la Hoja:** Asegúrate de que la primera pestaña de la hoja (o la que se especifique en `GOOGLE_SHEETS_TAB_NAME`) esté presente. No es estrictamente obligatorio crear las columnas de antemano puesto que el sistema inserta filas usando un formato ordenado tipo "Apendice", pero se recomienda tener listas cabeceras en la Fila 1 para mayor claridad:
   - *Fila 1 Cabeceras sugeridas:* 
     `Fecha` | `Nombre contacto` | `Empresa` | `Cargo` | `WhatsApp` | `Email` | `Provincia` | `Distrito` | `Tipo de negocio` | `Estado del negocio` | `Puntaje` | `Nivel` | `Brechas principales` | `Etiquetas comerciales` | `Servicios sugeridos` | `Prioridad comercial` | `Recomendación IA` | `Respuestas completas JSON` | `Fuente` | `Estado comercial`

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo en modo local (puerto 3000).
- `npm run build`: Construye la aplicación para producción (bundles del cliente y servidor).
- `npm run start`: Ejecuta la versión compilada de producción.
- `npm run lint`: Ejecuta TypeScript para revisión de tipos.

## Endpoints

- `POST /api/recommendation`: Recibe los resultados del diagnóstico y retorna un análisis contextual de IA vía Gemini.
- `POST /api/diagnostic-lead`: Valida los campos de negocio, respuestas, brechas y recomendaciones, y los inserta de manera asíncrona en Google Sheets. Si hay un fallo de comunicación con Google, registrará internamente el error sin entorpecer la experiencia del usuario.

## Flujo del Diagnóstico

1. **Pantalla de Bienvenida:** Propuesta de valor y aclaración que es un diagnóstico orientativo.
2. **Captura de Leads:** Recopila nombre, empresa, tipo, estatus y contacto.
3. **Cuestionario:** 20 preguntas con barra de progreso.
4. **Resultados e IA:** Calcula el % (0-100), define el semáforo y llama a `/api/recommendation`. Adicionalmente, llama a `/api/diagnostic-lead` para almacenar/enviar el lead a Google Sheets.
5. **CTA:** Botón para abrir chat en WhatsApp y continuar el ciclo comercial.

## Roadmap (Próximos pasos sugeridos)

- [ ] Integración vía Make/Zapier Webhooks para integraciones CRM avanzadas en etapas futuras.
- [ ] Envío automático del reporte en PDF al correo capturado.
- [ ] Panel de administración interno (Dashboard) para ver histórico de leads.
- [ ] Módulo de agendamiento directo de llamadas de consultoría.
- [ ] Autenticación de usuarios para revisión de estatus a largo plazo.

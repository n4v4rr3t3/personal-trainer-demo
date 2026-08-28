# Cuerpo en Construcción

Catálogo de servicios para personal trainers con selección múltiple y cierre de consulta por WhatsApp.

La marca, el profesional, las redes, el WhatsApp y el catálogo viven en `lib/site-config.ts`.

Arquitectura:
- catálogo y datos separados de la interfaz;
- contrato de checkout desacoplado;
- adaptador actual de WhatsApp;
- preparada para sumar Mercado Pago o Stripe sin reescribir el catálogo.

Desarrollo: `npm install && npm run dev`.

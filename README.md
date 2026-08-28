# Cuerpo en Construcción

Catálogo de servicios para personal trainers con selección múltiple y cierre de consulta por WhatsApp.

## Editar un nuevo cliente

La marca, el profesional, las redes, el WhatsApp y el catálogo viven en un solo archivo:

`lib/site-config.ts`

La fotografía principal se reemplaza en:

`public/trainer-hero.webp`

## Arquitectura preparada para crecer

- `lib/site-config.ts`: datos de la marca y catálogo, separados de la interfaz.
- `lib/checkout/types.ts`: contrato estable para cualquier método de checkout.
- `lib/checkout/whatsapp.ts`: integración actual de WhatsApp.
- `lib/checkout/index.ts`: selector de proveedores. Mercado Pago o Stripe se agregan como nuevos adaptadores sin reescribir el catálogo.
- `components/storefront.tsx`: experiencia de compra y carrito.

Cuando se agreguen pagos, los precios numéricos ya tienen lugar en cada servicio mediante la propiedad opcional `price`. El adaptador de Mercado Pago o Stripe debe crear la preferencia/sesión en una ruta segura del servidor y devolver la URL de pago.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

import type { Service } from "@/lib/site-config";
import type { CheckoutContext, CheckoutProvider } from "./types";

export class WhatsAppCheckoutProvider implements CheckoutProvider {
  readonly id = "whatsapp";

  constructor(private readonly phone: string) {}

  createCheckout(services: Service[], context: CheckoutContext) {
    const selected = services.map((service) => `• ${service.name} — ${service.format}`).join("\n");
    const note = context.customerNote?.trim()
      ? `\n\nMi objetivo / consulta:\n${context.customerNote.trim()}`
      : "";
    const message = [
      `Hola, vengo desde la web de ${context.brandName}.`,
      "Me interesan estos servicios:",
      selected,
      note,
      "\n¿Me contás disponibilidad y valores?",
    ].join("\n");

    const digits = this.phone.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }
}

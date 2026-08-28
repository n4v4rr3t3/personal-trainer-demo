import type { StorefrontConfig } from "@/lib/site-config";
import type { CheckoutProvider } from "./types";
import { WhatsAppCheckoutProvider } from "./whatsapp";

export type CheckoutProviderId = "whatsapp";

export function createCheckoutProvider(
  provider: CheckoutProviderId,
  config: StorefrontConfig,
): CheckoutProvider {
  switch (provider) {
    case "whatsapp":
      return new WhatsAppCheckoutProvider(config.contact.whatsapp);
  }
}

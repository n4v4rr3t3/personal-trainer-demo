import type { Service } from "@/lib/site-config";

export type CheckoutContext = {
  brandName: string;
  customerNote?: string;
};

export interface CheckoutProvider {
  readonly id: string;
  createCheckout(services: Service[], context: CheckoutContext): string;
}

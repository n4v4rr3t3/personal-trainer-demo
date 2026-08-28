import { Storefront } from "@/components/storefront";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return <Storefront config={siteConfig} />;
}

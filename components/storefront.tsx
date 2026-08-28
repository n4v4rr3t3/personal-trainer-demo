"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Camera, Check, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { createCheckoutProvider } from "@/lib/checkout";
import type { Service, StorefrontConfig } from "@/lib/site-config";

export function Storefront({ config }: { config: StorefrontConfig }) {
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useMemo(
    () => cartIds.map((id) => config.services.find((service) => service.id === id)).filter(Boolean) as Service[],
    [cartIds, config.services],
  );
  const checkout = useMemo(() => createCheckoutProvider("whatsapp", config), [config]);

  function toggleService(service: Service) {
    const selected = cartIds.includes(service.id);
    setCartIds((current) => selected ? current.filter((id) => id !== service.id) : [...current, service.id]);
    toast.success(selected ? "Servicio quitado" : "Servicio agregado", { description: service.name });
  }

  const checkoutUrl = cart.length
    ? checkout.createCheckout(cart, { brandName: config.brand.name, customerNote: note })
    : "#";

  return (
    <main>
      <Toaster position="bottom-center" />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark">{config.brand.shortName}</span>
          <span>{config.brand.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href={config.contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
        <CartSheet cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen} note={note} setNote={setNote} remove={toggleService} checkoutUrl={checkoutUrl} />
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="kicker"><Sparkles size={15} /> Entrenamiento personal</p>
          <h1>Construí un cuerpo <em>fuerte</em>. Y una rutina que dure.</h1>
          <p className="hero-lede">{config.trainer.bio}</p>
          <div className="hero-actions">
            <Button asChild className="primary-cta"><a href="#servicios">Elegir mi entrenamiento <ArrowDown /></a></Button>
            <a className="text-link" href={config.contact.instagram} target="_blank" rel="noreferrer"><Camera size={18} /> Ver entrenamientos</a>
          </div>
          <div className="hero-proof" aria-label="Características del servicio">
            <span><Check /> Plan personalizado</span>
            <span><Check /> Acompañamiento</span>
            <span><Check /> Según tu objetivo</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image src={config.trainer.image} alt="Imagen ilustrativa de entrenamiento personal" fill priority sizes="(max-width: 900px) 100vw, 46vw" />
          <div className="hero-stamp"><span>{config.trainer.role}</span><strong>{config.trainer.name}</strong></div>
          <div className="vertical-word" aria-hidden="true">DISCIPLINA · FUERZA · PROGRESO</div>
        </div>
      </section>

      <section className="services-section" id="servicios">
        <div className="section-heading">
          <div><p className="kicker">Servicios</p><h2>Elegí cómo querés empezar.</h2></div>
          <p>Sumá uno o más servicios. Al finalizar, enviamos tu selección por WhatsApp para coordinar disponibilidad y valores.</p>
        </div>
        <div className="service-grid">
          {config.services.map((service, index) => {
            const selected = cartIds.includes(service.id);
            return (
              <article className={`service-card ${service.featured ? "featured" : ""}`} key={service.id}>
                <div className="service-number">0{index + 1}</div>
                <div><p className="service-eyebrow">{service.eyebrow}</p><h3>{service.name}</h3><p className="service-description">{service.description}</p></div>
                <div className="service-meta"><span>{service.format}</span><strong>{service.priceLabel}</strong></div>
                <Button variant={selected ? "secondary" : "default"} className="service-button" onClick={() => toggleService(service)} aria-pressed={selected}>
                  {selected ? <><Minus /> Quitar de mi selección</> : <><Plus /> Agregar servicio</>}
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="process-section" id="como-funciona">
        <div className="process-intro"><p className="kicker">Simple y personal</p><h2>Tu próximo paso, sin vueltas.</h2></div>
        <ol className="process-list">
          <li><span>1</span><div><strong>Elegí</strong><p>Marcá los servicios que mejor encajan con tu objetivo.</p></div></li>
          <li><span>2</span><div><strong>Contanos</strong><p>Sumá una breve nota sobre lo que querés conseguir.</p></div></li>
          <li><span>3</span><div><strong>Coordinamos</strong><p>Recibís disponibilidad, valores y una propuesta personalizada.</p></div></li>
        </ol>
      </section>

      <section className="closing-cta">
        <p>{config.brand.claim}</p><h2>Empezá con el plan correcto para vos.</h2>
        <Button className="primary-cta" onClick={() => setCartOpen(true)}>Ver mi selección <ArrowRight /></Button>
      </section>

      <footer>
        <a className="brand" href="#inicio"><span className="brand-mark">{config.brand.shortName}</span><span>{config.brand.name}</span></a>
        <p>Entrenamiento personal · Heidy Martes</p>
        <a href={config.contact.instagram} target="_blank" rel="noreferrer"><Camera size={17} /> @cuerpoenconstruccion_</a>
      </footer>
    </main>
  );
}

function CartSheet({ cart, cartOpen, setCartOpen, note, setNote, remove, checkoutUrl }: {
  cart: Service[]; cartOpen: boolean; setCartOpen: (open: boolean) => void; note: string;
  setNote: (note: string) => void; remove: (service: Service) => void; checkoutUrl: string;
}) {
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button className="cart-trigger" aria-label={`Abrir selección, ${cart.length} servicios`}><ShoppingBag /><span className="cart-label">Mi selección</span><span className="cart-count">{cart.length}</span></Button>
      </SheetTrigger>
      <SheetContent className="cart-sheet">
        <SheetHeader className="cart-header"><SheetTitle>Tu selección</SheetTitle><SheetDescription>Revisá los servicios antes de continuar por WhatsApp.</SheetDescription></SheetHeader>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart"><ShoppingBag /><strong>Todavía no elegiste servicios.</strong><p>Podés agregar más de uno y consultarlos juntos.</p></div>
          ) : (
            <>
              <div className="cart-items">{cart.map((service) => <div className="cart-item" key={service.id}><div><strong>{service.name}</strong><span>{service.format}</span></div><Button variant="ghost" size="icon-sm" onClick={() => remove(service)} aria-label={`Quitar ${service.name}`}><Minus /></Button></div>)}</div>
              <label className="note-field"><span>¿Cuál es tu objetivo?</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Ej: bajar de peso, ganar masa muscular, mejorar postura..." rows={4} /></label>
            </>
          )}
        </div>
        <SheetFooter className="cart-footer">
          {cart.length ? (
            <Button asChild className="whatsapp-button">
              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                Consultar por WhatsApp <ArrowRight />
              </a>
            </Button>
          ) : (
            <Button className="whatsapp-button" disabled>
              Consultar por WhatsApp <ArrowRight />
            </Button>
          )}
          <p>No se realiza ningún cobro en esta instancia.</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

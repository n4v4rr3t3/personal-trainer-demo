export type Service = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  format: string;
  price?: number;
  priceLabel: string;
  featured?: boolean;
};

export type StorefrontConfig = {
  brand: { name: string; shortName: string; claim: string };
  trainer: { name: string; role: string; bio: string; image: string };
  contact: { whatsapp: string; instagram: string };
  services: Service[];
};

export const siteConfig: StorefrontConfig = {
  brand: {
    name: "Cuerpo en Construcción",
    shortName: "CEC",
    claim: "Tu cuerpo no se improvisa. Se construye.",
  },
  trainer: {
    name: "Heidy Martes",
    role: "Personal trainer",
    bio: "Entrenamiento pensado para tu punto de partida, tu rutina y el objetivo que querés sostener de verdad. Con planificación personalizada y acompañamiento en cada etapa.",
    image: "/trainer-hero.webp",
  },
  contact: {
    whatsapp: "5492236192291",
    instagram: "https://www.instagram.com/cuerpoenconstruccion_/",
  },
  services: [
    {
      id: "descenso-peso",
      eyebrow: "Objetivo",
      name: "Descenso de peso",
      description: "Entrenamiento personalizado y progresivo, planificado según tu punto de partida y tus posibilidades.",
      format: "Plan personalizado",
      priceLabel: "Consultar valor",
      featured: true,
    },
    {
      id: "masa-muscular",
      eyebrow: "Objetivo",
      name: "Ganancia de masa muscular",
      description: "Planificación enfocada en fuerza, técnica y progresión de acuerdo con tu experiencia.",
      format: "Plan personalizado",
      priceLabel: "Consultar valor",
    },
    {
      id: "postura",
      eyebrow: "Bienestar",
      name: "Corrección postural",
      description: "Ejercicios adaptados para trabajar movilidad, control corporal y hábitos de movimiento.",
      format: "Plan personalizado",
      priceLabel: "Consultar valor",
    },
    {
      id: "posparto",
      eyebrow: "Etapa especial",
      name: "Entrenamiento posparto",
      description: "Ejercicios progresivos para acompañar la recuperación y el regreso al movimiento después del parto.",
      format: "Plan adaptado",
      priceLabel: "Consultar valor",
    },
    {
      id: "embarazo",
      eyebrow: "Etapa especial",
      name: "Entrenamiento para embarazadas",
      description: "Entrenamiento específico y adaptado a cada etapa del embarazo, según las necesidades de cada persona.",
      format: "Plan adaptado",
      priceLabel: "Consultar valor",
    },
    {
      id: "alimentacion",
      eyebrow: "Complemento",
      name: "Plan de alimentación",
      description: "Plan organizado de acuerdo con tu objetivo y en coordinación con la planificación del entrenamiento.",
      format: "Complemento del plan",
      priceLabel: "Consultar valor",
    },
  ],
};

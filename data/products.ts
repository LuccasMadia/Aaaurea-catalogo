import { placeholderImage } from "@/lib/placeholder";

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  sizes: string[];
}

export const categories = ["Camisetas Over", "Shorts", "Saias", "Tops"] as const;

const oversizedSizes = ["P", "M", "G", "GG"];
const bottomSizes = ["36", "38", "40", "42"];

// Imagens placeholder geradas localmente (ver lib/placeholder.ts) — trocar
// por fotografia real dos produtos do cliente antes de publicar.
export const products: Product[] = [
  {
    slug: "camiseta-over-luz",
    name: "Camiseta Over Luz",
    price: 129.9,
    category: "Camisetas Over",
    images: [
      placeholderImage("Camiseta Over Luz"),
      placeholderImage("Camiseta Over Luz 2", "EDE4D3"),
    ],
    description:
      "Camiseta oversized 100% algodão, caimento solto e confortável, com estampa minimalista inspirada em luz e propósito.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-graca",
    name: "Camiseta Over Graça",
    price: 139.9,
    category: "Camisetas Over",
    images: [
      placeholderImage("Camiseta Over Graça"),
      placeholderImage("Camiseta Over Graça 2", "EDE4D3"),
    ],
    description:
      "Modelagem over em algodão pesado, gola careca reforçada e estampa discreta bordada no peito.",
    sizes: oversizedSizes,
  },
  {
    slug: "short-essencia",
    name: "Short Essência",
    price: 99.9,
    category: "Shorts",
    images: [
      placeholderImage("Short Essência"),
      placeholderImage("Short Essência 2", "EDE4D3"),
    ],
    description:
      "Short de alfaiataria leve, cintura alta e caimento reto — conforto pro dia a dia sem perder a elegância.",
    sizes: bottomSizes,
  },
  {
    slug: "short-alto-proposito",
    name: "Short Alto Propósito",
    price: 109.9,
    category: "Shorts",
    images: [
      placeholderImage("Short Alto Propósito"),
      placeholderImage("Short Alto Propósito 2", "EDE4D3"),
    ],
    description:
      "Cintura super alta, tecido estruturado e comprimento pensado pra modéstia sem abrir mão do estilo.",
    sizes: bottomSizes,
  },
  {
    slug: "saia-midi-serenidade",
    name: "Saia Midi Serenidade",
    price: 159.9,
    category: "Saias",
    images: [
      placeholderImage("Saia Midi Serenidade"),
      placeholderImage("Saia Midi Serenidade 2", "EDE4D3"),
    ],
    description:
      "Saia midi fluida em tecido leve, caimento solto e fenda discreta — versátil do trabalho ao culto de domingo.",
    sizes: bottomSizes,
  },
  {
    slug: "saia-plissada-fe",
    name: "Saia Plissada Fé",
    price: 169.9,
    category: "Saias",
    images: [
      placeholderImage("Saia Plissada Fé"),
      placeholderImage("Saia Plissada Fé 2", "EDE4D3"),
    ],
    description:
      "Plissado fino de comprimento midi, elástico na cintura e caimento leve em movimento.",
    sizes: bottomSizes,
  },
  {
    slug: "top-cropped-aurora",
    name: "Top Cropped Aurora",
    price: 79.9,
    category: "Tops",
    images: [
      placeholderImage("Top Cropped Aurora"),
      placeholderImage("Top Cropped Aurora 2", "EDE4D3"),
    ],
    description:
      "Top cropped de alças largas em malha canelada, pensado pra compor looks em camadas com modéstia.",
    sizes: oversizedSizes,
  },
  {
    slug: "top-alcas-renovo",
    name: "Top Alças Renovo",
    price: 84.9,
    category: "Tops",
    images: [
      placeholderImage("Top Alças Renovo"),
      placeholderImage("Top Alças Renovo 2", "EDE4D3"),
    ],
    description:
      "Alças ajustáveis, tecido leve e caimento solto — feito pra usar por baixo de camisas over ou sozinho.",
    sizes: oversizedSizes,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategories(): string[] {
  return [...categories];
}

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

// Catálogo temporariamente restrito a camisetas — reativar as demais
// categorias quando houver fotos/estoque real das outras peças.
export const categories = ["Camisetas Over"] as const;

const oversizedSizes = ["P", "M", "G", "GG"];

// A 1ª imagem de cada produto vem de public/images/<slug>.webp (foto real,
// fornecida pelo cliente). A 2ª segue como placeholder SVG (ver
// lib/placeholder.ts) até haver uma segunda foto real.
export const products: Product[] = [
  {
    slug: "camiseta-over-luz",
    name: "Camiseta Over Luz",
    price: 129.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-luz.webp",
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
      "/images/camiseta-over-graca.webp",
      placeholderImage("Camiseta Over Graça 2", "EDE4D3"),
    ],
    description:
      "Modelagem over em algodão pesado, gola careca reforçada e estampa discreta bordada no peito.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-fe",
    name: "Camiseta Over Fé",
    price: 129.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-fe.webp",
      placeholderImage("Camiseta Over Fé 2", "EDE4D3"),
    ],
    description:
      "Camiseta oversized em algodão macio, caimento solto e estampa minimalista com a palavra Fé.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-paz",
    name: "Camiseta Over Paz",
    price: 134.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-paz.webp",
      placeholderImage("Camiseta Over Paz 2", "EDE4D3"),
    ],
    description:
      "Modelagem over em algodão pesado, gola careca reforçada e estampa discreta inspirada em paz.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-esperanca",
    name: "Camiseta Over Esperança",
    price: 129.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-esperanca.webp",
      placeholderImage("Camiseta Over Esperança 2", "EDE4D3"),
    ],
    description:
      "Camiseta oversized 100% algodão, caimento solto e confortável, com estampa minimalista inspirada em esperança.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-bencao",
    name: "Camiseta Over Bênção",
    price: 139.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-bencao.webp",
      placeholderImage("Camiseta Over Bênção 2", "EDE4D3"),
    ],
    description:
      "Modelagem over em algodão pesado, gola careca reforçada e estampa discreta bordada no peito.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-refugio",
    name: "Camiseta Over Refúgio",
    price: 134.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-refugio.webp",
      placeholderImage("Camiseta Over Refúgio 2", "EDE4D3"),
    ],
    description:
      "Camiseta oversized em algodão macio, caimento solto e estampa minimalista com a palavra Refúgio.",
    sizes: oversizedSizes,
  },
  {
    slug: "camiseta-over-vida",
    name: "Camiseta Over Vida",
    price: 129.9,
    category: "Camisetas Over",
    images: [
      "/images/camiseta-over-vida.webp",
      placeholderImage("Camiseta Over Vida 2", "EDE4D3"),
    ],
    description:
      "Camiseta oversized 100% algodão, caimento solto e confortável, com estampa minimalista inspirada em vida nova.",
    sizes: oversizedSizes,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategories(): string[] {
  return [...categories];
}

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

// Imagens placeholder (placehold.co) — trocar por fotografia real dos
// produtos do cliente antes de publicar.
export const products: Product[] = [
  {
    slug: "camiseta-over-luz",
    name: "Camiseta Over Luz",
    price: 129.9,
    category: "Camisetas Over",
    images: [
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Camiseta+Over+Luz",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Camiseta+Over+Luz+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Camiseta+Over+Graca",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Camiseta+Over+Graca+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Short+Essencia",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Short+Essencia+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Short+Alto+Proposito",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Short+Alto+Proposito+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Saia+Midi+Serenidade",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Saia+Midi+Serenidade+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Saia+Plissada+Fe",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Saia+Plissada+Fe+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Top+Cropped+Aurora",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Top+Cropped+Aurora+2",
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
      "https://placehold.co/800x1000/F5F0E8/2A2320?text=Top+Alcas+Renovo",
      "https://placehold.co/800x1000/EDE4D3/2A2320?text=Top+Alcas+Renovo+2",
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

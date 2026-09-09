# Landing Page "Áurea" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Next.js landing page + product detail page for "Áurea", a fictional Christian modest-fashion brand ("conceito over"), as a portfolio piece — catalog with category filter, WhatsApp order flow, no backend.

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind CSS. Product data lives in a single static file (`data/products.ts`). No database, no API routes, no auth. The home page (`app/page.tsx`) composes presentational sections; a client component (`CatalogSection`) owns the category-filter state; the product detail route (`app/produto/[slug]/page.tsx`) is statically generated via `generateStaticParams` and calls `notFound()` for unknown slugs.

**Tech Stack:** Next.js ^14.2, React ^18.3, TypeScript ^5.4, Tailwind CSS ^3.4, `next/font/google` (Playfair Display + Inter). Images via `https://placehold.co` placeholders in the brand palette (swap for real product photography later — noted inline in code).

## Global Constraints

- Node.js 18.17+ required (Next.js 14 minimum).
- Package manager: npm (use `npm install` / `npm run <script>`, not yarn/pnpm).
- No automated test suite (per approved spec — this is a portfolio piece, out of scope). Verification instead uses `npm run build` (type/compile check) and `curl` against the dev server to assert expected text/status codes, plus a final manual browser QA pass.
- Mobile-first, responsive at minimum for mobile / tablet / desktop breakpoints.
- Brand palette (Tailwind custom colors): `cream #F5F0E8`, `ink #2A2320`, `gold #C9A961`, `terracotta #B5653F`, `warmgray #6B6058`.
- Fonts: serif = Playfair Display (headings), sans = Inter (body).
- WhatsApp number is a placeholder (`5511999999999`) marked with a comment to replace with the real store number — never hardcode it in more than one place (`lib/whatsapp.ts`).
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Import alias: `@/*` maps to the project root.

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`

**Interfaces:**
- Produces: Tailwind color tokens `cream`, `ink`, `gold`, `terracotta`, `warmgray`; font families `font-serif` (Playfair Display), `font-sans` (Inter); import alias `@/*`.
- Consumes: nothing (first task).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "aurea-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.js`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        ink: "#2A2320",
        gold: "#C9A961",
        terracotta: "#B5653F",
        warmgray: "#6B6058",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create `.gitignore`**

```
node_modules
.next
out
.env*.local
npm-debug.log*
next-env.d.ts
```

- [ ] **Step 7: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 8: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Áurea | Vestindo Identidade e Propósito",
  description:
    "Moda cristã modesta com conceito over. Camisetas, shorts, saias e tops feitos pra vestir sua identidade e propósito.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans bg-cream text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Create placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream">
      <p className="font-serif text-3xl text-ink">Áurea</p>
    </main>
  );
}
```

- [ ] **Step 10: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 11: Verify the build compiles**

Run: `npm run build`
Expected: output contains `Compiled successfully`.

- [ ] **Step 12: Verify the page renders**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000 | grep -o "Áurea" && kill %1`
Expected: prints `Áurea`.

- [ ] **Step 13: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.js tailwind.config.ts postcss.config.js .gitignore app/globals.css app/layout.tsx app/page.tsx
git commit -m "chore: scaffold Next.js + Tailwind project"
```

---

### Task 2: Product data + WhatsApp utility

**Files:**
- Create: `data/products.ts`
- Create: `lib/whatsapp.ts`

**Interfaces:**
- Consumes: nothing new (pure data/logic layer).
- Produces:
  - `Product` type: `{ slug: string; name: string; price: number; category: string; images: string[]; description: string; sizes: string[] }`
  - `products: Product[]`
  - `getProductBySlug(slug: string): Product | undefined`
  - `getCategories(): string[]`
  - `STORE_WHATSAPP_NUMBER: string`
  - `buildWhatsAppUrl(productName: string, size: string): string`

- [ ] **Step 1: Create `data/products.ts`**

```ts
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
```

- [ ] **Step 2: Create `lib/whatsapp.ts`**

```ts
// Número de WhatsApp placeholder — substituir pelo número real da loja
// antes de publicar. Único lugar do código onde esse número aparece.
export const STORE_WHATSAPP_NUMBER = "5511999999999";

export function buildWhatsAppUrl(productName: string, size: string): string {
  const message = `Olá! Tenho interesse na ${productName}, tamanho ${size}.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add data/products.ts lib/whatsapp.ts
git commit -m "feat: add static product data and WhatsApp URL builder"
```

---

### Task 3: Header + Footer

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Header` (no props), `Footer` (no props) — reused on both home and product pages.

- [ ] **Step 1: Create `components/Header.tsx`**

```tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-ink">
          Áurea
        </Link>
        <nav className="hidden gap-8 text-sm uppercase tracking-widest text-warmgray sm:flex">
          <a href="/#colecao" className="transition-colors hover:text-gold">
            Coleção
          </a>
          <a href="/#sobre" className="transition-colors hover:text-gold">
            Sobre
          </a>
          <a href="/#contato" className="transition-colors hover:text-gold">
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer id="contato" className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
        <p className="font-serif text-2xl text-ink">Áurea</p>
        <p className="text-warmgray">
          Loja online · Envio pra todo o Brasil 🇧🇷
        </p>
        <div className="flex gap-6 text-sm uppercase tracking-widest text-warmgray">
          <a
            href="https://www.instagram.com/aaaurea_/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-warmgray/70">
          © {new Date().getFullYear()} Áurea. Peça de portfólio — não é uma
          loja real.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Modify `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center bg-cream">
        <p className="font-serif text-3xl text-ink">Áurea</p>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: output contains `Compiled successfully`.

- [ ] **Step 5: Verify header and footer render**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000 | grep -o "Instagram" && kill %1`
Expected: prints `Instagram`.

- [ ] **Step 6: Commit**

```bash
git add components/Header.tsx components/Footer.tsx app/page.tsx
git commit -m "feat: add site header and footer"
```

---

### Task 4: Hero section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Hero` (no props).

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-gold">
            Linha cristã · Moda modesta
          </p>
          <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Vestindo Identidade e Propósito
          </h1>
          <p className="mt-6 max-w-md text-lg text-warmgray">
            Peças over, feitas pra quem veste fé e estilo sem abrir mão de
            nenhum dos dois. Envio pra todo o Brasil.
          </p>
          <a
            href="#colecao"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-ink"
          >
            Ver coleção
          </a>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image
            src="https://placehold.co/900x1125/EDE4D3/2A2320?text=%C3%81urea"
            alt="Modelo vestindo peça oversized da coleção Áurea"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: output contains `Compiled successfully`.

- [ ] **Step 4: Verify hero renders**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000 | grep -o "Vestindo Identidade e Propósito" && kill %1`
Expected: prints `Vestindo Identidade e Propósito`.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add hero section"
```

---

### Task 5: About / Propósito section

**Files:**
- Create: `components/AboutSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `AboutSection` (no props).

- [ ] **Step 1: Create `components/AboutSection.tsx`**

```tsx
export default function AboutSection() {
  return (
    <section id="sobre" className="border-y border-ink/10 bg-white/40">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
          Nossa história
        </p>
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">
          Moda que veste o que você acredita
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-warmgray">
          A Áurea nasceu pra provar que dá pra vestir modéstia com atitude.
          Cada peça é pensada pra quem quer se vestir com propósito —
          conforto no caimento over, leveza no estilo e identidade em cada
          detalhe. Roupa que acompanha sua fé, não que compete com ela.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: output contains `Compiled successfully`.

- [ ] **Step 4: Verify about section renders**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000 | grep -o "Moda que veste o que você acredita" && kill %1`
Expected: prints `Moda que veste o que você acredita`.

- [ ] **Step 5: Commit**

```bash
git add components/AboutSection.tsx app/page.tsx
git commit -m "feat: add about/propósito section"
```

---

### Task 6: Catalog (filterable product grid)

**Files:**
- Create: `components/ProductCard.tsx`
- Create: `components/ProductGrid.tsx`
- Create: `components/CategoryFilter.tsx`
- Create: `components/CatalogSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Product` type, `products`, `getCategories()` from `data/products.ts` (Task 2).
- Produces:
  - `ProductCard({ product: Product })`
  - `ProductGrid({ products: Product[] })`
  - `CategoryFilter({ categories: string[]; selected: string; onSelect: (category: string) => void })`
  - `CatalogSection({ products: Product[]; categories: string[] })` — client component, owns filter state, renders `#colecao` section.

- [ ] **Step 1: Create `components/ProductCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-ink/10 bg-white/50 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-gold">
          {product.category}
        </p>
        <h3 className="mt-1 font-serif text-lg text-ink">{product.name}</h3>
        <p className="mt-1 text-warmgray">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `components/ProductGrid.tsx`**

```tsx
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-warmgray">
        Nenhum produto encontrado nessa categoria.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/CategoryFilter.tsx`**

```tsx
interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const options = ["Todos", ...categories];

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded-full border px-5 py-2 text-sm uppercase tracking-widest transition-colors ${
            selected === option
              ? "border-ink bg-ink text-cream"
              : "border-ink/20 text-warmgray hover:border-gold hover:text-gold"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/CatalogSection.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";
import type { Product } from "@/data/products";

export default function CatalogSection({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [selected, setSelected] = useState("Todos");

  const filtered = useMemo(() => {
    if (selected === "Todos") return products;
    return products.filter((product) => product.category === selected);
  }, [products, selected]);

  return (
    <section id="colecao" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
          Coleção
        </p>
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">
          Peças em destaque
        </h2>
      </div>
      <CategoryFilter
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />
      <ProductGrid products={filtered} />
    </section>
  );
}
```

- [ ] **Step 5: Modify `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CatalogSection from "@/components/CatalogSection";
import Footer from "@/components/Footer";
import { products, getCategories } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <CatalogSection products={products} categories={getCategories()} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Verify the build compiles**

Run: `npm run build`
Expected: output contains `Compiled successfully`.

- [ ] **Step 7: Verify catalog renders with products**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000 | grep -o "Camiseta Over Luz" && kill %1`
Expected: prints `Camiseta Over Luz`.

- [ ] **Step 8: Commit**

```bash
git add components/ProductCard.tsx components/ProductGrid.tsx components/CategoryFilter.tsx components/CatalogSection.tsx app/page.tsx
git commit -m "feat: add filterable product catalog to home page"
```

---

### Task 7: Values section + final home page assembly

**Files:**
- Create: `components/ValuesSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `ValuesSection` (no props). Finalizes home page section order: Hero → About → Catalog → Values.

- [ ] **Step 1: Create `components/ValuesSection.tsx`**

```tsx
const values = [
  {
    title: "Modéstia com estilo",
    description:
      "Peças over que cobrem com propósito, sem abrir mão de tendência e atitude.",
  },
  {
    title: "Identidade",
    description:
      "Moda que reflete quem você é e no que você acredita, todos os dias.",
  },
  {
    title: "Feito pra durar",
    description:
      "Tecidos e caimento pensados pra acompanhar você além da estação.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-white/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="mx-auto mb-4 h-px w-10 bg-gold" />
              <h3 className="font-serif text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-warmgray">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Modify `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CatalogSection from "@/components/CatalogSection";
import ValuesSection from "@/components/ValuesSection";
import Footer from "@/components/Footer";
import { products, getCategories } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <CatalogSection products={products} categories={getCategories()} />
        <ValuesSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: output contains `Compiled successfully`.

- [ ] **Step 4: Verify values section renders**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000 | grep -o "Feito pra durar" && kill %1`
Expected: prints `Feito pra durar`.

- [ ] **Step 5: Commit**

```bash
git add components/ValuesSection.tsx app/page.tsx
git commit -m "feat: add values section and finalize home page layout"
```

---

### Task 8: Product detail page

**Files:**
- Create: `components/ProductGallery.tsx`
- Create: `components/SizeSelector.tsx`
- Create: `components/WhatsAppButton.tsx`
- Create: `components/ProductPurchasePanel.tsx`
- Create: `app/produto/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Product`, `getProductBySlug`, `products` from `data/products.ts` (Task 2); `buildWhatsAppUrl` from `lib/whatsapp.ts` (Task 2); `Header`, `Footer` from Task 3.
- Produces:
  - `WhatsAppButton({ href: string; label?: string })`
  - `ProductGallery({ images: string[]; productName: string })`
  - `SizeSelector({ sizes: string[]; selected: string; onSelect: (size: string) => void })`
  - `ProductPurchasePanel({ product: Product })` — client component combining size selection + WhatsApp button.
  - Route `/produto/[slug]` — statically generated for all products, calls `notFound()` for unknown slugs.

- [ ] **Step 1: Create `components/WhatsAppButton.tsx`**

```tsx
interface WhatsAppButtonProps {
  href: string;
  label?: string;
}

export default function WhatsAppButton({
  href,
  label = "Quero esse no WhatsApp",
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full rounded-full bg-gold px-8 py-3 text-center text-sm uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream sm:w-auto"
    >
      {label}
    </a>
  );
}
```

- [ ] **Step 2: Create `components/ProductGallery.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
        <Image
          src={images[active]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-20 w-16 overflow-hidden rounded-lg border-2 ${
                active === index ? "border-gold" : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/SizeSelector.tsx`**

```tsx
interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selected,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-sm uppercase tracking-widest text-warmgray">
        Tamanho
      </p>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`h-11 w-11 rounded-full border text-sm transition-colors ${
              selected === size
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 text-ink hover:border-gold"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `components/ProductPurchasePanel.tsx`**

```tsx
"use client";

import { useState } from "react";
import SizeSelector from "./SizeSelector";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/data/products";

export default function ProductPurchasePanel({
  product,
}: {
  product: Product;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="mt-8 space-y-6">
      <SizeSelector
        sizes={product.sizes}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />
      <WhatsAppButton href={buildWhatsAppUrl(product.name, selectedSize)} />
    </div>
  );
}
```

- [ ] **Step 5: Create `app/produto/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import { getProductBySlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
          <div>
            <p className="text-sm uppercase tracking-widest text-gold">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl text-warmgray">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="mt-6 leading-relaxed text-warmgray">
              {product.description}
            </p>
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Verify the build compiles and prerenders product routes**

Run: `npm run build`
Expected: output contains `Compiled successfully` and lists `/produto/[slug]` among the generated routes.

- [ ] **Step 7: Verify a real product page renders**

Run: `npm run dev & sleep 5 && curl -s http://localhost:3000/produto/camiseta-over-luz | grep -o "Quero esse no WhatsApp" && kill %1`
Expected: prints `Quero esse no WhatsApp`.

- [ ] **Step 8: Verify an unknown slug returns 404**

Run: `npm run dev & sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/produto/produto-inexistente && kill %1`
Expected: prints `404`.

- [ ] **Step 9: Commit**

```bash
git add components/WhatsAppButton.tsx components/ProductGallery.tsx components/SizeSelector.tsx components/ProductPurchasePanel.tsx app/produto
git commit -m "feat: add product detail page with WhatsApp order flow"
```

---

### Task 9: Responsive & accessibility QA pass (final)

**Files:**
- Modify: any component file where an issue is found during this pass (no new files expected).

**Interfaces:**
- Consumes: the full site built in Tasks 1-8.
- Produces: nothing new — this task only verifies and fixes.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000` without errors.

- [ ] **Step 2: Manually check the home page in the browser at three breakpoints**

Open `http://localhost:3000` and resize (or use browser dev tools device toolbar) to check:
- Mobile (~375px wide): hero stacks vertically, nav links hidden (hamburger not required — links can simply be hidden per current `sm:flex` header), product grid shows 2 columns, category filter buttons wrap without overflow.
- Tablet (~768px): product grid shows 3 columns, hero shows side-by-side layout.
- Desktop (~1280px): product grid shows 4 columns, all content stays within the `max-w-6xl` container with visible margins.

Fix any overflow/wrapping issue found by adjusting the relevant Tailwind classes in the affected component.

- [ ] **Step 3: Confirm the "broken image" requirement is satisfied by design**

The spec requires a consistent-with-the-palette fallback when a product image is missing/broken. Every image in this build comes from `https://placehold.co` (a single reliable, controlled source rendered in the brand palette) rather than externally hosted real photos — so there is no scenario where an unreliable third-party photo fails to load. Confirm this by loading the home page and a product page with dev tools' Network tab open: all `placehold.co` image requests should return `200`. No `onError` fallback code is needed while placeholders are in use; add one when real product photography (hosted elsewhere) replaces the placeholders.

- [ ] **Step 4: Manually check a product detail page**

Open `http://localhost:3000/produto/camiseta-over-luz`:
- Confirm gallery thumbnails switch the main image on click.
- Confirm selecting a different size updates the WhatsApp link (inspect the link's `href` in dev tools — it should contain the new size, e.g. `tamanho%20G`).
- Confirm the layout stacks to a single column on mobile width and two columns on desktop.

- [ ] **Step 5: Check color contrast**

Using browser dev tools' accessibility/contrast checker (or a manual check), confirm:
- Body text (`warmgray` `#6B6058` on `cream` `#F5F0E8`) passes WCAG AA for normal text (contrast ratio ≥ 4.5:1).
- Heading text (`ink` `#2A2320` on `cream`) passes AA comfortably (high contrast).

If `warmgray` fails AA, darken it in `tailwind.config.ts` (e.g. to `#5A4F47`) and re-check.

- [ ] **Step 6: Run a final full build**

Run: `npm run build`
Expected: output contains `Compiled successfully` with no warnings about missing `alt` text or accessibility issues.

- [ ] **Step 7: Commit any fixes made during this pass**

```bash
git add -A
git commit -m "fix: responsive and accessibility adjustments from QA pass"
```

If no fixes were needed, skip this commit.

# GSAP Scroll-Reveal Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle fade+slide entrance animations (powered by GSAP + ScrollTrigger) across every major section of the Áurea site, giving it a more premium feel without touching colors, typography, or layout.

**Architecture:** A single reusable client component, `components/Reveal.tsx`, owns all GSAP/ScrollTrigger logic (fade-in + 24px upward slide, fires once when ~85% into the viewport, skipped entirely under `prefers-reduced-motion`). Every content component wraps its existing JSX with `<Reveal>` instead of a plain `<div>` — no component gains its own GSAP code.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS, GSAP 3 + ScrollTrigger.

## Global Constraints

- Animation is fade (`opacity` 0→1) + slide (`translateY` 24px→0) only — no parallax, scale, or rotate.
- `ScrollTrigger` config: `start: "top 85%"`, `once: true` (never re-fires on scroll back up).
- Must respect `prefers-reduced-motion: reduce` — skip the animation entirely (render at full opacity, no transform) when it's set.
- Use `gsap.context()` scoped to each `Reveal` instance's ref, and call `ctx.revert()` in the `useEffect`/`useLayoutEffect` cleanup — avoids duplicate `ScrollTrigger` instances under Next.js fast refresh.
- No automated test framework exists in this project (confirmed: no Jest/Vitest/Playwright in `package.json`) — verification is manual via `npm run dev`, matching the rest of the codebase.
- `components/Header.tsx` is out of scope — it's `sticky` and always visible, so it gets no `Reveal` wrapper.
- No hover/click animations — only scroll-triggered entrance.

---

### Task 1: Install GSAP

**Files:**
- Modify: `package.json` (via `npm install`)

**Interfaces:**
- Produces: the `gsap` package available for import as `gsap` and `gsap/ScrollTrigger` in later tasks.

- [ ] **Step 1: Install the package**

Run: `npm install gsap`

- [ ] **Step 2: Verify it landed in package.json**

Run: `grep gsap package.json`
Expected: a line like `"gsap": "^3.12.x"` under `"dependencies"`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap dependency"
```

---

### Task 2: Create the `Reveal` component

**Files:**
- Create: `components/Reveal.tsx`

**Interfaces:**
- Consumes: `gsap` and `gsap/ScrollTrigger` from Task 1.
- Produces: `export default function Reveal({ children, delay, className }: { children: React.ReactNode; delay?: number; className?: string })` — a client component every later task imports and wraps content with.

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (the file compiles; it isn't imported anywhere yet, so nothing else changes).

- [ ] **Step 3: Commit**

```bash
git add components/Reveal.tsx
git commit -m "feat: add Reveal component for scroll-triggered fade+slide"
```

---

### Task 3: Wire `Reveal` into `Hero.tsx`

**Files:**
- Modify: `components/Hero.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`./Reveal`), props `{ className?: string }` (children passed via JSX nesting).

- [ ] **Step 1: Replace the grid `div` with `Reveal`**

Current file (`components/Hero.tsx`):

```tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-goldtext">
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
            src={"/images/hero.webp"}
            alt="Modelo vestindo peça oversized da coleção Áurea"
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
```

Replace it with:

```tsx
import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Reveal className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-goldtext">
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
            src={"/images/hero.webp"}
            alt="Modelo vestindo peça oversized da coleção Áurea"
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: the Hero text+image block fades in and slides up shortly after the page loads (it's above the fold, so it should fire almost immediately). No layout shift, no console errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: reveal Hero content on load"
```

---

### Task 4: Wire `Reveal` into `AboutSection.tsx`

**Files:**
- Modify: `components/AboutSection.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`./Reveal`).

- [ ] **Step 1: Replace the inner `div` with `Reveal`**

Current file:

```tsx
export default function AboutSection() {
  return (
    <section id="sobre" className="border-y border-ink/10 bg-white/40">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-goldtext">
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

Replace with:

```tsx
import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="border-y border-ink/10 bg-white/40">
      <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-goldtext">
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
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open the home page, scroll to the "Nossa história" section.
Expected: the block fades in and slides up as it enters the viewport.

- [ ] **Step 4: Commit**

```bash
git add components/AboutSection.tsx
git commit -m "feat: reveal AboutSection on scroll"
```

---

### Task 5: Wire `Reveal` into `CatalogSection.tsx`

**Files:**
- Modify: `components/CatalogSection.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`./Reveal`).

- [ ] **Step 1: Wrap the heading + filter block in `Reveal`**

Current file:

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
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-goldtext">
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

Replace with:

```tsx
"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";
import Reveal from "./Reveal";
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
      <Reveal>
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-goldtext">
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
      </Reveal>
      <ProductGrid products={filtered} />
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the "Coleção" heading.
Expected: heading + category filter buttons fade in and slide up together as one block. The product grid below still renders (its own reveal comes in Task 6).

- [ ] **Step 4: Commit**

```bash
git add components/CatalogSection.tsx
git commit -m "feat: reveal Catalog heading and filter on scroll"
```

---

### Task 6: Wire `Reveal` into `ProductGrid.tsx` with stagger

**Files:**
- Modify: `components/ProductGrid.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`./Reveal`), prop `delay?: number`.

- [ ] **Step 1: Wrap each `ProductCard` in a staggered `Reveal`**

Current file:

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

Replace with:

```tsx
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
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
      {products.map((product, index) => (
        <Reveal key={product.slug} delay={index * 0.08}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the product grid.
Expected: cards fade in and slide up in sequence, left-to-right/top-to-bottom, each slightly after the previous one (stagger). Switching the category filter re-renders the grid without console errors.

- [ ] **Step 4: Commit**

```bash
git add components/ProductGrid.tsx
git commit -m "feat: stagger-reveal product cards on scroll"
```

---

### Task 7: Wire `Reveal` into `ValuesSection.tsx` with stagger

**Files:**
- Modify: `components/ValuesSection.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`./Reveal`), props `delay?: number`, `className?: string`.

- [ ] **Step 1: Wrap each value item in a staggered `Reveal`**

Current file:

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

Replace with:

```tsx
import Reveal from "./Reveal";

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
          {values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.08}
              className="text-center"
            >
              <div className="mx-auto mb-4 h-px w-10 bg-gold" />
              <h3 className="font-serif text-xl text-ink">{value.title}</h3>
              <p className="mt-3 text-warmgray">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the values section.
Expected: the three value items fade in and slide up in sequence.

- [ ] **Step 4: Commit**

```bash
git add components/ValuesSection.tsx
git commit -m "feat: stagger-reveal values section on scroll"
```

---

### Task 8: Wire `Reveal` into `Footer.tsx`

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`./Reveal`).

- [ ] **Step 1: Replace the inner `div` with `Reveal`**

Current file:

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
            className="transition-colors hover:text-goldtext"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-goldtext"
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

Replace with:

```tsx
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-ink/10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
        <p className="font-serif text-2xl text-ink">Áurea</p>
        <p className="text-warmgray">
          Loja online · Envio pra todo o Brasil 🇧🇷
        </p>
        <div className="flex gap-6 text-sm uppercase tracking-widest text-warmgray">
          <a
            href="https://www.instagram.com/aaaurea_/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-goldtext"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-goldtext"
          >
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-warmgray/70">
          © {new Date().getFullYear()} Áurea. Peça de portfólio — não é uma
          loja real.
        </p>
      </Reveal>
    </footer>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the footer.
Expected: footer content fades in and slides up as it enters the viewport.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: reveal Footer on scroll"
```

---

### Task 9: Wire `Reveal` into the product detail page

**Files:**
- Modify: `app/produto/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Reveal` from Task 2 (`@/components/Reveal`), prop `delay?: number`.

- [ ] **Step 1: Wrap the gallery and info panel separately**

Current file:

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
            <p className="text-sm uppercase tracking-widest text-goldtext">
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

Replace with:

```tsx
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import Reveal from "@/components/Reveal";
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
          <Reveal>
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-sm uppercase tracking-widest text-goldtext">
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
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, open any product page (e.g. `/produto/camiseta-over-luz`).
Expected: gallery fades in first, info panel follows shortly after (0.1s delay). No layout shift, no console errors.

- [ ] **Step 4: Commit**

```bash
git add "app/produto/[slug]/page.tsx"
git commit -m "feat: reveal product gallery and info panel on load"
```

---

### Task 10: Full manual verification pass

**Files:** none (verification only)

- [ ] **Step 1: Fresh dev server**

Run: `npm run dev`, open `http://localhost:3000`.

- [ ] **Step 2: Scroll through the whole home page**

Confirm, in order: Hero fades in near-immediately; "Nossa história" fades in on scroll; "Coleção" heading+filter fade in as one block; product cards fade in with a visible stagger; category filter buttons still work and re-filter without errors; values section fades in with stagger; footer fades in.

- [ ] **Step 3: Check a product page**

Open `/produto/camiseta-over-luz`. Confirm gallery fades in, then the info panel shortly after.

- [ ] **Step 4: Check the browser console**

Open DevTools console on both pages. Expected: no GSAP/ScrollTrigger warnings or errors.

- [ ] **Step 5: Verify reduced-motion is respected**

In Chrome DevTools: `Cmd/Ctrl+Shift+P` → "Rendering" → "Emulate CSS media feature prefers-reduced-motion" → `reduce`. Reload the home page.
Expected: every section is visible immediately at full opacity, with no fade/slide animation.

- [ ] **Step 6: Run a final typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

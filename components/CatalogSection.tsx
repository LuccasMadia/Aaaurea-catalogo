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

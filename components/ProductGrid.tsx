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

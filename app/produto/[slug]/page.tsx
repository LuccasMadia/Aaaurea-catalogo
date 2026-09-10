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

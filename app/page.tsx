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

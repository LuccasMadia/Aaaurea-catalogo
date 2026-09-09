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

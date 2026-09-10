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

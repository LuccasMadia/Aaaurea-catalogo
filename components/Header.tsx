import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-wide text-ink">
          Áurea
        </Link>
        <nav className="hidden gap-8 text-sm uppercase tracking-widest text-warmgray sm:flex">
          <a href="/#colecao" className="transition-colors hover:text-goldtext">
            Coleção
          </a>
          <a href="/#sobre" className="transition-colors hover:text-goldtext">
            Sobre
          </a>
          <a href="/#contato" className="transition-colors hover:text-goldtext">
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}

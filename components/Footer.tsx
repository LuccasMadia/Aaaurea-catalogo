import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer id="contato" className="border-t border-ink/10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
        <p className="font-serif text-2xl text-ink">Divinity</p>
        <p className="text-warmgray">
          Loja online · Envio pra todo o Brasil 🇧🇷
        </p>
        <div className="flex gap-6 text-sm uppercase tracking-widest text-warmgray">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-goldtext"
          >
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-goldtext"
          >
            WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-warmgray/70">
          © {new Date().getFullYear()} Divinity. Peça de portfólio — não é uma
          loja real.
        </p>
      </Reveal>
    </footer>
  );
}

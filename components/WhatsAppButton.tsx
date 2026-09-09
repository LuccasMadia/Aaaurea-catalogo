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

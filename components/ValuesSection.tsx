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

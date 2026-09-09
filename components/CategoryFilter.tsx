interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const options = ["Todos", ...categories];

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded-full border px-5 py-2 text-sm uppercase tracking-widest transition-colors ${
            selected === option
              ? "border-ink bg-ink text-cream"
              : "border-ink/20 text-warmgray hover:border-gold hover:text-gold"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

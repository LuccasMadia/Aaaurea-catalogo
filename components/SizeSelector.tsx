interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selected,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-sm uppercase tracking-widest text-warmgray">
        Tamanho
      </p>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`h-11 w-11 rounded-full border text-sm transition-colors ${
              selected === size
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 text-ink hover:border-gold"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        ink: "#2A2320",
        gold: "#C9A961",
        // Dourado mais escuro para uso como cor de texto — o "gold" claro
        // não atinge contraste AA (4.5:1) sobre o fundo creme quando usado
        // como texto; use "gold" só em fundos/bordas e "goldtext" em texto.
        goldtext: "#806428",
        terracotta: "#B5653F",
        warmgray: "#6B6058",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

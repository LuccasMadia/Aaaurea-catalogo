// Gera uma imagem placeholder como SVG embutido (data URI), na paleta da
// marca. Não depende de nenhum serviço externo — trocar por fotografia real
// dos produtos antes de publicar (ver comentário em data/products.ts).
export function placeholderImage(
  text: string,
  background = "F5F0E8",
  foreground = "2A2320",
  width = 800,
  height = 1000
): string {
  const fontSize = Math.round(width / 14);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#${background}" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="#${foreground}">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

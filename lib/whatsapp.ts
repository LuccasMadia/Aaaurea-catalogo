// Número de WhatsApp placeholder — substituir pelo número real da loja
// antes de publicar. Único lugar do código onde esse número aparece.
export const STORE_WHATSAPP_NUMBER = "5511999999999";

export function buildWhatsAppUrl(productName: string, size: string): string {
  const message = `Olá! Tenho interesse na ${productName}, tamanho ${size}.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

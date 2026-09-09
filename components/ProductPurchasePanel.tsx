"use client";

import { useState } from "react";
import SizeSelector from "./SizeSelector";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/data/products";

export default function ProductPurchasePanel({
  product,
}: {
  product: Product;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="mt-8 space-y-6">
      <SizeSelector
        sizes={product.sizes}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />
      <WhatsAppButton href={buildWhatsAppUrl(product.name, selectedSize)} />
    </div>
  );
}

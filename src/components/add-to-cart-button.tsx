"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useShop } from "@/context/shop-context";

type Props = {
  productId: string;
  name: string;
  price: number;
  image: string;
};

export function AddToCartButton({ productId, name, price, image }: Props) {
  const { user, addToCart } = useShop();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (!user) {
      router.push(`/login?next=/product/${productId}`);
      return;
    }
    addToCart({ productId, name, price, image });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button type="button" className="btn btn--primary" onClick={handleClick}>
      {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
    </button>
  );
}

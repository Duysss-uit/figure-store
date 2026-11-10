import Image from "next/image";
import Link from "next/link";
import { formatVnd, productImageSrc } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-tile">
      <Link href={`/product/${product.id}`} className="product-tile__media">
        <Image
          src={productImageSrc(product.image)}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="product-tile__img"
        />
      </Link>
      <div className="product-tile__body">
        <p className="product-tile__cat">{product.category}</p>
        <h3 className="product-tile__title">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-tile__price">{formatVnd(product.price)}</p>
      </div>
    </article>
  );
}

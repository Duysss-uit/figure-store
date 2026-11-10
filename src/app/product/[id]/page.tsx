import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatVnd, productImageSrc } from "@/lib/format";
import { getProduct, getProducts } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="page">
      <div className="product-detail">
        <div className="product-detail__media">
          <Image
            src={productImageSrc(product.image)}
            alt={product.name}
            fill
            sizes="(max-width:900px) 100vw, 50vw"
            className="product-detail__img"
            priority
          />
        </div>
        <div className="product-detail__body">
          <Link
            href={`/figures/${product.category}`}
            className="back-link"
          >
            <span aria-hidden>←</span> Quay lại
          </Link>
          <p className="product-detail__cat">{product.category}</p>
          <h1 className="product-detail__title">{product.name}</h1>
          <p className="product-detail__price">{formatVnd(product.price)}</p>
          <p className="product-detail__desc">{product.description}</p>
          <div className="btn-row">
            <AddToCartButton
              productId={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

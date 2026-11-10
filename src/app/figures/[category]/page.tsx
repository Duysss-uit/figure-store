import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategories, getCategory, getProducts } from "@/lib/products";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: categoryId } = await params;
  const category = await getCategory(categoryId);
  if (!category) notFound();

  const products = await getProducts(categoryId);

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section__head">
          <p className="section__eyebrow">
            <Link href="/figures">Figure</Link> / {category.name}
          </p>
          <h1 className="section__title">{category.name}</h1>
          <p className="section__desc">{category.description}</p>
        </div>

        {products.length === 0 ? (
          <p className="empty-state">Chưa có sản phẩm trong thể loại này.</p>
        ) : (
          <div className="product-grid">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

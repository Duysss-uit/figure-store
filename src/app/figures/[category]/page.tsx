import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBrowser } from "@/components/product-browser";
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
  const [category, categories, products] = await Promise.all([
    getCategory(categoryId),
    getCategories(),
    getProducts(categoryId),
  ]);
  if (!category) notFound();

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section__head">
          <p className="section__eyebrow">
            <Link href="/figures">Tất cả</Link> / {category.name}
          </p>
          <h1 className="section__title">{category.name}</h1>
          <p className="section__desc">{category.description}</p>
        </div>

        <ProductBrowser
          products={products}
          categories={categories}
          lockedCategory={category.id}
          showCategoryFilter={false}
        />
      </section>
    </div>
  );
}

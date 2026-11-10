import { ProductBrowser } from "@/components/product-browser";
import { getCategories, getProducts } from "@/lib/products";

export default async function FiguresPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section__head">
          <p className="section__eyebrow">Cửa hàng</p>
          <h1 className="section__title">Tất cả sản phẩm</h1>
          <p className="section__desc">
            Lọc theo thể loại, khoảng giá hoặc tìm theo tên — sắp xếp theo giá
            và tên tùy ý.
          </p>
        </div>

        <ProductBrowser products={products} categories={categories} />
      </section>
    </div>
  );
}

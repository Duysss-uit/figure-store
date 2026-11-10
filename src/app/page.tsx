import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { productImageSrc } from "@/lib/format";
import { getCategories, getProducts } from "@/lib/products";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  const featured = products.slice(0, 8);
  const heroImage = productImageSrc(
    categories.find((c) => c.id === "anime")?.image ||
      products[0]?.image ||
      "anime-convention-figures.jpg",
  );

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image
            src={heroImage}
            alt="Bộ sưu tập figure anime trưng bày"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero__scrim" />
        <div className="hero__content">
          <h1 className="hero__brand">Figora</h1>
          <p className="hero__lead">
            Cửa hàng figure, Gunpla và đồ sưu tầm — chọn theo thể loại, thêm vào
            giỏ và thanh toán.
          </p>
          <div className="btn-row">
            <Link href="/figures" className="btn btn--primary">
              Xem thể loại figure
            </Link>
            <Link href="/figures/gundam" className="btn btn--ghost">
              Gundam mới về
            </Link>
          </div>
        </div>
      </section>

      <div className="page">
        <section className="section">
          <div className="section__head">
            <p className="section__eyebrow">Thể loại</p>
            <h2 className="section__title">Chọn đúng tủ trưng bày</h2>
            <p className="section__desc">
              Chọn thể loại trên thanh điều hướng hoặc ngay bên dưới để xem
              đúng tủ trưng bày bạn cần.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/figures/${cat.id}`}
                className="category-tile"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Image
                  src={productImageSrc(cat.image)}
                  alt={cat.name}
                  fill
                  sizes="(max-width:768px) 50vw, 20vw"
                  className="category-tile__img"
                />
                <div className="category-tile__overlay" />
                <div className="category-tile__body">
                  <h3 className="category-tile__title">{cat.name}</h3>
                  <p className="category-tile__desc">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__head">
            <p className="section__eyebrow">Nổi bật</p>
            <h2 className="section__title">Hàng đang có trên kệ</h2>
            <p className="section__desc">
              Một vài món đang được quan tâm — mở sản phẩm để thêm vào giỏ.
            </p>
          </div>
          <div className="product-grid">
            {featured.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

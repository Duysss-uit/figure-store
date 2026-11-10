import Image from "next/image";
import Link from "next/link";
import { productImageSrc } from "@/lib/format";
import { getCategories } from "@/lib/products";

export default async function FiguresPage() {
  const categories = await getCategories();

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section__head">
          <p className="section__eyebrow">Figure</p>
          <h1 className="section__title">Danh sách thể loại đồ chơi</h1>
          <p className="section__desc">
            Bấm vào từng thể loại để xem sản phẩm thuộc nhóm đó. Dữ liệu thể
            loại lấy từ <code>public/products/products.json</code>.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/figures/${cat.id}`}
              className="category-tile"
              style={{ animationDelay: `${index * 70}ms` }}
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
                <h2 className="category-tile__title">{cat.name}</h2>
                <p className="category-tile__desc">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

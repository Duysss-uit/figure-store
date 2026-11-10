"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Category, Product } from "@/lib/types";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

type Props = {
  products: Product[];
  categories: Category[];
  /** When set, category filter is locked to this id */
  lockedCategory?: string;
  showCategoryFilter?: boolean;
};

export function ProductBrowser({
  products,
  categories,
  lockedCategory,
  showCategoryFilter = true,
}: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(lockedCategory || "all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    const activeCategory = lockedCategory || category;

    let list = products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
        return false;
      }
      if (min !== null && !Number.isNaN(min) && p.price < min) return false;
      if (max !== null && !Number.isNaN(max) && p.price > max) return false;
      return true;
    });

    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name, "vi"));
        break;
      default:
        break;
    }
    return list;
  }, [products, query, category, lockedCategory, minPrice, maxPrice, sort]);

  function resetFilters() {
    setQuery("");
    if (!lockedCategory) setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
  }

  return (
    <div className="product-browser">
      <div className="filter-bar">
        <div className="field filter-bar__search">
          <label htmlFor="product-search">Tìm kiếm</label>
          <input
            id="product-search"
            type="search"
            placeholder="Tìm theo tên hoặc mô tả…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {showCategoryFilter && !lockedCategory ? (
          <div className="field">
            <label htmlFor="product-category">Thể loại</label>
            <select
              id="product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Tất cả</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="min-price">Giá từ</label>
          <input
            id="min-price"
            type="number"
            min={0}
            step={10000}
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="max-price">Giá đến</label>
          <input
            id="max-price"
            type="number"
            min={0}
            step={10000}
            placeholder="Không giới hạn"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="product-sort">Sắp xếp</label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="featured">Mặc định</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="name-asc">Tên A → Z</option>
            <option value="name-desc">Tên Z → A</option>
          </select>
        </div>

        <div className="filter-bar__actions">
          <button type="button" className="btn btn--ghost" onClick={resetFilters}>
            Xóa lọc
          </button>
        </div>
      </div>

      <p className="filter-bar__count muted">
        {filtered.length} / {products.length} sản phẩm
      </p>

      {filtered.length === 0 ? (
        <p className="empty-state">Không có sản phẩm khớp bộ lọc.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 40}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

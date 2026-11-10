import { promises as fs } from "fs";
import path from "path";
import type { Catalog, Category, Product } from "@/lib/types";

export type { Catalog, Category, Product };

const CATALOG_PATH = path.join(
  process.cwd(),
  "public",
  "products",
  "products.json",
);

export async function getCatalog(): Promise<Catalog> {
  const raw = await fs.readFile(CATALOG_PATH, "utf8");
  return JSON.parse(raw) as Catalog;
}

export async function getCategories(): Promise<Category[]> {
  const catalog = await getCatalog();
  return catalog.categories;
}

export async function getCategory(id: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.id === id);
}

export async function getProducts(categoryId?: string): Promise<Product[]> {
  const catalog = await getCatalog();
  if (!categoryId) return catalog.products;
  return catalog.products.filter((p) => p.category === categoryId);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const catalog = await getCatalog();
  return catalog.products.find((p) => p.id === id);
}

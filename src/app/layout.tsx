import type { Metadata } from "next";
import { Figtree, Outfit } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ShopProvider } from "@/context/shop-context";
import { getCategories } from "@/lib/products";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Figora — Cửa hàng figure & Gunpla",
  description:
    "Figora bán figure, anime, Gundam, Nendoroid và đồ sưu tầm.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await getCategories();

  return (
    <html
      lang="vi"
      className={`${outfit.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ShopProvider>
          <Navbar categories={categories} />
          <main className="flex-1">{children}</main>
          <footer className="site-footer">
            <div className="site-footer__inner">
              <span>Figora</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </footer>
        </ShopProvider>
      </body>
    </html>
  );
}

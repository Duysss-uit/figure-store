import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ShopProvider } from "@/context/shop-context";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Figora — Cửa hàng figure & Gunpla",
  description:
    "Figora bán figure, anime, Gundam, Nendoroid và đồ sưu tầm. Frontend Next.js, dữ liệu sản phẩm từ JSON.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${syne.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ShopProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="site-footer">
            <div className="site-footer__inner">
              <span>Figora — cửa hàng figure frontend</span>
              <span>Dữ liệu sản phẩm đọc từ /public/products</span>
            </div>
          </footer>
        </ShopProvider>
      </body>
    </html>
  );
}

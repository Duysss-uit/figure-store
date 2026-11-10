"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/shop-context";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/figures", label: "Figure" },
];

export function Navbar() {
  const pathname = usePathname();
  const { ready, user, itemCount } = useShop();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <span className="brand__mark">FG</span>
          <span className="brand__name">Figora</span>
        </Link>

        <nav className="nav-links" aria-label="Chính">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link is-active" : "nav-link"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          {!ready ? (
            <span className="header-skeleton" aria-hidden />
          ) : user ? (
            <>
              <Link
                href="/account/cart"
                className="cart-btn"
                aria-label={`Giỏ hàng, ${itemCount} sản phẩm`}
              >
                <CartIcon />
                {itemCount > 0 ? (
                  <span className="cart-btn__badge">{itemCount}</span>
                ) : null}
              </Link>
              <Link
                href="/account"
                className="avatar-link"
                aria-label="Tài khoản"
                title={user.name}
              >
                <Image
                  src={user.avatar || "/avatar-fallback.svg"}
                  alt=""
                  width={36}
                  height={36}
                  className="avatar-link__img"
                  unoptimized
                />
              </Link>
            </>
          ) : (
            <div className="auth-links">
              <Link href="/login" className="auth-link">
                Đăng nhập
              </Link>
              <span className="auth-sep">/</span>
              <Link href="/register" className="auth-link auth-link--strong">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3.5 5h1.7l1.2 11.2a1.5 1.5 0 0 0 1.5 1.3h9.3a1.5 1.5 0 0 0 1.5-1.2L20.5 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

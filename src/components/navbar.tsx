"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useShop } from "@/context/shop-context";
import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
};

export function Navbar({ categories }: Props) {
  const pathname = usePathname();
  const { ready, user, itemCount } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Trang chủ", exact: true },
    { href: "/figures", label: "Tất cả", exact: true },
    ...categories.map((cat) => ({
      href: `/figures/${cat.id}`,
      label: cat.name,
      exact: false,
    })),
  ];

  function isActive(href: string, exact?: boolean) {
    if (exact || href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <span className="brand__mark">FG</span>
          <span className="brand__name">Figora</span>
        </Link>

        <nav className="nav-links" aria-label="Chính">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href, link.exact)
                  ? "nav-link is-active"
                  : "nav-link"
              }
            >
              {link.label}
            </Link>
          ))}
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

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}
        aria-label="Menu di động"
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive(link.href, link.exact) ? "nav-link is-active" : "nav-link"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/account", label: "Tổng quan", exact: true },
  { href: "/account/cart", label: "Giỏ hàng / Đơn hàng" },
  { href: "/account/profile", label: "Thông tin cá nhân" },
  { href: "/account/password", label: "Đổi mật khẩu" },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="account-nav" aria-label="Tài khoản">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "account-nav__link is-active" : "account-nav__link"}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

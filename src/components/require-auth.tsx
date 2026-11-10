"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useShop } from "@/context/shop-context";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, user } = useShop();
  const pathname = usePathname();

  if (!ready) {
    return <p className="muted">Đang tải tài khoản…</p>;
  }

  if (!user) {
    return (
      <div className="panel">
        <h1 className="panel__title">Cần đăng nhập</h1>
        <p className="muted">
          Đăng nhập để xem giỏ hàng, thông tin cá nhân và thanh toán.
        </p>
        <div className="btn-row">
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className="btn btn--primary"
          >
            Đăng nhập
          </Link>
          <Link href="/register" className="btn btn--ghost">
            Đăng ký
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

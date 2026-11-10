"use client";

import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/shop-context";
import { formatVnd } from "@/lib/format";

export default function AccountHomePage() {
  const { user, itemCount, total, logout } = useShop();
  if (!user) return null;

  return (
    <div className="panel form-stack">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Image
          src={user.avatar || "/avatar-fallback.svg"}
          alt=""
          width={64}
          height={64}
          style={{ borderRadius: "999px", border: "2px solid rgba(240,199,94,.5)" }}
          unoptimized
        />
        <div>
          <h1 className="panel__title" style={{ marginBottom: 4 }}>
            Xin chào, {user.name}
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            {user.email}
          </p>
        </div>
      </div>

      <p className="muted">
        Trong giỏ hiện có <strong>{itemCount}</strong> món · tổng{" "}
        <strong>{formatVnd(total)}</strong>
      </p>

      <div className="btn-row">
        <Link href="/account/cart" className="btn btn--primary">
          Xem giỏ hàng / đơn hàng
        </Link>
        <Link href="/account/profile" className="btn btn--ghost">
          Thông tin cá nhân
        </Link>
        <Link href="/account/password" className="btn btn--ghost">
          Đổi mật khẩu
        </Link>
        <button type="button" className="btn btn--ghost" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

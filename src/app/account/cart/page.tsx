"use client";

import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/shop-context";
import { formatVnd, productImageSrc } from "@/lib/format";

export default function AccountCartPage() {
  const { cart, total, updateQty, removeFromCart } = useShop();

  return (
    <div className="panel">
      <h1 className="panel__title">Giỏ hàng / Đơn hàng</h1>
      <p className="muted">
        Đây là phần đơn hàng trong tài khoản. Bấm biểu tượng giỏ trên navbar cũng
        vào trang này.
      </p>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Giỏ hàng trống.</p>
          <Link href="/figures" className="btn btn--primary">
            Tiếp tục mua figure
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.productId} className="cart-row">
                <div className="cart-row__thumb">
                  <Image
                    src={productImageSrc(item.image)}
                    alt={item.name}
                    fill
                    sizes="88px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h2 className="cart-row__title">{item.name}</h2>
                  <p className="cart-row__meta">{formatVnd(item.price)}</p>
                  <div className="qty-control">
                    <button
                      type="button"
                      aria-label="Giảm số lượng"
                      onClick={() => updateQty(item.productId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Tăng số lượng"
                      onClick={() => updateQty(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn--ghost"
                      style={{ minHeight: "1.8rem", padding: "0 .7rem" }}
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="cart-row__side">
                  <strong>{formatVnd(item.price * item.quantity)}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div>
              <p className="muted" style={{ margin: 0 }}>
                Tạm tính
              </p>
              <p style={{ margin: "0.2rem 0 0", fontSize: "1.35rem", fontWeight: 700 }}>
                {formatVnd(total)}
              </p>
            </div>
            <Link href="/checkout" className="btn btn--gold">
              Thanh toán
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

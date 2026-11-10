"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/require-auth";
import { useShop } from "@/context/shop-context";
import { formatVnd, productImageSrc } from "@/lib/format";

export default function CheckoutPage() {
  return (
    <div className="page">
      <RequireAuth>
        <CheckoutForm />
      </RequireAuth>
    </div>
  );
}

function CheckoutForm() {
  const { user, cart, total, clearCart, updateProfile } = useShop();
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setRecipient(user.name || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
  }, [user]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (cart.length === 0) {
      setError("Giỏ hàng trống.");
      return;
    }
    if (!recipient.trim() || !phone.trim() || !address.trim()) {
      setError("Vui lòng nhập đủ thông tin người nhận và địa chỉ.");
      return;
    }
    if (paymentMethod === "card" && (!cardNumber.trim() || !cardName.trim())) {
      setError("Nhập đủ thông tin thẻ.");
      return;
    }
    updateProfile({
      name: recipient.trim(),
      phone: phone.trim(),
      address: address.trim(),
    });
    clearCart();
    setDone(true);
  }

  if (done) {
    return (
      <div className="panel form-stack">
        <h1 className="panel__title">Đặt hàng thành công</h1>
        <p className="muted">Cảm ơn bạn đã đặt hàng tại Figora.</p>
        <div className="btn-row">
          <Link href="/figures" className="btn btn--primary">
            Tiếp tục mua sắm
          </Link>
          <Link href="/account" className="btn btn--ghost">
            Về tài khoản
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-grid">
      <form className="panel form-stack" onSubmit={onSubmit}>
        <h1 className="panel__title">Thanh toán</h1>
        <p className="muted">
          Nhập địa chỉ, thông tin người nhận và phương thức thanh toán.
        </p>

        <div className="field">
          <label htmlFor="recipient">Người nhận</label>
          <input
            id="recipient"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="address">Địa chỉ giao hàng</label>
          <textarea
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="note">Ghi chú</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Giao giờ hành chính, gọi trước khi giao…"
          />
        </div>
        <div className="field">
          <label htmlFor="payment">Phương thức thanh toán</label>
          <select
            id="payment"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="transfer">Chuyển khoản ngân hàng</option>
            <option value="card">Thẻ (demo)</option>
          </select>
        </div>

        {paymentMethod === "card" ? (
          <>
            <div className="field">
              <label htmlFor="cardName">Tên trên thẻ</label>
              <input
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="cardNumber">Số thẻ</label>
              <input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
              />
            </div>
          </>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="btn btn--gold" disabled={cart.length === 0}>
          Xác nhận đặt hàng · {formatVnd(total)}
        </button>
      </form>

      <aside className="panel">
        <h2 className="panel__title" style={{ fontSize: "1.25rem" }}>
          Đơn hàng
        </h2>
        {cart.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có sản phẩm.</p>
            <Link href="/account/cart" className="btn btn--ghost">
              Về giỏ hàng
            </Link>
          </div>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.productId} className="cart-row" style={{ gridTemplateColumns: "64px 1fr" }}>
                <div className="cart-row__thumb" style={{ width: 64, height: 64 }}>
                  <Image
                    src={productImageSrc(item.image)}
                    alt={item.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="cart-row__title">{item.name}</p>
                  <p className="cart-row__meta">
                    x{item.quantity} · {formatVnd(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
            <p style={{ margin: "0.5rem 0 0", fontWeight: 700, fontSize: "1.2rem" }}>
              Tổng: {formatVnd(total)}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

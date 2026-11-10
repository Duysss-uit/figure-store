"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useShop } from "@/context/shop-context";

export default function ProfilePage() {
  const { user, updateProfile } = useShop();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
  }, [user]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    const result = updateProfile({ name, phone, address });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessage("Đã lưu thông tin cá nhân.");
  }

  if (!user) return null;

  return (
    <form className="panel form-stack" onSubmit={onSubmit}>
      <h1 className="panel__title">Thông tin cá nhân</h1>
      <p className="muted">Email: {user.email}</p>
      <div className="field">
        <label htmlFor="name">Họ tên</label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="phone">Số điện thoại</label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="address">Địa chỉ mặc định</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-ok">{message}</p> : null}
      <button type="submit" className="btn btn--primary">
        Lưu thay đổi
      </button>
    </form>
  );
}

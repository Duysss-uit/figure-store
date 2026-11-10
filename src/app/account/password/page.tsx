"use client";

import { useState, type FormEvent } from "react";
import { useShop } from "@/context/shop-context";

export default function PasswordPage() {
  const { resetPassword } = useShop();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    if (newPassword !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    const result = resetPassword(currentPassword, newPassword);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessage("Đã đổi mật khẩu thành công.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirm("");
  }

  return (
    <form className="panel form-stack" onSubmit={onSubmit}>
      <h1 className="panel__title">Đổi / reset mật khẩu</h1>
      <p className="muted">
        Vì không có backend, mật khẩu chỉ được kiểm tra và lưu trên trình duyệt.
      </p>
      <div className="field">
        <label htmlFor="current">Mật khẩu hiện tại</label>
        <input
          id="current"
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="next">Mật khẩu mới</label>
        <input
          id="next"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="confirm">Xác nhận mật khẩu mới</label>
        <input
          id="confirm"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {message ? <p className="form-ok">{message}</p> : null}
      <button type="submit" className="btn btn--primary">
        Cập nhật mật khẩu
      </button>
    </form>
  );
}

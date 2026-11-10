"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useShop } from "@/context/shop-context";

export default function RegisterPage() {
  const { register, user, ready } = useShop();
  const router = useRouter();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (ready && user) router.replace("/account");
  }, [ready, user, router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự.");
      return;
    }
    const result = register({ name, email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/account");
  }

  return (
    <div className="page" style={{ maxWidth: 480 }}>
      <form className="form-card form-stack" onSubmit={onSubmit}>
        <h1>Đăng ký</h1>
        <p className="muted">
          Sau khi đăng ký, avatar và giỏ hàng sẽ hiện góc phải thanh điều hướng.
        </p>
        <div className="field">
          <label htmlFor="name">Họ tên</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="btn btn--primary">
          Tạo tài khoản
        </button>
        <p className="muted">
          Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
}

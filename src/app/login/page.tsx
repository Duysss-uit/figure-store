"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useShop } from "@/context/shop-context";

function LoginForm() {
  const { login, user, ready } = useShop();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, router, next]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login({ email, password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(next);
  }

  return (
    <div className="page" style={{ maxWidth: 480 }}>
      <form className="form-card form-stack" onSubmit={onSubmit}>
        <h1>Đăng nhập</h1>
        <p className="muted">
          Tài khoản lưu trên trình duyệt (localStorage) — không có backend.
        </p>
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
            autoComplete="current-password"
          />
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="btn btn--primary">
          Đăng nhập
        </button>
        <p className="muted">
          Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page muted">Đang tải…</div>}>
      <LoginForm />
    </Suspense>
  );
}

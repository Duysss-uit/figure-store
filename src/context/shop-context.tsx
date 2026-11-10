"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  cartCount,
  cartTotal,
  getCart,
  getSession,
  getUsers,
  saveUsers,
  setCart,
  setSession,
  type CartItem,
  type SessionUser,
  type StoredUser,
} from "@/lib/storage";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type ProfileInput = {
  name: string;
  phone?: string;
  address?: string;
};

type ShopContextValue = {
  ready: boolean;
  user: SessionUser | null;
  cart: CartItem[];
  itemCount: number;
  total: number;
  register: (input: RegisterInput) => { ok: true } | { ok: false; error: string };
  login: (input: LoginInput) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateProfile: (input: ProfileInput) => { ok: true } | { ok: false; error: string };
  resetPassword: (
    currentPassword: string,
    newPassword: string,
  ) => { ok: true } | { ok: false; error: string };
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  updateQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function toSession(user: StoredUser): SessionUser {
  const { password: _password, ...rest } = user;
  return rest;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [cart, setCartState] = useState<CartItem[]>([]);

  useEffect(() => {
    setUser(getSession());
    setCartState(getCart());
    setReady(true);
  }, []);

  const persistCart = useCallback((items: CartItem[]) => {
    setCartState(items);
    setCart(items);
  }, []);

  const register = useCallback((input: RegisterInput) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
      return { ok: false as const, error: "Email đã được đăng ký." };
    }
    const next: StoredUser = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
      avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(input.email)}`,
    };
    saveUsers([...users, next]);
    const session = toSession(next);
    setSession(session);
    setUser(session);
    return { ok: true as const };
  }, []);

  const login = useCallback((input: LoginInput) => {
    const users = getUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === input.email.trim().toLowerCase() &&
        u.password === input.password,
    );
    if (!found) {
      return { ok: false as const, error: "Email hoặc mật khẩu không đúng." };
    }
    const session = toSession(found);
    setSession(session);
    setUser(session);
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (input: ProfileInput) => {
      if (!user) return { ok: false as const, error: "Bạn chưa đăng nhập." };
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx < 0) return { ok: false as const, error: "Không tìm thấy tài khoản." };
      const updated: StoredUser = {
        ...users[idx],
        name: input.name.trim(),
        phone: input.phone?.trim() || "",
        address: input.address?.trim() || "",
      };
      const nextUsers = [...users];
      nextUsers[idx] = updated;
      saveUsers(nextUsers);
      const session = toSession(updated);
      setSession(session);
      setUser(session);
      return { ok: true as const };
    },
    [user],
  );

  const resetPassword = useCallback(
    (currentPassword: string, newPassword: string) => {
      if (!user) return { ok: false as const, error: "Bạn chưa đăng nhập." };
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx < 0) return { ok: false as const, error: "Không tìm thấy tài khoản." };
      if (users[idx].password !== currentPassword) {
        return { ok: false as const, error: "Mật khẩu hiện tại không đúng." };
      }
      if (newPassword.length < 6) {
        return { ok: false as const, error: "Mật khẩu mới tối thiểu 6 ký tự." };
      }
      const nextUsers = [...users];
      nextUsers[idx] = { ...users[idx], password: newPassword };
      saveUsers(nextUsers);
      return { ok: true as const };
    },
    [user],
  );

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      const existing = cart.find((c) => c.productId === item.productId);
      if (existing) {
        persistCart(
          cart.map((c) =>
            c.productId === item.productId
              ? { ...c, quantity: c.quantity + qty }
              : c,
          ),
        );
      } else {
        persistCart([...cart, { ...item, quantity: qty }]);
      }
    },
    [cart, persistCart],
  );

  const updateQty = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        persistCart(cart.filter((c) => c.productId !== productId));
        return;
      }
      persistCart(
        cart.map((c) => (c.productId === productId ? { ...c, quantity } : c)),
      );
    },
    [cart, persistCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      persistCart(cart.filter((c) => c.productId !== productId));
    },
    [cart, persistCart],
  );

  const clearCart = useCallback(() => {
    persistCart([]);
  }, [persistCart]);

  const value = useMemo<ShopContextValue>(
    () => ({
      ready,
      user,
      cart,
      itemCount: cartCount(cart),
      total: cartTotal(cart),
      register,
      login,
      logout,
      updateProfile,
      resetPassword,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
    }),
    [
      ready,
      user,
      cart,
      register,
      login,
      logout,
      updateProfile,
      resetPassword,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

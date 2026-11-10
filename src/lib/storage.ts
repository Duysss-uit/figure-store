export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  avatar?: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type SessionUser = Omit<StoredUser, "password">;

const USERS_KEY = "figora_users";
const SESSION_KEY = "figora_session";
const CART_KEY = "figora_cart";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers(): StoredUser[] {
  return readJson<StoredUser[]>(USERS_KEY, []);
}

export function saveUsers(users: StoredUser[]) {
  writeJson(USERS_KEY, users);
}

export function getSession(): SessionUser | null {
  return readJson<SessionUser | null>(SESSION_KEY, null);
}

export function setSession(user: SessionUser | null) {
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  writeJson(SESSION_KEY, user);
}

export function getCart(): CartItem[] {
  return readJson<CartItem[]>(CART_KEY, []);
}

export function setCart(items: CartItem[]) {
  writeJson(CART_KEY, items);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

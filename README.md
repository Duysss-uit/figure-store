# Figora — Next.js figure shop (frontend only)

Cửa hàng bán figure / anime / Gundam bằng **Next.js App Router**, chỉ frontend.

## Tính năng

- Navbar: **Figure** + khu vực tài khoản góc phải
- Chưa đăng nhập: **Đăng nhập / Đăng ký**
- Đã đăng nhập: **avatar** + **giỏ hàng** (badge số lượng) → `/account/cart`
- Trang `/figures`: danh sách thể loại → `/figures/[category]`
- Tài khoản: giỏ hàng, thông tin cá nhân, đổi mật khẩu
- Thanh toán: địa chỉ, người nhận, phương thức thanh toán
- **Không hard-code sản phẩm** — đọc từ:
  - `public/products/products.json` (tên, giá, loại)
  - `public/products/images/` (ảnh thật tải từ mạng)

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Thêm sản phẩm

1. Thêm ảnh vào `public/products/images/`
2. Thêm object trong `products` (và `categories` nếu cần) trong `products.json`

Auth & giỏ hàng dùng `localStorage` (demo, không có backend).

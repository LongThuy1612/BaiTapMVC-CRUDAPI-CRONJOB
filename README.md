# BaiTapMVC — CRUD API + Cron Job

Hệ thống quản lý người dùng xây dựng bằng Node.js + Express theo kiến trúc MVC thuần.

## Tính năng

- REST API CRUD cho người dùng (tạo, xem, cập nhật, xóa)
- Cron job tự động đếm tổng số người dùng mỗi 5 phút
- Giao diện web SPA (Vanilla JS)
- Lưu trữ bằng SQLite — không cần cài đặt database

## Công nghệ

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Sequelize + SQLite
- **Cron:** node-cron

## Cài đặt và chạy

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3000`

## API Endpoints

| Method | URL | Mô tả |
|--------|-----|--------|
| GET | `/users` | Lấy danh sách user |
| GET | `/users/:id` | Lấy 1 user theo id |
| POST | `/users` | Tạo user mới |
| PUT | `/users/:id` | Cập nhật user |
| DELETE | `/users/:id` | Xóa user |

## Cấu trúc thư mục

```
src/
├── config/         # Kết nối database
├── models/         # Schema + truy vấn DB
├── controllers/    # Validation + xử lý request
├── routes/         # Định nghĩa endpoints
├── cron/           # Cron job
└── public/         # Giao diện web
```

# CLAUDE.md

## Mô tả dự án

Xây dựng hệ thống quản lý người dùng gồm hai phần:

**REST API** — cho phép tạo, xem, cập nhật, xóa người dùng. Mỗi người dùng có họ tên, email, tuổi và trạng thái hoạt động.

**Cron job** — cứ mỗi 5 phút tự động đếm tổng số người dùng trong hệ thống và ghi lại vào log.

## Hướng làm

Tổ chức code theo **MVC thuần** — không thêm Service Layer hay Repository Layer:
- Logic nghiệp vụ và validation đặt trong Controller
- Model chịu trách nhiệm định nghĩa schema và truy vấn dữ liệu
- View là JSON response trả về từ Controller

Dùng **SQLite** thay vì MySQL để không phụ thuộc vào cài đặt DB bên ngoài — phù hợp cho môi trường học.

Cron job viết thẳng trong `src/cron/scheduler.js`, không tách thêm tầng job riêng vì logic đơn giản.

## Cấu trúc thư mục

```
src/
├── config/
│   └── database.js          # Khởi tạo Sequelize + SQLite
├── models/
│   └── user.model.js        # Schema + static methods truy vấn DB
├── controllers/
│   └── user.controller.js   # Validation + xử lý request/response
├── routes/
│   └── user.route.js        # Khai báo endpoints
├── cron/
│   └── scheduler.js         # Cron job mỗi 5 phút
├── public/
│   ├── index.html           # Giao diện web
│   ├── style.css
│   └── users.js             # Gọi API, render UI
├── app.js                   # Cấu hình Express
└── server.js                # Entry point
```

## Ràng buộc nghiệp vụ

- `full_name` và `email` bắt buộc
- `email` không được trùng giữa các người dùng
- `age` nếu có phải >= 0
- `status` chỉ nhận `active` hoặc `inactive`

## Chạy dự án

```bash
npm install
npm run dev
```

File `database.sqlite` tự tạo ở thư mục gốc khi server khởi động lần đầu.

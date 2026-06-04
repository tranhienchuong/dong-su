**Dòng Sử**

Một web app tương tác nhỏ (Next.js + Tailwind) kể lại những cảnh lịch sử dưới dạng tập/scene có lựa chọn, cùng tư liệu lịch sử.

**Quick Start**
- **Yêu cầu:** Node.js (LTS), npm
- Cài dependencies và chạy dev:

```bash
npm install
npm run dev
```

**Scripts**
- `dev`: chạy Next.js ở chế độ phát triển
- `build`: build sản phẩm
- `start`: chạy build
- `lint`: lint dự án

**Project Structure**
- **Root:** [package.json](package.json), [next.config.ts](next.config.ts), [tsconfig.json](tsconfig.json), [tailwind.config.ts](tailwind.config.ts)
- **Public (tài nguyên tĩnh):** `public/` chứa ảnh, maps, v.v. Ảnh cho Chu Nguyên Chương được đặt trong `public/history/zhu-yuanzhang/`.
- **App:** [src/app](src/app) — trang và layout của Next.js (App Router)
  - [src/app/layout.tsx](src/app/layout.tsx) — Root layout và metadata
  - [src/app/page.tsx](src/app/page.tsx) — Trang chủ
  - [src/app/dong-su/zhu-yuanzhang/page.tsx](src/app/dong-su/zhu-yuanzhang/page.tsx) — Trang tập 1: quản lý trạng thái trò chơi, chuyển scene, hiển thị các component
- **Components:** [src/components/dong-su](src/components/dong-su)
  - [src/components/dong-su/StoryScene.tsx](src/components/dong-su/StoryScene.tsx) — bố cục cảnh (hình nền, tiêu đề, tông màu)
  - [src/components/dong-su/ChoiceButton.tsx](src/components/dong-su/ChoiceButton.tsx) — nút lựa chọn và badge chỉ số
  - [src/components/dong-su/StatPanel.tsx](src/components/dong-su/StatPanel.tsx) — hiển thị các chỉ số
  - [src/components/dong-su/FactCard.tsx](src/components/dong-su/FactCard.tsx) — modal tư liệu lịch sử
- **Data:** [src/data/dong-su/zhu-yuanzhang-episode-1.ts](src/data/dong-su/zhu-yuanzhang-episode-1.ts) — tất cả dữ liệu tập 1 (scenes, choices, facts, labels, initialStats, results). Đây là nguồn dữ liệu quan trọng: UI chỉ đọc dữ liệu này.

**Assets & Paths**
- Ảnh được phục vụ từ `public/` và truy cập trong Next.js bằng đường dẫn bắt đầu `/`. Ví dụ:

```
/history/zhu-yuanzhang/scenes/01-childhood-field.webp
```

**Ghi chú**
- Dữ liệu cảnh nằm trong `src/data` để dễ mở rộng (thêm episodes, scenes).
- Giao diện/tương tác chính xử lý trong `src/app/dong-su/zhu-yuanzhang/page.tsx` bằng state React (client component).
- Nếu muốn thêm episode mới: tạo file dữ liệu tương tự trong `src/data/dong-su/` và trang route mới hoặc tái dùng component.

Nếu muốn, tôi có thể commit file này cho bạn hoặc chạy `npm run dev` để kiểm tra giao diện.

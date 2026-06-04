# Dòng Sử

Dòng Sử là một web trải nghiệm lịch sử tương tác: người đọc đi qua các scene, đưa ra lựa chọn, theo dõi chỉ số thay đổi và mở lại kho tư liệu để xem timeline, nhân vật, vật phẩm biểu tượng.

Đây là project học tập/portfolio, tập trung vào cảm giác cinematic historical và dữ liệu mở rộng được bằng TypeScript.

## Demo Routes

- `/` — episode hub / trang chủ chọn nhân vật và tập truyện
- `/dong-su/zhu-yuanzhang` — Chu Nguyên Chương: Tập 1, story tương tác 16 scene
- `/dong-su/zhu-yuanzhang/archive` — kho tư liệu, timeline, gallery nhân vật và vật phẩm

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Features

- Episode hub cho các tập hiện có và các tập sắp ra mắt
- Interactive 16-scene story cho Chu Nguyên Chương tập 1
- Choice-based stats: Dân tâm, Nghĩa khí, Quân uy, Nhân tính, Dã tâm
- Historical note modal cho từng scene
- Archive timeline render đủ 16 scene
- Character gallery render 6 nhân vật
- Relic gallery render 4 vật phẩm
- Journey map cho hành trình đầu đời
- Cinematic CSS thuần với reduced-motion support

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    dong-su/
      zhu-yuanzhang/
        page.tsx
        archive/
          page.tsx
  components/
    dong-su/
      CharacterGallery.tsx
      ChoiceButton.tsx
      EpisodeCard.tsx
      EpisodeTimeline.tsx
      FactCard.tsx
      JourneyMap.tsx
      RelicGallery.tsx
      StatPanel.tsx
      StoryScene.tsx
  data/
    dong-su/
      episodes.ts
      zhu-yuanzhang-episode-1.ts
public/
  history/
    zhu-yuanzhang/
      characters/
      items/
      maps/
      scenes/
```

## How To Run

```bash
npm install
npm run dev
npm run build
```

Lint:

```bash
npm run lint
```

## Notes

- Một số tình tiết được kể theo hướng cinematic/symbolic để phục vụ trải nghiệm tương tác, không thay thế tài liệu lịch sử học thuật.
- Các episode `coming-soon` đang dùng tạm ảnh có sẵn trong thư mục Chu Nguyên Chương để tránh thiếu asset.
- Ảnh được phục vụ từ `public/` bằng path bắt đầu với `/`, ví dụ:

```text
/history/zhu-yuanzhang/scenes/16-zhu-yuanzhang-dawn.webp
```

## Deployment

Project build bằng `npm run build` và có thể deploy như một ứng dụng Next.js tiêu chuẩn. Không cần backend, database hoặc login cho bản demo hiện tại.

# Dòng Sử — Thiên Mệnh Engine

**Dòng Sử** là một nền tảng trải nghiệm lịch sử tương tác được cấp bằng **Thiên Mệnh Engine** — một hệ thống game logic xác định (deterministic) chuyên dùng cho câu chuyện lịch sử:

- Lựa chọn → Chỉ số (Stats) → Nhân cách (Persona) → Kết cục (Ending)
- Người chơi đi qua các scene, đưa ra lựa chọn ảnh hưởng các chỉ số
- Kho tư liệu (Archive) để xem timeline, nhân vật, vật phẩm, địa đồ hành trình
- Dùng AI chỉ ở tầng diễn giải kết cục, không quyết định game logic

Đây là project học tập/portfolio tập trung vào kiến trúc deterministic, cảm giác cinematic historical và dữ liệu được mở rộng bằng TypeScript.

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

- **Episode hub** cho các tập hiện có và các tập sắp ra mắt
- **Interactive 16-scene story** cho Chu Nguyên Chương tập 1 (Zhu Yuanzhang Episode 1)
- **Choice-based stats system**: Dân tâm, Nghĩa khí, Quân uy, Nhân tính, Dã tâm
- **Persona system**: Lựa chọn và chỉ số quyết định nhân cách nhân vật (Iron Ruler, People-Hearted, Brotherhood Leader, v.v.)
- **Weighted ending engine**: Kết cục được xác định bằng công thức weighted score thay vì chỉ highest stat
- **Historical notes** modal cho từng scene
- **Archive system**:
  - Timeline render đủ 16 scene
  - Character gallery render 6 nhân vật chính
  - Relic gallery render 4 vật phẩm biểu tượng
  - Journey map cho hành trình đầu đời
- **Cinematic UI** với pure CSS animations và reduced-motion support
- **AI-generated ending narrative** (Phase 12+): Diễn giải kết cục dựa trên ending type + persona + stats

## Project Structure

```
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    api/
      ai-ending/
      historical-note/
    dong-su/
      zhu-yuanzhang/
        page.tsx
        archive/
          page.tsx
  components/
    dong-su/
      StoryScene.tsx              # Hiển thị scene hiện tại
      ChoiceButton.tsx            # Nút lựa chọn
      StatPanel.tsx               # Bảng điểm số
      CharacterGallery.tsx         # Thư viện nhân vật
      FactCard.tsx                # Thẻ ghi chú lịch sử
      EpisodeTimeline.tsx          # Timeline
      RelicGallery.tsx             # Thư viện vật phẩm
      JourneyMap.tsx               # Bản đồ hành trình
      AIEndingNarrative.tsx        # Kết cục được AI sinh
      EpisodeCard.tsx
      DongSuShell.tsx
      SceneAudioControl.tsx
  data/
    dong-su/
      episodes.ts                 # Metadata episode
      zhu-yuanzhang-episode-1.ts  # Dữ liệu 16 scene
      audio-tracks.ts
  lib/
    dong-su/
      game.ts                     # Core logic: stats, persona, ending
      progress.ts                 # Save/load localStorage
      aiPrompts.ts                # Prompt templates cho AI
  hooks/
    dong-su/
      useEpisodeProgress.ts        # Hook điều khiển game state
    useEpisodeProgress.ts         # Re-export công khai
  types/
    dong-su.ts                   # Type definitions chung
public/
  history/
    zhu-yuanzhang/
      characters/                # Ảnh nhân vật
      items/                     # Ảnh vật phẩm
      maps/                      # Ảnh bản đồ
      scenes/                    # Ảnh scene
  audio/
    dong-su/                     # Âm nhạc nền
```

## Thiên Mệnh Engine — Core Architecture

```
User Choice
    ↓
Apply Stats Change
    ↓
Calculate Persona (iron-ruler | people-hearted | brotherhood-leader | balanced-founder | survivor)
    ↓
Calculate Weighted Ending Score
    ↓
Determine Ending (humane | ambitious | balanced)
    ↓
AI Narrative (optional): Diễn giải ending dựa trên persona + stats
    ↓
Display Result
```

**Nguyên tắc cốt lõi:**

- Game logic luôn **deterministic** — cùng choice lượt lại → cùng result
- **AI chỉ diễn giải**, không quyết định ending hay stats
- Tất cả kết định được bằng TypeScript pure functions trong `src/lib/dong-su/game.ts`
- Progress lưu thống nhất trong localStorage, không tách memory key riêng

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

- **Dữ liệu lịch sử**: Một số tình tiết được kể theo hướng cinematic/symbolic để phục vụ trải nghiệm tương tác, không thay thế tài liệu lịch sử học thuật.
- **Coming-soon episodes**: Các episode chưa hoàn thành đang dùng tạm ảnh có sẵn trong thư mục Chu Nguyên Chương để tránh thiếu asset.
- **Asset paths**: Ảnh được phục vụ từ `public/` bằng absolute path bắt đầu với `/`, ví dụ:
  ```
  /history/zhu-yuanzhang/scenes/16-zhu-yuanzhang-dawn.webp
  ```
- **Type safety**: Tất cả game logic được type-check qua TypeScript. Core types được đặt tập trung trong `src/types/dong-su.ts`.

## Deployment

Project được build bằng `npm run build` và có thể deploy như một ứng dụng Next.js tiêu chuẩn trên Vercel, Netlify, hoặc bất kỳ Node.js host nào.

**Requirements:**
- Không cần backend riêng
- Không cần database
- Không cần authentication
- Progress được lưu trữ client-side (localStorage)

**Environment variables:** (không bắt buộc cho demo hiện tại)
```
NEXT_PUBLIC_API_BASE_URL=  # Cho AI endpoint (Phase 12+)
```

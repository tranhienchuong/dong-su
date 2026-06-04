export type EpisodeCard = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  status: "available" | "coming-soon";
  coverImage: string;
  characterName: string;
  period: string;
  tags: string[];
};

export const episodes: EpisodeCard[] = [
  {
    id: "zhu-yuanzhang-episode-1",
    title: "Chu Nguyên Chương: Tập 1",
    subtitle: "Từ Chu Trùng Bát đến Chu Nguyên Chương",
    description:
      "Theo dấu một đứa trẻ đói nghèo đi qua cửa chùa, nghĩa quân và cái tên mới mở đầu cho triều Minh.",
    href: "/dong-su/zhu-yuanzhang",
    status: "available",
    coverImage: "/history/zhu-yuanzhang/scenes/16-zhu-yuanzhang-dawn.webp",
    characterName: "Chu Nguyên Chương",
    period: "Cuối Nguyên - đầu Minh",
    tags: ["Nghèo đói", "Nghĩa quân", "Lựa chọn", "Khai quốc"],
  },
  {
    id: "qin-shi-huang",
    title: "Tần Thủy Hoàng",
    subtitle: "Sắp ra mắt",
    description:
      "Một hành trình về thống nhất, pháp trị và cái giá của quyền lực tuyệt đối.",
    href: "#",
    status: "coming-soon",
    coverImage: "/history/zhu-yuanzhang/items/red-turban-flag.webp",
    characterName: "Doanh Chính",
    period: "Chiến Quốc - Tần",
    tags: ["Thống nhất", "Pháp trị", "Đế chế"],
  },
  {
    id: "liu-bang",
    title: "Lưu Bang",
    subtitle: "Sắp ra mắt",
    description:
      "Từ kẻ bình dân đến người lập nên nhà Hán, giữa mưu lược, huynh đệ và thời thế.",
    href: "#",
    status: "coming-soon",
    coverImage: "/history/zhu-yuanzhang/maps/early-journey-map.webp",
    characterName: "Lưu Bang",
    period: "Tần - Hán",
    tags: ["Bình dân", "Hán Sở", "Khai quốc"],
  },
  {
    id: "cao-cao",
    title: "Tào Tháo",
    subtitle: "Sắp ra mắt",
    description:
      "Một góc nhìn về loạn thế Tam Quốc, nơi tài năng và nghi kỵ luôn đi cùng nhau.",
    href: "#",
    status: "coming-soon",
    coverImage: "/history/zhu-yuanzhang/scenes/13-first-battle.webp",
    characterName: "Tào Tháo",
    period: "Cuối Hán - Tam Quốc",
    tags: ["Loạn thế", "Mưu lược", "Quyền lực"],
  },
];

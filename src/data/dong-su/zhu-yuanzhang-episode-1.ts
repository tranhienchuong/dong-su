export type StatKey = "danTam" | "nghiaKhi" | "quanUy" | "nhanTinh" | "daTam";

export type Stats = Record<StatKey, number>;

export type Character = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
};

export type Relic = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Item = Relic;

export type StoryChoice = {
  id: string;
  label: string;
  description: string;
  effects: Partial<Stats>;
  resultText: string;
  nextSceneId: string | null;
  endingId?: EpisodeEnding["id"];
};

export type FactCardData = {
  title: string;
  body: string;
};

export type ImageTone = "ash" | "dust" | "embers" | "lamp" | "rain";

export type StorySceneData = {
  id: string;
  chapter: number;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  imageTone: ImageTone;
  backgroundImage: string;
  characterIds: string[];
  itemIds: string[];
  text: string[];
  choices: StoryChoice[];
  historicalNote?: FactCardData;
};

export type EpisodeResult = {
  stat: StatKey;
  title: string;
  body: string;
};

export type EpisodeEnding = {
  id: "balanced" | "humane" | "ambitious";
  title: string;
  body: string;
};

export type Episode = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  character: string;
  framing: string;
  mapImage: string;
  initialStats: Stats;
  statLabels: Record<StatKey, string>;
  characters: Character[];
  relics: Relic[];
  scenes: StorySceneData[];
  endings: EpisodeEnding[];
};

export const statLabels: Record<StatKey, string> = {
  danTam: "Dân tâm",
  nghiaKhi: "Nghĩa khí",
  quanUy: "Quân uy",
  nhanTinh: "Nhân tính",
  daTam: "Dã tâm",
};

export const initialStats: Stats = {
  danTam: 0,
  nghiaKhi: 0,
  quanUy: 0,
  nhanTinh: 0,
  daTam: 0,
};

export const characters = [
  {
    id: "zhu-child",
    name: "Chu Trùng Bát thời niên thiếu",
    role: "Đứa trẻ nghèo của vùng Hào Châu",
    image: "/history/zhu-yuanzhang/characters/zhu-child-portrait.webp",
    description:
      "Một cậu bé sinh ra giữa ruộng nứt và bữa đói, còn chưa biết thiên hạ là gì nhưng đã biết huynh đệ cần được ăn no.",
  },
  {
    id: "zhu-monk",
    name: "Chu Trùng Bát / Chu Nguyên Chương thời trẻ",
    role: "Nhà sư phiêu bạt, tân binh nghĩa quân",
    image: "/history/zhu-yuanzhang/characters/zhu-monk-portrait.webp",
    description:
      "Từ áo nâu cửa chùa đến áo giáp nghĩa quân, ông mang theo ký ức của đói nghèo và một ý chí ngày càng sắc lạnh.",
  },
  {
    id: "ma-xiuying",
    name: "Mã Tú Anh",
    role: "Người cứu mạng và điểm sáng nhân tình",
    image: "/history/zhu-yuanzhang/characters/ma-xiuying-portrait.webp",
    description:
      "Nàng nhìn thấy phần người trong kẻ bị đời dồn ép, rồi trao cho ông một con đường khác giữa lúc hiểm nghèo.",
  },
  {
    id: "guo-zixing",
    name: "Quách Tử Hưng",
    role: "Thủ lĩnh nghĩa quân Hồng Cân",
    image: "/history/zhu-yuanzhang/characters/guo-zixing-portrait.webp",
    description:
      "Người nhận ra khí chất khác thường của Chu Trùng Bát và mở cánh cửa đầu tiên vào quân doanh.",
  },
  {
    id: "xu-da",
    name: "Từ Đạt",
    role: "Huynh đệ cũ, tướng tài tương lai",
    image: "/history/zhu-yuanzhang/characters/xu-da-portrait.webp",
    description:
      "Bạn cũ từ thuở cơ hàn, về sau trở thành một trong những trụ cột quân sự của nhà Minh.",
  },
  {
    id: "tang-he",
    name: "Thang Hòa",
    role: "Huynh đệ cũ trong nghĩa quân",
    image: "/history/zhu-yuanzhang/characters/tang-he-portrait.webp",
    description:
      "Người nối Chu Trùng Bát với doanh trại Hồng Cân và với mạng lưới huynh đệ của thời loạn.",
  },
] satisfies Character[];

export const relics = [
  {
    id: "thirteen-rice",
    name: "13 hạt gạo",
    image: "/history/zhu-yuanzhang/items/thirteen-rice-item.webp",
    description:
      "Phần lương cuối cùng của một căn nhà đói, nhỏ đến đau lòng nhưng đủ thành lời thề đi theo cả đời.",
  },
  {
    id: "warm-bread",
    name: "Chiếc bánh nóng",
    image: "/history/zhu-yuanzhang/items/warm-bread-item.webp",
    description:
      "Một hơi ấm hiếm hoi trong chuồng ngựa lạnh, nhắc rằng thời loạn vẫn còn người biết thương người.",
  },
  {
    id: "red-turban-flag",
    name: "Cờ Hồng Cân",
    image: "/history/zhu-yuanzhang/items/red-turban-flag.webp",
    description:
      "Lá cờ của những đội quân nổi dậy chống triều Nguyên, nơi dân đói bắt đầu học cách đứng thành hàng ngũ.",
  },
  {
    id: "first-armor",
    name: "Chiến giáp đầu tiên",
    image: "/history/zhu-yuanzhang/items/first-armor.webp",
    description:
      "Tấm giáp đánh dấu khoảnh khắc một kẻ không tên được giao quân lệnh, trách nhiệm và một cái tên mới.",
  },
] satisfies Relic[];

export const episodeResults: Record<StatKey, EpisodeResult> = {
  danTam: {
    stat: "danTam",
    title: "Người được dân nhớ",
    body: "Ngươi nhìn thời loạn bằng mắt của dân đói. Quyền lực, nếu có ngày đến tay ngươi, sẽ luôn bị câu hỏi về bát cơm kéo lại.",
  },
  nghiaKhi: {
    stat: "nghiaKhi",
    title: "Huynh trưởng nghĩa quân",
    body: "Ngươi chưa có ngai vàng, nhưng đã có người sẵn lòng đi theo. Nghĩa khí biến một kẻ cơ hàn thành chỗ dựa giữa doanh trại lạnh.",
  },
  quanUy: {
    stat: "quanUy",
    title: "Mầm tướng soái",
    body: "Ngươi học được rằng quân lệnh cần kỷ luật, còn lòng quân cần một người dám đứng trước. Áo giáp đầu tiên chỉ là khởi đầu.",
  },
  nhanTinh: {
    stat: "nhanTinh",
    title: "Người giữ phần người",
    body: "Cái đói không lấy hết lòng trắc ẩn của ngươi. Giữa những bước ngoặt dữ dội, ngươi vẫn nhớ một bàn tay từng chìa ra trong đêm.",
  },
  daTam: {
    stat: "daTam",
    title: "Kẻ nhìn về thiên hạ",
    body: "Những cánh cửa đóng sầm, những bữa đói và những lần bị khinh rẻ đã hóa thành một tầm nhìn lớn hơn mạng sống của riêng ngươi.",
  },
};

export const endings = [
  {
    id: "balanced",
    title: "Bình minh của Chu Nguyên Chương",
    body: "Ngươi bước qua ranh giới của một đời cũ. Trong tay có quân lệnh, trong lòng còn vết đói, và trước mắt là con đường chưa ai dọn sẵn.",
  },
  {
    id: "humane",
    title: "Mười ba hạt gạo còn đó",
    body: "Ngươi giữ ký ức nghèo đói như giữ một ngọn đèn nhỏ. Nó không làm thời loạn hiền hơn, nhưng buộc ngươi nhớ vì sao mình phải đi tiếp.",
  },
  {
    id: "ambitious",
    title: "Áo giáp dưới ánh bình minh",
    body: "Ngươi nắm chặt tấm giáp đầu tiên và nhìn xa hơn doanh trại. Chu Trùng Bát đã khép lại, còn Chu Nguyên Chương bắt đầu học cách đo thiên hạ.",
  },
] satisfies EpisodeEnding[];

export const scenes = [
  {
    id: "childhood-field",
    chapter: 1,
    title: "Đứa trẻ trên cánh đồng",
    subtitle: "Trò chơi hoàng đế giữa ruộng nghèo",
    year: "1330s",
    location: "Vùng Hào Châu, An Huy",
    imageTone: "dust",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/01-childhood-field.webp",
    characterIds: ["zhu-child"],
    itemIds: [],
    text: [
      "Gió đồng thổi qua những vạt lúa thưa. Chu Trùng Bát cùng đám trẻ nghèo lấy đất làm điện, lấy que khô làm ấn.",
      "Cậu ngồi giữa vòng bạn, nói rằng hoàng đế trước hết phải khiến huynh đệ được ăn no. Tiếng cười trẻ con vang lên, nhưng trong bụng ai cũng rỗng.",
    ],
    choices: [
      {
        id: "feed-brothers",
        label: "Hứa sẽ cho huynh đệ ăn no",
        description: "Biến trò chơi thành một lời hứa non nớt.",
        effects: { nghiaKhi: 2, daTam: 1 },
        resultText:
          "Lời hứa bật ra như chuyện đùa, nhưng mắt đám trẻ bỗng sáng hơn một chút.",
        nextSceneId: "landlord-calf",
      },
      {
        id: "laugh-it-off",
        label: "Cười cho qua như trò trẻ con",
        description: "Giữ niềm vui nhỏ bé trong một ngày còn có thể cười.",
        effects: { nhanTinh: 2, daTam: -1 },
        resultText:
          "Cậu cười xòa, ném que khô xuống đất. Ít nhất hôm nay, đám trẻ còn được quên đói trong chốc lát.",
        nextSceneId: "landlord-calf",
      },
    ],
    historicalNote: {
      title: "Tuổi thơ Chu Trùng Bát",
      body: "Chu Nguyên Chương sinh năm 1328 trong một gia đình nông dân nghèo. Những trò chơi và lời thoại trong cảnh này là hư cấu, dùng để gợi ý ký ức dân gian về xuất thân cơ hàn của ông.",
    },
  },
  {
    id: "landlord-calf",
    chapter: 2,
    title: "Con bê của Lưu tài chủ",
    subtitle: "Cái đói đẩy trẻ con đến ranh giới",
    year: "1330s",
    location: "Một bờ ruộng gần thôn nghèo",
    imageTone: "dust",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/02-landlord-calf.webp",
    characterIds: ["zhu-child"],
    itemIds: [],
    text: [
      "Con bê của nhà giàu lạc ra bờ ruộng, béo hơn mọi đứa trẻ trong thôn. Đám bạn nhìn nó như nhìn một nồi cơm biết đi.",
      "Khi sợ hãi bắt đầu lan ra, Chu Trùng Bát đứng lên trước. Cậu hiểu có những lựa chọn sẽ theo người ta rất lâu.",
    ],
    choices: [
      {
        id: "take-calf",
        label: "Ra tay để huynh đệ được ăn",
        description: "Chọn bữa no trước mắt dù biết tai họa sẽ đến.",
        effects: { nghiaKhi: 2, daTam: 2, nhanTinh: -1 },
        resultText:
          "Đám trẻ nhìn cậu như nhìn người dám làm điều không ai dám nói. Cơn đói đã có người đứng mũi chịu sào.",
        nextSceneId: "thirteen-rice",
      },
      {
        id: "stop-everyone",
        label: "Ngăn mọi người lại",
        description: "Chặn cơn đói trước khi nó hóa thành tội.",
        effects: { nhanTinh: 2, nghiaKhi: -1 },
        resultText:
          "Cậu kéo đám bạn lùi khỏi bờ ruộng. Bụng vẫn đói, nhưng trong mắt cậu còn một lằn ranh chưa bị xóa.",
        nextSceneId: "thirteen-rice",
      },
      {
        id: "take-blame-alone",
        label: "Một mình nhận tội",
        description: "Gánh phần nặng nhất để đám trẻ còn đường về nhà.",
        effects: { nghiaKhi: 2, quanUy: 1 },
        resultText:
          "Cậu bước ra trước lời quát mắng. Từ khoảnh khắc ấy, đám bạn biết ai sẽ đứng trước khi tai họa kéo tới.",
        nextSceneId: "thirteen-rice",
      },
    ],
    historicalNote: {
      title: "Giai thoại con bê",
      body: "Một số giai thoại dân gian kể về thời thơ ấu nghèo đói của Chu Nguyên Chương và việc ông đứng ra gánh trách nhiệm với bạn bè. Cảnh này được hư cấu hóa theo tinh thần truyền thuyết, không xem như ghi chép chính sử.",
    },
  },
  {
    id: "thirteen-rice",
    chapter: 3,
    title: "13 hạt gạo",
    subtitle: "Phần lương cuối cùng",
    year: "1344",
    location: "Căn nhà họ Chu",
    imageTone: "ash",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/03-thirteen-rice-scene.webp",
    characterIds: ["zhu-child"],
    itemIds: ["thirteen-rice"],
    text: [
      "Sau nhiều ngày đói, trong nhà chỉ còn mười ba hạt gạo nằm lẻ loi trong lòng bát. Chúng nhỏ đến mức tiếng thở cũng như có thể thổi bay.",
      "Chu Trùng Bát nhìn những hạt trắng ấy và thấy cả một căn nhà đang tắt dần. Có những thứ quá ít để cứu người, nhưng đủ để ám ảnh một đời.",
    ],
    choices: [
      {
        id: "keep-as-oath",
        label: "Giữ lại như lời thề",
        description: "Để cái đói trở thành vật chứng không thể quên.",
        effects: { daTam: 2, nhanTinh: 1 },
        resultText:
          "Cậu cất những hạt gạo như cất tên người thân. Từ nay, cái đói có hình hài rõ rệt.",
        nextSceneId: "famine-home",
      },
      {
        id: "eat-to-live",
        label: "Ăn để sống tiếp",
        description: "Chọn hơi thở còn lại thay vì một biểu tượng.",
        effects: { quanUy: 1, daTam: 1 },
        resultText:
          "Mười ba hạt gạo tan rất nhanh trên đầu lưỡi. Sự sống đôi khi bắt đầu từ một điều gần như không có gì.",
        nextSceneId: "famine-home",
      },
      {
        id: "bury-memory",
        label: "Chôn cùng ký ức gia đình",
        description: "Gửi phần lương cuối vào đất như một lời tiễn biệt.",
        effects: { nhanTinh: 2, daTam: -1 },
        resultText:
          "Đất khô phủ lên những hạt gạo. Cậu đứng lặng, như vừa chôn một bữa cơm chưa kịp thành hình.",
        nextSceneId: "famine-home",
      },
    ],
    historicalNote: {
      title: "Nạn đói năm 1344",
      body: "Khoảng năm 1344, vùng quê của Chu Nguyên Chương chịu đói kém và dịch bệnh nặng. Chi tiết 13 hạt gạo là biểu tượng kể chuyện, dùng để cô đọng trải nghiệm thiếu ăn và mất mát.",
    },
  },
  {
    id: "famine-home",
    chapter: 4,
    title: "Căn nhà không còn khói bếp",
    subtitle: "Nơi tuổi thơ khép lại",
    year: "1344",
    location: "Một thôn nghèo gần Phượng Dương",
    imageTone: "ash",
    backgroundImage: "/history/zhu-yuanzhang/scenes/04-famine-home.webp",
    characterIds: ["zhu-child"],
    itemIds: ["thirteen-rice"],
    text: [
      "Bếp lạnh, mái thấp, vách đất im như người đã mệt. Những tiếng gọi quen thuộc không còn đáp lại trong căn nhà họ Chu.",
      "Mất gia đình, mất nhà, Chu Trùng Bát hiểu rằng người nghèo không có quyền yếu đuối quá lâu. Nếu không bước đi, cậu cũng sẽ bị nuốt vào im lặng.",
    ],
    choices: [
      {
        id: "leave-home",
        label: "Rời nhà tìm đường sống",
        description: "Khép cửa sau lưng và đi về phía chưa biết.",
        effects: { daTam: 2 },
        resultText:
          "Cậu quay lưng khỏi mái nhà lạnh. Mỗi bước chân như xé một sợi rễ khỏi đất.",
        nextSceneId: "huangjue-temple",
      },
      {
        id: "stay-one-night",
        label: "Ở lại thêm một đêm",
        description: "Cho ký ức gia đình một đêm cuối cùng.",
        effects: { nhanTinh: 2 },
        resultText:
          "Đêm ấy dài hơn mọi đêm trước. Cậu ngồi bên bếp tắt, giữ lấy phần người chưa chịu rời đi.",
        nextSceneId: "huangjue-temple",
      },
      {
        id: "remember-debt",
        label: "Ghi nhớ món nợ với thời loạn",
        description: "Để mất mát hóa thành một khoản nợ phải đòi.",
        effects: { daTam: 2, nhanTinh: -1 },
        resultText:
          "Cậu nhìn căn nhà lần cuối. Trong lòng, nỗi đau đông lại thành một mảnh sắt lạnh.",
        nextSceneId: "huangjue-temple",
      },
    ],
    historicalNote: {
      title: "Mất gia đình",
      body: "Các ghi chép truyền thống kể rằng Chu Nguyên Chương mất nhiều người thân trong nạn đói và dịch bệnh, gồm cha mẹ. Cảm xúc và tình tiết cụ thể trong cảnh là hư cấu để phục vụ trải nghiệm nhập vai.",
    },
  },
  {
    id: "huangjue-temple",
    chapter: 5,
    title: "Cửa Phật lạnh hơn gió đồng",
    subtitle: "Nương thân ở chùa Hoàng Giác",
    year: "1344",
    location: "Chùa Hoàng Giác",
    imageTone: "lamp",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/05-huangjue-temple.webp",
    characterIds: ["zhu-monk"],
    itemIds: [],
    text: [
      "Cửa chùa mở ra bằng tiếng bản lề cũ. Chu Trùng Bát bước vào không phải vì đã giác ngộ, mà vì cần một bữa ăn và một mái che.",
      "Áo nâu phủ lên thân gầy, tiếng mõ rơi đều trong chiều lạnh. Dưới bóng Phật, cậu học cách cúi đầu để còn sống.",
    ],
    choices: [
      {
        id: "bow-and-endure",
        label: "Cúi đầu nhẫn nhịn",
        description: "Nhận lấy kỷ luật cửa chùa để qua ngày khốn khó.",
        effects: { nhanTinh: 2, danTam: 1 },
        resultText:
          "Cậu cúi đầu trước tượng Phật và trước bát cháo loãng. Nhẫn nhịn cũng là một cách giữ mạng.",
        nextSceneId: "wandering-monk",
      },
      {
        id: "keep-resentment",
        label: "Giữ trong lòng nỗi uất",
        description: "Lặng im bên ngoài, không để lửa trong ngực tắt đi.",
        effects: { daTam: 2 },
        resultText:
          "Tiếng kinh trôi qua tai, nhưng nỗi uất không tan. Cậu biết mình chưa sinh ra chỉ để quét sân chùa.",
        nextSceneId: "wandering-monk",
      },
      {
        id: "believe-in-fate",
        label: "Tin rằng số mệnh chưa dừng ở đây",
        description: "Nhìn cửa chùa như một quãng nghỉ, không phải điểm cuối.",
        effects: { daTam: 1, quanUy: 1 },
        resultText:
          "Trong tiếng chuông chiều, cậu thấy con đường đời vẫn còn kéo dài sau cánh cổng.",
        nextSceneId: "wandering-monk",
      },
    ],
    historicalNote: {
      title: "Chùa Hoàng Giác",
      body: "Sau khi mất gia đình, Chu Nguyên Chương được cho là từng vào chùa Hoàng Giác. Với nhiều người nghèo thời loạn, cửa chùa là nơi nương thân tạm thời trước khi phải tiếp tục phiêu bạt.",
    },
  },
  {
    id: "wandering-monk",
    chapter: 6,
    title: "Kẻ ăn xin giữa thời loạn",
    subtitle: "Hóa duyên qua những phố đói",
    year: "1344-1347",
    location: "Những làng trấn quanh Hào Châu",
    imageTone: "rain",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/06-wandering-monk.webp",
    characterIds: ["zhu-monk"],
    itemIds: [],
    text: [
      "Chùa hết lương, người mặc áo nâu cũng phải cầm bát đi qua bụi đường. Phố xá thời loạn có tiếng rao khàn, tiếng lính quát và những ánh mắt không còn tin nhau.",
      "Chu Trùng Bát thấy dân đói nằm bên tường, thấy kẻ mạnh giẫm qua người yếu như qua bùn. Mỗi ngày phiêu bạt dạy ông một kiểu cai trị của đời.",
    ],
    choices: [
      {
        id: "beg-to-live",
        label: "Cầu xin để sống qua ngày",
        description: "Hạ mình trước từng cánh cửa để giữ hơi thở.",
        effects: { nhanTinh: 2 },
        resultText:
          "Ông nhận từng mẩu bánh cứng bằng hai tay. Sống sót đôi khi bắt đầu từ việc nuốt xuống tự ái.",
        nextSceneId: "execution-ground",
      },
      {
        id: "study-the-strong",
        label: "Quan sát cách kẻ mạnh cai trị",
        description: "Học trật tự tàn nhẫn của thời loạn bằng mắt lạnh.",
        effects: { daTam: 2, quanUy: 2 },
        resultText:
          "Ông nhìn cách lính giữ cổng, cách người giàu nói nhỏ với quan sai. Quyền lực có dáng đi riêng của nó.",
        nextSceneId: "execution-ground",
      },
      {
        id: "help-the-weaker",
        label: "Giúp người yếu hơn mình",
        description: "Chia phần ít ỏi cho kẻ còn khốn cùng hơn.",
        effects: { danTam: 2, nhanTinh: 1 },
        resultText:
          "Một nửa mẩu bánh rời khỏi tay ông. Bụng vẫn rỗng, nhưng người bên đường có thêm một buổi để sống.",
        nextSceneId: "execution-ground",
      },
    ],
    historicalNote: {
      title: "Phiêu bạt hóa duyên",
      body: "Truyền thống tiểu sử mô tả giai đoạn Chu Nguyên Chương rời chùa đi hóa duyên hoặc xin ăn trong nhiều năm. Trải nghiệm này thường được xem là nền tảng cho hiểu biết của ông về dân nghèo.",
    },
  },
  {
    id: "execution-ground",
    chapter: 7,
    title: "Tiếng kinh ở pháp trường",
    subtitle: "Một lời cầu siêu giữa mũi giáo",
    year: "Đầu thập niên 1350",
    location: "Một pháp trường ven thành",
    imageTone: "ash",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/07-execution-ground.webp",
    characterIds: ["zhu-monk", "ma-xiuying"],
    itemIds: [],
    text: [
      "Giữa pháp trường, gió cuốn bụi qua những gương mặt cúi thấp. Chu Trùng Bát nghe tiếng người chết chưa kịp được gọi tên.",
      "Ông khẽ tụng kinh, dù lính canh đã quay đầu nhìn lại. Trong đám đông, Mã Tú Anh thấy người áo nâu ấy và ghi nhớ.",
    ],
    choices: [
      {
        id: "stay-silent",
        label: "Im lặng để giữ mạng",
        description: "Rút lui trước quyền lực đang nổi giận.",
        effects: { quanUy: 1, nhanTinh: -1 },
        resultText:
          "Ông khép môi, nghe tiếng kinh tắt trong cổ họng. Sống sót cũng để lại vị đắng.",
        nextSceneId: "ma-rescue",
      },
      {
        id: "chant-anyway",
        label: "Tụng kinh bất chấp nguy hiểm",
        description: "Trao cho người chết một chút phẩm giá cuối cùng.",
        effects: { nhanTinh: 2, danTam: 2 },
        resultText:
          "Tiếng kinh thấp nhưng không vỡ. Một vài người trong đám đông ngẩng lên, như vừa nhớ mình vẫn là người.",
        nextSceneId: "ma-rescue",
      },
      {
        id: "stand-firm",
        label: "Đứng chắn trước đao lính",
        description: "Không lùi trước tiếng quát của kẻ cầm quyền.",
        effects: { nghiaKhi: 2, daTam: 1 },
        resultText:
          "Ông đứng yên trước mũi giáo. Sự gan lì ấy khiến cả lính canh cũng phải chậm lại một nhịp.",
        nextSceneId: "ma-rescue",
      },
    ],
    historicalNote: {
      title: "Mã Tú Anh trong truyền thuyết kể chuyện",
      body: "Mã Tú Anh là nhân vật lịch sử có thật, về sau trở thành hoàng hậu của Chu Nguyên Chương. Cảnh gặp ở pháp trường là hư cấu điện ảnh nhằm tạo mối nối cảm xúc trước khi ông vào nghĩa quân.",
    },
  },
  {
    id: "ma-rescue",
    chapter: 8,
    title: "Người con gái cứu mạng",
    subtitle: "Một bàn tay trong lúc hiểm nguy",
    year: "Đầu thập niên 1350",
    location: "Ngoài cửa thành Hào Châu",
    imageTone: "lamp",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/08-ma-xiuying-rescue.webp",
    characterIds: ["zhu-monk", "ma-xiuying"],
    itemIds: [],
    text: [
      "Hiểm nguy đuổi sát sau lưng người áo nâu. Khi mọi ngả đường đều có lính, Mã Tú Anh nhận ra người từng tụng kinh giữa pháp trường.",
      "Nàng kéo ông qua một cánh cửa hẹp, giọng thấp mà dứt khoát. Một mạng người được giữ lại bằng lòng can đảm lặng thầm.",
    ],
    choices: [
      {
        id: "thank-and-leave",
        label: "Cảm tạ rồi rời đi",
        description: "Nhận ân tình nhưng không kéo nàng vào hiểm họa.",
        effects: { nhanTinh: 2 },
        resultText:
          "Ông cúi đầu cảm tạ. Có những ân tình càng lớn càng khiến người ta muốn tránh liên lụy.",
        nextSceneId: "rebel-camp-meal",
      },
      {
        id: "follow-to-rebels",
        label: "Đi theo nàng đến nghĩa quân",
        description: "Chấp nhận bước qua cánh cửa của thời loạn.",
        effects: { daTam: 2 },
        resultText:
          "Ông nhìn về hướng doanh trại. Nếu sống mãi bằng trốn chạy, đời này sẽ chỉ còn những ngõ hẹp.",
        nextSceneId: "rebel-camp-meal",
      },
      {
        id: "ask-why",
        label: "Hỏi vì sao nàng cứu mình",
        description: "Muốn hiểu lòng người trước khi nhận con đường mới.",
        effects: { nhanTinh: 1, nghiaKhi: 1 },
        resultText:
          "Mã Tú Anh đáp rằng người biết cầu siêu cho kẻ lạ chưa thể là kẻ đáng bỏ mặc. Câu ấy ở lại rất lâu.",
        nextSceneId: "rebel-camp-meal",
      },
    ],
    historicalNote: {
      title: "Mã Tú Anh và Chu Nguyên Chương",
      body: "Mã Tú Anh là con nuôi của Quách Tử Hưng theo nhiều ghi chép, về sau kết hôn với Chu Nguyên Chương. Cảnh cứu mạng được dựng theo hướng tiểu thuyết hóa để nhấn mạnh vai trò nâng đỡ của bà.",
    },
  },
  {
    id: "rebel-camp-meal",
    chapter: 9,
    title: "Bát cơm đầu tiên trong nghĩa quân",
    subtitle: "Dưới lá cờ Hồng Cân",
    year: "Khoảng 1352",
    location: "Doanh trại nghĩa quân Hào Châu",
    imageTone: "embers",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/09-rebel-camp-meal.webp",
    characterIds: ["zhu-monk", "guo-zixing"],
    itemIds: ["red-turban-flag"],
    text: [
      "Bát cơm trong doanh trại nóng hơn mọi lời hứa ngoài đường. Chu Trùng Bát ăn chậm, như sợ hơi ấm này chỉ là mộng.",
      "Quách Tử Hưng nhìn người áo nâu gầy gò nhưng mắt không chịu tắt. Ông cho kẻ mới đến một chỗ đứng dưới cờ Hồng Cân.",
    ],
    choices: [
      {
        id: "join-for-food",
        label: "Nhập ngũ chỉ để có cơm ăn",
        description: "Bắt đầu từ nhu cầu nhỏ nhất và thật nhất.",
        effects: { quanUy: 1, nhanTinh: 1 },
        resultText:
          "Ông nhận bát cơm như nhận một mạng sống mới. Có khi chí lớn bắt đầu bằng một miếng ăn không bị xua đuổi.",
        nextSceneId: "warm-bread-night",
      },
      {
        id: "ask-for-whom",
        label: "Hỏi nghĩa quân chiến đấu vì ai",
        description: "Tìm lý do phía sau lá cờ và tiếng trống.",
        effects: { danTam: 2, daTam: 1 },
        resultText:
          "Câu hỏi khiến Quách Tử Hưng nhìn ông lâu hơn. Người chỉ cần cơm sẽ im lặng, người muốn thiên hạ sẽ hỏi vì ai mà đánh.",
        nextSceneId: "warm-bread-night",
      },
      {
        id: "start-low",
        label: "Xin bắt đầu từ việc thấp nhất",
        description: "Chọn kỷ luật trước khi đòi vị trí.",
        effects: { nghiaKhi: 1, quanUy: 2 },
        resultText:
          "Ông nhận việc bẩn việc nặng không than. Doanh trại nhanh chóng học được rằng kẻ mới này biết cúi đầu đúng lúc.",
        nextSceneId: "warm-bread-night",
      },
    ],
    historicalNote: {
      title: "Gia nhập Hồng Cân",
      body: "Chu Nguyên Chương gia nhập lực lượng nổi dậy Hồng Cân do Quách Tử Hưng chỉ huy vào khoảng năm 1352. Đây là bước ngoặt đưa ông từ thân phận phiêu bạt vào con đường quân sự.",
    },
  },
  {
    id: "warm-bread-night",
    chapter: 10,
    title: "Chiếc bánh nóng trong đêm",
    subtitle: "Hơi ấm ở chuồng ngựa",
    year: "Khoảng 1352",
    location: "Doanh trại Hồng Cân",
    imageTone: "lamp",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/10-warm-bread-night.webp",
    characterIds: ["zhu-monk", "ma-xiuying"],
    itemIds: ["warm-bread"],
    text: [
      "Đêm trong chuồng ngựa lạnh đến mức hơi thở cũng mỏng đi. Chu Trùng Bát ngồi co bên vách gỗ, nghe tiếng quân doanh xa dần.",
      "Mã Tú Anh bước vào với chiếc bánh còn nóng. Trong cả tập truyện đầy bụi và đói, đó là hơi ấm đầu tiên đến không kèm điều kiện.",
    ],
    choices: [
      {
        id: "accept-silently",
        label: "Nhận bánh và im lặng",
        description: "Để lòng biết ơn nằm trong ánh mắt thay lời nói.",
        effects: { nhanTinh: 2 },
        resultText:
          "Ông nhận bánh bằng hai tay. Hơi nóng đi qua lòng bàn tay, làm ký ức giá lạnh lùi lại một chút.",
        nextSceneId: "tavern-reunion",
      },
      {
        id: "promise-repay",
        label: "Hứa sau này sẽ báo đáp",
        description: "Biến ân tình thành món nợ phải trả bằng cả đời.",
        effects: { nghiaKhi: 1, daTam: 1 },
        resultText:
          "Lời hứa nói rất khẽ, nhưng Mã Tú Anh nghe rõ. Có những món nợ không ghi sổ vẫn nặng như núi.",
        nextSceneId: "tavern-reunion",
      },
      {
        id: "share-bread",
        label: "Chia bánh cho người khác",
        description: "Đem hơi ấm hiếm hoi san cho kẻ cũng đang lạnh.",
        effects: { danTam: 2, nhanTinh: 1 },
        resultText:
          "Chiếc bánh vơi đi, nhưng chuồng ngựa bỗng bớt lạnh. Người từng đói hiểu rõ một miếng chia đôi quý đến đâu.",
        nextSceneId: "tavern-reunion",
      },
    ],
    historicalNote: {
      title: "Hình tượng Mã hoàng hậu",
      body: "Trong ký ức lịch sử, Mã hoàng hậu thường được khắc họa là người nhân hậu, biết chia sẻ khó khăn với Chu Nguyên Chương. Chiếc bánh nóng là biểu tượng hư cấu cho nét nhân tình ấy.",
    },
  },
  {
    id: "tavern-reunion",
    chapter: 11,
    title: "Huynh đệ trong quán rượu",
    subtitle: "Gặp lại Từ Đạt và Thang Hòa",
    year: "Khoảng 1352",
    location: "Một quán rượu gần doanh trại",
    imageTone: "embers",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/11-tavern-reunion.webp",
    characterIds: ["zhu-monk", "xu-da", "tang-he"],
    itemIds: [],
    text: [
      "Khói rượu và tiếng cười cũ lấp đầy căn quán nhỏ. Chu Trùng Bát gặp lại Từ Đạt, Thang Hòa, những gương mặt từng biết cậu từ ngày bụng còn rỗng.",
      "Trong doanh trại, chức phận của ông chưa cao. Nhưng bên bàn rượu, tình huynh đệ vẫn tự nhiên nhường cho ông một chỗ ở giữa.",
    ],
    choices: [
      {
        id: "demand-big-brother",
        label: "Ép họ gọi mình là đại ca",
        description: "Giữ ngôi huynh trưởng bằng khí thế cũ.",
        effects: { nghiaKhi: 1, daTam: 1 },
        resultText:
          "Tiếng đại ca bật ra giữa tiếng cười. Dù đời đổi thay, ông vẫn muốn người cũ nhớ vị trí của mình.",
        nextSceneId: "leading-horses",
      },
      {
        id: "laugh-it-soft",
        label: "Cười xòa giữ hòa khí",
        description: "Đặt tình cũ cao hơn danh phận trước mắt.",
        effects: { nhanTinh: 2 },
        resultText:
          "Ông nâng chén và cười như chưa từng chịu đói. Một khoảnh khắc ngắn, đời cơ hàn trở thành chuyện có thể kể lại.",
        nextSceneId: "leading-horses",
      },
      {
        id: "recall-old-oath",
        label: "Nhắc lại lời thề năm xưa",
        description: "Buộc huynh đệ nhìn về cùng một hướng.",
        effects: { nghiaKhi: 2, danTam: 1 },
        resultText:
          "Lời thề cũ khiến bàn rượu lặng đi. Không ai còn là đứa trẻ trên đồng, nhưng món nợ với người nghèo vẫn còn đó.",
        nextSceneId: "leading-horses",
      },
    ],
    historicalNote: {
      title: "Từ Đạt, Thang Hòa",
      body: "Từ Đạt và Thang Hòa là những tướng lĩnh quan trọng trong quá trình lập nghiệp của Chu Nguyên Chương. Cảnh hội ngộ trong quán rượu là hư cấu, nhằm nối tình huynh đệ với kỷ luật quân doanh.",
    },
  },
  {
    id: "leading-horses",
    chapter: 12,
    title: "Biết cúi đầu trước quân lệnh",
    subtitle: "Kiêu hãnh và nhẫn nhịn",
    year: "Khoảng 1352",
    location: "Trước cổng doanh trại",
    imageTone: "dust",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/12-leading-horses.webp",
    characterIds: ["zhu-monk", "xu-da", "tang-he"],
    itemIds: [],
    text: [
      "Rời quán rượu, tiếng quân lệnh lập tức thay tiếng huynh đệ. Người có chức cao hơn bước lên ngựa, còn Chu Trùng Bát tự tay dắt dây cương.",
      "Ông hiểu khi nào cần kiêu, khi nào cần nhẫn. Một người muốn đi xa không thể để lòng tự ái làm vấp chân trước cổng doanh.",
    ],
    choices: [
      {
        id: "keep-military-ritual",
        label: "Giữ lễ trước mặt quân doanh",
        description: "Đặt quân kỷ lên trên cảm xúc riêng.",
        effects: { quanUy: 2, nghiaKhi: 1 },
        resultText:
          "Ông cúi đầu đúng phép, không thừa một lời. Tướng chưa cần chức cao, trước hết phải khiến người khác thấy mình hiểu luật.",
        nextSceneId: "first-battle",
      },
      {
        id: "show-resentment",
        label: "Tỏ ra bất mãn vì chức thấp",
        description: "Để vết nhục cũ trồi lên trước mắt mọi người.",
        effects: { daTam: 2, quanUy: -1 },
        resultText:
          "Ánh mắt bất mãn thoáng qua quá rõ. Người trong doanh trại nhìn thấy tham vọng, nhưng cũng thấy nó chưa được buộc lại.",
        nextSceneId: "first-battle",
      },
      {
        id: "remind-roots",
        label: "Nhắc huynh đệ đừng quên gốc",
        description: "Giữ lễ mà vẫn giữ tình cũ.",
        effects: { nghiaKhi: 1, nhanTinh: 1 },
        resultText:
          "Ông dắt ngựa và nói rất khẽ. Huynh đệ có thể hơn kém chức phận, nhưng không được quên đường đã đi qua.",
        nextSceneId: "first-battle",
      },
    ],
    historicalNote: {
      title: "Kỷ luật trong nghĩa quân",
      body: "Các đội quân nổi dậy muốn tồn tại phải nhanh chóng hình thành kỷ luật và thứ bậc. Cảnh dắt ngựa là hư cấu, dùng để thể hiện khả năng nhẫn nhịn và đọc tình thế của Chu Nguyên Chương.",
    },
  },
  {
    id: "first-battle",
    chapter: 13,
    title: "Trận chiến đầu tiên",
    subtitle: "Lần đầu chứng minh có thể cầm quân",
    year: "Khoảng 1352",
    location: "Ngoài thành Hào Châu",
    imageTone: "embers",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/13-first-battle.webp",
    characterIds: ["zhu-monk", "xu-da", "tang-he"],
    itemIds: ["red-turban-flag"],
    text: [
      "Trống trận dội qua đồng trống, cờ Hồng Cân chao trong gió bụi. Một cánh quân bạn bị bỏ lại sau làn khói hỗn loạn.",
      "Lệnh trên bắt đứng yên, nhưng tiếng kêu cứu đã đến quá gần. Chu Trùng Bát thấy rõ khoảnh khắc một người lính thường có thể thành người dẫn đầu.",
    ],
    choices: [
      {
        id: "obey-and-hold",
        label: "Tuân lệnh đứng yên",
        description: "Chọn quân kỷ lạnh lùng trước tiếng gọi hỗn loạn.",
        effects: { quanUy: 2, danTam: -1 },
        resultText:
          "Hàng ngũ giữ nguyên, chắc như cọc đóng xuống đất. Nhưng phía xa, vài ánh mắt tắt đi trong thất vọng.",
        nextSceneId: "prison-cell",
      },
      {
        id: "charge-to-save",
        label: "Xông lên cứu quân bạn",
        description: "Đặt lòng nghĩa khí vào ngay giữa mũi tên.",
        effects: { danTam: 2, nghiaKhi: 2, quanUy: 1 },
        resultText:
          "Ông lao lên trước, kéo theo những người còn do dự. Khi bụi lắng xuống, binh lính nhớ ai đã đến với họ.",
        nextSceneId: "prison-cell",
      },
      {
        id: "rally-soldiers",
        label: "Kêu gọi binh lính cùng xông lên",
        description: "Biến một hành động trái lệnh thành ý chí tập thể.",
        effects: { daTam: 1, quanUy: 2, nghiaKhi: 1 },
        resultText:
          "Tiếng gọi của ông cắt qua tiếng trống. Người này nhìn người kia, rồi cả hàng quân chuyển động như vừa tìm thấy đầu mũi giáo.",
        nextSceneId: "prison-cell",
      },
    ],
    historicalNote: {
      title: "Từ tân binh đến người chỉ huy",
      body: "Chu Nguyên Chương thăng tiến trong quân Hồng Cân nhờ năng lực quân sự và khả năng thu phục người khác. Trận đánh cụ thể trong cảnh là hư cấu, nhằm thể hiện bước chuyển từ chịu lệnh sang dẫn quân.",
    },
  },
  {
    id: "prison-cell",
    chapter: 14,
    title: "Trong ngục chờ chém",
    subtitle: "Cái giá của việc trái lệnh",
    year: "Khoảng 1352",
    location: "Ngục trong doanh trại",
    imageTone: "ash",
    backgroundImage: "/history/zhu-yuanzhang/scenes/14-prison-cell.webp",
    characterIds: ["zhu-monk"],
    itemIds: [],
    text: [
      "Cánh cửa ngục đóng lại, để lại một vệt sáng mỏng trên nền đất. Vì giết cấp trên hèn nhát và trái quân lệnh, Chu Trùng Bát bị giam chờ xử.",
      "Ông không chạy. Người muốn làm đại sự phải biết đứng yên trước hậu quả của chính mình.",
    ],
    choices: [
      {
        id: "admit-no-regret",
        label: "Nhận tội nhưng không hối hận",
        description: "Để người khác thấy mình dám chịu điều đã làm.",
        effects: { quanUy: 2, daTam: 1 },
        resultText:
          "Ông nhận tội bằng giọng bình thản. Cửa ngục không rộng, nhưng khí thế trong đó không hề nhỏ.",
        nextSceneId: "new-name-ceremony",
      },
      {
        id: "beg-mercy",
        label: "Xin tha mạng",
        description: "Bám lấy sự sống trước khi mọi thứ khép lại.",
        effects: { nhanTinh: 2, quanUy: -1 },
        resultText:
          "Lời xin tha vang lên trong căn ngục thấp. Nó giữ lại phần người sợ chết, nhưng làm ánh mắt lính canh đổi khác.",
        nextSceneId: "new-name-ceremony",
      },
      {
        id: "silent-judgment",
        label: "Im lặng chờ phán quyết",
        description: "Không giải thích, không cầu cạnh, không run rẩy.",
        effects: { quanUy: 2, nghiaKhi: 1 },
        resultText:
          "Ông ngồi im cho đến sáng. Đôi khi im lặng khiến người bên ngoài phải tự hỏi nhiều hơn mọi lời biện hộ.",
        nextSceneId: "new-name-ceremony",
      },
    ],
    historicalNote: {
      title: "Hư cấu về thử thách quân kỷ",
      body: "Nhiều tác phẩm kể chuyện thường dùng cảnh ngục hoặc án phạt để khắc họa bản lĩnh của nhân vật lịch sử. Cảnh này là hư cấu, đặt trong bối cảnh quân doanh Hồng Cân để tạo cao trào trước khi Chu Trùng Bát được trọng dụng.",
    },
  },
  {
    id: "new-name-ceremony",
    chapter: 15,
    title: "Cái tên mới",
    subtitle: "Tả Tiên Phong Chu Nguyên Chương",
    year: "Khoảng 1352",
    location: "Trướng Quách Tử Hưng",
    imageTone: "lamp",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/15-new-name-ceremony.webp",
    characterIds: ["zhu-monk", "guo-zixing"],
    itemIds: ["first-armor", "red-turban-flag"],
    text: [
      "Quách Tử Hưng không giết ông. Trước mặt quân doanh, ông trao cho Chu Trùng Bát chiến giáp, quân chức và một cái tên mới.",
      "Chu Nguyên Chương. Ba chữ ấy rơi xuống như tiếng trống, chôn đi một phần đời đói khát nhưng không xóa được gốc rễ của nó.",
    ],
    choices: [
      {
        id: "kneel-new-name",
        label: "Quỳ nhận tên mới",
        description: "Nhận quân lệnh như nhận một đời khác.",
        effects: { quanUy: 2, nghiaKhi: 1 },
        resultText:
          "Ông quỳ xuống, hai tay nhận lấy tấm giáp. Khi đứng dậy, ánh mắt quân lính đã khác trước.",
        nextSceneId: "zhu-yuanzhang-dawn",
      },
      {
        id: "remember-poverty",
        label: "Thề không quên xuất thân nghèo đói",
        description: "Buộc cái tên mới phải mang theo dân nghèo phía sau.",
        effects: { danTam: 2, nhanTinh: 1 },
        resultText:
          "Ông gọi lại những ngày bếp lạnh trong lòng. Tên mới có thể sáng, nhưng gốc cũ vẫn phải còn.",
        nextSceneId: "zhu-yuanzhang-dawn",
      },
      {
        id: "look-to-realm",
        label: "Nhìn về thiên hạ phía trước",
        description: "Xem quân chức đầu tiên như bậc thềm mở đường lớn.",
        effects: { daTam: 2, quanUy: 1 },
        resultText:
          "Ông nhìn qua cờ trận ra phía trời xa. Một chức nhỏ trong doanh trại bỗng giống điểm bắt đầu của điều lớn hơn.",
        nextSceneId: "zhu-yuanzhang-dawn",
      },
    ],
    historicalNote: {
      title: "Tên Chu Nguyên Chương",
      body: "Chu Nguyên Chương vốn tên là Chu Trùng Bát. Việc đổi tên và quá trình được Quách Tử Hưng trọng dụng là mốc quan trọng trong các câu chuyện về thời trẻ của ông, dù chi tiết nghi lễ ở đây được hư cấu.",
    },
  },
  {
    id: "zhu-yuanzhang-dawn",
    chapter: 16,
    title: "Chu Trùng Bát đã chết",
    subtitle: "Bình minh của Chu Nguyên Chương",
    year: "Khoảng 1352",
    location: "Bìa doanh trại Hồng Cân",
    imageTone: "dust",
    backgroundImage:
      "/history/zhu-yuanzhang/scenes/16-zhu-yuanzhang-dawn.webp",
    characterIds: ["zhu-monk"],
    itemIds: ["thirteen-rice", "first-armor"],
    text: [
      "Bình minh lên sau dãy lều quân, phủ ánh vàng nhạt lên tấm giáp đầu tiên. Chu Trùng Bát không còn là đứa trẻ đói khát đứng giữa ruộng nghèo.",
      "Từ hôm nay, ông bước vào đời với cái tên Chu Nguyên Chương. Phía trước là quân lệnh, huynh đệ, ân tình và một thiên hạ đang rạn nứt.",
    ],
    choices: [
      {
        id: "start-new-road",
        label: "Bắt đầu con đường mới",
        description: "Đi tiếp với cả lòng người, quân kỷ và tham vọng.",
        effects: { danTam: 1, nghiaKhi: 1, quanUy: 1 },
        resultText:
          "Ông bước vào ánh sớm, không quên phía sau nhưng cũng không còn thuộc về nó.",
        nextSceneId: null,
        endingId: "balanced",
      },
      {
        id: "remember-rice",
        label: "Ghi nhớ 13 hạt gạo",
        description: "Giữ ký ức nghèo đói làm gốc của mọi lựa chọn.",
        effects: { nhanTinh: 2, danTam: 1 },
        resultText:
          "Trong túi áo, ký ức về mười ba hạt gạo nặng hơn cả chiến giáp.",
        nextSceneId: null,
        endingId: "humane",
      },
      {
        id: "grip-armor",
        label: "Nắm chặt chiến giáp",
        description: "Chọn sức mạnh để không bao giờ bị dồn ép lần nữa.",
        effects: { daTam: 2, quanUy: 1 },
        resultText:
          "Ngón tay ông siết lên mép giáp lạnh. Từ giây phút ấy, thiên hạ không còn là chuyện của người khác.",
        nextSceneId: null,
        endingId: "ambitious",
      },
    ],
    historicalNote: {
      title: "Bước vào con đường lập nghiệp",
      body: "Từ sau khi gia nhập nghĩa quân, Chu Nguyên Chương dần xây dựng uy tín, lực lượng và địa bàn, rồi trở thành người sáng lập nhà Minh năm 1368. Tập này dừng ở khoảnh khắc khởi đầu của con đường ấy.",
    },
  },
] satisfies StorySceneData[];

export const zhuYuanzhangEpisodeOne = {
  id: "zhu-yuanzhang-episode-1",
  slug: "zhu-yuanzhang",
  title: "Chu Nguyên Chương: Tập 1",
  subtitle: "Từ Chu Trùng Bát đến Chu Nguyên Chương",
  description:
    "Một hành trình ngắn qua đói nghèo, cửa chùa, nghĩa quân và cái tên mới của người sẽ mở ra triều Minh.",
  character: "Chu Nguyên Chương",
  framing:
    "Ngươi chưa phải Hoàng đế Hồng Vũ. Ngươi là Chu Trùng Bát, một kẻ sinh ra giữa đói nghèo, đi qua mất mát và bước vào nghĩa quân với một cái tên mới.",
  mapImage: "/history/zhu-yuanzhang/maps/early-journey-map.webp",
  initialStats,
  statLabels,
  characters,
  relics,
  scenes,
  endings,
} satisfies Episode;

export const zhuYuanzhangEpisode1 = zhuYuanzhangEpisodeOne;
export const zhuYuanzhangEpisode = zhuYuanzhangEpisodeOne;

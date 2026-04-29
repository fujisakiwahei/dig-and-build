// sample data
const ARTICLES = [
  { id: 1, seed: 0, date: "2026.04.21", category: "再開発", area: "日本橋", prefecture: "東京都",
    title: "日本橋、川を取り戻す",
    excerpt: "高速道路の地下化が進む日本橋で、川面の景観が再び姿を現しはじめている。" },
  { id: 2, seed: 1, date: "2026.04.18", category: "建築", area: "虎ノ門", prefecture: "東京都",
    title: "建築としての地下空間",
    excerpt: "虎ノ門ヒルズの新しい層が、地表と地下のあいだに静かに開かれている。" },
  { id: 3, seed: 2, date: "2026.04.12", category: "都市構造", area: "中之島", prefecture: "大阪府",
    title: "中之島、二つの川が編む街",
    excerpt: "堂島川と土佐堀川に挟まれた細長い島が、近代以降どのように編まれてきたか。" },
  { id: 4, seed: 3, date: "2026.04.05", category: "歴史", area: "天神", prefecture: "福岡県",
    title: "天神の地名と、消えた水路",
    excerpt: "繁華街の足元には、いまも江戸期の水路の痕跡が幾筋も残されている。" },
  { id: 5, seed: 4, date: "2026.03.28", category: "考察", area: "那覇", prefecture: "沖縄県",
    title: "那覇 — 戦後復興と街路の幅",
    excerpt: "戦後に引き直された道幅は、いまでも市の表情を静かに規定している。" },
  { id: 6, seed: 5, date: "2026.03.22", category: "商業施設", area: "梅田", prefecture: "大阪府",
    title: "梅田の地下街、回遊と迷路",
    excerpt: "日本最大級の地下街は、商業施設というより一つの都市そのものだ。" },
  { id: 7, seed: 0, date: "2026.03.14", category: "再開発", area: "丸の内", prefecture: "東京都",
    title: "丸の内のスカイラインと景観条例",
    excerpt: "高さの揃った街並みは、見えない条例と長い議論の結果である。" },
  { id: 8, seed: 2, date: "2026.03.08", category: "建築", area: "御茶ノ水", prefecture: "東京都",
    title: "御茶ノ水、谷の建築",
    excerpt: "神田川が刻んだ谷の地形は、駅と橋と大学を不思議な層に重ねている。" },
];

const CATEGORIES = [
  { id: "redev", label: "再開発", count: 18 },
  { id: "history", label: "歴史", count: 12 },
  { id: "structure", label: "都市構造", count: 9 },
  { id: "architecture", label: "建築", count: 14 },
  { id: "commerce", label: "商業施設", count: 7 },
  { id: "essay", label: "考察", count: 11 },
];

const PREFECTURES = [
  { slug: "tokyo", label: "東京都", areas: [
    { slug: "nihonbashi", label: "日本橋", count: 7 },
    { slug: "marunouchi", label: "丸の内", count: 5 },
    { slug: "toranomon", label: "虎ノ門", count: 4 },
    { slug: "shinjuku", label: "新宿", count: 6 },
    { slug: "ochanomizu", label: "御茶ノ水", count: 3 },
  ]},
  { slug: "osaka", label: "大阪府", areas: [
    { slug: "umeda", label: "梅田", count: 5 },
    { slug: "nakanoshima", label: "中之島", count: 3 },
    { slug: "namba", label: "難波", count: 4 },
    { slug: "shinsaibashi", label: "心斎橋", count: 2 },
  ]},
  { slug: "fukuoka", label: "福岡県", areas: [
    { slug: "tenjin", label: "天神", count: 4 },
    { slug: "hakata", label: "博多", count: 3 },
  ]},
  { slug: "okinawa", label: "沖縄県", areas: [
    { slug: "naha", label: "那覇", count: 2 },
  ]},
];

window.SAMPLE = { ARTICLES, CATEGORIES, PREFECTURES };

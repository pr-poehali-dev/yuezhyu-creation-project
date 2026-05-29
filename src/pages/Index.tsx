import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/ed9167de-5b10-4779-bf20-9a320b361b39/files/6fc2177d-467d-4256-aaef-55e2f30ecf03.jpg";
const ARTIST_IMG = "https://cdn.poehali.dev/projects/ed9167de-5b10-4779-bf20-9a320b361b39/files/7e2d9ca0-cab7-4d47-b2a1-d07e87cce119.jpg";
const ALBUM_IMG = "https://cdn.poehali.dev/projects/ed9167de-5b10-4779-bf20-9a320b361b39/files/2bf38962-8b9d-4eff-92e2-7cb96b9b70f4.jpg";

const NAV_LINKS = ["О лейбле", "Артисты", "Релизы", "Сервисы", "Новости", "Контакты"];

type Artist = {
  name: string; genre: string; img: string; tag: string;
  bio: string; tracks: string[];
  spotify: string; apple: string; vk: string;
};

type Release = {
  title: string; artist: string; year: string; type: string; img: string; isNew: boolean;
  desc: string; tracks: string[];
  spotify: string; apple: string; yandex: string;
};

const ARTISTS: Artist[] = [
  {
    name: "IVAN ZOLO", genre: "Rap / Drill", img: ARTIST_IMG, tag: "Топ артист",
    bio: "Ivan Zolo — один из самых востребованных рэперов новой волны. Его треки набирают миллионы прослушиваний, а живые выступления собирают аншлаги.",
    tracks: ["Дорогой", "Без башни", "Холодно", "Мотор", "Горы"],
    spotify: "https://open.spotify.com/artist/6laDMbINZworODFaAnZsHg",
    apple: "https://music.apple.com/ru/artist/ivan-zolo/1533717446",
    vk: "https://vk.com/music/artist/ivan_zolo",
  },
  {
    name: "GAZAN", genre: "Trap / Hip-Hop", img: ALBUM_IMG, tag: "Новый альбом",
    bio: "GAZAN — лирик и мелодист. Каждый его релиз становится событием: хриплый тембр и честные тексты сделали его голосом целого поколения.",
    tracks: ["Пустота", "Газ", "Небо", "Чёрное", "Молчи"],
    spotify: "https://open.spotify.com/artist/6CwfuxIqcltXDGjfZsMd9A",
    apple: "https://music.apple.com/ru/artist/gazan/1513375304",
    vk: "https://vk.com/music/artist/gazan",
  },
  {
    name: "9MICE", genre: "Hyperpop / Alt", img: ARTIST_IMG, tag: "Горячий",
    bio: "9mice — экспериментальный голос русского hyperpop. Её треки — хрупкие и острые одновременно, с миллионами стримов и культовым статусом.",
    tracks: ["Прости", "Не моя", "Одна", "Летать", "Тихо"],
    spotify: "https://open.spotify.com/artist/3N0P9yFCGjNGOTsYIMHCFh",
    apple: "https://music.apple.com/ru/artist/9mice/1535436679",
    vk: "https://vk.com/music/artist/9mice",
  },
  {
    name: "KAI ANGEL", genre: "Hyperpop / Electro", img: ALBUM_IMG, tag: "Тренд",
    bio: "Kai Angel — ключевая фигура русского андеграунда и hyperpop сцены. Смешивает электронику, эмо и поп в уникальное звучание.",
    tracks: ["0KISS0", "Wink Wink", "Ангел", "Dark Room", "Fantasy"],
    spotify: "https://open.spotify.com/artist/4RCsHCcNSz0mOrDMAbQSP9",
    apple: "https://music.apple.com/ru/artist/kai-angel/1527780825",
    vk: "https://vk.com/music/artist/kai_angel",
  },
  {
    name: "MADK1D", genre: "Drill / Trap", img: ARTIST_IMG, tag: "Андеграунд",
    bio: "MADK1D — один из главных представителей русского дрилла. Мрачные биты и острые тексты привлекли аудиторию со всей страны.",
    tracks: ["Блок", "Никто", "Тёмный", "Дорога", "Ночь"],
    spotify: "https://open.spotify.com/search/MADK1D",
    apple: "https://music.apple.com/ru/search?term=madk1d",
    vk: "https://vk.com/music/search?q=madk1d",
  },
  {
    name: "MACAN", genre: "Pop / R&B", img: ALBUM_IMG, tag: "Хит",
    bio: "MACAN — один из самых стримингово успешных русских поп-артистов. Его хиты входят в топы чартов и звучат по всей стране.",
    tracks: ["Сердце", "Истина", "Нежность", "Родной", "Свет"],
    spotify: "https://open.spotify.com/artist/3UPzMNBPHCrSMWoXqMkEyT",
    apple: "https://music.apple.com/ru/artist/macan/1527659680",
    vk: "https://vk.com/music/artist/macan",
  },
  {
    name: "ОБЛЕДЕНЕНИЕ", genre: "Indie / Shoegaze", img: ARTIST_IMG, tag: "Культ",
    bio: "Обледенение — культовый проект русской инди-сцены. Мечтательный звук и атмосферные тексты собрали преданную аудиторию.",
    tracks: ["Лёд", "Зима", "Туман", "Снег", "Север"],
    spotify: "https://open.spotify.com/search/%D0%BE%D0%B1%D0%BB%D0%B5%D0%B4%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5",
    apple: "https://music.apple.com/ru/search?term=%D0%BE%D0%B1%D0%BB%D0%B5%D0%B4%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5",
    vk: "https://vk.com/music/search?q=%D0%BE%D0%B1%D0%BB%D0%B5%D0%B4%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5",
  },
  {
    name: "PHARAOH", genre: "Cloud Rap / Trap", img: ALBUM_IMG, tag: "Легенда",
    bio: "PHARAOH — пионер русского cloud rap. Основал целое направление в отечественной музыке и вдохновил тысячи артистов.",
    tracks: ["Гламурный мусор", "Айс", "Цепи", "Фантом", "Дрим"],
    spotify: "https://open.spotify.com/artist/2dY9GJolP2FdFhSEUvhIAF",
    apple: "https://music.apple.com/ru/artist/pharaoh/982568812",
    vk: "https://vk.com/music/artist/pharaoh",
  },
];

const RELEASES: Release[] = [
  { title: "GNX", artist: "Kendrick Lamar", year: "2024", type: "Альбом", img: ALBUM_IMG, isNew: true, desc: "Внезапный альбом-сюрприз Кендрика Ламара. 12 треков, записанных в тайне — один из самых обсуждаемых релизов 2024 года.", tracks: ["wacced out murals", "squabble up", "luther", "man at the garden", "peekaboo", "hey now", "reunitedanditfeelssogood", "tv off", "dodger blue", "le mer", "heart pt. 6", "gnx"], spotify: "https://open.spotify.com/album/5JjnoGdSBFgfHEQvJAHOlV", apple: "https://music.apple.com/album/gnx/1781748571", yandex: "https://music.yandex.ru" },
  { title: "SHORT N' SWEET", artist: "Sabrina Carpenter", year: "2024", type: "Альбом", img: ARTIST_IMG, isNew: true, desc: "Прорывной альбом Сабрины Карпентер с хитами Espresso и Please Please Please. Самый продаваемый поп-альбом 2024 года.", tracks: ["Taste", "Espresso", "Please Please Please", "Coincidence", "Slim Pickins", "Bed Chem", "Juno", "Dumb & Poetic", "Good Graces", "Steal The Show", "Fountain", "Please Don't Cry"], spotify: "https://open.spotify.com/album/4pCiEXZJhTRbPiIWCdBmCW", apple: "https://music.apple.com/album/short-n-sweet/1744901977", yandex: "https://music.yandex.ru" },
  { title: "HIT ME HARD AND SOFT", artist: "Billie Eilish", year: "2024", type: "Альбом", img: ALBUM_IMG, isNew: false, desc: "Третий студийный альбом Билли Айлиш — глубокий, уязвимый и зрелый. Критики называют его лучшей работой артистки.", tracks: ["SKINNY", "LUNCH", "CHIHIRO", "BIRDS OF A FEATHER", "WILDFLOWER", "THE GREATEST", "L'AMOUR DE MA VIE", "THE DINER", "BITTERSUITE", "BLUE"], spotify: "https://open.spotify.com/album/7aJuiYOpq8yFMDEGnDJQCN", apple: "https://music.apple.com/album/hit-me-hard-and-soft/1740095940", yandex: "https://music.yandex.ru" },
  { title: "CHROMAKOPIA", artist: "Tyler, the Creator", year: "2024", type: "Альбом", img: ARTIST_IMG, isNew: false, desc: "Седьмой студийный альбом Тайлера — философское путешествие через самоопределение и взросление.", tracks: ["St. Chroma", "Rah Tah Tah", "Noid", "Darling I", "Like Him", "Balloon", "Sticky", "Judge Judy", "Thought I Was Dead", "I Killed You", "Take Your Mask Off", "Tomorrow"], spotify: "https://open.spotify.com/album/2fqoAPhBFRtGrRcpEtQBDv", apple: "https://music.apple.com/album/chromakopia/1773111672", yandex: "https://music.yandex.ru" },
  { title: "THE TORTURED POETS DEPARTMENT", artist: "Taylor Swift", year: "2024", type: "Альбом", img: ALBUM_IMG, isNew: false, desc: "11-й альбом Тейлор Свифт. Вышел одновременно с двойным изданием The Anthology — 31 трек. Побил все стриминговые рекорды.", tracks: ["Fortnight", "The Tortured Poets Department", "My Boy Only Breaks His Favorite Toys", "Down Bad", "So Long, London", "But Daddy I Love Him", "Fresh Out the Slammer", "Florida!!!", "Guilty as Sin?", "Who's Afraid of Little Old Me?"], spotify: "https://open.spotify.com/album/1Mo4aZ8pdAd5-oyfDQ5WeI", apple: "https://music.apple.com/album/the-tortured-poets-department/1736268210", yandex: "https://music.yandex.ru" },
  { title: "ETERNAL SUNSHINE", artist: "Ariana Grande", year: "2024", type: "Альбом", img: ARTIST_IMG, isNew: false, desc: "Седьмой студийный альбом Арианы Гранде — меланхоличный и танцевальный. Дебютировал на #1 в 40+ странах.", tracks: ["intro (end of the world)", "bye", "don't wanna break up again", "Saturn Returns Interlude", "eternal sunshine", "supernatural", "true story", "the boy is mine", "yes, and?", "we can't be friends", "i wish i hated you", "imperfect for you", "ordinary things"], spotify: "https://open.spotify.com/album/5EBFRoMnOGEBIF0QHxNXfY", apple: "https://music.apple.com/album/eternal-sunshine/1729824048", yandex: "https://music.yandex.ru" },
];

const SERVICES = [
  { icon: "Music", title: "A&R", desc: "Поиск, развитие и продвижение новых талантов. Полное сопровождение от демо до релиза." },
  { icon: "Radio", title: "Дистрибуция", desc: "Выход на 150+ платформ: Spotify, Apple Music, ВКонтакте, Яндекс Музыка и другие." },
  { icon: "TrendingUp", title: "Маркетинг", desc: "Продвижение в соцсетях, PR-поддержка, питчинг в плейлисты и медиа." },
  { icon: "Video", title: "Производство", desc: "Студийная запись, сведение, мастеринг, съёмка клипов и контента." },
  { icon: "Globe", title: "Международный рынок", desc: "Выход на глобальную аудиторию через партнёрскую сеть в 30+ странах." },
  { icon: "Shield", title: "Права и лицензии", desc: "Защита авторских прав, управление роялти и лицензирование контента." },
];

const NEWS = [
  { date: "28 мая 2026", tag: "Событие", title: "BeatFlow подписала соглашение с Яндекс Музыкой", preview: "Стратегическое партнёрство открывает новые возможности для наших артистов на русскоязычном рынке." },
  { date: "20 мая 2026", tag: "Релиз", title: "Kendrick Lamar выпустил сюрприз-альбом GNX", preview: "12 треков, записанных в тайне — один из самых обсуждаемых релизов года. Уже на всех платформах." },
  { date: "10 мая 2026", tag: "Чарт", title: "Sabrina Carpenter — #1 в 42 странах с SHORT N' SWEET", preview: "Альбом побил рекорды стриминга и закрепился на первой строчке Billboard Hot 100 на 6 недель." },
];

const STATS = [
  { value: "67+", label: "Артистов" },
  { value: "777+", label: "Релизов" },
  { value: "122+", label: "Платформ" },
  { value: "69M+", label: "Слушателей" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-nexo-dark font-inter overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-nexo-dark/95 backdrop-blur-md border-b border-white/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-nexo-cyan via-nexo-blue to-nexo-violet flex items-center justify-center glow-cyan">
              <span className="font-sora font-bold text-nexo-dark text-sm">B</span>
            </div>
            <div>
              <div className="font-sora font-bold text-white text-lg tracking-widest">BeatFlow</div>
              <div className="text-nexo-cyan text-[9px] tracking-[0.2em] -mt-1">движение. прогресс. будущее.</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l, i) => (
              <button
                key={i}
                onClick={() => scrollTo(l.toLowerCase().replace(/\s/g, "-"))}
                className="text-white/60 hover:text-nexo-cyan text-sm transition-colors duration-200 tracking-wide font-inter"
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("контакты")}
            className="hidden md:flex items-center gap-2 bg-nexo-cyan text-nexo-dark font-sora font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-white transition-all duration-200 hover:scale-105"
          >
            Сотрудничество
          </button>

          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-nexo-navy/98 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l, i) => (
              <button key={i} onClick={() => scrollTo(l.toLowerCase().replace(/\s/g, "-"))}
                className="text-white/70 hover:text-nexo-cyan text-base text-left transition-colors font-inter">
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo("контакты")}
              className="mt-2 bg-nexo-cyan text-nexo-dark font-sora font-semibold py-3 rounded-lg">
              Сотрудничество
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-nexo-dark/60 via-nexo-dark/40 to-nexo-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-nexo-dark/80 via-transparent to-nexo-dark/40" />
        </div>

        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(0,229,193,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,193,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #8A2BE2, transparent)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full blur-[100px] opacity-15"
          style={{ background: "radial-gradient(circle, #00E5C1, transparent)" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up opacity-0 delay-100 inline-flex items-center gap-2 bg-nexo-cyan/10 border border-nexo-cyan/30 text-nexo-cyan text-xs font-sora tracking-[0.2em] px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-nexo-cyan animate-pulse" />
              МУЗЫКАЛЬНЫЙ ЛЕЙБЛ НОВОГО ПОКОЛЕНИЯ
            </div>

            <h1 className="animate-fade-in-up opacity-0 delay-200 font-sora font-black text-6xl md:text-8xl leading-none tracking-tight mb-6">
              <span className="text-white">Beat</span>
              <span className="gradient-text text-glow-cyan">Flow</span>
            </h1>

            <p className="animate-fade-in-up opacity-0 delay-300 text-xl md:text-2xl text-white/50 font-sora font-light tracking-[0.15em] mb-4">
              движение. прогресс. будущее.
            </p>

            <p className="animate-fade-in-up opacity-0 delay-400 text-white/60 text-lg leading-relaxed max-w-xl mb-12 font-inter">
              Мы создаём среду для роста и развития, объединяя технологии, знания и людей. Стремление к росту — через каждый трек, каждого артиста.
            </p>

            <div className="animate-fade-in-up opacity-0 delay-500 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("артисты")}
                className="group flex items-center gap-3 bg-nexo-cyan text-nexo-dark font-sora font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 glow-cyan"
              >
                <Icon name="Users" size={20} />
                Наши артисты
                <Icon name="ArrowRight" size={18} />
              </button>
              <button
                onClick={() => scrollTo("релизы")}
                className="flex items-center gap-3 border border-white/20 text-white font-sora font-semibold px-8 py-4 rounded-xl hover:border-nexo-cyan/50 hover:text-nexo-cyan transition-all duration-300 backdrop-blur-sm"
              >
                <Icon name="Disc3" size={20} />
                Релизы
              </button>
            </div>
          </div>

          <div className="animate-fade-in-up opacity-0 delay-700 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {STATS.map((s, i) => (
              <div key={i} className="border-l-2 border-nexo-cyan/40 pl-4">
                <div className="font-sora font-black text-3xl text-nexo-cyan">{s.value}</div>
                <div className="text-white/40 text-sm font-inter mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-white/30 text-xs tracking-widest font-inter">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-nexo-cyan/50 to-transparent" />
        </div>
      </section>

      {/* О ЛЕЙБЛЕ */}
      <section id="о-лейбле" className="py-32 px-6 relative">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 80% 50%, #2962FF 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-nexo-cyan text-xs font-sora tracking-[0.3em] mb-4">О ЛЕЙБЛЕ</div>
              <h2 className="font-sora font-black text-5xl md:text-6xl text-white leading-tight mb-8">
                Мы строим<br />
                <span className="gradient-text">звуковое будущее</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6 font-inter">
                BeatFlow — независимый музыкальный лейбл, основанный в 2020 году. Мы объединяем артистов с визионерским взглядом, которые хотят двигаться вперёд без компромиссов.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-10 font-inter">
                Наша миссия: создавать среду, где талант встречает технологии, а музыка становится движущей силой перемен.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Развитие", "Инновации", "Люди", "Честность", "Смелость"].map((v) => (
                  <span key={v} className="border border-nexo-violet/40 text-nexo-violet text-sm font-sora px-4 py-1.5 rounded-full bg-nexo-violet/5">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] animate-float">
                <img src={ALBUM_IMG} alt="О лейбле" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexo-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-nexo-dark/80 backdrop-blur rounded-xl border border-white/10">
                  <div className="font-sora font-bold text-white text-lg mb-1">Двигайся. Создавай. Опережай.</div>
                  <div className="text-nexo-cyan text-sm font-inter">— слоган BeatFlow</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-[60px] opacity-30"
                style={{ background: "radial-gradient(circle, #8A2BE2, transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* АРТИСТЫ */}
      <section id="артисты" className="py-32 px-6 bg-nexo-navy/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-cyan/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-nexo-cyan text-xs font-sora tracking-[0.3em] mb-4">АРТИСТЫ</div>
              <h2 className="font-sora font-black text-5xl md:text-6xl text-white leading-tight">
                Голоса<br />
                <span className="gradient-text">поколения</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 border border-white/20 text-white/70 hover:text-nexo-cyan hover:border-nexo-cyan/40 font-sora text-sm px-6 py-3 rounded-xl transition-all duration-200">
              Все артисты <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {ARTISTS.map((a, i) => (
              <div key={i} onClick={() => setSelectedArtist(a)} className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover bg-nexo-darkest border border-white/5">
                <div className="aspect-[3/4] relative">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-nexo-dark via-nexo-dark/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-nexo-cyan/90 text-nexo-dark font-sora font-bold text-xs px-3 py-1 rounded-full">
                    {a.tag}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-sora font-black text-white text-2xl mb-1">{a.name}</div>
                  <div className="text-white/50 text-sm font-inter">{a.genre}</div>
                  <div className="mt-3 flex items-center gap-2 text-nexo-cyan text-sm font-sora opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="Play" size={14} />
                    Слушать
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-violet/30 to-transparent" />
      </section>

      {/* РЕЛИЗЫ */}
      <section id="релизы" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-nexo-cyan text-xs font-sora tracking-[0.3em] mb-4">РЕЛИЗЫ</div>
              <h2 className="font-sora font-black text-5xl md:text-6xl text-white leading-tight">
                Последние<br />
                <span className="gradient-text">релизы</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 border border-white/20 text-white/70 hover:text-nexo-cyan hover:border-nexo-cyan/40 font-sora text-sm px-6 py-3 rounded-xl transition-all duration-200">
              Каталог <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {RELEASES.map((r, i) => (
              <div key={i}
                className="group relative rounded-xl overflow-hidden cursor-pointer card-hover"
                onMouseEnter={() => setPlayingId(i)}
                onMouseLeave={() => setPlayingId(null)}
                onClick={() => setSelectedRelease(r)}
              >
                <div className="aspect-square relative">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-nexo-dark via-nexo-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  {r.isNew && (
                    <div className="absolute top-2 right-2 bg-nexo-cyan text-nexo-dark font-sora font-bold text-[10px] px-2 py-0.5 rounded-full">
                      NEW
                    </div>
                  )}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${playingId === i ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                    <div className="w-12 h-12 rounded-full bg-nexo-cyan/90 flex items-center justify-center glow-cyan">
                      <Icon name="Play" size={20} className="text-nexo-dark" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-nexo-navy/80 backdrop-blur">
                  <div className="font-sora font-bold text-white text-sm truncate">{r.title}</div>
                  <div className="text-white/40 text-xs font-inter mt-0.5">{r.artist}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-nexo-violet text-[10px] font-sora">{r.type}</span>
                    <span className="text-white/30 text-[10px]">{r.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СЕРВИСЫ */}
      <section id="сервисы" className="py-32 px-6 bg-nexo-navy/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-blue/30 to-transparent" />
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 20% 50%, #00E5C1 0%, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-nexo-cyan text-xs font-sora tracking-[0.3em] mb-4">СЕРВИСЫ</div>
            <h2 className="font-sora font-black text-5xl md:text-6xl text-white mb-6">
              Всё что нужно<br />
              <span className="gradient-text">для успеха</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto font-inter">
              Полный цикл поддержки от подписания контракта до мирового признания.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-nexo-darkest/50 border border-white/5 hover:border-nexo-cyan/30 card-hover transition-colors duration-300">
                <div className="w-14 h-14 rounded-xl bg-nexo-cyan/10 border border-nexo-cyan/20 flex items-center justify-center mb-6 group-hover:bg-nexo-cyan/20 transition-colors duration-300">
                  <Icon name={s.icon} size={26} className="text-nexo-cyan" />
                </div>
                <div className="font-sora font-bold text-white text-xl mb-3">{s.title}</div>
                <div className="text-white/50 text-sm leading-relaxed font-inter">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-violet/30 to-transparent" />
      </section>

      {/* НОВОСТИ */}
      <section id="новости" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-nexo-cyan text-xs font-sora tracking-[0.3em] mb-4">НОВОСТИ</div>
              <h2 className="font-sora font-black text-5xl md:text-6xl text-white leading-tight">
                В центре<br />
                <span className="gradient-text">событий</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-nexo-navy/50 border border-white/5 hover:border-nexo-violet/30 card-hover transition-colors duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-nexo-violet border border-nexo-violet/40 text-xs font-sora px-3 py-1 rounded-full bg-nexo-violet/5">
                    {n.tag}
                  </span>
                  <span className="text-white/30 text-xs font-inter">{n.date}</span>
                </div>
                <h3 className="font-sora font-bold text-white text-xl mb-3 group-hover:text-nexo-cyan transition-colors duration-200 leading-tight">
                  {n.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-inter">{n.preview}</p>
                <div className="mt-5 flex items-center gap-2 text-nexo-cyan text-sm font-sora opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Читать далее <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-nexo-blue/20 via-nexo-violet/20 to-nexo-cyan/10" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(0,229,193,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,193,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-cyan/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-cyan/40 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="font-sora font-black text-5xl md:text-7xl text-white mb-6 leading-tight">
            Готов стать<br />
            <span className="gradient-text text-glow-cyan">частью BeatFlow?</span>
          </div>
          <p className="text-white/60 text-xl mb-10 font-inter max-w-xl mx-auto">
            Отправь нам своё демо — мы слушаем каждый трек. Твой звук может изменить всё.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollTo("контакты")}
              className="group flex items-center gap-3 bg-nexo-cyan text-nexo-dark font-sora font-bold text-lg px-10 py-5 rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 glow-cyan"
            >
              Отправить демо
              <Icon name="Send" size={20} />
            </button>
            <button
              onClick={() => scrollTo("сервисы")}
              className="flex items-center gap-3 border border-white/20 text-white font-sora font-semibold text-lg px-10 py-5 rounded-xl hover:border-nexo-cyan/50 hover:text-nexo-cyan transition-all duration-300"
            >
              Узнать условия
            </button>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="контакты" className="py-32 px-6 bg-nexo-navy/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexo-cyan/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <div className="text-nexo-cyan text-xs font-sora tracking-[0.3em] mb-4">КОНТАКТЫ</div>
              <h2 className="font-sora font-black text-5xl text-white leading-tight mb-8">
                Свяжитесь<br />
                <span className="gradient-text">с нами</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-12 font-inter">
                Готовы к сотрудничеству? Пишите нам — отвечаем в течение 24 часов.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Email", value: "musikedishenprosupermegotop777_67@gmail.com", href: "mailto:musikedishenprosupermegotop777_67@gmail.com" },
                  { icon: "Phone", label: "Телефон", value: "+7 (961) 985-90-32", href: "tel:+79619859032" },
                  { icon: "MapPin", label: "Офис", value: "Москва, Россия", href: null },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-nexo-cyan/10 border border-nexo-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={20} className="text-nexo-cyan" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-inter mb-0.5">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-white font-sora font-medium hover:text-nexo-cyan transition-colors duration-200 break-all">{c.value}</a>
                      ) : (
                        <div className="text-white font-sora font-medium">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-4">
                {[
                  { icon: "Instagram" },
                  { icon: "Youtube" },
                  { icon: "Music" },
                  { icon: "Send" },
                ].map((s, i) => (
                  <button key={i} className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-nexo-cyan/40 hover:bg-nexo-cyan/10 flex items-center justify-center transition-all duration-200 group">
                    <Icon name={s.icon} size={18} className="text-white/50 group-hover:text-nexo-cyan" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-nexo-darkest/50 rounded-2xl border border-white/5 p-8">
              <h3 className="font-sora font-bold text-white text-2xl mb-8">Отправить запрос</h3>
              <div className="space-y-5">
                <div>
                  <label className="text-white/50 text-sm font-inter mb-2 block">Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов"
                    className="w-full bg-nexo-navy/60 border border-white/10 focus:border-nexo-cyan/50 text-white placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200 font-inter" />
                </div>
                <div>
                  <label className="text-white/50 text-sm font-inter mb-2 block">Email</label>
                  <input type="email" placeholder="ivan@example.com"
                    className="w-full bg-nexo-navy/60 border border-white/10 focus:border-nexo-cyan/50 text-white placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200 font-inter" />
                </div>
                <div>
                  <label className="text-white/50 text-sm font-inter mb-2 block">Тема</label>
                  <select className="w-full bg-nexo-navy/60 border border-white/10 focus:border-nexo-cyan/50 text-white rounded-xl px-4 py-3.5 outline-none transition-colors duration-200 font-inter appearance-none">
                    <option value="">Выберите тему</option>
                    <option>Отправить демо</option>
                    <option>Дистрибуция</option>
                    <option>Маркетинг</option>
                    <option>Партнёрство</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-sm font-inter mb-2 block">Сообщение</label>
                  <textarea rows={4} placeholder="Расскажите о себе и вашем проекте..."
                    className="w-full bg-nexo-navy/60 border border-white/10 focus:border-nexo-cyan/50 text-white placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200 font-inter resize-none" />
                </div>
                <button className="w-full bg-nexo-cyan text-nexo-dark font-sora font-bold py-4 rounded-xl hover:bg-white transition-all duration-300 hover:scale-[1.02] glow-cyan flex items-center justify-center gap-2">
                  <Icon name="Send" size={18} />
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nexo-cyan via-nexo-blue to-nexo-violet flex items-center justify-center">
              <span className="font-sora font-bold text-nexo-dark text-xs">B</span>
            </div>
            <div>
              <span className="font-sora font-bold text-white tracking-widest">BeatFlow</span>
              <span className="text-nexo-cyan text-xs ml-2 opacity-60">движение. прогресс. будущее.</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Условия использования"].map((l) => (
              <button key={l} className="text-white/30 hover:text-white/60 text-xs font-inter transition-colors">{l}</button>
            ))}
          </div>
          <div className="text-white/20 text-xs font-inter">© 2026 BeatFlow. Все права защищены.</div>
        </div>
      </footer>

      {/* МОДАЛ: АРТИСТ */}
      {selectedArtist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedArtist(null)}>
          <div className="absolute inset-0 bg-nexo-dark/90 backdrop-blur-xl" />
          <div className="relative w-full max-w-2xl bg-nexo-navy border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-56">
              <img src={selectedArtist.img} alt={selectedArtist.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-nexo-navy via-nexo-navy/40 to-transparent" />
              <button onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <Icon name="X" size={18} />
              </button>
              <div className="absolute bottom-5 left-6">
                <span className="bg-nexo-cyan/90 text-nexo-dark font-sora font-bold text-xs px-3 py-1 rounded-full mb-2 inline-block">{selectedArtist.tag}</span>
                <div className="font-sora font-black text-white text-4xl">{selectedArtist.name}</div>
                <div className="text-white/50 text-sm font-inter">{selectedArtist.genre}</div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/70 font-inter text-sm leading-relaxed mb-5">{selectedArtist.bio}</p>
              <div className="mb-5">
                <div className="text-white/40 text-xs font-sora tracking-widest mb-3">ТРЕКИ</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedArtist.tracks.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-white/70 text-sm font-inter hover:bg-nexo-cyan/10 hover:text-nexo-cyan transition-colors cursor-pointer">
                      <Icon name="Music2" size={12} className="text-nexo-cyan/60" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={selectedArtist.spotify} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1DB954] text-white font-sora font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <Icon name="Music" size={16} /> Spotify
                </a>
                <a href={selectedArtist.apple} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-sora font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <Icon name="Music2" size={16} /> Apple Music
                </a>
                <a href={selectedArtist.vk} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#2787F5] text-white font-sora font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <Icon name="Headphones" size={16} /> ВКонтакте
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛ: РЕЛИЗ */}
      {selectedRelease && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedRelease(null)}>
          <div className="absolute inset-0 bg-nexo-dark/90 backdrop-blur-xl" />
          <div className="relative w-full max-w-2xl bg-nexo-navy border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-48">
              <img src={selectedRelease.img} alt={selectedRelease.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-nexo-navy via-nexo-navy/50 to-transparent" />
              <button onClick={() => setSelectedRelease(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <Icon name="X" size={18} />
              </button>
              <div className="absolute bottom-5 left-6 flex items-end gap-4">
                <img src={selectedRelease.img} alt="" className="w-16 h-16 rounded-xl border-2 border-nexo-cyan/40 object-cover" />
                <div>
                  {selectedRelease.isNew && <span className="bg-nexo-cyan text-nexo-dark font-sora font-bold text-[10px] px-2 py-0.5 rounded-full mb-1 inline-block">NEW</span>}
                  <div className="font-sora font-black text-white text-3xl">{selectedRelease.title}</div>
                  <div className="text-white/50 text-sm font-inter">{selectedRelease.artist} · {selectedRelease.type} · {selectedRelease.year}</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-white/70 font-inter text-sm leading-relaxed mb-5">{selectedRelease.desc}</p>
              <div className="mb-5">
                <div className="text-white/40 text-xs font-sora tracking-widest mb-3">ТРЕКЛИСТ</div>
                <div className="space-y-1.5">
                  {selectedRelease.tracks.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/track">
                      <span className="text-white/20 text-xs w-5 text-right font-inter">{i + 1}</span>
                      <Icon name="Music2" size={12} className="text-nexo-cyan/50 group-hover/track:text-nexo-cyan transition-colors" />
                      <span className="text-white/70 text-sm font-inter group-hover/track:text-white transition-colors">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={selectedRelease.spotify} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1DB954] text-white font-sora font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <Icon name="Music" size={16} /> Spotify
                </a>
                <a href={selectedRelease.apple} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-sora font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <Icon name="Music2" size={16} /> Apple Music
                </a>
                <a href={selectedRelease.yandex} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#FFCC00] text-black font-sora font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <Icon name="Headphones" size={16} /> Яндекс Музыка
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
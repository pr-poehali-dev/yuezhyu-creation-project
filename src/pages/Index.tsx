import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/ed9167de-5b10-4779-bf20-9a320b361b39/files/6fc2177d-467d-4256-aaef-55e2f30ecf03.jpg";
const ARTIST_IMG = "https://cdn.poehali.dev/projects/ed9167de-5b10-4779-bf20-9a320b361b39/files/7e2d9ca0-cab7-4d47-b2a1-d07e87cce119.jpg";
const ALBUM_IMG = "https://cdn.poehali.dev/projects/ed9167de-5b10-4779-bf20-9a320b361b39/files/2bf38962-8b9d-4eff-92e2-7cb96b9b70f4.jpg";

const NAV_LINKS = ["О лейбле", "Артисты", "Релизы", "Сервисы", "Новости", "Контакты"];

const ARTISTS = [
  { name: "AXEN", genre: "Electronic / Future Bass", img: ARTIST_IMG, tag: "Топ артист" },
  { name: "VEYRA", genre: "Dark Pop / Synthwave", img: ALBUM_IMG, tag: "Новый релиз" },
  { name: "ORION K", genre: "Hip-Hop / Trap", img: ARTIST_IMG, tag: "Тур 2026" },
  { name: "SYLA", genre: "R&B / Neo Soul", img: ALBUM_IMG, tag: "Дебют" },
];

const RELEASES = [
  { title: "PHASE ONE", artist: "AXEN", year: "2026", type: "Альбом", img: ALBUM_IMG, isNew: true },
  { title: "VOID", artist: "VEYRA", year: "2026", type: "EP", img: ARTIST_IMG, isNew: true },
  { title: "NIGHTCODE", artist: "ORION K", year: "2025", type: "Сингл", img: ALBUM_IMG, isNew: false },
  { title: "MIRROR", artist: "SYLA", year: "2025", type: "EP", img: ARTIST_IMG, isNew: false },
  { title: "AURORA", artist: "AXEN", year: "2025", type: "Альбом", img: ALBUM_IMG, isNew: false },
  { title: "GRID", artist: "VEYRA", year: "2024", type: "Сингл", img: ARTIST_IMG, isNew: false },
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
  { date: "28 мая 2026", tag: "Событие", title: "NEXOVIA подписала соглашение с Яндекс Музыкой", preview: "Стратегическое партнёрство открывает новые возможности для наших артистов на русскоязычном рынке." },
  { date: "15 мая 2026", tag: "Релиз", title: "AXEN выпускает дебютный альбом PHASE ONE", preview: "Долгожданный альбом из 12 треков уже доступен на всех платформах. Слушайте прямо сейчас." },
  { date: "3 мая 2026", tag: "Тур", title: "ORION K — тур по городам России", preview: "Концерты в Москве, Санкт-Петербурге, Екатеринбурге и Новосибирске. Билеты поступили в продажу." },
];

const STATS = [
  { value: "50+", label: "Артистов" },
  { value: "500+", label: "Релизов" },
  { value: "150+", label: "Платформ" },
  { value: "10M+", label: "Слушателей" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

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
              <span className="font-sora font-bold text-nexo-dark text-sm">N</span>
            </div>
            <div>
              <div className="font-sora font-bold text-white text-lg tracking-widest">NEXOVIA</div>
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
              <span className="text-white">НЕ</span>
              <span className="gradient-text text-glow-cyan">XO</span>
              <span className="text-white">VIA</span>
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
                NEXOVIA — независимый музыкальный лейбл, основанный в 2020 году. Мы объединяем артистов с визионерским взглядом, которые хотят двигаться вперёд без компромиссов.
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
                  <div className="text-nexo-cyan text-sm font-inter">— слоган NEXOVIA</div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTISTS.map((a, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover bg-nexo-darkest border border-white/5">
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
            <span className="gradient-text text-glow-cyan">частью NEXOVIA?</span>
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
                  { icon: "Mail", label: "Email", value: "info@nexovia.com" },
                  { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
                  { icon: "MapPin", label: "Офис", value: "Москва, Россия" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-nexo-cyan/10 border border-nexo-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={20} className="text-nexo-cyan" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-inter mb-0.5">{c.label}</div>
                      <div className="text-white font-sora font-medium">{c.value}</div>
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
              <span className="font-sora font-bold text-nexo-dark text-xs">N</span>
            </div>
            <div>
              <span className="font-sora font-bold text-white tracking-widest">NEXOVIA</span>
              <span className="text-nexo-cyan text-xs ml-2 opacity-60">движение. прогресс. будущее.</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Условия использования"].map((l) => (
              <button key={l} className="text-white/30 hover:text-white/60 text-xs font-inter transition-colors">{l}</button>
            ))}
          </div>
          <div className="text-white/20 text-xs font-inter">© 2026 NEXOVIA. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}
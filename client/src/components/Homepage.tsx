import React, { useState } from "react";
import diya from "../assets/diya.svg";
import dandiya from "../assets/dandiya.svg";
import bg from "../assets/Untitled design (7) - Copy.png";
import bg2 from "../assets/xxxx.png";
import { formatEventDatePretty } from "../pages/Dashboard";
import {
  sponsors as sponsorData,
  oldHighlights as highlightsData,
  featuredEvents,
} from "../data/content";
import rangoli from "../assets/rangoli.svg";
import elephant from "../assets/elephant.svg";
import {
  HeartHandshake,
  HandCoins,
  Users,
  Globe,
  Salad,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import gourd from "../assets/Gourd.png";
import peacock from "../assets/peacock.png";

type FeaturedEventRow = {
  id: number;
  title: string;
  date: string;
  venue: string;
  decription: string;
  link: string;
  Image: string;
  createdAt?: string;
};
type OldHighlight = {
  id: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};
function SimpleCarousel({
  items,
  interval = 2800,
  heightClass = "h-[22rem] md:h-[26rem]",
}: {
  items: { id?: number | string; image: string }[];
  interval?: number;
  heightClass?: string;
}) {
  const [idx, setIdx] = React.useState(0);
  const [isHover, setIsHover] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = React.useState(0);
  const [vw, setVw] = React.useState(0);
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const focusRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVw(el.clientWidth));
    ro.observe(el);
    setVw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const count = items.length;
  const go = (n: number) => setIdx((i) => (i + n + count) % count);
  const goTo = (n: number) => setIdx(((n % count) + count) % count);

  React.useEffect(() => {
    if (count <= 1 || isHover || isDragging) return;
    const id = setInterval(() => go(1), interval);
    return () => clearInterval(id);
  }, [count, interval, isHover, isDragging]);

  const start = (x: number) => {
    setIsDragging(true);
    setDragStartX(x);
    setDragDeltaX(0);
  };
  const move = (x: number) => {
    if (dragStartX != null) setDragDeltaX(x - dragStartX);
  };
  const end = () => {
    const threshold = Math.max(50, vw * 0.12);
    if (dragDeltaX > threshold) go(-1);
    else if (dragDeltaX < -threshold) go(1);
    setIsDragging(false);
    setDragStartX(null);
    setDragDeltaX(0);
  };

  React.useEffect(() => {
    const el = focusRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const translatePx = -(idx * vw) + (isDragging ? dragDeltaX : 0);
  const current = items[idx];

  const THUMB_W = 80;
  const THUMB_H = 56;
  const GAP = 10;
  const VISIBLE = 5;
  const stripWidth = VISIBLE * THUMB_W + (VISIBLE - 1) * GAP;

  const centerOffset = (THUMB_W + GAP) * (idx - Math.floor(VISIBLE / 2));

  const maxOffset = Math.max(0, (THUMB_W + GAP) * count - stripWidth);
  const clampedOffset = Math.min(Math.max(centerOffset, 0), maxOffset);

  return (
    <div className="relative w-full select-none">
      <div
        ref={focusRef}
        tabIndex={0}
        className="relative mx-auto w-[80%] outline-none group"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-label="Event photos carousel"
      >

        <div className="pointer-events-none absolute -inset-[4px] rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500">
          <div
            className="absolute -inset-[2px] rounded-3xl blur-xl"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,196,102,.35), rgba(255,106,0,.25), rgba(255,196,102,.35))",
            }}
          />
        </div>

        <div
          ref={viewportRef}
          className={[
            "relative overflow-hidden rounded-3xl shadow-2xl",
            heightClass,
          ].join(" ")}
        >
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${current?.image || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(18px) saturate(1.05)",
              opacity: 0.25,
            }}
            aria-hidden
          />

          <div
            className="absolute inset-0"
            onMouseDown={(e) => start(e.clientX)}
            onMouseMove={(e) => isDragging && move(e.clientX)}
            onMouseUp={end}
            onMouseLeave={() => isDragging && end()}
            onTouchStart={(e) => start(e.touches[0].clientX)}
            onTouchMove={(e) => move(e.touches[0].clientX)}
            onTouchEnd={end}
            role="region"
          >
            <div
              className={[
                "h-full flex",
                isDragging ? "" : "transition-transform duration-600 ease-out",
              ].join(" ")}
              style={{ transform: `translateX(${translatePx}px)` }}
            >
              {items.map((it, i) => (
                <div
                  key={it.id ?? i}
                  className="shrink-0 h-full"
                  style={{ width: vw || "100%" }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={it.image}
                      alt={`Event highlight ${i + 1}`}
                      className={[
                        "w-full h-full object-cover rounded-3xl transition-transform duration-700",

                        i === idx
                          ? "group-hover:scale-[1.04] animate-[kenburns_15s_ease-in-out_infinite]"
                          : "",
                      ].join(" ")}
                      loading="lazy"
                      draggable={false}
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_50px_rgba(0,0,0,.25)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {count > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm bg-black/20 hover:bg-black/30 text-white shadow transition transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring focus:ring-white/40"
                aria-label="Previous"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm bg-black/20 hover:bg-black/30 text-white shadow transition transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring focus:ring-white/40"
                aria-label="Next"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div
            className="mt-4 mx-auto relative"
            style={{
              width: stripWidth,

              WebkitMaskImage:
                "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 24px, rgba(0,0,0,1) calc(100% - 24px), rgba(0,0,0,0))",
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 24px, rgba(0,0,0,1) calc(100% - 24px), rgba(0,0,0,0))",
            }}
          >
            <div
              className="flex items-center"
              style={{
                gap: GAP,
                width: (THUMB_W + GAP) * count - GAP,
                transform: `translateX(-${clampedOffset}px)`,
                transition: isDragging ? "none" : "transform 500ms ease",
              }}
            >
              {items.map((it, i) => (
                <button
                  key={`thumb-${it.id ?? i}`}
                  onClick={() => goTo(i)}
                  className="relative rounded-lg overflow-hidden outline-none focus:ring-2 focus:ring-white/50"
                  style={{
                    width: THUMB_W,
                    height: THUMB_H,
                    flex: "0 0 auto",
                    opacity: i === idx ? 1 : 0.8,
                    transform: i === idx ? "scale(1.04)" : "scale(1)",
                    transition: "transform 200ms, opacity 200ms",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <img src={it.image} className="w-full h-full object-cover" />

                  {i === idx && (
                    <span className="pointer-events-none absolute inset-0 ring-2 ring-amber-300 rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translate(0, 0); }
          50%  { transform: scale(1.12) translate(2%, -2%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
      `}</style>
    </div>
  );
}

function normalizeDateString(s?: string) {
  if (!s) return NaN;
  const normalized = s.includes("T") ? s : s.replace(" ", "T");
  const t = Date.parse(normalized);
  return Number.isNaN(t) ? Date.parse(s) : t;
}

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-14 px-3 py-2 rounded-xl bg-[#fff2d6] text-[#7a4d00] text-2xl font-bold shadow-sm text-center">
        {value}
      </div>
      <span className="mt-1 text-xs uppercase tracking-wide text-[#7a4d00]/80">
        {label}
      </span>
    </div>
  );
}

function Countdown({ to }: { to?: string }) {
  const [now, setNow] = React.useState<number>(() => Date.now());

  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!to) return null;
  const ts = normalizeDateString(to);
  if (Number.isNaN(ts)) return null;

  const diff = ts - now;
  if (diff <= 0) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
        🎉 The event has started!
      </div>
    );
  }

  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hrs = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  return (
    <div className="flex items-end gap-3">
      <TimeBox value={String(days)} label="days" />
      <TimeBox value={pad2(hrs)} label="hours" />
      <TimeBox value={pad2(mins)} label="mins" />
      <TimeBox value={pad2(secs)} label="secs" />
    </div>
  );
}

function useInView(options?: IntersectionObserverInit) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);

        obs.unobserve(entry.target);
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
  distance = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "left" | "right" | "up" | "down";
  distance?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  const off = {
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
  }[from];

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100" : "opacity-0",
        className,
      ].join(" ")}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView ? "none" : off,
      }}
    >
      {children}
    </div>
  );
}

const Homepage = () => {
  const [sponsors] = useState<{ logo: string; link: string }[]>(
    sponsorData.map((r) => ({ logo: r.images, link: r.link }))
  );
  const loading = false;
  const [nextEvent] = useState<FeaturedEventRow | null>(
    featuredEvents[0] ?? null
  );
  const evLoading = false;
  const [oldHighlights] = useState<OldHighlight[]>(highlightsData);
  const ohLoading = false;

  const iconStyle = "w-13 h-13 text-white";
  const boxStyle =
    "flex items-center justify-center w-17 h-17 rounded-lg bg-[#5d4037]";
  const boxStyle1 =
    "flex items-center justify-center w-17 h-17 rounded-lg bg-[#4d3a35]";

  return (
    <>
      <div className="py-6 pb-12 ">
        <div className="flex justify-center items-center">
          <h1 className="text-center mb-8 fancy" style={{ fontSize: "1.5rem" }}>
            Sponsored
          </h1>
          <h1
            className="text-center mb-8 fancy pl-2"
            style={{ color: "#ffc466", fontSize: "1.5rem" }}
          >
            by:
          </h1>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 px-6">
          {loading && (
            <span className="crimson text-lg">Loading sponsors…</span>
          )}

          {!loading && sponsors.length === 0 && (
            <span className="crimson text-lg">No sponsors yet.</span>
          )}

          {sponsors.map((s, idx) => (
            <Reveal>
              <a
                key={idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={s.logo}
                  alt={`Sponsor ${idx + 1}`}
                  className="max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <section id="learn-more-target">
        <div
          className="py-24 pt-25 pb-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${bg}")` }}
        >
          <div className="max-w-6xl mx-auto px-6 flex gap-20 justify-center items-center">

            <div>
              <Reveal>
                <h2 className="contacttexth mb-3">Our Next Event</h2>
              </Reveal>
              {evLoading ? (
                <p className="crimson text-lg">Loading event…</p>
              ) : !nextEvent ? (
                <p className="crimson text-lg">
                  No upcoming events yet. Check back soon!
                </p>
              ) : (
                <>
                  <Reveal>
                    <h3 className="fancy text-3xl md:text-4xl mb-2">
                      {nextEvent.title}
                    </h3>
                    <div className="text-[#22324b] crimson text-lg space-y-2 mb-5">
                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {formatEventDatePretty(nextEvent.date)}
                      </p>
                      <p>
                        <span className="font-semibold">Venue:</span>{" "}
                        {nextEvent.venue}
                      </p>
                      <p className="text-base">{nextEvent.decription}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 text-sm rounded-full bg-[#ffc466]/30 text-[#7a4d00]">
                        Family Friendly
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                        Community Event
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">
                        Everyone Welcome
                      </span>
                    </div>

                    <div className="mb-5">
                      <Countdown to={nextEvent.date} />
                    </div>

                    <div className="flex flex-wrap ">
                      <a
                        href={nextEvent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                          "relative inline-flex items-center gap-2 core-card",
                          "px-6 py-3 rounded-xl text-white font-semibold",
                          "transition transform hover:scale-[1.04] active:scale-95",
                          "shadow-[0_10px_20px_rgba(255,106,0,.25)] focus:outline-none focus:ring-4 focus:ring-amber-300",

                          "bg-[linear-gradient(90deg,#ff6a00,#ffb300,#ff6a00)]",
                          "bg-[length:200%_100%] animate-[pulse_3s_ease-in-out_infinite]",
                          "overflow-hidden",
                        ].join(" ")}
                        style={{ backgroundSize: "200% 100%" }}
                      >

                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/10 skew-x-12"
                          style={{ animation: "shine 3.2s linear infinite" }}
                        />
                        <span>🎊 Join the Celebration</span>
                      </a>
                    </div>
                  </Reveal>
                </>
              )}
            </div>
            <style>{`
        @keyframes floaty {
          0%   { transform: translateY(0) rotate(-2deg); }
          50%  { transform: translateY(-6px) rotate(2deg); }
          100% { transform: translateY(0) rotate(-2deg); }
        }
        .flyer-float { animation: floaty 4s ease-in-out infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .flyer-float { animation: none; } }

        @keyframes shine {
            0% { transform: translateX(-120%) }
            100% { transform: translateX(380%) }
            }
           /* Core Value Card Glow + Enlarge */
          .core-card {
            transition: transform 0.35s ease, box-shadow 0.35s ease;
          }
          .core-card:hover {
            transform: scale(1.08);
            box-shadow: 0 0 25px rgba(255, 196, 102, 0.8), 0 0 50px rgba(255, 196, 102, 0.5);
          }
            `}</style>

            <div className="w-full">
              {evLoading ? (
                <div className="w-[90%] core-card h-[22rem] rounded-xl bg-gray-100 animate-pulse" />
              ) : nextEvent ? (
                <Reveal from="right" distance={60} delay={80}>
                  <img
                    src={nextEvent.Image}
                    alt={nextEvent.title}
                    className="w-[33rem] h-auto rounded-xl shadow-xl flyer-float"
                  />
                </Reveal>
              ) : (
                <div className="w-[90%] h-[22rem] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                  Event image coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div
        className="w-full py-8 bg-cover text-[#fbc742] pb-20"
        style={{ backgroundImage: `url("${bg2}")` }}
      >
        <Reveal>
          <h2 className="text-3xl  contacttexth text-center mb-10 mt-2">
            Moments from Past Events
          </h2>
        </Reveal>
        <Reveal>
          {ohLoading ? (
            <div className="px-6 text-center text-gray-500">
              Loading photos…
            </div>
          ) : oldHighlights.length === 0 ? (
            <div className="px-6 text-center text-gray-500">
              No photos yet. Check back soon!
            </div>
          ) : (
            <SimpleCarousel
              items={oldHighlights.map((x) => ({ id: x.id, image: x.image }))}
              interval={3000}
              heightClass="h-[22rem] md:h-[40rem]"
            />
          )}
        </Reveal>
      </div>
      <Reveal delay={0}>
        <div className="flex justify-center mt-8">
          <div className="group [perspective:1000px] my-10">
            <div className="relative w-[70rem] min-h-[28rem] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-4xl shadow-lg">

              <div
                className="absolute inset-0 rounded-4xl [backface-visibility:hidden]"
                style={{ backgroundColor: "#fff8e1" }}
              >
                <div className="flex">
                  <div className="ml-13 mr-15 mx-auto pb-15">
                    <h1 className="crimson pl-3 rounded-2xl py-1 text-6xl mt-10 mb-3">
                      Our Vision
                    </h1>
                    <p className="crimson ml-4" style={{ fontSize: "1.2rem" }}>
                      Central Valley Gujarati Community Association (CVGCA)
                      vision is to celebrate and preserve Gujarati and Indian
                      traditions in California's Central Valley, Tri-Valley, and
                      the Bay Area. We aim to build a strong and connected
                      community that actively supports one another and engages
                      in charitable initiatives. Together, we foster a vibrant
                      spirit, create a lasting impact on our community, and
                      share the gift of giving through charity.
                    </p>
                  </div>
                  <div className="flex min-h-[28rem] min-w-[28rem] justify-center items-center">
                    <img
                      src="https://cdn.pixabay.com/photo/2024/03/16/08/06/happy-holi-hai-8636532_1280.jpg"
                      className="rounded-4xl"
                      width="400"
                    />
                  </div>
                </div>
              </div>

              <div
                className="absolute w-[70rem] inset-0 rounded-4xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ backgroundColor: "#fff8e1" }}
              >
                <div className="ml-13 mr-15 mx-auto ">
                  <h1 className="crimson pl-3 rounded-2xl py-1 text-6xl mt-10 mb-3">
                    How You Can Help Out
                  </h1>
                </div>
                <div>
                  <Link to="/volunteering">
                    <div className="flex ml-18 mt-5  gap-3">
                      <div className={boxStyle}>
                        <HeartHandshake className={iconStyle} />
                      </div>
                      <div>
                        <p className="text-3xl crimson">Volunteering</p>
                        <p className="text-xs  text-gray-600">
                          You can help us out by volunteering at events, and
                          helping us out whenever you need it.
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/donate">
                    <div className="flex ml-18 mt-5 gap-3">
                      <div className={boxStyle}>
                        <HandCoins className={iconStyle} />
                      </div>
                      <div>
                        <p className="text-3xl crimson">Donations</p>
                        <p className="text-xs  text-gray-600">
                          Every single dollar you give us goes a long way. This
                          helps us host better events and make them a much
                          better experience for everyone.
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="https://bit.ly/cvgcagarba2025">
                    <div className="flex ml-18 mt-5 gap-3">
                      <div className={boxStyle}>
                        <Users className={iconStyle} />
                      </div>
                      <div>
                        <p className="text-3xl crimson">Attend Events</p>
                        <p className="text-xs max-w-[50rem] text-gray-600">
                          Buy tickets and attend our events. With more and more
                          people joining us very year we feel motivated to
                          provide everyone with a better experience.
                          Furthermore, every single dollar that comes from these
                          events goes back into making better ones in the
                          future.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="relative text-center mt-15 mb-20">
        <Reveal
          from="right"
          distance={60}
          delay={80}
          className=" hidden md:block pointer-events-none select-none
      absolute right-[-2rem] bottom-[-4rem] z-0"
        >
          <img
            src={peacock}
            alt=""
            aria-hidden
            className="
      w-[400px] drop-shadow-xl rotate-[-20deg]
    "
          />{" "}
        </Reveal>

        <Reveal
          from="left"
          distance={60}
          delay={160}
          className=" hidden md:block pointer-events-none select-none
      absolute left-[-2rem] top-[-24rem] z-0"
        >
          <img
            src={gourd}
            alt=""
            aria-hidden
            className="
      w-[400px]
      opacity-95 drop-shadow-xl rotate-[-6deg]
    "
          />
        </Reveal>
        <h1 className="contacttexth">Core Values</h1>

        <div className="flex justify-center mt-7">
          <Reveal delay={0} className="mx-5">
            <div
              className="core-card relative text-white w-[37rem] core-card1 min-h-[15.5rem] rounded-2xl shadow-2xl bg-[#704e43]"
              style={{
                background: `#704e43 url(${rangoli}) no-repeat right 20px top 20px`,
                backgroundSize: "4rem",
                backgroundBlendMode: "soft-light",
              }}
            >

              <div className="flex pt-5 ml-5">
                <div className={boxStyle1}>
                  <Users className={iconStyle} />
                </div>
                <h1 className="crimson ml-3 text-3xl max-w-[20rem] text-left">
                  Building a Strong Community
                </h1>
              </div>
              <p className="text-left ml-6 mt-1 mr-6">
                Guided by a spirit of unity and mutual respect, we strive to
                create a welcoming space where every voice is valued. Our
                approach is rooted in collaboration, inclusivity, and trust,
                ensuring that members feel connected, supported, and empowered
                to contribute.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="mx-5">
            <div
              className="core-card relative text-white w-[37rem] core-card1 min-h-[15.5rem] rounded-2xl shadow-2xl bg-[#704e43]"
              style={{
                background: `#704e43 url(${diya}) no-repeat right 20px top 20px`,
                backgroundSize: "4rem",
                backgroundBlendMode: "soft-light",
              }}
            >

              <div className="flex pt-5 ml-5">
                <div className={boxStyle1}>
                  <Globe className={iconStyle} />
                </div>
                <h1 className="crimson ml-3 text-3xl max-w-[20rem] text-left">
                  Preserving our cultural tradition
                </h1>
              </div>
              <p className="text-left ml-6 mt-1 mr-6">
                We are committed to keeping the rich heritage of Gujarat alive
                for future generations. Through festivals, music, dance,
                language, and community gatherings, we honor the traditions
                passed down to us while creating opportunities for younger
                members to experience and embrace them.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex justify-center mt-7">
          <Reveal delay={200} className="mx-5 ">
            <div
              className="core-card relative text-white w-[37rem] core-card1 min-h-[15.5rem] rounded-2xl shadow-2xl bg-[#704e43]"
              style={{
                background: `#704e43 url(${dandiya}) no-repeat right 20px top 20px`,
                backgroundSize: "4.3rem",
                backgroundBlendMode: "soft-light",
              }}
            >

              <div className="flex pt-5 ml-5">
                <div className={boxStyle1}>
                  <Salad className={iconStyle} />
                </div>
                <h1 className="crimson ml-3 text-3xl max-w-[15rem] text-left">
                  Helping Those In Need
                </h1>
              </div>
              <p className="text-left ml-6 mt-1 mr-6">
                We believe in the power of collective generosity to create
                meaningful change. From supporting local charities to organizing
                large-scale drives, CVGCA channels community spirit into action.
                In 2022 alone, we helped rally donations equivalent to 12,000
                lbs of canned food for three local food banks.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300} className="mx-5">
            <div
              className="core-card relative text-white w-[37rem] core-card1 min-h-[15.5rem] rounded-2xl shadow-2xl "
              style={{
                background: `#704e43 url(${elephant}) no-repeat right 20px top 20px`,
                backgroundSize: "4.3rem",
                backgroundBlendMode: "soft-light",
              }}
            >

              <div className="flex pt-5 ml-5">
                <div className={boxStyle1}>
                  <GraduationCap className={iconStyle} />
                </div>
                <h1 className="crimson ml-3 text-3xl max-w-[20rem] text-left">
                  Guiding the Younger Generation
                </h1>
              </div>
              <p className="text-left ml-6 mt-1 mr-6">
                We are dedicated to inspiring and empowering youth through
                education and mentorship. From hosting educational camps on
                cutting-edge fields like AI and medicine to creating hands-on
                learning experiences, CVGCA opens doors for younger students to
                explore their passions and broaden their horizons.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Homepage;

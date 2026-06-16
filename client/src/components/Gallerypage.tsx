import React from "react";

import img from "../assets/Camera.png"
import {
  galleryEvents as galleryEventsData,
  galleryImages as galleryImagesData,
} from "../data/content";

type GalleryEvent = {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  cover?: string;
  images: string[];
  createdAt?: string;
  driveUrl?: string;
};

function normalizeDateString(s?: string) {
  if (!s) return NaN;
  const normalized = s.includes("T") ? s : s.replace(" ", "T");
  const t = Date.parse(normalized);
  return Number.isNaN(t) ? Date.parse(s) : t;
}

function prettyDate(s?: string) {
  if (!s) return "";
  const d = new Date(s.includes("T") ? s : s.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function GridLightbox({
  open,
  onClose,
  title,
  images,
  driveUrl,
  startIndex = 0,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  images: string[];
  driveUrl?: string;
  startIndex?: number;
}) {
  const [idx, setIdx] = React.useState(startIndex);

  React.useEffect(() => {
    if (open) setIdx(startIndex);
  }, [open, startIndex]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] rounded-2xl overflow-hidden bg-white shadow-2xl grid grid-rows-[auto_1fr]">

        <div className="flex items-center justify-between px-6 py-3 bg-white">
          <h2 className="text-lg crimson md:text-[2rem] font-semibold text-[#0f1f3a]">
            Gallery View
          </h2>
          <button
            onClick={onClose}
            className="rounded-full  text-black px-3 py-1 hover:bg-gray-400/80"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          <div className="flex-1 bg-transparent flex items-center justify-center">

            <div className="w-[92%] md:w-[86%] lg:w-[90%] max-w-4xl aspect-[4/3.3] bg-black rounded-2xl shadow-xl flex items-center justify-center">
              <img
                src={images[idx]}
                alt={title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <aside className="relative w-[300px] md:w-[360px] shrink-0 bg-white h-full p-4">

            <div className="h-full overflow-y-auto pr-1 pb-14 mt-4">
              <div className="grid grid-cols-2 gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg transition"
                  >
                    <img
                      src={src}
                      alt={`thumb ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            </div>

            <a
              href={driveUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-4 right-[-13rem] bottom-4 inline-flex items-center justify-center rounded-xl italic text-gray-500 px-4 py-2 text-sm hover:opacity-95"
            >
              See more →
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}

function RecentSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = React.useState(0);
  const count = images.length;

  React.useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % count), 3500);
    return () => clearInterval(id);
  }, [count]);

  const go = (delta: number) => setIdx((i) => (i + delta + count) % count);

  return (
    <div className="relative select-none">

      <div className="relative mx-auto w-full md:w-[88%] aspect-[16/9] overflow-hidden rounded-3xl">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === idx ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
            draggable={false}
          />
        ))}

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute z-20 left-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/35 hover:bg-black/50 text-white"
              aria-label="Prev"
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
              className="absolute z-20 right-3 top-1/2 -translate-y-1/2 rounded-full p-2 bg-black/35 hover:bg-black/50 text-white"
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
        <div className="relative mt-5">
          <div className="mx-auto max-w-[45rem]">
            <div
              className="overflow-x-auto hide-scrollbar"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0, black 32px, black calc(100% - 32px), transparent 100%)",
              }}
            >
              <div className="flex gap-3 justify-center px-2 w-max mx-auto">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`relative w-28 md:w-36 aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-black/10 transition ${i === idx
                        ? "outline outline-2 outline-amber-400"
                        : "opacity-80 hover:opacity-100"
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`thumb ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        transition: "opacity 400ms ease",
                        opacity: i === idx ? 1 : 0.85,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
        </div>
      )}

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}

function useGalleryData() {
  const byTitle = new Map<string, string[]>();
  for (const row of galleryImagesData) {
    const key = (row.event || "").trim();
    if (!key) continue;
    const list = byTitle.get(key) ?? [];
    list.push(row.images);
    byTitle.set(key, list);
  }

  const merged: GalleryEvent[] = galleryEventsData.map((e) => {
    const titleKey = (e.title || "").trim();
    const hidden = byTitle.get(titleKey) ?? [];
    return {
      id: e.id,
      title: e.title,
      date: e.date,
      cover: e.image,
      images: [e.image, ...hidden],
      driveUrl: e.drivelink,
      createdAt: e.createdAt,
    };
  });

  merged.sort((a, b) => {
    const at = normalizeDateString(a.date ?? a.createdAt);
    const bt = normalizeDateString(b.date ?? b.createdAt);
    return (bt || 0) - (at || 0);
  });

  return { events: merged, loading: false };
}

const Gallerypage = () => {
  const { events, loading } = useGalleryData();
  const recent = events[0];
  const older = events.slice(1);
  const [lbOpen, setLbOpen] = React.useState(false);
  const [lbTitle, setLbTitle] = React.useState<string | undefined>();
  const [lbImages, setLbImages] = React.useState<string[]>([]);
  const [lbStart, setLbStart] = React.useState(0);
  const [lbDrive, setLbDrive] = React.useState<string | undefined>(undefined);

  const openLightbox = (
    title: string,
    images: string[],
    startIndex = 0,
    driveUrl?: string
  ) => {
    setLbTitle(title);
    setLbImages(images);
    setLbStart(startIndex);
    setLbDrive(driveUrl);
    setLbOpen(true);
  };
  React.useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (lbOpen) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
      html.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [lbOpen]);

  return (
    <>
      <section className="relative overflow-hidden pt-10">

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(66,179,245,.35) 0%, rgba(66,179,245,.55) 30%, rgba(51,119,255,.7) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px)",
            backgroundSize: "24px 24px, 30px 30px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h1 className="yeseva text-[2.4rem] md:text-6xl font-extrabold tracking-wide text-[#0f1f3a] drop-shadow-sm">
            Event Gallery
          </h1>
          <p className="mt-2 text-[#0f1f3a]/80 max-w-2xl">
            Relive our favorite moments—from vibrant festivals to community
            service days.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)",
          }}
        />
      </section>

      <section className="py-10 bg-white">
        <img
          src={img}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[6rem] top-[1rem] w-[340px]
      opacity-95 drop-shadow-xl rotate-[5deg] z-10
    "
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <div className="text-sm uppercase tracking-wide text-amber-600/80 font-semibold">
                Most Recent
              </div>
              <h2 className="fancy text-3xl md:text-4xl">
                {recent?.title || "—"}
              </h2>
              <div className="text-[#22324b] crimson">
                {recent ? prettyDate(recent.date) : ""}
              </div>
            </div>
          </div>
          {loading ? (
            <div className="h-[26rem] md:h-[34rem] rounded-3xl bg-gray-100 animate-pulse" />
          ) : !recent ? (
            <div className="rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
              No events yet. Check back soon!
            </div>
          ) : (
            <RecentSlider images={recent.images || []} />
          )}
        </div>
      </section>

      <section className="py-14" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="contacttexth">Past Events</h2>
          </div>
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[24rem] rounded-3xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {older.map((ev) => (
                <article key={ev.id} className="group">
                  <button
                    onClick={() =>
                      openLightbox(ev.title, ev.images, 0, ev.driveUrl)
                    }
                    className="event-card block w-full text-left rounded-3xl overflow-hidden shadow-md bg-white transition"
                  >
                    <div className="relative aspect-[3/4]">
                      <img
                        src={ev.cover || ev.images?.[0]}
                        alt={ev.title}
                        className="w-full h-full object-cover rounded-3xl"
                      />
                      <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-white/90 shadow">
                        {prettyDate(ev.date)}
                      </span>
                    </div>
                  </button>
                  <h3 className="mt-3 text-lg font-semibold">{ev.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {ev.description ||
                      "Click to explore photos from this event."}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <GridLightbox
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        title={lbTitle}
        images={lbImages}
        startIndex={lbStart}
        driveUrl={lbDrive}
      />

      <style>{`
  /* Gold glow + slight scale on hover (mirrors Homepage core-card) */
  .event-card {
    transition: transform .5s ease, box-shadow .35s ease, outline-color .3s ease;
    outline: 0 solid transparent;
  }
  .event-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(255,196,102,0.8), 0 0 50px rgba(255,196,102,0.45);
    outline: 2px solid rgba(255,196,102,0.9);
  }
`}</style>
    </>
  );
};

export default Gallerypage;

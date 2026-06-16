import React from "react";
import e1 from "../assets/Core1.png";
import e2 from "../assets/20241005_195142.jpg";
import e3 from "../assets/Core1.png";
import e4 from "../assets/20241005_172232.jpg";
import e5 from "../assets/Core3.png";
import e6 from "../assets/Core2.png";
import e8 from "../assets/Cloud 3.png";
import e9 from "../assets/Cloud.png";
import e10 from "../assets/Cloud 2.png";
import e15 from "../assets/Cloud4.png";
import schoolhero from "../assets/Schoolhero.png";
import MHlogo from "../assets/MHlogo.png";
import { photostack } from "../data/content";

function PhotoStack({
  images,
  side = "left",
  intervalMs = 3500,
}: {
  images: string[];
  side?: "left" | "right";
  intervalMs?: number;
}) {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const order = [idx, (idx + images.length - 1) % images.length, (idx + images.length - 2) % images.length];
  const rotations = side === "left" ? [-6, 4, -2] : [6, -4, 2];
  const slideX = side === "left" ? -40 : 40;

  return (
    <div
      className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-4 md:left-24" : "right-4 md:right-24"
        } z-10`}
      aria-hidden
    >
      <div className="relative w-[160px] h-[220px] md:w-[400px] md:h-[260px] pointer-events-none">
        {order.map((i, layer) => {
          const isTop = layer === 0;
          const isMid = layer === 1;

          return (
            <div
              key={`${i}-${idx}-${layer}`}
              className={[
                "absolute inset-0 m-auto w-[160px] h-[200px] md:w-[300px] md:h-[320px]",
                isTop ? "ps-enter" : "",
                isMid ? "ps-nudge" : "",
              ].join(" ")}
              style={
                {
                  zIndex: 10 - layer,

                  "--ps-slide-x": `${slideX}px`,
                } as React.CSSProperties
              }
            >

              <img
                src={images[i]}
                alt=""
                className="w-full h-full object-cover rounded-sm shadow-xl"
                style={{
                  transform: `rotate(${rotations[layer]}deg) translateY(${layer * 6}px)`,
                  opacity: layer === 0 ? 1 : 0.9 - layer * 0.25,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  border: "8px solid white",
                  borderBottomWidth: 16,
                  background: "white",
                }}
              />
            </div>
          );
        })}
      </div>

      <style>{`
        .ps-enter { animation: psSlideIn 800ms cubic-bezier(.2,.7,.2,1) both; }
        @keyframes psSlideIn {
          0%   { transform: translateX(var(--ps-slide-x)) translateY(8px) scale(.96); opacity: 0; }
          60%  { transform: translateX(0) translateY(-2px) scale(1.02); opacity: 1; }
          100% { transform: translateX(0) translateY(0) scale(1); opacity: 1; }
        }

        .ps-nudge { animation: psNudge 800ms ease both; }
        @keyframes psNudge {
          0%   { transform: translateY(8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const HeroParticles = () => {
  const psImages = photostack.map((r) => r.image).filter(Boolean);
  const psLoaded = true;

  return (
    <>
      <section className="relative w-full min-h-screen overflow-visible bg-cover bg-center">
        <img
          src={e15}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[-1rem] top-[1rem] w-[500px]
      opacity-95 drop-shadow-xl rotate-[-3deg] z-10
    "
        />
        <img
          src={e8}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[0rem] top-[0rem] w-[600px]
      opacity-95 drop-shadow-xl rotate-[-3deg] z-10
    "
        />
        <img
          src={e10}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[33rem] top-[3rem] w-[500px]
      opacity-95 drop-shadow-xl rotate-[5deg] z-10
    "
        />
        <img
          src={e8}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[36rem] top-[-1rem] w-[650px]
      opacity-95 drop-shadow-xl rotate-[20deg] z-10
    "
        />
        <img
          src={e9}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute left-[1rem] top-[1rem] w-[400px]
      opacity-95 drop-shadow-xl rotate-[-3deg] z-10
    "
        />
        <img
          src={e9}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute left-[1rem] top-[0rem] w-[500px]
      opacity-95 drop-shadow-xl rotate-[-3deg] z-10
    "
        />

        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(66, 179, 245,0.35) 0%, rgba(66, 179, 245,0.55) 30%, rgba(51, 119, 255,0.7) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none -z-10"

          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.06) 0 1px, transparent 1.5px)",
            backgroundSize: "24px 24px, 30px 30px",
          }}
        />

        <div className="absolute -left-16 -top-16 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none z-0"
          style={{ background: "#3377ff", mixBlendMode: "multiply" }} />
        <div className="absolute right-[-60px] bottom-[-60px] w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none z-0"
          style={{ background: "#3377ff", mixBlendMode: "multiply" }} />

        <div className="relative w-full h-[100vh] md:h-[100vh] flex items-center justify-center z-20">

          {(psLoaded && psImages.length >= 3)
            ? <PhotoStack side="left" images={psImages} />
            : <PhotoStack side="left" images={[e1, e2, e3, e4]} />}

          <div className="flex flex-col items-center text-center mx-8">

           <div className="relative inline-block">

            <h1
              className="yeseva  text-7xl md:text-9xl font-extrabold tracking-[0.2em] text-[#FFB52E  ] select-none"
              style={{

                filter: "drop-shadow(0 4px 18px rgba(131, 76, 37,0.25))",
              }}
            >
              CVGCA

            </h1>

            <h1
              className="yeseva absolute hero-title-stroke  inset-0 translate-y-[.3rem] translate-x-[5px] text-7xl md:text-9xl font-extrabold tracking-[0.2em] text-[#FFB52E   ] opacity-35"
              aria-hidden
              style={{ filter: "blur(0.6px)" }}
            >
              CVGCA
            </h1>
            <h1
              className="yeseva absolute hero-title-stroke  inset-0 translate-y-[.6rem] translate-x-[10px] text-7xl md:text-9xl font-extrabold tracking-[0.2em] text-[#FFB52E   ] opacity-35"
              aria-hidden
              style={{ filter: "blur(0.6px)" }}
            >
              CVGCA
            </h1>
          </div>

          <p className="mt-4 text-base md:text-xl font-medium text-[#22324b]/90 italic">
            Central Valley Gujarati Community Association
          </p>

          <div className="mt-2 flex justify-center" aria-hidden>
            <svg width="220" height="14" viewBox="0 0 220 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7h216" stroke="#306bff" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
              <path d="M20 7c12-8 24-8 36 0 12 8 24 8 36 0 12-8 24-8 36 0 12 8 24 8 36 0 12-8 24-8 36 0"
                stroke="#F7A531" strokeWidth="2" fill="none" opacity="0.8" />
            </svg>

          </div>
          <a
          href="#learn-more-target"
          className="
   hidden md:block pointer-events-auto select-none
    absolute left-1/2
    -translate-x-1/2
    -translate-y-40
    bottom-[4rem]
    z-10 rounded-xl text-2xl
    bg-transparent text-black
    transition transform hover:scale-105 active:scale-95 crimson animate-bob z-200
  "
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 absolute left-1/2 -translate-x-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}

          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
          </div>

          {(psLoaded && psImages.length >= 3)
            ? <PhotoStack side="right" images={[...psImages].reverse()} />
            : <PhotoStack side="right" images={[e5, e6, e1, e2]} />}
        </div>

       <img
          src={MHlogo}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[10rem] top-[47rem] w-[400px]
      opacity-95 drop-shadow-xl rotate-[7deg] z-100
    "
        />
        <div className="relative w-full -mt-70 z-10">
          <img
            src={schoolhero}
            alt="Mountain House High School"
            className="block w-full object-cover object-bottom select-none pointer-events-none"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%)",
            }}
          />
        </div>

      </section>

      <style>{`
        .orbit {
          position: absolute;
          width: 0;
          height: 0;
          animation: spin var(--dur) linear infinite;
          animation-delay: var(--delay, 0s);
          will-change: transform;
        }
        .particle {
          position: absolute;
          top: 0; left: 0;
          width: 6px; height: 6px; border-radius: 9999px;
          background: rgba(106, 13, 173, 0.9);
          box-shadow: 0 0 10px rgba(106, 13, 173, 1);
          transform: rotate(var(--angle)) translateX(var(--radius));
          animation: fade 3.2s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fade {
          0%, 100% { opacity: 0.85; transform: rotate(var(--angle)) translateX(var(--radius)) scale(1); }
          50% { opacity: 1; transform: rotate(var(--angle)) translateX(calc(var(--radius) + 2px)) scale(1.05); }
        }
          @keyframes bob {
  0%, 100% {
    transform: translate(0%, 0);
  }
  50% {
    transform: translate(0%, -6px);
  }
}

.animate-bob {
  animation: bob 1.5s ease-in-out infinite;
}
      `}</style>
    </>
  );
};

export default HeroParticles;

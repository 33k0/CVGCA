import React, { useState } from "react";
import e1 from "../assets/Thankyou.png";
import { sponsors as sponsorData } from "../data/content";

type SponsorRow = {
  id?: number | string;
  images: string | string[];
  link: string;
};

type NormalizedSponsor = { logo: string; link: string };

function normalizeSponsors(rows: SponsorRow[] | unknown): NormalizedSponsor[] {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((r) => {
      const logo = Array.isArray(r.images) ? r.images[0] : r.images;
      return { logo, link: r.link } as NormalizedSponsor;
    })
    .filter((s) => !!s.logo);
}

const SponsorsPage: React.FC = () => {
  const [sponsors] = useState<NormalizedSponsor[]>(
    normalizeSponsors(sponsorData)
  );
  const loading = false;
  const error: string | null = null;

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
            Our Sponsors
          </h1>
          <p className="mt-2 text-[#0f1f3a]/80 max-w-3xl">
            We are deeply grateful to the partners who power our cultural events
            and community programs. Your generosity keeps the spirit of CVGCA
            vibrant and growing.
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

      <section className="bg-white py-12 px-6">
        <img
          src={e1}
          alt=""
          aria-hidden
          className="
      hidden md:block pointer-events-none select-none
      absolute right-[5rem] top-[3rem] w-[360px]
      opacity-100 drop-shadow-xl rotate-[20deg] z-0
    "
        />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline gap-3 mb-8">
            <h2 className="fancy text-3xl md:text-4xl">Sponsored</h2>
            <span className="fancy text-3xl md:text-4xl" style={{ color: "#42b3f5" }}>
              by
            </span>
          </div>

          {loading && (
            <p className="crimson text-lg">Loading sponsors…</p>
          )}
          {!loading && error && (
            <p className="crimson text-lg text-red-600">{error}</p>
          )}
          {!loading && !error && sponsors.length === 0 && (
            <p className="crimson text-lg">No sponsors yet.</p>
          )}

          <ul
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            aria-label="Sponsors"
          >
            {sponsors.map((s, i) => (
              <li key={`${s.link}-${i}`} className="group">
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl p-4 bg-white shadow transition duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                  aria-label={`Visit sponsor ${i + 1}`}
                >
                  <div className="aspect-[3/2] w-full overflow-hidden rounded-xl flex items-center justify-center">
                    <img
                      src={s.logo}
                      alt="Sponsor logo"
                      className="max-h-20 w-auto object-contain grayscale group-hover:grayscale-0 transition duration-300"
                      loading="lazy"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-100 via-white to-blue-100 p-[1px]">
            <div className="rounded-[calc(1.5rem-1px)] bg-white p-6 md:p-10">
              <p className="crimson text-lg md:text-xl text-[#22324b] max-w-4xl">
                Every contribution fuels youth mentorship, cultural festivals,
                and charitable drives across the Central Valley and Bay Area.
                Thank you for making a tangible impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e8e3d3] py-16 px-6">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="fancy text-2xl md:text-3xl mb-3">Ways We Recognize Our Sponsors</h3>
            <ul className="space-y-3 text-[#58452e]">
              <li>• Logo placement on our website and event materials</li>
              <li>• On-stage acknowledgements and booth space at flagship events</li>
              <li>• Social media spotlights and newsletter mentions</li>
              <li>• Custom collaborations for youth programs and cultural showcases</li>
            </ul>
          </div>

          <div className="self-start">
            <div className="rounded-2xl p-6 shadow bg-white">
              <h4 className="fancy text-xl mb-2">Become a Sponsor</h4>
              <p className="text-sm text-[#444] mb-4">
                Interested in partnering with CVGCA? Contact us directly at <strong>925-699-9627</strong> to discuss sponsorship opportunities.
              </p>
              <a
                href="tel:9256999627"
                 className="relative inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-[linear-gradient(90deg,#3b82f6,#2563eb,#1e40af)] bg-[length:200%_100%] animate-[pulse_3s_ease-in-out_infinite] shadow-[0_10px_20px_rgba(245,158,11,.25)] focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                Call 925-699-9627
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SponsorsPage;

import React from "react";

const Icon = {
  X: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18.9 3H22l-9.6 11.1L21.6 21H15l-6-6.9L3.5 21H2l8.4-9.7L2.4 3H9l5.4 6.2L18.9 3z"/>
    </svg>
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11.25 2.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"/>
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3H13.5V8.6c0-.9.2-1.5 1.6-1.5h1.5V4.4c-.7-.1-1.5-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.7v8h2.8z"/>
    </svg>
  ),
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative  bg-white text-[#0f1f3a]">

      <div className="h-[1px] w-full bg-[linear-gradient(90deg,#3b82f6,#60a5fa,#fbbf24,#3b82f6)] bg-[length:300%_100%] animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="absolute inset-0 pointer-events-none opacity-5"
           style={{ backgroundImage: "radial-gradient(circle at 15% 20%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 80% 70%, #f59e0b 2px, transparent 2px)", backgroundSize: "24px 24px, 30px 30px" }} />

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <div className="flex items-center gap-3 mb-3">

              <span className="yeseva text-2xl font-bold">CVGCA</span>
            </div>
            <p className="text-sm leading-relaxed text-[#0f1f3a]/80">
              Celebrating Gujarati and Indian traditions across the Central Valley and Bay Area.
              We host cultural festivals, youth programs, and service initiatives—powered by our community and sponsors.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:underline" href="/events">Events</a></li>
              <li><a className="hover:underline" href="/sponsors">Sponsors</a></li>
              <li><a className="hover:underline" href="/gallery">Gallery</a></li>
              <li><a className="hover:underline" href="/volunteer">Volunteer</a></li>
              <li><a className="hover:underline" href="/donate">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@cvgca.org" className="hover:underline">contact@cvgca.org</a>
              </li>
              <li>
                <a href="tel:19256999627" className="hover:underline">(925) 699‑9627</a>
              </li>
              <li>
                <span>Central Valley, California</span>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-3" aria-label="Social links">
              <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-[#0f1f3a]/5 hover:bg-[#0f1f3a]/10 transition">
                <Icon.Facebook className="h-4 w-4" />
              </a>

            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">Stay Updated</h4>
            <p className="text-sm text-[#0f1f3a]/80 mb-3">Get event announcements and updates.</p>
            <form className="flex flex-col sm:flex-row gap-2" action="#" method="post" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200"
                required
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2 font-semibold text-white bg-[linear-gradient(90deg,#3b82f6,#2563eb,#1e40af)] bg-[length:200%_100%] hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-[#0f1f3a]/60">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200" />

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#0f1f3a]/70">
          <div className="flex items-center gap-3">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <span aria-hidden>•</span>
            <a href="/terms" className="hover:underline">Terms</a>
            <span aria-hidden>•</span>
            <a href="/accessibility" className="hover:underline">Accessibility</a>
          </div>
          <div>© {year} Central Valley Gujarati Community Association (CVGCA). All rights reserved.</div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group fixed bottom-6 right-6 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Back to top"
      >
        <span className="block rounded-full p-3 bg-white border border-gray-200 group-hover:shadow">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12 5l7 7-1.4 1.4L13 9.8V20h-2V9.8L6.4 13.4 5 12l7-7z"/></svg>
        </span>
      </button>
    </footer>
  );
};

export default Footer;

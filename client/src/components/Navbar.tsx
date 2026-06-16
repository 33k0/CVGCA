import React from "react";
import popimg3 from "../assets/News.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [atTop, setAtTop] = React.useState(true);
  const [hidden, setHidden] = React.useState(false);
  const lastYRef = React.useRef(0);
  const tickingRef = React.useRef(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          setAtTop(y <= 8);

          const prev = lastYRef.current;
          if (y > prev + 6) setHidden(true);
          else if (y < prev - 6) setHidden(false);

          lastYRef.current = y;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 w-full z-50 text-xl transition-all duration-300",
          hidden ? "-translate-y-full" : "translate-y-0",
          atTop
            ? "bg-transparent text-black"
            : "bg-white/90 backdrop-blur-md text-black shadow-sm",
        ].join(" ")}
      >
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-15">
          <div className="">

            <div className="mt-2 flex justify-center h-19 items-center">
              <div className="mt navfont hidden md:flex fancy text-black underline-offset-6 space-x-6">
                <Link
                  to="/"
                  className="px-1.5 link-underline decoration-3 hover:  slide-in"
                >
                  Home
                </Link>

                <div className="group relative">
                  <Link
                    to="/volunteering"
                    className="px-1.5 link-underline decoration-3 hover:  slide-in"
                  >
                    Get Involved
                  </Link>

                </div>

                <Link
                  to="/sponsors"
                  className="px-1.5 link-underline decoration-3 hover:  slide-in"
                >
                  Sponsors
                </Link>

                <div className="group relative">
                  <Link
                    to="/events"
                    className="cursor-pointer px-1.5 link-underline decoration-3 hover:  slide-in"
                  >
                    Events
                  </Link>
                </div>

                <div className="group relative">
                  <a
                    href="#"
                    className="px-1.5 link-underline decoration-3 hover:slide-in"
                  >
                    Media
                  </a>
                  <div className="dropdown-panel absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition duration-600 ease-in-out transform -translate-y-2 group-hover:translate-y-0 bg-white border border-gray-200 rounded-2xl shadow-lg mt-8 -left-130 w-[50rem] h-[20rem] z-50">
                    <div className="flex">
                      <div className="ml-3 pl-2 pt-3 mt-3 menutext">
                        <p className="ml-2 pb-3 text-lg ">Media</p>

                        <div className="mb-20 poplim">
                          <Link to="/blog">
                          <h1 className="cursor-pointer mb-2  py-1  rounded-sm ">
                            <Link
                              to="/blog"
                              className="ml-2 text-xl underline-grow"
                            >
                              Our Blog
                            </Link>
                            <p className="ml-2.5 mt-[.2rem] w-[24rem] text-sm">Visit here to find out everything you need to know about CVGCA. How our old events went, what other people think of us, recent news, and so much more!</p>
                          </h1>
                          </Link>
                          <Link to="/gallery">
                          <h1 className="cursor-pointer mb-2  py-1 rounded-sm">
                            <Link
                              to="/gallery"
                              className="ml-2 text-xl underline-grow"
                            >
                              Gallery
                            </Link>
                            <p className="ml-2.5 mt-[.2rem] w-[24rem] text-sm">Here you can come checkout and see what our events look like. You can see beautiful pictures that capture what we stand for.</p>
                          </h1>
                          </Link>
                        </div>
                      </div>
                      <div className="">
                        <img
                          src={popimg3}
                          width="295"
                          className="rounded-md mt-3 mb-3 ml-38 opacity-0 translate-y-6 transition duration-800 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="px-1.5 link-underline decoration-3 hover:  slide-in"
                >
                  Contact
                </Link>
              </div>

            </div>

            <div className="md:hidden">
              <button id="menu-toggle" className="text-gray-700 focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div id="mobile-menu" className="md:hidden hidden px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-600 hover:text-black">
            Home
          </a>
          <a href="#" className="block text-gray-600 hover:text-black">
            About
          </a>
          <a href="#" className="block text-gray-600 hover:text-black">
            Contact
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/Camera.png";
import { blogs } from "../data/content";

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  content: any;
  minidescription: string;
  topics?: string | string[];
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const Blogpage: React.FC = () => {
  const posts = blogs as BlogPost[];
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
            CVGCA Blog
          </h1>
          <p className="mt-2 text-[#0f1f3a]/80 max-w-2xl">
            See What Others are Saying About Us
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

      <div className="bg-white min-h-screen py-12 px-6">
        <img
          src={img}
          alt=""
          aria-hidden
          className="hidden md:block pointer-events-none select-none absolute right-[6rem] top-[1rem] w-[340px] opacity-95 drop-shadow-xl rotate-[5deg] z-10"
        />

        <div className="max-w-[80rem] mx-auto">
          {loading ? (
            <div className="text-center text-gray-500">Loading blogs…</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500">No blog posts yet. Check back soon!</div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((article) => {
                const tags =
                  Array.isArray(article.topics)
                    ? article.topics
                    : (article.topics || "")
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean);

                return (
                  <Link
                    to={`/blog/${article.id}`}
                    key={article.id}
                    className="bg-white rounded-[.8rem] shadow-lg overflow-hidden transition duration-300 hover:shadow-xl"
                  >
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-white"></div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        by <span className="font-medium text-gray-700">{article.author}</span> · {article.date}
                      </p>
                      <h2 className="text-[2rem] font-semibold text-gray-900 mb-2 leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 text-[1rem] mb-4">{article.minidescription}</p>
                      <div className="w-3/4 h-[1px] bg-gray-300 mb-4"></div>
                      {tags.length > 0 && (
                        <span className="text-sm text-gray-400">
                          {tags.join(", ")}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogpage;

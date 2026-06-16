import React from "react";
import { useParams, Link } from "react-router-dom";
import { renderTipTapDoc } from "../components/rendertiptap";
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

const BlogDetail: React.FC = () => {
    const { id } = useParams();
    const post = (blogs as BlogPost[]).find((b) => String(b.id) === String(id)) ?? null;

    if (!post) return <div className="min-h-[50vh] flex items-center justify-center text-gray-500">Not found.</div>;

    const tags =
        Array.isArray(post.topics)
            ? post.topics
            : (post.topics || "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);

    return (
        <>
            <section className="relative overflow-hidden pt-1">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(66,179,245,.35) 0%, rgba(66,179,245,.55) 30%, rgba(51,119,255,.7) 100%)",
                        mixBlendMode: "multiply",
                    }}
                />
                <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-10">
                    <Link to="/blog" className="text-xl text-[#0f1f3a]/80 underline">← Back to Blog</Link>
                </div>
                <div
                    className="absolute bottom-0 left-0 w-full h-10 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)",
                    }}
                />
            </section>

            <article className="bg-white">
                <div className="max-w-4xl mx-auto px-6 py-10">
                     <h1 className="yeseva text-4xl md:text-6xl font-extrabold tracking-wide text-[#0f1f3a] drop-shadow-sm my-3">
                        {post.title}
                    </h1>
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-72 object-cover rounded-xl mb-8 shadow"
                        />
                    )}
                     <p className="-mt-3 text-[#0f1f3a]/80">
                        by <span className="font-medium">{post.author}</span> · {post.date}
                    </p>
                    {tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {tags.map((t) => (
                                <span key={t} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-6">
  {renderTipTapDoc(post.content)}
</div>

                </div>
            </article>
        </>
    );
};

export default BlogDetail;

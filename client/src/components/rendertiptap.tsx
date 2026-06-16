import React from "react";

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

function Heading({
  level,
  className,
  children,
}: {
  level: number;
  className?: string;
  children: React.ReactNode;
}) {
  const lvl = clamp(level ?? 2, 1, 6);
  switch (lvl) {
    case 1: return <h1 className={className}>{children}</h1>;
    case 2: return <h2 className={className}>{children}</h2>;
    case 3: return <h3 className={className}>{children}</h3>;
    case 4: return <h4 className={className}>{children}</h4>;
    case 5: return <h5 className={className}>{children}</h5>;
    default: return <h6 className={className}>{children}</h6>;
  }
}

function tiptapChildren(node: any): React.ReactNode {
  if (!node) return null;
  if (node.type === "text") return node.text || "";
  if (node.type === "hardBreak") return <br />;
  if (Array.isArray(node.content)) {
    return node.content.map((c: any, i: number) => <React.Fragment key={i}>{tiptapChildren(c)}</React.Fragment>);
  }
  return null;
}

export function renderTipTapDoc(raw: unknown) {
  const doc = typeof raw === "string" ? (() => { try { return JSON.parse(raw); } catch { return null; } })() : raw;
  if (!doc || doc?.type !== "doc" || !Array.isArray(doc.content)) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {doc.content.map((node: any, i: number) => {
        if (node.type === "heading") {
          const lvl = clamp(node.attrs?.level ?? 2, 1, 6);
          const cls =
            [
              "mt-6 font-extrabold tracking-tight text-[#0f1f3a]",
              lvl === 1 ? "text-4xl md:text-5xl" :
              lvl === 2 ? "text-3xl md:text-4xl" :
              lvl === 3 ? "text-2xl md:text-3xl" :
              lvl === 4 ? "text-xl md:text-2xl" :
              lvl === 5 ? "text-lg md:text-xl" : "text-base md:text-lg",
            ].join(" ");
          return (
            <Heading key={i} level={lvl} className={cls}>
              {tiptapChildren(node)}
            </Heading>
          );
        }

        if (node.type === "paragraph") {
          return <p key={i} className="mt-3 text-[1.05rem] leading-7 text-gray-700">{tiptapChildren(node)}</p>;
        }

        if (node.type === "bulletList") {
          return (
            <ul key={i} className="list-disc ml-6 mt-3 text-gray-700">
              {(node.content || []).map((li: any, k: number) => <li key={k}>{tiptapChildren(li)}</li>)}
            </ul>
          );
        }

        if (node.type === "orderedList") {
          return (
            <ol key={i} className="list-decimal ml-6 mt-3 text-gray-700">
              {(node.content || []).map((li: any, k: number) => <li key={k}>{tiptapChildren(li)}</li>)}
            </ol>
          );
        }

        if (Array.isArray(node.content)) {
          return <div key={i}>{node.content.map((c: any, k: number) => <React.Fragment key={k}>{tiptapChildren(c)}</React.Fragment>)}</div>;
        }
        return null;
      })}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div data-color-mode="auto" className="w-full">
      <MarkdownPreview
        source={content}
        className="!bg-transparent prose prose-lg dark:prose-invert max-w-none"
        style={{
          backgroundColor: "transparent",
        }}
        rehypeRewrite={(node, index, parent) => {
          // Allow iframes for video embeds
          if (
            node.type === "element" &&
            node.tagName === "a" &&
            parent &&
            parent.type === "element" &&
            /^h[1-6]/.test(parent.tagName)
          ) {
            parent.children = parent.children.slice(1);
          }
        }}
      />
    </div>
  );
}

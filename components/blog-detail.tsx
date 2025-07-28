"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { blogText } from "@/constants/blog-translations";
// import { MotionDiv } from "./ui/motion-client"; // Animation disabled
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { calculateReadTime } from "@/lib/utils";
import ReadingProgress from "./reading-progress";
import ShareButtons from "./share-buttons";
import BlogStructuredData from "./blog-structured-data";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const url = value.asset?.url;
      if (!url) return null;
      return (
        <div className="my-8">
          <Image
            src={url || "/placeholder.svg"}
            alt={value.alt || "Article image"}
            width={800}
            height={500}
            className="rounded-xl w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="leading-loose tracking-normal font-light text-lg mb-4 font-serif text-[#242424e2] break-words">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-gray-300 pl-6 my-8 font-light font-serif italic text-gray-600 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic font-extralight">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc font-serif text-lg list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li
        className="pl-2"
        style={{ textIndent: "-1.5em", paddingLeft: "1.5em" }}
      >
        <span className="align-top">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li
        className="pl-2"
        style={{ textIndent: "-1.5em", paddingLeft: "1.5em" }}
      >
        <span className="align-top">{children}</span>
      </li>
    ),
  },
};

interface Post {
  title: string;
  publishedAt: string;
  author: string;
  body: any[];
  excerpt?: string;
  readTime?: number;
  mainImage?: { asset: { url: string }; alt?: string };
  slug?: { current: string };
}

interface BlogDetailProps {
  post: Post;
  slug: string;
  language: string;
}

export default function PostDetailClient({
  post,
  slug,
  language: langProp,
}: BlogDetailProps) {
  const { language } = useLanguage();
  const currentLang = langProp || language;
  const t = blogText[currentLang as keyof typeof blogText] || blogText.en;

  // Calculate read time based on post content
  const calculatedReadTime = post.body
    ? calculateReadTime(post.body)
    : post.readTime || t.defaultReadTime;

  // Construct the full URL for sharing
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "https://www.thefndrs.com";
  const langPrefix = currentLang === "es" ? "" : `/${currentLang}`;
  const fullUrl = `${baseUrl}${langPrefix}/blog/${slug}`;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Animations disabled: use regular divs instead of MotionDiv
  return (
    <>
      {/* Structured Data for SEO */}
      <BlogStructuredData
        post={post}
        slug={slug}
        language={currentLang}
        baseUrl={baseUrl}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress target=".prose" />

      <div className="min-h-screen bg-white mt-32">
        <div className="container mx-auto px-4 pb-20 max-w-2xl">
          <header className="text-center mb-12">
            <div className="my-4">
              <Link
                href={`/${language}/blog`}
                className="flex items-center justify-start text-gray-900 hover:text-gray-700 transition-colors"
                aria-label={t.backLink}
              >
                <ArrowLeft className="hover:-translate-x-1 duration-300" />
              </Link>
            </div>
            <div>
              <span className="flex text-sm w-full text-left font-medium text-gray-500 uppercase tracking-wide">
                {t.articleLabel}
              </span>
            </div>

            <div>
              <h1 className="text-4xl font-semibold text-left text-gray-900 leading-[1.1] max-w-4xl mx-auto my-4">
                {post.title}
              </h1>
            </div>

            {post.excerpt && (
              <div>
                <p className="text-lg font-light text-gray-900/60 text-left mb-8 max-w-2xl leading-loose">
                  {post.excerpt}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 my-12 text-sm text-gray-900">
              {[
                { label: t.dateLabel, value: formatDate(post.publishedAt) },
                { label: t.authorLabel, value: post?.author },
                {
                  label: t.readLabel,
                  value: `${calculatedReadTime} ${t.readUnit}`,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 w-full sm:w-auto px-4 sm:px-10 border-gray-200 sm:border-r sm:last:border-r-0"
                >
                  <span className="uppercase tracking-wide text-xs">
                    {item.label}
                  </span>
                  <span className="font-light">{item.value}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="relative">
            {/* Share Buttons - Inline */}
            <ShareButtons
              url={fullUrl}
              title={post.title}
              description={post.excerpt || ""}
              position="inline"
            />

            <div className="prose prose-lg prose-gray max-w-none">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

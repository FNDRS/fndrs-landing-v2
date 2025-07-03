"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useLanguage } from "@/hooks/use-language";
import { blogText } from "@/constants/blog-translations";
import { MotionDiv } from "@/components/ui/motion-client";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: { asset: { url: string }; alt?: string };
  categories?: Array<{ title: string; slug: { current: string } }>;
  publishedAt: string;
  summary?: string;
  author: { name?: string; image?: any };
  readTime?: number;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const { language } = useLanguage();
  const t = blogText[language as keyof typeof blogText] || blogText.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex justify-between items-center mb-12"
          >
            <MotionDiv variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl text-gray-900">
                {t.sectionTitle}
              </h1>
            </MotionDiv>
          </MotionDiv>

          {/* Grid */}
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {posts.map((post) => {
              const img = post.mainImage?.asset.url;
              return (
                <MotionDiv key={post._id} variants={itemVariants}>
                  <Link
                    href={`/${language}/blog/${post.slug.current}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full border-2 border-slate-100/90">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-400 to-teal-400 overflow-hidden">
                        <Image
                          alt={post.mainImage?.alt || post.title}
                          fill
                          src={img || "/placeholder.svg"}
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4">
                          {post.categories?.length ? (
                            <div className="flex flex-wrap gap-2">
                              {post.categories.map((cat) => (
                                <span
                                  key={cat.slug.current || cat.title}
                                  className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-light uppercase text-gray-800"
                                >
                                  {cat.title}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-thin text-gray-800">
                              {t.uncategorized}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col justify-between h-72">
                        <div className="flex flex-col">
                          <h2 className="text-lg text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-3">
                            {post.title}
                          </h2>
                          <p className="text-gray-600 text-xs leading-loose line-clamp-3">
                            {post.summary || post.excerpt}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Image
                              width={24}
                              height={24}
                              className="rounded-full object-cover"
                              src={
                                post?.author?.image
                                  ? urlFor(post?.author?.image)
                                      .width(64)
                                      .height(64)
                                      .url()
                                  : "/avatar-placeholder.png"
                              }
                              alt={post?.author?.name || t.defaultAuthor}
                            />
                            <span>{post?.author?.name || t.defaultAuthor}</span>
                          </div>
                          <span>
                            {post.readTime || t.defaultReadTime} {t.readUnit}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import BlogDetail from "@/components/blog-detail";
import { Metadata } from "next";

export const revalidate = 60;

const query = groq`
  *[_type=='post' && slug.current == $slug][0]{
    title,
    publishedAt,
    "author": author->name,
    body,
    excerpt,
    "readTime": readTime,
    mainImage{ asset->{url}, alt },
    slug,
    summary
  }
`;

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await client.fetch(query, { slug });

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const baseUrl = "https://www.thefndrs.com";
  const langPrefix = lang === "es" ? "" : `/${lang}`;
  const postUrl = `${baseUrl}${langPrefix}/blog/${slug}`;

  const description = post.summary || post.excerpt || post.title;
  const imageUrl = post.mainImage?.asset?.url
    ? `${post.mainImage.asset.url}?w=1200&h=630&fit=crop&auto=format`
    : null;

  return {
    title: `${post.title} | FNDRS Blog`,
    description: description,
    keywords: [
      "FNDRS",
      "blog",
      "desarrollo",
      "software",
      "tecnología",
      "diseño",
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: description,
      url: postUrl,
      siteName: "FNDRS Blog",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      locale: lang === "es" ? "es_ES" : lang === "en" ? "en_US" : "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
      creator: "@thefndrs",
      site: "@thefndrs",
    },
    alternates: {
      canonical: postUrl,
      languages: {
        es: `${baseUrl}/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
        ja: `${baseUrl}/ja/blog/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const { slug, lang } = await params;
  const post = await client.fetch(query, { slug });
  if (!post) {
    return <div>Post not found</div>;
  }
  return <BlogDetail post={post} slug={slug} language={lang} />;
}

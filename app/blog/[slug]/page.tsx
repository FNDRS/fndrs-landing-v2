import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

const query = groq`
  *[_type=='post' && slug.current == $slug][0]{
    title,
    publishedAt,
    "author": author->name,
    body,
    excerpt,
    "readTime": readTime,
      mainImage
    {
      asset->
      {
        _id,
        url
      },
      alt
  },
  }
`;

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

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await client.fetch(query, { slug });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const fallback =
    process.env.NEXT_PUBLIC_FALLBACK_IMAGE ||
    "/placeholder.svg?height=600&width=800";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      <article className="container mx-auto px-4 pb-20 max-w-4xl">
        {/* Article Header */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <span className="flex text-sm w-full text-left font-medium text-gray-500 uppercase tracking-wide">
              ARTICLE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-left text-gray-900 mb-6 leading-[1.1] max-w-4xl mx-auto">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-lg font-light text-gray-900/60 text-left mb-8 max-w-2xl leading-loose">
              {post.summary}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex my-20 flex-wrap justify-center items-center gap-6 text-sm text-gray-900 mb-12">
            <div className="flex flex-col items-center gap-2 border-r-[1px] px-10 border-gray-200">
              <div className="flex items-center">
                <span>DATE</span>
              </div>
              <div className="flex items-center">
                <span className="font-light">
                  {formatDate(post.publishedAt)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 px-10 border-gray-200">
              <div className="flex items-center">
                <span>AUTHOR</span>
              </div>
              <div className="flex items-center">
                <span className="font-light">
                  {post.author || "FNDRS Team"}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 border-l-[1px] px-10 border-gray-200">
              <div className="flex items-center">
                <span>READ</span>
              </div>
              <div className="flex items-center">
                <span className="font-light">{post.readTime || 5} Min</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return {
      title: "FNDRS | Post Not Found",
    };
  }

  return {
    title: `FNDRS Blog | ${post.title}`,
    description: post.excerpt || `Read ${post.title} on the FNDRS blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.asset?.url ? [post.coverImage.asset.url] : [],
    },
  };
}

import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export const revalidate = 60;

const query = groq`
  *[_type=='post' && slug.current == $slug][0]{
    title,
    publishedAt,
    "author": author->name,
    coverImage,
    body,
    excerpt,
    "readTime": readTime
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
      <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 my-8 italic text-gray-600 text-lg">
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
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ol>
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
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              ARTICLE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-12">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>DATE</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>AUTHOR</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{post.author || "FNDRS Team"}</span>
            </div>

            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>READ</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{post.readTime || 5} Min</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-teal-400">
            <Image
              src={post.coverImage?.asset?.url || fallback}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </article>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return {
      title: "Post Not Found | FNDRS",
    };
  }

  return {
    title: `${post.title} | FNDRS Blog`,
    description: post.excerpt || `Read ${post.title} on the FNDRS blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.asset?.url ? [post.coverImage.asset.url] : [],
    },
  };
}

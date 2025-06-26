// app/blog/[slug]/page.tsx
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

const query = groq`
  *[_type=='post' && slug.current == $slug][0]{
    title,
    publishedAt,
    "author": author->name,
    coverImage,
    body,
  }
`;

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await client.fetch(query, { slug });

  console.log(post, "post");

  const fallback = process.env.NEXT_PUBLIC_FALLBACK_IMAGE || "";

  return (
    <article className="max-w-3xl mx-auto px-4 py-40">
      <header className="space-y-4 mb-12">
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
          <span>—</span>
          <span>{post.author}</span> {/* ahora es un string */}
        </div>
        {/** portada */}
        <div className="overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
          <Image
            src={post.coverImage?.asset.url || fallback}
            alt={post.title}
            fill
            sizes="(min-width: 1024px)800px,100vw"
            className="object-cover"
          />
        </div>
      </header>

      <section className="prose prose-lg prose-headings:mt-8 mx-auto">
        <PortableText
          value={post.body}
          components={{
            types: {
              image: ({ value }: any) => {
                const url = value.asset?.url;
                if (!url) return null;
                return (
                  <div className="my-6">
                    <Image
                      src={url}
                      alt={value.alt || "Image"}
                      width={800}
                      height={600}
                      className="rounded-lg"
                    />
                  </div>
                );
              },
            },
          }}
        />
      </section>
    </article>
  );
}

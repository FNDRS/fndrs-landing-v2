import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

const query = groq`
  *[_type=='post' && defined(slug.current)] | order(publishedAt desc){
    _id, title, slug, excerpt, coverImage
  }
`;

export default async function BlogPage() {
  const posts = await client.fetch(query);
  const fallback = process.env.NEXT_PUBLIC_FALLBACK_IMAGE || "";

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => {
            const img = post.coverImage?.asset.url || fallback;
            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
                  {img && (
                    <Image
                      src={img}
                      alt={post.title}
                      fill
                      sizes="(min-width:1024px)33vw,50vw"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold group-hover:text-black transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600 text-sm">{post.excerpt}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

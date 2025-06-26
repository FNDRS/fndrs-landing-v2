import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

const query = groq`
*[_type=='post' && defined(slug.current)] | order(publishedAt desc){
    _id, 
    title,
    slug,
    excerpt,
    mainImage
    {
      asset->
      {
        _id,
        url
      },
      alt
  },
  categories[]->
  {
    title,
    slug
  },
  publishedAt, 
  summary, 
 author->{
    name,
    image
  }
  }
`;

export default async function BlogPage() {
  const posts = await client.fetch(query);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl text-gray-900">Blog</h1>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {posts.map((post: any) => {
              const img = post.mainImage.asset.url;
              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block"
                >
                  <article className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full border-2 border-slate-100/90">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-400 to-teal-400 overflow-hidden">
                      <Image
                        alt={post.mainImage.alt || ""}
                        fill
                        src={img}
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        {post.categories && post.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {post.categories.map((cat: any) => (
                              <span
                                key={cat.slug?.current || cat.title}
                                className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-light uppercase text-gray-800"
                              >
                                {cat.title}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-thin text-gray-800">
                            Uncategorized
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
                          {post.summary}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Image
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                            src={urlFor(post.author.image)
                              .width(64)
                              .height(64)
                              .url()}
                            alt={post.author.name || ""}
                          />
                          <span>{post.author.name || "FNDRS Team"}</span>
                        </div>
                        <span>{post.readTime || 5} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="text-center py-16 border-t border-gray-100">
            <div className="mb-6">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                CONTACT
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 max-w-2xl mx-auto">
              Curious about what we can do for you?
            </h2>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium"
            >
              CONTACT
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

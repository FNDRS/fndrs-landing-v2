import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import BlogDetail from "@/components/blog-detail";

export const revalidate = 60;

const query = groq`
  *[_type=='post' && slug.current == $slug][0]{
    title,
    publishedAt,
    "author": author->name,
    body,
    excerpt,
    "readTime": readTime,
    mainImage{ asset->{url}, alt }
  }
`;

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(query, { slug: params.slug });
  if (!post) {
    return <div>Post not found</div>;
  }
  return <BlogDetail post={post} />;
}

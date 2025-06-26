import BlogList from "@/components/blog-list";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const revalidate = 60;

const query = groq`
*[_type=='post' && defined(slug.current)] 
| order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  mainImage{ asset->{ url }, alt },
  categories[]->{ title, slug },
  publishedAt,
  summary,
  author->{ name, image },
  readTime
}
`;

export default async function BlogPage() {
  const posts = await client.fetch(query);
  return <BlogList posts={posts} />;
}

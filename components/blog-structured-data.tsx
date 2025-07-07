interface BlogStructuredDataProps {
  post: {
    title: string;
    excerpt?: string;
    summary?: string;
    author: string;
    publishedAt: string;
    mainImage?: {
      asset: { url: string };
      alt?: string;
    };
  };
  slug: string;
  language: string;
  baseUrl?: string;
}

export default function BlogStructuredData({
  post,
  slug,
  language,
  baseUrl = "https://www.thefndrs.com",
}: BlogStructuredDataProps) {
  const langPrefix = language === "es" ? "" : `/${language}`;
  const postUrl = `${baseUrl}${langPrefix}/blog/${slug}`;

  const imageUrl = post.mainImage?.asset?.url
    ? `${post.mainImage.asset.url}?w=1200&h=630&fit=crop&auto=format`
    : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary || post.excerpt || post.title,
    image: imageUrl ? [imageUrl] : [],
    author: {
      "@type": "Person",
      name: post.author,
      url: `${baseUrl}${langPrefix}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "FNDRS",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    inLanguage:
      language === "es" ? "es-ES" : language === "en" ? "en-US" : "ja-JP",
    isPartOf: {
      "@type": "Blog",
      "@id": `${baseUrl}${langPrefix}/blog`,
      name: "FNDRS Blog",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

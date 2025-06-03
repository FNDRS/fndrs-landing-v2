export interface TeamTextMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  behance?: string;
  website?: string;
}

export interface TeamTextLocale {
  heading: string;
  description: string;
  badge: string;
  members: TeamTextMember[];
}

const memberUnchangedData: (Pick<TeamTextMember, "name" | "image"> &
  Partial<Omit<TeamTextMember, "name" | "image">>)[] = [
  {
    name: "Carlos Alberto",
    image: "/assets/branding/partner-1.webp",
    linkedin: "https://www.linkedin.com/in/carlos-pineda-a1a780220/",
    instagram: "https://www.instagram.com/carlos.alberto",
    github: "https://github.com/carlosp2001",
    website: "https://portfolio-website-carlosp.fly.dev/",
  },
  {
    name: "Jorge Torres",
    image: "/assets/branding/partner-2.webp",
    linkedin: "https://www.linkedin.com/in/jorge-torres-5396662a3/",
    instagram: "https://www.instagram.com/jorgeetorresx/",
    github: "https://github.com/jorge-torres",
    behance: "https://www.behance.net/jorgetorres46",
  },
  {
    name: "Marlon Castro",
    image: "/assets/branding/partner-3.webp",
    linkedin: "https://www.linkedin.com/in/m-geovany/",
    instagram: "https://www.instagram.com/marlon.castro",
    github: "https://github.com/MGeovany",
    website: "https://mgeovany-dev.vercel.app/",
  },
];

export const teamText: Record<"en" | "es" | "ja", TeamTextLocale> = {
  en: {
    heading: "Meet the Founding team that makes it all happen",
    description:
      "We have spent years working on startups, building out digital experiences and working on tech companies.",
    badge: "We’re open to collaborations!",
    members: [
      {
        name: memberUnchangedData[0].name,
        role: "Software Engineer & Cloud Architect",
        bio: "Specializes in backend systems and scalable cloud architectures for high-growth startups. Expert in API design, infrastructure automation, and performance-driven solutions.",
        image: memberUnchangedData[0].image,
        linkedin: memberUnchangedData[0].linkedin,
        github: memberUnchangedData[0].github,
        website: memberUnchangedData[0].website,
      },
      {
        name: memberUnchangedData[1].name,
        role: "Creative Director & Product Designer",
        bio: "Leads design at FNDRS, uniting product vision, UX strategy, and visual storytelling to craft digital experiences that drive engagement and elevate brands.",
        image: memberUnchangedData[1].image,
        linkedin: memberUnchangedData[1].linkedin,
        instagram: memberUnchangedData[1].instagram,
        behance: memberUnchangedData[1].behance,
      },
      {
        name: memberUnchangedData[2].name,
        role: "Software Engineer & Project Manager",
        bio: "Leads software delivery at FNDRS, combining technical expertise and operational leadership. Experienced in building scalable web and mobile applications.",
        image: memberUnchangedData[2].image,
        linkedin: memberUnchangedData[2].linkedin,
        github: memberUnchangedData[2].github,
        website: memberUnchangedData[2].website,
      },
    ],
  },
  es: {
    heading: "Conoce al equipo fundador que lo hace posible",
    description:
      "Hemos trabajado en startups, creando experiencias digitales y colaborando con empresas tecnológicas.",
    badge: "¡Estamos abiertos a colaboraciones!",
    members: [
      {
        name: memberUnchangedData[0].name,
        role: "Ingeniero de Software & Arquitecto en la Nube",
        bio: "Especialista en sistemas backend y arquitecturas cloud escalables para startups en crecimiento.",
        image: memberUnchangedData[0].image,
        linkedin: memberUnchangedData[0].linkedin,
        github: memberUnchangedData[0].github,
        website: memberUnchangedData[0].website,
      },
      {
        name: memberUnchangedData[1].name,
        role: "Director Creativo & Diseñador de Producto",
        bio: "Lidera el diseño en FNDRS, uniendo visión de producto, estrategia y narrativa visual para crear experiencias digitales.",
        image: memberUnchangedData[1].image,
        linkedin: memberUnchangedData[1].linkedin,
        instagram: memberUnchangedData[1].instagram,
        behance: memberUnchangedData[1].behance,
      },
      {
        name: memberUnchangedData[2].name,
        role: "Ingeniero de Software & Gerente de proyectos",
        bio: "Encabeza la entrega de software en FNDRS, combinando liderazgo operativo con expertise técnico.",
        image: memberUnchangedData[2].image,
        linkedin: memberUnchangedData[2].linkedin,
        github: memberUnchangedData[2].github,
        website: memberUnchangedData[2].website,
      },
    ],
  },
  ja: {
    heading: "すべてを実現する創業メンバーを紹介します",
    description:
      "私たちは長年にわたりスタートアップで働き、デジタル体験を構築し、テック企業と協力してきました。",
    badge: "コラボレーション募集中！",
    members: [
      {
        name: memberUnchangedData[0].name,
        role: "ソフトウェアエンジニア & クラウドアーキテクト",
        bio: "成長中のスタートアップ向けに、スケーラブルなバックエンドシステムとクラウドアーキテクチャを構築する専門家。API設計やインフラ自動化、パフォーマンス重視のソリューションに精通。",
        image: memberUnchangedData[0].image,
        linkedin: memberUnchangedData[0].linkedin,
        github: memberUnchangedData[0].github,
        website: memberUnchangedData[0].website,
      },
      {
        name: memberUnchangedData[1].name,
        role: "クリエイティブディレクター & プロダクトデザイナー",
        bio: "FNDRSのデザインをリード。プロダクトビジョン、UX戦略、ビジュアルストーリーテリングを融合し、ブランドを高めるデジタル体験を創出します。",
        image: memberUnchangedData[1].image,
        linkedin: memberUnchangedData[1].linkedin,
        instagram: memberUnchangedData[1].instagram,
        behance: memberUnchangedData[1].behance,
      },
      {
        name: memberUnchangedData[2].name,
        role: "ソフトウェアエンジニア & プロジェクトマネージャー",
        bio: "FNDRSでソフトウェア開発を統括。技術力と運用リーダーシップを融合し、スケーラブルなWeb・モバイルアプリを構築した経験を持つ。",
        image: memberUnchangedData[2].image,
        linkedin: memberUnchangedData[2].linkedin,
        github: memberUnchangedData[2].github,
        website: memberUnchangedData[2].website,
      },
    ],
  },
};

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
  members: TeamTextMember[];
}

const memberUnchangedData: (Pick<TeamTextMember, "name" | "image"> &
  Partial<Omit<TeamTextMember, "name" | "image">>)[] = [
  {
    name: "Carlos Alberto",
    image: "/assets/branding/partner-1.webp",
    linkedin: "https://www.linkedin.com/in/carlos-alberto",
    instagram: "https://www.instagram.com/carlos.alberto",
    github: "https://github.com/carlos-alberto",
    website: "https://carlosalberto.dev",
  },
  {
    name: "Jorge Torres",
    image: "/assets/branding/partner-2.webp",
    linkedin: "https://www.linkedin.com/in/jorge-torres",
    instagram: "https://www.instagram.com/jorge.torres",
    github: "https://github.com/jorge-torres",
    behance: "https://www.behance.net/jorge-torres",
  },
  {
    name: "Marlon Castro",
    image: "/assets/branding/partner-3.webp",
    linkedin: "https://www.linkedin.com/in/marlon-castro",
    instagram: "https://www.instagram.com/marlon.castro",
    github: "https://github.com/marlon-castro",
    website: "https://marlon.dev",
  },
];

export const teamText: Record<"en" | "es" | "ja", TeamTextLocale> = {
  en: {
    heading: "Meet the Founding team that makes it all happen",
    description:
      "We have spent years working on startups, building out digital experiences and working on tech companies.",
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
    members: [
      {
        name: memberUnchangedData[0].name,
        role: "Ingeniero de Software & Arquitecto Cloud",
        bio: "Especialista en sistemas backend y arquitecturas cloud escalables para startups en crecimiento. Experto en diseño de APIs, automatización de infraestructura y soluciones orientadas al rendimiento.",
        image: memberUnchangedData[0].image,
        linkedin: memberUnchangedData[0].linkedin,
        github: memberUnchangedData[0].github,
        website: memberUnchangedData[0].website,
      },
      {
        name: memberUnchangedData[1].name,
        role: "Director Creativo & Diseñador de Producto",
        bio: "Lidera el diseño en FNDRS, uniendo visión de producto, estrategia UX y narrativa visual para crear experiencias digitales que generan impacto y fortalecen marcas.",
        image: memberUnchangedData[1].image,
        linkedin: memberUnchangedData[1].linkedin,
        instagram: memberUnchangedData[1].instagram,
        behance: memberUnchangedData[1].behance,
      },
      {
        name: memberUnchangedData[2].name,
        role: "Ingeniero de Software & Project Manager",
        bio: "Encabeza la entrega de software en FNDRS, combinando liderazgo operativo con expertise técnico. Con experiencia en el desarrollo de aplicaciones web y móviles escalables.",
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

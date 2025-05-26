import withBundleAnalyzer from "@next/bundle-analyzer";

let userConfig = undefined;

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https:;
    `
      .replace(/\n/g, "")
      .trim(),
  },
];

try {
  userConfig = await import("./v0-user-next.config.mjs");
} catch (e) {
  try {
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["es", "en", "ja"],
    defaultLocale: "es",
    localeDetection: false,
  },

  productionBrowserSourceMaps: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [320, 420, 640, 768],
    imageSizes: [240, 384, 512],
    unoptimized: false,
  },

  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

if (userConfig) {
  const config = userConfig.default || userConfig;

  for (const key in config) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      };
    } else {
      nextConfig[key] = config[key];
    }
  }
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

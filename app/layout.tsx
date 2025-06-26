import Metadata from "next";
import { Poppins } from "next/font/google";
import Provider from "./provider";
import SEO from "@/next-seo.config";

import "@/styles/critical.css";
import ClientStyleLoader from "@/components/client-style-loader";
import SchemaMarkup from "@/components/schema-markup";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  ...SEO,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="alternate" href="https://www.thefndrs.com" hrefLang="es" />
        <link
          rel="alternate"
          href="https://www.thefndrs.com/en"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://www.thefndrs.com/ja"
          hrefLang="ja"
        />
        <link
          rel="alternate"
          href="https://www.thefndrs.com"
          hrefLang="x-default"
        />
        <SchemaMarkup />
      </head>
      <body className={poppins.className}>
        <ClientStyleLoader />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

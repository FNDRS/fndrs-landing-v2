import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Provider from "./[lang]/provider";
import SchemaMarkup from "@/components/schema-markup";
import SEO from "@/next-seo.config";

import "@/styles/critical.css";
import ClientStyleLoader from "@/components/client-style-loader";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  ...SEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
      </head>
      <body className={poppins.className}>
        <ClientStyleLoader />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

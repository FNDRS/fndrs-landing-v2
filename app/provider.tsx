import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/lang-context";
import React from "react";

import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}

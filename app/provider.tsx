import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

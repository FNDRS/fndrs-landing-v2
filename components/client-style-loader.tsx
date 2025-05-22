"use client";

import { useEffect } from "react";

export default function ClientStyleLoader() {
  useEffect(() => {
    // @ts-ignore
    import("@/styles/globals.css");
  }, []);

  return null;
}

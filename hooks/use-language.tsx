"use client";

import { useParams } from "next/navigation";
import { Language } from "@/types";

export function useLanguage(): { language: Language } {
  const params = useParams();
  const lang = params?.lang;

  const language = (lang ?? "en") as Language;

  return { language };
}

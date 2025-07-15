"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Language } from "@/types";
import { useAnalytics } from "@/hooks/use-posthog";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
];

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { trackLanguageChange } = useAnalytics();
  const currentLang = params?.lang as Language;

  const handleLanguageChange = (newLang: Language) => {
    if (!pathname) return;

    // Track language change
    trackLanguageChange(currentLang, newLang);

    const parts = pathname.split("/");
    parts[1] = newLang; // reemplaza el lang en la URL
    const newPath = parts.join("/") || "/";
    router.push(newPath);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 text-sm text-white">
        <span className="text-zinc-400 text-md">Language:</span>
        <div className="flex flex-row gap-2">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`px-3 py-1 min-w-20 rounded-full border transition-colors ${
                currentLang === code
                  ? "bg-white text-black"
                  : "border-zinc-600 hover:bg-zinc-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

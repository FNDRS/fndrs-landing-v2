"use client";

import { useLanguage } from "@/context/lang-context";
import { Language } from "@/types";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2 text-sm text-white">
        <span className="text-zinc-400 text-md">Language:</span>
        <div className="flex flex-row gap-2">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`px-3 py-1 min-w-20 rounded-full border transition-colors ${
                language === code
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

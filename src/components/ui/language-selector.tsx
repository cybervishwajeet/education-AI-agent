import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10"
          >
            <Globe className="h-5 w-5 text-blue-400" />
          </motion.div>
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-slate-800 border-slate-700"
      >
        <DropdownMenuLabel className="text-slate-400 text-xs font-normal">
          {t("settings.language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center justify-between ${i18n.language === language.code ? "bg-blue-900/20 text-blue-400" : "text-slate-300 hover:bg-slate-700"}`}
          >
            <div className="flex items-center">
              <span className="mr-2 text-base">{language.flag}</span>
              <span>{language.label}</span>
            </div>
            <AnimatePresence>
              {i18n.language === language.code && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 text-blue-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useApp, dict } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Languages, Moon, Sun } from "lucide-react";

export function ThemeLangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, theme, setTheme } = useApp();
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="ghost"
        size={compact ? "icon" : "sm"}
        onClick={() => setLang(lang === "en" ? "ur" : "en")}
        aria-label="Toggle language"
        className="gap-2"
      >
        <Languages className="w-4 h-4" />
        {!compact && <span className="text-xs font-semibold">{lang === "en" ? "اردو" : "EN"}</span>}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </Button>
    </div>
  );
}

export { dict };

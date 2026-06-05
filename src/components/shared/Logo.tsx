import { Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-context";
import { Wallet } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  const { t } = useApp();
  return (
    <Link to={to} className="flex items-center gap-2.5 group">
      <div className="grid place-items-center w-9 h-9 rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-soft)]">
        <Wallet className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="font-display font-bold text-lg tracking-tight">
        {t("appName")}
      </span>
    </Link>
  );
}

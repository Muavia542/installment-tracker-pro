import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-[image:var(--gradient-card)] opacity-60 pointer-events-none" />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl md:text-3xl font-display font-bold tracking-tight">{value}</p>
          {change && (
            <div className={cn(
              "inline-flex items-center gap-1 text-xs font-medium mt-1",
              trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
            )}>
              {trend === "up" && <ArrowUpRight className="w-3 h-3" />}
              {trend === "down" && <ArrowDownRight className="w-3 h-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="grid place-items-center w-10 h-10 rounded-xl bg-primary-soft text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

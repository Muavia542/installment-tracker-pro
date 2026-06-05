import { type ReactNode } from "react";
import { useApp } from "@/lib/app-context";
import { Logo } from "@/components/shared/Logo";
import { ThemeLangSwitcher } from "@/components/shared/ThemeLangSwitcher";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const { dir } = useApp();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background" dir={dir}>
      {/* Left: form */}
      <div className="flex flex-col p-6 lg:p-10">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeLangSwitcher compact />
        </div>
        <div className="flex-1 grid place-items-center py-10">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">© 2026 Installment Tracker Pro</p>
      </div>
      {/* Right: visual */}
      <div className="hidden lg:block relative overflow-hidden bg-[image:var(--gradient-primary)]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)"
        }} />
        <div className="relative h-full flex flex-col justify-between p-12 text-primary-foreground">
          <div />
          <div className="space-y-4 max-w-md">
            <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur">
              Trusted by 2,400+ businesses
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight">
              Every installment, perfectly tracked.
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              From the first deal to the final receipt — give your clients clarity and your business control.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[["98%", "On-time"], ["12K+", "Deals"], ["$4.2M", "Tracked"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold">{v}</div>
                  <div className="text-xs text-primary-foreground/70 mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-primary-foreground/60">PROFESSIONAL SaaS · SECURE · MOBILE-FIRST</div>
        </div>
      </div>
    </div>
  );
}

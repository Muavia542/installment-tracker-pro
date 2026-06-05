import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/app-context";
import { Logo } from "@/components/shared/Logo";
import { ThemeLangSwitcher } from "@/components/shared/ThemeLangSwitcher";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, BarChart3, CheckCircle2, CreditCard, FileText, Globe2,
  Receipt, Shield, Smartphone, Sparkles, Users
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Installment Tracker Pro — Track installments, payments & receipts" },
      { name: "description", content: "Modern SaaS for installment-based businesses. Manage clients, deals, payments and receipts in one beautiful dashboard." },
      { property: "og:title", content: "Installment Tracker Pro" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t, dir } = useApp();
  return (
    <div className="min-h-screen bg-background" dir={dir}>
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">{t("features")}</a>
            <a href="#pricing" className="hover:text-foreground transition">{t("pricing")}</a>
            <a href="#about" className="hover:text-foreground transition">{t("about")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeLangSwitcher compact />
            <Link to="/login"><Button variant="ghost" size="sm">{t("signIn")}</Button></Link>
            <Link to="/signup" className="hidden sm:block"><Button size="sm">{t("signUp")}</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)] dark:opacity-30" />
        <div className="absolute -top-40 start-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Now with bilingual EN / اردو support
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            {t("tagline")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("heroSub")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup"><Button size="lg" className="gap-2 h-12 px-6 text-base">{t("getStarted")} <ArrowRight className="w-4 h-4 rtl-flip" /></Button></Link>
            <Link to="/admin/dashboard"><Button size="lg" variant="outline" className="gap-2 h-12 px-6 text-base">View Demo</Button></Link>
          </div>

          {/* Dashboard preview */}
          <div className="relative mt-16 mx-auto max-w-5xl">
            <div className="absolute -inset-4 bg-[image:var(--gradient-primary)] opacity-20 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border bg-card shadow-[var(--shadow-elegant)] overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b bg-muted/30">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full bg-warning/60" />
                <span className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="grid grid-cols-4 gap-3 p-4 lg:p-6">
                {[
                  { v: "PKR 12.4M", l: t("totalRevenue") },
                  { v: "284", l: t("activeDeals") },
                  { v: "1,429", l: t("totalClients") },
                  { v: "98%", l: "On-time rate" },
                ].map((k) => (
                  <div key={k.l} className="rounded-xl border bg-card/50 p-3 text-start">
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider truncate">{k.l}</div>
                    <div className="font-display font-bold text-sm sm:text-xl mt-1">{k.v}</div>
                  </div>
                ))}
              </div>
              <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                <div className="h-32 sm:h-40 rounded-xl bg-[image:linear-gradient(180deg,var(--primary-soft),transparent)] relative overflow-hidden">
                  <svg viewBox="0 0 400 100" className="absolute inset-x-0 bottom-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M0,80 C50,60 100,70 150,40 C200,10 250,30 300,20 C350,15 380,25 400,15 L400,100 L0,100 Z" fill="var(--primary)" opacity="0.2" />
                    <path d="M0,80 C50,60 100,70 150,40 C200,10 250,30 300,20 C350,15 380,25 400,15" stroke="var(--primary)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">Everything you need. Nothing you don't.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Users, title: "Client Management", desc: "Keep every contact, history, and deal in one organized place." },
              { icon: FileText, title: "Smart Deals", desc: "Flexible installment plans with auto-calculated schedules." },
              { icon: CreditCard, title: "Payment Tracking", desc: "Record payments across methods — bank, cash, mobile wallets." },
              { icon: Receipt, title: "Auto Receipts", desc: "Instant, professional receipts every client can download." },
              { icon: BarChart3, title: "Real-time Analytics", desc: "KPIs, revenue charts, and overdue alerts at a glance." },
              { icon: Globe2, title: "Bilingual & RTL", desc: "Full English & Urdu support with native RTL layouts." },
            ].map((f) => (
              <div key={f.title} className="group p-6 rounded-2xl border bg-card hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-primary-soft text-primary mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">Simple, transparent pricing</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Starter", price: "Free", desc: "For trying things out", features: ["10 active deals", "25 clients", "Basic reports"] },
              { name: "Pro", price: "PKR 2,500", per: "/mo", desc: "For growing businesses", features: ["Unlimited deals", "Unlimited clients", "Advanced analytics", "Priority support"], featured: true },
              { name: "Business", price: "PKR 7,500", per: "/mo", desc: "For teams", features: ["Everything in Pro", "Multi-user access", "API & integrations"] },
            ].map((p) => (
              <div key={p.name} className={`relative rounded-2xl border p-6 ${p.featured ? "bg-card shadow-[var(--shadow-elegant)] border-primary/40 lg:scale-105" : "bg-card"}`}>
                {p.featured && <div className="absolute -top-3 start-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-semibold">Most popular</div>}
                <h3 className="font-display font-bold text-xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{p.price}</span>
                  {p.per && <span className="text-sm text-muted-foreground">{p.per}</span>}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block mt-6">
                  <Button variant={p.featured ? "default" : "outline"} className="w-full">Choose {p.name}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-primary)] p-10 lg:p-16 text-center text-primary-foreground">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 0%, transparent 40%)" }} />
            <div className="relative">
              <Shield className="w-10 h-10 mx-auto mb-4 opacity-90" />
              <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">Ready to take control?</h2>
              <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">Join thousands of businesses tracking installments the modern way.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/signup"><Button size="lg" variant="secondary" className="gap-2 h-12 px-6">{t("getStarted")} <ArrowRight className="w-4 h-4 rtl-flip" /></Button></Link>
                <Link to="/login"><Button size="lg" variant="outline" className="h-12 px-6 bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">{t("signIn")}</Button></Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-primary-foreground/70">
                <span className="inline-flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Mobile first</span>
                <span className="inline-flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5" /> EN / اردو</span>
                <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Bank-grade security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo />
          <p>© 2026 Installment Tracker Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

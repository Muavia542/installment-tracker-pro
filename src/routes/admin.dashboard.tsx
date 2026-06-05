import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { RevenueChart, StatusChart } from "@/components/shared/Charts";
import { useApp, dict } from "@/lib/app-context";
import { kpis, activity, dealsList } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CreditCard, FileText, Plus, Users, Wallet, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Installment Tracker Pro" }] }),
  component: AdminDashboard,
});

const iconMap = { totalRevenue: Wallet, activeDeals: FileText, totalClients: Users, overdue: CreditCard };

function AdminDashboard() {
  const { t } = useApp();
  return (
    <>
      <PageHeader
        title={`${t("welcomeBack")}, Imran 👋`}
        subtitle={t("overview")}
        actions={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("newDeal")}</Button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.admin.map((k) => (
          <KpiCard
            key={k.key}
            label={t(k.key as keyof typeof dict)}
            value={k.value}
            change={k.change}
            trend={k.trend}
            icon={iconMap[k.key as keyof typeof iconMap]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold">{t("revenueOverview")}</h3>
              <p className="text-xs text-muted-foreground">Revenue vs Collected · last 8 months</p>
            </div>
            <span className="text-xs text-muted-foreground">{t("thisMonth")}: <span className="font-semibold text-foreground">PKR 1.82M</span></span>
          </div>
          <RevenueChart />
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-1">{t("paymentStatus")}</h3>
          <p className="text-xs text-muted-foreground mb-2">Across all active deals</p>
          <StatusChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-5 pb-3">
            <h3 className="font-display font-semibold">{t("upcomingPayments")}</h3>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">View all <ArrowUpRight className="w-3 h-3 rtl-flip" /></Button>
          </div>
          <div className="divide-y">
            {dealsList.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition">
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary grid place-items-center font-semibold">
                  {d.client.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{d.client}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.product} · {d.installments}</p>
                </div>
                <div className="text-end">
                  <p className="font-semibold text-sm">{d.total}</p>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">{t("recentActivity")}</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm"><span className="font-medium">{a.who}</span> {a.what && <span className="text-muted-foreground">{a.what}</span>}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.when} · <span className="font-medium text-foreground">{a.amount}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

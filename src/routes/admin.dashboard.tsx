import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { RevenueChart, StatusChart } from "@/components/shared/Charts";
import { useApp } from "@/lib/app-context";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CreditCard, FileText, Users, Wallet, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminKpis, listDeals, listProfiles, listPayments, money } from "@/lib/queries";
import { NewDealDialog } from "@/components/shared/EntityDialogs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Installment Tracker Pro" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { t } = useApp();
  const { user } = useAuth();
  const { data: k } = useQuery({ queryKey: ["adminKpis"], queryFn: adminKpis });
  const { data: deals = [] } = useQuery({ queryKey: ["deals"], queryFn: () => listDeals() });
  const { data: profiles = [] } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles });
  const { data: payments = [] } = useQuery({ queryKey: ["payments"], queryFn: () => listPayments() });

  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || profiles.find((p) => p.id === id)?.email || "—";

  return (
    <>
      <PageHeader
        title={`${t("welcomeBack")}, ${user?.email?.split("@")[0] || "Admin"} 👋`}
        subtitle={t("overview")}
        actions={<NewDealDialog trigger={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("newDeal")}</Button>} />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label={t("totalRevenue")} value={money(k?.totalRevenue)} change={`Collected ${money(k?.totalCollected)}`} trend="up" icon={Wallet} />
        <KpiCard label={t("activeDeals")} value={String(k?.active ?? 0)} change={`${deals.length} total`} trend="up" icon={FileText} />
        <KpiCard label={t("totalClients")} value={String(k?.clients ?? 0)} change="registered" trend="up" icon={Users} />
        <KpiCard label="Outstanding" value={money(k?.outstanding)} change={`${payments.length} payments`} trend="down" icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold">{t("revenueOverview")}</h3>
              <p className="text-xs text-muted-foreground">Revenue trend</p>
            </div>
            <span className="text-xs text-muted-foreground">Collected: <span className="font-semibold text-foreground">{money(k?.totalCollected)}</span></span>
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
            <h3 className="font-display font-semibold">Recent Deals</h3>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">View all <ArrowUpRight className="w-3 h-3 rtl-flip" /></Button>
          </div>
          <div className="divide-y">
            {deals.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition">
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary grid place-items-center font-semibold">
                  {nameOf(d.client_id).charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{nameOf(d.client_id)}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.item_name} · {d.duration_months}mo</p>
                </div>
                <div className="text-end">
                  <p className="font-semibold text-sm">{money(d.deal_total_price)}</p>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            ))}
            {deals.length === 0 && <p className="p-6 text-sm text-center text-muted-foreground">No deals yet.</p>}
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">{t("recentActivity")}</h3>
          <div className="space-y-4">
            {payments.slice(0, 6).map((p) => (
              <div key={p.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm"><span className="font-medium">{nameOf(p.client_id)}</span> <span className="text-muted-foreground">paid via {p.payment_method}</span></p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.payment_date} · <span className="font-medium text-foreground">{money(p.amount_paid)}</span></p>
                </div>
              </div>
            ))}
            {payments.length === 0 && <p className="text-sm text-muted-foreground">No payments yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

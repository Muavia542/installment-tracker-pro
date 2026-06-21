import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { useApp } from "@/lib/app-context";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Wallet, CalendarClock, Coins, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { clientKpis, listDeals, listPayments, money } from "@/lib/queries";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — Installment Tracker Pro" }] }),
  component: ClientDashboard,
});

function ClientDashboard() {
  const { t } = useApp();
  const { user } = useAuth();
  const uid = user?.id;
  const { data: k } = useQuery({ queryKey: ["clientKpis", uid], queryFn: () => clientKpis(uid!), enabled: !!uid });
  const { data: deals = [] } = useQuery({ queryKey: ["deals", uid], queryFn: () => listDeals(uid!), enabled: !!uid });
  const { data: payments = [] } = useQuery({ queryKey: ["payments", uid], queryFn: () => listPayments(uid!), enabled: !!uid });

  const name = user?.email?.split("@")[0] || "there";

  return (
    <>
      <PageHeader title={`${t("welcomeBack")}, ${name} 👋`} subtitle={t("overview")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label={t("totalPaid")} value={money(k?.totalPaid)} change={`${payments.length} payments`} icon={Wallet} />
        <KpiCard label={t("remainingBalance")} value={money(k?.remaining)} change={`${k?.active ?? 0} active`} icon={Coins} />
        <KpiCard label={t("nextPayment")} value={deals.find((d) => d.status === "active") ? "Due soon" : "—"} change="" icon={CalendarClock} />
        <KpiCard label={t("activeDeals")} value={String(k?.active ?? 0)} change={`${k?.totalDeals ?? 0} total`} icon={FileText} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">{t("myDeals")}</h3>
          <div className="space-y-4">
            {deals.slice(0, 4).map((d) => {
              const pct = d.deal_total_price > 0 ? ((d.deal_total_price - d.remaining_balance) / d.deal_total_price) * 100 : 0;
              return (
                <div key={d.id} className="p-4 rounded-xl border bg-card hover:bg-muted/30 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{d.item_name}</p>
                      <p className="text-xs text-muted-foreground">{d.duration_months} months · {d.installment_frequency}</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{money(d.deal_total_price - d.remaining_balance)} of {money(d.deal_total_price)}</span>
                      <span className="font-semibold">{Math.round(pct)}%</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                </div>
              );
            })}
            {deals.length === 0 && <p className="text-sm text-muted-foreground">You have no deals yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">{t("upcomingPayments")}</h3>
          <div className="space-y-3">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <div className="grid place-items-center w-10 h-10 rounded-lg bg-card border text-center">
                  <span className="text-[10px] text-muted-foreground leading-none">{p.payment_date.slice(5, 7)}</span>
                  <span className="text-sm font-bold leading-none">{p.payment_date.slice(8, 10)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{money(p.amount_paid)}</p>
                  <p className="text-xs text-muted-foreground truncate capitalize">{p.payment_method.replace("_", " ")}</p>
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

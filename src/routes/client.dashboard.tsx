import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { useApp, dict } from "@/lib/app-context";
import { kpis, dealsList, paymentsList } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Wallet, CalendarClock, Coins, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — Installment Tracker Pro" }] }),
  component: ClientDashboard,
});

const iconMap = { totalPaid: Wallet, remainingBalance: Coins, nextPayment: CalendarClock, activeDeals: FileText };

function ClientDashboard() {
  const { t } = useApp();
  return (
    <>
      <PageHeader title={`${t("welcomeBack")}, Ahmed 👋`} subtitle={t("overview")} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.client.map((k) => (
          <KpiCard
            key={k.key}
            label={t(k.key as keyof typeof dict)}
            value={k.value}
            change={k.change}
            icon={iconMap[k.key as keyof typeof iconMap]}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">{t("myDeals")}</h3>
          <div className="space-y-4">
            {dealsList.slice(0, 3).map((d) => {
              const [paid, total] = d.installments.split("/").map(Number);
              const pct = (paid / total) * 100;
              return (
                <div key={d.id} className="p-4 rounded-xl border bg-card hover:bg-muted/30 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{d.product}</p>
                      <p className="text-xs text-muted-foreground">{d.id} · {d.installments} installments</p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{d.paid} of {d.total}</span>
                      <span className="font-semibold">{Math.round(pct)}%</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">{t("upcomingPayments")}</h3>
          <div className="space-y-3">
            {paymentsList.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <div className="grid place-items-center w-10 h-10 rounded-lg bg-card border text-center">
                  <span className="text-[10px] text-muted-foreground leading-none">{p.date.slice(5,7)}</span>
                  <span className="text-sm font-bold leading-none">{p.date.slice(8,10)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.amount}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.method}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/lib/app-context";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { listDeals, money } from "@/lib/queries";

export const Route = createFileRoute("/client/deals")({
  head: () => ({ meta: [{ title: "My Deals — Installment Tracker Pro" }] }),
  component: MyDeals,
});

function MyDeals() {
  const { t } = useApp();
  const { user } = useAuth();
  const { data: deals = [] } = useQuery({ queryKey: ["deals", user?.id], queryFn: () => listDeals(user!.id), enabled: !!user });

  return (
    <>
      <PageHeader title={t("myDeals")} subtitle="Your installment plans and progress." />
      <div className="grid sm:grid-cols-2 gap-4">
        {deals.map((d) => {
          const pct = d.deal_total_price > 0 ? ((d.deal_total_price - d.remaining_balance) / d.deal_total_price) * 100 : 0;
          return (
            <div key={d.id} className="rounded-2xl border bg-card p-5 hover:shadow-[var(--shadow-soft)] transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">{d.id.slice(0, 8)}</p>
                  <p className="font-display font-semibold text-lg mt-1">{d.item_name}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Total</p><p className="font-semibold">{money(d.deal_total_price)}</p></div>
                <div><p className="text-xs text-muted-foreground">Remaining</p><p className="font-semibold text-success">{money(d.remaining_balance)}</p></div>
                <div><p className="text-xs text-muted-foreground">Duration</p><p className="font-medium">{d.duration_months} months</p></div>
                <div><p className="text-xs text-muted-foreground">Frequency</p><p className="font-medium capitalize">{d.installment_frequency}</p></div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Progress</span><span className="font-semibold">{Math.round(pct)}%</span></div>
                <Progress value={pct} className="h-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 gap-2"><Eye className="w-4 h-4" /> {t("view")}</Button>
            </div>
          );
        })}
        {deals.length === 0 && <p className="text-sm text-muted-foreground col-span-2">No deals yet.</p>}
      </div>
    </>
  );
}

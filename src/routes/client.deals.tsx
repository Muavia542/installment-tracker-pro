import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApp } from "@/lib/app-context";
import { dealsList } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/client/deals")({
  head: () => ({ meta: [{ title: "My Deals — Installment Tracker Pro" }] }),
  component: MyDeals,
});

function MyDeals() {
  const { t } = useApp();
  return (
    <>
      <PageHeader title={t("myDeals")} subtitle="Your installment plans and progress." />
      <div className="grid sm:grid-cols-2 gap-4">
        {dealsList.slice(0, 5).map((d) => {
          const [paid, total] = d.installments.split("/").map(Number);
          const pct = (paid / total) * 100;
          return (
            <div key={d.id} className="rounded-2xl border bg-card p-5 hover:shadow-[var(--shadow-soft)] transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">{d.id}</p>
                  <p className="font-display font-semibold text-lg mt-1">{d.product}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">{t("amount")}</p><p className="font-semibold">{d.total}</p></div>
                <div><p className="text-xs text-muted-foreground">{t("paid")}</p><p className="font-semibold text-success">{d.paid}</p></div>
                <div><p className="text-xs text-muted-foreground">{t("installment")}</p><p className="font-medium">{d.installments}</p></div>
                <div><p className="text-xs text-muted-foreground">{t("dueDate")}</p><p className="font-medium">{d.nextDue}</p></div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Progress</span><span className="font-semibold">{Math.round(pct)}%</span></div>
                <Progress value={pct} className="h-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 gap-2"><Eye className="w-4 h-4" /> {t("view")}</Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

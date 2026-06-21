import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { Download, Receipt } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listPayments, listProfiles, money } from "@/lib/queries";

export const Route = createFileRoute("/admin/receipts")({
  head: () => ({ meta: [{ title: "Receipts — Installment Tracker Pro" }] }),
  component: Receipts,
});

function Receipts() {
  const { t } = useApp();
  const { data: payments = [] } = useQuery({ queryKey: ["payments"], queryFn: () => listPayments() });
  const { data: profiles = [] } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles });
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || "—";

  return (
    <>
      <PageHeader title={t("receipts")} subtitle="Auto-generated for every payment." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map((r) => (
          <div key={r.id} className="group rounded-2xl border bg-card p-5 hover:shadow-[var(--shadow-soft)] transition-all">
            <div className="flex items-start justify-between">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-primary-soft text-primary">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">{r.receipt_number}</span>
            </div>
            <p className="mt-4 font-display font-bold text-xl">{money(r.amount_paid)}</p>
            <p className="text-sm text-muted-foreground mt-1">{nameOf(r.client_id)}</p>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{r.payment_date}</span>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Download className="w-3.5 h-3.5" /> {t("download")}</Button>
            </div>
          </div>
        ))}
        {payments.length === 0 && <p className="text-sm text-muted-foreground">No receipts yet.</p>}
      </div>
    </>
  );
}

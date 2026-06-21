import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { Download, Receipt } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { listPayments, money } from "@/lib/queries";

export const Route = createFileRoute("/client/receipts")({
  head: () => ({ meta: [{ title: "My Receipts — Installment Tracker Pro" }] }),
  component: ClientReceipts,
});

function ClientReceipts() {
  const { t } = useApp();
  const { user } = useAuth();
  const { data: payments = [] } = useQuery({ queryKey: ["payments", user?.id], queryFn: () => listPayments(user!.id), enabled: !!user });

  return (
    <>
      <PageHeader title={t("receipts")} subtitle="Download receipts for your records." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {payments.map((r) => (
          <div key={r.id} className="rounded-2xl border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-primary-soft text-primary"><Receipt className="w-5 h-5" /></div>
              <span className="text-xs font-mono text-muted-foreground">{r.receipt_number}</span>
            </div>
            <p className="mt-4 font-display font-bold text-xl">{money(r.amount_paid)}</p>
            <p className="text-xs text-muted-foreground mt-1">Paid on {r.payment_date}</p>
            <Button variant="outline" size="sm" className="w-full mt-4 gap-2"><Download className="w-4 h-4" /> {t("download")}</Button>
          </div>
        ))}
        {payments.length === 0 && <p className="text-sm text-muted-foreground">No receipts yet.</p>}
      </div>
    </>
  );
}

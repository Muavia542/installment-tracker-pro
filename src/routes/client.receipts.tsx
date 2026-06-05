import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { receiptsList } from "@/lib/mock-data";
import { Download, Receipt } from "lucide-react";

export const Route = createFileRoute("/client/receipts")({
  head: () => ({ meta: [{ title: "My Receipts — Installment Tracker Pro" }] }),
  component: ClientReceipts,
});

function ClientReceipts() {
  const { t } = useApp();
  return (
    <>
      <PageHeader title={t("receipts")} subtitle="Download receipts for your records." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receiptsList.map(r => (
          <div key={r.id} className="rounded-2xl border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="grid place-items-center w-11 h-11 rounded-xl bg-primary-soft text-primary"><Receipt className="w-5 h-5" /></div>
              <span className="text-xs font-mono text-muted-foreground">{r.id}</span>
            </div>
            <p className="mt-4 font-display font-bold text-xl">{r.amount}</p>
            <p className="text-xs text-muted-foreground mt-1">Paid on {r.date}</p>
            <Button variant="outline" size="sm" className="w-full mt-4 gap-2"><Download className="w-4 h-4" /> {t("download")}</Button>
          </div>
        ))}
      </div>
    </>
  );
}

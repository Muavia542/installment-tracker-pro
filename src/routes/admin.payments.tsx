import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { paymentsList } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({ meta: [{ title: "Payments — Installment Tracker Pro" }] }),
  component: Payments,
});

function Payments() {
  const { t } = useApp();
  return (
    <>
      <PageHeader
        title={t("payments")}
        subtitle="Every transaction across all deals."
        actions={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("recordPayment")}</Button>}
      />
      <TableToolbar />
      <DataTable
        columns={["Payment ID", "Deal", "Client", t("amount"), t("date"), "Method", t("status")]}
        rows={paymentsList.map((p) => [
          <span className="text-xs font-mono text-muted-foreground">{p.id}</span>,
          <span className="text-xs font-mono text-muted-foreground">{p.deal}</span>,
          <span className="font-medium">{p.client}</span>,
          <span className="font-semibold">{p.amount}</span>,
          <span className="text-sm text-muted-foreground">{p.date}</span>,
          <span className="text-sm">{p.method}</span>,
          <StatusBadge status={p.status} />,
        ])}
      />
    </>
  );
}

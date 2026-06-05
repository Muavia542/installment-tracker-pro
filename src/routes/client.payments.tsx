import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useApp } from "@/lib/app-context";
import { paymentsList } from "@/lib/mock-data";

export const Route = createFileRoute("/client/payments")({
  head: () => ({ meta: [{ title: "Payment History — Installment Tracker Pro" }] }),
  component: ClientPayments,
});

function ClientPayments() {
  const { t } = useApp();
  return (
    <>
      <PageHeader title={t("paymentHistory")} subtitle="Every payment you've made." />
      <TableToolbar />
      <DataTable
        columns={["Receipt", "Deal", t("amount"), t("date"), "Method", t("status")]}
        rows={paymentsList.map(p => [
          <span className="text-xs font-mono text-muted-foreground">{p.id}</span>,
          <span className="text-xs font-mono text-muted-foreground">{p.deal}</span>,
          <span className="font-semibold">{p.amount}</span>,
          <span className="text-sm text-muted-foreground">{p.date}</span>,
          <span className="text-sm">{p.method}</span>,
          <StatusBadge status={p.status} />,
        ])}
      />
    </>
  );
}

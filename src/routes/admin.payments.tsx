import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { useApp } from "@/lib/app-context";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listPayments, listProfiles, listDeals, money } from "@/lib/queries";
import { RecordPaymentDialog } from "@/components/shared/EntityDialogs";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({ meta: [{ title: "Payments — Installment Tracker Pro" }] }),
  component: Payments,
});

function Payments() {
  const { t } = useApp();
  const { data: payments = [] } = useQuery({ queryKey: ["payments"], queryFn: () => listPayments() });
  const { data: profiles = [] } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles });
  const { data: deals = [] } = useQuery({ queryKey: ["deals"], queryFn: () => listDeals() });
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || "—";
  const dealName = (id: string) => deals.find((d) => d.id === id)?.item_name || "—";

  return (
    <>
      <PageHeader
        title={t("payments")}
        subtitle="Every transaction across all deals."
        actions={<RecordPaymentDialog trigger={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("recordPayment")}</Button>} />}
      />
      <TableToolbar />
      <DataTable
        columns={["Receipt #", "Deal", "Client", t("amount"), t("date"), "Method"]}
        rows={payments.map((p) => [
          <span className="text-xs font-mono text-muted-foreground">{p.receipt_number}</span>,
          <span className="text-sm">{dealName(p.deal_id)}</span>,
          <span className="font-medium">{nameOf(p.client_id)}</span>,
          <span className="font-semibold">{money(p.amount_paid)}</span>,
          <span className="text-sm text-muted-foreground">{p.payment_date}</span>,
          <span className="text-sm capitalize">{p.payment_method.replace("_", " ")}</span>,
        ])}
      />
    </>
  );
}

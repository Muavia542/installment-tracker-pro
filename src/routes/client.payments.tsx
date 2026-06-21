import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { useApp } from "@/lib/app-context";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { listPayments, listDeals, money } from "@/lib/queries";

export const Route = createFileRoute("/client/payments")({
  head: () => ({ meta: [{ title: "Payment History — Installment Tracker Pro" }] }),
  component: ClientPayments,
});

function ClientPayments() {
  const { t } = useApp();
  const { user } = useAuth();
  const { data: payments = [] } = useQuery({ queryKey: ["payments", user?.id], queryFn: () => listPayments(user!.id), enabled: !!user });
  const { data: deals = [] } = useQuery({ queryKey: ["deals", user?.id], queryFn: () => listDeals(user!.id), enabled: !!user });
  const dealName = (id: string) => deals.find((d) => d.id === id)?.item_name || "—";

  return (
    <>
      <PageHeader title={t("paymentHistory")} subtitle="Every payment you've made." />
      <TableToolbar />
      <DataTable
        columns={["Receipt", "Deal", t("amount"), t("date"), "Method"]}
        rows={payments.map((p) => [
          <span className="text-xs font-mono text-muted-foreground">{p.receipt_number}</span>,
          <span className="text-sm">{dealName(p.deal_id)}</span>,
          <span className="font-semibold">{money(p.amount_paid)}</span>,
          <span className="text-sm text-muted-foreground">{p.payment_date}</span>,
          <span className="text-sm capitalize">{p.payment_method.replace("_", " ")}</span>,
        ])}
      />
    </>
  );
}

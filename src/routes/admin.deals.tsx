import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { dealsList } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { Plus, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/deals")({
  head: () => ({ meta: [{ title: "Deals — Installment Tracker Pro" }] }),
  component: Deals,
});

function Deals() {
  const { t } = useApp();
  return (
    <>
      <PageHeader
        title={t("deals")}
        subtitle="All installment plans and contracts."
        actions={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("newDeal")}</Button>}
      />
      <TableToolbar />
      <DataTable
        columns={["Deal", "Client", "Product", "Total", "Paid", t("installment"), t("dueDate"), t("status"), ""]}
        rows={dealsList.map((d) => [
          <span className="text-xs font-mono text-muted-foreground">{d.id}</span>,
          <span className="font-medium">{d.client}</span>,
          <span className="text-sm">{d.product}</span>,
          <span className="font-semibold">{d.total}</span>,
          <span className="text-success font-medium">{d.paid}</span>,
          <span className="text-sm font-mono">{d.installments}</span>,
          <span className="text-sm text-muted-foreground">{d.nextDue}</span>,
          <StatusBadge status={d.status} />,
          <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>,
        ])}
      />
    </>
  );
}

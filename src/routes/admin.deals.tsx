import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useApp } from "@/lib/app-context";
import { Plus, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listDeals, listProfiles, money } from "@/lib/queries";
import { NewDealDialog } from "@/components/shared/EntityDialogs";

export const Route = createFileRoute("/admin/deals")({
  head: () => ({ meta: [{ title: "Deals — Installment Tracker Pro" }] }),
  component: Deals,
});

function Deals() {
  const { t } = useApp();
  const { data: deals = [] } = useQuery({ queryKey: ["deals"], queryFn: () => listDeals() });
  const { data: profiles = [] } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles });
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || profiles.find((p) => p.id === id)?.email || "—";

  return (
    <>
      <PageHeader
        title={t("deals")}
        subtitle="All installment plans and contracts."
        actions={<NewDealDialog trigger={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("newDeal")}</Button>} />}
      />
      <TableToolbar />
      <DataTable
        columns={["Item", "Client", "Total", "Remaining", "Duration", "Frequency", t("status"), ""]}
        rows={deals.map((d) => [
          <div><div className="font-medium">{d.item_name}</div><div className="text-xs text-muted-foreground">cost {money(d.item_cost_price)}</div></div>,
          <span className="font-medium">{nameOf(d.client_id)}</span>,
          <span className="font-semibold">{money(d.deal_total_price)}</span>,
          <span className="font-medium text-success">{money(d.remaining_balance)}</span>,
          <span className="text-sm">{d.duration_months}mo</span>,
          <span className="text-sm capitalize">{d.installment_frequency}</span>,
          <StatusBadge status={d.status} />,
          <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>,
        ])}
      />
    </>
  );
}

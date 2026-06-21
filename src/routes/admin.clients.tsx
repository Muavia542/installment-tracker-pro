import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useApp } from "@/lib/app-context";
import { Plus, MoreHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listProfiles, listDeals, money } from "@/lib/queries";
import { AddClientDialog } from "@/components/shared/EntityDialogs";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({ meta: [{ title: "Clients — Installment Tracker Pro" }] }),
  component: Clients,
});

function Clients() {
  const { t } = useApp();
  const { data: profiles = [] } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles });
  const { data: deals = [] } = useQuery({ queryKey: ["deals"], queryFn: () => listDeals() });

  const dealsByClient = (id: string) => deals.filter((d) => d.client_id === id);
  const balanceOf = (id: string) => dealsByClient(id).reduce((s, d) => s + Number(d.remaining_balance), 0);

  return (
    <>
      <PageHeader
        title={t("clients")}
        subtitle="Manage every customer in one place."
        actions={<AddClientDialog trigger={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("newClient")}</Button>} />}
      />
      <TableToolbar />
      <DataTable
        columns={["Name", "Contact", "Deals", "Balance", t("status"), ""]}
        rows={profiles.map((c) => {
          const ds = dealsByClient(c.id);
          const bal = balanceOf(c.id);
          const status = ds.length === 0 ? "active" : bal === 0 ? "completed" : "active";
          return [
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-soft text-primary grid place-items-center text-sm font-semibold">{(c.full_name || c.email || "?").charAt(0).toUpperCase()}</div>
              <div><div className="font-medium">{c.full_name || "—"}</div><div className="text-xs text-muted-foreground">{c.email}</div></div>
            </div>,
            <span className="text-sm text-muted-foreground">{c.phone || "—"}</span>,
            <span className="font-medium">{ds.length}</span>,
            <span className="font-semibold">{money(bal)}</span>,
            <StatusBadge status={status} />,
            <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>,
          ];
        })}
      />
    </>
  );
}

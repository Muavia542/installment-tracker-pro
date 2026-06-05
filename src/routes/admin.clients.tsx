import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { TableToolbar, DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { clientsList } from "@/lib/mock-data";
import { useApp } from "@/lib/app-context";
import { Plus, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({ meta: [{ title: "Clients — Installment Tracker Pro" }] }),
  component: Clients,
});

function Clients() {
  const { t } = useApp();
  return (
    <>
      <PageHeader
        title={t("clients")}
        subtitle="Manage every customer in one place."
        actions={<Button className="gap-2"><Plus className="w-4 h-4" /> {t("newClient")}</Button>}
      />
      <TableToolbar />
      <DataTable
        columns={["ID", "Name", "Contact", "Deals", "Balance", t("status"), ""]}
        rows={clientsList.map((c) => [
          <span className="text-xs font-mono text-muted-foreground">{c.id}</span>,
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-soft text-primary grid place-items-center text-sm font-semibold">{c.name.charAt(0)}</div>
            <div><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.email}</div></div>
          </div>,
          <span className="text-sm text-muted-foreground">{c.phone}</span>,
          <span className="font-medium">{c.deals}</span>,
          <span className="font-semibold">{c.balance}</span>,
          <StatusBadge status={c.status} />,
          <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>,
        ])}
      />
    </>
  );
}

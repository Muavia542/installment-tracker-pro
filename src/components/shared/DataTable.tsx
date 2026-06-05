import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Download } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function TableToolbar({ children }: { children?: React.ReactNode }) {
  const { t } = useApp();
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder={t("search")} className="ps-9" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="default" className="gap-2"><SlidersHorizontal className="w-4 h-4" /> {t("filter")}</Button>
        <Button variant="outline" size="default" className="gap-2"><Download className="w-4 h-4" /> {t("export")}</Button>
        {children}
      </div>
    </div>
  );
}

export function DataTable({ columns, rows }: { columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 text-start font-medium text-muted-foreground text-xs uppercase tracking-wider">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t hover:bg-muted/30 transition">
                {r.map((cell, j) => (
                  <td key={j} className="px-4 py-3.5 align-middle">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

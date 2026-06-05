import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-success/10 text-success border-success/20",
    active: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-muted text-muted-foreground border-border",
    pending: "bg-warning/15 text-warning-foreground border-warning/30",
    overdue: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize",
      styles[status] ?? "bg-muted text-muted-foreground border-border"
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full",
        status === "paid" || status === "active" ? "bg-success" :
        status === "pending" ? "bg-warning" :
        status === "overdue" ? "bg-destructive" : "bg-muted-foreground"
      )} />
      {status}
    </span>
  );
}

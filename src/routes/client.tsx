import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/layouts/AppShell";

export const Route = createFileRoute("/client")({
  component: () => <AppShell role="client"><Outlet /></AppShell>,
});

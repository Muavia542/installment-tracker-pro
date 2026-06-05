import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useApp, dict } from "@/lib/app-context";
import { Logo } from "@/components/shared/Logo";
import { ThemeLangSwitcher } from "@/components/shared/ThemeLangSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard, Users, FileText, CreditCard, Receipt, Settings as SettingsIcon,
  Search, Bell, Menu, X, LogOut, User as UserIcon, type LucideIcon
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { to: string; labelKey: keyof typeof dict; icon: LucideIcon };

const adminNav: NavItem[] = [
  { to: "/admin/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { to: "/admin/clients", labelKey: "clients", icon: Users },
  { to: "/admin/deals", labelKey: "deals", icon: FileText },
  { to: "/admin/payments", labelKey: "payments", icon: CreditCard },
  { to: "/admin/receipts", labelKey: "receipts", icon: Receipt },
  { to: "/admin/settings", labelKey: "settings", icon: SettingsIcon },
];

const clientNav: NavItem[] = [
  { to: "/client/dashboard", labelKey: "dashboard", icon: LayoutDashboard },
  { to: "/client/deals", labelKey: "myDeals", icon: FileText },
  { to: "/client/payments", labelKey: "paymentHistory", icon: CreditCard },
  { to: "/client/receipts", labelKey: "receipts", icon: Receipt },
  { to: "/client/profile", labelKey: "profile", icon: UserIcon },
];

export function AppShell({ role, children }: { role: "admin" | "client"; children?: ReactNode }) {
  const { t, dir } = useApp();
  const location = useLocation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const items = role === "admin" ? adminNav : clientNav;
  const displayName = role === "admin" ? "Imran Sheikh" : "Ahmed Khan";
  const initial = displayName.charAt(0);

  const SideContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b">
        <Logo to={role === "admin" ? "/admin/dashboard" : "/client/dashboard"} />
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-soft)]"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn("w-[18px] h-[18px]", active && "text-primary")} />
              <span>{t(item.labelKey)}</span>
              {active && <span className="ms-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t">
        <div className="rounded-xl bg-[image:var(--gradient-card)] p-4 border">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Pro Plan</p>
          <p className="text-xs text-muted-foreground mt-1">Unlimited deals & clients</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex" dir={dir}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-e bg-sidebar fixed inset-y-0 start-0 z-30">
        {SideContent}
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative w-72 bg-sidebar border-e flex flex-col">
            <button className="absolute top-4 end-4 p-1 rounded-md hover:bg-muted" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
            {SideContent}
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ps-64 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
          <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t("search")} className="ps-9 bg-muted/50 border-0 focus-visible:ring-1" />
            </div>
            <div className="flex-1 sm:hidden" />
            <ThemeLangSwitcher compact />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 end-2 w-2 h-2 rounded-full bg-destructive" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ps-2 pe-1 py-1 rounded-full hover:bg-muted transition">
                  <div className="w-8 h-8 rounded-full bg-[image:var(--gradient-primary)] grid place-items-center text-primary-foreground font-semibold text-sm">
                    {initial}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{displayName}</div>
                  <div className="text-xs text-muted-foreground font-normal capitalize">{t(role)}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => nav({ to: role === "admin" ? "/admin/settings" : "/client/profile" })}>
                  <UserIcon className="w-4 h-4 me-2" /> {t("profile")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => nav({ to: "/" })}>
                  <LogOut className="w-4 h-4 me-2" /> {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-[1400px] w-full mx-auto">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}

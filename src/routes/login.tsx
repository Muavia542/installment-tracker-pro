import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, User } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Installment Tracker Pro" }] }),
  component: Login,
});

function Login() {
  const { t } = useApp();
  const [role, setRole] = useState<"admin" | "client">("admin");
  const nav = useNavigate();
  return (
    <AuthLayout title={t("signIn")} subtitle={t("welcomeBack")}>
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
        {(["admin", "client"] as const).map(r => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${role === r ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
          >
            {r === "admin" ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
            {t(r)}
          </button>
        ))}
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nav({ to: role === "admin" ? "/admin/dashboard" : "/client/dashboard" }); }}>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" placeholder="you@example.com" defaultValue={role === "admin" ? "admin@itp.com" : "client@itp.com"} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("password")}</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">{t("forgotPassword")}</Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" defaultValue="demo1234" />
        </div>
        <Button type="submit" className="w-full h-11">{t("continueAs")} {t(role)}</Button>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        {t("noAccount")} <Link to="/signup" className="text-primary font-medium hover:underline">{t("signUp")}</Link>
      </p>
    </AuthLayout>
  );
}

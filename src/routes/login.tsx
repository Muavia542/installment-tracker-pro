import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Installment Tracker Pro" }] }),
  component: Login,
});

function Login() {
  const { t } = useApp();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@tracker.com");
  const [password, setPassword] = useState("Admin123");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    // Get role and redirect
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user!.id)
      .maybeSingle();
    const role = roleRow?.role ?? "client";
    toast.success(`Welcome back!`);
    nav({ to: role === "admin" ? "/admin/dashboard" : "/client/dashboard" });
  }

  return (
    <AuthLayout title={t("signIn")} subtitle={t("welcomeBack")}>
      <div className="rounded-xl border border-primary/20 bg-primary-soft/40 p-3 text-xs space-y-1">
        <p className="font-semibold text-primary">Demo accounts</p>
        <p><span className="font-mono">admin@tracker.com</span> / <span className="font-mono">Admin123</span></p>
        <p><span className="font-mono">customer@tracker.com</span> / <span className="font-mono">Customer123</span></p>
      </div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("password")}</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">{t("forgotPassword")}</Link>
          </div>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full h-11" disabled={loading}>
          {loading ? "Signing in…" : t("signIn")}
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        {t("noAccount")} <Link to="/signup" className="text-primary font-medium hover:underline">{t("signUp")}</Link>
      </p>
    </AuthLayout>
  );
}

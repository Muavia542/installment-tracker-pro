import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Installment Tracker Pro" }] }),
  component: Signup,
});

function Signup() {
  const { t } = useApp();
  const nav = useNavigate();
  return (
    <AuthLayout title={t("signUp")} subtitle="Start tracking installments in minutes.">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); nav({ to: "/client/dashboard" }); }}>
        <div className="space-y-2">
          <Label htmlFor="name">{t("fullName")}</Label>
          <Input id="name" placeholder="Ahmed Khan" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input id="phone" placeholder="+92 300 0000000" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">{t("confirmPassword")}</Label>
          <Input id="confirm" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full h-11">{t("getStarted")}</Button>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        {t("haveAccount")} <Link to="/login" className="text-primary font-medium hover:underline">{t("signIn")}</Link>
      </p>
    </AuthLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Installment Tracker Pro" }] }),
  component: Forgot,
});

function Forgot() {
  const { t } = useApp();
  return (
    <AuthLayout title={t("resetPassword")} subtitle="We'll send a reset link to your email.">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent! Check your email."); }}>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button type="submit" className="w-full h-11">{t("sendResetLink")}</Button>
      </form>
      <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
        <ArrowLeft className="w-4 h-4 rtl-flip" /> {t("backToLogin")}
      </Link>
    </AuthLayout>
  );
}

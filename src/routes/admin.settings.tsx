import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/lib/app-context";
import { Languages, Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Installment Tracker Pro" }] }),
  component: Settings,
});

function Settings() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  return (
    <>
      <PageHeader title={t("settings")} subtitle="Workspace preferences and account." />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <SectionCard title={t("account")}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("fullName")} defaultValue="Imran Sheikh" />
              <Field label={t("email")} type="email" defaultValue="admin@itp.com" />
              <Field label={t("phone")} defaultValue="+92 300 0000000" />
              <Field label="Business Name" defaultValue="Sheikh Electronics" />
            </div>
            <div className="flex justify-end mt-4"><Button>Save changes</Button></div>
          </SectionCard>

          <SectionCard title={t("notifications")}>
            {[
              ["Email notifications", "Get notified about new payments & overdue alerts."],
              ["SMS alerts", "Critical alerts via SMS."],
              ["Weekly digest", "A summary of activity every Monday."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-center justify-between py-3 border-t first:border-t-0">
                <div>
                  <p className="font-medium text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title={t("language")}>
            <div className="grid grid-cols-2 gap-2">
              {(["en", "ur"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`p-4 rounded-xl border text-start transition ${lang === l ? "border-primary bg-primary-soft" : "hover:bg-muted/50"}`}>
                  <Languages className="w-4 h-4 text-primary mb-2" />
                  <div className="font-medium text-sm">{l === "en" ? "English" : "اردو"}</div>
                  <div className="text-xs text-muted-foreground">{l === "en" ? "LTR" : "RTL"}</div>
                </button>
              ))}
            </div>
          </SectionCard>
          <SectionCard title={t("theme")}>
            <div className="grid grid-cols-2 gap-2">
              {(["light", "dark"] as const).map(th => (
                <button key={th} onClick={() => setTheme(th)} className={`p-4 rounded-xl border text-start transition ${theme === th ? "border-primary bg-primary-soft" : "hover:bg-muted/50"}`}>
                  {th === "light" ? <Sun className="w-4 h-4 text-primary mb-2" /> : <Moon className="w-4 h-4 text-primary mb-2" />}
                  <div className="font-medium text-sm capitalize">{th}</div>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="font-display font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input {...props} />
    </div>
  );
}

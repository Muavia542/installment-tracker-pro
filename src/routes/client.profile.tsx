import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/client/profile")({
  head: () => ({ meta: [{ title: "Profile — Installment Tracker Pro" }] }),
  component: Profile,
});

function Profile() {
  const { t } = useApp();
  return (
    <>
      <PageHeader title={t("profile")} subtitle="Your personal information." />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-card p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[image:var(--gradient-primary)] grid place-items-center text-primary-foreground font-display text-3xl font-bold">A</div>
          <p className="mt-4 font-display font-bold text-lg">Ahmed Khan</p>
          <p className="text-sm text-muted-foreground">Client · C-1042</p>
          <Button variant="outline" size="sm" className="mt-4">Change photo</Button>
        </div>
        <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">Personal details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={t("fullName")} defaultValue="Ahmed Khan" />
            <Field label={t("email")} type="email" defaultValue="ahmed@example.com" />
            <Field label={t("phone")} defaultValue="+92 300 1234567" />
            <Field label="CNIC" defaultValue="35202-1234567-8" />
            <div className="sm:col-span-2"><Field label="Address" defaultValue="House 12, Street 4, Lahore" /></div>
          </div>
          <div className="flex justify-end mt-5"><Button>Save changes</Button></div>
        </div>
      </div>
    </>
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

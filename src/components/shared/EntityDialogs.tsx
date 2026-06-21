import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { listProfiles, listDeals } from "@/lib/queries";

/* ---------- Add Client (creates an auth user) ---------- */
export function AddClientDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password || `${Math.random().toString(36).slice(2, 10)}A1!`,
      options: { data: { full_name: form.full_name, phone: form.phone, role: "client" } },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Client created");
    setOpen(false);
    setForm({ full_name: "", email: "", phone: "", password: "" });
    qc.invalidateQueries({ queryKey: ["profiles"] });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Client</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5"><Label>Full name</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Temporary password</Label><Input type="text" placeholder="Auto-generate if blank" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={6} /></div>
          <DialogFooter><Button type="submit" disabled={loading}>{loading ? "Creating…" : "Create client"}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- New Deal ---------- */
export function NewDealDialog({ trigger, defaultClientId }: { trigger: React.ReactNode; defaultClientId?: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    client_id: defaultClientId ?? "",
    item_name: "",
    item_cost_price: "",
    deal_total_price: "",
    duration_months: "12",
    installment_frequency: "monthly",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const { data: clients } = useQuery({ queryKey: ["profiles"], queryFn: listProfiles, enabled: open });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.client_id) return toast.error("Select a client");
    setLoading(true);
    const total = Number(form.deal_total_price);
    const { error } = await supabase.from("deals").insert({
      client_id: form.client_id,
      item_name: form.item_name,
      item_cost_price: Number(form.item_cost_price || 0),
      deal_total_price: total,
      remaining_balance: total,
      duration_months: Number(form.duration_months),
      installment_frequency: form.installment_frequency,
      notes: form.notes || null,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Deal created");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["deals"] });
    qc.invalidateQueries({ queryKey: ["adminKpis"] });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>New Deal</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5">
            <Label>Client</Label>
            <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
              <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
              <SelectContent>
                {(clients ?? []).map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.full_name || c.email}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label>Item (e.g. Smartphone, Motorcycle, custom)</Label><Input required value={form.item_name} onChange={(e) => setForm({ ...form, item_name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Item cost price</Label><Input type="number" step="0.01" value={form.item_cost_price} onChange={(e) => setForm({ ...form, item_cost_price: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Agreed total</Label><Input required type="number" step="0.01" value={form.deal_total_price} onChange={(e) => setForm({ ...form, deal_total_price: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Duration (months)</Label><Input type="number" value={form.duration_months} onChange={(e) => setForm({ ...form, duration_months: e.target.value })} /></div>
            <div className="space-y-1.5">
              <Label>Frequency</Label>
              <Select value={form.installment_frequency} onValueChange={(v) => setForm({ ...form, installment_frequency: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5"><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <DialogFooter><Button type="submit" disabled={loading}>{loading ? "Saving…" : "Create deal"}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Record Payment ---------- */
export function RecordPaymentDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ deal_id: "", amount_paid: "", payment_method: "cash", notes: "" });
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const { data: deals } = useQuery({ queryKey: ["deals"], queryFn: () => listDeals(), enabled: open });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const deal = (deals ?? []).find((d) => d.id === form.deal_id);
    if (!deal) return toast.error("Select a deal");
    setLoading(true);
    const { error } = await supabase.from("payments").insert({
      deal_id: deal.id,
      client_id: deal.client_id,
      amount_paid: Number(form.amount_paid),
      payment_method: form.payment_method,
      notes: form.notes || null,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Payment recorded — balance updated");
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["payments"] });
    qc.invalidateQueries({ queryKey: ["deals"] });
    qc.invalidateQueries({ queryKey: ["adminKpis"] });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5">
            <Label>Deal</Label>
            <Select value={form.deal_id} onValueChange={(v) => setForm({ ...form, deal_id: v })}>
              <SelectTrigger><SelectValue placeholder="Select deal" /></SelectTrigger>
              <SelectContent>
                {(deals ?? []).filter((d) => d.status !== "completed").map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.item_name} — Bal {Number(d.remaining_balance).toLocaleString()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Amount</Label><Input required type="number" step="0.01" value={form.amount_paid} onChange={(e) => setForm({ ...form, amount_paid: e.target.value })} /></div>
            <div className="space-y-1.5">
              <Label>Method</Label>
              <Select value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="jazzcash">JazzCash</SelectItem>
                  <SelectItem value="easypaisa">Easypaisa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5"><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          <DialogFooter><Button type="submit" disabled={loading}>{loading ? "Saving…" : "Record payment"}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { supabase } from "@/integrations/supabase/client";

export type Deal = {
  id: string;
  client_id: string;
  item_name: string;
  item_cost_price: number;
  deal_total_price: number;
  remaining_balance: number;
  duration_months: number;
  installment_frequency: string;
  start_date: string;
  status: string;
  notes: string | null;
  created_at: string;
};

export type Payment = {
  id: string;
  deal_id: string;
  client_id: string;
  amount_paid: number;
  payment_date: string;
  payment_method: string;
  receipt_number: string;
  notes: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
};

export const money = (n: number | null | undefined) =>
  `PKR ${Number(n ?? 0).toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

export async function listProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Profile[];
}

export async function listDeals(clientId?: string): Promise<Deal[]> {
  let q = supabase.from("deals").select("*").order("created_at", { ascending: false });
  if (clientId) q = q.eq("client_id", clientId);
  const { data, error } = await q;
  if (error) throw error;
  return data as Deal[];
}

export async function listPayments(clientId?: string): Promise<Payment[]> {
  let q = supabase.from("payments").select("*").order("payment_date", { ascending: false });
  if (clientId) q = q.eq("client_id", clientId);
  const { data, error } = await q;
  if (error) throw error;
  return data as Payment[];
}

export async function adminKpis() {
  const [{ data: deals }, { data: payments }, { count: clientCount }] = await Promise.all([
    supabase.from("deals").select("deal_total_price, remaining_balance, status"),
    supabase.from("payments").select("amount_paid"),
    supabase.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "client"),
  ]);
  const totalRevenue = (deals ?? []).reduce((s: number, d: any) => s + Number(d.deal_total_price), 0);
  const totalCollected = (payments ?? []).reduce((s: number, p: any) => s + Number(p.amount_paid), 0);
  const outstanding = (deals ?? []).reduce((s: number, d: any) => s + Number(d.remaining_balance), 0);
  const active = (deals ?? []).filter((d: any) => d.status === "active").length;
  return { totalRevenue, totalCollected, outstanding, active, clients: clientCount ?? 0 };
}

export async function clientKpis(clientId: string) {
  const [{ data: deals }, { data: payments }] = await Promise.all([
    supabase.from("deals").select("deal_total_price, remaining_balance, status").eq("client_id", clientId),
    supabase.from("payments").select("amount_paid").eq("client_id", clientId),
  ]);
  const totalPaid = (payments ?? []).reduce((s: number, p: any) => s + Number(p.amount_paid), 0);
  const remaining = (deals ?? []).reduce((s: number, d: any) => s + Number(d.remaining_balance), 0);
  const active = (deals ?? []).filter((d: any) => d.status === "active").length;
  return { totalPaid, remaining, active, totalDeals: (deals ?? []).length };
}

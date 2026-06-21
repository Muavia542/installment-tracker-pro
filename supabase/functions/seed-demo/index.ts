// One-shot seeder: creates the two demo users (admin + client) and sample deals/payments.
// Safe to call multiple times — it short-circuits if data already exists.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const users = [
    { email: "admin@tracker.com", password: "Admin123", role: "admin", full_name: "Admin User" },
    { email: "customer@tracker.com", password: "Customer123", role: "client", full_name: "Customer User" },
  ];

  const ids: Record<string, string> = {};

  for (const u of users) {
    // Try create; if already exists, fetch existing id.
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { full_name: u.full_name, role: u.role },
    });
    if (data?.user) {
      ids[u.role] = data.user.id;
    } else if (error) {
      // fallback: list users and find
      const { data: list } = await supabase.auth.admin.listUsers();
      const found = list?.users.find((x) => x.email === u.email);
      if (found) ids[u.role] = found.id;
    }
    // Ensure role row exists
    if (ids[u.role]) {
      await supabase.from("user_roles").upsert(
        { user_id: ids[u.role], role: u.role },
        { onConflict: "user_id,role" },
      );
    }
  }

  const clientId = ids["client"];
  if (clientId) {
    const { count } = await supabase
      .from("deals")
      .select("id", { count: "exact", head: true })
      .eq("client_id", clientId);

    if (!count) {
      // Sample completed deal: Smartphone
      const { data: d1 } = await supabase.from("deals").insert({
        client_id: clientId,
        item_name: "Smartphone — iPhone 15",
        item_cost_price: 850,
        deal_total_price: 1200,
        remaining_balance: 1200,
        duration_months: 6,
        installment_frequency: "monthly",
        status: "active",
        notes: "Initial demo deal",
      }).select().single();

      if (d1) {
        // Pay it fully
        await supabase.from("payments").insert([
          { deal_id: d1.id, client_id: clientId, amount_paid: 600, payment_method: "card", notes: "Down payment" },
          { deal_id: d1.id, client_id: clientId, amount_paid: 600, payment_method: "bank_transfer", notes: "Final payment" },
        ]);
      }

      // Active deal: Motorcycle
      const { data: d2 } = await supabase.from("deals").insert({
        client_id: clientId,
        item_name: "Motorcycle — Honda CB",
        item_cost_price: 3200,
        deal_total_price: 4500,
        remaining_balance: 4500,
        duration_months: 12,
        installment_frequency: "monthly",
        status: "active",
        notes: "12-month plan",
      }).select().single();

      if (d2) {
        await supabase.from("payments").insert([
          { deal_id: d2.id, client_id: clientId, amount_paid: 1000, payment_method: "cash", notes: "First installment" },
          { deal_id: d2.id, client_id: clientId, amount_paid: 500, payment_method: "card", notes: "Second installment" },
        ]);
      }
    }
  }

  return new Response(JSON.stringify({ ok: true, ids }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

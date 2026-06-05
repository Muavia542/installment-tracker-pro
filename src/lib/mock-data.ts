export const kpis = {
  admin: [
    { key: "totalRevenue", value: "PKR 12.4M", change: "+12.5%", trend: "up" as const },
    { key: "activeDeals", value: "284", change: "+18", trend: "up" as const },
    { key: "totalClients", value: "1,429", change: "+42", trend: "up" as const },
    { key: "overdue", value: "PKR 380K", change: "-8%", trend: "down" as const },
  ],
  client: [
    { key: "totalPaid", value: "PKR 145,000", change: "of PKR 320,000", trend: "up" as const },
    { key: "remainingBalance", value: "PKR 175,000", change: "across 7 installments", trend: "up" as const },
    { key: "nextPayment", value: "PKR 25,000", change: "Due Dec 15", trend: "up" as const },
    { key: "activeDeals", value: "3", change: "1 completing soon", trend: "up" as const },
  ],
};

export const revenueChart = [
  { month: "Jan", revenue: 820000, collected: 720000 },
  { month: "Feb", revenue: 950000, collected: 880000 },
  { month: "Mar", revenue: 1100000, collected: 980000 },
  { month: "Apr", revenue: 1240000, collected: 1180000 },
  { month: "May", revenue: 1380000, collected: 1290000 },
  { month: "Jun", revenue: 1520000, collected: 1410000 },
  { month: "Jul", revenue: 1680000, collected: 1550000 },
  { month: "Aug", revenue: 1820000, collected: 1690000 },
];

export const statusChart = [
  { name: "Paid", value: 68, fill: "var(--success)" },
  { name: "Pending", value: 24, fill: "var(--warning)" },
  { name: "Overdue", value: 8, fill: "var(--destructive)" },
];

export const clientsList = [
  { id: "C-1042", name: "Ahmed Khan", email: "ahmed@example.com", phone: "+92 300 1234567", deals: 3, balance: "PKR 240,000", status: "active" },
  { id: "C-1043", name: "Fatima Ali", email: "fatima@example.com", phone: "+92 301 9876543", deals: 1, balance: "PKR 85,000", status: "active" },
  { id: "C-1044", name: "Hassan Raza", email: "hassan@example.com", phone: "+92 302 5551234", deals: 2, balance: "PKR 0", status: "completed" },
  { id: "C-1045", name: "Ayesha Malik", email: "ayesha@example.com", phone: "+92 303 7778888", deals: 4, balance: "PKR 520,000", status: "active" },
  { id: "C-1046", name: "Bilal Ahmed", email: "bilal@example.com", phone: "+92 304 1112222", deals: 1, balance: "PKR 45,000", status: "overdue" },
  { id: "C-1047", name: "Sana Iqbal", email: "sana@example.com", phone: "+92 305 3334444", deals: 2, balance: "PKR 130,000", status: "active" },
];

export const dealsList = [
  { id: "D-2841", client: "Ahmed Khan", product: "iPhone 15 Pro", total: "PKR 380,000", paid: "PKR 140,000", installments: "6/12", nextDue: "2026-06-15", status: "active" },
  { id: "D-2842", client: "Fatima Ali", product: "Honda CD 70", total: "PKR 165,000", paid: "PKR 80,000", installments: "4/10", nextDue: "2026-06-20", status: "active" },
  { id: "D-2843", client: "Ayesha Malik", product: "Samsung S24 Ultra", total: "PKR 450,000", paid: "PKR 450,000", installments: "12/12", nextDue: "—", status: "completed" },
  { id: "D-2844", client: "Bilal Ahmed", product: "Dell XPS 15 Laptop", total: "PKR 320,000", paid: "PKR 80,000", installments: "2/8", nextDue: "2026-05-30", status: "overdue" },
  { id: "D-2845", client: "Sana Iqbal", product: "Refrigerator LG", total: "PKR 180,000", paid: "PKR 60,000", installments: "3/9", nextDue: "2026-06-12", status: "active" },
];

export const paymentsList = [
  { id: "P-9821", deal: "D-2841", client: "Ahmed Khan", amount: "PKR 25,000", date: "2026-06-04", method: "Bank Transfer", status: "paid" },
  { id: "P-9822", deal: "D-2842", client: "Fatima Ali", amount: "PKR 18,000", date: "2026-06-03", method: "JazzCash", status: "paid" },
  { id: "P-9823", deal: "D-2844", client: "Bilal Ahmed", amount: "PKR 40,000", date: "2026-05-30", method: "Cash", status: "overdue" },
  { id: "P-9824", deal: "D-2845", client: "Sana Iqbal", amount: "PKR 20,000", date: "2026-06-02", method: "Easypaisa", status: "paid" },
  { id: "P-9825", deal: "D-2841", client: "Ahmed Khan", amount: "PKR 25,000", date: "2026-07-15", method: "Bank Transfer", status: "pending" },
];

export const receiptsList = paymentsList.filter(p => p.status === "paid").map(p => ({
  id: `RCP-${p.id.slice(2)}`,
  payment: p.id,
  client: p.client,
  amount: p.amount,
  date: p.date,
}));

export const activity = [
  { who: "Ahmed Khan", what: "paid installment", when: "2 hours ago", amount: "PKR 25,000" },
  { who: "Fatima Ali", what: "paid installment", when: "5 hours ago", amount: "PKR 18,000" },
  { who: "New deal created for Sana Iqbal", what: "", when: "1 day ago", amount: "PKR 180,000" },
  { who: "Bilal Ahmed", what: "payment overdue", when: "2 days ago", amount: "PKR 40,000" },
];

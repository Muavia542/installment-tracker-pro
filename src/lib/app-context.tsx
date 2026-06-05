import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ur";
type Theme = "light" | "dark";

type Dict = Record<string, { en: string; ur: string }>;

export const dict: Dict = {
  appName: { en: "Installment Tracker Pro", ur: "اقساط ٹریکر پرو" },
  tagline: { en: "Track installments. Get paid. Stay organized.", ur: "اقساط ٹریک کریں۔ ادائیگی پائیں۔ منظم رہیں۔" },
  heroSub: { en: "The all-in-one platform for managing installment deals, payments, and receipts — built for modern businesses.", ur: "اقساط کے سودوں، ادائیگیوں اور رسیدوں کے انتظام کے لیے ایک مکمل پلیٹ فارم۔" },
  getStarted: { en: "Get Started Free", ur: "مفت شروع کریں" },
  signIn: { en: "Sign In", ur: "سائن ان" },
  signUp: { en: "Sign Up", ur: "سائن اپ" },
  signOut: { en: "Sign Out", ur: "سائن آؤٹ" },
  email: { en: "Email", ur: "ای میل" },
  password: { en: "Password", ur: "پاس ورڈ" },
  confirmPassword: { en: "Confirm Password", ur: "پاس ورڈ کی تصدیق" },
  fullName: { en: "Full Name", ur: "پورا نام" },
  phone: { en: "Phone", ur: "فون" },
  forgotPassword: { en: "Forgot password?", ur: "پاس ورڈ بھول گئے؟" },
  rememberMe: { en: "Remember me", ur: "مجھے یاد رکھیں" },
  resetPassword: { en: "Reset Password", ur: "پاس ورڈ ری سیٹ کریں" },
  sendResetLink: { en: "Send reset link", ur: "ری سیٹ لنک بھیجیں" },
  backToLogin: { en: "Back to login", ur: "واپس لاگ ان پر" },
  noAccount: { en: "Don't have an account?", ur: "اکاؤنٹ نہیں ہے؟" },
  haveAccount: { en: "Already have an account?", ur: "پہلے سے اکاؤنٹ ہے؟" },
  continueAs: { en: "Continue as", ur: "بطور جاری رکھیں" },
  admin: { en: "Admin", ur: "ایڈمن" },
  client: { en: "Client", ur: "کلائنٹ" },
  dashboard: { en: "Dashboard", ur: "ڈیش بورڈ" },
  clients: { en: "Clients", ur: "کلائنٹس" },
  deals: { en: "Deals", ur: "سودے" },
  payments: { en: "Payments", ur: "ادائیگیاں" },
  receipts: { en: "Receipts", ur: "رسیدیں" },
  settings: { en: "Settings", ur: "ترتیبات" },
  myDeals: { en: "My Deals", ur: "میرے سودے" },
  paymentHistory: { en: "Payment History", ur: "ادائیگی کی تاریخ" },
  profile: { en: "Profile", ur: "پروفائل" },
  totalRevenue: { en: "Total Revenue", ur: "کل آمدنی" },
  activeDeals: { en: "Active Deals", ur: "فعال سودے" },
  totalClients: { en: "Total Clients", ur: "کل کلائنٹس" },
  overdue: { en: "Overdue", ur: "زائدالمیعاد" },
  collected: { en: "Collected", ur: "وصول شدہ" },
  pending: { en: "Pending", ur: "زیر التواء" },
  paid: { en: "Paid", ur: "ادا شدہ" },
  thisMonth: { en: "This month", ur: "اس مہینے" },
  search: { en: "Search...", ur: "تلاش..." },
  filter: { en: "Filter", ur: "فلٹر" },
  export: { en: "Export", ur: "برآمد" },
  newDeal: { en: "New Deal", ur: "نیا سودا" },
  newClient: { en: "Add Client", ur: "کلائنٹ شامل کریں" },
  recordPayment: { en: "Record Payment", ur: "ادائیگی درج کریں" },
  status: { en: "Status", ur: "حالت" },
  amount: { en: "Amount", ur: "رقم" },
  date: { en: "Date", ur: "تاریخ" },
  dueDate: { en: "Due Date", ur: "مقررہ تاریخ" },
  installment: { en: "Installment", ur: "قسط" },
  actions: { en: "Actions", ur: "کارروائیاں" },
  view: { en: "View", ur: "دیکھیں" },
  download: { en: "Download", ur: "ڈاؤن لوڈ" },
  noData: { en: "Nothing here yet", ur: "ابھی کچھ نہیں ہے" },
  noDataDesc: { en: "Get started by creating your first item.", ur: "اپنا پہلا آئٹم بنا کر شروع کریں۔" },
  loading: { en: "Loading...", ur: "لوڈ ہو رہا ہے..." },
  revenueOverview: { en: "Revenue Overview", ur: "آمدنی کا جائزہ" },
  paymentStatus: { en: "Payment Status", ur: "ادائیگی کی حالت" },
  recentActivity: { en: "Recent Activity", ur: "حالیہ سرگرمی" },
  upcomingPayments: { en: "Upcoming Payments", ur: "آنے والی ادائیگیاں" },
  welcomeBack: { en: "Welcome back", ur: "خوش آمدید" },
  overview: { en: "Here's what's happening today.", ur: "آج کیا ہو رہا ہے۔" },
  language: { en: "Language", ur: "زبان" },
  theme: { en: "Theme", ur: "تھیم" },
  notifications: { en: "Notifications", ur: "اطلاعات" },
  account: { en: "Account", ur: "اکاؤنٹ" },
  features: { en: "Features", ur: "خصوصیات" },
  pricing: { en: "Pricing", ur: "قیمتیں" },
  about: { en: "About", ur: "بارے میں" },
  nextPayment: { en: "Next Payment", ur: "اگلی ادائیگی" },
  totalPaid: { en: "Total Paid", ur: "کل ادا شدہ" },
  remainingBalance: { en: "Remaining Balance", ur: "بقایا رقم" },
};

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  t: (key: keyof typeof dict) => string;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const saved = localStorage.getItem("itp-lang") as Lang | null;
    const savedTheme = localStorage.getItem("itp-theme") as Theme | null;
    if (saved) setLang(saved);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    localStorage.setItem("itp-lang", lang);
  }, [lang]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("itp-theme", theme);
  }, [theme]);

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);
  const dir = lang === "ur" ? "rtl" : "ltr";

  return <AppCtx.Provider value={{ lang, dir, theme, setLang, setTheme, t }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}

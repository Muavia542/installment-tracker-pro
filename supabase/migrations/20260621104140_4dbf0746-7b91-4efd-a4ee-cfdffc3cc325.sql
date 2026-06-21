
-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'client');

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- USER ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- DEALS
CREATE TABLE public.deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  item_cost_price numeric(12,2) NOT NULL DEFAULT 0,
  deal_total_price numeric(12,2) NOT NULL,
  remaining_balance numeric(12,2) NOT NULL,
  duration_months integer NOT NULL DEFAULT 1,
  installment_frequency text NOT NULL DEFAULT 'monthly',
  start_date date NOT NULL DEFAULT current_date,
  status text NOT NULL DEFAULT 'active',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deals TO authenticated;
GRANT ALL ON public.deals TO service_role;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- PAYMENTS
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_paid numeric(12,2) NOT NULL,
  payment_date date NOT NULL DEFAULT current_date,
  payment_method text NOT NULL DEFAULT 'cash',
  receipt_number text NOT NULL DEFAULT ('RCP-' || substr(gen_random_uuid()::text, 1, 8)),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- POLICIES: profiles
CREATE POLICY "profiles_self_select" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_admin_insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- POLICIES: user_roles
CREATE POLICY "user_roles_self_select" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- POLICIES: deals
CREATE POLICY "deals_select" ON public.deals FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "deals_admin_insert" ON public.deals FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "deals_admin_update" ON public.deals FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "deals_admin_delete" ON public.deals FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- POLICIES: payments
CREATE POLICY "payments_select" ON public.payments FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "payments_admin_insert" ON public.payments FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "payments_admin_update" ON public.payments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "payments_admin_delete" ON public.payments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- TRIGGER: auto-create profile + default 'client' role on new auth user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  );
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'client'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TRIGGER: auto-deduct remaining_balance on payment insert
CREATE OR REPLACE FUNCTION public.apply_payment_to_deal()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.deals
  SET remaining_balance = GREATEST(remaining_balance - NEW.amount_paid, 0),
      status = CASE WHEN remaining_balance - NEW.amount_paid <= 0 THEN 'completed' ELSE status END
  WHERE id = NEW.deal_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_payment_insert
AFTER INSERT ON public.payments
FOR EACH ROW EXECUTE FUNCTION public.apply_payment_to_deal();

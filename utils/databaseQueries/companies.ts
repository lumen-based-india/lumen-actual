import { createClient } from "@supabase/supabase-js";

export const fetchCompanyById = async (id: string) => {
  const response = await fetch(`/api/company/${id}`);
  const data = await response.json();
  return data;
};

export const fetchProductsByCompanyID = async (id: string) => {
  const response = await fetch(`/api/product/${id}`);
  const data = await response.json();
  return data;
};
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
export const getCompany = async (id: string) => {
  const { data, error } = await supabase
    .from("esg_facts")
    .select(`*, companies(*)`)
    .eq("company_id", id)
    .single();
  return { data, error };
};
export const getCompanies = async () => {
  const { data, error } = await supabase.from("companies").select(`*`);
  return { data, error };
};

export const FetchSuppliersByID = async (id: string) => {
  const response = await fetch(`/api/suppliers/${id}`);
  const data = await response.json();
  return data;
};

export const GetAllCompanies = async () => {
  const response = await fetch(`/api/company`);
  const data = await response.json();
  return data;
};

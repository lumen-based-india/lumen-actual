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

export const GetAllProducts = async (company_id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(`*`)
    .eq("company_id", company_id);
  return { data, error };
};
export const GetAllProductsAPI = async (company_id: string) => {
  const response = await fetch(`/api/product/company`);
  const data = await response.json();
  return data;
};

export const getCompanyUsingWallet = async (wallet: string) => {
  const { data, error } = await supabase
    .from("companies")
    .select(`*,esg_facts(*)`)
    .eq("wallet_address", wallet)
    .single();
  return { data, error };
};

export const updateCompanyWallet = async (id: string, wallet: string) => {
  const { data, error } = await supabase
    .from("companies")
    .update({ wallet_address: wallet })
    .eq("company_id", id);
  return { data, error };
};

export const updateCompanyExcessEmissions = async (
  wallet: string,
  id: string,
  excessEmissions: number,
) => {
  const currentCompany = await getCompanyUsingWallet(wallet);
  const newExcessEmissions = Number(currentCompany.data.excess_carbon_emissions) - excessEmissions;
  const { data, error } = await supabase
    .from("companies")
    .update({ excess_carbon_emissions: String(newExcessEmissions) })
    .eq("company_id", id);
  return { data, error };
};

export const getProductJourney = async (id: string) => {
  const response = await fetch(`/api/product/trace/${id}`);
  const data = await response.json();
  return data;
};
export const getProductTrace = async (trace: string) => {
  const productIds = trace.split("-");
  const productData = [];
  for (const id of productIds) {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    productData.push(data);
  }
  return productData;
};

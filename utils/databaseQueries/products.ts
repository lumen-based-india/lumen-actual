import { supabase } from "./companies";

export const getProductsByCompanyID = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(`*, companies(*)`)
    .eq("company_id", id);
  return { data, error };
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(`*`)
    .eq("product_id", id).single();
  return { data, error };
};

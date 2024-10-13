import { supabase } from "./companies";

export const getProductsByCompanyID = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(`*, companies(*)`)
    .eq("company_id", id);
  return { data, error };
};

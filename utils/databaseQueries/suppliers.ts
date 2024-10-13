import { supabase } from "./companies";

// Function to extract prior product IDs from the dpp_trace string
function getIdsArrayBeforeProduct(dpp_trace: string, product_id: string) {
  const ids = dpp_trace.split("-");
  const productIndex = ids.indexOf(String(product_id));
  if (productIndex !== -1) {
    return ids.slice(0, productIndex);
  }
  return [];
}

// Function to get supplier information for a given company ID
export const getSuppliersForCompanyID = async (id: string) => {
  const suppliers: any[] = [];
  const companies: any[] = [];
  const companyIds = new Set<string>(); // Use a Set to ensure unique company IDs
  // Fetch products data for the given company ID
  const { data, error } = await supabase
    .from("products")
    .select("product_id, dpp_trace")
    .eq("company_id", id);

  if (error) {
    return { data: null, error };
  }
  // Loop through the products and get prior product IDs
  for (let i = 0; i < (data?.length ?? 0); i++) {
    const priorProductsData = getIdsArrayBeforeProduct(
      data![i].dpp_trace,
      data![i].product_id,
    );

    // Fetch supplier data for each prior product ID
    for (let j = 0; j < priorProductsData.length; j++) {
      const { data: supplierData, error: supplierError } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", priorProductsData[j])
        .single();

      if (supplierError) {
        return { data: null, error: supplierError };
      }

      suppliers.push(supplierData); // Add supplier data to suppliers array
      companyIds.add(supplierData.company_id); // Add company ID to Set
    }
  }
  // Fetch company data for all unique company IDs in parallel using Promise.all
  const companyDataPromises = Array.from(companyIds).map(async (companyId) => {
    const { data: companyData, error: companyError } = await supabase
      .from("esg_facts")
      .select(
        `
        *,
        companies(*)
    `,
      )
      .eq("company_id", companyId)
      .single();
    if (companyError) {
      return { data: null, error: companyError };
    }
    companies.push(companyData);
  });

  const companyData = await Promise.all(companyDataPromises);

  return { suppliers, companies: companies, error: null };
};

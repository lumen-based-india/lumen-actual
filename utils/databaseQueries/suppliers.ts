import { supabase } from "./companies";

// Function to extract prior product IDs from the dpp_trace string

// Function to get supplier information for a given company ID
export const getSuppliersForCompanyID = async (companyId: string) => {
  const productCategoryMap = new Map<string, Set<string>>();

  // get all products with product_category : Apparel material
  const { data: apparelData, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("product_category", "Apparel material");

  if (productsError) {
    return { data: null, error: productsError };
  }

  // get all products with product_category : Packaging material
  const { data: packagingData, error: productsError2 } = await supabase
    .from("products")
    .select("*")
    .eq("product_category", "Packaging material");

  if (productsError2) {
    return { data: null, error: productsError2 };
  }

  const productMap: { [key: string]: any[] } = {};

  productMap["Apparel material"] = [];
  productMap["Packaging material"] = [];
  
  // Add apparel data to the map
  const addApparelData = async () => {
    for (const product of apparelData || []) {
      const { data: companyData, error: companyError } = await supabase
        .from("esg_facts")
        .select("*")
        .eq("company_id", product.company_id)
        .single();
  
      if (companyError) {
        console.error("Error fetching company data:", companyError);
        continue; // Skip to the next product if there is an error
      }
  
      const companySustainabilityData = await calculateCompanyData(product.company_id);
      companyData.sustainability = companySustainabilityData;
      console.log("companyData", companyData);
      productMap["Apparel material"].push(companyData);
    }
  };
  
  // Add packaging data to the map
  const addPackagingData = async () => {
    for (const product of packagingData || []) {
      const { data: companyData, error: companyError } = await supabase
        .from("esg_facts")
        .select("*")
        .eq("company_id", product.company_id)
        .single();
  
      if (companyError) {
        console.error("Error fetching company data:", companyError);
        continue; // Skip to the next product if there is an error
      }
  
      const companySustainabilityData = await calculateCompanyData(product.company_id);
      companyData.sustainability = companySustainabilityData;
      productMap["Packaging material"].push(companyData);
      console.log("productMap", productMap);
    }
  };
  
  // Execute both functions and wait for them to finish
  const fetchProductData = async () => {
    await Promise.all([addApparelData(), addPackagingData()]);
    return { productMap, error: null };
  };

  return fetchProductData();
};

export const calculateCompanyData= async (companyId: any) => {
  const { data, error } = await supabase
    .rpc('calculate_company_data', { company_id: companyId })
    .single()
  if (error) {
    console.error('Error calculating company data:', error)
    return
  }
  return data
}
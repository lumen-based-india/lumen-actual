import { supabase } from "./companies";

// Function to extract prior product IDs from the dpp_trace string
function extractPriorProductIds(dpp_trace: string, product_id: any) {
  const ids = dpp_trace.split("-");
  const productIndex = ids.indexOf(String(product_id));
  return productIndex !== -1 ? ids.slice(0, productIndex) : [];
}

// Function to get supplier information for a given company ID
export const getSuppliersForCompanyID = async (companyId: string) => {
  const supplierProducts: any[] = [];
  const companyIds = new Set();

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("product_id, dpp_trace")
    .eq("company_id", companyId);

  if (productsError) {
    return { data: null, error: productsError };
  }

  const fetchSupplierData = async (product: { dpp_trace: any; product_id: any; }) => {
    const priorProductIds = extractPriorProductIds(product.dpp_trace, product.product_id);
    const supplierPromises = priorProductIds.map(async (priorProductId: any) => {
      const { data: supplierProduct, error: supplierError } = await supabase
        .from("products")
        .select("*, companies(*)")
        .eq("product_id", priorProductId)
        .single();

      if (supplierError) {
        throw new Error(supplierError.message); // Throw error for individual supplier fetch
      }
      supplierProducts.push(supplierProduct);
      companyIds.add(supplierProduct.company_id); // Collect unique company IDs
    });

    await Promise.all(supplierPromises);
  };

  await Promise.all(productsData.map(fetchSupplierData));

  // iterate through companyIds and fetch company data
  const companyMap = new Map();

  const companyPromises = Array.from(companyIds).map(async (companyId: any) => {
    const extraData = await calculateCompanyData(companyId);
    companyMap.set(companyId, extraData);
    return extraData;
  });
  const data = await Promise.all(companyPromises);
  var productMap: {
    [category: string]: {[productName: string]: any[]};
  } = {};
  Object.entries(supplierProducts).map(async ([key, value], index) => {
    value.companies.sustainability = companyMap.get(value.companies.company_id);
    if (!productMap[value.product_category]) {
      productMap[value.product_category] = {
        [value.product_name]: [
          value.companies
        ],
      };
    }
    else {
      if (!productMap[value.product_category][value.product_name]) {
        productMap[value.product_category][value.product_name] = [
          value.companies
        ];
      }
      else {
        productMap[value.product_category][value.product_name].push(value.companies);
      }
    }
  });


  return { supplierProducts, productMap: productMap, error: null };
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
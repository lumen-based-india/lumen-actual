import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCompanyById, fetchProductsByCompanyID, FetchSuppliersByID, GetAllCompanies} from "@/utils/databaseQueries/companies";


export type CompanyData = {
  best_performer: number;
  company_id: string;
  company_name: string;
  environmental_score: number;
  esg_rating: number;
  governance_score: number;
  lumens: number;
  market_average: number;
  per_sku_lumens: number;
  performance: number;
  regulation_target: number;
  skus: number;
  social_score: number;
  supply_chain_loop: number;
  intensity_best: number;
  intensity_company: number;
  intensity_target: number;
};

interface ICompanyContext {
  currentCompanyData: CompanyData | null;
  supplierData: UseQueryResult<any | null, Error>;
  productsData: UseQueryResult<any[] | null, Error>;
  allCompaniesData: UseQueryResult<any[] | null, Error>;
  currentCompanyID: string;
  setCurrentCompanyID: (id: string) => void;
}

const CompanyContext = createContext<ICompanyContext | null>(null);

const useCompany = () => {
  const [currentCompanyID, setCurrentCompanyID] = useState("10001");
  const [currentCompanyData, setCurrentCompanyData] = useState<CompanyData | null>(null);

  const allCompaniesData = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await GetAllCompanies();
      return response
    },
  });
  const currentCompany = useQuery({
    queryKey: ["company", currentCompanyID],
    queryFn: async () => {
      const data = await fetchCompanyById(currentCompanyID);
      console.log(data);
      return data;
    },
    enabled: !!currentCompanyID,
  });
  const supplierData = useQuery({
    queryKey: ["suppliers", currentCompanyID],
    queryFn: async () => {
      const data = await FetchSuppliersByID(currentCompanyID);
      return data;
    },
    enabled: !!currentCompanyID,
  });
  const productsData = useQuery({
    queryKey: ["products", currentCompanyID],
    queryFn: async () => {
      const data = await fetchProductsByCompanyID(currentCompanyID);
      // add unique ids to each product
      data.forEach((product: any, index: number) => {
        product.id = index;
      });
      return data
    },
    enabled: !!currentCompanyID,
  });
  
  useEffect(() => {
    if (currentCompany.data) {
      setCurrentCompanyData(currentCompany.data);
    }
  }, [currentCompany.data]);

  return {
    currentCompanyID,
    setCurrentCompanyID,
    allCompaniesData,
    currentCompanyData,
    supplierData,
    productsData,
  };
};

export function ProvideCompany({ children }: PropsWithChildren<any>) {
  const value = useCompany();
  return (
    <CompanyContext.Provider value={{ ...value }}>{children}</CompanyContext.Provider>
  )
}

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("Ensure that the component is wrapped inside ProvideCompany");
  }
  return context;
};
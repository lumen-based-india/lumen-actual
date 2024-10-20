import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  fetchProductsByCompanyID,
  FetchSuppliersByID,
  GetAllCompanies,
  GetAllProducts,
  getCompanyUsingWallet,
} from "@/utils/databaseQueries/companies";
import { getAllInsetPrograms } from "@/utils/databaseQueries/insetPrograms";
import { useAccount } from "wagmi";

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
  currentCompanyData: any | null;
  supplierData: UseQueryResult<any | null, Error>;
  productsData: UseQueryResult<any[] | null, Error>;
  allCompaniesData: UseQueryResult<any[] | null, Error>;
  currentCompanyID: string;
  setCurrentCompanyID: (id: string) => void;
  insetProgramsData: UseQueryResult<any | null, Error>;
  allProductsData: UseQueryResult<any | null, Error>;
}

const CompanyContext = createContext<ICompanyContext | null>(null);

const useCompany = () => {
  const { address } = useAccount();
  const [currentCompanyID, setCurrentCompanyID] = useState("");
  const [currentCompanyData, setCurrentCompanyData] =
    useState<CompanyData | null>(null);

  const allCompaniesData = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await GetAllCompanies();
      return response;
    },
  });

  const supplierData = useQuery({
    queryKey: ["suppliers", currentCompanyID],
    queryFn: async () => {
      const data = await FetchSuppliersByID(currentCompanyID);
      console.log({ data });
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
      return data;
    },
    enabled: !!currentCompanyID,
  });

  const insetProgramsData = useQuery({
    queryKey: ["insetPrograms"],
    queryFn: async () => {
      const response = await getAllInsetPrograms();
      console.log(response);
      return response;
    },
  });

  const companyByWallet = useQuery({
    queryKey: ["companyByWallet", address],
    queryFn: async () => {
      const data = await getCompanyUsingWallet(address as `0x{string}`);
      return data;
    },
  });

  const allProductsData = useQuery({
    queryKey: ["products", currentCompanyID],
    queryFn: async () => {
      const { data, error } = await GetAllProducts(currentCompanyID);
      console.log({ data, error });
      return { data, error };
    },
  });

  useEffect(() => {
    if (companyByWallet.data) {
      console.log(companyByWallet.data.data);
      setCurrentCompanyID(companyByWallet.data.data.company_id);
      setCurrentCompanyData(companyByWallet.data.data);
    }
  }, [companyByWallet]);
  return {
    currentCompanyID,
    setCurrentCompanyID,
    allCompaniesData,
    currentCompanyData,
    supplierData,
    productsData,
    insetProgramsData,
    allProductsData,
  };
};

export function ProvideCompany({ children }: PropsWithChildren<any>) {
  const value = useCompany();
  return (
    // @ts-ignore
    <CompanyContext.Provider value={{ ...value }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error(
      "Ensure that the component is wrapped inside ProvideCompany",
    );
  }
  return context;
};

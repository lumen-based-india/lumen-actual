
import { useCompanyContext } from "@/providers/CompanyProvider";
import CompanyDropdown from "./companyDropdown";
import { useState } from "react";

const companies = [
    {
      name: "Levis",
      logo: "https://levi.in/cdn/shop/files/logo_his_res.png?v=1697785388&width=160",
    },
    {
      name: "Nike",
      logo: "https://static.nike.com/a/images/w_1920,c_limit/bmqpvev3xt8nvenhuulp/nike-just-do-it.jpg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
  ];

export default function CompanyHeader() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]); // Default to Levis
  const { currentCompanyData } = useCompanyContext();

  return (
    <div className="flex items-center justify-between p-4 bg-primary text-white">
      <div className="flex items-center space-x-4">
        <img
          src={selectedCompany.logo}
          alt="Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="font-bold text-xl">{currentCompanyData?.company_name || "Loading..."}</span>
      </div>
      <CompanyDropdown/>
    </div>
  );
}



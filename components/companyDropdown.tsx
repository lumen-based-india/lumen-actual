

import React from 'react';
import { useCompanyContext } from '@/providers/CompanyProvider';

export default function CompanyDropdown() {
  const { allCompaniesData, currentCompanyData,  setCurrentCompanyID,currentCompanyID } = useCompanyContext();
  const companies = allCompaniesData.data ?? [];

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCompanyID(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={currentCompanyID}
        onChange={handleCompanyChange}
        className="p-2 bg-secondary text-primary rounded-lg font-medium"
      >
        {companies.map((company) => (
          <option key={company.company_id} value={company.company_id}>
            {company.company_name}
          </option>
        ))}
      </select>
    </div>
  );
}
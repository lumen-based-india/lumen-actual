"use client";

import { EcoMarketplace } from "@/components/eco-marketplace";
import { useCompanyContext } from "@/providers/CompanyProvider";

export default function Suppliers() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <EcoMarketplace />
    </div>
  );
}

"use client";

import { useState } from "react";
import BarGauge from "@/components/bar-gaugev2";
import ESG from "@/components/ui/esg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CSRComponent from "@/components/csr-component";
import ComplianceComponent from "@/components/complaince-component";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompanyContext } from "@/providers/CompanyProvider";

const dataCompletenessMap = [
  {
    title: "Environmental protection",
    subTitle:
      "Key performance indicators cover electricity consumption, water usage and air emissions.",
    value: 80,
  },
  {
    title: "Human rights",
    subTitle: "Focus on human rights violations and minimum and fair wages.",
    value: 75,
  },
  {
    title: "Integrity",
    subTitle:
      "Performance indicators include anti-corruption, anti-bribery and conflicts of interest policies.",
    value: 70,
  },
  {
    title: "Employee well-being",
    subTitle:
      "Metrics focused on parental benefits, employee accessibility and the percentage of unionized workers.",
    value: 85,
  },
  {
    title: "Inclusive growth",
    subTitle: "Policies favoring vulnerable and marginalized groups.",
    value: 65,
  },
  {
    title: "Sustainable goods and services",
    subTitle: "Information on investments in social and environmental impacts.",
    value: 90,
  },
  {
    title: "Responsible consumer engagement",
    subTitle:
      "KPIs encompass handling consumer complaints and feedback, product recall procedures and cybersecurity and data privacy policies.",
    value: 78,
  },
  {
    title: "Stakeholder responsiveness",
    subTitle: "Describing engagement with vulnerable and marginalized groups.",
    value: 82,
  },
  {
    title: "Responsible public policy engagement",
    subTitle:
      "Listing trade and industry affiliations and detailing issues relating to anticompetitive conduct.",
    value: 88,
  },
];

export default function ImpactOverview() {
  const [region, setRegion] = useState("India");
  const { currentCompanyData } = useCompanyContext();

  if (!currentCompanyData) return null;
  return (
    <div className="p-4 flex flex-col w-full gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <Card className="rounded-xl w-full h-1/2">
            <CardHeader>
              <CardTitle>ESG Overview</CardTitle>
            </CardHeader>
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <ESG companyData={currentCompanyData.esg_facts} />
            </CardContent>
          </Card>
          <Card className="rounded-xl flex-1">
            <CardHeader>
              <CardTitle className="flex gap-8 items-center">
                <div>Compliance Reports</div>
                <Select onValueChange={setRegion} value={region}>
                  <SelectTrigger className="w-[180px] rounded-xl">
                    <SelectValue placeholder="Select a Region" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Europe" className="rounded-xl">
                      Europe
                    </SelectItem>
                    <SelectItem value="India" className="rounded-xl">
                      India
                    </SelectItem>
                    <SelectItem value="Middle East" className="rounded-xl">
                      Middle East
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ComplianceComponent region={region} />
            </CardContent>
          </Card>
        </div>
        <Card className="rounded-xl w-full">
          <CardHeader className="mb-4">
            <CardTitle>Performance Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <BarGauge companyData={currentCompanyData.esg_facts} />
            </div>
          </CardContent>
        </Card>
      </div>
      <CSRComponent />
    </div>
  );
}

"use client";

import ProjectInfo from "@/components/project-info";
import SupplierProjects from "@/components/supplier-projects";
import TokenAvailablityGraph from "@/components/token-availablity-graph";
import TokenRequirementGraph from "@/components/token-req-graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useCompanyContext } from "@/providers/CompanyProvider";
import { IndianRupeeIcon } from "lucide-react";
import { useState } from "react";

export default function TradeCarbon() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { insetProgramsData, currentCompanyData } = useCompanyContext();
  if (insetProgramsData?.isPending) {
    return <div>Loading...</div>;
  }

  if (insetProgramsData?.error) {
    return <div>Error loading inset programs. Please try again later.</div>;
  }
  if (!insetProgramsData?.data) {
    return <div>No inset programs found.</div>;
  }
  const projects = insetProgramsData.data?.data.map((program: any) => ({
    id: program.program_id,
    supplier: program.companies.company_name,
    project: program.program_name,
    wallet_address: program.companies.wallet_address,
    address: program.google_maps_link,
    date: program.project_completion,
    insetTonnes: program.carbon_reduction,
    image: program.verifier_url,
    tags: program.project_search_tags.split(","),
  }));
  const selectedProjectData = projects?.find(
    (project: any) => project.id === selectedProject,
  );
  console.log(currentCompanyData);
  if (!currentCompanyData) {
    return <div>Loading...</div>;
  }
  if (Number(currentCompanyData?.excess_carbon_emissions) === 0) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        No excess carbon emissions found,Thanks for doing good for the
        environment :)
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <Card className="rounded-xl h-full">
            <CardHeader>
              <CardDescription>Excess Emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full justify-end items-baseline gap-1">
                <div className="text-2xl font-bold">
                  {currentCompanyData.excess_carbon_emissions}
                </div>
                <div className="text-sm text-muted-foreground">tCO₂e</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl h-full">
            <CardHeader>
              <CardDescription>
                Possible Environment Tax Implication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full justify-end items-center gap-1">
                <IndianRupeeIcon />{" "}
                <div className="text-2xl font-bold">
                  {currentCompanyData.excess_carbon_emissions * 5000}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full">
          <TokenRequirementGraph />
        </div>
        <div className="w-full">
          <TokenAvailablityGraph />
        </div>
      </div>
      <div className="flex gap-4">
        <SupplierProjects
          projects={projects as any[]}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <ProjectInfo project={selectedProjectData} />
      </div>
    </div>
  );
}

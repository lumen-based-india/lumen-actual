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
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function TradeCarbon() {
  const [selectedProject, setSelectedProject] = useState(null);

  const mockProjects = [
    {
      id: 1,
      supplier: "Mock Supplier 1",
      project: "Project A",
      address: "123 Main St",
      date: "2023-10-01",
      lumens: 100,
      insetTonnes: 3500,
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      supplier: "Mock Supplier 2",
      project: "Project B",
      address: "456 Elm St",
      date: "2023-10-02",
      lumens: 200,
      insetTonnes: 4500,
      image: "https://placehold.co/600x400",
    },
  ];

  const selectedProjectData = mockProjects.find(
    (project) => project.id === selectedProject
  );

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
                <div className="text-2xl font-bold">3,500</div>
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
              <div className="flex w-full justify-end items-baseline gap-1">
                <div className="text-2xl font-bold">$180,000</div>
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
      <div className="flex flex-col gap-4">
        <SupplierProjects
          projects={mockProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <ProjectInfo project={selectedProjectData} />
      </div>
    </div>
  );
}

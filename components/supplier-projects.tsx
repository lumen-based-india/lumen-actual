"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Address } from "./Address/Address";

type Props = {
  projects: any[];
  selectedProject: any;
  setSelectedProject: any;
};

const SupplierProjects = (props: Props) => {
  const handleRowClick = (projectId: any) => {
    props.setSelectedProject(projectId);
  };
  return (
    <Card className="w-full">
      <CardHeader
        style={{ cursor: "pointer" }}
      >
        <CardTitle className="flex justify-between items-center w-full">
          <div className="flex gap-4 items-baseline">
            <span>On-chain Supplier Projects</span>
            {props.selectedProject && (
              <span className="text-sm text-gray-400 font-normal">
                {
                  props?.projects?.find(
                    (project) => project.id === props.selectedProject,
                  )?.project
                }
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <motion.div
        initial={false}
        transition={{ height: { duration: 0.3 }, opacity: { duration: 0.2 } }}
        style={{ overflow: "hidden" }}
      >
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props?.projects?.map((project) => (
                <TableRow
                  key={project.id}
                  onClick={() => handleRowClick(project.id)}
                  style={{
                    backgroundColor:
                      props.selectedProject === project.id
                        ? "#f0f0f0"
                        : "transparent",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <TableCell>{project.supplier}</TableCell>
                  <TableCell>{project.project}</TableCell>
                  <TableCell>
                    <Address address={project.wallet_address} />
                  </TableCell>
                  <TableCell>{project.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </motion.div>
    </Card>
  );
};

export default SupplierProjects;

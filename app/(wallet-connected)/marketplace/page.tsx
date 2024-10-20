"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useCompanyContext } from "@/providers/CompanyProvider";
import { getCompany } from "@/utils/databaseQueries/companies";
import { useQuery } from "@tanstack/react-query";
import { getInsetProgramsByCompanyID } from "@/utils/databaseQueries/insetPrograms";
import ProjectInfo from "@/components/project-info-v2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function generateRandomSeed(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = Math.imul(31, hash) + name.charCodeAt(i);
  }
  hash = hash ^ (hash >>> 16); // XOR and shift for more randomness
  const normalizedSeed = Math.abs(hash % 1000) / 1000; // Modulo to get a value between 0 and 1
  return (normalizedSeed * 4) - 2; // Scale to [-2, +2)
}

export default function MarketPlace() {
  const { supplierData: supplier_data } = useCompanyContext();
  const productCategoryMap = useMemo(() => {
    return supplier_data?.data?.productMap ?? {};
  }, [supplier_data]);

  const productCategories = useMemo(() => {
    return Object.keys(productCategoryMap);
  }, [productCategoryMap]);

  const [currentProductCategory, setCurrentProductCategory] = useState("");
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [supplierNewData, setSupplierNewData] = useState<any[]>([]);
  const [companySustainabilityMap, setCompanySustainabilityMap] = useState<any[]>([]);
  const [currentSupplier, setCurrentSupplier] = useState<string>("");
  const programsData = useQuery({
    queryKey: ["programs", currentSupplier],
    queryFn: async () => {
      const response = await getInsetProgramsByCompanyID(currentSupplier);
      return response;
    },
    enabled: !!currentSupplier,
  });

  const program = programsData?.data?.data?.map((program: any) => ({
    id: program.program_id,
    supplier: program.companies.company_name,
    description: program.program_description,
    program: program.program_name,
    address: program.google_maps_link,
    date: program.project_completion,
    lumens: program.lumens_value,
    insetTonnes: program.carbon_reduction,
    image: program.verifier_url,
    tags: program.project_search_tags.split(","),
  }));
  const currentProgram = program?.[0] ?? null;
  const projectInfoRef = useRef<HTMLDivElement | null>(null); // Create a ref for ProjectInfo

  useEffect(() => {
    if (currentProgram) {
      projectInfoRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to ProjectInfo if it exists
    }
  }, [currentProgram]);

  useEffect(() => {
    if (!currentProductCategory || productCategoryMap[currentProductCategory] === undefined) {
      setCompanySustainabilityMap([]);
      return;
    }
    const companies = productCategoryMap[currentProductCategory];

    // Populate the sustainability map
    const updatedMap = companies.map((company: any) => ({
      company_id: company.company_id,
      company_name: company.company_name,
      sustainability: parseFloat(
        (parseFloat(company.sustainability.company_sustainability) + generateRandomSeed(company.company_name)).toFixed(2)
      ),
      money: (parseFloat(company.sustainability.company_price) + generateRandomSeed(company.company_name)).toFixed(2),
    }));
    setCompanySustainabilityMap(updatedMap);
    setSupplierLoading(true);
    setSupplierNewData([]);
    const promises = companies.map((company: any) => getCompany(company.company_id));
    Promise.all(promises)
      .then((results) => {
        setSupplierNewData(results.map((result) => result.data));
      })
      .finally(() => {
        setSupplierLoading(false);
      });
  }, [currentProductCategory, productCategoryMap]);

  // Function to generate a random bright color from a company name
  function getBrightColor(name: string): string {
    const hashCode = Array.from(name).reduce((hash, char) => {
      return char.charCodeAt(0) + ((hash << 5) - hash); // Hashing function
    }, 0);

    // Generate RGB values and ensure they are bright
    const r = (hashCode % 255 + 200) % 256; // Ensure red is high
    const g = (hashCode * 2 % 255 + 100) % 256; // Ensure green is moderate
    const b = (hashCode * 3 % 255 + 50) % 256; // Ensure blue is lower
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Chart data
  const chartData = {
    datasets: companySustainabilityMap.map((company) => ({
      label: company.company_name,
      data: [{
        x: company.sustainability,
        y: company.money,
        company_id: company.company_id,
        company_name: company.company_name,
      }],
      backgroundColor: getBrightColor(company.company_name),
      borderColor: getBrightColor(company.company_name),
      borderWidth: 1,
      pointRadius: 5,
    })),
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        display: true, // Enable legend
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const companyName = context.raw.company_name;
            const price = context.raw.y;
            const sustainability = context.raw.x;
            return `${companyName}: Price $${price}, Sustainability ${sustainability}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Sustainability (ESG Rating)",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: "Price ($)",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Enter Supply Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              onValueChange={(e) => {
                setCurrentProductCategory(e);
              }}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Product Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {productCategories.map((category, index) => (
                  <SelectItem
                    value={category}
                    key={index}
                    className="rounded-xl"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Available Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <Scatter options={chartOptions} data={chartData} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Supplier Action</CardTitle>
        </CardHeader>
        <CardContent>
          {supplierLoading ? (
            <p>Loading supplier data...</p>
          ) : supplierNewData.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Environmental</TableHead>
                    <TableHead>Social</TableHead>
                    <TableHead>Governance</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierNewData.map((supplier) => (
                    <TableRow
                      key={supplier.company_name}
                      onClick={() => {
                        setCurrentSupplier(supplier.company_id);
                      }}
                    >
                      <TableCell>{supplier.company_name}</TableCell>
                      <TableCell>
                        {supplier.environmental_score}
                        {supplier.environmental_score > 9.1 && (
                          <span> ⭐</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {supplier.social_score}
                        {supplier.social_score > 9.1 && (
                          <span> ⭐</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {supplier.governance_score}
                        {supplier.governance_score > 9.1 && (
                          <span> ⭐</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          className="transition-transform transform hover:scale-105"
                        >
                          Enter Contract
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <p>No suppliers found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
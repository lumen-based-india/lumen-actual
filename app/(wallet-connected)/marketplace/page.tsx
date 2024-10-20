"use client";

import { useEffect, useMemo, useState } from "react";
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
import SupplierProgram from "@/components/supplier-program";
import { useQuery } from "@tanstack/react-query";
import { getInsetProgramsByCompanyID } from "@/utils/databaseQueries/insetPrograms";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function generateRandomSeed(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = Math.imul(31, hash) + name.charCodeAt(i);
  }
  hash = hash ^ (hash >>> 16); // XOR and shift for more randomness
  const normalizedSeed = Math.abs(hash % 1000) / 1000; // Modulo to get a value between 0 and 1
  return normalizedSeed * 3; // Scale to [0, 3)
}

export default function MarketPlace() {
  const { supplierData: supplier_data } = useCompanyContext();
  const productCategoryMap = useMemo(() => {
    return supplier_data?.data?.productMap ?? {};
  }, [supplier_data]);
  
  const productTypes = useMemo(() => {
    return Object.keys(productCategoryMap);
  }, [productCategoryMap]);

  const [currentProductType, setCurrentProductType] = useState("");
  const [currentProducts, setCurrentProducts] = useState<string[]>([]);
  const [currentProduct, setCurrentProduct] = useState("");
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [supplierNewData, setSupplierNewData] = useState<any[]>([]);
  const [companySustainabilityMap, setCompanySustainabilityMap] = useState<any[]>([]);
  const [currentSupplier, setCurrentSupplier] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  useEffect(() => {
    if (!currentProductType || productCategoryMap[currentProductType] === undefined) {
      setCurrentProducts([]);
      return;
    }
    const products = Object.keys(productCategoryMap[currentProductType]);
    setCurrentProducts(products);
  }, [currentProductType, productCategoryMap]);

  useEffect(() => {
    setCompanySustainabilityMap([]);
    const companies = productCategoryMap[currentProductType]?.[currentProduct];
    if (!companies) return;

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
  }, [currentProduct, currentProductType, productCategoryMap]);

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

  const selectedProgramData = program?.find(
    (program: any) => program.id === selectedProgram
  );

  const chartData = {
    datasets: [
      {
        label: "Suppliers",
        data: companySustainabilityMap.map((company) => ({
          x: company.sustainability,
          y: company.money,
          label: company.company_name,
          company_id: company.company_id,
          company_name: company.company_name,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const companyName = context.raw.label;
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
        ticks: {
          beginAtZero: true,
          stepSize: 0.1, // Adjust step size for better granularity
        },
      },
      y: {
        title: {
          display: true,
          text: "Price ($)",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Adjust step size for better visibility
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
                setCurrentProductType(e);
              }}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {productTypes.map((productType, index) => (
                  <SelectItem
                    value={productType}
                    key={index}
                    className="rounded-xl"
                  >
                    {productType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setCurrentProduct}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {currentProducts && currentProducts.length > 0 ? (
                  currentProducts.map((product, index) => {
                    return (
                      <SelectItem
                        value={product}
                        key={index}
                        className="rounded-xl"
                      >
                        {product}
                      </SelectItem>
                    );
                  })
                ) : (
                  <SelectItem disabled value={"empty"}>
                    No products available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Available Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96"> {/* Fixed height for better display */}
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
                      <TableCell>{supplier.environmental_score}</TableCell>
                      <TableCell>{supplier.social_score}</TableCell>
                      <TableCell>{supplier.governance_score}</TableCell>
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
      {currentSupplier && (
        <Card>
          <CardHeader>
            <CardTitle>Inset Programs Running</CardTitle>
          </CardHeader>
          <CardContent className="flex overflow-x-auto gap-4">
            {program && program?.length > 0 ? (
              program.map((program: any) => (
                <div key={program.program_id} className="w-1/4">
                  <SupplierProgram program={program} />
                </div>
              ))
            ) : (
              <p>No Inset Programs found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
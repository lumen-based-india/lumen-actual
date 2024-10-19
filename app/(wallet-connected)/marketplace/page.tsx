"use client";

import { use, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function MarketPlace() {
  const [quantity, setQuantity] = useState("");
  const { supplierData: supplier_data } = useCompanyContext();
  const productCategoryMap = supplier_data?.data?.productMap ?? {};
  const productTypes = Object.keys(supplier_data?.data?.productMap ?? {});
  const [currentProductType, setCurrentProductType] = useState("");
  const [currentProducts, setCurrentProducts] = useState<string[]>([]);
  const [currentProduct, setCurrentProduct] = useState("");
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [supplierNewData, setSupplierNewData] = useState<any[]>([]);
  const [companySustainabilityMap, setCompanySustainabilityMap] = useState<any[]>([]);

  useEffect(() => {
    if (productCategoryMap[currentProductType] === undefined) {
      return;
    }
    const products = Object.keys(productCategoryMap[currentProductType]);
    setCurrentProducts(products);
  }, [currentProductType]);

  useEffect(() => {
    setCompanySustainabilityMap([]);
    const companies = productCategoryMap[currentProductType]?.[currentProduct];
    // make sustainability score map for each company
    if (!companies) {
      return;
    }
    for (let company of companies) {
      setCompanySustainabilityMap((prevData) => {
        return [
          ...prevData,
          {
            company_id: company.company_id,
            company_name: company.company_name,
            sustainability: parseFloat(company.sustainability.company_sustainability).toFixed(2),
            money: parseFloat(company.sustainability.company_price).toFixed(2),
          },
        ]
      });
    }
    setSupplierLoading(true);
    setSupplierNewData([]);
    const promises = companies.map((company: any) =>
      getCompany(company.company_id)
    );
    Promise.all(promises)
      .then((results) => {
        companies.forEach((data: any) => {
          getCompany(data.company_id).then((result) => {
            setSupplierNewData((prevData) => [...prevData, result.data]);
          });
        });
      })
      .finally(() => {
        setSupplierLoading(false);
      });
    }, [currentProduct]);

  const handleProductType = (selectedType: string) => {
    setCurrentProductType(selectedType);
  };

  //make chart with company sustainability and price
  const chartData = {
    datasets: [
      {
        label: "Suppliers",
        data: companySustainabilityMap.map((company) => ({
          x: company.sustainability, // X-axis: Sustainability (ESG rating)
          y: company.money,          // Y-axis: Price (Company Price)
          label: company.company_name, // Label for each point
          company_id: company.company_id,
          company_name: company.company_name,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Data point fill color
        borderColor: "rgba(75, 192, 192, 1)", // Data point border color
        borderWidth: 1,
        pointRadius: 5, // Radius of each point
      },
    ],
  };
  
  // Options to display tooltips and labels
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // Return company name and value as the tooltip label
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
          text: 'Sustainability (ESG Rating)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
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
            <Select onValueChange={handleProductType}>
              <SelectTrigger>
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map((productType, index) => (
                  <SelectItem value={productType} key={index}>
                    {productType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setCurrentProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                {currentProducts && currentProducts.length > 0 ? (
                  currentProducts.map((product, index) => {
                    return (
                      <SelectItem value={product} key={index}>
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
            <div className="flex items-center space-x-2">
              <span>Enter QTY</span>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-20"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Available Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <Scatter options={chartOptions} data={chartData} />
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Supplier Action</CardTitle>
        </CardHeader>
        <CardContent>
          {supplierLoading ? (
            // Display loading message when suppliers are being fetched
            <p>Loading supplier data...</p>
          ) : supplierNewData.length > 0 ? (
            // If data is found, render the table
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
                  <TableRow key={supplier.company_name}>
                    <TableCell>{supplier.company_name}</TableCell>
                    <TableCell>{supplier.environmental_score}</TableCell>
                    <TableCell>{supplier.social_score}</TableCell>
                    <TableCell>{supplier.governance_score}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="transition-transform transform hover:scale-105">Enter Contract</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // If no data is found, display this message
            <p>No suppliers found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

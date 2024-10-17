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
import { Star } from "lucide-react";
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
import { get } from "http";

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

  useEffect(() => {
    if (productCategoryMap[currentProductType] === undefined) {
      return;
    }
    const products = Object.keys(productCategoryMap[currentProductType]);
    setCurrentProducts(products);
  }, [currentProductType]);

  useEffect(() => {
    const companies = productCategoryMap[currentProductType]?.[currentProduct];
    if (!companies) {
      return;
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

  const supplierData = [
    {
      name: "Bambrew",
      env: "4/5",
      social: "3/5",
      governance: "3/5",
      price: 80,
      sustainability: 70,
    },
    {
      name: "Zerocircle",
      env: "3/5",
      social: "3/5",
      governance: "3/5",
      price: 90,
      sustainability: 85,
    },
    {
      name: "Zomato Hyperpure",
      env: "1.5/5",
      social: "3/5",
      governance: "5/5",
      price: 70,
      sustainability: 60,
    },
  ];

  const chartData = {
    datasets: [
      {
        label: "Suppliers",
        data: supplierData.map((supplier) => ({
          x: supplier.sustainability,
          y: supplier.price,
          label: supplier.name,
        })),
        backgroundColor: ["purple", "green", "red"],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        title: {
          display: true,
          text: "Sustainability",
        },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,
        title: {
          display: true,
          text: "Price",
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
            <Button>View Options</Button>
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
                      <Button variant="outline">Enter Contract</Button>
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

"use client";

import React, { useEffect, useMemo, useState } from "react";
import EsgTrace from "@/components/esgTrace";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductMovementNetwork from "@/components/dppNetworkGraph";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Leaf, MapPin, Shirt, Star } from "lucide-react";
import { useCompanyContext } from "@/providers/CompanyProvider";
interface ProductInfo {
  id: number;
  business_sector: string;
  companies: {
    role: string;
    market: string;
    company_id: number;
    company_name: string;
    inset_programs: string | null;
  };
  company_id: number;
  disposal_instructions: string | null;
  dpp_trace: string;
  ingredients: string | null;
  lumen_per_unit: number;
  lumens: number;
  price: number;
  product_category: string;
  product_esg_rating: number;
  product_id: number;
  product_name: string;
  recycling_value: number;
  role: string;
  sku_id: string;
  total_lumens: number | null;
  units: number;
}
export default function DPPTrace() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { allProductsData } = useCompanyContext();
  const [productDetails, setProductDetails] = useState<ProductInfo | null>(
    null
  );
  const productList = useMemo(() => {
    if (allProductsData?.data) {
      return allProductsData.data;
    }
    return [];
  }, [allProductsData]);

  const productMap = useMemo(() => {
    const map = new Map();
    if (productList?.length > 0) {
      productList?.forEach((product: any) =>
        map.set(product.product_id, product)
      );
    }
    return map;
  }, [productList]);

  useEffect(() => {
    if (selectedProduct) {
      const product = productMap.get(selectedProduct);
      setProductDetails(product || null);
    }
  }, [selectedProduct, productMap]);

  return (
    <div className="p-8 flex flex-col gap-4">
      <Card className="w-full rounded-xl">
        <CardHeader>
          <CardTitle>Product Selection</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-between items-center">
          <div>
            <Select onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Select a Product" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {productList &&
                  Object.keys(productList)?.map((productKey) =>
                    productList[productKey] ? ( // Null check for each product
                      <SelectItem
                        key={productList[productKey].product_id}
                        value={productList[productKey].product_id}
                        className="rounded-xl"
                      >
                        {productList[productKey].product_name}
                      </SelectItem>
                    ) : null
                  )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {}}
              className="bg-white border border-gray-300 font-bold py-2 px-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <span className="text-foreground">Submit Additional Data</span>
            </Button>
            <Button
              onClick={() => {}}
              className="bg-white border border-gray-300 font-bold py-2 px-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <span className="text-foreground">
                Request zk re-verification
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
      {productDetails && (
        <Card className="w-full rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Product Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 w-full">
              {productDetails && (
                <>
                  <div className="flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/150"
                      alt={productDetails.product_name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                    {Object.entries(productDetails)
                      .filter(([key]) =>
                        [
                          "product_name",
                          "product_category",
                          "business_sector",
                          "price",
                          "product_esg_rating",
                        ].includes(key)
                      )
                      .map(([key, value], index) => (
                        <div key={index}>
                          <div className="flex gap-2 items-start">
                            {key === "product_name" && <Shirt size={24} />}
                            {key === "product_category" && <Star size={24} />}
                            {key === "business_sector" && <MapPin size={24} />}
                            {key === "price" && <DollarSign size={24} />}
                            {key === "product_esg_rating" && <Leaf size={24} />}
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {key
                                  .replace(/_/g, " ")
                                  .toLowerCase()
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                              </span>
                              <div className="font-normal">{value}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {productDetails && (
        <div className="flex gap-4">
          <ProductMovementNetwork
            selectedProduct={productDetails}
            productMap={productMap}
          />
          <EsgTrace />
        </div>
      )}
    </div>
  );
}

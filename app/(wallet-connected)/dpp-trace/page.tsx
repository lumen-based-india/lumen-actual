"use client";

import React, { useState } from "react";
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
import { Calendar, DollarSign, Leaf, MapPin, Shirt, Star } from "lucide-react";
import { useCompanyContext } from "@/providers/CompanyProvider";
// @ishaan change accordingly
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
  const {allProductsData} = useCompanyContext();
  const productList = allProductsData.data
  const productMap = new Map();
  if (productList){
    productList.map((product: any) => {
      productMap.set(product.product_id, product)
    })
  }
  const [currentProduct, setCurrentProduct] = useState<any>({});
  const [productDetails, setProductDetails] = useState<ProductInfo | null>(
    null
  );

  React.useEffect(() => {
    if (selectedProduct !== null) {
      setCurrentProduct(productMap.get(selectedProduct))
      setProductDetails(productMap.get(selectedProduct));
      console.log(productMap.get(selectedProduct))
    }
  }, [selectedProduct]);

  return (
    <div className="p-8 flex flex-col gap-4">
      <Card className="w-full rounded-xl">
        <CardHeader>
          <CardTitle>Product Selection</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-between items-center">
          <div>
            <Select onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Product" />
              </SelectTrigger>
              <SelectContent>
              {productList  && Object.keys(productList).map((productKey) => (
                productList[productKey] ? (  // Null check for each product
                  <SelectItem key={productList[productKey].product_id} value={productList[productKey].product_id}>
                    {productList[productKey].product_name}
                  </SelectItem>
                ) : null
              ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {}}
              className="bg-white border border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold py-2 px-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                Submit Additional Data
              </span>
            </Button>
            <Button
              onClick={() => {}}
              className="bg-white border border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold py-2 px-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
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
                        ["product_name", "product_category", "business_sector", "price", "product_esg_rating"].includes(key)
                      )
                      .map(([key, value], index) => (
                        <div key={index}>
                          <div className="flex gap-2 items-center">
                            {key === "product_name" && <Shirt size={24} />}
                            {key === "product_category" && <Star size={24} />}
                            {key === "business_sector" && <MapPin size={24} />}
                            {key === "price" && <DollarSign size={24} />}
                            {key === "product_esg_rating" && <Leaf size={24} />}
                            <span className="text-lg font-semibold">
                            {key
                              .replace(/_/g, " ")                 
                              .toLowerCase()                      
                              .replace(/\b\w/g, (char) => char.toUpperCase())
                            }
                            </span>
                          </div>
                          {/* Render value with normal font weight */}
                          <div className="text-lg font-normal">{value}</div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <ProductMovementNetwork />\
        <EsgTrace />
      </div>
    </div>
  );
}

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
// @ishaan change accordingly
type ProductInfo = {
  image: string;
  name: string;
  material: string;
  manufacturingDate: string;
  origin: string;
  sustainabilityRating: string;
  price: string;
};

const productsInfo: Record<string, ProductInfo> = {
  whiteJeans: {
    image: "https://via.placeholder.com/150",
    name: "White Jeans",
    material: "100% Cotton",
    manufacturingDate: "March 15, 2023",
    origin: "India",
    sustainabilityRating: "4.5/5",
    price: "$49.99",
  },
  blackJeans: {
    image: "https://via.placeholder.com/150",
    name: "Black Jeans",
    material: "98% Cotton, 2% Elastane",
    manufacturingDate: "April 10, 2023",
    origin: "Bangladesh",
    sustainabilityRating: "4.0/5",
    price: "$54.99",
  },
  blueJeans: {
    image: "https://via.placeholder.com/150",
    name: "Blue Jeans",
    material: "100% Denim",
    manufacturingDate: "February 20, 2023",
    origin: "Vietnam",
    sustainabilityRating: "4.2/5",
    price: "$59.99",
  },
};

export default function DPPTrace() {
  const [selectedProduct, setSelectedProduct] = useState<
    keyof typeof productsInfo | null
  >(null);
  const [productDetails, setProductDetails] = useState<ProductInfo | null>(
    null
  );

  React.useEffect(() => {
    if (selectedProduct !== null) {
      setProductDetails(productsInfo[selectedProduct]);
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
                {Object.keys(productsInfo).map((productKey) => (
                  <SelectItem key={productKey} value={productKey}>
                    {productsInfo[productKey].name}
                  </SelectItem>
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
                      src={productDetails.image}
                      alt={productDetails.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                    {Object.entries(productDetails)
                      .filter(([key]) => key !== "image")
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3">
                          <div>
                            <p className="text-sm text-gray-500">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </p>
                            <p className="font-medium">{value}</p>
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

      <div className="flex gap-4">
        {/* <ProductMovementNetwork /> @bhavya throwing some error pls fix*/}
        <EsgTrace />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, Camera } from "lucide-react";

const InstructionModal = ({ title, instructions }: any) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="rounded-xl text-xs">
        Instructions
      </Button>
    </DialogTrigger>
    <DialogContent className="border-2">
      <DialogHeader>
        <DialogTitle className="text-lg flex items-center">
          <Leaf className="mr-2 h-4 w-4" />
          {title} Instructions
        </DialogTitle>
      </DialogHeader>
      <div className="mt-2">
        <ul className="list-disc list-inside space-y-1 text-sm">
          {instructions.map((instruction: any, index: any) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);

const DisposalSection = () => (
  <Card className="mb-4 shadow-lg rounded-xl">
    <CardHeader>
      <CardTitle className="text-base">Disposal Instructions</CardTitle>
    </CardHeader>
    <CardContent>
      {[
        {
          item: "Packaging",
          instructions: [
            "Remove all labels",
            "Rinse containers",
            "Separate by material type",
          ],
        },
        {
          item: "Clothing",
          instructions: [
            "Check for donation eligibility",
            "Remove non-textile parts",
            "Bag clean, dry items",
          ],
        },
        {
          item: "Metal Tags",
          instructions: [
            "Collect all metal tags",
            "Remove any fabric attachments",
            "Place in metal recycling bin",
          ],
        },
      ].map(({ item, instructions }) => (
        <div key={item} className="flex justify-between items-center mb-2">
          <span className="text-sm">{item}</span>
          <InstructionModal title={item} instructions={instructions} />
        </div>
      ))}
    </CardContent>
  </Card>
);

const RecycleSection = () => (
  <Card className="mb-4 shadow-lg rounded-xl">
    <CardHeader>
      <CardTitle className="text-base">Recycle & Earn Rewards</CardTitle>
    </CardHeader>
    <CardContent>
      {[
        { name: "Recykal", reward: "£ 44" },
        { name: "Unforus", reward: "£ 30 + £15" },
        { name: "Other", reward: "£ ..." },
      ].map((item) => (
        <div key={item.name} className="flex justify-between items-center mb-2">
          <span className="text-sm">{item.name}</span>
          <div className="flex items-center">
            <span className="mr-2 font-semibold text-sm">{item.reward}</span>
            <Button variant="outline" size="sm" className="rounded-xl text-xs">
              Sell
            </Button>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const ProductSelector = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSelectedProduct("Scanned Product");
    }, 3000);
  };

  return (
    <Card className="mb-4 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-base">Select or Scan Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="product1" className="rounded-xl">
              Product 1
            </SelectItem>
            <SelectItem value="product2" className="rounded-xl">
              Product 2
            </SelectItem>
            <SelectItem value="product3" className="rounded-xl">
              Product 3
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="text-center">or</div>
        <Button
          onClick={startScanning}
          disabled={isScanning}
          className="w-full flex items-center justify-center"
        >
          <Camera className="mr-2 h-4 w-4" />
          {isScanning ? "Scanning..." : "Scan Barcode"}
        </Button>
        {selectedProduct && (
          <div className="mt-2 text-center font-semibold">
            Selected: {selectedProduct}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function Component() {
  return (
    <div className="w-full p-3 min-h-screen max-w-md mx-auto gap-4 flex flex-col">
      <ProductSelector />
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">Circular Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full text-xl font-semibold shadow-md">
              £30-40 / £80
            </span>
          </div>
        </CardContent>
      </Card>
      <DisposalSection />
      <RecycleSection />
    </div>
  );
}

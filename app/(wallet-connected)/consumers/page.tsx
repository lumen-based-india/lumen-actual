"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Leaf } from "lucide-react";
import BarGauge from "@/components/bar-gaugev2";
import ProductMovementNetwork from "@/components/dppNetworkGraph";
import { useCompanyContext } from "@/providers/CompanyProvider";

const EnvMeter = () => {
  const { currentCompanyData } = useCompanyContext();
  return (
    <Card className="mb-6 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg">Environmental Meter</CardTitle>
      </CardHeader>
      <CardContent>
        <BarGauge companyData={currentCompanyData} />
      </CardContent>
    </Card>
  );
};

const CircularDiagram = () => {
  const data = [
    { name: "Supplier", value: 20 },
    { name: "Producer", value: 20 },
    { name: "Retailer", value: 20 },
    { name: "End Consumer", value: 20 },
    { name: "Recycle", value: 20 },
  ];

  return (
    <Card className="mb-6 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg">DPP Trace</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductMovementNetwork />
      </CardContent>
    </Card>
  );
};

const InstructionModal = ({ title, instructions }: any) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="rounded-xl transition-transform transform hover:scale-105">
        Instructions
      </Button>
    </DialogTrigger>
    <DialogContent className="border-2">
      <DialogHeader>
        <DialogTitle className="text-2xl flex items-center">
          <Leaf className="mr-2 h-6 w-6" />
          {title} Instructions
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <ul className="list-disc list-inside space-y-2">
          {instructions.map((instruction: any, index: any) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);

const DisposalSection = () => (
  <Card className="mb-6 shadow-lg rounded-xl">
    <CardHeader>
      <CardTitle className="text-lg">Disposal Instructions</CardTitle>
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
          <span>{item}</span>
          <InstructionModal title={item} instructions={instructions} />
        </div>
      ))}
    </CardContent>
  </Card>
);

const RecycleSection = () => (
  <Card className="mb-6 shadow-lg rounded-xl">
    <CardHeader>
      <CardTitle className="text-lg">Recycle & Earn Rewards</CardTitle>
    </CardHeader>
    <CardContent>
      {[
        { name: "Recykal", reward: "£ 44" },
        { name: "Unforus", reward: "£ 30 + £15" },
        { name: "Other", reward: "£ ..." },
      ].map((item) => (
        <div key={item.name} className="flex justify-between items-center mb-2">
          <span>{item.name}</span>
          <div className="flex items-center">
            <span className="mr-2 font-semibold">{item.reward}</span>
            <Button variant="outline" size="sm" className="rounded-xl transition-transform transform hover:scale-105">
              Sell
            </Button>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default function Component() {
  return (
    <div className="w-full p-3 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6">
        <EnvMeter />
        <CircularDiagram />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <DisposalSection />
        <RecycleSection />
      </div>
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg">Circular Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <span className="inline-block px-6 py-3 rounded-full text-2xl font-semibold shadow-md">
              £30-40 / £80
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

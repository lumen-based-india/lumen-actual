"use client";

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

export default function DPPTrace() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div>
        <Card className="w-full rounded-xl">
          <CardHeader>
            <CardTitle>Product Selection</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex justify-between items-center">
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">White Jeans</SelectItem>
                  <SelectItem value="dark">Black Jeans</SelectItem>
                  <SelectItem value="system">Blue Jeans</SelectItem>
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
      </div>
      <div className="flex gap-4">
        <div>
          <ProductMovementNetwork />
        </div>
        <div>
          <EsgTrace />
        </div>
      </div>
    </div>
  );
}

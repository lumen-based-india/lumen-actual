import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {};

const SupplierProgram = (props: Props) => {
  return (
    <Card className="flex flex-col rounded-xl">
      <img src="https://placehold.co/200x100" alt="" />
      <CardHeader>
        <CardTitle className="text-sm">$210</CardTitle>
        <CardDescription className="font-bold">
          Aperam BioEnergia
        </CardDescription>
      </CardHeader>
          <CardContent className="flex flex-col gap-1">
              <div className="overflow-hidden relative">
                <div className="overflow-y-auto max-h-20 pr-2">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              </div>
      <div className="flex flex-wrap gap-2">
        {["Brazil", "BioChar", "2023","10 SDGs"].map(
          (chip, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {chip}
            </span>
          )
        )}
      </div>
      </CardContent>
    </Card>
  );
};

export default SupplierProgram;

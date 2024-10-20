import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
    program: any;
};

const SupplierProgram = (props: Props) => {
  const { program } = props;
  return (
    <Card className="flex flex-col rounded-xl">
      <img src={program.image || "https://placehold.co/200x100"} alt={program.program || "Program Image"} />
      <CardHeader>
        <CardTitle className="text-sm">${program.lumens}</CardTitle>
        <CardDescription className="font-bold">
          {program.supplier}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="overflow-hidden relative">
          <div className="overflow-y-auto max-h-20 pr-2">
            <p>{program.description || "No description available."}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {program.tags.map((chip: string, index: number) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-xl"
            >
              {chip}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierProgram;

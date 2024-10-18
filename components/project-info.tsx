"use react";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type Props = {
  project: any;
};

const ProjectInfo = (props: Props) => {
  const [qty, setQty] = React.useState(3500);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
      </CardHeader>
      <CardContent>
        {props.project ? (
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                src={props.project.image}
                alt="Project Image"
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardContent className="p-4 flex flex-col justify-center h-full">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Inset Tonnes
                    </Label>
                    <div className="text-2xl font-bold">
                      {props.project.insetTonnes}
                      <span className="text-base font-normal text-muted-foreground pl-1">
                        tCO₂e
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4 flex flex-col justify-center h-full">
                  <div className="flex flex-col space-y-1">
                    <Label
                      htmlFor="project"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Desired Credit Quantity
                    </Label>
                    <Input
                      id="project"
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      onFocus={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onBlur={(e) => e.currentTarget.style.transform = "scale(1)"}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      style={{ transition: "transform 0.3s ease" }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardContent className="p-4 flex flex-col justify-center h-full">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Total
                    </Label>
                    <div className="text-2xl font-bold">$ {4600 * qty}</div>
                  </div>
                </CardContent>
              </Card>
              <div className="col-span-1 flex items-center justify-center h-full">
                <Button 
                  className="w-full h-full transition-transform transform hover:scale-95"
                >
                  Acquire Carbon Insets
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            Select a project to view details
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectInfo;

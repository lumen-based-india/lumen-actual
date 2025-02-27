"use react";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { contractConfig } from "@/hooks/useLumenToken";
import { formatUnits, parseUnits } from "viem";
import { updateCompanyExcessEmissions } from "@/utils/databaseQueries/companies";
import { useCompanyContext } from "@/providers/CompanyProvider";

type Props = {
  project: any;
};

const ProjectInfo = (props: Props) => {
  const { address } = useAccount();
  const [qty, setQty] = React.useState(3500);
  const {currentCompanyID} = useCompanyContext();
  const { writeContractAsync } = useWriteContract();
  const { data: balance, isError: balanceError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "getHolderBalance",
    args: [props?.project?.wallet_address],
    chainId: contractConfig.chainId,
  });

  const balanceInNumber = useMemo(() => {
    if (balanceError) return 0;
    if (!balance) return 0;
    return formatUnits(balance as bigint, 18);
  }, [balance]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project Information</CardTitle>
      </CardHeader>
      <CardContent>
        {props.project ? (
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="flex gap-2">
                <div>
                  <img src={props.project.image} className="w-24 h-8" />
                </div>
                <div></div>
              </div>
              <iframe
                src={props.project.address}
                width="325"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-4 h-full">
                <Card className="col-span-1">
                  <CardContent className="p-4 flex flex-col justify-center h-full">
                    <div className="flex flex-col space-y-1">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Inset Tonnes
                      </Label>
                      <div className="text-2xl font-bold">
                        {balanceInNumber}
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
                        onFocus={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
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
                      <div className="text-2xl font-bold">LUMENS {qty}</div>
                    </div>
                  </CardContent>
                </Card>
                <div className="col-span-1 flex items-center justify-center h-full">
                  <Button
                    className="w-full h-full transition-transform transform hover:scale-95"
                    onClick={() => {
                      console.log("Transfering...", address);
                      writeContractAsync({
                        abi: contractConfig.abi,
                        address: contractConfig.address,
                        functionName: "transfer",
                        chainId: 84532,
                        args: [
                          address as `0x${string}`,
                          props.project.wallet_address as `0x${string}`,
                          parseUnits(qty.toString(), 18),
                        ],
                      }).then(() => {
                        updateCompanyExcessEmissions(address as `0x${string}`,currentCompanyID, qty);
                      });
                    }}
                  >
                    Acquire Carbon Insets
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {props.project?.tags?.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-xl"
                  >
                    {tag}
                  </span>
                ))}
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

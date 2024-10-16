import TokenAvailablityGraph from "@/components/token-availablity-graph";
import TokenRequirementGraph from "@/components/token-req-graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TradeCarbon() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 h-full w-1/5">
          <Card>
            <CardHeader>
              <CardDescription>Excess Emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full justify-end items-baseline gap-1">
                <div className="text-2xl font-bold">3,500</div>
                <div className="text-sm text-muted-foreground">tCO₂e</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>
                Possible Environment Tax Implication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full justify-end items-baseline gap-1">
                <div className="text-2xl font-bold">$180,000</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/2">
          <TokenRequirementGraph />
        </div>
        <div className="w-1/2">
          <TokenAvailablityGraph />
        </div>
      </div>
      <div className="flex gap-4">
        
      </div>
    </div>
  );
}

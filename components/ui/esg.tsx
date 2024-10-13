import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Users, Building2 } from "lucide-react";
import { fetchCompanyById } from "@/utils/databaseQueries/companies";

type ESGProps = {
  eScore: number;
  sScore: number;
  gScore: number;
};

export default function ESG(
  { eScore, sScore, gScore }: ESGProps = { eScore: 0, sScore: 0, gScore: 0 }
) {
  const companyData = fetchCompanyById("10001");
  console.log({ companyData });
  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="rounded-xl w-full">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Leaf className="h-8 w-8 text-green-500" />
          <CardTitle className="text-sm font-medium">Environmental</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center space-x-4">
          <Progress value={eScore} className="h-4 w-full" />
          <p className="text-lg font-semibold">{eScore}%</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl w-full">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Users className="h-8 w-8 text-blue-500" />
          <CardTitle className="text-sm font-medium">Social</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center space-x-4">
          <Progress value={sScore} className="h-4 w-full" />
          <p className="text-lg font-semibold">{sScore}%</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl w-full">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Building2 className="h-8 w-8 text-yellow-500" />
          <CardTitle className="text-sm font-medium">Governance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center space-x-4">
          <Progress value={gScore} className="h-4 w-full" />
          <p className="text-lg font-semibold">{gScore}%</p>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Users, Building2 } from "lucide-react";
import { CompanyData } from "@/providers/CompanyProvider";

type ESGProps = {
  companyData?: CompanyData | undefined | null;
};

export default function ESG(
  { companyData }: ESGProps = { companyData: undefined }
) {
  const environmentalScore = (companyData?.environmental_score ?? 0) * 10;
  const socialScore = (companyData?.social_score ?? 0) * 10;
  const governanceScore = (companyData?.governance_score ?? 0) * 10;
  const companyName =
    typeof companyData?.company_name === "string"
      ? companyData?.company_name
      : "Unknown Company";

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">{companyName}</h2>

      {/* Environmental Card */}
      <Card className="w-full rounded-xl">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Leaf className="h-8 w-8 text-green-500" />
          <CardTitle className="text-sm font-medium">Environmental</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center space-x-4">
          <Progress value={environmentalScore} className="h-4 w-full" />
          <p className="text-lg font-semibold">{environmentalScore}%</p>
        </CardContent>
      </Card>

      {/* Social Card */}
      <Card className="w-full rounded-xl">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Users className="h-8 w-8 text-blue-500" />
          <CardTitle className="text-sm font-medium">Social</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center space-x-4">
          <Progress value={socialScore} className="h-4 w-full" />
          <p className="text-lg font-semibold">{socialScore}%</p>
        </CardContent>
      </Card>

      {/* Governance Card */}
      <Card className="w-full rounded-xl">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Building2 className="h-8 w-8 text-yellow-500" />
          <CardTitle className="text-sm font-medium">Governance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center space-x-4">
          <Progress value={governanceScore} className="h-4 w-full" />
          <p className="text-lg font-semibold">{governanceScore}%</p>
        </CardContent>
      </Card>
    </div>
  );
}

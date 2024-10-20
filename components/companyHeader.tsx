import { useCompanyContext } from "@/providers/CompanyProvider";
import { Button } from "./ui/button";
import { updateCompanyWallet } from "@/utils/databaseQueries/companies";
import { useRouter } from "next/navigation";

export default function CompanyHeader() {
  const { push } = useRouter();
  const { currentCompanyData, currentCompanyID } = useCompanyContext();
  const handleLogout = async () => {
    const updateCompany = await updateCompanyWallet(currentCompanyID, "");
    if (updateCompany.error) {
      console.log(updateCompany.error);
    }
    push("/");
  };
  return (
    <div className="flex items-center justify-between p-4 bg-primary text-background">
      <span className="font-bold text-xl">
        {currentCompanyData?.company_name || "Loading..."}
      </span>
      <Button className="rounded-xl" variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

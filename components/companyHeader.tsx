import { useCompanyContext } from "@/providers/CompanyProvider";
import { Button } from "./ui/button";
import { updateCompanyWallet } from "@/utils/databaseQueries/companies";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { contractConfig } from "@/hooks/useLumenToken";
import { formatUnits } from "viem";
import { useMemo } from "react";

export default function CompanyHeader() {
  const { push } = useRouter();
  const { address } = useAccount();
  const { currentCompanyData, currentCompanyID } = useCompanyContext();
  const handleLogout = async () => {
    const updateCompany = await updateCompanyWallet(currentCompanyID, "");
    if (updateCompany.error) {
      console.log(updateCompany.error);
    }
    push("/");
  };
  const { data: balance, isError: balanceError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "getHolderBalance",
    args: [address],
    chainId: contractConfig.chainId,
  });

  const balanceInNumber = useMemo(() => {
    if (balanceError) return 0;
    if (!balance) return 0;
    return formatUnits(balance as bigint, 18);
  }, [balance]);
  return (
    <div className="flex items-center justify-between p-4 bg-primary text-background">
      <span className="font-bold text-xl">
        {currentCompanyData?.company_name || "Loading..."} {balanceInNumber}{" "}
        LMN Credits
      </span>
      <Button
        className="rounded-xl"
        variant="destructive"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

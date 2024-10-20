"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlackCreateWalletButton } from "@/components/coinbase-connect";
import { useAccount, useReadContract } from "wagmi";
import { useRouter } from "next/navigation";
import {
  getCompanies,
  getCompanyUsingWallet,
  updateCompanyWallet,
} from "@/utils/databaseQueries/companies";
import { contractConfig} from "@/hooks/useLumenToken";
import { distributeTokensAndSendEthSeparately } from "@/lib/initScriptContract";
import { formatUnits } from "viem";
const fetchAddressDetails = async (address: string) => {
  const company = await getCompanyUsingWallet(address);
  if (company.error) {
    return {};
  }
  return company.data;
};

export default function LoginOrSignup() {
  const { push } = useRouter();
  const { address } = useAccount();
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [addressDetails, setAddressDetails] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const { data: balance, isError: balanceError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "getHolderBalance",
    args: [address],
    chainId: contractConfig.chainId,
  });
  useEffect(() => {
    if (address) {
      setConnectionFailed(true);
      fetchAddressDetails(address).then((details: any) => {
        setAddressDetails(details);
        if (details && Object.keys(details).length > 0) {
          push("/impact-overview");
        }
      });
    }
  }, [address, push]);
  const getCompaniesData = async () => {
    const { data, error } = await getCompanies();
    if (error) {
      console.log(error);
    }
    console.log(data);
    setCompanies(data as any);
    // @ts-ignore
    setCompanyId(data[0].company_id);
  };
  useEffect(() => {
    getCompaniesData();
  }, []);
  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCompany = await updateCompanyWallet(
      companyId,
      address as `0x{string}`,
    );
    if (updatedCompany.error) {
      console.log(updatedCompany.error);
    }
    const balanceInNumber:string = formatUnits(balance as bigint, 18);
    if (!balanceInNumber || Number(balanceInNumber) === 0) {
      await distributeTokensAndSendEthSeparately(
        address as `0x{string}`,
        "4000",
        "0.1",
      );
    }

    setAddressDetails(updatedCompany.data);
    push("/impact-overview");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              {connectionFailed
                ? addressDetails && Object.keys(addressDetails).length === 0
                  ? "Login as company"
                  : "Welcome Back"
                : "Connect Wallet"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!connectionFailed ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center"
              >
                <BlackCreateWalletButton />
              </motion.div>
            ) : addressDetails && Object.keys(addressDetails).length === 0 ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
                onSubmit={handleSignUpSubmit} // Handle form submission
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Company
                  </Label>
                  <select
                    defaultValue={companyId}
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    className="p-2 bg-secondary text-primary rounded-lg font-medium w-full"
                  >
                    {companies.map((company: any) => (
                      <option
                        key={company.company_id}
                        value={company.company_id}
                      >
                        {company.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </motion.form>
            ) : (
              <p className="text-center text-white">
                You are already registered!
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

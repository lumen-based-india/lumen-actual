"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlackCreateWalletButton } from "@/components/coinbase-connect";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useContractWithPrivateKey } from "@/hooks/useContractOwnerFunctions";
import { parseUnits } from "viem";

// Mock function to simulate fetching address details
const fetchAddressDetails = async (address: string) => {
  // Simulating an API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data - Empty or filled details based on some condition
      const mockDetails = address
        ? {}
        : { name: "John Doe", email: "john@example.com", role: "User" };
      resolve(mockDetails);
    }, 1000);
  });
};
const amount = parseUnits("1000", 18);
export default function LoginOrSignup() {
  const privateKey =
    process.env.NEXT_PUBLIC_PRIVATE_KEY ||
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const { callContractFunction, response, error, loading } =
    useContractWithPrivateKey(privateKey);
  const { push } = useRouter();
  const { address } = useAccount();
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [addressDetails, setAddressDetails] = useState(null);

  useEffect(() => {
    if (address) {
      setConnectionFailed(true);
      callContractFunction("distribute", address, amount);
      fetchAddressDetails(address).then((details: any) => {
        setAddressDetails(details);
        push("/impact-overview");
      });
    }
  }, [address]);

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
                  ? "Sign Up"
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
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white">Role</Label>
                  <Input id="role" required />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </motion.form>
            ) : (
              <p className="text-center text-white">You are already registered!</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

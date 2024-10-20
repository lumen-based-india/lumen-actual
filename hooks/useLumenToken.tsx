import { localhostABI } from "@/constants/localhostABI";
import { createPublicClient } from "viem";
import { hardhat } from "viem/chains";
import { http, useReadContract } from "wagmi";

export const contractConfig = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`,
  abi: localhostABI,
  chainId: 31337 as 31337,
};
export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});
export function useLumenToken() {
  const {
    data: tokenName,
    isError: nameError,
    isLoading: nameLoading,
  } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "name",
    chainId: contractConfig.chainId,
  });
  const {
    data: ownerAddress,
    isError: ownerError,
    isLoading: ownerLoading,
  } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "owner",
    chainId: contractConfig.chainId,
  });
  const { data: tokenSymbol, isError: symbolError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "symbol",
    chainId: contractConfig.chainId,
  });

  const { data: totalSupply, isError: supplyError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "totalSupply",
    chainId: contractConfig.chainId,
  });

  return {
    tokenName,
    tokenSymbol,
    totalSupply,
    symbolError,
    supplyError,
    nameError,
    nameLoading,
    ownerAddress,
    ownerError,
    ownerLoading,
  };
}

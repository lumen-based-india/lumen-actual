import { baseSepoliaABI } from "@/constants/baseSepoliaABI";
import { createPublicClient } from "viem";
import { baseSepolia } from "viem/chains";
import { http, useReadContract } from "wagmi";

export const contractConfig = {
  address: "0x6d1910D535cDd08b9D0c224Ed4B1eE7e6a582AD3" as `0x${string}`,
  abi: baseSepoliaABI,
  chainId: 84532 as 84532,
};
export const publicClient = createPublicClient({
  chain: baseSepolia,
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

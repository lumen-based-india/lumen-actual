import { localhostABI } from "@/constants/localhostABI";
import { createPublicClient } from "viem";
import { hardhat } from "viem/chains";
import { http, useReadContract, useWriteContract } from "wagmi";

export const contractConfig = {
  address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" as `0x${string}`,
  abi: localhostABI,
  chainId: 31337,
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
    chainId: 31337,
  });
  const {
    data: ownerAddress,
    isError: ownerError,
    isLoading: ownerLoading,
  } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "owner",
    chainId: 31337,
  });
  const { data: tokenSymbol, isError: symbolError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "symbol",
    chainId: 31337,
  });

  const { data: totalSupply, isError: supplyError } = useReadContract({
    abi: contractConfig.abi,
    address: contractConfig.address,
    functionName: "totalSupply",
    chainId: 31337,
  });

  const getHolderBalance = (holderAddress: string) => {
    const { data: balance, isError: balanceError } = useReadContract({
      abi: contractConfig.abi,
      address: contractConfig.address,
      functionName: "getHolderBalance",
      args: [holderAddress],
      chainId: 31337,
    });
    return { balance, balanceError };
  };
  const { writeContractAsync: distribute, isPending: claimIsPending } =
    useWriteContract();

  const distributeTokens = async (args: any[]) => {
    try {
      const { request } = await publicClient.simulateContract({
        account,
        address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2", // Contract address
        abi: wagmiAbi, // ABI for the contract
        functionName: "distribute", // Specify the distribute function
        args, // Pass any arguments needed for the distribute function
      });

      // Write the transaction to the blockchain
      const response = await walletClient.writeContract(request);

      console.log("Transaction successful:", response);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return {
    tokenName,
    tokenSymbol,
    totalSupply,
    getHolderBalance,
    symbolError,
    supplyError,
    nameError,
    nameLoading,
    ownerAddress,
    ownerError,
    ownerLoading,
  };
}

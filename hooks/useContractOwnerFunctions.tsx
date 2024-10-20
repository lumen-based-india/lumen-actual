import { useEffect, useState } from "react";
import { createWalletClient, http, createContract, custom } from "viem";
import { mainnet } from "viem/chains";
import { contractConfig } from "./useLumenToken";

type UseContractReturn = {
  callContractFunction: (functionName: string, ...args: any[]) => Promise<void>;
  response: any;
  error: Error | null;
  loading: boolean;
};

export const useContractWithPrivateKey = (
  privateKey: string,
): UseContractReturn => {
  const [contract, setContract] = useState<any | null>(null);
  const [walletClient, setWalletClient] = useState<any | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!privateKey) {
      console.error("Private key is required");
      return;
    }

    const walletClientInstance = createWalletClient({
      account: privateKey as `0x${string}`,
      // Use privateKey to create the wallet
      chain: mainnet,
      transport: http("http://127.0.0.1:8545"),
    });

    setWalletClient(walletClientInstance);

    const contractInstance = createContract({
      abi: contractConfig.abi,
      address: contractConfig.address,
      walletClient: custom(walletClientInstance),
    });

    console.log("Contract instance:", contractInstance);
    setContract(contractInstance);
  }, [privateKey]);

  const callContractFunction = async (
    functionName: string,
    ...args: any[]
  ): Promise<void> => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the function dynamically
      const txHash = await contract[functionName](...args);
      const receipt = await walletClient?.waitForTransactionReceipt({
        hash: txHash,
      });
      setResponse(receipt);
      console.log("Contract call response:", receipt);
    } catch (err: any) {
      console.error("Contract call failed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    callContractFunction,
    response,
    error,
    loading,
  };
};

import { contractConfig } from "@/hooks/useLumenToken";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/MvvvA0pRWUEs-okhgMQpOWchgwRxHXfM"); 
const PRIVATE_KEY =
  process.env.NEXT_PUBLIC_PRIVATE_KEY ||
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contractAddress = contractConfig.address; // Replace with your actual contract address

const contract = new ethers.Contract(
  contractAddress,
  contractConfig.abi,
  wallet,
);

export async function distributeTokensAndSendEthSeparately(
  recipient: `0x${string}`,
  tokenAmount: string,
) {
  try {
    const tokenValue = ethers.parseUnits(tokenAmount, 18); // Assuming 18 decimals for the tokens
    console.log(`Sending ${tokenAmount} tokens to ${recipient}`);
    const distributeTx = await contract.distribute(recipient, tokenValue);

    const distributeReceipt = await distributeTx.wait();
    console.log("Tokens distributed successfully:", distributeReceipt);

    return { distributeReceipt };
  } catch (error) {
    console.error("Error in sending transaction:", error);
    throw new Error("Transaction failed");
  }
}

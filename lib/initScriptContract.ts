import { contractConfig } from "@/hooks/useLumenToken";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Hardhat local network
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
  ethAmount: string,
) {
  try {
    const tokenValue = ethers.parseUnits(tokenAmount, 18); // Assuming 18 decimals for the tokens
    const ethValue = ethers.parseEther(ethAmount); // Convert ethAmount to wei
    console.log(`Sending ${tokenAmount} tokens to ${recipient}`);
    const distributeTx = await contract.distribute(recipient, tokenValue);

    const distributeReceipt = await distributeTx.wait();
    console.log("Tokens distributed successfully:", distributeReceipt);

    console.log(`Sending ${ethAmount} ETH to ${recipient}`);
    const ethTransferTx = await wallet.sendTransaction({
      to: recipient,
      value: ethValue,
    });

    const ethTransferReceipt = await ethTransferTx.wait();
    console.log("ETH sent successfully:", ethTransferReceipt);

    return { distributeReceipt, ethTransferReceipt };
  } catch (error) {
    console.error("Error in sending transaction:", error);
    throw new Error("Transaction failed");
  }
}

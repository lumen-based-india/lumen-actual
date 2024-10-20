import { http, createConfig } from "wagmi";
import { baseSepolia, hardhat } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [hardhat, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "Create Wagmi",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [hardhat.id]: http(),
    [baseSepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/utils/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";

const LumenAPP = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="relative flex flex-col flex-1">{children}</main>
      </div>
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const LumenAppWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId="cm6zb6bih046412xjfa0r7s2o"
          config={{
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://lumen-based-india.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flumen-verbose.b8290fa2.png&w=3840&q=75",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          <LumenAPP>{children}</LumenAPP>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

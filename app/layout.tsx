import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LumenAppWithProviders } from "@/components/LumenAppWithProviders";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Lumen",
  description:
    "Lumen - Leveraging Unified Marketplace for Environmental Net-zero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
          <LumenAppWithProviders>{children}</LumenAppWithProviders>
      </body>
    </html>
  );
}

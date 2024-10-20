"use client";
import { ProvideCompany } from "@/providers/CompanyProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProvideCompany>{children}</ProvideCompany>;
}

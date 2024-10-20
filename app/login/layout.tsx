"use client";
import { ProvideCompany } from "@/providers/CompanyProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvideCompany>
      <div className="max-w-md mx-auto w-full">{children}</div>
    </ProvideCompany>
  );
}

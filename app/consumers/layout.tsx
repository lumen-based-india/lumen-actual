"use client";

import { ProvideCompany } from "@/providers/CompanyProvider";
import { ArrowBigLeft } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProvideCompany>
      <ArrowBigLeft
        className="mx-auto h-8 w-8 mt-2"
        onClick={() => {
          window.history.back();
        }}
      />
      <div className="max-w-md mx-auto w-full">{children}</div>
    </ProvideCompany>
  );
}

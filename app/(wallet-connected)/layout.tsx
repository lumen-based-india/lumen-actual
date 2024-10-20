"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  BarChart2,
  GitBranch,
  Truck,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ProvideCompany } from "@/providers/CompanyProvider";
import CompanyHeader from "@/components/companyHeader";
import lumenFull from "../../app/lumen-full.png";

const sidebarItems = [
  { name: "Impact Overview", icon: BarChart2, href: "/impact-overview" },
  { name: "DPP Trace", icon: GitBranch, href: "/dpp-trace" },
  { name: "Market Place", icon: Truck, href: "/marketplace" },
  { name: "Trade Carbon", icon: Leaf, href: "/trade-carbon" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { address } = useAccount();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Only perform navigation to /login on the client side
  useEffect(() => {
    if (!address) {
      push("/login");
    }
  }, [address, push]);

  // Hydration-safe sidebar state
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Avoid rendering until mounted on client
  if (!hasMounted) return null;
  return (
    <ProvideCompany>
      <div className="bg-background">
        <div className="flex h-screen">
          <aside
            className={`bg-card transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "w-64" : "w-20"
            } flex flex-col`}
          >
            <div className="flex items-center justify-between p-4">
              <Link
                href={"/"}
                passHref
                className={` ${isSidebarOpen ? "" : "hidden"}`}
              >
                <Image
                  src={lumenFull}
                  alt="Lumen logo"
                  className="w-24 mb-[-2rem] mt-[-2rem]"
                />
              </Link>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-primary hover:text-background transition-colors duration-200 text-primary"
              >
                {isSidebarOpen ? (
                  <ChevronLeft size={24} />
                ) : (
                  <ChevronRight size={24} />
                )}
              </button>
            </div>
            <div className="flex-1">
              <ul className="space-y-2 p-4">
                {sidebarItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} passHref>
                      <span
                        className={`flex items-center space-x-2 p-2 rounded-xl hover:bg-white-200 transition-colors duration-200 ${
                          pathname === item.href
                            ? "bg-primary text-background"
                            : ""
                        }`}
                      >
                        <item.icon size={24} />
                        {isSidebarOpen && <span>{item.name}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1 overflow-y-auto">
            <CompanyHeader />
            {children}
          </div>
        </div>
      </div>
    </ProvideCompany>
  );
}

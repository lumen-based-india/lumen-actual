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
  Users,
} from "lucide-react";
import { useAccount } from "wagmi";
import { ProvideCompany } from "@/providers/CompanyProvider";
import CompanyHeader from "@/components/companyHeader";

const sidebarItems = [
  { name: "Impact Overview", icon: BarChart2, href: "/impact-overview" },
  { name: "DPP Trace", icon: GitBranch, href: "/dpp-trace" },
  { name: "MarketPlace", icon: Truck, href: "/marketplace" },
  { name: "Trade Carbon", icon: Leaf, href: "/trade-carbon" },
  { name: "Consumers", icon: Users, href: "/consumers" },
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
        <div className="flex h-screen text-secondary">
          <aside
            className={`bg-card-foreground transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "w-64" : "w-20"
            } flex flex-col`}
          >
            <div className="flex items-center justify-between p-4">
              <Link
                href={"/"}
                passHref
                className={`font-bold text-xl ${isSidebarOpen ? "" : "hidden"}`}
              >
                Lumen
              </Link>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-secondary hover:text-primary transition-colors duration-200 text-secondary"
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
                            ? "bg-secondary text-primary"
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

          <div className="flex-1 overflow-y-auto text-secondary bg-secondary">
            <CompanyHeader />
            {children}
          </div>
        </div>
      </div>
    </ProvideCompany>
  );
}

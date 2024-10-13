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
  HomeIcon,
} from "lucide-react";
import { useAccount } from "wagmi";

const sidebarItems = [
  { name: "Impact Overview", icon: BarChart2, href: "/impact-overview" },
  { name: "DPP Trace", icon: GitBranch, href: "/dpp-trace" },
  { name: "Suppliers", icon: Truck, href: "/suppliers" },
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
    <div className="bg-background">
      <div className="flex h-screen text-secondary">
        <aside
          className={`bg-primary transition-all duration-300 ease-in-out ${
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
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
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
                        pathname === item.href ? "bg-secondary text-black" : ""
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
        <div className="flex-1 overflow-y-auto text-primary bg-transparent">
          <div className="flex items-center justify-between p-4 bg-primary text-white">
            <div className="flex items-center space-x-4">
              <img
                src="https://levi.in/cdn/shop/files/logo_his_res.png?v=1697785388&width=160"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-bold text-xl">Levis</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

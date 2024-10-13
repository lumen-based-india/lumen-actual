"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLumenToken } from "@/hooks/useLumenToken";
import {
  ArrowRight,
  BarChart2,
  Globe,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function Index() {
  const { tokenName, nameError, nameLoading } = useLumenToken();

  console.log(tokenName, nameError, nameLoading);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-700">LUMEN</h1>
            <ThemeSwitcher />
          </nav>
        </header>
        <main className="container mx-auto px-4 py-16 space-y-24">
          <section className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-green-800">
              Leveraging Unified Marketplace for Environmental Net-zero
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              LUMEN is revolutionizing eco-conscious marketplaces with
              blockchain technology, bringing transparency and efficiency to ESG
              reporting and sustainable supply chains.
            </p>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 shadow-lg shadow-yellow-200/50"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          </section>
          <section>
            <h3 className="text-3xl font-semibold text-center mb-12 text-green-800">
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-yellow-200 shadow-yellow-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Globe className="mr-2 text-yellow-500" />
                    On-chain Eco Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Track and manage Digital Product Passports (DPP) as smart
                  contracts, ensuring transparency and compliance throughout the
                  supply chain.
                </CardContent>
              </Card>
              <Card className="border-yellow-200 shadow-yellow-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Zap className="mr-2 text-yellow-500" />
                    Insets Tokenization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Tokenize and trade environmental insets, creating a new
                  marketplace for sustainability-focused investments and
                  offsetting.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why LUMEN */}
          <section className="bg-white rounded-lg shadow-xl p-8 border border-yellow-100">
            <h3 className="text-3xl font-semibold text-center mb-8 text-green-800">
              Why LUMEN?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <BarChart2 className="w-12 h-12 text-yellow-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-green-700">
                  Transparent ESG Reporting
                </h4>
                <p>
                  Simplify and democratize ESG data construction and reporting.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-12 h-12 text-yellow-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-green-700">
                  Combat Greenwashing
                </h4>
                <p>
                  Build trust and ensure compliance with transparent, verifiable
                  data.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-yellow-500 mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-green-700">
                  Secure Smart Contracts
                </h4>
                <p>
                  Ensure timely payments and meet ESG criteria automatically.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="text-3xl font-semibold text-center mb-12 text-green-800">
              Benefits for Stakeholders
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-yellow-200 shadow-yellow-100">
                <CardHeader>
                  <CardTitle className="text-green-700">
                    For Suppliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Timely payments through smart contracts</li>
                    <li>Simplified ESG reporting and compliance</li>
                    <li>Access to new markets and customers</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 shadow-yellow-100">
                <CardHeader>
                  <CardTitle className="text-green-700">
                    For Businesses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Easy access to compliant supplier ecosystems</li>
                    <li>Streamlined ESG reporting and target setting</li>
                    <li>Opportunity to trade inset tokens</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 shadow-yellow-100">
                <CardHeader>
                  <CardTitle className="text-green-700">
                    For Consumers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Enhanced product traceability and trust</li>
                    <li>Support for eco-conscious brands</li>
                    <li>Transparency in environmental impact</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-12 shadow-lg shadow-yellow-200/30">
            <h3 className="text-3xl font-bold mb-4">
              Join the Sustainable Revolution
            </h3>
            <p className="text-xl mb-8">
              Be part of the movement towards a more transparent, efficient, and
              eco-conscious marketplace. LUMEN is leading the way to a
              sustainable future.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

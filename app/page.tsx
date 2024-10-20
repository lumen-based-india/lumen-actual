"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLumenToken } from "@/hooks/useLumenToken";
import {
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
      <div className="min-h-screen">
        <header className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">LUMEN</h1>
            <ThemeSwitcher />
          </nav>
        </header>
        <main className="container mx-auto px-4 py-16 space-y-24">
          <section className="text-center space-y-6">
            <h2 className="text-4xl font-bold">
              Leveraging Unified Marketplace for Environmental Net-zero
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              LUMEN is revolutionizing eco-conscious marketplaces with
              blockchain technology, bringing transparency and efficiency to ESG
              reporting and sustainable supply chains.
            </p>
            <Button size="lg" className="rounded-xl">
              <Link href="/login">Get Started</Link>
            </Button>
          </section>
          <section>
            <h3 className="text-3xl font-semibold text-center mb-12">
              Key Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2" />
                    On-chain Eco Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Track and manage Digital Product Passports (DPP) as smart
                  contracts, ensuring transparency and compliance throughout the
                  supply chain.
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2" />
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
          <section className="rounded-xl p-8">
            <h3 className="text-3xl font-semibold text-center mb-8">
              Why LUMEN?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="flex flex-col items-center text-center rounded-xl p-6">
                <CardContent>
                  <div className="flex justify-center">
                    <BarChart2 className="w-12 h-12 mb-4" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Transparent ESG Reporting
                  </h4>
                  <p>
                    Simplify and democratize ESG data construction and reporting.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center rounded-xl p-6">
                <CardContent>
                  <div className="flex justify-center">
                    <ShieldCheck className="w-12 h-12 mb-4" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Combat Greenwashing
                  </h4>
                  <p>
                    Build trust and ensure compliance with transparent, verifiable
                    data.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center rounded-xl p-6">
                <CardContent>
                  <div className="flex justify-center">
                    <Lock className="w-12 h-12 mb-4" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Secure Smart Contracts
                  </h4>
                  <p>
                    Ensure timely payments and meet ESG criteria automatically.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h3 className="text-3xl font-semibold text-center mb-12">
              Benefits for Stakeholders
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>For Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Timely payments through smart contracts</li>
                    <li>Simplified ESG reporting and compliance</li>
                    <li>Access to new markets and customers</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>For Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Easy access to compliant supplier ecosystems</li>
                    <li>Streamlined ESG reporting and target setting</li>
                    <li>Opportunity to trade inset tokens</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>For Consumers</CardTitle>
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

          <section className="text-center rounded-lg p-12">
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

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart2,
  Globe,
  ShieldCheck,
  Zap,
  Lock,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import lumenVerbose from "./lumen-verbose.png";
import lumenFull from "./lumen-full.jpg";
import lumenSmall from "./lumen-small.png";
import screenshot from "./impact-ss.png";
import phoness from "./phone-ss.png";
const matters = [
  {
    title: "Discover verified Green brands",
    content:
      "Measurement, Reporting and Validation (MRV) Certified brands with comprehensive ESG proof and future emission estimates available on-demand",
  },
  {
    title: "Replace Tax leakage with Green Investments in your Supply Chain",
    content:
      "Track regulatory implications of your real-time sustainability efforts; Leverage minted Carbon Inset Tokens or $LUMENs to reward your Suppliers for environmental initiatives to reduce your own footprint",
  },
  {
    title: "Build brand equity and get Consumers to execute EPRs FOR YOU",
    content:
      "Declare your product’s sourcing and environmental trace with Digital Product Passports (DPPs) to build consumer trust, avoid non-disclosure penalties, and reward them for circularity via on-platform recyclers",
  },
];

const whyLumen = [
  {
    title:
      "Sustainability initiatives are fragmented, because supply chains are fragmented",
    content: [
      "86% of all emissions are Scope 3 (upstream suppliers and downstream distributors), and vendor data creation and sharing is a challenge",
      "Finding truly green raw materials, green vendors is guess work",
    ],
  },
  {
    title: "Greenwashing has eroded trust in sustainability claims",
    content: [
      "79% of Indian consumers predicate decisions to buy based on sustainability",
      "75% of Consumers do not trust accuracy on food labels (certification standards, conformity in supply chain)",
      "73% want more traceability for better purchasing decisions",
    ],
  },
  {
    title:
      "Climate policy are catching up with Climate change, the market is not",
    content: [
      "Circularity breaks at post-consumption, denting government Extended Producer Responsibility (EPR) regulations",
      "Green regulation is at an all-time high, with EUDR and EU CBAM potentially denting Indian GDP by 0.05% due to non-compliance",
    ],
  },
];
export default function Index() {
  return (
    // <>
    //   <div className="min-h-screen">
    //     <header className="container mx-auto px-4 py-8">
    //       <nav className="flex justify-between items-center">
    //         <h1 className="text-2xl font-bold">LUMEN</h1>
    //         <ThemeSwitcher />
    //       </nav>
    //     </header>
    //     <main className="container mx-auto px-4 py-16 space-y-24">
    //       <section className="text-center space-y-6">
    //         <h2 className="text-4xl font-bold">
    //           Leveraging Unified Marketplace for Environmental Net-zero
    //         </h2>
    //         <p className="text-xl max-w-2xl mx-auto">
    //           LUMEN is revolutionizing eco-conscious marketplaces with
    //           blockchain technology, bringing transparency and efficiency to ESG
    //           reporting and sustainable supply chains.
    //         </p>
    //         <Button size="lg" className="rounded-xl">
    //           <Link href="/login">Get Started</Link>
    //         </Button>
    //       </section>
    //       <section>
    //         <h3 className="text-3xl font-semibold text-center mb-12">
    //           Key Features
    //         </h3>
    //         <div className="grid md:grid-cols-2 gap-8">
    //           <Card className="rounded-xl">
    //             <CardHeader>
    //               <CardTitle className="flex items-center">
    //                 <Globe className="mr-2" />
    //                 On-chain Eco Marketplace
    //               </CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               Track and manage Digital Product Passports (DPP) as smart
    //               contracts, ensuring transparency and compliance throughout the
    //               supply chain.
    //             </CardContent>
    //           </Card>
    //           <Card className="rounded-xl">
    //             <CardHeader>
    //               <CardTitle className="flex items-center">
    //                 <Zap className="mr-2" />
    //                 Insets Tokenization
    //               </CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               Tokenize and trade environmental insets, creating a new
    //               marketplace for sustainability-focused investments and
    //               offsetting.
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </section>

    //       {/* Why LUMEN */}
    //       <section className="rounded-xl p-8">
    //         <h3 className="text-3xl font-semibold text-center mb-8">
    //           Why LUMEN?
    //         </h3>
    //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    //           <Card className="flex flex-col items-center text-center rounded-xl p-6">
    //             <CardContent>
    //               <div className="flex justify-center">
    //                 <BarChart2 className="w-12 h-12 mb-4" />
    //               </div>
    //               <h4 className="text-xl font-semibold mb-2">
    //                 Transparent ESG Reporting
    //               </h4>
    //               <p>
    //                 Simplify and democratize ESG data construction and
    //                 reporting.
    //               </p>
    //             </CardContent>
    //           </Card>
    //           <Card className="flex flex-col items-center text-center rounded-xl p-6">
    //             <CardContent>
    //               <div className="flex justify-center">
    //                 <ShieldCheck className="w-12 h-12 mb-4" />
    //               </div>
    //               <h4 className="text-xl font-semibold mb-2">
    //                 Combat Greenwashing
    //               </h4>
    //               <p>
    //                 Build trust and ensure compliance with transparent,
    //                 verifiable data.
    //               </p>
    //             </CardContent>
    //           </Card>
    //           <Card className="flex flex-col items-center text-center rounded-xl p-6">
    //             <CardContent>
    //               <div className="flex justify-center">
    //                 <Lock className="w-12 h-12 mb-4" />
    //               </div>
    //               <h4 className="text-xl font-semibold mb-2">
    //                 Secure Smart Contracts
    //               </h4>
    //               <p>
    //                 Ensure timely payments and meet ESG criteria automatically.
    //               </p>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </section>

    //       {/* Benefits */}
    //       <section>
    //         <h3 className="text-3xl font-semibold text-center mb-12">
    //           Benefits for Stakeholders
    //         </h3>
    //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    //           <Card className="rounded-xl">
    //             <CardHeader>
    //               <CardTitle>For Suppliers</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               <ul className="list-disc pl-5 space-y-2">
    //                 <li>Timely payments through smart contracts</li>
    //                 <li>Simplified ESG reporting and compliance</li>
    //                 <li>Access to new markets and customers</li>
    //               </ul>
    //             </CardContent>
    //           </Card>
    //           <Card className="rounded-xl">
    //             <CardHeader>
    //               <CardTitle>For Businesses</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               <ul className="list-disc pl-5 space-y-2">
    //                 <li>Easy access to compliant supplier ecosystems</li>
    //                 <li>Streamlined ESG reporting and target setting</li>
    //                 <li>Opportunity to trade inset tokens</li>
    //               </ul>
    //             </CardContent>
    //           </Card>
    //           <Card className="rounded-xl">
    //             <CardHeader>
    //               <CardTitle>For Consumers</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //               <ul className="list-disc pl-5 space-y-2">
    //                 <li>Enhanced product traceability and trust</li>
    //                 <li>Support for eco-conscious brands</li>
    //                 <li>Transparency in environmental impact</li>
    //               </ul>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </section>

    //       <section className="text-center rounded-lg p-12">
    //         <h3 className="text-3xl font-bold mb-4">
    //           Join the Sustainable Revolution
    //         </h3>
    //         <p className="text-xl mb-8">
    //           Be part of the movement towards a more transparent, efficient, and
    //           eco-conscious marketplace. LUMEN is leading the way to a
    //           sustainable future.
    //         </p>
    //       </section>
    //     </main>
    //   </div>
    // </>
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-center items-center h-screen">
        <Image src={lumenVerbose} alt="Lumen Verbose" className="w-1/3" />
      </div>
      <div className="h-screen flex flex-col justify-center items-center gap-8">
        <div className="flex items-center">
          <Image src={lumenFull} alt="Lumen Logo" className="w-36" />
          <div className="text-3xl font-bold mt-[8px]">
            ate what matters and Unlock value
          </div>
        </div>
        <div className="flex gap-8 justify-center mt-[-56px]">
          {matters.map((matter, index) => (
            <Card
              key={index}
              className="rounded-xl w-96 flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="leading-normal text-center">
                  {matter.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{matter.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button className="rounded-xl text-xl">Find out Why</Button>
      </div>
      <div className="h-screen flex flex-col gap-8 justify-center items-center">
        <div className="flex items-center">
          <div className="text-3xl font-bold mt-[8px] pr-1">Why</div>
          <Image src={lumenFull} alt="Lumen Logo" className="w-36" />
          <div className="text-3xl font-bold mt-[8px]">?</div>
        </div>
        <div className="mt-[-56px] text-2xl font-semibold">
          Our Supply chains are broken and Sustainability is a vanity project
        </div>
        <div className="flex gap-8 justify-center">
          {whyLumen.map((item, index) => (
            <Card
              key={index}
              className="rounded-xl w-96 flex flex-col justify-between h-96"
            >
              <CardHeader>
                <CardTitle className="leading-normal text-center">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 flex flex-col gap-4">
                  {item.content.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center relative p-16 gap-24">
        <Card className="rounded-xl w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">For Business</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full justify-between p-8 items-center">
            <div className="flex flex-col gap-4 w-1/3">
              <div>
                Seamlessly integrate with blockchain-based real-time tracking of
                your sustainability efforts, from sourcing to consumer purchase.
              </div>
              <div>
                With LUMEN, you'll meet emerging regulations effortlessly, tap
                into a network of eco-conscious consumers, and unlock new
                revenue streams through our innovative tokenomics.{" "}
              </div>
              <div>
                Join us in shaping the future of sustainable commerce – where
                doing good for the planet translates directly to your bottom
                line.
              </div>
              <Button size="lg" className="rounded-xl w-fit mt-4">
                <Link href="/login">Get Started</Link>{" "}
              </Button>
            </div>
            <div className="mockup-window border w-1/2">
              <div className="flex justify-center">
                <Image src={screenshot} alt="Lumen Logo" className="" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">For Consumers</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full justify-between p-8 items-center">
            <div className="flex flex-col gap-4 w-1/3">
              <div>
                Imagine if every purchase you made could make a real difference
                for the planet. With LUMEN, it can.
              </div>
              <div>
                We're an app that turns your everyday shopping into a force for
                good. Every time you buy from our network of eco-friendly
                brands, you earn LUMEN tokens – think of them as 'planet
                points'. These tokens have real value: use them for discounts,
                trade them with friends, or even cash them out.
              </div>
              <div>
                But it's more than just rewards – it's about being part of a
                movement. You'll see the exact impact of your choices and
                influence brands to be more sustainable.
              </div>
              <div>
                Every transaction is a positive change - one token at a time.
              </div>
              <div className="text-2xl font-semibold">
                With LUMEN, you’re not just a consumer, you’re a{" "}
                <span className="text-slate-600">Changemaker</span>
              </div>
              <Button size="lg" className="rounded-xl w-fit mt-4">
                <Link href="/consumers">Download App</Link>{" "}
              </Button>
            </div>
            <div className="mockup-phone mr-0">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1 bg-white">
                  <Image src={phoness} alt="Lumen Logo" className="pt-12" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-screen p-16 flex justify-center items-center">
        <Card className="rounded-xl w-full flex flex-col">
          <CardHeader>
            <div className="flex w-full justify-between">
              {" "}
              <div className="flex flex-col gap-2">
                {" "}
                <CardTitle className="text-4xl">Empower Business.</CardTitle>
                <CardTitle className="text-4xl">Delight Customers.</CardTitle>
                <CardTitle className="text-4xl">Heal the Planet.</CardTitle>
              </div>
              <div>
                <Link
                  href="mailto:lumen@based.com"
                  className="text-blue-500 hover:underline"
                >
                  lumen@based.com
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-evenly">
            <Image src={lumenVerbose} alt="Lumen Logo" className="w-96 z-0" />
            <div className="flex flex-col gap-8">
              <div className="flex gap-4 mt-[-56px] z-10">
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
                <Link
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6 text-gray-600 hover:text-blue-500" />
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center text-sm font-semibold z-10">
              Proudly built on Base &lt;3 @2024
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

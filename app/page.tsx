"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import lumenVerbose from "./lumen-verbose.png";
import lumenFull from "./lumen-full.png";
import screenshot from "./impact-ss.png";
import phoness from "./phone-ss.png";
import landingVec from "./landing-vector.jpeg";
import aboutUsVec from "./aboutus-vector.jpeg";

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

const handleSectionRedirect = (sectionName: string) => {
  document
    .querySelector(`section[about="${sectionName}"]`)
    ?.scrollIntoView({ behavior: "smooth" });
};
export default function Index() {
  return (
    <div className="w-full flex flex-col snap-y snap-mandatory overflow-y-scroll bg-white">
      <SectionHero />
      <SectionMatters />
      <SectionWhyLumen />
      <SectionForBusiness />
      <SectionForConsumers />
      <SectionFooter />
    </div>
  );
}

function SectionHero() {
  return (
    <section
      about="main"
      className="flex justify-center items-center h-screen relative snap-start"
    >
      <Image
        src={lumenVerbose}
        alt="Lumen Verbose"
        className="w-48 absolute top-4 left-4 mt-[-4rem]"
      />
      <div className="flex items-center text-justify gap-8 justify-center mr-[-4rem]">
        <div className="flex flex-col gap-2  items-start">
          <div className="text-4xl font-semibold tracking-wider">LUMEN</div>
          <div className="text-xl">Illuminating Sustainable Commerce</div>
          <div className="flex gap-4 pt-4">
            <Button
              className="rounded-xl"
              onClick={() => {
                handleSectionRedirect("business");
              }}
            >
              For Businesses
            </Button>
            <Button
              className="rounded-xl"
              onClick={() => {
                handleSectionRedirect("consumers");
              }}
            >
              For Customers
            </Button>
          </div>
        </div>
        <Image src={landingVec} alt="Lumen Verbose" className="w-1/2" />
      </div>
    </section>
  );
}

function SectionMatters() {
  return (
    <section
      about="matters"
      className="h-screen flex flex-col justify-center items-center gap-8 snap-start"
    >
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
            className="rounded-xl w-96 flex flex-col justify-between bg-background"
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
      <Button
        size={"lg"}
        className="rounded-xl"
        onClick={() => handleSectionRedirect("why")}
      >
        Find out Why
      </Button>
    </section>
  );
}

function SectionWhyLumen() {
  return (
    <section
      about="why"
      className="h-screen flex flex-col gap-8 justify-center items-center snap-start"
    >
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
            className="rounded-xl w-96 flex flex-col justify-between h-96 bg-background"
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
    </section>
  );
}

function SectionForBusiness() {
  return (
    <section
      about="business"
      className="flex flex-col justify-center items-center relative p-16 gap-24 h-screen snap-start"
    >
      <Card className="rounded-xl w-full bg-background">
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
              into a network of eco-conscious consumers, and unlock new revenue
              streams through our innovative tokenomics.
            </div>
            <div>
              Join us in shaping the future of sustainable commerce – where
              doing good for the planet translates directly to your bottom line.
            </div>
            <Button size="lg" className="rounded-xl w-fit mt-4">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
          <div className="mockup-window border w-1/2 bg-white">
            <div className="flex justify-center">
              <Image src={screenshot} alt="Lumen Logo" className="" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function SectionForConsumers() {
  return (
    <section
      about="consumers"
      className="flex flex-col justify-center items-center relative p-16 gap-24 snap-start"
    >
      <Card className="rounded-xl w-full bg-background">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">For Consumers</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full justify-evenly p-8 items-center">
          <div className="mockup-phone ml-0 mr-0">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 bg-white">
                <Image src={phoness} alt="Lumen Logo" className="pt-12" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            <div>
              Imagine if every purchase you made could make a real difference
              for the planet. With LUMEN, it can.
            </div>
            <div>
              We're an app that turns your everyday shopping into a force for
              good. Every time you buy from our network of eco-friendly brands,
              you earn LUMEN tokens – think of them as 'planet points'. These
              tokens have real value: use them for discounts, trade them with
              friends, or even cash them out.
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
              <Link href="/consumers">Download App</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function SectionFooter() {
  return (
    <section
      about="us"
      className="h-screen p-16 flex justify-center items-center snap-start"
    >
      <Card className="rounded-xl w-full flex flex-col">
        <CardHeader>
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
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
        <CardContent className="flex flex-col justify-between w-full">
          <div className="flex justify-between w-full">
            {" "}
            <div className="flex flex-col justify-evenly">
              {" "}
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
            </div>
            <Image src={aboutUsVec} alt="vector" className="w-[70%] h-1/2" />
          </div>

          <div className="w-full flex justify-center text-sm font-semibold z-10">
            Proudly built on Base &lt;3 @2024
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

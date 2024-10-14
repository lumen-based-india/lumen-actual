"use client";

import { useState } from "react";
import BarGauge from "@/components/bar-gaugev2";
import ESG from "@/components/ui/esg";
import { Button } from "@/components/ui/button"; // Assuming there's a Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompanyContext } from "@/providers/CompanyProvider";
import CSRComponent from "@/components/csr-component";

export default function ImpactOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentCompanyData } = useCompanyContext();

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const dataCompletenessMap = [
    {
      title: "Environmental protection",
      subTitle:
        "Key performance indicators cover electricity consumption, water usage and air emissions.",
      value: 80,
    },
    {
      title: "Human rights",
      subTitle: "Focus on human rights violations and minimum and fair wages.",
      value: 75,
    },
    {
      title: "Integrity",
      subTitle:
        "Performance indicators include anti-corruption, anti-bribery and conflicts of interest policies.",
      value: 70,
    },
    {
      title: "Employee well-being",
      subTitle:
        "Metrics focused on parental benefits, employee accessibility and the percentage of unionized workers.",
      value: 85,
    },
    {
      title: "Inclusive growth",
      subTitle: "Policies favoring vulnerable and marginalized groups.",
      value: 65,
    },
    {
      title: "Sustainable goods and services",
      subTitle:
        "Information on investments in social and environmental impacts.",
      value: 90,
    },
    {
      title: "Responsible consumer engagement",
      subTitle:
        "KPIs encompass handling consumer complaints and feedback, product recall procedures and cybersecurity and data privacy policies.",
      value: 78,
    },
    {
      title: "Stakeholder responsiveness",
      subTitle:
        "Describing engagement with vulnerable and marginalized groups.",
      value: 82,
    },
    {
      title: "Responsible public policy engagement",
      subTitle:
        "Listing trade and industry affiliations and detailing issues relating to anticompetitive conduct.",
      value: 88,
    },
  ];
  return (
    <div className="p-8 flex flex-col w-full gap-4">
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Impact Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-evenly gap-4 w-full">
            <div>
              <ESG companyData={currentCompanyData} />
            </div>
            <div>
              <BarGauge companyData={currentCompanyData} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="rounded-xl flex-1">
          <CardHeader>
            <CardTitle>Compliance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-16">
              <div>
                <div className="text-lg font-bold mb-2">EU</div>
                <Button
                  onClick={handleButtonClick}
                  className="bg-white border border-gray-300 rounded-xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold py-4 px-6 shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                    EUDR
                  </span>
                </Button>
              </div>
              <div>
                <div className="text-lg font-bold mb-2">India</div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleButtonClick}
                    className="bg-white border border-gray-300 rounded-xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold py-4 px-6 shadow-lg transform transition-transform duration-300 hover:scale-105"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                      BSRS
                    </span>
                  </Button>
                  <Button
                    onClick={handleButtonClick}
                    className="bg-white border border-gray-300 rounded-xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold py-4 px-6 shadow-lg transform transition-transform duration-300 hover:scale-105"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                      CCTS
                    </span>
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold mb-2">Middle East</div>
                <Button
                  onClick={handleButtonClick}
                  className="bg-white border border-gray-300 rounded-xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-bold py-4 px-6 shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
                    ADX
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <CSRComponent />
        {/* <Card className="rounded-xl flex-1">
          <CardHeader>
            <CardTitle>Data Completeness</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {dataCompletenessMap.map((item, index) => (
              <Card className="w-full h-52">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.subTitle}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            ))}
          </CardContent>
        </Card> */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-1/3 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4">Upload Compliance Report</h2>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <Button
                onClick={handleCloseModal}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600"
              >
                Close
              </Button>
              <Button
                onClick={handleCloseModal}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-green-600"
              >
                Submit for Verification
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

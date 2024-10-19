import React from "react";
import { Button } from "./ui/button";

type Props = {
  region: string;
};

const Europe = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-16 items-center">
        <div className="text-lg font-bold">EUDR</div>
        <div className="flex gap-4">
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Export PDF
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit ZK Proof
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit for Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

const India = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-16 items-center">
        <div className="text-lg font-bold">BRSR</div>
        <div className="flex gap-4">
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Export PDF
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit ZK Proof
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit for Audit
          </Button>
        </div>
      </div>
      <div className="flex gap-16 items-center">
        <div className="text-lg font-bold">CCTS</div>
        <div className="flex gap-4">
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Export PDF
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit ZK Proof
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit for Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

const MiddleEast = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-16 items-center">
        <div className="text-lg font-bold">ADX</div>
        <div className="flex gap-4">
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Export PDF
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit ZK Proof
          </Button>
          <Button className="bg-white border border-gray-300 text-black py-2 px-4 rounded-xl hover:bg-gray-100 transition-transform transform hover:scale-105">
            Submit for Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

const ComplainceComponent = (props: Props) => {
  switch (props.region) {
    case "Europe":
      return <Europe />;
    case "India":
      return <India />;
    case "Middle East":
      return <MiddleEast />;
    default:
      return <div>Invalid Region</div>;
  }
};

export default ComplainceComponent;

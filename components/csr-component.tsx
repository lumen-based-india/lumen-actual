"use client";

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CSRData = [
  {
    name: "Environmental protection",
    value: 7,
    description:
      "Key performance indicators cover electricity consumption, water usage and air emissions.",
  },
  {
    name: "Human rights",
    value: 8,
    description: "Focus on human rights violations and minimum and fair wages.",
  },
  {
    name: "Integrity",
    value: 9,
    description:
      "Performance indicators include anti-corruption, anti-bribery and conflicts of interest policies.",
  },
  {
    name: "Employee well-being",
    value: 6,
    description:
      "Metrics focused on parental benefits, employee accessibility and the percentage of unionized workers.",
  },
  {
    name: "Inclusive growth",
    value: 5,
    description: "Policies favoring vulnerable and marginalized groups.",
  },
  {
    name: "Sustainable goods and services",
    value: 7,
    description:
      "Information on investments in social and environmental impacts.",
  },
  {
    name: "Responsible consumer engagement",
    value: 8,
    description:
      "KPIs encompass handling consumer complaints and feedback, product recall procedures and cybersecurity and data privacy policies.",
  },
  {
    name: "Stakeholder responsiveness",
    value: 6,
    description:
      "Describing engagement with vulnerable and marginalized groups.",
  },
  {
    name: "Responsible public policy engagement",
    value: 7,
    description:
      "Listing trade and industry affiliations and detailing issues relating to anticompetitive conduct.",
  },
];

const GaugeChart = ({ data }: { data: (typeof CSRData)[0] }) => {
  const maxValue = 10;
  const angle = (data.value / maxValue) * 180;

  // Determine the color based on the value
  let startColor, endColor;
  if (data.value >= 1 && data.value <= 3) {
    startColor = "#ef4444"; // red
    endColor = "#ef4444"; // red
  } else if (data.value >= 4 && data.value <= 7) {
    startColor = "#f59e0b"; // yellow
    endColor = "#f59e0b"; // yellow
  } else if (data.value >= 8 && data.value <= 10) {
    startColor = "#22c55e"; // green
    endColor = "#22c55e"; // green
  }

  return (
    <ResponsiveContainer height={100} width={100}>
      <RadialBarChart
        innerRadius="60%"
        outerRadius="90%"
        data={[data]}
        dataKey={"value"}
        cy={"80%"}
        startAngle={180}
        endAngle={180 - angle}
      >
        <RadialBar
          background
          dataKey="value"
          cornerRadius={30}
          fill={`url(#${data.name.replace(/\s+/g, "")})`}
        />
        <defs>
          <linearGradient
            id={data.name.replace(/\s+/g, "")}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
const CSRMetricCard = ({ data }: { data: (typeof CSRData)[0] }) => {
  return (
    <Card className="flex justify-between items-center transform transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-lg">{data.name}</CardTitle>
        <CardDescription className="text-xs">{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <GaugeChart data={data} />
          <p className="text-center text-sm text-muted-foreground">
            {data.value}/10
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
const CSRComponent = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Completeness</CardTitle>
        <CardDescription>
          Click on any tile add more data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {CSRData.map((item) => (
            <CSRMetricCard data={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CSRComponent;

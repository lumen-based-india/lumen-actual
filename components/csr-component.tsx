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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 rounded-lg shadow-lg border border-border">
        <p className="font-bold">{payload[0].payload.name}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].payload.description}
        </p>
        <p className="font-semibold mt-1">Score: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

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
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart
        innerRadius="60%"
        outerRadius="100%"
        data={[data]}
        dataKey={"value"}
        cy={"85%"}
        startAngle={180}
        endAngle={180 - angle}
      >
        <RadialBar
          background
          dataKey="value"
          cornerRadius={30}
          fill={`url(#${data.name.replace(/\s+/g, "")})`}
        />
        <Tooltip content={<CustomTooltip />} />
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

const CSRComponent = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Corporate Social Responsibility Metrics</CardTitle>
        <CardDescription>
          Performance indicators across 9 key areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3">
          {CSRData.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <GaugeChart data={item} />
              <h3 className="text-center font-semibold">{item.name}</h3>
              <p className="text-center text-sm text-muted-foreground">
                {item.value}/10
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CSRComponent;

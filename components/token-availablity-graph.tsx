"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    date: "Oct 2021",
    series1: 14,
    series2: 12,
    series3: 8,
    series4: 7,
    series5: 6,
  },
  {
    date: "Apr 2022",
    series1: 4,
    series2: 3.5,
    series3: 3,
    series4: 2.5,
    series5: 2,
  },
  {
    date: "Oct 2022",
    series1: 2.5,
    series2: 2.3,
    series3: 2,
    series4: 1.8,
    series5: 1.5,
  },
  {
    date: "Apr 2023",
    series1: 1.8,
    series2: 1.6,
    series3: 1.4,
    series4: 1.2,
    series5: 1,
  },
  {
    date: "Oct 2023",
    series1: 1.5,
    series2: 1.3,
    series3: 1.1,
    series4: 0.9,
    series5: 0.7,
  },
  {
    date: "Apr 2024",
    series1: 1.2,
    series2: 1,
    series3: 0.8,
    series4: 0.6,
    series5: 0.4,
  },
  {
    date: "Oct 2024",
    series1: 1,
    series2: 0.8,
    series3: 0.6,
    series4: 0.4,
    series5: 0.2,
  },
];

export default function TokenAvailabilityGraph() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Inset Token Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            series1: { label: "Canvaloop", color: "#8884d8" },
            series2: { label: "Unforus", color: "#82ca9d" },
            series3: { label: "Zerocircle", color: "#ffc658" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="series1"
                strokeWidth={2}
                dot={false}
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="series2"
                strokeWidth={2}
                dot={false}
                stroke="#82ca9d"
              />
              <Line
                type="monotone"
                dataKey="series3"
                strokeWidth={2}
                dot={false}
                stroke="#ffc658"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartLegend className="mt-4" />
      </CardContent>
    </Card>
  );
}

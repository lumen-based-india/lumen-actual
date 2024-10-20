"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { date: "Sep 2020", Toucan: 2, Emissions: 2, C3: 0 },
  { date: "Feb 2022", Toucan: 18, Emissions: 20, C3: 19 },
  { date: "Jun 2023", Toucan: 20, Emissions: 22, C3: 21 },
  { date: "Oct 2024", Toucan: 22, Emissions: 24, C3: 23 },
];

export default function TokenRequirementGraph() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Inset Token Requirement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            Toucan: { label: "Target", color: "#6366f1" },
            Emissions: { label: "Emissions", color: "#22c55e" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
                tickFormatter={(value) => `${value}m`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="Toucan"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Emissions"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <ChartLegend className="mt-4" />
      </CardContent>
    </Card>
  );
}

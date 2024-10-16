"use client";

import React, { Component } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {};
const data = [
  { date: "Sep 2020", Toucan: 2, Moss: 2, C3: 0 },
  { date: "Feb 2022", Toucan: 18, Moss: 20, C3: 19 },
  { date: "Jun 2023", Toucan: 20, Moss: 22, C3: 21 },
  { date: "Oct 2024", Toucan: 22, Moss: 24, C3: 23 },
];
class TokenRequirementGraph extends Component<Props> {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inset Token Requirement</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={200} width="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value}m`} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Toucan"
                stroke="#8884d8"
                fill="#8884d8"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Moss"
                stroke="#82ca9d"
                fill="#82ca9d"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="C3"
                stroke="#ffc658"
                fill="#ffc658"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
}

export default TokenRequirementGraph;

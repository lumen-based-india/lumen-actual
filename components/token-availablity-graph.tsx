"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {};
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
const TokenAvailablityGraph = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inset Token Availablity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 16]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="series1"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="series2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="series3" stroke="#ffc658" />
            <Line type="monotone" dataKey="series4" stroke="#ff7300" />
            <Line type="monotone" dataKey="series5" stroke="#00C49F" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TokenAvailablityGraph;

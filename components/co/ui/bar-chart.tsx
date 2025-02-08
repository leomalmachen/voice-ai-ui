"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardFooter } from "../../co/lib/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../lib/chart";

interface BarChartProps {
  data: { date: string; calls: number }[];
}

export function BarChartComponent({ data }: BarChartProps) {
  const chartConfig: ChartConfig = {
    label: "Calls",
    color: "hsl(var(--chart-1))",
  };

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              interval={2} // Show every third label to prevent overcrowding
            />
            <ChartTooltip>
              <ChartTooltipContent hideLabel>
                <div>Tooltip Content Here</div>
              </ChartTooltipContent>
            </ChartTooltip>
            <Bar dataKey="calls" fill="var(--color-calls)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing daily call volume for the last 30 days
        </div>
      </CardFooter>
    </Card>
  );
}

export interface ChartConfig {
  label: string;
  color: string;
}
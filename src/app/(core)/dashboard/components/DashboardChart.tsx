"use client";
// Dependencies
import { useEffect, useState } from "react";
// Components
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Hooks
import { useIsMobile } from "@/hooks/use-mobile";

const chartData = [
  { date: "2024-04-01", confirmadas: 18, canceladas: 3 },
  { date: "2024-04-02", confirmadas: 12, canceladas: 1 },
  { date: "2024-04-03", confirmadas: 21, canceladas: 4 },
  { date: "2024-04-04", confirmadas: 30, canceladas: 2 },
  { date: "2024-04-05", confirmadas: 45, canceladas: 5 },
  { date: "2024-04-06", confirmadas: 38, canceladas: 3 },
  { date: "2024-04-07", confirmadas: 27, canceladas: 2 },
  { date: "2024-04-08", confirmadas: 50, canceladas: 6 },
  { date: "2024-04-09", confirmadas: 8,  canceladas: 1 },
  { date: "2024-04-10", confirmadas: 33, canceladas: 4 },
  { date: "2024-04-15", confirmadas: 15, canceladas: 2 },
  { date: "2024-04-20", confirmadas: 11, canceladas: 1 },
  { date: "2024-04-25", confirmadas: 27, canceladas: 3 },
  { date: "2024-04-30", confirmadas: 56, canceladas: 7 },
  { date: "2024-05-05", confirmadas: 61, canceladas: 5 },
  { date: "2024-05-10", confirmadas: 37, canceladas: 3 },
  { date: "2024-05-15", confirmadas: 58, canceladas: 6 },
  { date: "2024-05-20", confirmadas: 22, canceladas: 2 },
  { date: "2024-05-25", confirmadas: 25, canceladas: 3 },
  { date: "2024-05-31", confirmadas: 43, canceladas: 4 },
  { date: "2024-06-01", confirmadas: 22, canceladas: 1 },
  { date: "2024-06-05", confirmadas: 11, canceladas: 2 },
  { date: "2024-06-10", confirmadas: 19, canceladas: 1 },
  { date: "2024-06-15", confirmadas: 38, canceladas: 4 },
  { date: "2024-06-20", confirmadas: 51, canceladas: 6 },
  { date: "2024-06-25", confirmadas: 18, canceladas: 2 },
  { date: "2024-06-30", confirmadas: 56, canceladas: 5 },
];

const chartConfig = {
  confirmadas: {
    label: "Confirmadas",
    color: "var(--primary)",
  },
  canceladas: {
    label: "Canceladas",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const TIME_RANGES = [
  { value: "90d", label: "Últimos 3 meses" },
  { value: "30d", label: "Últimos 30 días" },
  { value: "7d",  label: "Últimos 7 días" },
];

export default function DashboardChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    const daysMap: Record<string, number> = { "90d": 90, "30d": 30, "7d": 7 };
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - (daysMap[timeRange] ?? 30));
    return date >= startDate;
  });

  const totalConfirmadas = filteredData.reduce((sum, d) => sum + d.confirmadas, 0);

  return (
    <Card className="border-border/60 shadow-sm @container/card">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <CardTitle className="text-base font-semibold">
            Reservas por período
          </CardTitle>
          <CardDescription className="mt-0.5">
            {totalConfirmadas} reservas confirmadas ·{" "}
            {TIME_RANGES.find(r => r.value === timeRange)?.label.toLowerCase()}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-36 h-8 text-xs bg-background border-border/80 shrink-0"
            aria-label="Seleccionar período"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {TIME_RANGES.map(r => (
              <SelectItem key={r.value} value={r.value} className="rounded-lg text-sm">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[220px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillConfirmadas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--color-confirmadas)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-confirmadas)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillCanceladas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--color-canceladas)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--color-canceladas)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              className="text-xs"
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString("es-MX", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString("es-MX", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="canceladas"
              type="natural"
              fill="url(#fillCanceladas)"
              stroke="var(--color-canceladas)"
              strokeWidth={1.5}
              stackId="a"
            />
            <Area
              dataKey="confirmadas"
              type="natural"
              fill="url(#fillConfirmadas)"
              stroke="var(--color-confirmadas)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

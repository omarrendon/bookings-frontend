"use client";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import type { DashboardPeriod, DashboardReservationsByStatus } from "@/lib/api/types";

const chartConfig = {
  confirmadas: { label: "Confirmadas", color: "var(--primary)" },
  pendientes:  { label: "Pendientes",  color: "var(--pending)" },
  canceladas:  { label: "Canceladas",  color: "var(--destructive)" },
} satisfies ChartConfig;

const TIME_RANGES: { value: DashboardPeriod; label: string }[] = [
  { value: 90, label: "Últimos 3 meses" },
  { value: 30, label: "Últimos 30 días" },
  { value: 7,  label: "Últimos 7 días"  },
];

interface DashboardChartProps {
  period: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  byStatus?: DashboardReservationsByStatus;
  isLoading?: boolean;
}

export default function DashboardChart({
  period,
  onPeriodChange,
  byStatus,
  isLoading = false,
}: DashboardChartProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) onPeriodChange(7);
  }, [isMobile, onPeriodChange]);

  const total = byStatus
    ? byStatus.confirmed + byStatus.pending + byStatus.cancelled
    : 0;

  const chartData = byStatus
    ? [
        { status: "Confirmadas", value: byStatus.confirmed, fill: "var(--color-confirmadas)" },
        { status: "Pendientes",  value: byStatus.pending,   fill: "var(--color-pendientes)"  },
        { status: "Canceladas",  value: byStatus.cancelled, fill: "var(--color-canceladas)"  },
      ]
    : [];

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div className="space-y-0.5 flex-1 min-w-0">
          <CardTitle className="text-base font-semibold">
            Reservas por estado
          </CardTitle>
          <CardDescription>
            {isLoading
              ? "Cargando..."
              : `${total} reservas · últimos ${byStatus?.period_days ?? period} días`}
          </CardDescription>
        </div>

        <Select
          value={String(period)}
          onValueChange={v => onPeriodChange(Number(v) as DashboardPeriod)}
        >
          <SelectTrigger
            className="w-36 h-8 text-xs bg-background border-border/80 shrink-0"
            aria-label="Seleccionar período"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {TIME_RANGES.map(r => (
              <SelectItem key={r.value} value={String(r.value)} className="rounded-lg text-sm">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-2 sm:px-6 sm:pt-4">
        {isLoading ? (
          <div className="h-[240px] flex items-end gap-6 px-8 pb-6">
            {[70, 45, 30].map((h, i) => (
              <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%` }} />
            ))}
          </div>
        ) : !byStatus || total === 0 ? (
          <div className="h-[240px] flex items-center justify-center text-sm text-muted-foreground">
            Sin datos para el período seleccionado
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[240px] w-full">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              barCategoryGap="35%"
            >
              <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
              <XAxis
                dataKey="status"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)", opacity: 0.4, radius: 6 }}
                content={<ChartTooltipContent hideLabel indicator="dot" />}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={80}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

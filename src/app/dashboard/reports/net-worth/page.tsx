"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "@/components/chart";
import { getCurrentValue, getPercentageChange } from "@/utils/net-worth";
import ChartCard from "../components/chart-card";
import { CustomTooltip } from "../components/custom-tool-tip";
import { formatCurrency } from "@/utils/dashboard";

export default function NetWorthPage() {
  const netWorthData: any = [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tendencia del Patrimonio Neto
        </h1>
        <p className="text-muted-foreground">
          Comprenda cómo su patrimonio neto ha cambiado con el tiempo
        </p>
      </div>

      <ChartCard
        title="Tendencia del Patrimonio Neto"
        description="Su patrimonio neto en los últimos 15 meses"
        height="h-[400px]"
      >
        <LineChart data={netWorthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="netWorth"
            name="Net Worth"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartCard>

      <ChartCard
        title="Activos vs Pasivos"
        description="Desglose de sus activos y pasivos a lo largo del tiempo"
        height="h-[400px]"
      >
        <AreaChart data={[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="assets"
            name="Assets"
            stackId="1"
            stroke="#4ade80"
            fill="#4ade80"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="liabilities"
            name="Liabilities"
            stackId="2"
            stroke="#f43f5e"
            fill="#f43f5e"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ChartCard>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Patrimonio neto actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(getCurrentValue(netWorthData, "netWorth"))}
            </div>
            <p className="text-xs text-muted-foreground">
              {getPercentageChange(netWorthData, "netWorth")}% Crecimiento desde{" "}
              {netWorthData[0].date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recursos totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(getCurrentValue(netWorthData, "assets"))}
            </div>
            <p className="text-xs text-muted-foreground">
              {getPercentageChange(netWorthData, "assets")}% Crecimiento desde{" "}
              {netWorthData[0].date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Pasivos totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(getCurrentValue(netWorthData, "liabilities"))}
            </div>
            <p className="text-xs text-muted-foreground">
              {getPercentageChange(netWorthData, "liabilities", true)}%
              Reducción desde {""}
              {netWorthData[0].date}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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
import { useGetNetWorth } from "@/hooks/net-worth/use-get-net-worth";
import { EmptyState } from "@/components/ui/empty-state";
import { LineChart as LineChartIcon } from "lucide-react";
import ReportSkeleton from "../components/income-expense-skeleton";

function formatDate(date: string): string {
  const months = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
  };

  const [year, month] = date.split("-");
  return `${months[month as keyof typeof months]} ${year}`;
}

export default function NetWorthPage() {
  const { data: netWorthData, isLoading } = useGetNetWorth();
  const startDate = netWorthData?.[0]?.date
    ? formatDate(netWorthData[0].date)
    : "N/A";
  const currentNetWorth = getCurrentValue(netWorthData ?? [], "netWorth");
  const currentAssets = getCurrentValue(netWorthData ?? [], "assets");
  const currentLiabilities = getCurrentValue(netWorthData ?? [], "liabilities");
  const netWorthChange = getPercentageChange(netWorthData ?? [], "netWorth");
  const assetsChange = getPercentageChange(netWorthData ?? [], "assets");
  const liabilitiesChange = getPercentageChange(netWorthData ?? [], "liabilities", true);

  const formattedData = (netWorthData ?? []).map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

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

      {(!netWorthData || isLoading) ? (
        <ReportSkeleton />
      ) : netWorthData.length === 0 ? (
        <EmptyState
          icon={LineChartIcon}
          title="No hay datos disponibles"
          description="Comienza registrando tus primeras transacciones para ver el análisis de tu patrimonio neto."
          actionLabel="Registrar transacción"
          actionLink="/dashboard/transactions"
        />
      ) : (
        <>
          <ChartCard
            title="Tendencia del Patrimonio Neto"
            description="Su patrimonio neto acumulado"
            height="h-[400px]"
          >
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="netWorth"
                name="Patrimonio Neto"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartCard>

          <ChartCard
            title="Activos vs Pasivos"
            description="Desglose de sus activos y pasivos acumulados"
            height="h-[400px]"
          >
            <AreaChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="assets"
                name="Activos"
                stackId="1"
                stroke="#4ade80"
                fill="#4ade80"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="liabilities"
                name="Pasivos"
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
                  Patrimonio neto total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(currentNetWorth)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {netWorthChange.toFixed(1)}% Crecimiento desde {startDate}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Activos totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(currentAssets)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {assetsChange.toFixed(1)}% Crecimiento desde {startDate}
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
                  {formatCurrency(currentLiabilities)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {liabilitiesChange.toFixed(1)}% Reducción desde {startDate}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

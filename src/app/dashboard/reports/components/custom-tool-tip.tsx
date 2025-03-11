import { Tooltip } from "@/components/chart";

interface CustomTooltipProps {
  formatter?: any
}

export function CustomTooltip({formatter}: CustomTooltipProps) {
  return (
    <Tooltip
      formatter={formatter}
      labelStyle={{ color: "var(--foreground)" }}
      contentStyle={{
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
      }}
    />
  );
}
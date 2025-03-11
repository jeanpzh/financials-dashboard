import {
  ResponsiveContainer,
} from "@/components/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { ReactElement } from "react";

interface Props {
  title: string;
  description: string;
  children: ReactElement;
  height: string;
}

export default function ChartCard({ ...props }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={props.height}>
          <ResponsiveContainer width="100%" height="100%">
            {props.children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

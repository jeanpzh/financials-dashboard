"use client";
import React from "react";
import RootModal from "./components/root-modal";
import { DashboardLayout } from "@/components/dashboard-layout";
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <DashboardLayout>
      <RootModal />
      {children}
    </DashboardLayout>
  );
}

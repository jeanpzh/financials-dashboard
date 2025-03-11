"use client";
import React from "react";
import RootModal from "./components/root-modal";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Suspense } from "react";
import Loader from "@/components/loader";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <DashboardLayout>
      <RootModal />
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </DashboardLayout>
  );
}

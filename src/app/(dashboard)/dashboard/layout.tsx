/* eslint-disable @typescript-eslint/no-unused-vars */
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardHeader from "./_components/DashboardHeader";

const Dashboarddlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
            <DashboardSidebar/>

            <main className="bg-gray-100 w-full">
                <DashboardHeader/>

                { children }
            </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboarddlayout;

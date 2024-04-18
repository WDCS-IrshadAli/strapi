"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayoutResizable = ({childrenx, data}: {childrenx:any, data: any}) => {
  const defaultLayout = [265, 440, 655];
  const defaultCollapsed = false;
  const navCollapsedSize = 4;
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return (
    <>
      <div>
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-screen max-w-screen border"
        >
          {/* HEADER  */}
          <ResizablePanel defaultSize={7} minSize={7} maxSize={7}>
            <div className="h-full">
              <AdminNavbar />
            </div>
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel defaultSize={93}>
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-screen max-w-screen border"
            >
              <ResizablePanel defaultSize={20} minSize={15} maxSize={20}>
                <div>
                  <AdminSidebar data={data} />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={85}>
                <div>
                  <span className="font-semibold">{childrenx}</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* 
        <ResizablePanelGroup
            direction="horizontal"
            // className="w-full border"
            className="h-full max-h-[800px] items-stretch bg-slate-500"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                  sizes
                )}`
              }}
            >
            <ResizablePanel 
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={15}
                maxSize={20}
                className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
            >
                <div className={cn("flex h-screen items-center justify-center", isCollapsed ? 'h-screen': 'px-2')}>
                <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>


            <ResizableHandle withHandle />


            <ResizablePanel>
                <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={defaultLayout[3]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={15}
                maxSize={15}>
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel  defaultSize={defaultLayout[3]}>
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                    </div>
                </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            
            </ResizablePanelGroup> */}
      </div>
    </>
  );
};

export default AdminLayoutResizable;

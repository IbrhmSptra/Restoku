"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import logoDark from "../../../public/restoku-logo-dark.png";
import logoLight from "../../../public/restoku-logo-light.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import UserNav from "./user-nav";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { theme } = useTheme();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="min-h-20">
                <Image
                  className="max-w-40 h-full max-h-20 object-cover mx-auto"
                  src={theme == "light" ? logoLight : logoDark}
                  alt="Restoku Logo"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <UserNav />
      </SidebarHeader>
      <SidebarContent>{/* Content here */}</SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="text-xs text-gray-300">
              @Restoku - Operational Restaurant Manager
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

import { DarkModeToggle } from "@/components/common/DarkModeToggle";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative" suppressHydrationWarning>
      <DarkModeToggle />
      {children}
    </div>
  );
}

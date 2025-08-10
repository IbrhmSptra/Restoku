import { DarkModeToggle } from "@/components/common/dark-mode-toggle";
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

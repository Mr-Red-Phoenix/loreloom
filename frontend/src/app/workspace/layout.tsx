import React, { Suspense } from "react";
import { SidebarSectionDividersDemo } from "../../components/SidebarSectionDividers";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050505", color: "#fff" }}>
      <Suspense fallback={<div style={{ width: "80px", background: "#08080a" }} />}>
        <SidebarSectionDividersDemo />
      </Suspense>
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </main>
    </div>
  );
}

"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Image, 
  Database, 
  Share2, 
  ArrowLeft 
} from "lucide-react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const worldId = searchParams.get("worldId") || "";

  const querySuffix = worldId ? `?worldId=${worldId}` : "";

  const navItems = [
    { name: "Workspace", path: `/workspace`, icon: BookOpen },
    { name: "Canon Gallery", path: `/workspace/gallery`, icon: Image },
    { name: "Provenance Page", path: `/workspace/provenance`, icon: Database },
    { name: "Shareable Canon File", path: `/workspace/shareable`, icon: Share2 },
  ];

  return (
    <aside 
      style={{
        width: isCollapsed ? "56px" : "210px",
        background: "#0a0a0c",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        height: "100vh",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxSizing: "border-box"
      }}
    >
      {/* Uppermost header: Collapse button only */}
      <div style={{ 
        padding: "16px", 
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: isCollapsed ? "center" : "flex-end", 
        boxSizing: "border-box" 
      }}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            boxSizing: "border-box"
          }}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Sub-Pages */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "20px 10px", flex: 1, boxSizing: "border-box" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={`${item.path}${querySuffix}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: isCollapsed ? "10px 0" : "10px 12px",
                borderRadius: "8px",
                color: isActive ? "#fff" : "rgba(255, 255, 255, 0.6)",
                background: isActive ? "rgba(255, 255, 255, 0.05)" : "transparent",
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "all 0.2s",
                justifyContent: isCollapsed ? "center" : "flex-start",
                boxSizing: "border-box"
              }}
              title={item.name}
            >
              <Icon size={18} style={{ color: isActive ? "var(--accent-purple)" : "inherit" }} />
              {!isCollapsed && <span style={{ fontWeight: 500 }}>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Lowermost footer: Go to Dashboard button */}
      <div style={{ 
        padding: "16px 10px", 
        borderTop: "1px solid rgba(255, 255, 255, 0.05)", 
        boxSizing: "border-box" 
      }}>
        <Link 
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: isCollapsed ? "10px 0" : "10px 12px",
            borderRadius: "8px",
            color: "rgba(255, 255, 255, 0.7)",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            justifyContent: isCollapsed ? "center" : "flex-start",
            boxSizing: "border-box"
          }}
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
      </div>
    </aside>
  );
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050505", color: "#fff" }}>
      <Suspense fallback={<div style={{ width: "56px", background: "#0a0a0c" }} />}>
        <Sidebar />
      </Suspense>
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </main>
    </div>
  );
}

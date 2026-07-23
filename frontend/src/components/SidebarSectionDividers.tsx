"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Folder,
  PieChart,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Layers
} from "lucide-react";
import { useStory } from "../context/StoryContext";

export interface NavSubItem {
  label: string;
  badge?: number | string;
  href: string;
}

export interface NavItemType {
  label: string;
  href?: string;
  icon?: React.ElementType;
  badge?: React.ReactNode;
  items?: NavSubItem[];
  divider?: false;
}

export interface NavItemDividerType {
  divider: true;
}

export type NavItem = NavItemType | NavItemDividerType;

export function SidebarSectionDividersDemo() {
  const pathname = usePathname();
  const { activeWorld, worlds } = useStory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    "Projects & Worlds": true
  });

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Genesis Engine",
      href: "/genesis",
      icon: Sparkles,
      badge: (
        <span style={styles.badgeSuccess}>
          Active
        </span>
      ),
    },
    { divider: true },
    {
      label: "Projects & Worlds",
      icon: Folder,
      items: [
        { 
          label: activeWorld?.name ? `Active: ${activeWorld.name}` : "Genesis Intake", 
          href: "/genesis", 
          badge: worlds.length 
        },
        { 
          label: "View All Worlds", 
          href: "/dashboard", 
          badge: worlds.length 
        },
      ],
    },
    { divider: true },
    {
      label: "Story Archives",
      href: "/workspace/gallery",
      icon: Layers,
    },
    {
      label: "Provenance & On-Chain",
      href: "/workspace/provenance",
      icon: PieChart,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      label: "Support & Docs",
      href: "/workspace/shareable",
      icon: HelpCircle,
      badge: (
        <span style={styles.badgeOnline}>
          <span style={styles.badgeDot} />
          Online
        </span>
      ),
    },
    {
      label: "OKX X Layer Faucet",
      href: "https://www.okx.com/xlayer",
      icon: ExternalLink,
    },
  ];

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={styles.aside}
    >
      {/* Top Header & Collapse Toggle */}
      <div style={styles.topHeader}>
        {isSidebarOpen ? (
          <>
            <Link href="/" style={styles.logoGroup}>
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <g filter="url(#sidebar_logo_filter0)">
                  <g clipPath="url(#sidebar_logo_clip0)">
                    <rect width="48" height="48" rx="12" fill="#0A0A0A"/>
                    <rect width="48" height="48" fill="url(#sidebar_logo_paint0)"/>
                    <g filter="url(#sidebar_logo_filter1)">
                      <path d="M9 12.75C9 10.6789 10.6789 9 12.75 9H20.25C22.3211 9 24 10.6789 24 12.75V20.1144C24.0002 20.1594 24.0003 20.2046 24.0003 20.25C24.0003 22.3181 25.6744 23.9952 27.7413 24C27.7442 24 27.7471 24 27.75 24H35.25C37.3211 24 39 25.6789 39 27.75V35.25C39 37.3211 37.3211 39 35.25 39H27.75C25.6789 39 24 37.3211 24 35.25V27.75C24 27.7396 24 27.7292 24.0001 27.7188C23.9834 25.6621 22.3109 24 20.2503 24C20.2406 24 20.2309 24 20.2212 24H12.75C10.6789 24 9 22.3211 9 20.25V12.75Z" fill="url(#sidebar_logo_paint1)"/>
                    </g>
                  </g>
                  <rect x="1" y="1" width="46" height="46" rx="11" stroke="url(#sidebar_logo_paint2)" strokeWidth="2"/>
                </g>
                <defs>
                  <filter id="sidebar_logo_filter0" x="0" y="-3" width="48" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="-3"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect3_innerShadow"/>
                    <feOffset/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                    <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>
                  </filter>
                  <filter id="sidebar_logo_filter1" x="6" y="5.25" width="36" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1.5" operator="erode" in="SourceAlpha" result="effect1_dropShadow"/>
                    <feOffset dy="2.25"/>
                    <feGaussianBlur stdDeviation="2.25"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                  </filter>
                  <linearGradient id="sidebar_logo_paint0" x1="24" y1="0" x2="26" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0"/>
                    <stop offset="1" stopColor="white" stopOpacity="0.12"/>
                  </linearGradient>
                  <linearGradient id="sidebar_logo_paint1" x1="24" y1="9" x2="24" y2="39" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.8"/>
                    <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                  </linearGradient>
                  <linearGradient id="sidebar_logo_paint2" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.12"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <clipPath id="sidebar_logo_clip0">
                    <rect width="48" height="48" rx="12" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span style={styles.logoText}>Loreloom</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={styles.toggleBtn}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, margin: "0 auto", display: "flex" }}
            title="Expand sidebar"
          >
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#sidebar_logo_collapsed_filter0)">
                <g clipPath="url(#sidebar_logo_collapsed_clip0)">
                  <rect width="48" height="48" rx="12" fill="#0A0A0A"/>
                  <rect width="48" height="48" fill="url(#sidebar_logo_collapsed_paint0)"/>
                  <g filter="url(#sidebar_logo_collapsed_filter1)">
                    <path d="M9 12.75C9 10.6789 10.6789 9 12.75 9H20.25C22.3211 9 24 10.6789 24 12.75V20.1144C24.0002 20.1594 24.0003 20.2046 24.0003 20.25C24.0003 22.3181 25.6744 23.9952 27.7413 24C27.7442 24 27.7471 24 27.75 24H35.25C37.3211 24 39 25.6789 39 27.75V35.25C39 37.3211 37.3211 39 35.25 39H27.75C25.6789 39 24 37.3211 24 35.25V27.75C24 27.7396 24 27.7292 24.0001 27.7188C23.9834 25.6621 22.3109 24 20.2503 24C20.2406 24 20.2309 24 20.2212 24H12.75C10.6789 24 9 22.3211 9 20.25V12.75Z" fill="url(#sidebar_logo_collapsed_paint1)"/>
                  </g>
                </g>
                <rect x="1" y="1" width="46" height="46" rx="11" stroke="url(#sidebar_logo_collapsed_paint2)" strokeWidth="2"/>
              </g>
              <defs>
                <filter id="sidebar_logo_collapsed_filter0" x="0" y="-3" width="48" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="-3"/>
                  <feGaussianBlur stdDeviation="1.5"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="3"/>
                  <feGaussianBlur stdDeviation="1.5"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect3_innerShadow"/>
                  <feOffset/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                  <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>
                </filter>
                <filter id="sidebar_logo_collapsed_filter1" x="6" y="5.25" width="36" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feMorphology radius="1.5" operator="erode" in="SourceAlpha" result="effect1_dropShadow"/>
                  <feOffset dy="2.25"/>
                  <feGaussianBlur stdDeviation="2.25"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                </filter>
                <linearGradient id="sidebar_logo_collapsed_paint0" x1="24" y1="0" x2="26" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.12"/>
                </linearGradient>
                <linearGradient id="sidebar_logo_collapsed_paint1" x1="24" y1="9" x2="24" y2="39" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.8"/>
                  <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                </linearGradient>
                <linearGradient id="sidebar_logo_collapsed_paint2" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.12"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <clipPath id="sidebar_logo_collapsed_clip0">
                  <rect width="48" height="48" rx="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div style={styles.navScrollContainer}>
        {navItems.map((item, idx) => {
          if (item.divider) {
            return (
              <div
                key={`divider-${idx}`}
                style={styles.divider}
              />
            );
          }

          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;
          const hasItems = Array.isArray(item.items) && item.items.length > 0;
          const isSubOpen = openSubmenus[item.label] ?? false;

          return (
            <div key={item.label} style={styles.navItemWrapper}>
              {hasItems ? (
                <div>
                  <button
                    onClick={() => {
                      if (!isSidebarOpen) setIsSidebarOpen(true);
                      toggleSubmenu(item.label);
                    }}
                    style={{
                      ...styles.navButton,
                      justifyContent: isSidebarOpen ? "space-between" : "center",
                    }}
                  >
                    <div style={styles.navLabelGroup}>
                      {Icon && <Icon size={18} style={styles.iconMuted} />}
                      {isSidebarOpen && <span style={styles.navText}>{item.label}</span>}
                    </div>
                    {isSidebarOpen && (
                      isSubOpen ? (
                        <ChevronDown size={14} style={styles.iconMuted} />
                      ) : (
                        <ChevronRight size={14} style={styles.iconMuted} />
                      )
                    )}
                  </button>

                  <AnimatePresence>
                    {isSubOpen && isSidebarOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={styles.subMenuContainer}
                      >
                        {item.items?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            style={{
                              ...styles.subNavLink,
                              color: pathname === sub.href ? "#fff" : "var(--text-secondary)",
                              fontWeight: pathname === sub.href ? 600 : 400,
                            }}
                          >
                            <span style={styles.subLabelText}>{sub.label}</span>
                            {sub.badge !== undefined && (
                              <span style={styles.subBadge}>{sub.badge}</span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.href?.startsWith("http") ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...styles.navLink,
                    justifyContent: isSidebarOpen ? "space-between" : "center",
                  }}
                >
                  <div style={styles.navLabelGroup}>
                    {Icon && <Icon size={18} style={styles.iconMuted} />}
                    {isSidebarOpen && <span style={styles.navText}>{item.label}</span>}
                  </div>
                </a>
              ) : (
                <Link
                  href={item.href || "#"}
                  style={{
                    ...styles.navLink,
                    ...(isActive ? styles.navLinkActive : {}),
                    justifyContent: isSidebarOpen ? "space-between" : "center",
                  }}
                >
                  <div style={styles.navLabelGroup}>
                    {Icon && (
                      <Icon
                        size={18}
                        style={isActive ? styles.iconActive : styles.iconMuted}
                      />
                    )}
                    {isSidebarOpen && (
                      <span
                        style={{
                          ...styles.navText,
                          color: isActive ? "#fff" : "var(--text-secondary)",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                  {isSidebarOpen && item.badge && <div>{item.badge}</div>}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer User Profile */}
      <div style={styles.footerProfile}>
        <div style={styles.avatar}>K</div>
        {isSidebarOpen && (
          <div style={styles.profileTextGroup}>
            <div style={styles.profileName}>KAITO-X</div>
            <div style={styles.profileSub}>kaito.x@loreloom.ai</div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  aside: {
    height: "100vh",
    position: "sticky",
    top: 0,
    background: "#08080a",
    borderRight: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexShrink: 0,
    zIndex: 40,
    userSelect: "none",
  },
  topHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 20px 16px 20px",
    height: "64px",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
  },
  logoText: {
    fontFamily: "var(--font-sans)",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.02em",
  },
  logoDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--accent-purple)",
    boxShadow: "0 0 8px var(--accent-purple)",
  },
  logoDotOnly: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "var(--accent-purple)",
    boxShadow: "0 0 10px var(--accent-purple)",
    margin: "0 auto",
  },
  toggleBtn: {
    background: "transparent",
    border: "none",
    color: "var(--text-muted)",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "color 0.2s",
  },
  navScrollContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  divider: {
    height: "1px",
    background: "rgba(255, 255, 255, 0.06)",
    margin: "8px 4px",
  },
  navItemWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "all 0.15s ease",
  },
  navLinkActive: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  navButton: {
    width: "100%",
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  navLabelGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },
  navText: {
    fontSize: "0.875rem",
    fontFamily: "var(--font-sans)",
    color: "var(--text-secondary)",
    whiteSpace: "nowrap",
  },
  iconMuted: {
    color: "var(--text-muted)",
    flexShrink: 0,
  },
  iconActive: {
    color: "var(--accent-purple)",
    flexShrink: 0,
  },
  subMenuContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    paddingLeft: "32px",
    marginTop: "2px",
    marginBottom: "4px",
  },
  subNavLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.8rem",
    fontFamily: "var(--font-sans)",
  },
  subLabelText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  subBadge: {
    background: "rgba(255, 255, 255, 0.08)",
    color: "var(--text-muted)",
    borderRadius: "100px",
    padding: "2px 8px",
    fontSize: "0.7rem",
    fontFamily: "var(--font-mono)",
  },
  badgeSuccess: {
    background: "rgba(34, 197, 94, 0.12)",
    color: "#4ade80",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    borderRadius: "100px",
    padding: "2px 8px",
    fontSize: "0.7rem",
    fontWeight: 600,
  },
  badgeOnline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(34, 197, 94, 0.1)",
    color: "#4ade80",
    borderRadius: "100px",
    padding: "2px 8px",
    fontSize: "0.7rem",
    fontWeight: 500,
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ade80",
  },
  footerProfile: {
    margin: "12px",
    padding: "12px",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 0 10px rgba(176, 38, 255, 0.2)",
  },
  profileTextGroup: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  profileName: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  profileSub: {
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

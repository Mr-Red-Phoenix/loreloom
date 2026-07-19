"use client";

import React from "react";
import { AntiGravitySynthesizer } from "./AntiGravitySynthesizer";
import { VisualSynthesisOverlay } from "./VisualSynthesisOverlay";

/**
 * Procedural SVG graphic component for the Main Canvas.
 *
 * Renders different SVG scenes based on the `seed` string:
 * - Empty/awaiting seeds → AntiGravitySynthesizer with ghost loading
 * - http / path URLs → image tag
 * - Seeds containing "grid" or "tokyo" → neon-grid SVG
 * - Seeds containing "cathedral" or "matrix" → cyber-gate SVG
 * - Seeds containing "islands", "sky", or "aether" → golden-islands SVG
 * - Everything else → core-glow SVG
 */
export function VisualCanonGraphic({
  seed,
  onRetrigger,
  previousSeed,
  isGenerating = false,
}: {
  seed: string;
  onRetrigger?: () => void;
  previousSeed?: string;
  isGenerating?: boolean;
}) {
  const isAwaiting = !seed || seed === "nexus-core" || seed === "awaiting-synthesis";

  if (isAwaiting) {
    return (
      <div data-testid="vcg-awaiting" style={{ width: "100%", height: "100%", position: "relative" }}>
        {previousSeed && previousSeed.startsWith("http") && (
          <div style={{ position: "absolute", inset: 0, opacity: 0.15, filter: "grayscale(1) blur(2px)" }}>
            <img src={previousSeed} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        {isGenerating ? (
          <AntiGravitySynthesizer label="Generating..." subtitle="" />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.1)" }} />
        )}
        {onRetrigger && <VisualSynthesisOverlay onRetrigger={onRetrigger} />}
      </div>
    );
  }

  if (seed.startsWith("http") || seed.startsWith("/") || seed.includes("/")) {
    return (
      <div data-testid="vcg-image" style={{ width: "100%", height: "100%", position: "relative" }}>
        <img
          src={seed}
          alt="Visual Synthesis Render"
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", display: "block" }}
        />
        {onRetrigger && <VisualSynthesisOverlay onRetrigger={onRetrigger} />}
      </div>
    );
  }

  if (seed.includes("grid") || seed.includes("tokyo")) {
    return (
      <div data-testid="vcg-grid" style={{ width: "100%", height: "100%", position: "relative" }}>
        <svg width="100%" height="100%" viewBox="0 0 500 360" style={{ borderRadius: "10px" }}>
          <defs>
            <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B026FF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#B026FF" stopOpacity={0} />
            </radialGradient>
          </defs>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h-${i}`} x1="10" y1={30 + i * 30} x2="490" y2={30 + i * 30} stroke="rgba(176, 38, 255, 0.1)" strokeWidth="1" />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={`v-${i}`} x1={20 + i * 30} y1="10" x2={20 + i * 30} y2="350" stroke="rgba(176, 38, 255, 0.1)" strokeWidth="1" />
          ))}
          <circle cx="250" cy="180" r="110" fill="url(#neonGlow)" />
          <circle cx="140" cy="90" r="4" fill="#B026FF" opacity={0.9} />
          <circle cx="260" cy="180" r="5" fill="#00D6FF" />
          <circle cx="170" cy="210" r="4" fill="#B026FF" />
          <line x1="140" y1="90" x2="260" y2="180" stroke="#B026FF" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="260" y1="180" x2="170" y2="210" stroke="#00D6FF" strokeWidth="1.5" />
        </svg>
        {onRetrigger && <VisualSynthesisOverlay onRetrigger={onRetrigger} />}
      </div>
    );
  }

  if (seed.includes("cathedral") || seed.includes("matrix")) {
    return (
      <div data-testid="vcg-cathedral" style={{ width: "100%", height: "100%", position: "relative" }}>
        <svg width="100%" height="100%" viewBox="0 0 500 360" style={{ borderRadius: "10px" }}>
          <defs>
            <linearGradient id="cyberGate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D6FF" />
              <stop offset="100%" stopColor="#B026FF" />
            </linearGradient>
          </defs>
          <rect x="80" y="60" width="40" height="240" fill="none" stroke="rgba(0, 214, 255, 0.12)" strokeWidth="1" />
          <rect x="140" y="30" width="220" height="300" fill="none" stroke="url(#cyberGate)" strokeWidth="1.5" />
          <rect x="380" y="60" width="40" height="240" fill="none" stroke="rgba(0, 214, 255, 0.12)" strokeWidth="1" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`hz-${i}`} x1="10" y1={220 + i * 20} x2="490" y2={220 + i * 20} stroke="rgba(176, 38, 255, 0.15)" strokeWidth="1" />
          ))}
          <circle cx="250" cy="120" r="6" fill="#00D6FF" />
        </svg>
        {onRetrigger && <VisualSynthesisOverlay onRetrigger={onRetrigger} />}
      </div>
    );
  }

  if (seed.includes("islands") || seed.includes("sky") || seed.includes("aether")) {
    return (
      <div data-testid="vcg-islands" style={{ width: "100%", height: "100%", position: "relative" }}>
        <svg width="100%" height="100%" viewBox="0 0 500 360" style={{ borderRadius: "10px" }}>
          <defs>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#eab308" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#eab308" stopOpacity={0} />
            </radialGradient>
          </defs>
          <path d="M70,140 L130,140 L150,165 L100,190 L60,165 Z" fill="none" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="1.5" />
          <path d="M250,90 L380,90 L405,120 L330,150 L240,125 Z" fill="none" stroke="#eab308" strokeWidth="2" />
          <circle cx="310" cy="110" r="50" fill="url(#goldGlow)" />
        </svg>
        {onRetrigger && <VisualSynthesisOverlay onRetrigger={onRetrigger} />}
      </div>
    );
  }

  return (
    <div data-testid="vcg-core" style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg width="100%" height="100%" viewBox="0 0 500 360" style={{ borderRadius: "10px" }}>
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B026FF" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#B026FF" stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle cx="250" cy="180" r="110" fill="url(#coreGlow)" />
        <circle cx="250" cy="180" r="80" fill="none" stroke="rgba(176,38,255,0.12)" strokeWidth="1.5" />
        <circle cx="250" cy="180" r="50" fill="none" stroke="rgba(0,214,255,0.10)" strokeWidth="1" />
        <circle cx="250" cy="180" r="7" fill="#B026FF" />
      </svg>
      {onRetrigger && <VisualSynthesisOverlay onRetrigger={onRetrigger} />}
    </div>
  );
}

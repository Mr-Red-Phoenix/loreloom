"use client";

import React from "react";

/**
 * A simple markdown-like renderer that handles:
 * - Bold text wrapped in ** **
 * - Bullet list items starting with * 
 * - Horizontal rules (---)
 * - Paragraph text
 */
export function SimpleMarkdown({ text }: { text: string }) {
  const cleanText = text.replace(/\\n/g, "\n");
  const lines = cleanText.split("\n");
  return (
    <div
      data-testid="simple-markdown"
      style={{ fontFamily: "Inter, var(--font-sans), sans-serif", lineHeight: 1.6, color: "rgba(255,255,255,0.82)" }}
    >
      {lines.map((line, i) => {
        if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
          const bold = line.trim().replace(/^\*\*/, "").replace(/\*\*$/, "");
          return <p key={i} style={{ fontWeight: 700, color: "#fff", margin: "0 0 8px 0", fontSize: "0.92rem" }}>{bold}</p>;
        }
        if (line.trim().startsWith("* ")) {
          return (
            <li key={i} data-testid="md-list-item" style={{ margin: "0 0 4px 16px", color: "rgba(255,255,255,0.68)", listStyle: "none" }}>
              • {line.trim().slice(2)}
            </li>
          );
        }
        if (line.trim() === "---") {
          return (
            <hr key={i} data-testid="md-hr" style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "8px 0" }} />
          );
        }
        return (
          <p key={i} data-testid="md-paragraph" style={{ margin: "0 0 6px 0", fontSize: "0.88rem" }}>
            {line.trim() || "\u00A0"}
          </p>
        );
      })}
    </div>
  );
}

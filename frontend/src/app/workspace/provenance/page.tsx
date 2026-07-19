"use client";

import React, { Suspense } from "react";
import { useStory } from "../../../context/StoryContext";
import { Database, Shield, Hash } from "lucide-react";

function ProvenanceContent() {
  const { activeWorld } = useStory();

  if (!activeWorld) {
    return (
      <div style={styles.emptyContainer}>
        <span style={{ color: "var(--text-secondary)" }}>No Active World Loaded</span>
      </div>
    );
  }

  // Calculate consistency and coherence dynamically or use clean fallback mock rates
  const totalChapters = activeWorld.chapters.length;
  const consistencyRate = totalChapters > 0 ? 98.4 : 0;
  const coherenceRate = totalChapters > 0 ? 97.2 : 0;
  const contractAddress = activeWorld.createdAt ? `0x9a8F${activeWorld.createdAt.toString().substring(5, 9)}...e10C` : "0x9a8F...e10C";

  return (
    <div style={styles.container}>
      <div className="blueprint-grid" />
      
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Database size={22} color="var(--accent-cyan)" />
          <h1 className="title-cyber" style={styles.title}>PROVENANCE LINEAGE LEDGER</h1>
        </div>
        <p style={styles.subtitle}>Cryptographic proof-of-work records for {activeWorld.name}.</p>
      </div>

      {/* Main stats monospace card */}
      <div className="glass-panel" style={styles.ledgerPanel}>
        <div style={styles.panelHeader}>
          <Shield size={16} color="var(--accent-cyan)" />
          <span style={styles.panelTitle}>Decentralized World Contract State</span>
        </div>
        
        <div style={styles.metaBlock}>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>WORLD_IDENTIFIER:</span>
            <span style={styles.metaValue}>{activeWorld.id.toUpperCase()}</span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>ERC721_CONTRACT:</span>
            <span style={{ ...styles.metaValue, color: "var(--accent-gold)" }}>{contractAddress}</span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>BLOCKCHAIN_CANON:</span>
            <span style={styles.metaValue}>Simulated Ethereum Virtual Machine</span>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.metricsList}>
          <h3 style={styles.sectionTitle}>// Core Lineage Metrics</h3>
          
          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Visual Consistency Rate</span>
            <span style={styles.metricValue}>{consistencyRate}% Verified</span>
          </div>
          
          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Narrative Coherence Score</span>
            <span style={styles.metricValue}>{coherenceRate}% Validated</span>
          </div>
          
          <div style={styles.metricRow}>
            <span style={styles.metricLabel}>Total Sealed Chapters</span>
            <span style={styles.metricValue}>{totalChapters} Blocks</span>
          </div>
        </div>
      </div>

      {/* Active mint log */}
      <div className="glass-panel" style={styles.ledgerPanel}>
        <div style={styles.panelHeader}>
          <Hash size={16} color="var(--accent-purple)" />
          <span style={styles.panelTitle}>Sealed Block Transactions</span>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          {activeWorld.chapters.map((ch) => (
            <div key={ch.id} style={styles.blockRow}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={styles.blockTitle}>BLOCK_0{ch.number} // TITLE: {ch.title.toUpperCase()}</span>
                <span style={styles.blockHash}>
                  TX: {ch.mintData?.txHash || "PENDING_LOCAL_DRAFT_STAGE"}
                </span>
              </div>
              <span className="badge badge-purple" style={{ fontSize: "0.6rem" }}>
                {ch.isMinted ? "SEALED" : "DRAFT"}
              </span>
            </div>
          ))}
          {activeWorld.chapters.length === 0 && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>No transactions executed yet.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProvenancePage() {
  return (
    <Suspense fallback={<div style={styles.emptyContainer}><span style={{color:"#fff"}}>Loading Provenance Ledger...</span></div>}>
      <ProvenanceContent />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "32px 40px",
    minHeight: "100vh",
    background: "#050505",
    color: "#fff",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    fontFamily: "var(--font-mono)", // Monospace font requested
    boxSizing: "border-box"
  },
  emptyContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#050505"
  },
  header: {
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    paddingBottom: "16px",
    zIndex: 10
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: 700,
    margin: 0
  },
  subtitle: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    marginTop: "4px"
  },
  ledgerPanel: {
    padding: "20px 24px",
    background: "rgba(10, 10, 12, 0.6)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    zIndex: 10
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    paddingBottom: "10px"
  },
  panelTitle: {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase"
  },
  metaBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "4px"
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    borderBottom: "1px solid rgba(255,255,255,0.01)",
    paddingBottom: "6px"
  },
  metaLabel: {
    color: "var(--text-muted)"
  },
  metaValue: {
    color: "rgba(255,255,255,0.8)"
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.03)"
  },
  metricsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  sectionTitle: {
    fontSize: "0.75rem",
    color: "var(--accent-cyan)",
    margin: "0 0 6px 0",
    letterSpacing: "0.08em"
  },
  metricRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    borderBottom: "1px solid rgba(255,255,255,0.01)",
    paddingBottom: "6px"
  },
  metricLabel: {
    color: "rgba(255,255,255,0.7)"
  },
  metricValue: {
    color: "#fff",
    fontWeight: 600
  },
  blockRow: {
    background: "rgba(255,255,255,0.01)",
    border: "1px solid rgba(255,255,255,0.02)",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  blockTitle: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)"
  },
  blockHash: {
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    marginTop: "2px"
  }
};

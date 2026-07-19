"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollSequence } from "../components/ScrollSequence";

export default function LandingPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Use window scroll
  const { scrollYProgress } = useScroll();

  // Add buttery smooth spring to the scroll progress for the text overlays
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 90,
    mass: 0.6
  });

  // Block 1: Hero (0 - 20%)
  const opacity1 = useTransform(smoothProgress, [0, 0.10, 0.18, 0.22], [1, 1, 0, 0], { clamp: true });
  const y1_title = useTransform(smoothProgress, [0, 0.20], [0, -120], { clamp: true });
  const y1_sub = useTransform(smoothProgress, [0, 0.20], [0, -80], { clamp: true });
  const y1_body = useTransform(smoothProgress, [0, 0.20], [0, -40], { clamp: true });

  // Block 2: Memory & Consistency (20% - 45%)
  const opacity2 = useTransform(smoothProgress, [0.15, 0.22, 0.40, 0.45], [0, 1, 1, 0], { clamp: true });
  const y2_title = useTransform(smoothProgress, [0.15, 0.22, 0.40, 0.45], [80, 0, 0, -80], { clamp: true });
  const y2_body = useTransform(smoothProgress, [0.15, 0.22, 0.40, 0.45], [40, 0, 0, -40], { clamp: true });

  // Block 3: The Story Engine (45% - 70%)
  const opacity3 = useTransform(smoothProgress, [0.40, 0.47, 0.65, 0.70], [0, 1, 1, 0], { clamp: true });
  const y3_title = useTransform(smoothProgress, [0.40, 0.47, 0.65, 0.70], [80, 0, 0, -80], { clamp: true });
  const y3_body = useTransform(smoothProgress, [0.40, 0.47, 0.65, 0.70], [40, 0, 0, -40], { clamp: true });

  // Block 4: On-Chain Provenance (70% - 88%)
  const opacity4 = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [0, 1, 1, 0], { clamp: true });
  const y4_title = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [80, 0, 0, -80], { clamp: true });
  const y4_body = useTransform(smoothProgress, [0.65, 0.72, 0.83, 0.88], [40, 0, 0, -40], { clamp: true });

  // Block 5: Reassembly & CTA (88% - 100%)
  const opacity5 = useTransform(smoothProgress, [0.83, 0.90, 1.0], [0, 1, 1], { clamp: true });
  const y5_title = useTransform(smoothProgress, [0.83, 0.90, 1.0], [80, 0, 0], { clamp: true });
  const y5_body = useTransform(smoothProgress, [0.83, 0.90, 1.0], [50, 0, 0], { clamp: true });
  const y5_cta = useTransform(smoothProgress, [0.83, 0.90, 1.0], [25, 0, 0], { clamp: true });

  return (
    <div style={{ height: "600vh", position: "relative" }}>
      {/* Fixed Background Canvas Player */}
      <ScrollSequence numFrames={240} />

      {/* Floating Storytelling Overlays */}
      {isMounted && (
        <div style={styles.overlaysContainer}>
          
          {/* Block 1: Hero */}
          <motion.div style={{ ...styles.block, ...styles.centerBlock, opacity: opacity1 }}>
            <div className="float-slow-1">
              <motion.h1 style={{ ...styles.heroHeadline, y: y1_title }}>Loreloom</motion.h1>
            </div>
            <div className="float-slow-2">
              <motion.h2 style={{ ...styles.heroSubheadline, y: y1_sub }}>Your Persistent AI Art Director.</motion.h2>
            </div>
            <div className="float-slow-3">
              <motion.p style={{ ...styles.bodyText, y: y1_body }}>Characters that remember. Stories that evolve. A verifiable canon.</motion.p>
            </div>
          </motion.div>

          {/* Block 2: Memory & Consistency */}
          <motion.div style={{ ...styles.block, ...styles.leftBlock, opacity: opacity2 }}>
            <div className="float-slow-2">
              <motion.h2 style={{ ...styles.headline, y: y2_title }}>Absolute Visual Consistency.</motion.h2>
            </div>
            <div className="float-slow-3">
              <motion.p style={{ ...styles.bodyText, y: y2_body }}>
                A locked reference architecture ensures your character looks identical in every chapter.
                <br/><br/>
                No amnesia. No style drift. Just perfect continuity across every session.
              </motion.p>
            </div>
          </motion.div>

          {/* Block 3: The Story Engine */}
          <motion.div style={{ ...styles.block, ...styles.rightBlock, opacity: opacity3 }}>
            <div className="float-slow-3">
              <motion.h2 style={{ ...styles.headline, y: y3_title }}>A Deterministic Story Engine.</motion.h2>
            </div>
            <div className="float-slow-1">
              <motion.p style={{ ...styles.bodyText, y: y3_body }}>
                Structured JSON logic weaves new world facts, resolved threads, and precise scene descriptions into an unbroken narrative.
                <br/><br/>
                You guide the lore; the engine writes the next chapter.
              </motion.p>
            </div>
          </motion.div>

          {/* Block 4: On-Chain Provenance */}
          <motion.div style={{ ...styles.block, ...styles.leftBlock, opacity: opacity4 }}>
            <div className="float-slow-1">
              <motion.h2 style={{ ...styles.headline, y: y4_title }}>Your Story as Verifiable Canon.</motion.h2>
            </div>
            <div className="float-slow-2">
              <motion.p style={{ ...styles.bodyText, y: y4_body }}>
                Mint Genesis creations and completed chapters seamlessly on X Layer.
                <br/><br/>
                Your world isn&apos;t just generated—it&apos;s an ownable, immutable legacy.
              </motion.p>
            </div>
          </motion.div>

          {/* Block 5: Reassembly & CTA */}
          <motion.div style={{ ...styles.block, ...styles.centerBlock, opacity: opacity5 }}>
            <div className="float-slow-2">
              <motion.h2 style={{ ...styles.headline, y: y5_title }}>The world is waiting.</motion.h2>
            </div>
            <div className="float-slow-3">
              <motion.p style={{ ...styles.bodyText, y: y5_body, marginBottom: "40px" }}>Create your character. Begin the saga.</motion.p>
            </div>
            <div className="float-slow-1">
              <motion.div style={{ y: y5_cta }}>
                <div style={styles.ctaGroup}>
                  <Link href="/genesis" style={{ textDecoration: 'none' }}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }} 
                      style={styles.btnPrimary}
                    >
                      Begin Genesis
                    </motion.button>
                  </Link>
                  <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} 
                      whileTap={{ scale: 0.95 }} 
                      style={styles.btnSecondary}
                    >
                      Go to Dashboards
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlaysContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    pointerEvents: "none", // Let scroll events pass through
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    position: "absolute",
    maxWidth: "600px",
    padding: "40px",
    pointerEvents: "auto", // Re-enable pointer events for buttons
  },
  centerBlock: {
    textAlign: "center",
    left: "50%",
    top: "50%",
    marginLeft: "-300px", // exact half of maxWidth: 600px
    marginTop: "-150px",  // approximate half of content height to vertically center
  },
  leftBlock: {
    left: "10%",
    top: "50%",
    marginTop: "-150px",
    textAlign: "left",
  },
  rightBlock: {
    right: "10%",
    top: "50%",
    marginTop: "-150px",
    textAlign: "right",
  },
  heroHeadline: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    color: "var(--text-primary)",
    textShadow: "0 0 40px rgba(255,255,255,0.2)",
    marginBottom: "16px",
  },
  heroSubheadline: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    color: "var(--text-primary)",
    marginBottom: "24px",
  },
  headline: {
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    color: "var(--text-primary)",
    marginBottom: "24px",
    textShadow: "0 0 40px rgba(0,0,0,0.9)",
  },
  bodyText: {
    fontFamily: "var(--font-sans)",
    fontSize: "1.25rem",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    textShadow: "0 2px 20px rgba(0,0,0,1)",
  },
  ctaGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  btnPrimary: {
    background: "var(--text-primary)",
    color: "var(--background)",
    fontFamily: "var(--font-sans)",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "16px 32px",
    borderRadius: "100px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
  },
  btnSecondary: {
    background: "rgba(255,255,255,0.05)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "1rem",
    fontWeight: 600,
    padding: "16px 32px",
    borderRadius: "100px",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  }
};

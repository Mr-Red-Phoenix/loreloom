"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useWorldStore } from "../store/useWorldStore";

export interface Chapter {
  id: string;
  number: number;
  title: string;
  storyText: string;
  illustrationSeed: string; // Used to render unique SVG layouts or holds actual image URL
  isMinted: boolean;
  mintData?: {
    tokenId: string;
    txHash: string;
    ipfsHash: string;
    blockNumber: number;
    timestamp: string;
  };
  prompt: string; // The prompt input that generated this chapter
  status?: string;
}

export interface World {
  id: string;
  name: string;
  premise: string;
  style: string; // Cyberpunk, High Fantasy, Steampunk, Solar-punk, etc.
  protagonistName: string;
  protagonistDesc: string;
  relicName: string;
  createdAt: string;
  status: string; // "draft", "portrait_ready", "locked", "active", etc.
  referenceImageUrl?: string | null;
  chapters: Chapter[];
}

interface StoryContextType {
  worlds: World[];
  activeWorldId: string | null;
  activeWorld: World | null;
  createWorld: (
    name: string,
    premise: string,
    style: string,
    protagonistName: string,
    protagonistDesc: string,
    relicName: string
  ) => Promise<string>;
  draftNewChapter: (prompt: string, styleLock?: boolean, aspectRatio?: string) => void;
  regenerateChapterImage: (chapterId: string, options?: { narrativeContext?: string; styleLock?: string; aspectRatio?: string }) => Promise<void>;
  commitChapterToCanon: (chapterId: string) => void;
  switchWorld: (worldId: string) => void;
  deleteWorld: (worldId: string) => void;
  deleteChapter: (chapterId: string) => Promise<void>;
  fetchWorld: (worldId: string) => Promise<boolean>;
  reorderChapters: (chapterIds: string[]) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const WALLET_ADDRESS = process.env.NEXT_PUBLIC_WALLET_ADDRESS || "0xa33Ebc28fF3b0135ba2DaC18990DDDc162Dc2467";

const PREPOPULATED_WORLDS: World[] = [
  {
    id: "world-neo-tokyo",
    name: "Neo-Tokyo Noir",
    premise: "A sprawling cyberpunk metropolis where memories are traded as physical shards in the black market, and the rain never stops.",
    style: "Cyberpunk / Neon Noir",
    protagonistName: "Kaito Vance",
    protagonistDesc: "A cynical private detective with a retro-fitted cybernetic eye that detects thermal residue and digital traces.",
    relicName: "The Obsidian Shard",
    createdAt: "2026-07-10T12:00:00Z",
    status: "active",
    chapters: [
      {
        id: "tokyo-ch-1",
        number: 1,
        title: "The Rain-Slicked Grid",
        storyText: "Kaito Vance pulled his collar up against the acid rain of Shibuya Sub-sector 9. The neon signs flickered above, casting long, violet shadows across the alley. In his pocket, the Obsidian Shard hummed—a memory container rumored to hold the final thoughts of the city's lead architect. As he activated his cybernetic eye, the world dissolved into thermal signatures, revealing a lone figure waiting in the smog ahead.",
        illustrationSeed: "grid-nodes",
        isMinted: true,
        mintData: {
          tokenId: "0x78a1",
          txHash: "0x5a31b40210bc93ea6518a20d4187f54129bbfa7a4e610d937a505b221081fa2c",
          ipfsHash: "QmYwAPzwh3pARwKkzF2YNv62LycXg4DQM75bY75Ga7M8d2",
          blockNumber: 19842104,
          timestamp: "2026-07-10T12:30:00Z"
        },
        prompt: "Initialize the cyberpunk world. Kaito Vance stands in a rainy neon alley holding the Obsidian Shard."
      },
      {
        id: "tokyo-ch-2",
        number: 2,
        title: "Neon Confessional",
        storyText: "The figure in the smog was Clara, a neural-hacker whose reputation preceded her. She didn't speak; instead, she tapped her temple, offering a direct sync. Vance hesitated, then connected his jack. Immediately, the wet concrete alley disappeared. He was standing inside a cathedral of pure light, constructed from towers of glowing code. 'They know you have it, Kaito,' Clara's voice echoed through the datastream. 'And they are coming to format your soul.'",
        illustrationSeed: "digital-cathedral",
        isMinted: false,
        prompt: "Meet neural-hacker Clara in the alley, sync minds, and enter a glowing code cathedral grid."
      }
    ]
  },
  {
    id: "world-aetheria",
    name: "Chronicles of Aetheria",
    premise: "A skyworld of floating islands powered by ancient levitational crystals, where airships navigate endless currents and mechanical beasts guard forgotten ruins.",
    style: "Aetherpunk / Sky Fantasy",
    protagonistName: "Captain Lyra Stormborn",
    protagonistDesc: "The daring captain of the wind-skimmer 'Aetherius', wearing brass goggles and carrying a mechanical sky-chart compass.",
    relicName: "The Aetheric Compass",
    createdAt: "2026-07-11T08:00:00Z",
    status: "active",
    chapters: [
      {
        id: "aether-ch-1",
        number: 1,
        title: "The Edge of the Sky",
        storyText: "From the helm of the Aetherius, Captain Lyra Stormborn watched the sun set behind the floating spires of Solaria. The sky was an ocean of gold and crimson. In her hand, the Aetheric Compass needle spun wildly, pointing not north, but directly downward—into the Storm Abyss, a cloud layer no airship had ever traversed and survived. 'Steady, crew,' she whispered, adjusting the throttle. 'We are going down.'",
        illustrationSeed: "floating-islands",
        isMinted: true,
        mintData: {
          tokenId: "0x78a2",
          txHash: "0xbb732a106bcdeef321fa77c8e9bfa21092a1883b276d338a0f91a27bba09ea76",
          ipfsHash: "QmZ3817Ga7M8d2YwAPzwh3pARwKkzF2YNv62LycXg4DQM75b",
          blockNumber: 19842890,
          timestamp: "2026-07-11T08:15:00Z"
        },
        prompt: "Aetherpunk setting. Captain Lyra at the helm of the airship Aetherius, holding a glowing compass looking at sky islands."
      }
    ]
  }
];

// Backend API response shapes for type-safe mapping
interface BackendWorldRow {
  id: string;
  title: string | null;
  intake: Record<string, unknown>;
  character_sheet: Record<string, unknown>;
  style_lock: string | null;
  created_at: string;
  status: string;
  reference_image_url: string | null;
}

interface BackendChapterRow {
  id: string;
  chapter_index: number;
  content: string | null;
  image_url: string | null;
  scene_description: string | null;
  status: string;
  chapter_token_id: string | null;
}

function mapBackendWorld(backendWorld: BackendWorldRow, backendChapters: BackendChapterRow[]): World {
  const intake = backendWorld.intake || {};
  const charSheet = backendWorld.character_sheet || {};
  
  return {
    id: backendWorld.id,
    name: backendWorld.title || (intake.name as string) || "Untitled World",
    premise: (intake.prompt as string) || (intake.premise as string) || "No premise.",
    style: backendWorld.style_lock || (intake.style as string) || "Default",
    protagonistName: (charSheet.name as string) || (intake.protagonistName as string) || "Unnamed",
    protagonistDesc: (charSheet.characterSummary as string) || (intake.protagonistDesc as string) || "No description.",
    relicName: (intake.relicName as string) || "None",
    createdAt: backendWorld.created_at,
    status: backendWorld.status,
    referenceImageUrl: backendWorld.reference_image_url,
    chapters: (backendChapters || []).map((ch) => ({
      id: ch.id,
      number: ch.chapter_index,
      title: `Chapter ${ch.chapter_index}`,
      storyText: ch.content || "AI is weaving the chapter story...",
      illustrationSeed: ch.image_url || "awaiting-synthesis",
      isMinted: ch.status === "minted" || ch.chapter_token_id !== null,
      prompt: ch.scene_description || "Generated beat",
      status: ch.status
    }))
  };
}

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [worlds, setWorlds] = useState<World[]>(PREPOPULATED_WORLDS);
  const [activeWorldId, setActiveWorldId] = useState<string | null>("world-neo-tokyo");
  const [isLoaded, setIsLoaded] = useState(false);
  const setHeroName = useWorldStore((s) => s.setHeroName);

  // Helper to fetch single world details; returns true on success, false on failure
  const fetchWorld = useCallback(async (id: string): Promise<boolean> => {
    // Avoid fetching mock prepopulated worlds from backend
    if (id.startsWith("world-neo-") || id.startsWith("world-aetheria")) return true;
    
    try {
      const response = await fetch(`${API_URL}/api/worlds/${id}`);
      if (!response.ok) throw new Error("Failed to fetch world details");
      const data = await response.json();
      
      const mapped = mapBackendWorld(data.world, data.chapters);
      setWorlds((prev) => {
        const filtered = prev.filter((w) => w.id !== id);
        return [mapped, ...filtered];
      });
      return true;
    } catch (error: any) {
      if (error?.message === "Failed to fetch") {
        console.warn(`[StoryContext] Network offline or suspended while fetching world ${id}.`);
      } else {
        console.warn("Error fetching world details:", error);
      }
      return false;
    }
  }, []);

  // Hydration-safe initial state loading
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWorlds = localStorage.getItem("loreloom_worlds");
      const savedActiveId = localStorage.getItem("loreloom_active_world_id");
      const savedIds = localStorage.getItem("loreloom_world_ids");
      
      if (savedWorlds) {
        try {
          setWorlds(JSON.parse(savedWorlds));
        } catch (e) {
          console.error("Failed to parse saved worlds", e);
        }
      }
      if (savedActiveId) {
        setActiveWorldId(savedActiveId);
      }

      if (savedIds) {
        try {
          const ids: string[] = JSON.parse(savedIds);
          // Fetch real backend worlds in the background
          ids.forEach((id) => fetchWorld(id));
        } catch (e) {
          console.error("Failed to parse saved world IDs", e);
        }
      }
      setIsLoaded(true);
    }
  }, [fetchWorld]);

  // Persist state metadata
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      // Filter out mapped backend worlds for raw local persistence,
      // keeping only local-only mock worlds or general shapes
      localStorage.setItem("loreloom_worlds", JSON.stringify(worlds.filter(w => w.id.startsWith("world-neo-") || w.id.startsWith("world-aetheria"))));
      
      const realIds = worlds.filter(w => !w.id.startsWith("world-neo-") && !w.id.startsWith("world-aetheria")).map(w => w.id);
      localStorage.setItem("loreloom_world_ids", JSON.stringify(realIds));
      
      if (activeWorldId) {
        localStorage.setItem("loreloom_active_world_id", activeWorldId);
      } else {
        localStorage.removeItem("loreloom_active_world_id");
      }
    }
  }, [worlds, activeWorldId, isLoaded]);

  // Background sync/polling for active world with exponential backoff
  useEffect(() => {
    if (!activeWorldId || activeWorldId.startsWith("world-neo-") || activeWorldId.startsWith("world-aetheria")) {
      return;
    }

    let isMounted = true;
    let consecutiveFailures = 0;
    let nextTimer: ReturnType<typeof setTimeout>;

    const pollOnce = () => {
      if (!isMounted) return;
      fetchWorld(activeWorldId).then((ok) => {
        if (!isMounted) return;
        if (ok) {
          consecutiveFailures = 0;
          nextTimer = setTimeout(pollOnce, 4000);
        } else {
          consecutiveFailures++;
          // Exponential backoff: 8s, 16s, 32s... capped at 60s
          const delay = Math.min(4000 * Math.pow(2, consecutiveFailures), 60000);
          nextTimer = setTimeout(pollOnce, delay);
        }
      });
    };

    // Fire immediately, then schedule subsequent polls with exponential backoff
    pollOnce();

    return () => {
      isMounted = false;
      clearTimeout(nextTimer);
    };
  }, [activeWorldId, fetchWorld]);

  const activeWorld = worlds.find((w) => w.id === activeWorldId) || null;

  // Sync protagonistName to global Zustand store whenever activeWorld changes
  useEffect(() => {
    if (activeWorld) {
      setHeroName(activeWorld.protagonistName);
    }
  }, [activeWorld, setHeroName]);

  const createWorld = async (
    name: string,
    premise: string,
    style: string,
    protagonistName: string,
    protagonistDesc: string,
    relicName: string
  ): Promise<string> => {
    const response = await fetch(`${API_URL}/api/worlds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress: WALLET_ADDRESS,
        title: name,
        intake: {
          name,
          prompt: premise,
          style,
          protagonistName,
          protagonistDesc,
          relicName
        },
        styleLock: style
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error ?? "Failed to create world");
    }

    const data = await response.json();
    const mapped = mapBackendWorld(data.world, []);
    setWorlds((prev) => [mapped, ...prev]);
    setActiveWorldId(mapped.id);
    return mapped.id;
  };

  const regenerateChapterImage = async (
    chapterId: string,
    options?: { narrativeContext?: string; styleLock?: string; aspectRatio?: string }
  ) => {
    if (!activeWorldId || activeWorldId.startsWith("world-neo-") || activeWorldId.startsWith("world-aetheria")) {
      setWorlds((prev) =>
        prev.map((world) => {
          if (world.id !== activeWorldId) return world;
          return {
            ...world,
            chapters: world.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              const seeds = ["cyber-portal", "aether-engine", "quantum-matrix", "mystic-rune", "nebula-drift"];
              const newSeed = seeds[Math.floor(Math.random() * seeds.length)];
              return { ...ch, illustrationSeed: newSeed };
            })
          };
        })
      );
      return;
    }

    try {
      console.log(`[StoryContext] Optimistically setting chapter ${chapterId} status to text_ready / awaiting-synthesis...`);
      setWorlds((prev) =>
        prev.map((world) => {
          if (world.id !== activeWorldId) return world;
          return {
            ...world,
            chapters: world.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;
              return { 
                ...ch, 
                status: "text_ready",
                illustrationSeed: "awaiting-synthesis" 
              };
            })
          };
        })
      );

      const body: Record<string, string> = {};
      if (options?.narrativeContext) body.narrativeContext = options.narrativeContext;
      if (options?.styleLock) body.styleLock = options.styleLock;
      if (options?.aspectRatio) body.aspectRatio = options.aspectRatio;

      console.log(`[StoryContext] Sending regenerate request for chapter ${chapterId}...`);
      const response = await fetch(`${API_URL}/api/worlds/${activeWorldId}/chapters/${chapterId}/regenerate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errBody = await response.json();
        const errMsg = errBody.error ?? errBody.message ?? "Failed to regenerate chapter image";

        if (response.status === 409 && errMsg.toLowerCase().includes("minted")) {
          console.warn("Regenerate skipped — chapter was minted before the request completed.");
          return;
        }

        throw new Error(errMsg);
      }

      console.log(`[StoryContext] Request succeeded, running immediate fetchWorld for sync...`);
      await fetchWorld(activeWorldId);
    } catch (error) {
      // Only log as error if it's not a gracefully-handled minted race condition
      if (error instanceof Error && error.message.toLowerCase().includes("minted")) {
        console.warn("Regenerate skipped — chapter was minted.");
      } else {
        console.error("Error regenerating chapter image:", error);
      }
    }
  };

  const draftNewChapter = async (prompt: string, styleLock?: boolean, aspectRatio?: string) => {
    if (!activeWorldId || activeWorldId.startsWith("world-neo-") || activeWorldId.startsWith("world-aetheria")) {
      // Mock fallback behavior for sandbox worlds
      setWorlds((prev) =>
        prev.map((world) => {
          if (world.id !== activeWorldId) return world;

          const nextNum = world.chapters.length + 1;
          const seeds = ["cyber-portal", "aether-engine", "quantum-matrix", "mystic-rune", "nebula-drift"];
          const seed = seeds[(nextNum + world.chapters.length) % seeds.length];

          const storyTemplates = [
            `Taking a breath, ${world.protagonistName} pressed forward. The immediate surroundings hummed with energy as the command '${prompt}' took root.`,
            `With the power of ${world.relicName} guiding the way, a sudden pathway illuminated, revealing secrets that had remained hidden for cycles.`,
            `A voice echoed through the frequency, warning of the oncoming shift, but the commitment to the journey was already absolute.`,
            `Shadows converged as ${world.protagonistName} navigated the treacherous terrain, ${world.relicName} glowing faintly in response to the command: "${prompt}".`,
            `A fracture in reality shimmered before ${world.protagonistName}. The echo of "${prompt}" resonated through the canon, rewriting the threads of fate.`,
            `Deep within the unknown, ${world.protagonistName} discovered a hidden node pulsing with energy. The directive "${prompt}" unlocked a cascade of vivid visions.`,
            `The air crackled with raw narrative potential as ${world.protagonistName} stepped into the threshold. "${prompt}" was no longer just a command—it was the story itself.`,
            `From the periphery, a new force responded to the weave. ${world.protagonistName} held ${world.relicName} high as the intent "${prompt}" carved a path through the void.`
          ];
          
          const segmentIndex = nextNum < storyTemplates.length ? nextNum - 1 : (nextNum - 1) % storyTemplates.length;
          const text = `${storyTemplates[segmentIndex]} Driven by the intention to "${prompt}", the story unfolded with dramatic speed. The visual canon crystallized further.`;

          const newChapter: Chapter = {
            id: `ch-${Date.now()}-${nextNum}`,
            number: nextNum,
            title: `Chapter ${nextNum}: ${prompt.slice(0, 20)}${prompt.length > 20 ? "..." : ""}`,
            storyText: text,
            illustrationSeed: seed,
            isMinted: false,
            prompt
          };

          return {
            ...world,
            chapters: [...world.chapters, newChapter]
          };
        })
      );
      return;
    }

    try {
      console.log(`[StoryContext] Requesting new draft chapter creation for world ${activeWorldId}...`);
      const response = await fetch(`${API_URL}/api/worlds/${activeWorldId}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error ?? "Failed to create chapter");
      }

      console.log(`[StoryContext] Draft chapter created, fetching updated world details...`);
      await fetchWorld(activeWorldId);
    } catch (error) {
      console.error("Error drafting new chapter:", error);
    }
  };

  const commitChapterToCanon = async (chapterId: string) => {
    if (!activeWorldId || activeWorldId.startsWith("world-neo-") || activeWorldId.startsWith("world-aetheria")) {
      // Mock fallback
      setWorlds((prev) =>
        prev.map((world) => {
          return {
            ...world,
            chapters: world.chapters.map((ch) => {
              if (ch.id !== chapterId) return ch;

              const hex = Math.floor(Math.random() * 65535).toString(16);
              const mockTxHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
              const mockIpfs = "Qm" + Array.from({ length: 44 }, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join("");

              return {
                ...ch,
                isMinted: true,
                mintData: {
                  tokenId: `0x${hex}`,
                  txHash: mockTxHash,
                  ipfsHash: mockIpfs,
                  blockNumber: 20450000 + Math.floor(Math.random() * 10000),
                  timestamp: new Date().toISOString()
                }
              };
            })
          };
        })
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/worlds/${activeWorldId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error ?? "Failed to confirm world");
      }

      // Background sync poll picks up the updated world.
    } catch (error) {
      console.error("Error committing world to canon:", error);
    }
  };

  const switchWorld = (worldId: string) => {
    setActiveWorldId(worldId);
  };

  const reorderChapters = (chapterIds: string[]) => {
    setWorlds((prev) =>
      prev.map((world) => {
        if (world.id !== activeWorldId) return world;
        const reordered = chapterIds
          .map((id) => world.chapters.find((ch) => ch.id === id))
          .filter((ch): ch is Chapter => ch !== undefined);
        return { ...world, chapters: reordered };
      })
    );
  };

  const deleteChapter = async (chapterId: string) => {
    if (!activeWorld) return;

    // Mock worlds: remove chapter locally
    if (activeWorldId?.startsWith("world-neo-") || activeWorldId?.startsWith("world-aetheria")) {
      setWorlds((prev) =>
        prev.map((world) => {
          if (world.id !== activeWorldId) return world;
          return {
            ...world,
            chapters: world.chapters.filter((ch) => ch.id !== chapterId)
          };
        })
      );
      return;
    }

    // Real backend world: call DELETE endpoint
    try {
      const response = await fetch(`${API_URL}/api/worlds/${activeWorldId}/chapters/${chapterId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Failed to delete chapter" }));
        // 404 means chapter was already deleted — treat as success
        if (response.status === 404) return;
        throw new Error(err.error ?? "Failed to delete chapter");
      }

      // Background sync poll will update the world state.
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const deleteWorld = (worldId: string) => {
    setWorlds((prev) => prev.filter((w) => w.id !== worldId));
    if (activeWorldId === worldId) {
      const remaining = worlds.filter((w) => w.id !== worldId);
      setActiveWorldId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  return (
    <StoryContext.Provider
      value={{
        worlds,
        activeWorldId,
        activeWorld,
        createWorld,
        draftNewChapter,
        regenerateChapterImage,
        commitChapterToCanon,
        switchWorld,
        deleteWorld,
        deleteChapter,
        fetchWorld,
        reorderChapters
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};

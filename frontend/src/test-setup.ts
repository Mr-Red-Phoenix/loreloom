import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock lucide-react icons to avoid hook errors in jsdom
vi.mock("lucide-react", () => {
  const React = require("react") as typeof import("react");
  const icons = [
    "User", "Gem", "Palette", "Shield",
    "RefreshCw", "Sparkles", "Cpu", "Database",
    "PenTool", "CheckCircle", "ChevronLeft", "ChevronRight",
    "Lock", "Unlock", "Maximize2", "Minimize2",
    "GripVertical", "Image", "Film", "Square",
    "Loader2", "Wand2", "BookOpen",
  ];
  const mock: Record<string, any> = {};
  for (const name of icons) {
    mock[name] = React.forwardRef<any, any>((props: any, ref: any) => {
      const { size, color, className, ...rest } = props;
      return React.createElement("svg", {
        ...rest,
        ref,
        "data-testid": `icon-${name}`,
        width: size || 24,
        height: size || 24,
        fill: "none",
        stroke: color || "currentColor",
        viewBox: "0 0 24 24",
      });
    });
  }
  return mock;
});

// Mock framer-motion for jsdom test environment
vi.mock("framer-motion", () => {
  const React = require("react") as typeof import("react");

  const createMotionComponent = (tag: string) => {
    const htmlTag = tag.replace("motion.", "");
    const Component = React.forwardRef<any, any>((props: any, ref: any) => {
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileHover,
        whileTap,
        whileFocus,
        whileDrag,
        whileInView,
        layout,
        layoutId,
        layoutDependency,
        onAnimationStart,
        onAnimationComplete,
        drag,
        dragConstraints,
        dragElastic,
        dragControls,
        dragListener,
        dragMomentum,
        dragPropagation,
        direction,
        onDrag,
        onDragEnd,
        onDragStart,
        ...htmlProps
      } = props;

      return React.createElement(htmlTag, { ...htmlProps, ref });
    });
    Component.displayName = `motion.${htmlTag}`;
    return Component;
  };

  const motion = new Proxy(
    {},
    {
      get: (_target: any, prop: string) => {
        return createMotionComponent(`motion.${prop}`);
      },
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    MotionConfig: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    default: { motion, AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children) },
  };
});

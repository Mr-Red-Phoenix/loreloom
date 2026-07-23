import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/(auth)/**/*.{ts,tsx}",
    "./src/components/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

/**
 * Tailwind theme extended with the "New Jerusalem City" design tokens.
 * Keeping colors/fonts named semantically (brand-*) so the palette can be
 * re-skinned in one place without touching component markup.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Deep near-black charcoal used for header + dark sections
          dark: "#14171B",
          darker: "#0E1013",
          // Slightly lifted surface for cards on dark backgrounds
          surface: "#1C2026",
          surfaceAlt: "#22262D",
          // Warm gold / olive accent for CTAs, tags, links, highlights
          gold: "#A9863A",
          goldLight: "#C4A24E",
          goldDark: "#8B6E2E",
          // Off-white / cream light section background
          cream: "#F3F1EC",
          creamAlt: "#EAE6DC",
          // Text tones
          ink: "#1C1F24",
          muted: "#6B6F76",
        },
      },
      fontFamily: {
        // Wired to next/font CSS variables in app/layout.tsx
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 18px 40px -20px rgba(0,0,0,0.45)",
        dropdown: "0 24px 50px -12px rgba(0,0,0,0.55)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{ts,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A3626", // deep elegant green
        secondary: "#6A994E", // leaf green
        background: "#FDFBF7", // warm white
        accent: "#4CAF50", // vibrant garden green
        surface: "#F4F1EA", // section surface
        text: "#2C3E2C", // readable dark green-gray
        "primary-dark": "#0F2117",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        elegant: "0 10px 40px -10px rgba(26,54,38,0.12)",
        card: "0 6px 26px -8px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;

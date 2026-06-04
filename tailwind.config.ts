import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#090604",
        charcoal: "#15100c",
        umber: "#3b2416",
        oxblood: "#5c2018",
        parchment: "#d8c39a",
        "old-gold": "#b99042",
        "faded-gold": "#d6ad60",
      },
      boxShadow: {
        ember: "0 0 40px rgba(182, 113, 43, 0.18)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
      },
      colors: {
        dark: {
          background: "#1a1a1a",
          foreground: "#ffffff",
          card: "#2a2a2a",
          "card-foreground": "#ffffff",
          popover: "#2a2a2a",
          "popover-foreground": "#ffffff",
          primary: "#bb86fc",
          "primary-foreground": "#000000",
          secondary: "#03dac6",
          "secondary-foreground": "#000000",
          muted: "#3a3a3a",
          "muted-foreground": "#b0b0b0",
          accent: "#03dac6",
          "accent-foreground": "#000000",
          destructive: "#cf6679",
          "destructive-foreground": "#000000",
          border: "#4a4a4a",
          input: "#4a4a4a",
          ring: "#bb86fc",
        },
        light: {
          background: "#ffffff",
          foreground: "#000000",
          card: "#f0f0f0",
          "card-foreground": "#000000",
          popover: "#f0f0f0",
          "popover-foreground": "#000000",
          primary: "#6200ee",
          "primary-foreground": "#ffffff",
          secondary: "#03dac6",
          "secondary-foreground": "#000000",
          muted: "#e0e0e0",
          "muted-foreground": "#555555",
          accent: "#03dac6",
          "accent-foreground": "#000000",
          destructive: "#b00020",
          "destructive-foreground": "#ffffff",
          border: "#d0d0d0",
          input: "#d0d0d0",
          ring: "#6200ee",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

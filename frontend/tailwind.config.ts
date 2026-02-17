import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Ensure this is set
  theme: {
    extend: {
      colors: {
        "primary": "#136dec",
        "primary-hover": "#115dc7",
        "background-light": "#f6f7f8",
        "background-dark": "#101822",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2432",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(19, 109, 236, 0.05), 0 2px 4px -1px rgba(19, 109, 236, 0.03)',
        'glow': '0 0 15px rgba(19, 109, 236, 0.15)',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
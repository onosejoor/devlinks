import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px ",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ogColor: "#633CFF",
        lightPurple: "#BEADFF",
        veryLightPurple: "#EFEBFF",
        gray: "#333333",
        darkGray: "#737373",
        lightGray: "#D9D9D9",
        veryLightGray: "#FAFAFA",
        white: "#FFFFFF",
        red: "#FF3939",
      },
      boxShadow: {
        ogColor: "0px 0px 20px 0px #BEADFF",
        "preview-card": "0px 0px 32px 0px #00000010",
      },
      fontFamily: {
        instrument_sans: ["Instrument Sans", "sans-serif"],
      },
      keyframes: {
        loader: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "loader 1s infinite linear",
      },
    },
  },
  plugins: [],
} satisfies Config;

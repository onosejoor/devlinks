import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      boxShadow:{
       ogColor: "0px 0px 20px 0px #BEADFF"
      },
      fontFamily: {
        instrument_sans: ["Instrument Sans", 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;

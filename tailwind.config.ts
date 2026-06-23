import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-gold)",
          light: "var(--primary-gold-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary-navy)",
          light: "var(--secondary-navy-light)",
        },
        accent: "var(--accent-rose)",
        background: "var(--neutral-warm-white)",
        foreground: "var(--secondary-navy)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,jsx,ts,tsx,html}",
    "./app/**/*.{js,jsx,ts,tsx,html}",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "!./.history/**/*",
  ],
  theme: {
    extend: {
      colors: {
        // Background Colors
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-quartiary": "var(--bg-quartiary)",
        "bg-button": "var(--bg-button)",
        "bg-hover": "var(--bg-hover)",
        "bg-hover2": "var(--bg-hover-2)",
        "bg-extra": "var(--bg-extra)",

        // Mobile Background Colors
        "bg-mobile-primary": "var(--bg-mobile-primary)",
        "bg-mobile-body": "var(--bg-mobile-body)",

        // Text Colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-link": "var(--text-link)",

        // Accent Colors
        "accent-border": "var(--accent-border)",
        "accent-active": "var(--accent-active)",
        "accent-icon": "var(--accent-icon)",
        "accent-extra": "var(--accent-extra)",

        // Tags
        "text-tag": "var(--tag-color)",
        "bg-tag": "var(--tag-bg)",
        "bg-hover-tag": "var(--tag-hover-bg)",
        "text-hover-tag": "var(--tag-hover-text)",

        // Likes
        "like-bg-active": "var(--like-bg-active)",
        "like-text-active": "var(--like-text-active)",

        // Other Colors
        "other-chart-square": "var(--other-chart-square)",
        "other-chart-green1": "var(--other-chart-green1)",
        "other-chart-green2": "var(--other-chart-green2)",
        "other-chart-green3": "var(--other-chart-green3)",
        "other-chart-green4": "var(--other-chart-green4)",
        "other-chart-blue1": "var(--other-chart-blue1)",
        "other-chart-blue2": "var(--other-chart-blue2)",
        "other-chart-blue3": "var(--other-chart-blue3)",
        "other-chart-blue4": "var(--other-chart-blue4)",
        "other-chart-purple1": "var(--other-chart-purple1)",
        "other-chart-purple2": "var(--other-chart-purple2)",
        "other-chart-purple3": "var(--other-chart-purple3)",
        "other-chart-purple4": "var(--other-chart-purple4)",
        "other-chart-orange1": "var(--other-chart-orange1)",
        "other-chart-orange2": "var(--other-chart-orange2)",
        "other-chart-orange3": "var(--other-chart-orange3)",
        "other-chart-orange4": "var(--other-chart-orange4)",
        "other-chart-red1": "var(--other-chart-red1)",
        "other-chart-red2": "var(--other-chart-red2)",
        "other-chart-red3": "var(--other-chart-red3)",
        "other-chart-red4": "var(--other-chart-red4)",
        "other-chart-yellow1": "var(--other-chart-yellow1)",
        "other-chart-yellow2": "var(--other-chart-yellow2)",
        "other-chart-yellow3": "var(--other-chart-yellow3)",
        "other-chart-yellow4": "var(--other-chart-yellow4)",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "21px",
        "3xl": "24px",
        "4xl": "28px",
        "5xl": "32px",
        "6xl": "36px",
        "7xl": "42px",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Noto Sans",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        s: "0.375rem",
      },
      animation: {
        "spin-very-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

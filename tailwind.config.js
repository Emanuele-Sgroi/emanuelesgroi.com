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
        // light: {
        //   bg: {
        //     primary: "#FFFFFF",
        //     secondary: "#F6F8FA",
        //     tertiary: "#F6F8FA",
        //     quartiary: "#DEE1E5",
        //     button: "#F6F8FA",
        //     hover: "#EAEDF0",
        //     primaryMobile: "#fffeff",
        //     bodyMobile: "#eff0f5",
        //   },
        //   accent: {
        //     border: "#D1D9E0",
        //     active: "#FD8C73",
        //     icon: "#59636E",
        //     extra: "#0969DA",
        //     extraBorder: "#0D5EC0",
        //   },
        //   text: {
        //     primary: "#1F2328",
        //     secondary: "#6B747E",
        //     link: "#4493F8",
        //   },
        //   other: {
        //     chartSquare: "#ebedf0",
        //     green1: "#0be9a8",
        //     green2: "#40c463",
        //     green3: "#30a14e",
        //     green4: "#216e39",
        //     blue1: "#339af0",
        //     blue2: "#007bff",
        //     blue3: "#0056b3",
        //     blue4: "#003f88",
        //     purple1: "#9370db",
        //     purple2: "#8a2be2",
        //     purple3: "#6a0dad",
        //     purple4: "#4b0082",
        //     orange1: "#ffc066",
        //     orange2: "#ffa940",
        //     orange3: "#ff8c1a",
        //     orange4: "#ff6f00",
        //     red1: "#ffcdd2",
        //     red2: "#ef9a9a",
        //     red3: "#e57373",
        //     red4: "#f44336",
        //     yellow1: "#dad07b",
        //     yellow2: "#fae84b",
        //     yellow3: "#ecd718",
        //     yellow4: "#ceba0c",
        //   },
        // },
        // dark: {
        //   bg: {
        //     primary: "#0D1117",
        //     secondary: "#010409",
        //     tertiary: "#151B23",
        //     quartiary: "#15191F",
        //     button: "#212830",
        //     hover: "#15191F",
        //     primaryMobile: "#16191c",
        //     bodyMobile: "#040405",
        //   },
        //   accent: {
        //     border: "#2F353D",
        //     active: "#F78166",
        //     icon: "#9198A1",
        //     extra: "#238636",
        //   },
        //   text: {
        //     primary: "#F0F6FC",
        //     secondary: "#858C95",
        //     link: "#4493F8",
        //   },
        //   other: {
        //     chartSquare: "#161b22",
        //     green1: "#034429",
        //     green2: "#006d32",
        //     green3: "#26a641",
        //     green4: "#39d353",
        //     blue1: "#1e3a73",
        //     blue2: "#2c549f",
        //     blue3: "#3b6be4",
        //     blue4: "#4e88ff",
        //     purple1: "#6c5491",
        //     purple2: "#8f6bb5",
        //     purple3: "#aa88d3",
        //     purple4: "#caa3ff",
        //     orange1: "#b3741f",
        //     orange2: "#e6962b",
        //     orange3: "#ffae52",
        //     orange4: "#ffc982",
        //     red1: "#f44336",
        //     red2: "#e57373",
        //     red3: "#ef9a9a",
        //     red4: "#ffcdd2",
        //     yellow1: "#ffeb3b",
        //     yellow2: "#fff176",
        //     yellow3: "#fff59d",
        //     yellow4: "#fff9c4",
        //   },
        // },
        // Background Colors
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-quartiary": "var(--bg-quartiary)",
        "bg-button": "var(--bg-button)",
        "bg-hover": "var(--bg-hover)",

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
    },
  },
  plugins: [require("tailwindcss-animate")],
};

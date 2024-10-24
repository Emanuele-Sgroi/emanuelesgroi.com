/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "!./.history/**/*",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        light: {
          //Backgrounds
          bg: {
            primary: "#FFFFFF",
            secondary: "#F6F8FA",
            tertiary: "#F6F8FA",
            quartiary: "#DEE1E5",
            button: "#F6F8FA",
            hover: "#EAEDF0",
          },
          // Accent (borders, icons, etc...)
          accent: {
            border: "#D1D9E0",
            active: "#FD8C73",
            icon: "#59636E",
            extra: "#0969DA",
            extraBorder: "#0D5EC0",
          },
          // Text
          text: {
            primary: "#1F2328",
            secondary: "#6B747E",
            link: "#4493F8",
          },
        },
        // Dark Mode Colors
        dark: {
          //Backgrounds
          bg: {
            primary: "#0D1117",
            secondary: "#010409",
            tertiary: "#151B23",
            quartiary: "#15191F",
            button: "#212830",
            hover: "#15191F",
          },
          // Accent (borders, icons, etc...)
          accent: {
            border: "#2F353D",
            active: "#F78166",
            icon: "#7F868E",
            extra: "#238636",
          },
          // Text
          text: {
            primary: "#F0F6FC",
            secondary: "#858C95",
            link: "#4493F8",
          },
        },
      },
      fontSize: {
        xs: "12px", // Extra small text
        sm: "14px", // Small text
        base: "16px", // Base text (typically for paragraphs)
        lg: "18px", // Large text
        xl: "20px", // Extra large text
        "2xl": "21px", // 2x large text
        "3xl": "24px", // 3x large text
        "4xl": "28px", // 4x large text
        "5xl": "32px", // 5x large text (for larger headings)
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Noto Sans",
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
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

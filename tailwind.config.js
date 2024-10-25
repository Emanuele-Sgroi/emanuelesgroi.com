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

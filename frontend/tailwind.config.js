/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#DFFF88",
        dark: {
          DEFAULT: "#13161C",
          light: "#4D4D4D",
        },
        gray: {
          custom: "#8A95A3",
        },
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-normal": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "border-x": {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
        },
        "border-y": {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
        moveRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        moveLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        moveDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        moveUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        cursor: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-normal": "float-normal 5s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "float-medium": "float-medium 5.5s ease-in-out infinite",
        "border-x": "border-x 3s ease-in-out infinite",
        "border-y": "border-y 3s ease-in-out infinite",
        moveRight: "moveRight 3s linear infinite",
        moveLeft: "moveLeft 3s linear infinite",
        moveDown: "moveDown 3s linear infinite",
        moveUp: "moveUp 3s linear infinite",
        cursor: "cursor 1s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};

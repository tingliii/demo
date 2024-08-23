/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    container: {
      padding: "1rem",
    },
    extend: {
      colors: {
        black: "#000000d9",
        deleted: "#dc2626",
        added: "#22c55e",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themeRoot: "*",
  },
};

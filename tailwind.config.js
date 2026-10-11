/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#071b36", 800: "#0a2c52", 900: "#05142a" },
        brand: { DEFAULT: "#1266d6", 50: "#eef5ff", 100: "#dbeafe" },
        sun: { DEFAULT: "#ffc857", 300: "#ffe08f" },
        leaf: { DEFAULT: "#1fa863", dark: "#178a51" },
      },
      fontFamily: {
        sans: ["Poppins", "Segoe UI", "Arial", "sans-serif"],
      },
      keyframes: {
        spinSlow: { to: { transform: "rotate(360deg)" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        glow: { "0%,100%": { opacity: ".55" }, "50%": { opacity: "1" } },
      },
      animation: {
        "spin-slow": "spinSlow 40s linear infinite",
        floaty: "floaty 5s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(10,37,64,.18)",
      },
    },
  },
  plugins: [],
};

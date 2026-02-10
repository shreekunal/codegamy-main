/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Accent — red, used sparingly for primary actions, active states, focus rings
        "accent": "#DC2626",
        "accent-light": "#EF4444",
        "accent-dark": "#B91C1C",
        // Legacy red (kept for difficulty badges, errors)
        "red-400": "#FF8585",
        "red-500": "#FF5C5C",
        "red-600": "#FF3333",
        // Legacy purple / cyan (kept for compatibility)
        "purple-400": "#6333FF",
        "purple-500": "#430AFF",
        "purple-600": "#3400E0",
        "cyan-400": "#81F4E1",
        "cyan-500": "#56F0D7",
        "cyan-600": "#1EEBC9",
        // Dark palette — charcoal/black tones
        "dark-1": "#141414",
        "dark-2": "#1E1E1E",
        "dark-3": "#2A2A2A",
        "dark-4": "#363636",
        // Neutral grays
        "gray-1": "#5C5C5C",
        "gray-2": "#999999",
        // Light palette — clean whites
        "light-1": "#FFFFFF",
        "light-2": "#F7F7F8",
        "light-3": "#EBEBEB",
        "light-4": "#D9D9D9",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-up": {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: 0, transform: "translateY(-16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: 0, transform: "scale(0.92)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "slide-right": {
          from: { opacity: 0, transform: "translateX(-20px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.4s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-right": "slide-right 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

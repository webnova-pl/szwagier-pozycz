import type { Config } from "tailwindcss";

const config: Config = {
  // Definiuj pliki, które Tailwind ma skanować w poszukiwaniu klas
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Konfiguracja motywu
  theme: {
    // Rozszerzenie domyślnych wartości
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#FFD006",
        dark: "#000000",
      },
    },
  },
} satisfies Config;

export default config;

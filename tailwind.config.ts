import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1140px",
      },
    },
    extend: {
      colors: {
        x: {
          white: {
            "50": "#fffff6",
            "100": "#fefec7",
            "200": "#fdfd8a",
            "300": "#fcf64d",
            "400": "#fbea24",
            "500": "#f5cd0b",
            "600": "#d9a106",
            "700": "#b47509",
            "800": "#925a0e",
            "900": "#784a0f",
            "950": "#452703",
          },
          paradis: {
            "50": "#f3fafa",
            "100": "#d5f2f0",
            "200": "#abe4e1",
            "300": "#7acecc",
            "400": "#4eb2b3",
            "500": "#349598",
            "600": "#297a7e", // Default
            "700": "#235e62",
            "800": "#204c4f",
            "900": "#1f3f42",
            "950": "#0c2427",
          },
          green: {
            "50": "#ebfef5",
            "100": "#d0fbe4",
            "200": "#a4f6ce",
            "300": "#6aebb5",
            "400": "#2fd896",
            "500": "#0abf7e",
            "600": "#00a76f",
            "700": "#007c56",
            "800": "#036245",
            "900": "#04503a",
            "950": "#012d22",
          },

          maize: {
            "50": "#fff8ed",
            "100": "#fff0d5",
            "200": "#fed99e", // Default
            "300": "#fdc574",
            "400": "#fba13c",
            "500": "#f98516",
            "600": "#ea6a0c",
            "700": "#c24f0c",
            "800": "#9a3f12",
            "900": "#7c3512",
            "950": "#431907",
          },
          riptide: {
            "50": "#f1fcfa",
            "100": "#d1f6f2",
            "200": "#a3ece5",
            "300": "#79ded8", // Default
            "400": "#3fc2bf",
            "500": "#26a6a5",
            "600": "#1b8686",
            "700": "#1a696b",
            "800": "#195456",
            "900": "#194648",
            "950": "#09272a",
          },
          blue: {
            "50": "#effafc",
            "100": "#d7f0f6",
            "200": "#b4e2ed",
            "300": "#80cce0",
            "400": "#45aecb",
            "500": "#2991b1",
            "600": "#257595",
            "700": "#245f7a",
            "800": "#255065",
            "900": "#234356",
            "950": "#0b1a23", // black
          },
          red: {
            "50": "#fef2f2",
            "100": "#fee2e2",
            "200": "#fecaca",
            "300": "#fc9898", // Default
            "400": "#f97070",
            "500": "#f04343",
            "600": "#dd2525",
            "700": "#ba1b1b",
            "800": "#9a1a1a",
            "900": "#7f1d1d",
            "950": "#450a0a",
          },
          pink: {
            "50": "#fff4fd",
            "100": "#ffe7fa",
            "200": "#ffbff2",
            "300": "#fea9e9",
            "400": "#fc76d9",
            "500": "#f342c3",
            "600": "#d722a3",
            "700": "#b21982",
            "800": "#92166b",
            "900": "#771856",
            "950": "#500236",
          },
          purple: {
            "50": "#f3f4ff",
            "100": "#e8e8ff",
            "200": "#d5d7ff",
            "300": "#bfc0ff",
            "400": "#8b88fd",
            "500": "#6558fa",
            "600": "#5135f2",
            "700": "#4223de",
            "800": "#371dba",
            "900": "#2f1a98",
            "950": "#190e67",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

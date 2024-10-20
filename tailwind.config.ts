import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: "true",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#c1cdc1",
        input: "#e8f0e8",
        ring: "#4a7c59",
        background: "#f5f8f5",
        foreground: "#2c3e2e",
        primary: {
          DEFAULT: "#4a7c59",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#e9c46a",
          foreground: "#2c3e2e",
        },
        destructive: {
          DEFAULT: "#e76f51",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#e8f0e8",
          foreground: "#617d64",
        },
        accent: {
          DEFAULT: "#2a9d8f",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#2c3e2e",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2c3e2e",
        },
      },
      borderRadius: {
        lg: "`var(--radius)`",
        md: "`calc(var(--radius) - 2px)`",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};

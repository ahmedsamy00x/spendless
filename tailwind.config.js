/** @type {import('tailwindcss').Config} */
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
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "status-active": {
          DEFAULT: "hsl(var(--status-active))",
          foreground: "hsl(var(--status-active-foreground))",
        },
        "status-trial": {
          DEFAULT: "hsl(var(--status-trial))",
          foreground: "hsl(var(--status-trial-foreground))",
        },
        "status-paused": {
          DEFAULT: "hsl(var(--status-paused))",
          foreground: "hsl(var(--status-paused-foreground))",
        },
        "status-canceled": {
          DEFAULT: "hsl(var(--status-canceled))",
          foreground: "hsl(var(--status-canceled-foreground))",
        },
        "status-expired": {
          DEFAULT: "hsl(var(--status-expired))",
          foreground: "hsl(var(--status-expired-foreground))",
        },
        "status-pending": {
          DEFAULT: "hsl(var(--status-pending))",
          foreground: "hsl(var(--status-pending-foreground))",
        },
        "category-entertainment": {
          DEFAULT: "hsl(var(--category-entertainment))",
          foreground: "hsl(var(--category-entertainment-foreground))",
        },
        "category-productivity": {
          DEFAULT: "hsl(var(--category-productivity))",
          foreground: "hsl(var(--category-productivity-foreground))",
        },
        "category-cloud": {
          DEFAULT: "hsl(var(--category-cloud))",
          foreground: "hsl(var(--category-cloud-foreground))",
        },
        "category-finance": {
          DEFAULT: "hsl(var(--category-finance))",
          foreground: "hsl(var(--category-finance-foreground))",
        },
        "category-education": {
          DEFAULT: "hsl(var(--category-education))",
          foreground: "hsl(var(--category-education-foreground))",
        },
        "category-health": {
          DEFAULT: "hsl(var(--category-health))",
          foreground: "hsl(var(--category-health-foreground))",
        },
        "category-gaming": {
          DEFAULT: "hsl(var(--category-gaming))",
          foreground: "hsl(var(--category-gaming-foreground))",
        },
        "category-news": {
          DEFAULT: "hsl(var(--category-news))",
          foreground: "hsl(var(--category-news-foreground))",
        },
        "category-utilities": {
          DEFAULT: "hsl(var(--category-utilities))",
          foreground: "hsl(var(--category-utilities-foreground))",
        },
        "category-shopping": {
          DEFAULT: "hsl(var(--category-shopping))",
          foreground: "hsl(var(--category-shopping-foreground))",
        },
        "category-other": {
          DEFAULT: "hsl(var(--category-other))",
          foreground: "hsl(var(--category-other-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
};

export default config;

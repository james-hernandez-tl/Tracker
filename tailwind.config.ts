import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        inputError: {
          "0%, 20%, 40%, 60%, 80%, 100%": {
            transform: "rotate(-1deg)",
            borderColor: "red",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "rotate(1deg)",
          },
        },
      },
      animation: {
        inputError: "inputError 1s linear",
      },
      backgroundColor: {
        basic: {
          default: "#d9d9d9",
          happy: "#9E9CC7",
          sad: "#FCB539",
          energetic: "#DEE5F8",
          sick: "#FFB7B8",
          neutral: "#D7E762",
          angry: "#7386C7",
          well: "#C5E6E8",
          cold: "#2558D5",
          headache: "#7D948E",
          hangover: "#706545",
          fog: "#9ACAC6",
        },
      },
    },
  },
  plugins: [],
};
export default config;

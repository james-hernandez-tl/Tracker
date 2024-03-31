import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
    },
  },
  plugins: [],
};
export default config;

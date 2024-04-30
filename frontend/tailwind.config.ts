import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#040D12",
        "dark-jade": "#183D3D",
        //jade: "#5C8374",
        jade: "#095544",
        "light-jade": "#93B1A6",
        "bright-jade": "#CEF5E6",
        "murky-jade": "#223131",
      },
    },
  },
  plugins: [],
};
export default config;

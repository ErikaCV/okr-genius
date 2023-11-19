/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
      backgroundColor: {
        'custom-gray': '#D9D9D9',
        'custom-light-sky-blue': '#f2f7fb',
        'custom-sky-blue': '#d3e2f2',
        
      },
      colors: {
        'custom-red': '#CA2A2A',
        'custom-light-green': '#01803C',
      }
    },
  },
  plugins: [require("daisyui")],
}

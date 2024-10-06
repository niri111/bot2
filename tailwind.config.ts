import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))', // Add glass background
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.18)', // Add glass border
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)', // Add glass shadow
      },
      borderRadius: {
        'glass': '20px', // Add glass border radius
      },
      backdropBlur: {
        '10': '10px', // Add backdrop blur
      },
    },
  },
  plugins: [],
}

export default config

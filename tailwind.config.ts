import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@daveyplate/better-auth-ui/dist/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      fontFamily: {
        // Fonte principal do dashboard
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],

        // Fonte para títulos históricos
        serif: ['var(--font-lora)', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [],
};

export default config;

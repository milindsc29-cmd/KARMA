import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'karma-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
          950: '#052e16',
        },
        'forest-green': '#1a3a2a',
        'deep-forest': '#0d1f18',
        'dragon-pink': '#e85d75',
        'cream': '#fefdf7',
        'earth': '#8b7355',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: {
              color: theme('colors.forest-green'),
            },
            h2: {
              color: theme('colors.forest-green'),
            },
            h3: {
              color: theme('colors.forest-green'),
            },
            strong: {
              color: theme('colors.forest-green'),
            },
            a: {
              color: theme('colors.dragon-pink'),
              '&:hover': {
                color: theme('colors.karma-green.700'),
              },
            },
          },
        },
      }),
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

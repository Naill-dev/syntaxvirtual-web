/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0F2C',
          darker: '#060919',
          deep: '#0B1120',
          mesh: '#070A1E',
        },
        surface: {
          50: '#1E293B',
          100: '#161F38',
          200: '#111827',
          300: '#0F172A',
          card: 'rgba(15, 23, 42, 0.75)',
          glass: 'rgba(17, 24, 39, 0.65)',
        },
        accent: {
          purple: '#7C3AED',
          violet: '#8B5CF6',
          lavender: '#A78BFA',
          light: '#C4B5FD',
        },
        electric: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          cyan: '#06B6D4',
          sky: '#38BDF8',
        },
        border: {
          subtle: '#1E293B',
          glow: 'rgba(124, 58, 237, 0.3)',
          glass: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(124, 58, 237, 0.18) 0%, rgba(59, 130, 246, 0.12) 35%, transparent 70%)',
        'card-glow': 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(59, 130, 246, 0.05))',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(124, 58, 237, 0.3)',
        'glow-md': '0 0 25px -5px rgba(124, 58, 237, 0.45)',
        'glow-lg': '0 0 45px -10px rgba(124, 58, 237, 0.55)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}

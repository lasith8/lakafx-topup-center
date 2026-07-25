/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gaming Dark Theme
        dark: {
          950: '#030305',
          900: '#0a0a0f',
          850: '#0d0d14',
          800: '#12121a',
          750: '#161620',
          700: '#1a1a2e',
          650: '#1e1e38',
          600: '#222242',
          500: '#2a2a50',
          400: '#3a3a6e',
        },
        // Orange/Gold Gaming Accents
        gaming: {
          orange: '#f97316',
          amber: '#f59e0b',
          yellow: '#eab308',
          red: '#ef4444',
          rose: '#f43f5e',
        },
        // Neon Glow Colors
        neon: {
          orange: '#ff6b35',
          amber: '#ffb347',
          gold: '#ffd700',
          red: '#ff3366',
          pink: '#ff6b9d',
          blue: '#00d4ff',
          purple: '#a855f7',
          cyan: '#06b6d4',
          green: '#22c55e',
        },
        // Accent Colors
        accent: {
          orange: '#f97316',
          amber: '#f59e0b',
          gold: '#eab308',
          blue: '#0ea5e9',
          purple: '#8b5cf6',
          pink: '#f472b6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
        gaming: ['Rajdhani', 'Orbitron', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        // Glow Effects
        'glow-orange': 'glowOrange 2s ease-in-out infinite alternate',
        'glow-amber': 'glowAmber 2s ease-in-out infinite alternate',
        'glow-gold': 'glowGold 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        // Float & Movement
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 1s',
        // Pulse Effects
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Slide Animations
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        // Fade & Scale
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-in-slow': 'scaleIn 0.5s ease-out',
        // Spin & Rotate
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin-reverse 3s linear infinite',
        // Shimmer
        'shimmer': 'shimmer 2s linear infinite',
        // Border Glow
        'border-glow': 'borderGlow 2s linear infinite',
      },
      keyframes: {
        // Orange/Gold Glow
        glowOrange: {
          '0%': { boxShadow: '0 0 5px rgba(249, 115, 22, 0.3), 0 0 10px rgba(249, 115, 22, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.3), 0 0 60px rgba(249, 115, 22, 0.1)' },
        },
        glowAmber: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.3), 0 0 10px rgba(245, 158, 11, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.6), 0 0 40px rgba(245, 158, 11, 0.3), 0 0 60px rgba(245, 158, 11, 0.1)' },
        },
        glowGold: {
          '0%': { boxShadow: '0 0 5px rgba(234, 179, 8, 0.3), 0 0 10px rgba(234, 179, 8, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.6), 0 0 40px rgba(234, 179, 8, 0.3), 0 0 60px rgba(234, 179, 8, 0.1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        // Float Animation
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Slide Animations
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // Fade Animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Scale Animation
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Spin Reverse
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        // Shimmer
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Border Glow
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(249, 115, 22, 0.3)' },
          '50%': { borderColor: 'rgba(249, 115, 22, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gaming': 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #eab308 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(249,115,22,0.1) 0%, rgba(245,158,11,0.05) 100%)',
      },
      boxShadow: {
        // Gaming Shadows
        'gaming-orange': '0 0 5px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3), 0 0 40px rgba(249, 115, 22, 0.1)',
        'gaming-amber': '0 0 5px rgba(245, 158, 11, 0.5), 0 0 20px rgba(245, 158, 11, 0.3), 0 0 40px rgba(245, 158, 11, 0.1)',
        'gaming-gold': '0 0 5px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3), 0 0 40px rgba(234, 179, 8, 0.1)',
        // Neon Shadows
        'neon-orange': '0 0 5px rgba(255, 107, 53, 0.5), 0 0 20px rgba(255, 107, 53, 0.3)',
        'neon-amber': '0 0 5px rgba(255, 179, 71, 0.5), 0 0 20px rgba(255, 179, 71, 0.3)',
        'neon-blue': '0 0 5px rgba(0, 212, 255, 0.5), 0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)',
        'neon-pink': '0 0 5px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)',
        // Card Shadows
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'card-gaming': '0 4px 20px -1px rgba(249, 115, 22, 0.15), 0 2px 10px -1px rgba(249, 115, 22, 0.1)',
        // Button Shadows
        'btn-gaming': '0 4px 14px 0 rgba(249, 115, 22, 0.39)',
        'btn-gaming-hover': '0 6px 20px rgba(249, 115, 22, 0.23)',
      },
      borderRadius: {
        'gaming': '1rem',
        'gaming-lg': '1.5rem',
        'gaming-xl': '2rem',
      },
      backdropBlur: {
        'gaming': '12px',
      },
    },
  },
  plugins: [
    // Custom Plugin for Gaming Utilities
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient-gaming': {
          'background': 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #eab308 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-gaming-glass': {
          'background': 'rgba(18, 18, 26, 0.6)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
        },
        '.border-gaming': {
          'border': '1px solid rgba(249, 115, 22, 0.2)',
        },
        '.border-gaming-hover': {
          'border': '1px solid rgba(249, 115, 22, 0.4)',
        },
      })
    }
  ],
}
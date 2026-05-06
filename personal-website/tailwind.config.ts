import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#0a1628',
        deep: '#0f1f3a',
        water: '#142a4a',
        text: {
          DEFAULT: '#d4e4f0',
          dim: '#7a9ab8',
        },
        biolum: {
          DEFAULT: '#40c8ff',
          cyan: '#70b8f0',
          purple: '#a78bfa',
        },
        warm: '#e8b84a',
      },
      fontFamily: {
        display: ['Bebas Neue', 'Arial Narrow', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.8125rem, 0.75rem + 0.25vw, 0.875rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)',
        'fluid-lg': 'clamp(1.25rem, 1rem + 1vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-2xl': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
        'fluid-3xl': 'clamp(2.5rem, 2rem + 3vw, 4rem)',
        'fluid-hero': 'clamp(4.5rem, 3rem + 6vw, 9rem)',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'sonar': 'sonar 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;

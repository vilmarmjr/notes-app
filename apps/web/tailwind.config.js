const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, '../../libs/web/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      'neutral-950': '#0E121B',
      'neutral-900': '#191B25',
      'neutral-800': '#232530',
      'neutral-700': '#2B303B',
      'neutral-600': '#525866',
      'neutral-500': '#717784',
      'neutral-400': '#99A0AE',
      'neutral-300': '#CACFD8',
      'neutral-200': '#E0E4EA',
      'neutral-100': '#F3F5F8',
      'neutral-50': '#F5F7FA',
      'neutral-0': '#FFFFFF',
      'base-black': '#000',
      'base-white': '#fff',
      'blue-700': '#2547D0',
      'blue-500': '#335CFF',
      'blue-50': '#EBF1FF',
      'green-500': '#21C16B',
      'green-100': '#D1FBE9',
      'red-500': '#FB3748',
      'red-100': '#FFD5D8',
      transparent: 'transparent',
    },
    fontSize: {
      'preset-1': [
        '1.5rem',
        { fontWeight: '700', letterSpacing: '-0.5px', lineHeight: '120%' },
      ],
      'preset-2': [
        '1.25rem',
        { fontWeight: '700', letterSpacing: '-0.5px', lineHeight: '120%' },
      ],
      'preset-3': [
        '1rem',
        { fontWeight: '500', letterSpacing: '-0.3px', lineHeight: '120%' },
      ],
      'preset-4': [
        '0.875rem',
        { fontWeight: '500', letterSpacing: '-0.2px', lineHeight: '120%' },
      ],
      'preset-5': [
        '0.875rem',
        { fontWeight: '400', letterSpacing: '-0.2px', lineHeight: '120%' },
      ],
      'preset-6': [
        '0.75rem',
        { fontWeight: '400', letterSpacing: '-0.2px', lineHeight: '120%' },
      ],
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      serif: ['Noto Serif', 'ui-serif', 'Georgia'],
      mono: ['Source Code Pro', 'ui-monospace', 'SFMono-Regular'],
    },
    boxShadow: {
      sm: '0px 4px 6px rgba(240, 240, 240, 0.6)',
      lg: '0px 8px 12px rgba(240, 240, 240, 0.6)',
      none: 'none',
    },
  },
  plugins: [],
  darkMode: 'selector',
};

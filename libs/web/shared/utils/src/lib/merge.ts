import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-preset-1',
        'text-preset-2',
        'text-preset-3',
        'text-preset-4',
        'text-preset-5',
        'text-preset-6',
      ],
    },
  },
});

export function ntMerge(...classes: string[]) {
  return customTwMerge(...classes);
}

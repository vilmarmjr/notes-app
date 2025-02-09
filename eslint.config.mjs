import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'webapp',
              onlyDependOnLibsWithTags: [
                'web:ui',
                'web:assets',
                'web:auth',
                'web:notes',
                'web:settings',
              ],
            },
            {
              sourceTag: 'web:auth',
              onlyDependOnLibsWithTags: ['web:ui', 'web:assets'],
            },
            {
              sourceTag: 'web:notes',
              onlyDependOnLibsWithTags: ['web:ui', 'web:assets'],
            },
            {
              sourceTag: 'web:settings',
              onlyDependOnLibsWithTags: ['web:ui', 'web:assets'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
];

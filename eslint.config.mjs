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
                'web:utils',
                'web:core',
                'web:assets',
                'web:auth',
                'web:notes',
                'web:settings',
                'web:form',
              ],
            },
            {
              sourceTag: 'web:auth',
              onlyDependOnLibsWithTags: ['web:ui', 'web:utils', 'web:core', 'web:form'],
            },
            {
              sourceTag: 'web:notes',
              onlyDependOnLibsWithTags: ['web:ui', 'web:utils', 'web:core', 'web:form'],
            },
            {
              sourceTag: 'web:settings',
              onlyDependOnLibsWithTags: ['web:ui', 'web:utils', 'web:core', 'web:form'],
            },
            {
              sourceTag: 'web:core',
              onlyDependOnLibsWithTags: ['web:ui', 'web:utils', 'web:form'],
            },
            {
              sourceTag: 'web:ui',
              onlyDependOnLibsWithTags: ['web:utils'],
            },
            {
              sourceTag: 'web:form',
              onlyDependOnLibsWithTags: ['web:ui', 'web:utils'],
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

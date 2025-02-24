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
              sourceTag: 'web',
              onlyDependOnLibsWithTags: [
                'web:ui',
                'web:utils',
                'web:data-access',
                'web:core',
                'web:assets',
                'web:auth',
                'web:notes',
                'web:settings',
                'web:form',
                'common:models',
              ],
            },
            {
              sourceTag: 'server',
              onlyDependOnLibsWithTags: ['common:models'],
            },
            {
              sourceTag: 'web:auth',
              onlyDependOnLibsWithTags: [
                'web:ui',
                'web:utils',
                'web:data-access',
                'web:core',
                'web:form',
                'common:models',
              ],
            },
            {
              sourceTag: 'web:notes',
              onlyDependOnLibsWithTags: [
                'web:ui',
                'web:utils',
                'web:data-access',
                'web:core',
                'web:form',
                'common:models',
              ],
            },
            {
              sourceTag: 'web:settings',
              onlyDependOnLibsWithTags: [
                'web:ui',
                'web:utils',
                'web:data-access',
                'web:core',
                'web:form',
                'common:models',
              ],
            },
            {
              sourceTag: 'web:core',
              onlyDependOnLibsWithTags: [
                'web:ui',
                'web:utils',
                'web:form',
                'common:models',
              ],
            },
            {
              sourceTag: 'web:ui',
              onlyDependOnLibsWithTags: ['web:utils'],
            },
            {
              sourceTag: 'web:form',
              onlyDependOnLibsWithTags: ['web:ui', 'web:utils'],
            },
            {
              sourceTag: 'web:data-access',
              onlyDependOnLibsWithTags: ['common:models'],
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

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
              onlyDependOnLibsWithTags: ['/^web.*/', '/^common.*/'],
            },
            {
              sourceTag: 'web:auth',
              onlyDependOnLibsWithTags: [
                'web:shared',
                'web:core',
                'web:ui',
                '/^common.*/',
              ],
            },
            {
              sourceTag: 'web:notes',
              onlyDependOnLibsWithTags: [
                'web:shared',
                'web:core',
                'web:ui',
                '/^common.*/',
              ],
            },
            {
              sourceTag: 'web:settings',
              onlyDependOnLibsWithTags: [
                'web:shared',
                'web:core',
                'web:ui',
                '/^common.*/',
              ],
            },
            {
              sourceTag: 'web:core',
              onlyDependOnLibsWithTags: ['web:shared', 'web:ui', '/^common.*/'],
            },
            {
              sourceTag: 'web:shared',
              onlyDependOnLibsWithTags: ['web:ui', '/^common.*/'],
            },
            {
              sourceTag: 'server',
              onlyDependOnLibsWithTags: ['/^server.*/', '/^common.*/'],
            },
            {
              sourceTag: 'server:auth',
              onlyDependOnLibsWithTags: ['server:shared', 'server:users', '/^common.*/'],
            },
            {
              sourceTag: 'server:users',
              onlyDependOnLibsWithTags: ['server:shared', '/^common.*/'],
            },
            {
              sourceTag: 'server:notes',
              onlyDependOnLibsWithTags: ['server:shared', '/^common.*/'],
            },
            {
              sourceTag: 'server:settings',
              onlyDependOnLibsWithTags: ['server:shared', '/^common.*/'],
            },
            {
              sourceTag: 'server:shared',
              onlyDependOnLibsWithTags: ['/^common.*/'],
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

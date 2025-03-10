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
                '/^web:shared.*/',
                '/^web:core.*/',
                '/^common.*/',
              ],
            },
            {
              sourceTag: 'web:notes',
              onlyDependOnLibsWithTags: [
                '/^web:shared.*/',
                '/^web:core.*/',
                '/^common.*/',
              ],
            },
            {
              sourceTag: 'web:settings',
              onlyDependOnLibsWithTags: [
                '/^web:shared.*/',
                '/^web:core.*/',
                '/^common.*/',
              ],
            },
            {
              sourceTag: 'web:core',
              onlyDependOnLibsWithTags: ['/^web:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'web:shared-ui',
              onlyDependOnLibsWithTags: ['web:shared-utils'],
            },
            {
              sourceTag: 'web:shared-form',
              onlyDependOnLibsWithTags: ['web:shared-ui', 'web:shared-utils'],
            },
            {
              sourceTag: 'web:shared-tags',
              onlyDependOnLibsWithTags: ['web:shared-ui', 'common:models'],
            },
            {
              sourceTag: 'web:shared-store',
              onlyDependOnLibsWithTags: ['web:shared-utils'],
            },
            {
              sourceTag: 'web:shared-data-access',
              onlyDependOnLibsWithTags: ['common:models'],
            },
            {
              sourceTag: 'web:shared-theme',
              onlyDependOnLibsWithTags: [
                'web:shared-data-access',
                'web:shared-ui',
                'common:models',
              ],
            },
            {
              sourceTag: 'server',
              onlyDependOnLibsWithTags: ['/^server.*/', '/^common.*/'],
            },
            {
              sourceTag: 'server:auth',
              onlyDependOnLibsWithTags: [
                '/^server:shared.*/',
                '/^common.*/',
                'server:users',
              ],
            },
            {
              sourceTag: 'server:users',
              onlyDependOnLibsWithTags: ['/^server:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'server:notes',
              onlyDependOnLibsWithTags: ['/^server:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'server:settings',
              onlyDependOnLibsWithTags: ['/^server:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'server:shared-http',
              onlyDependOnLibsWithTags: ['server:shared-entities', '/^common.*/'],
            },
            {
              sourceTag: 'server:shared-validation',
              onlyDependOnLibsWithTags: ['/^common.*/', 'server:shared-http'],
            },
            {
              sourceTag: 'server:shared-entities',
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

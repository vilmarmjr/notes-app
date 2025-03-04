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
              onlyDependOnLibsWithTags: ['/^web:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'web:notes',
              onlyDependOnLibsWithTags: ['/^web:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'web:settings',
              onlyDependOnLibsWithTags: ['/^web:shared.*/', '/^common.*/'],
            },
            {
              sourceTag: 'web:core',
              onlyDependOnLibsWithTags: ['/^web:shared.*/', '/^common.*/'],
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
              onlyDependOnLibsWithTags: ['common:models', 'common:constants'],
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
            {
              sourceTag: 'common:models',
              onlyDependOnLibsWithTags: ['common:constants'],
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

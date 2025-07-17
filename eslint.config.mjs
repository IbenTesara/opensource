import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';

export default [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  eslintConfigPrettier,
	{
		ignores: ['**/dist'],
	},
	{
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
			import: importPlugin
		},
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
					],
				},
			],
			'@typescript-eslint/no-inferrable-types': 'off',
			'import/order': [
				'error',
				{
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					},
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '@lib/**',
							group: 'internal'
						},
					],
					pathGroupsExcludedImportTypes: ['builtin', 'object'],
					groups: ['index', 'external', 'type', 'internal', 'parent', 'sibling']
				}
			]
		},
	},
	{
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.cts',
			'**/*.mts',
			'**/*.js',
			'**/*.jsx',
			'**/*.cjs',
			'**/*.mjs',
		],
		// Override or add rules here
		rules: {},
	},
];

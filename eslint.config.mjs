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
			import: importPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@angular-eslint/no-input-rename': 'off',
			'@angular-eslint/prefer-on-push-component-change-detection': 'off',
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
					depConstraints: [
						{
							sourceTag: 'type:app',
							onlyDependOnLibsWithTags: ['type:lib'],
						},
						{
							sourceTag: 'scope:ngx-core',
							onlyDependOnLibsWithTags: ['scope:ngx-core'],
						},
						{
							sourceTag: 'scope:authentication-types',
							onlyDependOnLibsWithTags: ['scope:authentication-types'],
						},
						{
							sourceTag: 'scope:js-core',
							onlyDependOnLibsWithTags: ['scope:js-core'],
						},
						{
							sourceTag: 'scope:js-rxjs',
							onlyDependOnLibsWithTags: ['scope:js-rxjs'],
						},
						{
							sourceTag: 'scope:js-utils',
							onlyDependOnLibsWithTags: ['scope:js-utils'],
						},
						{
							sourceTag: 'scope:ngx-forms',
							onlyDependOnLibsWithTags: ['scope:ngx-forms'],
						},
						{
							sourceTag: 'scope:ngx-store',
							onlyDependOnLibsWithTags: ['scope:ngx-store'],
						},
						{
							sourceTag: 'scope:ngx-authentication',
							onlyDependOnLibsWithTags: [
								'scope:ngx-authentication',
								'scope:authentication-types',
							],
						},
						{
							sourceTag: 'scope:ngx-cookies',
							onlyDependOnLibsWithTags: ['scope:ngx-cookies', 'scope:ngx-core'],
						},
						{
							sourceTag: 'scope:ngx-i18n',
							onlyDependOnLibsWithTags: ['scope:ngx-i18n', 'scope:ngx-core'],
						},
						{
							sourceTag: 'scope:ngx-inform',
							onlyDependOnLibsWithTags: ['scope:ngx-inform', 'scope:ngx-core'],
						},
						{
							sourceTag: 'scope:ngx-layout',
							onlyDependOnLibsWithTags: ['scope:ngx-layout', 'scope:ngx-core'],
						},
						{
							sourceTag: 'scope:ngx-utils',
							onlyDependOnLibsWithTags: ['scope:ngx-utils', 'scope:ngx-core'],
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
						caseInsensitive: true,
					},
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '@lib/**',
							group: 'internal',
						},
					],
					pathGroupsExcludedImportTypes: ['builtin', 'object'],
					groups: ['index', 'external', 'type', 'internal', 'parent', 'sibling'],
				},
			],
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

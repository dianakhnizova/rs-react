import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint
  .config(
    {
      ignores: [
        'dist/',
        'node_modules/',
        'build/',
        '*.log',
        '.coverage/',
        '.vscode/',
        '.idea/',
        '.eslintcache',
        '*.min.js',
        '.DS_Store',
        'coverage/',
        'tests',
        'vite.config.ts',
        'vitest-setup.ts',
        'vitest.config.ts'
      ],
    },
    {
      linterOptions: {
        noInlineConfig: true,
        reportUnusedDisableDirectives: true,
      },
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        eslintPluginUnicorn.configs.recommended,
      ],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        prettier: prettierPlugin,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'never' },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'explicit', overrides: { constructors: 'off' } },
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        'class-methods-use-this': 'off',
        'unicorn/max-func-body-length': 'off',
        'unicorn/no-empty-file': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-lonely-if': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prefer-add-event-listener': 'off',
        'prettier/prettier': 'error',
      },
    }
  )
  .concat(eslintPluginPrettier);

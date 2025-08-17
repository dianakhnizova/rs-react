import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';

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
        '**/*.test.tsx',
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
        react: react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'react-compiler': reactCompiler,
        prettier: prettierPlugin,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'react-compiler/react-compiler': 'error',
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
        'unicorn/max-func-body-length': 'off',
        'unicorn/no-empty-file': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-lonely-if': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/prefer-string-raw': 'off',
        'prettier/prettier': 'error',
      },
    }
  )
  .concat(eslintPluginPrettier);

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config({
  ignores: [
    'dist/**',
    'node_modules/**',
    'android/**',
    'ios/**',
    'cypress/**',
    '.history/**',
    'eslint.config.js',
  ],
}, js.configs.recommended, ...tseslint.configs.recommended, react.configs.flat.recommended, react.configs.flat['jsx-runtime'], {
  settings: {
    react: { version: 'detect' },
  },
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
  },
}, storybook.configs["flat/recommended"]);

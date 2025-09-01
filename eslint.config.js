import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const compat = new FlatCompat();

export default [
    js.configs.recommended,
    ...compat.extends('next/core-web-vitals'),
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'dist/**',
            'build/**',
            '*.config.js',
            '*.config.mjs',
            'next-env.d.ts',
        ],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                React: 'readonly',
                JSX: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            prettier: prettierPlugin,
            '@next/next': nextPlugin,
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            '@next/next/no-img-element': 'off',
            'react/no-unescaped-entities': 'off',
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' },
            ],
        },
    },
];

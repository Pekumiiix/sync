import js from '@eslint/js';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**', '.output/**']
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  pluginPrettier,
  skipFormatting,

  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],

      'prefer-const': 'error',
      'no-unreachable': 'error',
      'no-use-before-define': 'off',
      'comma-dangle': 'off',
      'no-global-assign': 'off',
      quotes: 'off',
      'space-before-function-paren': 'off',
      'vue/multi-word-component-names': 'off',

      'vue/no-restricted-html-elements': [
        'error',
        {
          element: 'button',
          message: 'Use the custom <Button> component instead of the native HTML <button>.'
        },
        {
          element: 'input',
          message: 'Use the custom <Input> component instead of the native HTML <input>.'
        },
        {
          element: 'label',
          message: 'Use the custom <Label> component instead of the native HTML <label>.'
        },
        {
          element: 'textarea',
          message: 'Use the custom <Textarea> component instead of the native HTML <textarea>.'
        }
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'vue',
              importNames: ['default'],
              message: "Import named exports from 'vue' instead (e.g., import { ref } from 'vue')."
            }
          ]
        }
      ],

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^vue', '^@?\\w'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css|scss)$']
          ]
        }
      ]
    }
  },

  {
    name: 'app/ignore-restricted-html-in-ui',
    files: ['src/components/ui/**/*.vue'],
    rules: {
      'vue/no-restricted-html-elements': 'off'
    }
  }
);

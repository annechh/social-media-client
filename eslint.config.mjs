import globals from 'globals';
import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
];

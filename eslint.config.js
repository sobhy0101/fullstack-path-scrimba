export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        setTimeout: 'readonly',
        FormData: 'readonly',
        Event: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off', // Allow console.log for learning
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'jsx-a11y/heading-has-content': 'off', // Disable empty heading lint
    },
  },
];
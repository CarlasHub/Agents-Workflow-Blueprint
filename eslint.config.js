export default [
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'dist/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        Blob: 'readonly',
        CSS: 'readonly',
        FormData: 'readonly',
        HTMLElement: 'readonly',
        TextEncoder: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        getComputedStyle: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        window: 'readonly'
      }
    },
    rules: {
      'no-constant-binary-expression': 'error',
      'no-duplicate-imports': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': ['error', { "argsIgnorePattern": "^_", "caughtErrors": "none" }]
    }
  }
];

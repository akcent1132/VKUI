module.exports = {
  root: false,
  extends: ['plugin:react-hooks/recommended'],
  plugins: ['import', 'vkui'],
  parserOptions: {
    project: '../tsconfig.json', // TODO #3846 поправить './tsconfig.json'
    tsconfigRootDir: __dirname,
  },
  globals: {
    Element: true,
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // prevent absolute imports from src subfolders like `import { ... } from "lib"`
          'components',
          'helpers',
          'hoc',
          'hooks',
          'lib',
          'styles',
          'testing',
          'types',
        ],
        patterns: [
          '@vkontakte/icons/dist/*',
          // prevent absolute imports from src subfolders like `import { ... } from "lib/platform"`
          'components/*',
          'helpers/*',
          'hoc/*',
          'hooks/*',
          'lib/*',
          'styles/*',
          'testing/*',
          'types/*',
        ],
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        property: 'querySelector',
        message: 'Make sure to use [data-*] selector, not class',
      },
      {
        property: 'querySelectorAll',
        message: 'Make sure to use [data-*] selector, not class',
      },
      {
        property: 'matches',
        message: 'Make sure to use [data-*] selector, not class',
      },
      {
        property: 'closest',
        message: 'Make sure to use [data-*] selector, not class',
      },
      {
        property: 'getElementsByClassName',
        message: "Use .querySelectorAll('[data-*]')",
      },
      {
        property: 'classList',
        message: "Make sure to use 'vkui' prefix",
      },
      {
        property: 'getElementById',
        message: 'Absolutely do not use id',
      },
      {
        object: 'React',
        property: 'useLayoutEffect',
        message: 'Prefer lib/useIsomorphicLayoutEffect',
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportDeclaration[source.value=/^\\W+(index(\\.ts)?)?$/i]',
        message: 'Do not import index',
      },
      {
        selector:
          'ImportDeclaration[source.value=/\\.css$/i] ~ ImportDeclaration[source.value!=/\\.css$/i]',
        message: 'CSS import must be last',
      },
    ],

    'import/no-default-export': 'error',

    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error'],

    'vkui/no-object-expression-in-arguments': [
      'error',
      {
        onlyForFunctionsWithNames: ['classNames'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      excludedFiles: ['**/*.{test,spec,e2e}.{ts,tsx}', 'testing/**/*.{ts,tsx}'],
      settings: {
        lintAllEsApis: true,
        polyfills: [
          'Array.includes',
          'Array.find',
          'String.padStart',
          'Intl', // Отсутствует. Не поддерживается в iOS Safari 9, Calendar должен использоваться только на desktop
        ],
      },
      extends: ['plugin:compat/recommended'],
      rules: {
        'compat/compat': 'error',
      },
    },

    {
      files: ['**/*.{test,spec,e2e}.{ts,tsx}', 'testing/**/*.{ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        'no-restricted-properties': 'off',
        'no-restricted-globals': 'off',
        'react/display-name': 'off',
      },
    },

    {
      files: ['**/*.e2e.{ts,tsx}', 'testing/**/*.{ts,tsx}'],
      extends: ['plugin:jest-playwright/recommended'],
    },
  ],
};
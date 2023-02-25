module.exports = {
  root: true,
  ignorePatterns: ['node_modules/*', '.next/*', '.vscode/*', '.idea/*', 'out/*', 'build/*', '.prettierrc', '__generated__/*', 'public/*'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['turbo', 'plugin:@next/next/recommended', 'plugin:react/recommended', 'prettier', 'plugin:react-hooks/recommended', 'plugin:import/recommended'],
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error'],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|info)$/]",
        message: 'Only console.error or console.info is allowed',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: ['eslint:recommended'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        // 'import/ignore': 'off',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
        'import/core-modules': ['db'],
      },
    },
  ],
}

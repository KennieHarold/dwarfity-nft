module.exports = {
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true
  },
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true
  },
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'error',
    'unicorn/no-array-reduce': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
  },
  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true }
    }
  ]
};

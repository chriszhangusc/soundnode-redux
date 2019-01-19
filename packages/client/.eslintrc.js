module.exports = {
  extends: ['plugin:react/recommended', 'airbnb/base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    allowImportExportEverywhere: false,
  },
  plugins: ['import', 'react', 'jsx-a11y'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
  },
};

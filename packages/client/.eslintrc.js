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
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': 0,
    // "class-methods-use-this": 0,
    // "import/extensions": 0,
    // "import/no-extraneous-dependencies": 0,
    // "react/no-array-index-key": 0,
    // "jsx-a11y/no-static-element-interactions": 0,
    // "function-paren-newline": 0,
    // "prefer-destructuring": 0,
    // "new-cap": 0,
  },
};

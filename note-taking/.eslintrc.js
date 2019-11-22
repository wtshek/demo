module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "linebreak-style":0,
    "react/jsx-filename-extension":0,
    "no-shadow":0,
    "react/button-has-type":0,
    "no-console":0,
    "no-return-assign":0,
    "react/prop-types":0,
    "array-callback-return":0,
    "arrow-body-style":0,
    "consistent-return":0
  },
};

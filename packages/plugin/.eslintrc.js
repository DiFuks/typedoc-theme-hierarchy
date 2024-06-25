require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-fuks'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    'no-relative-imports/no-relative-imports': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-key': 'off',
    'react/display-name': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'react/function-component-definition': 'off',
    'react/destructuring-assignment': 'off',
    'react/button-has-type': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
  },
  overrides: [
    {
      files: ['*.json'],
      parserOptions: {
        project: false,
      },
    },
  ],
};

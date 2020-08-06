module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'error',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'max-len': 'off',
    'indent': ['warn', 2, {
      'SwitchCase': 1,
      'MemberExpression': 1
    }],
    'quote-props': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'import/named': 'error',
    'no-multi-spaces': ['error'],
    'global-require': 'off',
    'import/no-dynamic-require': 'off'
  },
};

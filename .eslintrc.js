module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb',
    './my.eslintrc'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
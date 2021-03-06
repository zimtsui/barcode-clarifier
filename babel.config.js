module.exports = {
    presets: [
        '@vue/app',
    ],
    plugins: [
        '@babel/plugin-proposal-function-bind',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ],
};

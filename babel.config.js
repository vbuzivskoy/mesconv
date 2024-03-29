module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current',
      },
    }],
  ],
  env: {
    debug: {
      sourceMaps: 'inline',
      retainLines: true,
    },
  },
  plugins: [
    'shebang',
  ],
};

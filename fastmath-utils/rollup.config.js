export default [
  {
    input: './src/index.js',
    output: {
      dir: 'build',
      format: 'umd',
      name: 'fastmath',
      exports: 'named',
      sourcemap: true,
    },
  },
];

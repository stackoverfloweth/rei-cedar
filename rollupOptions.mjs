import { babel } from '@rollup/plugin-babel';
import browserTargets from './browserTargets.mjs';

export default {
  external: ['vue', 'core-js', 'lodash-es', 'tabbable'], // Externalize peerDependencies
  output: {
    globals: {
      vue: 'Vue',
    },
  },
  plugins: [
    babel({
      exclude: ['node_modules/**'],
      babelHelpers: 'bundled',
      babelrc: false,
      extensions: ['.js', '.mjs', '.vue'],
      targets: browserTargets,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false, // don't convert ESM modules, as that breaks tree shaking
            targets: browserTargets, // polyfill based on supported browsers
            corejs: { // use corejs@3 for polyfills
              version: '3.26', // see https://github.com/zloirock/core-js#babelpreset-env
            },
            useBuiltIns: 'usage', // polyfill based on usage in source code.
            bugfixes: true, // See https://github.com/babel/babel/issues/13916 (note, we can remove this when Babel 8 is released.
          },
        ],
      ],
    }),
  ],
};

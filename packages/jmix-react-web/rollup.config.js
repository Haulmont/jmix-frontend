import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import  autoprefixer from "autoprefixer";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.js',
      format: 'commonjs'
    }
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: true
    }),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    json(),
    postcss({
      plugins: [
        autoprefixer()
      ]
    }),
  ]
};

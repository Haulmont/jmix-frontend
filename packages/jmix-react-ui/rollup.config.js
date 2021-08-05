import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import resolveNodeImportsInLess from './resolve-node-imports-in-less';
import * as autoprefixer from "autoprefixer";

export default {
  input: 'dist-transpiled/index.js',
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
  external: [
    '@ant-design/icons',
    '@apollo/client',
    '@apollo/client/testing',
    '@haulmont/jmix-rest',
    '@haulmont/jmix-react-core',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/react-hooks',
    '@types/jest-expect-message',
    'antd',
    'antd/es/date-picker/generatePicker',
    'antd/es/date-picker/style/index',
    'antd/es/form/Form',
    'rc-picker/lib/generate/dayjs',
    'graphql',
    'jest-expect-message',
    'mobx',
    'dayjs',
    'mobx-react',
    'object.fromentries',
    'react',
    'react-intl',
    'react-input-mask',
    'react-dom',
    'react-router',
    'react-router-dom',
    'react-testing-library',
    'query-string',
  ],
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'invariant': ['default'],
      }
    }),
    json(),
    postcss({
      extensions: ['.less'],
      extract: 'dist/index.min.css',
      minimize: true,
      use: [
        ['less', {javascriptEnabled: true}],
        'resolveNodeImportsInLess',
      ],
      loaders: [
        resolveNodeImportsInLess
      ],
      plugins: [
        autoprefixer
      ]
    }),
  ]
};

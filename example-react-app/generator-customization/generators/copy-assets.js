const vfs = require('vinyl-fs');
const path = require('path');

vfs.src([
  path.resolve(__dirname, 'src/**/template/**'),
  path.resolve(__dirname, 'src/**/template/.**'),
  path.resolve(__dirname, 'src/**/*.svg')
]).pipe(vfs.dest(path.resolve(__dirname, 'build')));
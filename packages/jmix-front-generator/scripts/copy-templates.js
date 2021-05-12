const vfs = require('vinyl-fs');

vfs.src([
  'src/**/template/**',
  'src/**/template/.**',
  'src/**/info.json',
  'src/**/*.svg']
).pipe(vfs.dest('lib'));
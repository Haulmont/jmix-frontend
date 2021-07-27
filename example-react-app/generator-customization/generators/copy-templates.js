const vfs = require('vinyl-fs');

vfs.src([
  'src/**/template/**',
  'src/**/template/.**',
  'src/**/*.svg']
).pipe(vfs.dest('build'));
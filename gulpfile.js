var gulp = require('gulp');
var atomshell = require('gulp-atom-shell');

gulp.task('darwin', function () {
  return gulp.src('src/**')
    .pipe(atomshell({
      version: '0.20.7',
      productName: 'PaperTreeProject',
      productVersion: '0.1.0',
      platform: 'darwin',
    }))
    .pipe(atomshell.zfsdest('paper_tree_client_darwin.zip'));
});

gulp.task('win32', function () {
  return gulp.src('src/**')
    .pipe(atomshell({
      version: '0.20.7',
      productName: 'PaperTreeProject',
      productVersion: '0.1.0',
      platform: 'win32',
    }))
    .pipe(atomshell.zfsdest('paper_tree_client_win32.zip'));
});

gulp.task('linux', function () {
  return gulp.src('src/**')
    .pipe(atomshell({
      version: '0.20.7',
      productName: 'PaperTreeProject',
      productVersion: '0.1.0',
      platform: 'linux',
    }))
    .pipe(atomshell.zfsdest('paper_tree_client_linux.zip'));
});

gulp.task('default', ['darwin', 'win32', 'linux']);

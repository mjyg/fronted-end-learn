const gulp = require('gulp');
const watch = require('gulp-watch');
const entry = './src/server/**/*.js';
const plumber = require('gulp-plumber');
const cleanEntry = './src/server/config/index.js';
const rollup = require('gulp-rollup');
const babel = require('gulp-babel');
const replace = require('@rollup/plugin-replace');
const prepack = require('gulp-prepack');
function builddev() {
  return watch(entry, { ignoreInitial: false }, () => {
    gulp
      .src(entry)
      .pipe(plumber())
      .pipe(
        babel({
          babelrc: false,
          plugins: ['@babel/plugin-transform-modules-commonjs'],
        })
      )
      .pipe(gulp.dest('dist'));
  });
}

function buildprod() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        ignore: [cleanEntry],
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('dist'));
}

//清理环境变量
function buildconfig() {
  return (
    gulp
      .src(entry)
      .pipe(
        rollup({
          input: cleanEntry,
          output: {
            format: 'cjs',
          },
          plugins: [
            replace({
              'process.env.NODE_ENV': JSON.stringify('production'),
            }),
          ],
        })
      )
      // .pipe(prepack({}))
      .pipe(gulp.dest('./dist'))
  );
}

let build = gulp.series(builddev);
if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}

gulp.task('default', build);

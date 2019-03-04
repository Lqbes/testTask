const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');

var spritesmith = require('gulp.spritesmith');


// Server
gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "dist"
        }
    });

    gulp.watch('app/**/*').on('change', browserSync.reload);
});

// Html min
// gulp.task('minify', () => {
//     return gulp.src('app/*.html')
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest('dist'));
// });

// Style compile 
gulp.task('sass', function () {
    return gulp.src('app/styles/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'));
});

// Sprites 
gulp.task('sprite', function () {
    var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss'
    }));
    return spriteData.pipe(gulp.dest('app/images/'));
});

// Html compile
gulp.task('html', function () {
    return gulp.src('./app/index.html')
    .pipe(gulp.dest('dist/'));
});

// Images compile
gulp.task('copy:images', function () {
    return gulp.src('./app/img/*.*')
    .pipe(gulp.dest('dist/images'));
});

// Fonts compile
gulp.task('copy:fonts', function () {
    return gulp.src('./app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('fonts', function () {
    return gulp.src('app/styles/fonts.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'));
});

// Watchers
gulp.task('watch', function () {
    gulp.watch('app/index.html', gulp.series('html'));
    gulp.watch('app/styles/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series(
    gulp.parallel('html', 'sass', 'sprite', 'copy:images', 'copy:fonts', 'fonts'),
    gulp.parallel('watch', 'server')
    
)
);







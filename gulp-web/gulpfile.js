const gulp = require('gulp');
const gulpscss = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('compilescss', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpscss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watching', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('compilescss'))
})
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 3006,
            proxies: [{
                source: "/api/getdata",
                target: "http://localhost:3000/api/getdata"
            }, {
                source: "/api/adddata",
                target: "http://localhost:3000/api/adddata"
            }, {
                source: "/api/deldata",
                target: "http://localhost:3000/api/deldata"
            }, {
                source: "/api/updata",
                target: "http://localhost:3000/api/updata"
            }, {
                source: "/api/finddata",
                target: "http://localhost:3000/api/finddata"
            }]
        }))

})
gulp.task('default', gulp.series('compilescss', 'server', 'watching'))
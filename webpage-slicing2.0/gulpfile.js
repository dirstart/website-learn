var gulp=require('gulp'),
	rename=require('gulp-rename'),
	stylus=require('gulp-stylus'),
	browser=require('browser-sync');
var bs=browser.create(),
	reload=bs.reload;


gulp.task('hot_server',['test_stylus'],function(){
	bs.init({
		server:"./",
		port:8080
	});
	gulp.watch('./src/js/*.js').on('change',reload);
	gulp.watch('./src/stylus/*.styl',['test_stylus']);
	gulp.watch('./src/css/*.css').on('change',reload);
	gulp.watch('*.html').on('change',reload);
});

gulp.task('default',['hot_server']);





gulp.task('test_stylus',function(){
	gulp.src('./src/stylus/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('./src/css'));
});




gulp.task('test_rename',function(){
	gulp.src('./test.js')
	.pipe(rename('xx.js'))
	.pipe(gulp.dest('./src/js'));
});


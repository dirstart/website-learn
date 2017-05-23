var gulp = require('gulp'),
	bs = require('browser-sync').create(),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	stylus = require('gulp-stylus'),
	reload = bs.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve',['stylus'], function() {

	bs.init({
		server: "./"
		// ,port:8080
	});
	gulp.watch("./src/js/*.js").on('change',reload);
	gulp.watch("./src/stylus/*.styl", ['stylus']);
	gulp.watch("./src/css/*.css").on('change',reload);
	gulp.watch("*.html").on('change', reload);
});

gulp.task('stylus',function(){
	return gulp.src("./src/stylus/*.styl")
		.pipe(stylus())
		.pipe(gulp.dest("./src/css"))
		.pipe(reload({stream:true}));
});


gulp.task('default', ['serve']);

gulp.task('testHtml',function(){
	var options={
		removeComments:true,//清除html注释
		collapseWhitespace:true,//压缩html
		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
	};
	gulp.src('./*.html')
	.pipe(minifyHtml(options))
	.pipe(gulp.dest('dist/html'));
});
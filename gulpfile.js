


var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');


// less编译  压缩  合并没有必要
gulp.task('style',function(){
	gulp.src('src/styles/*.less')
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/styles/'))
		.pipe(browserSync.reload({
			stream:true
		}))
})

// js 压缩 合并  混淆
gulp.task('scripts',function () {
	gulp.src('src/scripts/*.js')
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }))
})
// 复制图片
gulp.task('img',function () {
	   gulp.src('src/images/*.*')
		   .pipe(gulp.dest('./dist/images'))
		   .pipe(browserSync.reload({
			   stream:true
		   }))
})

// html 复制压缩
gulp.task('html',function () {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			// 这是出去空白
				collapseWhitespace: true,
			// 这是删掉的注释
            removeComments:true
		}))
		.pipe(gulp.dest('dist'))

		// 这是实现局部刷新，重载服务

		.pipe(browserSync.reload({
			stream:true
		}))
})

// 接下来就是监视服务器browser-sync
var browserSync=require('browser-sync');
gulp.task('server',function () {
    browserSync({
			server: {
				baseDir:['dist']
			}
		},
		function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    // 起到监视刷新作用
    // 在监视的后面添加执行函数起到局部或刷新的作用
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['scripts']);
	gulp.watch('src/images/*.*',['img']);
	gulp.watch('src/*.html',['html']);
})

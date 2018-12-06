var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');//js文件压缩
var del = require('del');//文件删除
var classPath = "lamborghiniJS";


gulp.task('clean', function () {
    del([
        classPath+'/build/base.min.js'
    ]);
});
gulp.task('js', function(){
    return gulp.src([
        ,classPath+'/base/Base.class.js'
        ,classPath+'/base/Object.class.js'
        ,classPath+'/base/Component.class.js'
        ,classPath+'/base/Base64.class.js'
        ,classPath+'/base/Cache.class.js'
        ,classPath+'/base/HttpRequest.class.js'
        ,classPath+'/base/Helper.class.js'
        ,classPath+'/base/Browser.class.js'
        ,classPath+'/base/Event.class.js'
        ,classPath+'/base/Dom.class.js'
        ,classPath+'/base/View.class.js'
        ,classPath+'/base/Template.class.js'
        ,classPath+'/base/Html.class.js'
        ,classPath+'/base/Loader.class.js'
    ])
        .pipe(concat('base.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(classPath+'/build'))
});

gulp.task('default', ['clean','js']);
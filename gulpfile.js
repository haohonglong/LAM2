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
var jses = {
    "Base":classPath+'/base/Base.class.js'
    ,"Object":classPath+'/base/Object.class.js'
    ,"Component":classPath+'/base/Component.class.js'
    ,"Compiler":classPath+'/base/Compiler.class.js'
    ,"Base64":classPath+'/base/Base64.class.js'
    ,"Cache":classPath+'/base/Cache.class.js'
    ,"HttpRequest":classPath+'/base/HttpRequest.class.js'
    ,"Helper":classPath+'/base/Helper.class.js'
    ,"Browser":classPath+'/base/Browser.class.js'
    ,"Event":classPath+'/base/Event.class.js'
    ,"Dom":classPath+'/base/Dom.class.js'
    ,"View":classPath+'/base/View.class.js'
    ,"Template":classPath+'/base/Template.class.js'
    ,"Html":classPath+'/base/Html.class.js'
    ,"Loader":classPath+'/base/Loader.class.js'
    ,"Storage":classPath+'/base/Storage.class.js'
    ,"Controller":classPath+'/base/Controller.class.js'
    ,"Router":classPath+'/base/Router.class.js'
};

var srcs = [];
var k;
for(k in jses){
    srcs.push(jses[k]);
}

gulp.task('js', function(){
    return gulp.src(srcs)
        .pipe(concat('base.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(classPath+'/build'))
});

gulp.task('default', ['clean','js']);
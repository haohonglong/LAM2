(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
            typeof define === 'function' && define.amd ? define(factory(System)) :
                (System['ContentController'] = factory(System));
    }

})(this,function(System){
    'use strict';
    var __this__=null;
    System.is(System,'Controller','ContentController',System.classPath+'/base');
    var E = {file_404:System.ERROR_404};
    var ContentController = System.Controller.extend({
        constructor: function (init){
            this.base(init || {});
            __this__=this;
            this.viewpath = System.VIEWS+'/content';

        },
        '_className':'ContentController',
        'htmlAction':function(){
            return this.render('html',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'biObjectAction':function(){
            return this.render('biObject',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'browserAction':function(){
            return this.render('browser',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'cacheAction':function(){
            return this.render('cache',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'controllerAction':function(){
            return this.render('controller',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'cookieAction':function(){
            return this.render('cookie',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'loader':function(){
            return this.render('loader',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'nodeAction':function(){
            return this.render('node',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'powerCookieAction':function(){
            return this.render('powerCookie',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'runningAction':function(){
            return this.render('running',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'storageAction':function(){
            return this.render('storage',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'systemAction':function(){
            return this.render('system',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'templateAction':function(){
            return this.render('template',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'vnodeAction':function(){
            return this.render('vnode',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },
        'xhrAction':function(){
            return this.render('xhr',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT,
                'VIEWS':System.VIEWS

            },E);
        },


        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销ContentController对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    });
    return ContentController;
});



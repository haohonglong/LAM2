
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2018-10-31
 * 名称：the base of controller
 * 功能：
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */
(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
        typeof define === 'function' && define.amd ? define(factory(System)) :
        (System['Controller'] = factory(System));
    }

})(this,function(System){
    'use strict';
    System.is(System,'Component','Controller',System.classPath+'/base');
    var __this__=null;
    var Controller = System.Component.extend({
        constructor: function(init) {
            this.base();
            __this__=this;
            init = init || {};
            this.layout = 'main';
            this.suffix = '.html';
            this.view = '/layouts/'+this.layout;
            this.viewpath = System.VIEWS;
        },
        '_className':'Controller',
        'init':function (data) {
            this.viewpath = System.VIEWS;
            this.render('/layouts/'+this.layout,data);
        },
        'renderLayout':function(content){
            this.init({
                'VIEWS':System.VIEWS,
                'IMAGE':System.IMAGE,
                'LAM':System,
                'content':content

            });
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图
         * 创建日期：2018-9-12
         * 修改日期：2018-10-31
         * 名称：render
         * 功能：render the page
         * 说明：
         * 注意：
         * @param name{String}      name of view
         * @param data{Object}      assign data to page
         * @param print{Function}
         * @param D{Object}         for ajax configure
         */
        'render':function (name,data,print,D) {
            data = data || {};
            D = System.merge({},[D,{
                file_404:System.ERROR_404,
                beforeSend:function(a,b){
                    this.async=false;
                }
            }]);
            if('/' !== name.trim().substring(0,1)){name = '/'+name;}

            new System.Template().render(this.viewpath+name+this.suffix,data,print,D);
        },

        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Controller对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    });

    return Controller;
});






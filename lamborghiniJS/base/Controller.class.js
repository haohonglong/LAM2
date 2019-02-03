
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2019-02-3
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
            this.name = '';
            this.data = {};
            this.ajaxConfig = {};
        },
        '_className':'Controller',
        'init':function (name,data,ajaxConfig) {
            this.data = data || {};
            this.ajaxConfig = System.merge({},[ajaxConfig,{
                file_404:System.ERROR_404,
                beforeSend:function(a,b){
                    this.async=false;
                }
            }]);
            if('/' !== name.trim().substring(0,1)){
                this.name = '/'+name;
            }else{
                this.name = name;
            }
            this.name = this.viewpath+this.name+this.suffix;
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图与layout
         * 创建日期：2018-9-12
         * 修改日期：2019-02-3
         * 名称：render
         * 功能：render the page
         * 说明：
         * 注意：
         * @param name{String}              NO NULL:name of view
         * @param data{Object}              NULL:assigning data for page
         * @param ajaxConfig{Object}        NULL:init ajax configure
         */
        'render':function (name,data,ajaxConfig) {
            var self  = this;
            this.init(name,data,ajaxConfig);
            name = this.name;
            data = this.data;
            ajaxConfig = this.ajaxConfig;
            new System.Template().render(name,data,function (content) {
                self.viewpath = System.VIEWS;
                self.renderPartial('/layouts/'+self.layout,{
                    'VIEWS':System.VIEWS,
                    'IMAGE':System.IMAGE,
                    'LAM':System,
                    'content':content
                });
            },ajaxConfig);
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图,没有layout
         * 创建日期：2019-02-3
         * 修改日期：2019-02-3
         * 名称：renderPartial
         * 功能：render the page
         * 说明：
         * 注意：
         * @param name{String}              NO NULL:name of view
         * @param data{Object}              NULL:assigning data for page
         * @param callback{Function}        NULL:callback
         * @param ajaxConfig{Object}        NULL:init ajax configure
         */
        'renderPartial':function (name,data,callback,ajaxConfig) {
            if(!System.isFunction(callback)) {
                ajaxConfig = callback;
                callback = null;
            }
            this.init(name,data,ajaxConfig);
            name = this.name;
            data = this.data;
            ajaxConfig = this.ajaxConfig;
            new System.Template().render(name,data,callback,ajaxConfig);
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






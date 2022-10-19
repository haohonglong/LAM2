
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:202-08-14
 * 名称：the base of controller
 * 功能：
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */
(function(global,factory){
    'use strict';

    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    var System = global['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        var Controller = factory(System);
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Controller :
        typeof define === 'function' && define.amd ? define(Controller) : System.Controller = Controller;
        System.export("System.base.Controller", Controller);
    }

})(this,function(System){
    'use strict';
    System.is(System,'Component','Controller',System.classPath+'/base');
    var Component = System.require("System.base.Component");
    var __this__=null;

    var Controller = Component.extend({
        constructor: function(init) {
            this.base();
            __this__=this;
            init = init || {};
            this.layout = 'main';
            this.suffix = '.html';
            this.layoutPath = System.LAYOUTS;
            this.viewpath = System.VIEWS;
            this.partialPath = "";
            this.ajaxConfig = null;
            this.title = 'title';
            this.content = {};
            this.view = null;

        },
        '_className':'Controller',
        'init':function () {},
        'getView':function(){
            if(!(this.view instanceof System.View)){
                this.view = new System.View();
            }
            this.view.title      = this.title;
            this.view.ajaxConfig = this.ajaxConfig;
            this.view.viewpath   = this.viewpath;
            this.view.suffix     = this.suffix;
            return this.view;
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图与layout
         * 创建日期：2018-9-12
         * 修改日期：2022-08-14
         * 名称：render
         * 功能：render the page
         * 说明：返回视图
         * 注意：
         * @param name{String}              NO NULL:name of view
         * @param data{Object}              NULL:assigning data for page
         * @param ajaxConfig{Object}        NULL:init ajax configure
         * @param callback{Function}        NULL:
         * @returns {System.Template}
         */
        'render':function (name,data,ajaxConfig,callback) {
            return this.renderContent(this.renderPartial(name,data,ajaxConfig),callback);
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图与layout
         * 创建日期：2019-06-18
         * 修改日期：2022-10-11
         * 名称：renderContent
         * 功能：
         * 说明：返回视图
         * 注意：
         * @param temp{System.Template}
         * @param callback
         * @returns {System.Template}
         */
        'renderContent':function (temp,callback) {
            var obj = temp.layout(temp.content);
            var content = "";
            if(System.isPlainObject(obj)){
                content = obj.content;
                this.title   = obj.title   || this.title;
                this.suffix  = obj.suffix  || this.suffix;
                this.layout  = obj.name    || this.layout;
                System.isPlainObject(obj.data) && System.merge(true,this.content,[obj.data],true);
                this.layoutPath = obj.path || this.layoutPath;
            }
            this.partialPath = this.viewpath;
            this.viewpath = this.layoutPath;
            return this.renderPartial('/'+this.layout,{
                'VIEWS':System.VIEWS,
                'IMAGE':System.IMAGE,
                'LAM':System,
                'title':this.title,
                'D':this.content,
                'content':content
            },callback || null,this.ajaxConfig);
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图,没有layout
         * 创建日期：2019-02-3
         * 修改日期：2019-10-11
         * 名称：renderPartial
         * 功能：render the page
         * 说明：
         * 注意：
         * @param name{String}              NO NULL:name of view
         * @param data{Object}              NULL:assigning data for page
         * @param callback{Function}        NULL:callback
         * @param ajaxConfig{Object}        NULL:init ajax configure
         * @returns {System.Template}
         */
        'renderPartial':function (name,data,callback,ajaxConfig) {
            data = data || System.createDict();
            data.title = data.title || this.title;
            return this.getView().render(name, data, callback, ajaxConfig);

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






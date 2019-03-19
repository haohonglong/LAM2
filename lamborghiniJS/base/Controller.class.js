
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2019-02-21
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
            this.layoutPath = 'layouts';
            this.viewpath = System.VIEWS;
            this.ajaxConfig = null;
            this.title = 'title';
            this.content = {};
        },
        '_className':'Controller',
        'init':function () {},
        /**
         * @author lhh
         * 产品介绍：渲染视图与layout
         * 创建日期：2018-9-12
         * 修改日期：2019-03-19
         * 名称：render
         * 功能：render the page
         * 说明：
         * 注意：
         * @param name{String}              NO NULL:name of view
         * @param data{Object}              NULL:assigning data for page
         * @param ajaxConfig{Object}        NULL:init ajax configure
         * @param callback{Function}        NULL:
         */
        'render':function (name,data,ajaxConfig,callback) {
            var self  = this;
            this.renderPartial(name,data,function (content) {
                self.viewpath = System.VIEWS;
                callback = callback || null;
                var obj = System.Template.layout(content);
                if(System.isPlainObject(obj)){
                    content = obj.content;
                    self.title   = obj.title   || self.title;
                    self.suffix  = obj.suffix  || self.suffix;
                    self.layout  = obj.name   || self.layout;
                    self.content = System.isPlainObject(obj.data) && System.merge(true,self.content,[obj.data],true) || self.content;
                    self.layoutPath = (obj.path && self.layoutPath+'/'+obj.path) || self.layoutPath;
                }
                self.renderPartial('/'+self.layoutPath+'/'+self.layout,{
                    'VIEWS':System.VIEWS,
                    'IMAGE':System.IMAGE,
                    'LAM':System,
                    'title':self.title,
                    'D':self.content,
                    'content':content
                },callback,self.ajaxConfig);
            },ajaxConfig);
        },
        /**
         * @author lhh
         * 产品介绍：渲染视图,没有layout
         * 创建日期：2019-02-3
         * 修改日期：2019-02-5
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
            data = data || {};
            ajaxConfig = System.merge({},[ajaxConfig,{
                file_404:System.ERROR_404,
                beforeSend:function(a,b){
                    this.async=false;
                }
            }]);
            if('/' !== name.trim().substring(0,1)){
                name = '/'+name;
            }
            name = this.viewpath+name+this.suffix;
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






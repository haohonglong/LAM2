(function(global,factory){
    'use strict';

    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    var System = global['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        var Module = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Module :
		typeof define === 'function' && define.amd ? define(Module) : System.Module = Module;
		System.export("lam.base.Module", Module);
    }

})(this,function(System){
    'use strict';
    System.is(System,'Html','Module',System.classPath+'/base');
    var Html = System.require("lam.base.Html");
    var __this__=null;
    var jqueryMap = {};
    var Module = Html.extend({
        constructor: function(options){
            this.base();
            __this__=this;
            var defaults={
                'el':'#app',
                'data':{},
                'methods':{},
                'components':{},
                'configMap':{
                    'template':''
                },
                'watch':{},
                'created':function () {}
            };

            System.isObject(options) ? System.merge(this,[options,defaults]) : System.merge(this,[defaults]);
            this.$$el     = $(this.el);
            this.$el      = this.$$el[0];
            this.$data    = this.data;
            this.$options = this.options;


        },
        '_className':'Module',
        '__constructor':function(){},
        //@overwrite
        'init':function(){
            this.$$el.html(this.configMap.template);
            this.setJqueryMap();
        },
        //@overwrite
        'setJqueryMap':function(){
            var $container = this.$$el;
        },


        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Module对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()						:
         * Example：
         */
        'destructor':function(){}
    });
    Module.component = function (name,options,callback) {
        if(System.isFunction(options)){
            callback = options;
            options  = null;
        }

        var defaults={
            'template':'',
            'model':{},
            'computed':{},
            'inheritAttrs':true,
            'props':[]
        };
        var D = System.isObject(options) ? System.merge({},[options,defaults]) : defaults;

        if(System.isset(callback) && System.isFunction(callback)){
            callback();
        }

    };

    return Module;
});



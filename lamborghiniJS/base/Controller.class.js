
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2018-8-13
 * 名称：助手类
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
        },
        '_className':'Controller',

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






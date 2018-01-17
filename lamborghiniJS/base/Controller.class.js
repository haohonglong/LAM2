
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2018-1-11
 * 名称：助手类
 * 功能：
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *
 * note :
 *
 *
 *
 */

window[GRN_LHH].run([window,window.document,jQuery],function(window,document,$,undefined){
    'use strict';
    var System=this;
    System.is(System,'Component','Controller',System.classPath+'/base');

    var __this__=null;
    var Controller = System.Component.extend({
        constructor: function(init) {
            this.base();
            __this__=this;
            init = init || {};

            var route = System.get(init.route || 'r');
            if(!System.isFunction(this[route+'Action'])){
                throw new Error('Warning: \''+route+'Action\' method not exist');
                return this;
            }
            this[route+'Action']();
            this.route = route;
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

    System['Controller']=Controller;

});





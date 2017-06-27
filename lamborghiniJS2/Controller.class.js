
/**
 * 创建人：lhh
 * 创建日期:2015/7/22
 * 修改日期:2015/7/23
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
    System.is(System,'Component','Controller');

    var __this__=null;
    var Controller = System.Component.extend({
        constructor: function(init) {
            __this__=this;
            init = init || {};

            var action = Controller.get_url_name(init.action || 'action');
            if(!System.isFunction(this[action+'Action'])){
                throw new Error('Warning: \''+action+'Action\' method not exist');
                return this;
            }
            this[action+'Action']();
            this.action = action;
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



    /**
     *
     * @author lhh
     * 产品介绍：
     * 创建日期：2016-3-27
     * 修改日期：2016-3-27
     * 名称：get_url_name
     * 功能：根据url参数获取方法名称
     * @param name
     * @returns {String}渲染对应视图文件的方法名
     * Example: eval(Controller.get_url_name('action'))()
     */
    Controller.get_url_name = System.get_url_param;

    System['Controller']=Controller;

});





(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
            typeof define === 'function' && define.amd ? define(factory(System)) :
                (System['Compiler'] = factory(System));
    }

})(this,function(System){
    'use strict';
    System.is(System,'Helper','Compiler',System.classPath+'/base');

    var __this__=null;
    var Compiler = System.Dom.extend({
        constructor: function () {
            this.base();
            __this__ = this;
        },
        '_className':'Compiler',
        '__constructor':function(){},

        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Compiler对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()						:
         * Example：
         */
        'destructor':function(){}
    });

    return Compiler;
});





(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
            typeof define === 'function' && define.amd ? define(factory(System)) :
                (System['IntroduceController'] = factory(System));
    }

})(this,function(System){
    'use strict';
    var __this__=null;
    System.is(System,'Controller','IntroduceController',System.classPath+'/base');
    var E = {file_404:System.ERROR_404};
    var IntroduceController = System.Controller.extend({
        constructor: function (init){
            this.base(init || {});
            __this__=this;
            this.viewpath = System.VIEWS+'/introduce';

        },
        '_className':'IntroduceController',
        'indexAction':function(){
            return this.render('index',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT

            },E);
        },
        'aboutAction':function(){
            return this.render('about',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT

            },E);
        },
        'configurationAction':function(){
            return this.render('configuration',{
                'COMMON':System.COMMON,
                'ROOT':System.ROOT

            },E);
        },







        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销IntroduceController对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    });
    return IntroduceController;
});



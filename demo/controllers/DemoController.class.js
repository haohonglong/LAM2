(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
            typeof define === 'function' && define.amd ? define(factory(System)) :
                (System['DemoController'] = factory(System));
    }

})(this,function(System){
    'use strict';

    var __this__=null;
    System.is(System,'Controller','DemoController',System.classPath+'/base');
    var DemoController = System.Controller.extend({
        constructor: function (init){
            this.base(init || {});
            __this__=this;
            this.viewpath = System.VIEWS+'/demo';

        },
        '_className':'DemoController',
        'layoutAction':function(){
            return this.renderPartial('layout');
        },
        'sliderAction':function(){
            return this.renderPartial('slider');
        },
        'dragAction':function(){
            return this.renderPartial('drag');
        },
        'drag_1Action':function(){
            return this.renderPartial('drag_1');
        },
        'brokenLineAction':function(){
            return this.renderPartial('brokenLine');
        },
        'dropdownAction':function(){
            return this.renderPartial('dropdown');
        },
        'editTablesAction':function(){
            return this.renderPartial('editTables');
        },
        'popLayerAction':function(){
            return this.renderPartial('popLayer');
        },
        'sentence_detailAction':function(){
            return this.renderPartial('sentence_detail');
        },
        'template_deomAction':function(){
            return this.renderPartial('template_deom');
        },
        'tabAction':function(){
            return this.renderPartial('tab');
        },
        'rectAction':function(){
            return this.renderPartial('rect');
        },
        'cubeAction':function(){
            return this.renderPartial('cube');
        },



        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销DemoController对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    });

    return DemoController;
});


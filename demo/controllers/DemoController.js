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
    System.import(['/artTemplate/artTemplate'],System.PLUGINS);
    var DemoController = System.Controller.extend({
        constructor: function (init){
            this.base(init || {});
            __this__=this;
            this.viewpath = System.VIEWS+'/demo';

        },
        '_className':'DemoController',
        'layoutAction':function(){
            this.render('layout');
        },
        'sliderAction':function(){
            this.render('slider');
        },
        'dragAction':function(){
            this.render('drag');
        },
        'drag_1Action':function(){
            this.render('drag_1');
        },
        'brokenLineAction':function(){
            this.render('brokenLine');
        },
        'dropdownAction':function(){
            this.render('dropdown');
        },
        'editTablesAction':function(){
            this.render('editTables');
        },
        'popLayerAction':function(){
            this.render('popLayer');
        },
        'sentence_detailAction':function(){
            this.render('sentence_detail');
        },
        'template_deomAction':function(){
            this.render('template_deom');
        },
        'tabAction':function(){
            this.render('tab');
        },
        'shapeAction':function(){
            this.render('shape');
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


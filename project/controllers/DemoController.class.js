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
        'layoutAction':function(){
            return this.renderPartial('layout',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'布局demo',
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            },{
                file_404:System.ERROR_404,
                beforeSend:function(a,b){
                    // this.async=true;
                }
            });
        },
        'thumbnailAction':function(){
            return this.renderPartial('thumbnail',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'缩略图 适应不同的分辨率显示',
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            });
        },

        'popLayerAction':function(){
            return this.renderPartial('popLayer',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'弹出层',
                'D':{}

            });
        },
        'sliderAction':function(){
            return this.renderPartial('slider',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'背景半透明覆盖整个可视区域',
                'LAMJS':System.classPath,
                'D':{}

            });
        },
        'dragAction':function(){
            return this.renderPartial('drag',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'拖拽实例',
                'LAMJS':System.classPath,
                'D':{}

            });
        },
        'chessAction':function(){
            return this.renderPartial('chess',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'五子棋',
                'LAMJS':System.classPath,
                'D':{}

            });
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


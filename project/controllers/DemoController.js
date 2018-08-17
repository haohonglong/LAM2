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
    var views = System.VIEWS+'/demo';
    var DemoController = System.Controller.extend({
        constructor: function (init){
            this.base(init || {});
            __this__=this;

        },
        'layoutAction':function(){
            new System.Template().render(views+'/layout.html',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'布局demo',
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            },function(content){
                System.print(content);

            },{
                beforeSend:function(a,b){
                    // this.async=true;
                }
            });
        },
        'thumbnailAction':function(){
            new System.Template().render(views+'/thumbnail.html',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'缩略图 适应不同的分辨率显示',
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            },function(content){
                var render = template.compile(content);
                var html = render({
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                });
                System.print(html);

            });
        },

        'popLayerAction':function(){
            new System.Template().render(views+'/popLayer.html',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'弹出层',
                'D':{}

            },function(content){
                System.print(content);

            });
        },
        'sliderAction':function(){
            new System.Template().render(views+'/slider.html',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'背景半透明覆盖整个可视区域',
                'LAMJS':System.classPath,
                'D':{}

            },function(content){
                var render = template.compile(content);
                var html = render({
                    list: [
                        {"src":"http://img0.bdstatic.com/img/image/shouye/mingxing0923.jpg"}
                        ,{"src":"http://img0.bdstatic.com/img/image/shouye/chongwu0923.jpg"}
                        ,{"src":"http://img0.bdstatic.com/img/image/shouye/dongman0923.jpg"}
                        ,{"src":"http://img0.bdstatic.com/img/image/shouye/touxiang0923.jpg"}
                        ,{"src":"http://img0.bdstatic.com/img/image/shouye/xiaoqingxin0923.jpg"}
                        ,{"src":"http://img0.bdstatic.com/img/image/shouye/dongman0923.jpg"}
                    ]
                });
                System.print(html);
            });
        },
        'dragAction':function(){
            new System.Template().render(views+'/drag.html',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'拖拽实例',
                'LAMJS':System.classPath,
                'D':{}

            },function(content){
                System.print(content);


            });
        },
        'chessAction':function(){
            new System.Template().render(views+'/chess.html',{
                'VIEWS':System.VIEWS,
                'ROOT':System.ROOT,
                'title':'五子棋',
                'LAMJS':System.classPath,
                'D':{}

            },function(content){
                System.print(content);


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


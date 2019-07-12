(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
            typeof define === 'function' && define.amd ? define(factory(System)) :
                (System['RoomController'] = factory(System));
    }

})(this,function(System){
    'use strict';
    var __this__=null;
    System.is(System,'Controller','RoomController',System.classPath+'/base');
    var ROOT  = System.BACKEND;
    var views = System.VIEWS+'/room';
    var E = {file_404:System.ERROR_404};
    var RoomController = System.Controller.extend({
        constructor: function (init){
            this.base(init || {});
            __this__=this;
            this.viewpath = System.VIEWS+'/room';
            this.layoutPath = this.layoutPath+'/default';
            this.content = {
                'user':{
                    'name':'name',
                    'age':28
                }

            };


        },
        '_className':'RoomController',
        'listAction':function(){
            return this.render('list',{
                'VIEWS':System.VIEWS,
                'IMAGE':System.IMAGE,
                'ROOT':ROOT,
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            },E);
        },
        'detailAction':function(){
            return this.render('detail',{
                'VIEWS':System.VIEWS,
                'IMAGE':System.IMAGE,
                'ROOT':ROOT,
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            },E);
        },
        'releaseAction':function(){
            return this.render('release',{
                'VIEWS':System.VIEWS,
                'IMAGE':System.IMAGE,
                'ROOT':ROOT,
                'D':{
                    'title':'你好，世界！',
                    'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
                }

            },E);
        },



        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销RoomController对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    });
    return RoomController;
});



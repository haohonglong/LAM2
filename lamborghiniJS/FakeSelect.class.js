/**
 *----------------------------------
 * @author lhh
 * 产品介绍：
 * 创建日期：2015-1-15
 * 修改日期：2022-9-18
 * 名称：class FakeSelect 
 * 功能：伪下拉框
 * 说明：
 * 注意：
 * Example：
 *----------------------------------*/
(function(global,factory){
    'use strict';
    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];


    if(!System){
        return;
    }else{
        var FakeSelect = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = FakeSelect :
		typeof define === 'function' && define.amd ? define(FakeSelect) : System.FakeSelect = FakeSelect;
		System.export("lam.FakeSelect", FakeSelect);
    }

})(this,function(System){
    'use strict';
    System.is(System,'Dom','FakeSelect',System.classPath+'/base');
    var Dom = System.require("lam.base.Dom");
    System.import([
        '/Event.class'
    ],System.classPath+'/base');

    var __this__=null;
    var FakeSelect = Dom.extend({
        constructor: function (D) {
            this.base();
            __this__ = this;
            var defaults ={
                container:'[select="container"]',//控件的class
                input:'.[select="input"]',//用于提交表单的class
                txt:'[select="text"]',//diy_select用于显示当前选中内容的容器class
                btn:'[select="btn"]',//diy_select的打开按钮
                list:'[select="list"]',//要显示的下拉框内容列表class
                focus:'focus'//得到焦点时的class
            };
            D = System.isPlainObject(D) ? System.merge(D,[defaults]) : defaults;
            this.opt = D;
            this.o = System.Dom.$$(D.container,document,'div');//容器
            this.b = System.Dom.$$(D.btn);//按钮
            this.t = System.Dom.$$(D.txt);//显示
            this.l = System.Dom.$$(D.list);//列表容器
            this.ipt = System.Dom.$$(D.input);
            this.lengths = this.o.length;
            System.Event.bind(document,'click',function(){
                for(var i=0;i<self.lengths;i++){
                    self.l[i].style.display='none';
                }
            });
            this.showSelect();
        },
        '_className':'FakeSelect',
        showSelect:function(){
            var self=this;
            var iNow=0;
            for(var i=0;i<this.lengths;i++){
                this.l[i].index=this.b[i].index=this.t[i].index=i;
                this.t[i].onclick=this.b[i].onclick=function(ev){
                    var e=window.event || ev;
                    var index=this.index;
                    self.item=self.l[index].getElementsByTagName('li');

                    self.l[index].style.display= self.l[index].style.display=='block' ? 'none' :'block';
                    for(var j=0;j<self.lengths;j++){
                        if(j!=index){
                            self.l[j].style.display='none';
                        }
                    }
                    self.addClick(self.item);
                    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true); //阻止冒泡
                }
            }
        },
        addClick:function(o){
            if(o.length>0){
                var self=this;
                for(var i=0;i<o.length;i++){
                    o[i].onmouseover=function(){
                        self.addClass(this,self.opt.focus);
                    };
                    o[i].onmouseout=function(){
                        self.removeClass(this,self.opt.focus);
                    };
                    o[i].onclick=function(){
                        var index=this.parentNode.index;//获得列表
                        self.t[index].innerHTML=self.ipt[index].value=this.innerHTML.replace(/^\s+/,'').replace(/\s+&/,'');
                        self.l[index].style.display='none';
                    };
                }
            }
        },

        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销FakeSelect对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()
         * Example：
         */
        'destructor':function(){}
    });


    return FakeSelect;
});




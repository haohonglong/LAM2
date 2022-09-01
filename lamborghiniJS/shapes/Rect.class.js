/**
 * 矩形
 */
(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Html5']['Rect'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System.Html5,'Shape','Rect',System.classPath+'/base');

	var __this__=null;

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2015-9-18
     * 修改日期：2015-9-18
     * 名称： Rect
     * 功能：创建矩形
     * 说明：
     * 注意：
     * @param 	(Canvas)canvas         	  NO NULL :
     * @param 	(Object)position        NO NULL : 矩形的位置
     * @param 	(Object)size       		NO NULL : 矩形的尺寸
     * @param 	(String)D.strokeStyle   NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
     * @param 	(Boolean)fill          	NO NULL :  矩形是否填充
     * @returns {Shape}
     * Example：

     */
	var Rect = System.Html5.Shape.extend({
		constructor: function(canvas,D){
			__this__=this;
            var defaults={
                'position':{'x':20,'y':20},
                'size':{'w':200,'h':100},
                'strokeStyle':'#f60',
                'fill':false
            };
            this.D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
            this.canvas = canvas;
		},
		'_className':'Rect',
		'__constructor':function(){},
		'run':function () {
			var D = this.D;
			var canvas = this.canvas;
            var x = D.position.x;
            var y = D.position.y;
            var w = D.size.w;
            var h = D.size.h;
            if(D.fill){
                this.rect(D);
            }else{
                if(D.strokeStyle){
                    canvas.strokeStyle(D.strokeStyle);
                }
                canvas.strokeRect(x,y,w,h);
            }
            return this;
        },
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Rect对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	return Rect;
});



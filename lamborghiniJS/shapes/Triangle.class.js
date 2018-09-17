/**
 * 三角形
 */
(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		System['Html5']['Triangle'] = factory(System);
	}

})(this,function(System){
	'use strict';
	System.is(System.Html5,'Shape','Triangle',System.classPath+'/base');

	var __this__=null;

    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-9-17
     * 修改日期：2018-9-17
	 * 名称： triangle
     * 功能：绘制三角形
     * 说明：
     * 注意：最后要 canvas.closePath().stroke().fill();
     * @param 	(Canvas)canvas         	  NO NULL :
     * @param 	(Array)D.position         NO NULL : 位置[x0,y0,x1,y1,x2,y2]
     * @param 	(Number)D.width           NO NULL : 线的粗细
     * @param 	(String)D.strokeStyle     NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
     * @param 	(Function)D.callback      	 NULL :
     * @returns {Shape}
     * Example：

     */
	var Triangle = System.Html5.Canvas.extend({
		constructor: function(canvas,D){
			__this__=this;
            var defaults={
                'position':[200,100,100,200,300,200],
                'width':0,
                'strokeStyle':'#f60',
                'callback':function(canvas){
                    canvas.closePath().stroke().fill(this.strokeStyle);
                }
            };
            this.D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
            this.canvas = canvas;



		},
		'_className':'Triangle',
		'__constructor':function(){},
		'run':function () {
			var D = this.D;
			var canvas = this.canvas;
			var position = this.D.position;
            canvas.line(D).lineTo(position[4],position[5]);
            if(System.isFunction(D.callback)){
                D.callback(canvas);
            }
        },
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Triangle对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	return Triangle;
});



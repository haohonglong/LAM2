/**
 * 基本形
 */
(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Shape = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Shape :
		typeof define === 'function' && define.amd ? define(Shape) : System['Html5']['Shape'] = Shape;
		System.export("System.base.Shape", Shape);
	}

})(this,function(System){
	'use strict';
	System.is(System.Html5,'Canvas','Shape',System.classPath+'/base');
	var Canvas = System.require("System.base.Canvas");

	var __this__=null;

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.6.4
	 * 修改日期：2019.9.13
	 * 名称： Canvas
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param 	(DocumentElement)theCanvas             NO NULL : canvas dom节点
	 * @return (void)
	 * Example：

	 */
	var Shape = Canvas.extend({
		constructor: function(theCanvas,init){
			this.base(theCanvas,init);
			__this__=this;

		},
		'_className':'Shape',
		'__constructor':function(){},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： triangle
		 * 功能：绘制三角形
		 * 说明：
		 * 注意：最后要 closePath().stroke().fill();
		 * @param 	(Array)D.position         NO NULL : 位置[x0,y0,x1,y1,x2,y2]
		 * @param 	(Number)D.width           NO NULL : 线的粗细
		 * @param 	(String)D.strokeStyle     NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
		 * @param 	(Function)D.callback      	 NULL :
		 * @returns {Shape}
		 * Example：

		 */
		'triangle':function(D){
			var defaults={
				'position':[200,100,100,200,300,200],
				'width':0,
				'strokeStyle':'#f60',
				'callback':function(that){
					that.closePath().stroke().fill(this.strokeStyle);
				}
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

			this.line(D).lineTo(D.position[4],D.position[5]);
			if(System.isFunction(D.callback)){
				D.callback(this);
			}
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-24
		 * 修改日期：2015-9-24
		 * 名称： polygon
		 * 功能：绘制多边形
		 * 说明：
		 * 注意：最后要 closePath().stroke().fill();
		 * @param 	(Array)D.position         NO NULL : 位置
		 * @param 	(Number)D.width           NO NULL : 线的粗细
		 * @param 	(Number)D.n	              NO NULL : 边的个数
		 * @param 	(Number)D.r	              NO NULL : 半径
		 * @param 	(String)D.strokeStyle     NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
		 * @param 	(Function)D.callback      	 NULL : 再返回原始状态前关闭并填充
		 * @returns {Shape}
		 * Example：

		 */
		'polygon':function(D){
			var defaults={
				'position':{'x':60,'y':70},
				'width':0,
				'n':6,
				'r':60,
				'strokeStyle':'#f60',
				'callback':function(that){
					that.closePath().stroke().fill(this.strokeStyle);
				}
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			var x 	= D.position.x;
			var y 	= D.position.y;
			var r 	= D.r;
			var n 	= D.n;
			var width 	= D.width;



			var i,ang;
			ang = Math.PI*2/n;  //旋转的角度

			this.save().lineWidth(width);//设置线宽
			this.translate(x, y);//原点移到x,y处，即要画的多边形中心
			this.moveTo(0, -r);//据中心r距离处画点
			this.beginPath();
			for(i = 0;i < n; i ++)
			{
				this.rotate(ang);//旋转
				this.lineTo(0, -r);//据中心r距离处连线
			}

			if(System.isFunction(D.callback)){
				D.callback(this);
			}
			this.restore();//返回原始状态


			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： rect
		 * 功能：创建矩形
		 * 说明：
		 * 注意：
		 * @param 	(Object)position        NO NULL : 矩形的位置
		 * @param 	(Object)size       		NO NULL : 矩形的尺寸
		 * @param 	(String)D.strokeStyle   NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
		 * @param 	(Boolean)fill          	NO NULL :  矩形是否填充
		 * @returns {Shape}
		 * Example：

		 */
		'rect':function(D){
			var defaults={
				'position':{'x':20,'y':20},
				'size':{'w':200,'h':100},
				'strokeStyle':'#f60',
				'fill':false
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

			var x = D.position.x;
			var y = D.position.y;
			var w = D.size.w;
			var h = D.size.h;
			if(D.fill){
				this.ctx.rect(x,y,w,h);

			}else{
				if(D.strokeStyle){
					this.strokeStyle(D.strokeStyle);
				}
				this.ctx.strokeRect(x,y,w,h);
			}
			return this;

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-9-5
		 * 修改日期：2017-9-5
		 * 名称： rect
		 * 功能：创建圆角矩形
		 * 说明：
		 * 注意：
		 * @param 	(Object)D.position        NO NULL : 矩形的位置
		 * @param 	(Object)D.size       		NO NULL : 矩形的尺寸
		 * @param 	(Number)D.radius   NO NULL :  圆角弧度
		 * @param 	(Boolean)D.stroke         NO NULL :  是否描绘轮廓线
		 * @param 	(Boolean)D.fill          	NO NULL :  矩形是否填充
		 * @returns {Shape}
		 */
		'roundRect':function(D){
			var defaults={
				'position':{'x':50,'y':50},
				'size':{'w':150,'h':150},
				'radius':5,
				'stroke':true,
				'fill':true
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			var x = parseFloat(D.position.x),
				y = parseFloat(D.position.y),
				width  = parseFloat(D.size.w),
				height = parseFloat(D.size.h),
				radius = parseFloat(D.radius),
				stroke = D.stroke,
				fill = D.fill;
			if(
				!System.isNumber(radius) ||
				!System.isNumber(x) ||
				!System.isNumber(y) ||
				!System.isNumber(width) ||
				!System.isNumber(height)

			){
				throw new Error(["Warning :参数",System.printErrorInfoOfObject(D),"里面属性数据类型错误！！！"].join(''));
				return this;
			}
			this.beginPath()
				.moveTo(x + radius, y)
				.lineTo(x + width - radius, y)
				.quadraticCurveTo(x + width, y, x + width, y + radius)
				.lineTo(x + width, y + height - radius)
				.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height)
				.lineTo(x + radius, y + height)
				.quadraticCurveTo(x, y + height, x, y + height - radius)
				.lineTo(x, y + radius)
				.quadraticCurveTo(x, y, x + radius, y)
				.closePath();
			if (stroke) {this.stroke();}
			if (fill) {this.fill();}
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： arc
		 * 功能：创建圆形
		 * 说明：
		 * 注意：
		 * @param 	(Number)D.position.x    			NO NULL : 圆的中心的 x 坐标。
		 * @param 	(Number)D.position.y    			NO NULL : 圆的中心的 y 坐标。
		 * @param 	(Number)D.r	    	    			NO NULL : 圆的半径。
		 * @param 	(Number)D.sAngle	    			NO NULL : 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
		 * @param 	(Number)D.eAngle	    			NO NULL : 结束角，以弧度计。
		 * @param 	(Boolean)D.counterclockwise	           NULL : 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
		 * @returns {Shape}
		 * Example：

		 */
		'arc':function(D){
			var defaults={
				'position':{'x':100,'y':75},
				'r':50,
				'sAngle':0,
				'eAngle':2*Math.PI,
				'counterclockwise':true
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

			var x = D.position.x;
			var y = D.position.y;
			var r = D.r;
			var sAngle = D.sAngle;
			var eAngle = D.eAngle;

			this.beginPath().ctx.arc(x,y,r,sAngle,eAngle,D.counterclockwise);



			return this;

		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-9-6
		 * 修改日期：2017-9-6
		 * 名称： fivestar
		 * 功能：五角星
		 * 说明：
		 * 注意：
		 * @param 	(Number)D.position.x    			NO NULL : 五角星的 x 坐标。
		 * @param 	(Number)D.position.y    			NO NULL : 五角星的 y 坐标。
		 * @param 	(Number)D.R	    	    			NO NULL : 大圆的半径。
		 * @param 	(Number)D.r	    	    			NO NULL : 小圆的半径。
		 * @param 	(Number)D.rot	    	    		NO NULL : 旋转角度。
		 * @returns {Shape}
		 */
		'fivestar':function(D){
			var defaults={
				'position':{'x':200,'y':200},
				'R':200,
				'r':80,
				'rot':0
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			var x = D.position.x,
				y = D.position.y,
				R = D.R,
				r = D.r,
				rot = D.rot;
			this.beginPath();
			//设置是个顶点的坐标，根据顶点制定路径
			for (var i = 0; i < 5; i++) {
				this
					.lineTo(Math.cos((18+i*72-rot)/180*Math.PI)*R+x,-Math.sin((18+i*72-rot)/180*Math.PI)*R+y)
					.lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x,-Math.sin((54+i*72-rot)/180*Math.PI)*r+y);
			}
			this.closePath();
			//设置边框样式以及填充颜色
			//	.lineWidth(3)
			//	.fillStyle("#F6F152")
			//	.strokeStyle("#F5270B")
			//	.fill()
			//	.stroke();
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： sector
		 * 功能：创建扇形
		 * 说明：
		 * 注意：最后要闭合路径和填充;画饼状图层次关系:最后画的在最上面,最先画的在最下面
		 * @param 	(Number)D.position.x    		NO NULL : 圆的中心的 x 坐标。
		 * @param 	(Number)D.position.y    		NO NULL : 圆的中心的 y 坐标。
		 * @param 	(Number)D.r	    	    		NO NULL : 圆的半径。
		 * @param 	(Number)D.sAngle	    		NO NULL : 起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
		 * @param 	(Number)D.eAngle	    		NO NULL : 结束角，以弧度计。
		 * @param 	(Boolean)D.counterclockwise	       NULL : 可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
		 * @returns {Shape}
		 * Example：

		 */
		'sector':function(D){
			var deg = Math.PI/180;
			var defaults={
				'position':{'x':100,'y':75},
				'r':50,
				'sAngle':0,
				'eAngle':90,
				'counterclockwise':false
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;


			var x = D.position.x;
			var y = D.position.y;
			var r = D.r;
			var sAngle = D.sAngle*deg;
			var eAngle = D.eAngle*deg;

			this.save().beginPath();
			// 位移到圆心，方便绘制
			this.ctx.translate(x,y);
			// 移动到圆心
			this.moveTo(0,0);
			// 绘制圆弧
			this.ctx.arc(0,0,r,sAngle,eAngle,D.counterclockwise);

			this.restore();//弹出堆最上面保存的绘图状态

			return this;

		},



		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Shape对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	return Shape;
});



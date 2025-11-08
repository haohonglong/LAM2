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
		System.export("lam.base.Shape", Shape);
	}

})(this,function(System){
	'use strict';
	System.is(System.Html5,'Canvas','Shape',System.classPath+'/base');
	var Canvas = System.require("lam.base.Canvas");

	var __this__=null;

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.6.4
	 * 修改日期：2025.11.2
	 * 名称： Shape
	 * 功能：基本图形绘制类
	 * 说明：扩展Canvas类，提供各种基本图形的绘制功能
	 * 注意：
	 * @param 	(DocumentElement)theCanvas             NO NULL : canvas dom节点
	 * @param 	(Object)init             			   	  NULL : 初始化参数
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
		 * 名称： roundRect
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

		// ========== 新增方法开始 ==========

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2025.11.2
		 * 修改日期：2025.11.2
		 * 名称： ellipse
		 * 功能：绘制椭圆
		 * 说明：
		 * 注意：
		 * @param 	(Number)x         NO NULL : 椭圆中心x坐标
		 * @param 	(Number)y         NO NULL : 椭圆中心y坐标
		 * @param 	(Number)radiusX   NO NULL : 椭圆x轴半径
		 * @param 	(Number)radiusY   NO NULL : 椭圆y轴半径
		 * @param 	(Number)rotation  NO NULL : 椭圆旋转角度（弧度）
		 * @param 	(Number)startAngle NO NULL : 起始角度
		 * @param 	(Number)endAngle  NO NULL : 结束角度
		 * @param 	(Boolean)anticlockwise NULL : 是否逆时针
		 * @param 	(String)fillStyle    NULL : 填充颜色
		 * @param 	(String)strokeStyle  NULL : 描边颜色
		 * @returns {Shape}
		 * Example：

		 */
		'ellipse': function(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, fillStyle, strokeStyle) {
			this.beginPath();
			this.ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
			
			if (fillStyle) {
				this.fillStyle(fillStyle).fill();
			}
			if (strokeStyle) {
				this.strokeStyle(strokeStyle).stroke();
			}
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2025.11.2
		 * 修改日期：2025.11.2
		 * 名称： arrow
		 * 功能：绘制箭头
		 * 说明：
		 * 注意：
		 * @param 	(Number)fromX     NO NULL : 起始点x坐标
		 * @param 	(Number)fromY     NO NULL : 起始点y坐标
		 * @param 	(Number)toX       NO NULL : 结束点x坐标
		 * @param 	(Number)toY       NO NULL : 结束点y坐标
		 * @param 	(Number)headLen   NO NULL : 箭头长度
		 * @param 	(Number)angle     NO NULL : 箭头角度
		 * @param 	(String)color     NO NULL : 箭头颜色
		 * @returns {Shape}
		 * Example：

		 */
		'arrow': function(fromX, fromY, toX, toY, headLen, angle, color) {
			var dx = toX - fromX;
			var dy = toY - fromY;
			var length = Math.sqrt(dx * dx + dy * dy);
			var unitDx = dx / length;
			var unitDy = dy / length;
			
			// 计算箭头两个点的位置
			var arrowX1 = toX - headLen * Math.cos(angle) * unitDx + headLen * Math.sin(angle) * unitDy;
			var arrowY1 = toY - headLen * Math.cos(angle) * unitDy - headLen * Math.sin(angle) * unitDx;
			var arrowX2 = toX - headLen * Math.cos(angle) * unitDx - headLen * Math.sin(angle) * unitDy;
			var arrowY2 = toY - headLen * Math.cos(angle) * unitDy + headLen * Math.sin(angle) * unitDx;
			
			this.strokeStyle(color)
				.lineWidth(2)
				.beginPath()
				.moveTo(fromX, fromY)
				.lineTo(toX, toY)
				.moveTo(toX, toY)
				.lineTo(arrowX1, arrowY1)
				.moveTo(toX, toY)
				.lineTo(arrowX2, arrowY2)
				.stroke();
			
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2025.11.2
		 * 修改日期：2025.11.2
		 * 名称： heart
		 * 功能：绘制心形
		 * 说明：
		 * 注意：
		 * @param 	(Number)x         NO NULL : 心形中心x坐标
		 * @param 	(Number)y         NO NULL : 心形中心y坐标
		 * @param 	(Number)size      NO NULL : 心形大小
		 * @param 	(String)fillStyle    NULL : 填充颜色
		 * @param 	(String)strokeStyle  NULL : 描边颜色
		 * @returns {Shape}
		 * Example：

		 */
		'heart': function(x, y, size, fillStyle, strokeStyle) {
			this.beginPath();
			for (var i = 0; i < Math.PI * 2; i += 0.01) {
				var px = x + size * 16 * Math.pow(Math.sin(i), 3);
				var py = y - size * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
				if (i === 0) {
					this.moveTo(px, py);
				} else {
					this.lineTo(px, py);
				}
			}
			this.closePath();
			
			if (fillStyle) {
				this.fillStyle(fillStyle).fill();
			}
			if (strokeStyle) {
				this.strokeStyle(strokeStyle).stroke();
			}
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2025.11.2
		 * 修改日期：2025.11.2
		 * 名称： grid
		 * 功能：绘制网格
		 * 说明：
		 * 注意：
		 * @param 	(Number)spacing   NO NULL : 网格间距
		 * @param 	(String)color     NO NULL : 网格颜色
		 * @returns {Shape}
		 * Example：

		 */
		'grid': function(spacing, color) {
			var width = this.getWidth();
			var height = this.getHeight();
			
			this.strokeStyle(color || '#e0e0e0')
				.lineWidth(0.5);
			
			// 绘制垂直线
			for (var x = 0; x <= width; x += spacing) {
				this.beginPath()
					.moveTo(x, 0)
					.lineTo(x, height)
					.stroke();
			}
			
			// 绘制水平线
			for (var y = 0; y <= height; y += spacing) {
				this.beginPath()
					.moveTo(0, y)
					.lineTo(width, y)
					.stroke();
			}
			
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2025.11.2
		 * 修改日期：2025.11.2
		 * 名称： coordinateSystem
		 * 功能：绘制坐标系
		 * 说明：
		 * 注意：
		 * @param 	(Number)originX   NO NULL : 原点x坐标
		 * @param 	(Number)originY   NO NULL : 原点y坐标
		 * @param 	(Number)scale     NO NULL : 缩放比例
		 * @returns {Shape}
		 * Example：

		 */
		'coordinateSystem': function(originX, originY, scale) {
			var width = this.getWidth();
			var height = this.getHeight();
			
			// 绘制坐标轴
			this.strokeStyle('#333')
				.lineWidth(2)
				.beginPath()
				.moveTo(0, originY)
				.lineTo(width, originY)
				.moveTo(originX, 0)
				.lineTo(originX, height)
				.stroke();
			
			// 绘制刻度
			this.strokeStyle('#666')
				.lineWidth(1)
				.font('12px Arial')
				.fillStyle('#333');
			
			// x轴刻度
			for (var x = originX + scale; x < width; x += scale) {
				this.beginPath()
					.moveTo(x, originY - 5)
					.lineTo(x, originY + 5)
					.stroke()
					.fillText(((x - originX) / scale).toString(), x - 5, originY + 20);
			}
			for (var x = originX - scale; x > 0; x -= scale) {
				this.beginPath()
					.moveTo(x, originY - 5)
					.lineTo(x, originY + 5)
					.stroke()
					.fillText(((x - originX) / scale).toString(), x - 5, originY + 20);
			}
			
			// y轴刻度
			for (var y = originY + scale; y < height; y += scale) {
				this.beginPath()
					.moveTo(originX - 5, y)
					.lineTo(originX + 5, y)
					.stroke()
					.fillText(((originY - y) / scale).toString(), originX + 10, y + 5);
			}
			for (var y = originY - scale; y > 0; y -= scale) {
				this.beginPath()
					.moveTo(originX - 5, y)
					.lineTo(originX + 5, y)
					.stroke()
					.fillText(((originY - y) / scale).toString(), originX + 10, y + 5);
			}
			
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2025.11.2
		 * 修改日期：2025.11.2
		 * 名称： dashedLine
		 * 功能：绘制虚线
		 * 说明：
		 * 注意：
		 * @param 	(Number)fromX     NO NULL : 起始点x坐标
		 * @param 	(Number)fromY     NO NULL : 起始点y坐标
		 * @param 	(Number)toX       NO NULL : 结束点x坐标
		 * @param 	(Number)toY       NO NULL : 结束点y坐标
		 * @param 	(Array)pattern    NO NULL : 虚线模式
		 * @param 	(String)color     NO NULL : 虚线颜色
		 * @returns {Shape}
		 * Example：

		 */
		'dashedLine': function(fromX, fromY, toX, toY, pattern, color) {
			this.strokeStyle(color)
				.lineWidth(1);
			
			// 设置虚线模式
			if (this.ctx.setLineDash) {
				this.ctx.setLineDash(pattern || [5, 5]);
			}
			
			this.beginPath()
				.moveTo(fromX, fromY)
				.lineTo(toX, toY)
				.stroke();
			
			// 恢复实线
			if (this.ctx.setLineDash) {
				this.ctx.setLineDash([]);
			}
			
			return this;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2025.11.2
		 * 名称：destructor
		 * 功能：在注销Shape对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){
			this.base();
		}
	});

	return Shape;
});
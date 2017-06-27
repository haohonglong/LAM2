

window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is('System.Browser','System.Html5.Canvas');

	var __this__=null;

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-9-18
	 * 修改日期：2015-9-18
	 * 名称： create
	 * 功能：创建画布
	 * 说明：
	 * 注意：
	 * @param 	(String)Init.type     NULL :
	 * @return (Canvas)
	 * Example：

	 */
	function create(Init){
		var type = Init.type || '2d';
		this.ctx = this.theCanvas.getContext(type);
		return this;
	}


	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.6.4
	 * 修改日期：2015.9.22
	 * 名称： Canvas
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param 	(DocumentElement)theCanvas             NO NULL : canvas dom节点
	 * @param 	(Object)Init             			   	  NULL : 初始化参数
	 * @return (void)
	 * Example：

	 */
	var Canvas = System.Browser.extend({
		constructor: function(theCanvas,Init){
			__this__=this;
			/*--------------------------------------------------------------------------------------------------*/
			Init = Init || {};
			this.team = [];
			this.ctx;
			this.theCanvas = theCanvas;
			create.call(this,{
				'type':Init.type
			});

		},
		'_className':'Canvas',
		'__constructor':function(){},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： beginPath
		 * 功能：开始一个路径
		 * 说明：
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'beginPath':function(){
			this.ctx.beginPath();
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： closePath
		 * 功能：关闭路径
		 * 说明：
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'closePath':function(){
			this.ctx.closePath();
			return this;
		},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： moveTo
		 * 功能：把路径移动到画布中的指定点，不创建线条
		 * 说明：请使用 stroke() 方法在画布上绘制确切的路径。
		 * 注意：
		 * @param 	(Number)x         NO NULL :路径的目标位置的 x 坐标
		 * @param 	(Number)y         NO NULL :路径的目标位置的 y 坐标
		 * @return (Object)
		 * Example：

		 */
		'moveTo':function(x,y){
			this.ctx.moveTo(x,y);
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： lineTo
		 * 功能：添加一个新点，然后创建从该点到画布中最后指定点的线条（该方法并不会创建线条）
		 * 说明：请使用 stroke() 方法在画布上绘制确切的路径。
		 * 注意：
		 * @param 	(Number)x         NO NULL :路径的目标位置的 x 坐标
		 * @param 	(Number)y         NO NULL :路径的目标位置的 y 坐标
		 * @return (Object)
		 * Example：

		 */
		'lineTo':function(x,y){
			this.ctx.lineTo(x,y);
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： translate
		 * 功能：重新映射画布上的 (0,0) 位置
		 * 说明：原点移到x,y处
		 * 注意：
		 * @param 	(Number)x         NO NULL :添加到水平坐标（x）上的值
		 * @param 	(Number)y         NO NULL :添加到垂直坐标（y）上的值
		 * @return (Object)
		 * Example：

		 */
		'translate':function(x,y){
			this.ctx.translate(x, y);
			return this;
		},



		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： lineWidth
		 * 功能：定义线的宽度
		 * 说明：
		 * 注意：
		 * @param 	(Number)width         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'lineWidth':function(width){
			this.ctx.lineWidth = width;
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： lineCap
		 * 功能：定义上下文中线的端点
		 * 说明：
		 * 注意：
		 * @param 	(String)lineCap         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'lineCap':function(lineCap){
			this.ctx.lineCap = lineCap;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： lineJoin
		 * 功能：定义两条线相交产生的拐角，可将其称为连接
		 * 说明：
		 * 注意：
		 * @param 	(String)lineJoin         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'lineJoin':function(lineJoin){
			this.ctx.lineJoin = lineJoin;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： quadraticCurveTo
		 * 功能：通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。
		 * 说明：二次贝塞尔曲线需要两个点。第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。
		 * 注意：它有一个控制点，而不是两个
		 * @param 	(Number)cpx          NO NULL :贝塞尔控制点的 x 坐标
		 * @param 	(Number)cpy          NO NULL :贝塞尔控制点的 y 坐标
		 * @param 	(Number)x	         NO NULL :结束点的 x 坐标
		 * @param 	(Number)y   	     NO NULL :结束点的 y 坐标
		 * @return (Object)
		 * Example：

		 */
		'quadraticCurveTo':function(cpx,cpy,x,y){
			this.ctx.quadraticCurveTo(cpx,cpy,x,y);
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： bezierCurveTo
		 * 功能：通过使用表示三次贝塞尔曲线的指定控制点，向当前路径添加一个点
		 * 说明：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点
		 * 注意：它有两个控制点，而不是一个。
		 * @param 	(Number)cp1x          NO NULL :第一个贝塞尔控制点的 x 坐标
		 * @param 	(Number)cp1y          NO NULL :第一个贝塞尔控制点的 y 坐标
		 * @param 	(Number)cp2x          NO NULL :第二个贝塞尔控制点的 x 坐标
		 * @param 	(Number)cp2y          NO NULL :第二个贝塞尔控制点的 y 坐标
		 * @param 	(Number)x	          NO NULL :结束点的 x 坐标
		 * @param 	(Number)y   	      NO NULL :结束点的 y 坐标
		 * @return (Object)
		 * Example：

		 */
		'bezierCurveTo':function(cp1x,cp1y,cp2x,cp2y,x,y){
			this.ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： clip
		 * 功能：从原始画布中剪切任意形状和尺寸。
		 * 说明：一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。您也可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'clip':function(){
			this.ctx.clip();
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-10-10
		 * 名称： clearRect
		 * 功能：清空给定矩形内的指定像素。
		 * 说明：
		 * 注意：
		 * @param 	(Number)x        		NO NULL : 要清除的矩形左上角的 x 坐标
		 * @param 	(Number)y        		NO NULL : 要清除的矩形左上角的 y 坐标
		 * @param 	(Number)w	            NO NULL : 要清除的矩形的宽度，以像素计
		 * @param 	(Number)h   	        NO NULL : 要清除的矩形的高度，以像素计
		 * @return (Object)
		 * Example：

		 */
		'clearRect':function(x,y,w,h){
			this.ctx.clearRect(x,y,w,h);
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： globalAlpha
		 * 功能：属性设置或返回绘图的当前透明值（alpha 或 transparency）。
		 * 说明：
		 * 注意：
		 * @param 	(Number)n        			NO NULL : 透明值。必须介于 0.0（完全透明） 与 1.0（不透明） 之间。
		 * @return (Object)
		 * Example：

		 */
		'globalAlpha':function(n){
			this.ctx.globalAlpha = n;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： globalCompositeOperation
		 * 功能：设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
		 * 说明：
		 * 注意：
		 * @param 	(String)s        			NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'globalCompositeOperation':function(s){
			this.ctx.globalCompositeOperation = s;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： transform
		 * 功能：transform() 方法的行为相对于由 rotate(), scale(), translate(), or transform() 完成的其他变换。例如：如果您已经将绘图设置为放到两倍，则 transform() 方法会把绘图放大两倍，您的绘图最终将放大四倍。
		 * 说明：transform() 允许您缩放、旋转、移动并倾斜当前的环境。
		 * 注意：该变换只会影响 transform() 方法调用之后的绘图
		 * @param 	(Number)a        			NO NULL :水平缩放绘图
		 * @param 	(Number)b        			NO NULL :水平倾斜绘图
		 * @param 	(Number)c        			NO NULL :垂直倾斜绘图
		 * @param 	(Number)d        			NO NULL :垂直缩放绘图
		 * @param 	(Number)e        			NO NULL :水平移动绘图
		 * @param 	(Number)f        			NO NULL :垂直移动绘图
		 * @return (Object)
		 * Example：

		 */
		'transform':function(a,b,c,d,e,f){
			this.ctx.transform(a,b,c,d,e,f);
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： setTransform
		 * 功能：把当前的变换矩阵重置为单位矩阵，然后以相同的参数运行 transform()。
		 * 说明：setTransform() 允许您缩放、旋转、移动并倾斜当前的环境。该变换只会影响 setTransform() 方法调用之后的绘图
		 * 注意：它不会相对于其他变换来发生行为
		 * @param 	(Number)a        			NO NULL :水平旋转绘图
		 * @param 	(Number)b        			NO NULL :水平倾斜绘图
		 * @param 	(Number)c        			NO NULL :垂直倾斜绘图
		 * @param 	(Number)d        			NO NULL :垂直缩放绘图
		 * @param 	(Number)e        			NO NULL :水平移动绘图
		 * @param 	(Number)f        			NO NULL :垂直移动绘图
		 * @return (Object)
		 * Example：

		 */
		'setTransform':function(a,b,c,d,e,f){
			this.ctx.setTransform(a,b,c,d,e,f);
			return this;
		},





		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： font
		 * 功能：定义文字的大小及字体
		 * 说明：
		 * 注意：
		 * @param 	(String)font         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'font':function(font){
			this.ctx.font = font;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： textAlign
		 * 功能：定义文字水平对齐方式
		 * 说明：
		 * 注意：
		 * @param 	(String)textAlign         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'textAlign':function(textAlign){
			this.ctx.textAlign = textAlign;
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： textBaseline
		 * 功能：定义文字垂直对齐方式
		 * 说明：
		 * 注意：
		 * @param 	(String)textBaseline         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'textBaseline':function(textBaseline){
			this.ctx.textBaseline = textBaseline;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： fillStyle
		 * 功能：定义文字的颜色
		 * 说明：
		 * 注意：
		 * @param 	(String)fillStyle         NO NULL :
		 * @return (Object)
		 * Example：

		 */
		'fillStyle':function(fillStyle){
			this.ctx.fillStyle = fillStyle;
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： fillText
		 * 功能：在画布上绘制“被填充的”文本
		 * 说明：
		 * 注意：
		 * @param 	(String)text         NO NULL :规定在画布上输出的文本。
		 * @param 	(Number)x         	 NO NULL :开始绘制文本的 x 坐标位置（相对于画布）
		 * @param 	(Number)y         	 NO NULL :开始绘制文本的 y 坐标位置（相对于画布）。
		 * @param 	(Number)maxWidth   	 NO NULL :可选。允许的最大文本宽度，以像素计。
		 * @return (Object)
		 * Example：

		 */
		'fillText':function(text,x,y,maxWidth){
			if(maxWidth){
				this.ctx.fillText(text,x,y,maxWidth);
			}else{
				this.ctx.fillText(text,x,y);
			}

			return this;
		},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： rotate
		 * 功能：旋转
		 * 说明：
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'rotate':function(ang){
			this.ctx.rotate(ang);//旋转
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： stroke
		 * 功能：将最终完成、画出构建的路径
		 * 说明：方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'stroke':function(){
			this.ctx.stroke();
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： strokeStyle
		 * 功能：设置或返回用于笔触的颜色、渐变或模式。
		 * 说明：stroke()方法一定要在这个方法后面调用否则没有作用
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'strokeStyle':function(style){
			if(style){
				this.ctx.strokeStyle = style;
			}

			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-18
		 * 修改日期：2015-9-18
		 * 名称： fill
		 * 功能：填充
		 * 说明：
		 * 注意：
		 * @param 	(String)color    			NO NULL : 填充的颜色
		 * @return (Object)
		 * Example：

		 */
		'fill':function(color){
			if(color){
				this.fillStyle(color);
			}
			this.ctx.fill();
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-4-16
		 * 修改日期：2016-4-16
		 * 名称： createRadialGradient
		 * 功能：设置渐变渐变
		 * 说明：
		 * 注意：
		 * @param 	(Object)D    			NO NULL :
		 * @param 	(Number)D.params.x0   	NO NULL : 渐变的开始圆的 x 坐标
		 * @param 	(Number)D.params.y0    	NO NULL : 渐变的开始圆的 y 坐标
		 * @param 	(Number)D.params.r0	    NO NULL : 开始圆的半径
		 * @param 	(Number)D.params.x1	    NO NULL : 渐变的结束圆的 x 坐标
		 * @param 	(Number)D.params.y1	    NO NULL : 渐变的结束圆的 y 坐标
		 * @param 	(Number)D.params.r1	    NO NULL : 结束圆的半径
		 * @param 	(Number)D.colors[i].stop  NO NULL : gradient 对象中的位置
		 * @param 	(Number)D.colors[i].color NO NULL : gradient 对象中的颜色
		 * @return (Object)gradient 对象
		 * Example：

		 */
		'createRadialGradient':function(D){
			var defaults={
				'params':{
					'x0':100,
					'y0':75,
					'r0':10,
					'x1':200,
					'y1':75,
					'r1':10

				},
				//这里可以设置多个渐变色
				'colors':[
					{'stop':0,'color':'#fff'},
					{'stop':1,'color':'#000'}
				]
			};
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

			var x0 = D.params.x0;
			var y0 = D.params.y0;
			var r0 = D.params.r0;
			var x1 = D.params.x1;
			var y1 = D.params.y1;
			var r1 = D.params.r1;

			var grd = this.ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
			D.colors.each(function(){
				grd.addColorStop(this.stop,this.color);
			});

			return grd;

		},




		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-10
		 * 修改日期：2015-10-10
		 * 名称： save
		 * 功能：保送（推送）当前状态到堆栈
		 * 说明：在绘图状态堆上保存当前绘图状态
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'save':function(){
			this.ctx.save();
			return this;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-24
		 * 修改日期：2015-9-24
		 * 名称： restore
		 * 功能：调用最后存储的堆栈恢复画布
		 * 说明：返回原始状态
		 * 注意：
		 * @return (Object)
		 * Example：

		 */
		'restore':function(){
			this.ctx.restore();
			return this;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Canvas对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	System.Html5.Canvas=Canvas;

});

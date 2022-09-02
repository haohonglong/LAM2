(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Canvas = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Canvas :
		typeof define === 'function' && define.amd ? define(factory) : System.Html5.Canvas = Canvas;
		System.export("System.base.Canvas", Canvas);
	}

})(this,function(System){
	'use strict';
	System.import(['/Browser.class'],System.classPath+'/base');
	System.is('System.Browser','System.Html5.Canvas');
	var Browser = System.require("System.base.Browser");
	var __this__=null;
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.6.4
	 * 修改日期：2022.3.9
	 * 名称： Canvas
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param 	(DocumentElement)theCanvas             NO NULL : canvas dom节点
	 * @param 	(Object)D             			   	  NULL : 初始化参数
	 * @return (void)
	 * Example：

	 */
	var Canvas = Browser.extend({
		constructor: function(theCanvas,D){
			this.base();
			__this__=this;
			var defaults ={
				"type":"2d"
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			this.team = [];
			this.theCanvas = theCanvas;
			this.type = D.type;
			this.ctx = this.theCanvas.getContext(this.type);

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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
         * 创建日期：2015-9-18
         * 修改日期：2015-9-18
         * 名称： line
         * 功能：画线
         * 说明：
         * 注意：别忘了最后要stroke
         * @param 	(Array)D.position         NO NULL : 线的位置
         * @param 	(Number)D.width           NO NULL : 线的粗细
         * @param 	(String)D.strokeStyle     NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
         * @param 	(String)D.lineCap         NO NULL : 定义上下文中线的端点
         * @returns {Canvas}
         * Example：

         */
        'line':function(D){
            var defaults={
                'position':[20,0,100,0],
                'width':1,
                'strokeStyle':'#f60',
                'lineCap':'square'
            };
            D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
            var width = D.width || 0;
            var strokeStyle = D.strokeStyle;

            this.strokeStyle(strokeStyle).lineWidth(width).lineCap(D.lineCap).beginPath().moveTo(D.position[0],D.position[1]).lineTo(D.position[2],D.position[3]);

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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * 修改日期：2022-3-9
		 * 名称： clearRect
		 * 功能：清空给定矩形内的指定像素。
		 * 说明：
		 * 注意：
		 * @param 	(Number)x        		NO NULL : 要清除的矩形左上角的 x 坐标
		 * @param 	(Number)y        		NO NULL : 要清除的矩形左上角的 y 坐标
		 * @param 	(Number)w	            NO NULL : 要清除的矩形的宽度，以像素计
		 * @param 	(Number)h   	        NO NULL : 要清除的矩形的高度，以像素计
		 * @returns {Canvas}
		 * Example：

		 */
		'clearRect':function(x,y,w,h){
			this.ctx.clearRect(x || 0 ,y || 0 ,w || this.getWidth() ,h || this.getHeight());
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2022-3-9
		 * 修改日期：2022-3-9
		 * 名称： getWidth
		 * 功能：获取画布width
		 * 说明：
		 * 注意：
		 * @returns {Number}
		 * Example：

		 */
		'getWidth':function(){
			return this.theCanvas.width;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2022-3-9
		 * 修改日期：2022-3-9
		 * 名称： getHeight
		 * 功能：获取画布height
		 * 说明：
		 * 注意：
		 * @returns {Number}
		 * Example：

		 */
		'getHeight':function(){
			return this.theCanvas.height;
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
		 * Example：

		 */
		'transform':function(a,b,c,d,e,f){
			this.ctx.transform(a,b,c,d,e,f);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-9-5
		 * 修改日期：2017-9-5
		 * 名称： scale
		 * 功能：方法缩放当前绘图，更大或更小
		 * 说明：
		 * 注意：
		 * @param 	(Number)scalewidth        			NO NULL :缩放当前绘图的宽度 (1=100%, 0.5=50%, 2=200%, 依次类推)
		 * @param 	(Number)scaleheight        			NO NULL :缩放当前绘图的高度 (1=100%, 0.5=50%, 2=200%, etc.)
		 * @returns {Canvas}
		 */
		'scale':function(scalewidth,scaleheight){
			this.ctx.scale(scalewidth,scaleheight);
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
         * 创建日期：2015-9-18
         * 修改日期：2015-9-18
         * 名称： text
         * 功能：创建文字
         * 说明：
         * 注意：渲染文字以后再定义属性是不起作用的
         * @param 	(String)D.text   				NO NULL : 文字内容
         * @param 	(Number)D.position.x    		NO NULL :  x 坐标位置。
         * @param 	(Number)D.position.y    		NO NULL :  y 坐标位置。
         * @param 	(String)D.align   				NO NULL : 文字水平对齐方式
         * @param 	(String)D.valign   				NO NULL : 文字垂直对齐方式
         * @param 	(String)D.font   				NO NULL : 文字的大小及字体
         * @param 	(String)D.style   				NO NULL : 文字的颜色
         * @param 	(Boolean)D.isRender   			   NULL : 是否渲染文字
         * @returns {Canvas}
         * Example：

         */
        'text':function(D){//

            var defaults={
                'text':'text',
                'position':{'x':100,'y':75},
                'align':'center',
                'valign':'top',
                'isRender':true,
                'font':'40px Arial',
                'style':'#f00'

            };
            D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

            var x= D.position.x;
            var y= D.position.y;
            var metrics,textWidth,textHeight;

            this.font(D.font).textAlign(D.align).textBaseline(D.valign).fillStyle(D.style);
            if(D.isRender){
                this.fillText(D.text,x,y);
            }


            metrics = this.ctx.measureText(D.text);
            textWidth = metrics.width;

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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
		 * Example：

		 */
		'strokeStyle':function(style){
			if(style){
				this.ctx.strokeStyle = style;
			}

			return this;
		},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2018-9-18
         * 修改日期：2018-9-18
         * 名称： strokeStyle
         * 功能：设置或返回用于笔触的颜色、渐变或模式。
         * 说明：stroke()方法一定要在这个方法后面调用否则没有作用
         * 注意：
         * @param x		NO NULL 矩形左上角的 x 坐标
         * @param y		NO NULL 矩形左上角的 y 坐标
         * @param w		NO NULL 矩形的宽度，以像素计
         * @param h		NO NULL 矩形的高度，以像素计
         * @returns {Canvas}
         */
		'strokeRect':function (x,y,w,h) {
            this.ctx.strokeRect(x,y,w,h);
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
		 * @returns {Canvas}
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
		 * @returns {CanvasGradient}
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
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

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
		 * @returns {Canvas}
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
		 * @returns {Canvas}
		 * Example：

		 */
		'restore':function(){
			this.ctx.restore();
			return this;
		},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2018-9-14
         * 修改日期：2018-9-14
         * 名称： fillRect
         * 功能：在坐标为x,y处画一个矩形
         * 说明：
         * 注意：
         * @param x{int}		矩形左上角的 x 坐标
         * @param y{int}		矩形左上角的 y 坐标
         * @param width{int}	矩形的宽度，以像素计
         * @param height{int}	矩形的高度，以像素计
         * @returns {Canvas}
         */
		'fillRect':function (x, y, width, height) {
            this.ctx.fillRect(x, y, width, height);
            return this;
        },
        /**
         *
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-9-18
         * 修改日期：2016-4-16
         * 名称： image
         * 功能：在画布上绘制图像、画布或视频
         * 说明：
         * 注意：在callback里 执行drawImage 有异常报:"Illegal invocation" 错误
         * @param 	(String)src             NO NULL : 规定要使用的图像、画布或视频 的路径
         * @param 	(Number)D.position.x    NO NULL : 在画布上放置图像的 x 坐标位置
         * @param 	(Number)D.position.y    NO NULL : 在画布上放置图像的 y 坐标位置
         * @param 	(Number)D.size.w	       NULL : 可选。要使用的图像的宽度。（伸展或缩小图像）
         * @param 	(Number)D.size.h	       NULL : 可选。要使用的图像的高度。（伸展或缩小图像）
         * @param 	(Number)D.clip.sx          NULL : 可选。开始剪切的 x 坐标位置。
         * @param 	(Number)D.clip.sy          NULL : 可选。开始剪切的 y 坐标位置。
         * @param 	(Number)D.clip.sw          NULL : 可选。被剪切图像的宽度
         * @param 	(Number)D.clip.sh          NULL : 可选。被剪切图像的高度
         * @param 	(Function)callback         NULL : drawImage 原型
         * @returns {Canvas}
         * Example：

         */
        'image':function(D){
            var defaults={
                'src':'',
                'position':{'x':10,'y':10},
                'size':{'w':540,'h':258},
                'clip':{'sx':90,'sy':130,'sw':90,'sh':80}
            };
            D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

            var self=this;
            var src = D.src;
            var x 	= D.position.x;
            var y 	= D.position.y;
            if(D.size){
                var w 	= D.size.w;
                var h 	= D.size.h;
            }
            if(D.clip){
                var sx = D.clip.sx;
                var sy = D.clip.sy;
                var sw = D.clip.sw;
                var sh = D.clip.sh;
            }

            var callback = D.callback;
            var img=new Image();
            img.src=src;
            img.onload=function(){
                if(D.clip){
                    self.ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
                }else{
                    if(D.size){
                        self.ctx.drawImage(img,x,y,w,h);
                    }else{
                        self.ctx.drawImage(img,x,y);
                    }

                }

                if(System.isFunction(callback)){
                    callback.call(this,self.ctx.drawImage);
                }
            };
            //$(img).load(function(){});

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

	return Canvas;
});



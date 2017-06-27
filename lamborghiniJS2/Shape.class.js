
//基本形
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System.Html5,'Canvas','Shape');

	var __this__=null;


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
	 * @return (void)
	 * Example：

	 */
	var Shape = System.Html5.Canvas.extend({
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
		 * 名称： line
		 * 功能：画线
		 * 说明：
		 * 注意：别忘了最后要stroke
		 * @param 	(Array)D.position         NO NULL : 线的位置
		 * @param 	(Number)D.width           NO NULL : 线的粗细
		 * @param 	(String)D.strokeStyle     NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
		 * @param 	(String)D.lineCap         NO NULL : 定义上下文中线的端点
		 * @return (Object)
		 * Example：

		 */
		'line':function(D){
			var defaults={
				'position':[20,0,100,0],
				'width':1,
				'strokeStyle':'#f60',
				'lineCap':'square'
			};
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			var width = D.width || 0;
			var strokeStyle = D.strokeStyle;

			this.strokeStyle(strokeStyle).lineWidth(width).lineCap(D.lineCap).beginPath().moveTo(D.position[0],D.position[1]).lineTo(D.position[2],D.position[3]);

			return this;
		},

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
		 * @return (Object)
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
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

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
		 * @return (Object)
		 * Example：

		 */
		'polygon':function(D){
			var defaults={
				'position':{'x':300,'y':100},
				'width':0,
				'n':6,
				'r':50,
				'strokeStyle':'#f60',
				'callback':function(that){
					that.closePath().stroke().fill(this.strokeStyle);
				}
			};
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
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
		 * @return (Object)
		 * Example：

		 */
		'image':function(D){
			var defaults={
				'src':'',
				'position':{'x':10,'y':10},
				'size':{'w':540,'h':258},
				'clip':{'sx':90,'sy':130,'sw':90,'sh':80}
			};
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

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
		 * @return (Object)
		 * Example：

		 */
		'rect':function(D){
			var defaults={
				'position':{'x':20,'y':20},
				'size':{'w':200,'h':100},
				'strokeStyle':'#f60',
				'fill':false
			};
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

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
		 * @return (Object)
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
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

			var x = D.position.x;
			var y = D.position.y;
			var r = D.r;
			var sAngle = D.sAngle;
			var eAngle = D.eAngle;

			this.beginPath().ctx.arc(x,y,r,sAngle,eAngle,D.counterclockwise);



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
		 * @return (Object)
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
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;


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
		 * @return (Object)
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
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

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

	System['Html5']['Shape'] = Shape;

});

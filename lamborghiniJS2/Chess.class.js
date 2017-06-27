/**
 * 棋盘
 */
window[GRN_LHH].run([window],function(window,undefined){
	var System=this;
	System.is(System.Html5,'Shape','Chess');
	var __this__=null;
	//棋盘行列数
	var num = 15;
	//棋盘与画布的间距
	var pading = 15;
	//棋盘格子的宽高
	var w = 30;
	var chessBoard=[];
	//赢法数组
	var wins=[];

	var Chess = System.Html5.Shape.extend({
		constructor: function(dom,n){
			this.base(dom);
			__this__=this;
			num = n || 15;
			this.aLength = (num-1)*w;

			dom.width = dom.height = this.aLength+pading*2;
			this.init();

		},
		'_className':'Chess',
		'__constructor':function(){},
		'init':function(){
			chessBoard=[];
			wins=[];
			for(var i=0;i<num;i++){
				chessBoard[i] = [];
				for(var j=0;j<num;j++){
					chessBoard[i][j] = 0;
				}
			}


			for(var i=0;i<num;i++){
				wins[i] = [];
				for(var j=0;j<num;j++){
					wins[i][j] = [];
				}
			}

			var count = 0;
			for(var i=0;i<num;i++){
				for(var j=0;j<11;j++){
					for(var k=0;k<5;k++){
						wins[i][j+k][count] = true;
					}
					count++;
				}
			}

		},
		'click':function(){
			var self = this;
			var color =true;
			var flag =true;
			$(this.theCanvas).on('click',function(event){
				var event = $.event.fix(event);
				var x = event.offsetX;
				var y = event.offsetY;
				var i = Math.floor(x/30);
				var j = Math.floor(y/30);

				if(0 === chessBoard[i][j]){
					self.chess(i,j,color);
					if(color){
						chessBoard[i][j] = 1;
					}else{
						chessBoard[i][j] = 2;
					}
				}
				color = !color;
			});

			return this;
		},
		/**
		 * 绘制棋盘(15*15)
		 * @param color 棋盘线的颜色
		 * @returns {Chess}
		 */
		'draw':function(color){
			color = color || '#bfbfbf';
			for(var i=0;i<num;i++){
				this
					.strokeStyle(color)
					.moveTo(pading + i*30, pading)
					.lineTo(pading + i*30, this.aLength+pading)
					.stroke()
					.moveTo(pading,  pading + i*30)
					.lineTo(this.aLength+pading, pading + i*30)
					.stroke();
			}
			return this;
		},
		/**
		 *生成棋子
		 * @param (int)i
		 * @param (int)j
		 * @param (Blooean)color
		 * @returns {Chess}
		 */
		'chess':function(i,j,color,D){
			var defaults={
				'position':{
					'x':pading+ i*30,
					'y':pading +j*30
				}
			};

			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			D.r = 13;
			var G ={
				'params':{
					'x0':pading + i*30 +2,
					'y0':pading + j*30 -2,
					'r0':13,
					'x1':pading + i*30 +2,
					'y1':pading + j*30 -2,
					'r1':0
				},
				'colors':[]
			};
			if(color){
				G.colors.push({'stop':0,'color':'#0A0A0A'});
				G.colors.push({'stop':1,'color':'#636766'});
			}else{
				G.colors.push({'stop':0,'color':'#D1D1D1'});
				G.colors.push({'stop':1,'color':'#F9F9F9'});
			}

			this
				.arc(D)
				.closePath()
				.fillStyle(this.createRadialGradient(G))
				.fill();

			return this;
		},
		/**
		 * 添加水印要有个等待时间，如果放在水印的上面要等待水印加载完成后调用别的，
		 * @param img
		 * @param callback
		 * @returns {*|Object}
		 */
		'add_watermark':function(img,callback){
			var self=this;
			var D={
				'src':img,
				'position':{'x':0,'y':0},
				'size':{
					'w':self.theCanvas.width,
					'h':self.theCanvas.width
				},
				'clip':null
			};
			D.callback=function(){
				callback();
			};
			this.image(D);

			return this;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Chess对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});


	System['Html5']['Chess'] = Chess;

});


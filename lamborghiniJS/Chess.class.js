/**
 * 棋盘
 */
(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Chess = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Chess :
		typeof define === 'function' && define.amd ? define(Chess) : System['Html5']['Chess'] = Chess;
		System.export("lam.Chess", Chess);
	}

})(this,function(System){
	'use strict';
	System.is(System.Html5,'Shape','Chess',System.classPath+'/base');
	var Shape = System.require("lam.base.Shape");
	var __this__=null;
	
	//棋盘与画布的间距
	var pading = 15;
	//棋盘格子的宽高
	var w = 30;
	var color =true;
	var chessBoard=[];
	//赢法数组
	var wins=[];
	var haswin = false;

	var Chess = Shape.extend({
		constructor: function(dom, row, col){
			this.base(dom);
			__this__=this;
			this.row = Number(row) || 15;
			this.col = Number(col) || 15;
			w = this.row *2;
			this.w_length = (this.row-1)*w;
			this.h_length = (this.col-1)*w;
			
			if(this.row > 15) {
				dom.width = this.w_length+pading*2;
			}

			if(this.col > 15) {
				dom.height = this.h_length+pading*2;
			}
			this.init();

		},
		'_className':'Chess',
		'__constructor':function(){},
		'init':function(){
			chessBoard=[];
			wins=[];
			for(var i=0;i<this.row;i++){
				chessBoard[i] = [];
				for(var j=0;j<this.col;j++){
					chessBoard[i][j] = 0;
				}
			}


			for(var i=0;i<this.row;i++){
				wins[i] = [];
				for(var j=0;j<this.col;j++){
					wins[i][j] = [];
				}
			}

			// var count = 0;
			// for(var i=0;i<this.row;i++){
			// 	for(var j=0;j<11;j++){
			// 		for(var k=0;k<5;k++){
			// 			wins[i][j+k][count] = true;
			// 		}
			// 		count++;
			// 	}
			// }

		},
		'check':function(color){
			for(var i =0; i < this.row; i++) {
				for(var j = 0; j < this.col; j++){
					if(color){
						if(
							(
								1 == chessBoard[0][0]
								&& i+1 < this.row && 1 == chessBoard[i+1][j]
								&& i+2 < this.row && 1 == chessBoard[i+2][j]
								&& i+3 < this.row && 1 == chessBoard[i+3][j]
								&& i+4 < this.row && 1 == chessBoard[i+4][j]
								)
								|| (
										 i+1 < this.row && 1 == chessBoard[i+1][j]
									&& i+2 < this.row && 1 == chessBoard[i+2][j]
									&& i+3 < this.row && 1 == chessBoard[i+3][j]
									&& i+4 < this.row && 1 == chessBoard[i+4][j]
									&& i+5 < this.row && 1 == chessBoard[i+5][j]
									)

								|| (
									1 == chessBoard[0][0]
									&& j+1 < this.col && 1 == chessBoard[i][j+1]
									&& j+2 < this.col && 1 == chessBoard[i][j+2]
									&& j+3 < this.col && 1 == chessBoard[i][j+3]
									&& j+4 < this.col && 1 == chessBoard[i][j+4]
									)
								
								|| (
											 j+1 < this.col && 1 == chessBoard[i][j+1]
										&& j+2 < this.col && 1 == chessBoard[i][j+2]
										&& j+3 < this.col && 1 == chessBoard[i][j+3]
										&& j+4 < this.col && 1 == chessBoard[i][j+4]
										&& j+5 < this.col && 1 == chessBoard[i][j+5]
										)
							){
								alert("黑发获胜");
								console.log(chessBoard)
								haswin = true;
								return true;
							}
						// console.log(i+1);
						return;
						// console.log('back',i, j, chessBoard[i+1][j]);
						
					}else{

						// console.log('white',i, j);
					}
				}
			}
		},
		'run':function(i, j){
			if(0 === chessBoard[i][j]){
				this.chess(i,j,color);
				if(color){
					chessBoard[i][j] = 1;
				}else{
					chessBoard[i][j] = 2;
				}
				this.check(color);
				color = !color;
			} else {
				alert("当前格子已经有棋子了");
				return false;
			}
			return true;
		},
		'coupter':function(){
			var row = 0, col = 0;
			
			while(1) {
				row = Math.floor(Math.random()*this.row);
				col = Math.floor(Math.random()*this.col);
				if(0 == chessBoard[row][col]) {
					break;
				}
			}
			this.run(row, col);
			
		},
		'click':function(){
			var self = this;
			
			var flag =true;
			$(this.theCanvas).on('click',function(event){
				var event = $.event.fix(event);
				var x = event.offsetX;
				var y = event.offsetY;
				var i = Math.floor(x/w);
				var j = Math.floor(y/w);
				if(!haswin){
					if(self.run(i, j) && !haswin){
						self.coupter();
					}
				} else {
					alert("棋局已结束了")
				}
				
			});

			return this;
		},
		/**
		 * 绘制棋盘(15*15)
		 * @param color 棋盘线的颜色
		 * @returns {Chess}
		 */
		'draw':function(color){
			color = color || '#fff';
			for(var i=0;i<this.row;i++){
				this
					.moveTo(pading + i*w, pading)
					.lineTo(pading + i*w, this.w_length+pading)
					.strokeStyle(color)
					.stroke()

					.moveTo(pading,  pading + i*w)
					.lineTo(this.h_length+pading, pading + i*w)
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
					'x':pading+ i*w,
					'y':pading +j*w
				}
			};

			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			D.r = 13;
			var G ={
				'params':{
					'x0':pading + i*w +2,
					'y0':pading + j*w -2,
					'r0':13,
					'x1':pading + i*w +2,
					'y1':pading + j*w -2,
					'r1':0
				},
				'colors':[]
			};
			if(color){
				// 黑棋
				G.colors.push({'stop':0,'color':'#0A0A0A'});
				G.colors.push({'stop':1,'color':'#636766'});
			}else{
				// 白棋
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


	return Chess;
});



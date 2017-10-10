
window[GRN_LHH].run([window,jQuery],function(window,$,undefined){
	'use strict';
	var System=this;

	System.is(System,'Layout','Slider');
	var __this__=null;
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2015-10-26
	 * 名称：
	 * 功能：自动轮播，next，pre,可以跳转到指定的位置
	 * 说明：
	 * 注意：position 必须添 top 或 left ;
	 * @params   (Object)init 			NO NULL :初始化参数
	 *
	 * 			(jQuery)$pre    	   						:NULL
	 * 			(jQuery)$next    	   						:NULL
	 * 			(jQuery)$autoHandler   						:NO NULL	触发停止自动轮播的节点
	 * 			(jQuery)$ul   								:NO NULL	包裹图片的移动层
	 * 			(jQuery)$li									:NO NULL	移动的图片
	 * 			(String)unit :'px | % | em [|...]',	  		:NO NULL	单位
	 * 			(jQuery)$view		      				   	:NO NULL	视图区显示的范围层
	 * 			(Number)vcount		      				   	:NO NULL	视图区限制显示多少张图片
	 * 			(Number)count		      				   	:NO NULL	总共多少张图片
	 * 			(Number)moveNumber		      				:NULL		一次移动多少个图片 默认为1
	 * 			(Number)margin		      				   	:NULL		每个图片的额外加入的间距
	 * 			(Number)current		      					:NULL		默认或当前图片的在第几张
	 * 			(String)position		    			   	:NO NULL
	 * 			(Function)autoMove	        	   			:NULL		触发停止自动轮播的方法
	 * 			(int)	move_time	            			:NULL		幻灯播放动画时间
	 * 			(int)	time		            			:NULL		自动轮播间隔时间
	 * 			(Boolean)event		            			:NULL  		防止回调中定义的事件被重复定义
	 * 			(Boolean)loop		            			:NULL  		循环轮播默认循环状态(true)
	 * 			(Boolean)response	            			:NULL  		是否是自适应的,默认false
	 * 			(Function)callback_event		            :NO NULL	有事件时调用这个方法
	 * 			(Function)callback_resoult		            :NO NULL	自定义选择用什么方式运动
	 * 			(Function)befor_fn		      				:NULL		resize之前
	 * 			(Function)after_fn		      				:NULL		resize之后
	 *  Example：


	 */
	var Slider = System.Layout.extend({
		constructor: function(D) {
			__this__ = this;
			var defaults={
				'$view':$('.slider'),
				'$ul':$('.imgWrap'),
				'$li':$('.img'),
				'$pre':$('#slidePre'),
				'$next':$('#slideNext'),
				'$autoHandler':$('.autoHandler'),
				'count':$('.img').length,
				'position':'left',
				'unit':'px',
				'autoMove':function(that,$autoHandler){
					$autoHandler = $autoHandler || that.$autoHandler;
					$autoHandler.hover(function(){
						that.stop();
					},function(){
						that.begin();
					});
				},
				'callback_event':function(){
					var __this__ =this;
					if(this.event) {
						this['$next']['on']('click', function () {
							__this__.next();
						});

						this['$pre']['on']('click', function () {
							__this__.pre();


						});

					}


				},
				'callback_resoult':function(len,p){},
				'befor_fn':null,
				'after_fn':null,
				'margin':0,
				'vcount':1,
				'moveNumber':1,
				'event':true,
				'move_time':450,
				'time':2000,
				'loop':true,
				'current':0,
				'response':false
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			this.base(init);

			this.timer  			= null;
			this.$autoHandler  		= init.$autoHandler;
			this.$next 				= init.$next;
			this.$pre  				= init.$pre;
			this.vcount  			= init.vcount;
			this.margin  			= init.margin;
			this.moveNumber  		= init.moveNumber;
			this.count  			= init.count;
			this.current  			= init.current;
			this.move_time  		= init.move_time;
			this.time  				= init.time;
			this.response  			= init.response  || null;
			this.event  			= init.event;
			this.loop  				= init.loop;
			this.autoMove			= init.autoMove;
			this.callback_resoult	= init.callback_resoult;
			this.callback_event	    = init.callback_event;
			this.Sport  			= null;


			//check
			this.moveNumber = System.isNumber(this.moveNumber) ? this.moveNumber < 1 ? 1 : this.moveNumber : 1;
			this.margin = this.margin*(this.vcount-1);
		},
		'_className':'Slider',

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-22
		 * 修改日期：2015-10-22
		 * 名称：getViewWidth
		 * 功能：获取视图区显示的范围层的宽度
		 * 说明：
		 * 注意：
		 * @return  (Number)
		 * Example：
		 */
		'getViewWidth':function(){
			return this.$view.outerWidth();

		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-22
		 * 修改日期：2015-10-22
		 * 名称：getViewHeight
		 * 功能：获取视图区显示的范围层的高度度
		 * 说明：
		 * 注意：
		 * @return  (Number)
		 * Example：
		 */
		'getViewHeight':function(){
			return this.$view.outerHeight();

		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getLiWidth
		 * 功能：获取单个图片宽度
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number)
		 * Example：
		 */
		'getLiWidth':function(){
			return this.$li.eq(0).outerWidth(true);
		},


		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getLiHeight
		 * 功能：获取单个图片高度
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number)
		 * Example：
		 */
		'getLiHeight':function(){
			return this.$li.eq(0).outerHeight(true);
		},


		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getUlWidth
		 * 功能：获取包裹图片的移动层的宽度
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number | Object)
		 * Example：
		 */
		'getUlWidth':function(){
			if(this.$ul) {
				return this.$ul.outerWidth();
			}
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getUlHeight
		 * 功能：获取包裹图片的移动层的高度
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number | Object)
		 * Example：
		 */
		'getUlHeight':function(){
			if(this.$ul) {
				return this.$ul.outerHeight();
			}
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：move
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param(Number)size				NO NULL : 移动的尺寸
		 * @param(Boolean)notAnimate 		   NULL : 是否有动画效果默认有动画效果
		 * @param(String)position 		   	NO NULL : 移动的位置
		 * @return  (Slider)
		 * Example：
		 */
		'move':function(size,notAnimate,position){
			var unit 	 = this.unit;
			var response = this.response  || false;
			var time 	 = this.move_time || 450;
			size*=-1;
			notAnimate = notAnimate || false;
			position = position || this.position;
			if(response){

			}else{
				switch(position){
					case 'left':
					case 'top':
						var P={};
						P[position]  = size+unit;
						P['opacity'] = 'show';
						if(this.Sport && !notAnimate){
							if(System.Sport && this.Sport instanceof System.Sport){
								this.Sport.animate(this.$ul[0],P,unit,time);

							}else{
								this.$ul.stop();
								this.$ul.animate(P,time);
								//if(!this.$ul.is(':animated')) {}

							}

						}else{
							this.$ul.css(P);
						}
						break;
					default:
						throw new Error("错误!只能传('left' | 'top' ) 其中之一");
				}

			}

			if(this.callback_resoult && System.isFunction(this.callback_resoult)) {
				this.callback_resoult.apply(this,[size,position]);
			}

			return this;


		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getMoveNumber
		 * 功能：获取图片移动时绝对定位值
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number)
		 * Example：
		 */
		'getMoveNumber':function(){
			return this.$ul.offset()[this.position];
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：rool
		 * 功能：无缝滚动播放
		 * 说明：
		 * 注意：
		 * @param:
		 * @return (Slider)
		 * Example：
		 */
		'rool':function(){

			return this;
		},


		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：resize
		 * 功能：重新计算各图片的尺寸并根据移动前与移动后的差值跳转移动的位置
		 * 说明：
		 * 注意：
		 * @param:
		 * @return (Slider)
		 * Example：
		 */
		'resize':function(){
			if(this.befor_fn && System.isFunction(this.befor_fn)){
				this.befor_fn.apply(this,[]);
			}

			switch(this.position){
				case 'left':
					this.setAllLiWidth( (this.$view.width()  - this.margin) /this.vcount).setUlWidth();
					break;
				case 'top':
					this.setAllLiHeight((this.$view.height() - this.margin) /this.vcount).setUlHeight();
					break;
				default:
					throw new Error("错误!只能传('left' | 'top' ) 其中之一");
					return this;
			}
			this.stop().invoke(this.current,true);
			if(this.after_fn && System.isFunction(this.after_fn)){
				this.after_fn.apply(this,[]);
			}
			return this;

		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：invoke
		 * 功能：跳转到幻灯第几个位置
		 * 说明：
		 * 注意：
		 * @param(Number)n 					NO NULL : 跳转的步数
		 * @param(Boolean)notAnimate 		   NULL : 是否有动画效果默认有动画效果
		 * @return (Slider)
		 * Example：
		 */
		'invoke':function(n,notAnimate){
			if(!this.isOverFlow()){ return this;}
			if (n < 0 || this.isLast(n)) {
				return this;
			}

			switch(this.position){
				case 'left':
					this.move(this.getLiWidth()  * n,notAnimate);
					break;
				case 'top':
					this.move(this.getLiHeight() * n,notAnimate);
					break;
				default:
					return this;
					throw new Error("错误!只能传('left' | 'top' ) 其中之一");
			}
			this.current = n;
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：jumpBegin
		 * 功能：跳到第一张
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'jumpBegin':function(){
			this.invoke(0);
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：jumpLast
		 * 功能：跳到最后一张
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'jumpLast':function(){
			this.invoke(this.count-this.vcount);
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：isLast
		 * 功能：是否时最后一张
		 * 说明：
		 * 注意：
		 * @return  (Boolean)
		 * Example：
		 */
		'isLast':function(n){
			n = n || this.current;
			return (n > this.count-this.vcount);
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：isOverFlow
		 * 功能：可视区域内是否显示了所有的图片，如果不是，幻灯可以移动。否则幻灯不能移动操作
		 * 说明：
		 * 注意：
		 * @return  (Boolean)
		 * Example：
		 */
		'isOverFlow':function(){
			return (this.count >= this.vcount);
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：next
		 * 功能：下一张幻灯
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'next':function(){
			if(!this.isOverFlow()){return this;}
			if (this.isLast(this.current+this.moveNumber)) {
				if (this.loop) {
					this.jumpBegin();
				}
			}else {
				this.invoke(this.current+this.moveNumber);
			}
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：pre
		 * 功能：上一张幻灯
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'pre':function(){
			if(!this.isOverFlow()){ return this;}

			if (this.current > 0) {
				this.invoke(this.current-this.moveNumber);
			} else {
				if (this.loop) {
					this.jumpLast();
				}
			}
			return this;

		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：auto
		 * 功能：自动播放的幻灯
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'auto':function(autoMove,time){
			var __this__=this;
			time = time || this.time || 5000;

			if(autoMove && System.isFunction(autoMove)){
				autoMove(this);
			}
			this.stop().timer=setInterval(function(){
				__this__.next();
			},time);
			return this;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-7-19
		 * 修改日期：2016-7-19
		 * 名称：setSport
		 * 功能：设置运动对象
		 * 说明：
		 * 注意：
		 *
		 * @param (Sport)Sport
		 * @returns {Slider}
		 */
		'setSport':function(Sport){
			this.Sport = Sport;
			return this;
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-7-19
		 * 修改日期：2016-7-19
		 * 名称：getSport
		 * 功能：获取运动对象
		 * 说明：
		 * 注意：
		 * @return (Sport)
		 * Example：
		 */
		'getSport':function(){
			return this.Sport;
		},



		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：begin
		 * 功能：开始自动播放的幻灯
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'begin':function(){
			this.auto(null);
			return this;
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：stop
		 * 功能：停止自动播放的幻灯
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'stop':function(){
			if(this.timer){
				clearInterval(this.timer);
			}
			return this;
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-9-29
		 * 修改日期：2015-9-29
		 * 名称：run
		 * 功能：运行幻灯程序
		 * 说明：
		 * 注意：
		 * @return (Slider)
		 * Example：
		 */
		'run':function(){
			this.resize();
			if(this.autoMove && System.isFunction(this.autoMove)){
				this.auto(this.autoMove);
			}

			if(this.callback_event && System.isFunction(this.callback_event)) {
				this.callback_event.call(this);
				//防止事件重复定义
				this.event = false;
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
		 * 功能：在注销Slider对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});

	System['Slider'] = Slider;

});


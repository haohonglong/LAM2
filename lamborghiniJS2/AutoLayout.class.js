
window[GRN_LHH].run([window,jQuery],function(window,$,undefined){
	'use strict';
	var System=this;

	System.is(System,'Layout','AutoLayout');
	var __this__=null;
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-25
	 * 修改日期：2015-10-26
	 * 名称：
	 * 功能：自适应布局
	 * 说明：
	 * 注意：position 必须添 top 或 left ;
	 * @params   (Object)init 			NO NULL :初始化参数
	 *
	 * 			(jQuery)$ul   								:NO NULL	ul
	 * 			(jQuery)$li									:NO NULL	li
	 * 			(String)unit :'px | % | em [|...]',	  		:NO NULL	单位
	 * 			(jQuery)$view		      				   	:NO NULL	视图区显示的范围层
	 * 			(Number)maxWidth		      				:NO NULL	最大的宽度
	 * 			(Number)maxHeight		      				:NO NULL	最大的高度
	 * 			(Number)minWidth		      				:NO NULL	最小的宽度
	 * 			(Number)minHeight		      				:NO NULL	最小的高度
	 * 			(Number)vcount		      				   	:NO NULL	视图区限制显示多少张图片
	 * 			(Number)count		      				   	:NO NULL	总共多少张图片
	 * 			(Number)number		      				   	:NULL		$view／vcount－number
	 * 			(Number)margin		      				   	:NULL		每个图片的额外加入的间距
	 * 			(Number)current		      					:NULL		默认或当前图片的在第几张
	 * 			(Function)befor_fn		      				:NULL		resize之前
	 * 			(Function)after_fn		      				:NULL		resize之后
	 * 			(String)position		    			   	:NO NULL
	 * 			(AutoLayout)parent		    			   	:NULL		关联的父包裹层
	 * 			(Drag)drag		    			   			:NULL		拖拽的类
	 *
	 *  Example：


	 */
	var AutoLayout = System.Layout.extend({
		constructor: function(D) {
			__this__ = this;
			var defaults={
				'$ul':null,
				'$view':null,
				'$li':null,
				'count':1,
				'vcount':1,
				'maxWidth':null,
				'maxHeight':null,
				'minWidth':0,
				'minHeight':0,
				'position':'left',
				'unit':'px',
				'margin':0,
				'befor_fn':null,
				'after_fn':null,
				'number':0
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			this.base(init);

			this.maxWidth  			= init.maxWidth;
			this.maxHeight  		= init.maxHeight;
			this.minWidth  			= init.minWidth  || 0;
			this.minHeight  		= init.minHeight || 0;
			//屏幕改变前后的差值
			this.changeValueWidth;
			this.changeValueHeight;

			this.parent = System.isObject(init.parent) ? init.parent : null;
			this.margin = this.margin*(this.vcount-1);
		},
		'_className':'AutoLayout',
		'__constructor':function(){},


		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-22
		 * 修改日期：2016-6-19
		 * 名称：setViewWidth
		 * 功能：范围的宽度
		 * 说明：
		 * 注意：
		 * @param(Number)width 		NULL : 屏幕宽
		 * @return (AutoLayout)
		 * Example：
		 */
		'setViewWidth':function(width){
			//如果有parent
			if(this.parent && this.parent instanceof AutoLayout){
				if(this.parent.$li){
					this.temps_w = this.width = this.parent.getLiWidth();
				}else{
					this.temps_w = this.width = this.parent.getViewWidth();
				}
			}else{
				width = width || $(window).width();
				this.changeValueWidth = width - this.width;
				this.temps_w = this.temps_w + this.changeValueWidth;
				this.width  = width;
			}

			if(this.temps_w > this.minWidth) {
				this.$view.width(this.temps_w);
			}
			return this;

		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-22
		 * 修改日期：2016-6-19
		 * 名称：setViewHeight
		 * 功能：范围的高度
		 * 说明：
		 * 注意：
		 * @param(Number)height 		NULL : 屏幕高
		 * @return (AutoLayout)
		 * Example：
		 */
		'setViewHeight':function(height){
			if(this.parent && this.parent instanceof AutoLayout){
				if(this.parent.$li){
					this.temps_h = this.height = this.parent.getLiHeight();
				}else{
					this.temps_h = this.height = this.parent.getViewHeight();
				}
			}else{
				height = height || $(window).height();
				this.changeValueHeight = height - this.height;
				this.temps_h = this.temps_h + this.changeValueHeight;
				this.height = height;
			}

			if(this.temps_h > this.minHeight) {
				this.$view.height(this.temps_h);
			}
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
		 * @return (AutoLayout)
		 * Example：
		 */
		'resize':function(){

			if(this.befor_fn && System.isFunction(this.befor_fn)){
				this.befor_fn.apply(this,[]);
			}
			switch(this.position){
				case 'all':
					this.setViewHeight().setAllLiHeight((this.getViewHeight() - this.margin) /this.vcount).setUlHeight();
				case 'left':
					this.setViewWidth().setAllLiWidth( (this.getViewWidth()  - this.margin) /this.vcount).setUlWidth();
					break;
				case 'top':
					this.setViewHeight().setAllLiHeight((this.getViewHeight() - this.margin) /this.vcount).setUlHeight();
					break;

				default:
					throw new Error("参数不合法");
					return this;


			}
			if(this.after_fn && System.isFunction(this.after_fn)){
				this.after_fn.apply(this,[]);
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
		 * 功能：运行程序
		 * 说明：
		 * 注意：
		 * @return  (AutoLayout)
		 * Example：
		 */
		'run':function(){
			this.resize();
			return this;
		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销AutoLayout对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}

	});

	System['AutoLayout'] = AutoLayout;

});


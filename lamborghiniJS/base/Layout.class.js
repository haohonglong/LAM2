(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Layout'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Html','Layout',System.classPath+'/base');

	var __this__=null;
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-25
	 * 修改日期：2015-10-26
	 * 名称：
	 * 功能：布局
	 * 说明：抽象类
	 * 注意：position 必须添 top 或 left ;
	 * @params   (Object)init 			NO NULL :初始化参数
	 *
	 * 			(jQuery)$ul   								:NO NULL	ul
	 * 			(jQuery)$li									:NO NULL	li
	 * 			(String)unit :'px | % | em [|...]',	  		:NO NULL	单位
	 * 			(jQuery)$view		      				   	:NO NULL	视图区显示的范围层
	 * 			(Number)vcount		      				   	:NO NULL	视图区限制显示多少张图片
	 * 			(Number)count		      				   	:NO NULL	总共多少张图片
	 * 			(Number)number		      				   	:NULL		$view／vcount－number
	 * 			(Number)margin		      				   	:NULL		每个图片的额外加入的间距
	 * 			(Number)current		      					:NULL		默认或当前图片的在第几张
	 * 			(Function)befor_fn		      				:NULL		resize之前
	 * 			(Function)after_fn		      				:NULL		resize之后
	 * 			(String)position		    			   	:NO NULL
	 * 			(Layout)parent		    			   		:NULL		关联的父包裹层
	 * 			(Drag)drag		    			   			:NULL		拖拽的类
	 *
	 *  Example：


	 */
	var Layout = System.Html.extend({
		constructor: function(D) {
			this.base();
			__this__ = this;
			var defaults={
				'$ul':null,
				'$view':null,
				'$li':null,
				'count':1,
				'vcount':1,
				'position':'left',
				'unit':'px',
				'margin':0,
				'befor_fn':null,
				'after_fn':null,
				'number':0
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;


			this.init = init;
			this.$view  			= init.$view;
			this.$ul  				= init.$ul;
			this.$li  				= init.$li;
			this.$liw  				= 0;
			this.$lih  				= 0;
			this.unit  				= init.unit;
			this.margin  			= init.margin || 0;
			this.number  			= init.number;
			this.vcount  			= init.vcount;
			this.count  			= this.vcount;
			this.position  			= init.position  || null;
			this.befor_fn  			= init.befor_fn;
			this.after_fn  			= init.after_fn;
			this.width  			= $(window).width();
			this.height  			= $(window).height();
			this.temps_w			= this.$view.width();
			this.temps_h			= this.$view.height();
			//需要拖拽的
			this.Drag;

			this.parent = null;

			//check
			this.vcount = System.isNumber(this.vcount) ? this.vcount < 1 ? 1 : this.vcount : 1;
			this.margin = this.margin*(this.vcount-1);
		},
		'_className':'Layout',
		'__constructor':function(){},

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
			return this.$view.width();

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
			return this.$view.height();

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
			if(!this.$li) return 0;
			return this.$li.eq(0).width();
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
			if(!this.$li) return 0;
			return this.$li.eq(0).height();
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getAllLiWidth
		 * 功能：获取所以图片宽度之和
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number)
		 * Example：
		 */
		'getAllLiWidth':function(){
			if(!this.$li) return 0;
			return this.getLiWidth()*this.count;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：getAllLiHeight
		 * 功能：获取所以图片高度之和
		 * 说明：
		 * 注意：
		 * @param:
		 * @return  (Number)
		 * Example：
		 */
		'getAllLiHeight':function(){
			if(!this.$li) return 0;
			return this.getLiHeight()*this.count;
		},


		'setAllLiWidth':function(width){
			if(!this.$li) return this;
			this.$liw =  Math.ceil(width);
			this.$li.css({width: this.$liw + this.unit});
			return this;
		},
		'setAllLiHeight':function(height){
			if(!this.$li) return this;
			this.$lih = Math.ceil(height);
			this.$li.css({height: this.$lih + this.unit});
			return this;
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
			if(!this.$ul) return this;
			return this.$ul.width();
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
			if(!this.$ul) return this;
			return this.$ul.h();
			return this;
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：setUlWidth
		 * 功能：设置包裹图片的移动层的宽度
		 * 说明：
		 * 注意：
		 * @param:
		 * @return (Layout)
		 * Example：
		 */
		'setUlWidth':function(){
			if(!this.$ul || !this.$li) return this;
			this.$ul.css({width: this.getAllLiWidth() + this.unit});
			return this;
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：setUlHeight
		 * 功能：设置包裹图片的移动层的高度
		 * 说明：
		 * 注意：
		 * @param:
		 * @return (Layout)
		 * Example：
		 */
		'setUlHeight':function(){
			if(!this.$ul || !this.$li) return this;
			this.$ul.css({height: this.getAllLiHeight() + this.unit});
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
		 * @return (Layout)
		 * Example：
		 */
		'resize':function(){},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-15
		 * 修改日期：2015-10-15
		 * 名称：drag
		 * 功能：拖拽滑动
		 * 说明：
		 * 注意：
		 * @param(Object)Drag 	NO NULL : 拖拽的实例化对象
		 * @return (Layout)
		 * Example：
		 */
		'drag':function(Drag){},
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
		 * @return  (Layout)
		 * Example：
		 */
		'run':function(){},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Layout对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});


	return Layout;
});


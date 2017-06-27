
window[GRN_LHH].run([window,jQuery],function(window,$,undefined){
	'use strict';
	var System=this;

	System.is(System,'Layout','Thumbnail');
	var __this__=null;
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-25
	 * 修改日期：2015-10-26
	 * 名称：
	 * 功能：缩略图 适应不同的分辨率显示
	 * 说明：
	 * 注意：
	 * @params   (Object)init 			NO NULL :初始化参数
	 *
	 * 			(jQuery)$view		      				   	:NO NULL	缩略图外的包裹层
	 * 			(jQuery)$li									:NO NULL	缩略图
	 * 			(Number)baseWidth		      				:NO NULL	设定的宽度
	 * 			(Number)baseHeight		      				:NO NULL	设定的高度
	 * 			(String)unit :'px | % | em [|...]',	  		   :NULL	单位
	 *
	 *  Example：


	 */
	var Thumbnail = System.Layout.extend({
		constructor: function(D){
			__this__ = this;
			var defaults={
				'$view':null,
				'$li':null,
				'baseWidth':200,
				'baseHeight':150,
				'unit':'px'
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			this.base(init);

			this.baseWidth  		= init.baseWidth;
			this.baseHeight  		= init.baseHeight;


		},
		'_className':'Thumbnail',
		'__constructor':function(){},
		'setAllLiWidth':function(width){
			if(!this.$li) return this;
			this.$liw =  width;
			this.$li.css({width: this.$liw + this.unit});
			return this;
		},
		'setAllLiHeight':function(height){
			if(!this.$li) return this;
			this.$lih = height;
			this.$li.css({height: this.$lih + this.unit});
			return this;
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2015-10-13
		 * 名称：resize
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param:
		 * @return (Thumbnail)
		 * Example：
		 */
		'resize':function(){
			var baseWidth  = this.baseWidth;
			var baseHeight = this.baseHeight;

			var fullWidth = this.getViewWidth();
			var width = ( fullWidth / ( Math.ceil( fullWidth / baseWidth ) * baseWidth ) ) * baseWidth;
			var height = ( width / baseWidth ) * baseHeight;
			this.setAllLiWidth(width).setAllLiHeight(height);
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
		 * 功能：在注销Thumbnail对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});

	System['Thumbnail'] = Thumbnail;

});


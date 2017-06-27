 /**
 * 
 * @author lhh
 * 名称：弹出层 
 * 功能：可自动居中且兼容IE6
 * 创建日期：2014-12-1
 * 修改日期：2014-12-1
 * @param	        popLayout(jQuery)   NO NULL : //弹出层jQuery对象
 * @param	        mask 	 (jQuery)      NULL : //弹出层下的蒙版jQuery对象
 * @param 			padding  (Number)    NULL : callBack 有padding值时
 * Example:
		  window[GRN_LHH].run([window,jQuery],function(window,jQuery,undefined){
					var System=this;

					var pop=new System.PopupLayer({
						'popLayout':$('.content'),
						'mask':$('.mask'),
						'padding':6
					}).setCenter();


					$(window).scroll(function() {
						pop.scroll();
					});
					$(window).resize(function() {
						pop.resize();
					});



					$('.content-close,.mask').on('click',function(){
						pop.hide();
					});

					$('#button').on('click',function(){
						pop.show();
					});
		});
 */

 window[GRN_LHH].run([window,jQuery],function(window,jQuery,undefined){
	 'use strict';
	 var System=this;
	 System.is(System,'Browser','PopupLayer');

	 var __this__=null;
	 var $=jQuery;
	 var PopupLayer = System.Browser.extend({
		 constructor: function (D){
			 __this__=this;

			 if(!D) return this;
			 if(!System.isPlainObject(D)) return this;

			 this.popLayout  = D.popLayout;
			 this.padding	=  D.padding || 0;
			 this.mask 		=  D.mask    || null;
		 },
		 '_className':'PopupLayer',
		 '__constructor':function(){},
		 /**
		  *
		  * @author: lhh
		  * 产品介绍：
		  * 创建日期：2014-12-1
		  * 修改日期：2015-8-19
		  * 名称：resize
		  * 功能：
		  * 说明：
		  * 注意：
		  * @override
		  * @return  (PopupLayer)
		  * Example:
		  */
		 'resize':function(){
			 this.resize_super();
			 return this;
		 },
		 /**
		  *
		  * @author: lhh
		  * 产品介绍：
		  * 创建日期：2014-12-1
		  * 修改日期：2015-8-19
		  * 名称：scroll
		  * 功能：
		  * 说明：
		  * 注意：
		  * @override
		  * @return  (PopupLayer)
		  * Example:
		  */
		 'scroll':function(){
			 this.scroll_super();
			 return this;
		 },
		 /**
		  *
		  * @author: lhh
		  * 产品介绍：
		  * 创建日期：2014-12-1
		  * 修改日期：2015-8-19
		  * 名称：setCenter
		  * 功能：设置自动居中功能
		  * 说明：没有fixed 功能用案例2的方法 ,用到resize 事件用案例1的方法
		  * 注意：css 里必须要设的值 margin:0;top:0;left:0;
		  * @param   (Function)callBack 	  NULL :callBack 传回调方法 可自定义居中方式
		  * @return  (PopupLayer)
		  * Example:



		  */
		 'setCenter':function(D){
			 var callBack =(D && D.callBack) || null;
			 this.autoScreenCenter(this.popLayout,this.padding,callBack);
			 this.resize();
			 return this;
		 },

		 /**
		  *
		  * @author: lhh
		  * 产品介绍：
		  * 创建日期：2014-12-1
		  * 修改日期：2016-9-11
		  * 名称：create
		  * 功能：动态创建html
		  * 说明：
		  * 注意：
		  * @param   (Object)D 	 NO NULL : 创建的信息
		  * @return  (String)
		  * Example:


		  */

		 'create':function(init){
			 var defaults={
				 'div_class_PopupLayer_wrap_name':'section sectionPopupLayer-A1',
				 'div_class_colose_name':'close',
				 'div_title_name':'sectionBox sectionTitle',
				 'div_content_name':'content',
				 'more':'更多>>',
				 'title':'标题',
				 'content':'内容',
				 'select':0
			 };

			 var D = System.isObject(init) ? System.merge({},[init,defaults]) : defaults;
			 var tag = System.Html.tag;

			 var container='';
			 switch(D['select']){
				 case 0:
					 container = tag('div',{'class':D["div_class_PopupLayer_wrap_name"]},
						 [
							 tag('div',{'class':D["div_class_colose_name"]})
							 ,tag('div',{'class':'p10'},
							 tag('div',{'class':'content'},
								 [
									 tag('div',{'class':D["div_title_name"]},
										 [
											 tag('h2',{},D["title"])
											 ,D["more"] ? tag('div',{'class':'more'},D["more"]) : ''
										 ]
									 )
									 ,tag('div',{'class':D["div_content_name"]},
									 tag('div',{'class':'P20'},D["content"])
								 )
								 ]
							 )
						 )

						 ]
					 );
					 /*
					  container ='<div class="'+D["div_class_PopupLayer_wrap_name"]+'"> \
					  <div class="'+D["div_class_colose_name"]+'"></div> \
					  <div class="p10"> \
					  <div class="content"> \
					  <div class="'+D["div_title_name"]+'"> \
					  <h2>'+D["title"]+'</h2>';
					  if(D["more"]){
					  container +=			'<div class="more">'+D["more"]+'</div>';
					  }
					  container +=		'</div> \
					  <div class="'+D["div_content_name"]+'"><div class="p15">'+D["content"]+'</div></div> \
					  </div> \
					  </div> \
					  </div>' ;
					  */
					 break;


				 default:

			 }


			 return container;
		 },
		 'hide':function(sport){
			 if(sport && 'sport' === sport){
				 this.popLayout.animate({
					 opacity: 'hide'
				 }, "slow", "easein");
				 this.mask.animate({
					 opacity: 'hide'
				 }, "slow", "easein");
			 }else{
				 this.popLayout.hide();
				 this.mask.hide();
			 }

			 return this;
		 },
		 'show':function(sport){
			 if(sport && 'sport' === sport){
				 this.popLayout.animate({
					 opacity: 'show'
				 }, "slow", "easein");
				 this.mask.animate({
					 opacity: 'show'
				 }, "slow", "easein");
			 }else{
				 this.popLayout.show();
				 this.mask.show();
			 }

			 return this;
		 },


		 'append':function($div){},
		 'empty':function(){this.popLayout.empty();},
		 'remove':function(){this.popLayout.remove();},

		 /**
		  *
		  * @author lhh
		  * 产品介绍：析构方法
		  * 创建日期：2015-4-2
		  * 修改日期：2015-4-2
		  * 名称：destructor
		  * 功能：在注销PopupLayer对象时调用此方法
		  * 说明：
		  * 注意：
		  * @return  ()
		  * Example：
		  */
		 'destructor':function(){}
	 });

	 System['PopupLayer']=PopupLayer;

 });


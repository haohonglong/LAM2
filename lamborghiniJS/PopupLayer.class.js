 /**
 * 
 * @author lhh
 * 名称：弹出层 
 * 功能：可自动居中且兼容IE6
 * 创建日期：2014-12-1
 * 修改日期：2018-8-18
 * 说明：
 * 注意：妈的蛋，居中显示的时候，弹窗隐藏时滚动条发生改变，显示后就发生了居中不对齐的现象，最后终于找到了这个原因，解决办法：要在show()后加个scroll()的行为，这样写 show().scroll()；
 * @param	        popLayout(jQuery)   NO NULL : //弹出层jQuery对象
 * @param	        mask 	 (jQuery)      NULL : //弹出层下的蒙版jQuery对象
 * @param 			padding  (Number)    NULL : callBack 有padding值时
 * Example:
		  LAM.run([window,jQuery],function(window,$){
					var System=this;

					var pop=new System.PopupLayer({
						'$popLayout':$('.pop-layer'),
						 '$mask':$('.pop-mask'),
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
					如果是垂直居中显示，必须要这样写 show().scroll()
						pop.show().scroll();
					});
		});
 */
 (function(IT,factory){
	 'use strict';
	 var System = IT['LAM_20150910123700_'];

	 if(!System){
		 return;
	 }else{
		 System['PopupLayer'] = factory(System);
	 }

 })(this,function(System){
	 'use strict';
	 System.is(System,'Browser','PopupLayer',System.classPath+'/base');

	 var __this__=null;
	 var PopupLayer = System.Browser.extend({
		 constructor: function (D){
			 this.base();
			 __this__=this;
			 var defaults={
				 '$popLayout':$('.pop-layer'),
				 '$mask':$('.pop-mask'),
				 'padding':6,
				 'animate':{
                     'speed':'slow',
                     'easing':'swing'
                 }
			 };

			 D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;


			 this.$popLayout  = D.$popLayout;
			 this.$mask 		=  D.$mask    || null;
			 this.padding	=  D.padding || 0;
			 this.animate = D.animate || null;
		 },
		 '_className':'PopupLayer',
		 '__constructor':function(){},

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
			 this.autoScreenCenter(this.$popLayout,this.padding,callBack);
			 this.resize();
			 return this;
		 },
         'resize':function () {
             this.base();
             return this;
         },
         'scroll':function () {
             this.base(this.$popLayout);
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
                             D["div_class_colose_name"] ? tag('div',{'class':D["div_class_colose_name"]}) : ''
							 ,tag('div',{'class':'p10'},
							 tag('div',{'class':'content'},
								 [
									 (function () {
                                         return D["div_title_name"]
											 ?
												 tag('div',{'class':D["div_title_name"]},
													 [
														 tag('h2',{},D["title"])
														 ,D["more"] ? tag('div',{'class':'more'},D["more"]) : ''
													 ]
												 )
											 :
											 '';
                                     })()
									 ,tag('div',{'class':D["div_content_name"]},
										 tag('div',{'class':'P20'},D["content"])
									 )
								 ]
							 )
						 )

						 ]
					 );

					 break;


				 default:

			 }


			 return container;
		 },

		 'append':function($div){},
		 'empty':function(){this.$popLayout.empty();},
		 'remove':function(){this.$popLayout.remove();},

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

     System.each(['show','hide'],function(i,name){
         PopupLayer.method(name,function(callback){
             callback = System.isFunction(callback) ? callback : null;
             if(this.animate){
                 this.$popLayout.animate({
                     opacity: name
                 }, this.animate.speed, this.animate.easing,callback);
                 this.$mask.animate({
                     opacity: name
                 }, this.animate.speed, this.animate.easing);
             }else{
                 this.$popLayout[name](null,callback);
                 this.$mask[name]();
             }

             return this;
         });

     });

	 return PopupLayer;
 });



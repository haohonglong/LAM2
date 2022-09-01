 /**
 * 
 * @author lhh
 * 名称：弹出层 
 * 功能：可自动居中且兼容IE6
 * 创建日期：2014-12-1
 * 修改日期：2019-7-25
 * 说明：
 * 注意：妈的蛋，居中显示的时候，弹窗隐藏时滚动条发生改变，显示后就发生了居中不对齐的现象，最后终于找到了这个原因:元素display:none;的时候 offset().top 获取的永远是0,详细解释参考看 http://api.jquery.com/offset/ 解决办法：要在show()后加个scroll()的行为，要这样写 show().scroll()；
  * resize 时会y位置会跑偏，解决方法：resize().scroll()
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
						resize 时会y位置会跑偏，解决方法：resize().scroll()
						pop.resize().scroll();
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
			typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
			typeof define === 'function' && define.amd ? define(factory(System)) :
			(System['PopupLayer'] = factory(System));
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
			 	 '$body':$('body'),
				 '$popLayout':$('.pop-layer'),
				 '$mask':$('.pop-mask'),
				 'padding':6,
				 'animate':{
                     'speed':'slow',
                     'easing':'swing'
                 }
			 };

			 D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;

			 this.$body = D.$body || $('body');
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
		  * 修改日期：2018-8-29
		  * 名称：create
		  * 功能：动态创建html
		  * 说明：
		  * 注意：
		  * @param   (Object)D 	 NO NULL : 创建的信息
		  * @return  (PopupLayer)
		  * Example:
		  */
		 'create':function(init){
			 var defaults={
					 'container':{
						 'attributes':{
							 'class':'section sectionPopupLayer-A1'
						 },
						 'close':{
							 'tag':'div',
							 'attributes':{
								 'class':'div_class_colose_name'
							 }
						 },
						 'title':{
							 'tag':'h2',
							 'title':'title',
                             'attributes':{
                                 'class':'sectionBox sectionTitle'
                             },
							 'more':{
								 'tag':'span',
								 'text':'更多>>',
								 'attributes':{
									 'class':'more'
								 }
							 }
						 },
						 'content':{
							 'title':'',
							 'content':'',
							 'attributes':{},
						 }
					 },
					 'option':0
				 };

			 var D = System.isObject(init) ? System.merge(true,System.createDict(),[defaults,init],true) : defaults;
			 var tag = System.Html.tag,container,close,title,more,content,className='',text='';
			 container = D.container;
			 close = container.close;
			 title = container.title;
			 content = container.content;
			 more = title.more;

			 switch(D.option){
				 case 1:
                     text = tag('div',container.attributes,
						 [
                             System.isset(close) && System.isPlainObject(close) ? tag(close.tag,close.attributes) : ''
							 ,tag('div',{'class':'p10'},
							 tag('div',{'class':'content'},
								 [
									 (function () {
                                         return System.isset(title) && System.isPlainObject(title)
											 ?
												 tag('div',title.attributes,
													 [
														 tag(title.tag,title.title)
														 ,System.isset(more) && System.isPlainObject(more) ? tag(more.tag,more.attributes,more.text) : ''
													 ]
												 )
											 :
											 '';
                                     })()
									 ,tag('div',content.attributes,
										 tag('div',{'class':'P20'},content.content)
									 )
								 ]
							 )
						 )

						 ]
					 );
                     className = this.$popLayout.attr('class');
                     this.$popLayout.attr('class','');
                     this.$popLayout.remove();
                     this.$popLayout = null;
                     this.$popLayout = $(text);
                     this.$popLayout.attr('class',className);
					 break;
				 case 2:
                     className = this.$popLayout.attr('class');
                     this.$popLayout.attr('class','');
                     text = tag('div',container.attributes,System.Dom.getOuterHTML(this.$popLayout[0]));
                     this.$popLayout.remove();
                     this.$popLayout = null;
                     this.$popLayout = $(text);
                     this.$popLayout.attr('class',className);
				 	break;
				 case 3:
                     className = this.$popLayout.attr('class');
                     this.$popLayout.attr('class','');
                     text = tag('div',container.attributes,this.$popLayout.html());
                     this.$popLayout.remove();
                     this.$popLayout = null;
                     this.$popLayout = $(text);
                     this.$popLayout.attr('class',className);
				 	break;

				 default:

			 }
			 this.hide();
             this.$popLayout.appendTo(this.$body);
             this.$mask.appendTo(this.$body);
			 return this;
		 },

		 'append':function($div){},
		 'empty':function(){this.$popLayout.empty();},
		 'remove':function(){this.$popLayout.remove();},
		 'is_hide':function(){return this.$popLayout.is(":hidden");},

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



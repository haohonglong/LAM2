/**
 * Tools 0.1 pre
 * 创建人：龙昊宏
 * 名称：工具类
 * 功能：区域隐藏或显示、
 *		 文本框输入时设默认文字提示、
 *		 图片动画移动
 *	创建日期：2013.11.08		
 *	修改日期：2014.10.21		
 * 
 *
 * Copyright Software 
 * 
 * 
 */

window[GRN_LHH].run([window,jQuery],function(window,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Tools');
	var __this__=null;
	var fixEvt = System.Browser.fixEvt;
	var isIE6 = System.Browser.isIE6;
	var Tools = System.Browser.extend({
		constructor: function () {
			__this__ = this;
		},
		'_className':'Tools',
		'__constructor':function(){},
		'hasStorage':function(){
			if(window.sessionStorage || typeof window.sessionStorage != 'undefined'){
				return true;
			}else{
				return false;
			}
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-6-25
		 * 修改日期：2015-6-25
		 * 名称：get_url_Param
		 * 功能：获取url指定的参数
		 * 说明：
		 * 注意：
		 * @param   (String)name            NO NULL :参数名称
		 * @return  String
		 *
		 */
		'get_url_Param':function(name){
			var search = document.location.search;
			var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
			var matcher = pattern.exec(search);
			var items = null;
			if(null != matcher){
				try{
					items = decodeURIComponent(decodeURIComponent(matcher[1]));
				}catch(e){
					try{
						items = decodeURIComponent(matcher[1]);
					}catch(e){
						items = matcher[1];
					}
				}
			}
			return items;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-7
		 * 修改日期：2016-7-7
		 * 名称： select_change
		 * 功能：选择下拉框触发 onchange 事件
		 * 说明：
		 * 注意：
		 * @param   (Object)D             NULL :
		 * @param   (Function)callBack            NULL :
		 * @return (void)
		 *
		 */
		'select_change':function(D,callBack){
			$( "select" )
				.change(function () {
					$( "select option:selected" ).each(function() {
						callBack.call(this);

					});
				})
				.change();
		},
		/**
		 * 创建日期：
		 * 修改日期：2014-3-24
		 * 名称：(vido) hide_or_show_area
		 * 功能：隐藏或显示指定区域
		 * 参数： {	(Object) 'hide':{[]},
		 *			(Object) 'show':{[]}
		 *			}
		 */
		'hide_or_show_area':function(menu){
			if(!menu) return false;
			if(arguments.length>1){
				var arr=arguments;
				this.each(arr,function(i){
					if(0==i){
						this.style.display="";
					}else{
						this.style.display="none";
					}

				});

			}else{
				if(menu.hide){
					this.each(menu.hide,function(){

						if(this[0]){
							this.hide();
						}else{
							if(typeof this.style !== 'undefined')
								this.style.display="none";
						}

					});

				}
				if(menu.show){
					this.each(menu.show,function(){
						if(this[0]){
							this.show();
						}else{
							if(typeof this.style !== 'undefined')
								this.style.display="";
						}
					});
				}
			}
		},

		/**
		 * 创建日期：2014/7/25
		 * 修改日期：2014/7/25
		 * 名称：(vido) hover_next_box_show
		 * 功能：鼠标hover时下面的隐藏模块显示,鼠标移除隐藏模块时模块恢复隐藏
		 * 参数：(string a,
		 *		 String nextBox)
		 * Example:
		 hover_next_box_show('.js_showBoxA1','.sectionShowBox-A1');

		 html_strure:
		 <div class="js_showBoxA1">
		 <div class="sectionShowBox-A1 none">
		 ....
		 </div>
		 </div>

		 *
		 */
		'hover_next_box_show':function(a,nexBox){
			$(a).hover(function(){
				$(this).find(nexBox).show().hover(null,function(){
					$(this).hide();
					return false;
				});
				return false;
			});
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-4-14
		 * 修改日期：2016-4-19
		 * 名称： dropdownMenu
		 * 功能：bootstrap下拉框选中所选的放入输入框
		 * 说明：data-select="input" 这个属性放到 显示内容的元素。
		 * 注意：
		 * @param   (Object)D            		  NULL :初始化数据
		 * @param   (String)D.group             NULL :下拉框的包裹层
		 * @param   (String)D.text             NULL :显示在输入框的信息
		 * @param   (String)D.select            NULL :
		 * @param   (String)D.option            NULL :
		 * @param   (String)D.event             NULL :触发下拉框的事件，默认时click
		 * @param   (Function)callBack            NULL :回调返回俩参数:this (当前点击的li元素) input(当前输入框)
		 * @return (void)
		 *html_strure:
		 <div class="btn-group">
		 <button type="button" class="btn btn-default" data-select="input">请选择...</button>
		 <input type="hidden">
		 <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		 <span class="caret"></span>
		 <span class="sr-only">Toggle Dropdown</span>
		 </button>
		 <ul class="dropdown-menu">
		 <li>2016-2-5</li>
		 <li>2016-2-5</li>
		 <li>2016-2-5</li>
		 </ul>
		 </div>
		 *
		 */
		'dropdownMenu':function(D,callBack){
			if(System.isFunction(D)) {
				callBack = D;
				D = undefined;
			}
			var defaults={
				'group': '.btn-group',
				'text': '.btn[data-select="input"]',
				'select': '.dropdown-menu',
				'option': 'li',
				'event': 'click'
			};
			D = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			$(D.select).closest(D.group).off(D.event,D.option);
			$(D.select).closest(D.group).on(
				D.event,
				D.option,
				function(event){
					var $input = $( event.target ).closest(D.group).find(D.text);
					if(System.isFunction(callBack)){
						//this : option
						//input : 当前输入框
						callBack.call(this,$input);
					}else{
						$input.text($(this).text());
					}
				});
			//$(D.input).each(function(){
			//	var input=this;
			//	$(this).closest(D.group).on(D.event, D.option,function(){
			//		if(System.isFunction(callBack)){
			//			//this : option
			//			//input : 当前输入框
			//			callBack.call(this,input);
			//		}else{
			//			$(input).text($(this).text());
			//		}
			//	});
			//});

		},

		/**
		 * 创建日期：
		 * 修改日期：2014/7/25
		 * 名称：(vido) fake_drop_down_box
		 * 功能：伪下拉框
		 * 参数：(jQuery obj $select,
		 *		 String selectBox)
		 * 	Example:
		 fake_drop_down_box($('.sectionSelect-A1'),'.js_select1');

		 html_strure:
		 <div class="sectionSelect-A1">
		 <input data-box="input" type="hidden" value="" name="">
		 <span data-box="tip">更换部门至</span>
		 <div class="sectionArrow-A1 sectionArrow-A1-3 sectionArrow-A1-3-2"><i class="down"></i></div>
		 </div>
		 <div class="sectionShowBox-A3 sectionShowBox-A3-3 sectionList-A3 sectionList-A3-2 js_select1 none">
		 <ul class="border">
		 <li>text...</li>
		 </ul>
		 </div>
		 *
		 */
		'fake_drop_down_box':function($select,selectBox){
			$select.click(function(event){
				$(selectBox).show();
				event.stopPropagation();
			});
			$(selectBox).on('click','li',function(){
				var val=$(this).text();
				$select.find('[data-box="tip"]').text(val);
				$select.find('input[data-box="input"]').val(val);
				$(this).parents(selectBox).hide();


			});

			$(window).click(function(){
				$(selectBox).hide();
			});
		},

		/**
		 * 创建日期：2014/8/14
		 * 修改日期：2014/8/14
		 * 名称：(vido) fake_drop_down_box_toggle
		 * 功能：伪下拉框 跟上面不同的是只有点击下拉框标题才隐藏内容 html_strure都是一样的
		 * 参数：(jQuery obj $select,
		 *		 String selectBox)
		 * 	Example:
		 fake_drop_down_box_toggle($('.sectionSelect-A1'),'.js_select1');
		 *
		 */
		'fake_drop_down_box_toggle':function($select,selectBox){
			$select.toggle(function(){
				$(selectBox).show();

			},function(){
				$(selectBox).hide();

			});
			$(selectBox).on('click','li',function(){
				var val=$(this).text();
				$select.find('[data-box="tip"]').text(val);
				$select.find('input[data-box="input"]').val(val);
			});

		},



		/**
		 * 创建日期：2013/12/12
		 * 修改日期：2014/9/30
		 * 名称：(vido) gotoTop
		 * 功能：到页面顶端
		 * 参数： (jqery Object) $('.div'),
		 *		  (String) 'hover'//鼠标经过变化的样式
		 *
		 */
		'gotoTop':function($dom,css,fast){
			var __this__=this;
			$dom.hide();
			if(isIE6()){//this is IE6
				$dom.parent().css('position', 'relative');

			}
			if(fast){
				$(window).scroll(function(){
					var vtop=$(document).scrollTop();
					if(vtop>0){
						$dom.show().hover(function(){
							if(css){
								$dom.addClass(css);
							}

						},function(){
							if(css){
								$dom.removeClass(css);
							}

						}).click(function(){
							$(document).scrollTop(0);
						});

						if(isIE6()){//this is IE6
							__this__.fixed($dom[0]);
						}
					}else{
						$dom.hide();
					}
				});
			}else{
				$(window).scroll(function () {
					if ($(this).scrollTop() > 600) {
						$dom.unbind('hover');
						$dom.hover(function(){
							if(css){
								$dom.addClass(css);
							}
						},function(){
							if(css){
								$dom.removeClass(css);
							}

						}).fadeIn();
					} else {
						$dom.fadeOut();
					}
				});

				// scroll body to 0px on click
				$dom.click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, 2000/*, 'easeInOutQuint'*/);
					return false;
				});
			}



		},


		/**
		 * 创建日期：2013/12/11
		 * 修改日期：2014/9/4
		 * 名称：(vido) menu_of_auto_fixed
		 * 功能：菜单随滚条改为以定位方式(固定要浏览器顶部);
		 滚动条滚动到一定距离时执行
		 * 参数： {
		 *			$dom(no null) :对应的元素
		 *			css(null) :固定定位的样式
		 *			fn1(null) :到达浏览器顶部要做的事
		 *			fn2(null):低于浏览器顶部要做的事
		 *			height(null):被别的元素挡着的高度 后者滚动条滚到一定的距离
		 *			}
		 *
		 */
		'menu_of_auto_fixed':function(init){
			var __this__=this;
			//获取要定位元素距离浏览器顶部的距离
			var height=int.height || 0,
				$dom  =int.$dom,
				css   =int.css,
				fn1   =int.fn1,
				fn2   =int.fn2,
				navH;


			if($dom){
				navH =parseInt( $dom.offset().top);
				navH-=height;
			}else{
				navH=height;
			}


			//滚动条事件
			$(window).scroll(function(){
				//获取滚动条的滑动距离
				var scroH = $(this).scrollTop();
				//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
				if(scroH >= navH){
					if (css) $dom.addClass(css);
					if(System.isFunction(fn1)) fn1(scroH);
				}else{
					if(css) $dom.removeClass(css);
					if(System.isFunction(fn2)) fn2(scroH);
				}

			});

		},



		/**
		 * 创建日期：2014/5/16
		 * 修改日期：2014/5/16
		 * 名称：(vido) floating_ads
		 * 功能：漂浮广告
		 * 参数： {
		 *			'div' : 			漂浮的容器
		 *			'xPos':
		 *			'yPos':
		 *			'time':
		 *			'fn'  :
		 *			}
		 *
		 */
		'floating_ads':function(A){
			var __this__=this;
			var D={
				'iSpeedX':A.xPos || 1,
				'iSpeedY':A.yPos || 1,
				'div':A.div,
				'time':A.time || 30,
				'body_w':A.wrap ? A.wrap.outerWidth(true)  : $(window).width(),
				'body_h':A.wrap ? A.wrap.outerHeight(true) : $(window).height(),
				'timer':null
			};

			var div =D.div.get(0);

			var float=function(){
					var l=div.offsetLeft+D.iSpeedX;
					var t=div.offsetTop +D.iSpeedY;
					D.body_w=A.wrap ? A.wrap.outerWidth(true)  : document.documentElement.clientWidth;
					D.body_h=A.wrap ? A.wrap.outerHeight(true) : document.documentElement.clientHeight;

					if(t >= D.body_h - div.offsetHeight){
						D.iSpeedY*=-1;
						t = D.body_h - div.offsetHeight;
					}

					if(t <= 0){
						D.iSpeedY*=-1;
						t=0;
					}

					if(l >= D.body_w - div.offsetWidth){
						D.iSpeedX*=-1;
						l = D.body_w - div.offsetWidth;
					}

					if(l <= 0){
						D.iSpeedX*=-1;
						l=0;
					}



					div.style.left=l+'px';
					div.style.top =t+'px';


				},
				jump=function(){
					var l=div.offsetLeft+D.iSpeedX;
					var t=div.offsetTop +D.iSpeedY;
					D.body_w=A.wrap ? A.wrap.outerWidth(true)  : $(window).width();
					D.body_h=A.wrap ? A.wrap.outerHeight(true) : $(window).height();
					if(t >= D.body_h - div.offsetHeight){
						D.iSpeedY*=-1;
						t = D.body_h - div.offsetHeight;
					}

					if(t <= 0){
						D.iSpeedY*=-1;
						t=0;
					}

					if(l >= D.body_w - div.offsetWidth){
						D.iSpeedX*=-1;
						l = D.body_w - div.offsetWidth;
					}

					if(l <= 0){
						D.iSpeedX*=-1;
						l=0;
					}



					div.style.left=l+'px';
					div.style.top =t+'px';


				},
				start=function(fn){
					D.timer=setInterval(function(){fn();},D.time)
				},
				stop=function(){
					clearInterval(D.timer);
				};



			if(System.isString(A['fn'])){
				A['fn'].call(A,{
					'f_start':start,
					'f_stop':stop,
					'f_jump':jump,
					'f_float':float

				});
			}
		},


		/**
		 * 创建日期：2014-3-19
		 * 修改日期：2014-3-19
		 * 名称：
		 * 功能：把一个区域内容copy到另一个区域中
		 * 参数：vido info_to_info({
		 							'$big'  :,
		 *							'$small':,
		 *							'src'   :'b_src',
		 *							'text'  :'.sectionMask-A1'
		 *						});
		 *
		 *
		 *
		 */
		'info_to_info':function (obj){
			obj.src=obj.src ? obj.src : 'src';
			obj.$big.find('img').attr('src',obj.$small.find('img').attr(obj.src));
			if(obj.text){//copy遮罩标题
				obj.$big.find(obj.text).html(obj.$small.find(obj.text).html());
			}
			if(System.isString(obj.fn)){
				obj.fn.call(obj);
			}

		},

		/**
		 * 创建日期：2014-8-12
		 * 修改日期：2014-8-12
		 * 名称：
		 * 功能：当前行下移，下移，移到最后一个，移到最上面
		 * 参数：object  move_next_prev_first_last({
		 							'$event'  :$(event.target),
		 							'parent': '.box',
		 							'chose':  'next'
		 *						});
		 *
		 *example:
		 $('.js_sectionBoxA13 a').bind('click',function(event){
		           switch($(event.target).attr('class')){
		               case 'i-1'	:
		           		 tools.move_next_prev_first_last({
		 		 							'$event'  :$(event.target),
		 		 							'parent': '.sectionBox-A10',
		 		 							'chose':  'first'
		 		 						});
		                 break;
		               case 'i-2'	:
		               	tools.move_next_prev_first_last({
		 		 							'$event'  :$(event.target),
		 		 							'parent': '.sectionBox-A10',
		 		 							'chose':  'prev'
		 		 						});
		                 break;
		               case 'i-3':
		               	tools.move_next_prev_first_last({
		 		 							'$event'  :$(event.target),
		 		 							'parent': '.sectionBox-A10',
		 		 							'chose':  'next'
		 		 						});
		                 break;
		               case 'i-4'	:
		               	tools.move_next_prev_first_last({
		 		 							'$event'  :$(event.target),
		 		 							'parent': '.sectionBox-A10',
		 		 							'chose':  'last'
		 		 						});
		                 break;

		               default:
		                 alert("Error");
		           }
		        });

		 */
		'move_next_prev_first_last':function (D){
			D.$cur=D.$event.parents(D.parent);
			D.$copy=D.$cur.clone(true);
			switch(D['chose']){
				case 'next'	:
					if(D.$cur.next().hasClass(D.parent.substr(1))){
						D.$cur.next().after( D.$copy);
						D.$cur.remove();
					}
					break;
				case 'prev'	:
					if(D.$cur.prev().hasClass(D.parent.substr(1))){
						D.$cur.prev().before( D.$copy);
						D.$cur.remove();
					}
					break;
				case 'first':
					$(D.parent).first().before( D.$copy);
					D.$cur.remove();
					break;
				case 'last'	:
					$(D.parent).last().after( D.$copy);
					D.$cur.remove();
					break;
					alert("Error");
				default:

			}

			return D;

		},


		/**
		 * 创建日期：2014-8-13
		 * 修改日期：2014-8-13
		 * 名称：
		 * 功能：多选框全选反选，默认为反选状态，输入chexkbox 才可改变全选状态
		 * 参数：vido  checkboxSelectAll(list,checkbox);
		 * 参数：(Array) 	list 		//所有的checkbox
		 * 参数：(Node) 	checkbox 	//当前所点全选的checkbox
		 */
		'checkboxSelectAll':function (list,checkbox) {
			for (var i=0;i<list.length;i++) {
				var e=list[i];
				if(checkbox){
					e.checked=checkbox.checked;
				}else{
					e.checked=!e.checked;
				}

			}
		},




		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-1-10
		 * 修改日期：2014-12-12
		 * 名称：input_text
		 * 功能：输入框是否为空如为空就显示默认字符，触发事件时若是默认文字就清空
		 * 说明：
		 * 注意：
		 * @param   (Node)param 		NO NULL :
		 * Example：
		 *
		 */
		'input_text':function(obj){
			var text=$(obj).attr('default'),value;
			if(!text) return;
			obj.onclick=function(){
				value=obj.value.replace(/\s/g,"");
				if(value==text)
					obj.value='';
			};
			obj.onblur=function(){
				value=obj.value.replace(/\s/g,"");
				if(value=='')
					obj.value=text;
			};

		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：对textarea 的placeholder改变样式或换行时可以用这种
		 * 创建日期：2014-12-12
		 * 修改日期：2014-12-12
		 * 名称：input_text
		 * 功能：输入框是否为空如为空就显示默认字符，触发事件时若是默认文字就清空
		 * 说明： 仿表单里的placeholder
		 * 注意：
		 * @param   (json)obj 		NO NULL :
		 * {
		 *	'input': textarea
		 *	'$box': //盖在表单上的层
		 *	}
		 * Example：
		 *
		 */
		'placeholder':function(obj){
			var input=obj.input;
			var $box=obj.$box,
				$input=$(input);
			//var text=$(input).attr('placeholder');
			$box.on('click',function(){
				$(this).hide();
				input.focus();

			});

			$input.on('blur',function(){
				if('' === $input.val().replace(/\s/g,"")){
					$box.show();
				}
			});


		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-12
		 * 修改日期：2014-12-12
		 * 名称：focusin
		 * 功能：文本框聚焦框变色
		 * 说明：
		 * 注意：
		 * @param   (jQuery)$d 		NO NULL :jQuery 对象
		 * @param   (String)c 		NO NULL :类名称
		 *
		 * Example：
		 *
		 */
		'focusin':function($d,c){
			$d.focusin(function(){
				$(this).addClass(c);
			});
			$d.focusout(function(){
				$(this).removeClass(c);
			});


		},


		/**
		 * 创建日期：2014-9-2
		 * 修改日期：2014-9-12
		 * 名称：
		 * 功能：把指定的元素设为全屏或全屏减去指定的只存
		 * 参数：Object obj
		 * 	{
		 *		'$div':$(),
		 *		'w':true,
		 *		'h':true,
		 *		'wSize':0,
		 *		'hSize':0
		 *	 }
		 *
		 */
		'set_whole_screen_size':function(obj){
			var wSize=obj.wSize || 0;
			var hSize=obj.hSize || 0;
			var width,height,getWindowSize=System.Browser.getBodySize;
			var setSize=function(){
				if(obj.w){
					width=getWindowSize('w');
					obj.$div.width(width-wSize);
				}
				if(obj.h){
					height=getWindowSize('h');
					obj.$div.height(height-hSize);
				}
			};
			$(window).resize(function() {
				setSize();

			});

			setSize();

		},



		/**
		 * 创建日期：2014-10-22
		 * 修改日期：2014-10-22
		 * 名称：loadImages
		 * 功能：图片预加载
		 * 参数：
		 * 	(node)		I:要放图片的img元素
		 *	(Number)	h:img元素的高度，像素
		 *	(Number)	w:img元素的宽度，像素
		 * Example:
		 loadImages(img).src="/image/1.jpg";
		 */
		'loadImages':function(I){
			var image=new Image();
			image.onload=function(){
				I.src=this.src;

			};
			return image;

		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-1-5
		 * 修改日期：2015-1-21
		 * 名称：hover_image
		 * 功能：图片翻转功能
		 * 说明：hover 或点击时 图片src发生改变 点击别的时之前的恢复成默认状态,如果有传入callback 这个callback this指向的是当前所点击的元素
		 * 注意：
		 * @param   (jQuery)  $focus_image      NULL :
		 * @param   (Object)  init           NO NULL :
		 *												{
		 *												 //点击后要做的操作
		 *												 'fn':function(){},
		 *												 //如果要让点击的图片只点一次就设 init.onece 为true 默认为false
		 *												 'onece':false| true
		 *										         }
		 * Example：
		 *          this.hover_image($('.js_focus_image'),{'fn':function(){}});
		 */
		'hover_image':function($focus_image,init){
			var temp=null;
			$focus_image = $focus_image ? $focus_image : $('.js_focus_image');
			$focus_image.unbind();
			$focus_image
				.hover(function(){
					if(temp == this) {
						return;
					}
					//设定一个标示是否是点击触发的
					this.if_touch=false;
					var $img=$(this).find('img');
					//先保存原来的图片地址
					this.$img=$img;
					this.old_img=$img.attr('dsrc');
					//alert(11111)
					//更换成hover 时需要的图片
					$img.attr('src',$img.attr('hsrc'));
					$(this).addClass('cur');

				},function(){
					if(temp == this) {
						return;
					}
					var $img=$(this).find('img');
					if(!this.if_touch && $img.attr('src') != this.old_img){
						$img.attr('src',this.old_img);
					}
					$(this).removeClass('cur');
				})
				.click(function(event){
					event=fixEvt(event);
					//选择当前的把之前的恢复默认的图片
					if(temp === this && init.onece) {
						return this;
					}
					var $img=$(this).find('img');
					if(temp && temp.old_img){
						temp.$img.attr('src',temp.old_img);
						temp.if_touch=false;
					}

					$(temp).removeClass('cur');
					$(this).addClass('cur');
					// 保存当前选择的
					temp=this;

					$img.attr('src',$img.attr('hsrc'));
					//如果是点击鼠标移除就不还原
					this.if_touch=true;
					//console.log(temp.old_img);
					//显示对应的工具

					if(init && __this__.isF(init.fn)){
						//指针指向当前点击的元素
						init.fn.call(this);
					}


					event.stopPropagation();
				});


			return this;
		},


		/**
		 * 创建日期：2014-9-3
		 * 修改日期：2014-9-3
		 * 名称：imageProportionalzoom
		 * 功能：图片等比例放大缩小
		 * 参数：Object obj
		 * 	ImgD:要放图片的img元素，onload时传参可用this
		 *	h:img元素的高度，像素
		 *	w:img元素的宽度，像素
		 *
		 *
		 *
		 *
		 */
		'imageProportionalzoom':function(ImgD,h,w){
			var image=new Image();
			image.src=ImgD.src;
			if (image.width<w && image.height<h){
				ImgD.width=image.width;
				ImgD.height=image.height;
			}else{
				if (w / h <= image.width / image.height){
					ImgD.width=w;
					ImgD.height=w * (image.height / image.width);
				}else{
					ImgD.width=h * (image.width / image.height);
					ImgD.height=h;
				}
			}

			//图片居中，IE8有效果，IE9,火狐无效果，请在页面用table居中
			//ImgD.style.paddingLeft = (w + 20 - ImgD.width) / 2;   //20是指padding-left和padding-right距离的和
			//ImgD.style.paddingTop=(h + 20 -ImgD.height) / 2;     //20是指padding-top和padding-bottom距离的和
		},





		/**
		 * 创建日期：2014-3-24
		 * 修改日期：2014-3-24
		 * 名称：vido control_cms_img
		 * 功能：查找文章中所有图片如果图片宽度大于规定的图片就限制负责不处理,并且在图片外层加一个容器好让图片居中，这个容器可以自定义。
		 * 参数： {	(jquery object) 'cms':$dom,
		 *			(String) 		'img':'',
		 *			(int)    		'width':500,
		 *			(String) 		'div':'<div class="img-parDiv mb10"></div>'
		 *			}
		 */
		'control_cms_img':function(C){
			//找出文章中所有的图片
			var control_img=function($div,img,div,width){
				var imgs,i=0;
				if(imgs=$div.find(img)){
					for(i=0;i<imgs.length;i++){
						var $curImg=$(imgs[i]);
						$div=$(div);
						if($curImg.width()>width){
							$curImg.width(width)
						}
						if($div){
							$curImg.before($div);
							$curImg.appendTo($div);
						}


					}
					return true;
				}
				return false;
			};

			control_img(C.cms,C.img || 'img',C.div,C.width);

		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-12-18
		 * 修改日期：2014-12-18
		 * 名称：void disableRightMouse
		 * 功能：禁用鼠标右键
		 * 说明：
		 * 注意：
		 * Example：
		 //禁用鼠标右键
		 $(document).ready(function(){
			        $(document).bind("contextmenu",function(e){
			            return false;
			        });
			    });
		 */
		'disableRightMouse':function(){
			$(document).bind("contextmenu",function(e){
				return false;
			});
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-1-15
		 * 修改日期：2015-1-15
		 * 名称：(Boolen) enterToTab
		 * 功能：enter 键功能转成Tab
		 * 说明：
		 * 注意：自定义属性tabindex 是必须要的
		 * @param   ([]node)inputs 		NO NULL :dom节点元素集合
		 * @param   (event)event 		NO NULL :事件对象
		 * @param   (node)input 		NO NULL :当前节点元素
		 * Example：
		 var $inputs=$('#CollagePavement input[type="text"]');
		 $inputs.keydown(function(event){
			        return enterToTab($inputs,event,this);
			    });
		 */
		'enterToTab':function(inputs,event, input) {
			var e = fixEvt(event);
			if(e.keyCode == 13) {
				var tabindex = input.getAttribute('tabindex');
				tabindex++;
				for(var i=0,len=inputs.length;  i<len; i++){
					if (inputs[i].getAttribute('tabindex') == tabindex) {
						inputs[i].focus();
						break;
					}
				}
				return false;
			}
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-1-23
		 * 修改日期：2015-1-23
		 * 名称：Boolean isFlashComplete
		 * 功能：flash 是否加载完成
		 * 说明：
		 * 注意：
		 * @param   (void)param           NULL :
		 * Example：
		 */
		'isFlashComplete':function(id){
			var movie = document.getElementById(id);
			var nPercentLoaded = Math.abs(movie.PercentLoaded());
			if(100 === nPercentLoaded){
				if(System.LAM_DEBUG){
					console.log('flash 加载完成');
				}
				return true;
			}
			return false;
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2015-1-27
		 * 修改日期：2015-1-27
		 * 名称：(int) getScale
		 * 功能：求出比例尺
		 * 说明：比例尺公式： 图上距离=实际距离×比例尺　 实际距离=图上距离/比例尺　 比例尺=图上距离/实际距离.（在比例尺计算中要注意单位间的换算）
		 *
		 * 注意：
		 * @param   (int)  i           NO NULL :图上距离
		 * @param   (int)  a           NO NULL :实际距离
		 * Example：
		 */
		'getScale':function(i,a){return parseInt(i/a);},

		'changeBgColor':function(dom_table,color){//(节点对象)表格每行鼠标移上去变色，移出恢复
			var table=dom_table;
			var tr=table.rows;
			for(var i=0,len=tr.length;i<len;i++){
				tr[i].onmouseover=function(){
					this.style.backgroundColor=color;
				};
				tr[i].onmouseout=function(){
					this.style.backgroundColor="";
				};
			}
		},


		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-6-29
		 * 修改日期：2016-6-29
		 * 名称：getTable_col_count
		 * 功能：统计指定表格中的哪一列所有统计
		 * 说明：
		 *
		 * 注意：
		 * @param   (int)     n           		NO NULL :哪一列（0为第一列，依次类推）
		 * @param   (String)  table           	NO NULL :哪个表格
		 * @returns {number} 返回指定列所有行的统计数字
		 * Example：getTable_col_count(5,'#table tbody')
		 */
		'getTable_col_count':function(n,table){
			var datas=[],td,count=0;
			table = table || 'table';
			$(table+' tr').each(function(){
				td=$(this).find('td').eq(n).text();
				datas.push(parseFloat(td));
			});
			for(var i=0;i<datas.length;i++){
				count+=datas[i];
			}

			return count;
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-6-29
		 * 修改日期：2016-6-29
		 * 名称：fullScreen
		 * 功能：全屏显示
		 * 说明：
		 *
		 * 注意：
		 * @param   (Dom)  docElm     NULL :dom 元素
		 * @returns {void}
		 * Example：
		 */
		'fullScreen': function(docElm){
			docElm = docElm || document.documentElement;
			if (docElm.requestFullscreen) {
				docElm.requestFullscreen();
			}
			else if (docElm.msRequestFullscreen) {
				docElm.msRequestFullscreen();
			}
			else if (docElm.mozRequestFullScreen) {//火狐
				docElm.mozRequestFullScreen();
			}
			else if (docElm.webkitRequestFullScreen) {//谷歌
				docElm.webkitRequestFullScreen();
			}
		},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-6-30
		 * 修改日期：2016-6-30
		 * 名称：setHtmlElementFontSize
		 * 功能：设置html 字体大小 相当于 html{font-size:calc(100vw / 3.75)}
		 * 说明：
		 *
		 * 注意：别忘了在resize 方法里面再调用这个方法
		 * @param   (Dom)  element     NULL :dom 元素 默认html 元素
		 * @returns {void}
		 * Example：
		 */
		'setHtmlElementFontSize': function(element){
			element = element || document.documentElement;
			$(element).css({
				'font-size':$(element).width()/3.75+'px'
			});
			//element['style']['fontSize']=
			//	$(element).width()/3.75+'px';
		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Tools对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});


	System['Tools']=new Tools();

});
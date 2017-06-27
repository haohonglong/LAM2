
window[GRN_LHH].run([window,jQuery],function(window,jQuery,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Tab');

	var __this__=null;
	var fixEvt = System.Browser.fixEvt;
	var $=jQuery;


	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2016-10-3
	 * 修改日期：2016-10-4
	 * 名称：bind_eve_doit
	 * 功能：执触发事件的对象
	 * 说明：
	 * 注意：
	 * @params  (Object)D 		NO NULL
	 * @params  (String)eve 	NO NULL 	要绑定的事件
	 * @params  (String)css 	NO NULL 	事件绑定时要添加的样式
	 * @params  (Event)event 	NO NULL 	事件对象
	 * Example：
	 */
	function bind_eve_doit(D,eve,css,event){
		//D.or 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
		var doif=D.or ? (D.temp || $(this)[0]!=D.temp[0]) : (D.temp && $(this)[0]!=D.temp[0]);
		D.cur_even_this=this;//this 代表的是被点击的 dom 对象
		if(doif) {
			__this__.doit(D,css,event);
		}
		event.stopPropagation();
	}

	function unbind(D,eve){
		var $list=$(D.list);
		if('live' === D.on && $list.die){
			$list.die(eve);
		}else if('on' === D.on && $list.off){
			$list.off(eve);
		}else{
			$list.unbind(eve);
		}
	}

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-10
	 * 修改日期：2016-10-4
	 * 名称：bind_eve
	 * 功能：执行异步时绑定的事件
	 * 说明：
	 * 注意：
	 * @params  (Object)D 		NO NULL
	 * @params  (String)eve 	NO NULL 	要绑定的事件
	 * @params  (String)css 	NO NULL 	事件绑定时要添加的样式
	 * Example：
	 */
	function bind_eve(D,eve,css){
			var $list= $(D.list);
			var $parent=$(D.parent);
			//当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
			var hover = 'hover' === eve && !D.hover ? function(){D.temp.removeClass(css)} : null;
			unbind(D,eve);
			if('on' === D.on){
				$parent.on(eve,D.list,function(event){
					bind_eve_doit.call(this,D,eve,css,event);
				},hover);
			}else if('live' === D.on){
				$list.live(eve,function(event){
					bind_eve_doit.call(this,D,eve,css,event);
				},hover);
			}else{
				$list.bind(eve,function(event){
					bind_eve_doit.call(this,D,eve,css,event);
				},hover);
			}


		}
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-5-29
		 * 修改日期：2015-1-15
		 * 名称：private (void) select_event
		 * 功能：选择相应的事件
		 * 说明：
		 * 注意：
		 * (Object no null) 	 D,
		 * (String no null) 	'eve',//要绑定的事件
		 * (String no null) 	'css' //事件绑定时要添加的样式
		 * Example：
		 */
		function select_event(D,eve,css){
			var $list=$(D.list);
			switch(eve){
				case 'keydown'://判断键盘按下去的按键值
					$list[eve](function(event){
						var e = fixEvt(event);
						switch(e && e.keyCode){
							case System.Event.keyCode.ESCAPE:// 按 Esc

								break;
							case System.Event.keyCode.F2:// 按 F2

								break;
							case System.Event.keyCode.ENTER:// enter 键
								e.keyCode=System.Event.keyCode.TAB;
								return false;
								break;
							case System.Event.keyCode.TAB:// Tab 键

								break;



							default:


						}
					});

					break;
				case 'hover':
					var $list=$(D.list);
					$list.unbind('mouseenter').unbind('mouseleave');
					$list[eve](function(){
						$(this).addClass(css);
					},function(){
						//if(D.temp && $(this)[0]!=D.temp[0]){//只有不是当前选中的才能做下面的事情
						$(this).removeClass(css);
						//}
					});

					break;

				default:


					bind_eve(D,eve,css);

			}


		}
		/**
		 *	创建日期：2014-11-10
		 * 修改日期：2016-10-4
		 *	名称：private (void) isArray_css
		 * 功能：对个事件匹配多个样式
		 * 参数： (Object no null) 	 D,
		 *		   (Array no null) 	'arr_eve',//要绑定的事件集合
		 *		   (Array no null) 	'arr_eve' //事件绑定时要添加的样式的集合
		 *
		 */
		function multi_css(D,arr_eve,arr_css,css){

			var flag=false;
			if(arr_css.length > 1) flag=true;
			for(var i=0;i<arr_eve.length;i++){
				if(flag){//多个事件执行不同的选中状态样式 同传入的是对象执行的效果是一样的
					select_event(D,arr_eve[i],arr_css[i]);
				}else{
					select_event(D,arr_eve[i],css);

				}
			}

		}
		/**
		 *	创建日期：
		 * 修改日期：2016-10-4
		 *	名称：private (void) execu_event
		 * 功能：执行传入的事件行为
		 * 参数：(Object no null) D
		 *
		 */
		function execu_event(D,css){
			if(System.isObject(D.event)){//传入的是对象目的多个事件执行不同的选中状态样式
				//{'k':v}
				var E=D.event;
				for(var k in E){
					select_event(D,k,E[k]);
				}

			}else if(System.isArray(D.event)){//传入的数组
				if(0 === D.event.length) {
					throw new Error('Warning: 数组必须要有值');
					return 0;
				}
				var arr_eve=D.event,arr_css=css;
				multi_css(D,arr_eve,arr_css);
			}else{//传入的是字符串用,号分割
				var arr_eve=D.event.split(","),arr_css=css.split(",");
				if(arr_eve.length > 1){
					multi_css(D,arr_eve,arr_css,css);
				}else{
					bind_eve(D,D.event,css);

				}
			}
		}

	/**
	 * @author lhh
	 * 产品介绍：tabs 功能可添加多个事件和对应事件添加不同的样式
	 * 创建日期：2014-10-28
	 * 修改日期：2016-10-4
	 * 		   	 2015-05-13
	 * 名称：Tab
	 * 功能：表格每行鼠标移上去变色，移出恢复
	 * 说明：
	 * 注意：
	 * @params  (Object)D 			NO NULL :初始化参数
	 * 			(String)parent    	   						:   ULL on 事件的父级dom对象 默认body
	 * 			(String)list    	   						:NO ULL
	 * 			(String)class    	   						:NO	ULL | 'h_cur,c_cur' | ['h_cur','c_cur']  //对应事件加不同样式
	 * 			(String)event    	   						:NO ULL 'hover'  | 'hover,click' | ['hover','click'] | {'hover':'h_cur','click':'c_cur'}
	 * 			(String)hover    	   						:NO ULL 当鼠标事件为hover 同时 hover 没有设定 ture 时 鼠标离开时除去移入添加的样式
	 * 			(jQuery)temp    	   						:	ULL 初始被选中的元素，默认为头一个
	 * 			(String)or    	   							:	ULL true | false  or 为 true 时当前选中的按钮点击后仍触发事件。默认是如果在当前选中的按钮上再次单击不触发任何事件
	 * 			(String)on	    	   						:	ULL 'live | on' 如果是异步就选择
	 * 			(jquery)block    	   						:	ULL 对应选项卡的内容区域
	 * 			(function)fn    	   						:	ULL 回调
	 * 			(function)befor    	   						:	ULL 回调
	 * 			(function)after    	   						:	ULL 回调
	 *  Example：
	 */
	var Tab = System.Browser.extend({
		constructor: function(D) {
			var defaults ={
				'parent':'body',
				'list':'.list li',
				'event':'hover',
				'hover':false,
				'on':null,
				'or':false,
				'class':'cur',
				'block':$('.block'),
				'fn':function(obj){
					var index=obj.this_index;
					obj.current.block.hide();
					obj.current.block.eq(index).show();

				}
			};
			D = System.isObject(D) ? System.merge(D,[defaults]) : defaults;

			__this__=this;
			this.D = D;
		},
		'_className':'Tab',
		'__constructor':function(){},
		'doClass':function(D,css){
			D = D || this.D;
			if(System.isString(css)){
				D.temp.removeClass(css);
				$(D.cur_even_this).addClass(css);
			}
		},
		'doit':function(D,css,event){
			var __this__=this;
			D = D || this.D;
			var temp=D.temp;
			if(css){
				this.doClass(D,css);
			}
			D.temp=$(D.cur_even_this);
			if(System.isFunction(D.fn)){
				D.fn.call(D.cur_even_this,{
					'temp':temp,
					'temp_index':temp.index(),
					'current':D,
					'event':event,
					'cur_even_this':$(D.cur_even_this),
					'this_index':$(D.cur_even_this).index()
				});
			}
		},
		'run':function(){
			var __this__=this;
			var D = this.D;
			var $list=$(D.list);
			D.temp = D.temp ? D.temp : $list.eq(0);
			if($list){
				if(D.event){//有事件时

					execu_event(D,D.class);
				}else{//没事件时

					$list.each(function(){
						D.cur_even_this = this;
						__this__.doit(D,D.class);

					});
				}
			}

			return this;
		},

		'bind':function(D,eve,css){
			bind_eve(D,eve,css);

			return this;
		},
		'unbind':function(){
			unbind(this.D, this.D.event);

			return this;
		},

		'slider':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Tab对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	System.Tab = Tab;

});
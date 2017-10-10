
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Roll');

	var __this__=null;
	/**
	 * 创建日期：2014-11-6
	 * 修改日期：2014-11-6
	 * 名称：vido content_roll
	 * 功能：滚动内容可设定字符或任何元素节点图片，可设定对象，可设定对象的属性，可设定事件
	 * 参数： 	(Array | String) 	arr | text,
	 *			(Number) 			time,
	 *			(function)  		fn
	 *
	 */
	var Roll = System.Browser.extend({
		constructor: function (init){
			__this__=this;
			this.time 	=init.time;
			this.arr 	=init.arr;
			this.fn 	=init.fn;
			this.select =init.select;
			this.timer	=null;

			if(!this.time){
				alert('出错了,参数填的不完整！');
				return false;
			}

		},
		'_className':'Roll',
		'__constructor':function(){},
		'roll_text':function(text,fn){
			var __this__=this;
			text=text.split('');
			this.timer=setInterval(function(){
				text.push(text.shift());
				fn.call(text.join(''));
			},this.time);

		},
		'roll_content':function(arr,obj){
			var __this__=this;
			if(this.empty(obj.select) || !this.is_numeric(obj.select)) {
				alert('出错了,参数填的不规范！');
				return false;
			}
			var select=obj.select,
				//html  =obj.html,
				fn 	  =obj.fn || this.fn;
			arr =arr || this.arr;
			if(!arr){
				alert('出错了,参数填的不完整！');
				return false;
			}


			this.timer=setInterval(function(){
				switch(select){
					case 0://从右往左走
						var first=arr.shift();
						arr.push(first);
						if(System.isFunction(fn)){
							__this__.arr=arr;
							fn.call(first,arr);
						}
						break;
					case 1://从左往右走
						var last=arr.pop();
						arr.unshift(last);
						if(System.isFunction(fn)){
							__this__.arr=arr;
							fn.call(last,arr);
						}
						break;
					default:
						return false;
				}

			},this.time);



		},
		'stop':function(){
			clearInterval(this.timer);

		},
		'run':function(){
			this.roll_content(this.arr,this);
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Roll对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	System['Roll']=Roll;

});
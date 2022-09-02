
/**
 * 创建人：lhh
 * 创建日期:2016－6－17
 * 修改日期:2022－9－1
 * 名称：Widget
 * 功能：
 * 说明 : 小部件，
 *        
 * note : 
 * 		  
 *		
 * 
 */
(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Widget = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Widget :
		typeof define === 'function' && define.amd ? define(factory) : System.Widget = Widget;
		System.export("System.base.Widget", Widget);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Html','Widget',System.classPath+'/base');
	var Html = System.require("System.base.Html");

	var __this__=null;

	var Widget = Html.extend({
		constructor: function () {
			this.base();
			__this__ = this;
		},
		'_className':'Widget',
		/**
		 *
		 * @author lhh
		 * 产品介绍：输入框
		 * 创建日期：2016-7-7
		 * 修改日期：2016-7-7
		 * 名称：input
		 * 功能：在注销Widget对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'input':function(){},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Widget对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});

	return Widget;
});




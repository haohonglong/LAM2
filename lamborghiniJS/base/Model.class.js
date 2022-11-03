(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Model = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Model :
		typeof define === 'function' && define.amd ? define(Model) : System.Model = Model;
		System.export("lam.base.Model", Model);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Component','Model',System.classPath+'/base');
	var Component = System.require("lam.base.Component");

	var __this__=null;
	var Model = Component.extend({
		constructor: function () {
			this.base();
			__this__ = this;
		},
		'_className':'Model',
		'__constructor':function(){},




		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2020-5-13
		 * 修改日期：2020-5-13
		 * 名称：destructor
		 * 功能：在注销Model对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});


    return Model;
});





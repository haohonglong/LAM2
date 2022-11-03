(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Error = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Error :
		typeof define === 'function' && define.amd ? define(Error) : System.Error = Error;
		System.export("lam.base.Error", Error);
	}

})(this,function(System){
	//'use strict';
	System.is(System,'Component','Error',System.classPath+'/base');
	var Component = System.require("lam.base.Component");
	var __this__=null;
	var Error = Component.extend({
		constructor: function(error, message, path, line){
			this.base();
			__this__=this;
			this.error = null;
			this.e_type = null;
			this.e_message = null;
			this.stack = null;
			if(error) {
				this.error = error;
				this.e_type = error.name;
				this.e_message = error.message;
				this.stack = error.stack;
			}
			
			this.message = message;
			this.path = path;
			this.line = line;

			// throw new Error(this.getMessage());
            // System.View.ERROR_404(404, this.getMessage());

		},
		'_className':'Error',
		'__constructor':function(){},
		'getMessage':function(){
			var str = "";
			str += " [" + (new Date()).format("yyyy-M-d h:m:s") + "]";
			if (this.e_type) str += " [error type : " + this.e_type + "]";
			str += " [custom message : " + this.message  + "]";
			if (this.e_message) str += " [error message: " + this.e_message + "]";
			str += " [path : " + this.path + "]";
			str += " [line : " + this.line + "] <br>\n\r";
			if(this.stack) str += " [stack : " + this.stack + "] <br />";

			var func = null;
			if(window && window.onerror && window.onerror.caller) func = window.onerror.caller;
			
			var index = 1;
			while (System.isset(func)) {
				str += "第" + index + "个函数：" + func + "\n\r <br />";
				str += "第" + index + "个函数：参数表：";
				for(var i=0; i < func.arguments.count; i++){
					str += func.arguments[i] + ",";
				}
				str += func;
				str += "\n===================\n";
				func = func.caller;
				index++;
			}
			return str + "<br />\r\n";
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Error对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	return Error;
});



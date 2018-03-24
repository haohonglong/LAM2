(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Error'] = factory(System));
	}

})(this,function(System){
	//'use strict';
	System.is(System,'Component','Error',System.classPath+'/base');
	var __this__=null;
	var Error = System.Component.extend({
		constructor: function(sMessage, sUrl, sLine){
			this.base();
			__this__=this;
			this.sMessage=sMessage;
			this.sUrl=sUrl;
			this.sLine=sLine;

		},
		'_className':'Error',
		'__constructor':function(){},
		//注意：onerror事件必需在此网页中其它Javascript程序之前！
		'reportError':function(){
			var str = "";
			str += " 错误信息:" + this.sMessage + "\n";
			str += " 错误地址:" + this.sUrl + "\n";
			str += " 错误行数:" + this.sLine + "\n";
			str += "<=========调用堆栈=========>\n";
			var func = window.onerror.caller;
			var index = 1;
			while (func != null) {
				str += "第" + index + "个函数：" + func + "\n";
				str += "第" + index + "个函数：参数表：";
				for(var i=0;i<func.arguments.count;i++){
					str += func.arguments[i] + ",";
				}
				str += func;
				str += "\n===================\n";
				func = func.caller;
				index++;
			}
			return true;
		},
		'message':function(sMessage){
			this.sMessage=sMessage;
		},
		'set_line':function(sLine){
			this.sLine=sLine;
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
		'destructor':function(){

		}
	});

	return Error;
});



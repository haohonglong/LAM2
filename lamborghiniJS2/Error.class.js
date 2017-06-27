
window[GRN_LHH].run([window],function(window,undefined){

	var System=this;
	System.is(System,'Component','Error');

	var __this__=null;
	var Error = System.Component.extend({
		constructor: function(sMessage, sUrl, sLine){
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

	System['Error']= Error;

});


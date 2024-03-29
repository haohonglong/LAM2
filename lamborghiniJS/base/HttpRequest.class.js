
/**
 * 创建人：lhh
 * 创建日期:2018－10－28
 * 修改日期:2022－9－1
 * 名称：HttpRequest
 * 功能：
 * 说明 : http
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
		var HttpRequest = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = HttpRequest :
		typeof define === 'function' && define.amd ? define(HttpRequest) : System.HttpRequest = HttpRequest;
		System.export("lam.base.HttpRequest", HttpRequest);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Component','HttpRequest',System.classPath+'/base');
	var Component = System.require("lam.base.Component");

	var __this__=null;

	var HttpRequest = Component.extend({
		constructor: function () {
			this.base();
			__this__ = this;
		},
		'_className':'HttpRequest',

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销HttpRequest对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});

    /**
     * @author lhh
     * 产品介绍：
     * 创建日期：2015-6-25
     * 修改日期：2018-4-18
     * 名称：HttpRequest.get
     * 功能：根据指定的url参数获取相对应的参数值
     * 说明：
     * 注意：
     * @param   (String)name            NO NULL :参数名称
     * @return  {String}
     *
     */
    HttpRequest.get=function(name){
        return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || null;

    };

    HttpRequest.post=function(){};
    HttpRequest.put=function(){};
    HttpRequest.delete=function(){};
    HttpRequest.redirect=function(url){
    	window.location = url;
	};

    System.merge(null,[{
    	 'get':HttpRequest.get
    	,'redirect':HttpRequest.redirect
	}],true);

	return HttpRequest;
});




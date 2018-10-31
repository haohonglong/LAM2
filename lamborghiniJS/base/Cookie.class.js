/**
 * 创建人：lhh
 * 创建日期：2016-12-8
 * 修改日期：2018-5-16
 * 名称：Cookie
 * 功能：cookie
 * 说明 :
 *
 * note :
 * example:
 *
 *
 *
 *
 */
(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Cookie = factory(System);
		System['Cookie'] = new Cookie();
	}

})(this,function(System){
	'use strict';
	System.is(System,'Browser','Cookie',System.classPath+'/base');
	var __this__=null;
	var Cookie = System.Browser.extend({
		constructor: function() {
			this.base();
			__this__=this;
		},
		'_className':'Cookie',
		'__constructor':function(){},
		'setItem':function(s){
			if(!System.isString(s)) {
				return JSON.stringify(s);
			}
			return escape(s);
		},
		'getItem':function(s){
			if(System.isJson(s) || s.toString().trim().match(/^\[\{/)) {
				return JSON.parse(s);
			}
			return unescape(s);
		},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-12-8
		 * 修改日期：2017-11-10
		 * 名称：cookie
		 * 功能：cookie添加或读取
		 * 说明：一个参数是读，一个以上的是添加
		 * 其中第一、二两个参数分别为cookie项的名称和值。
		 * 如果想为其设置一个过期时间，那么就需要设置第三个参数，
		 * 这里需要通过getExpDate()获得一个正确格式的参数。
		 * 注意：
		 *
		 * @param name{String}
		 * @param value
		 * @param D{json}
		 * @returns {*}
		 */
		'cookie':function(name, value, D){
			if(1 === arguments.length){
				return this.get(name);
			}else{
				this.set(name, value, D);
			}
		},
		'set':function(name, value, D){
			D = D || {};
			document.cookie = name + "=" + (this.setItem(value)) +
				((D.expires) ? "; expires=" + D.expires : "") +
				((D.path) ? "; path=" + D.path : "") +
				((D.domain) ? "; domain=" + D.domain : "") +
				((D.secure) ? "; secure" : "");
		},
		'get':function(name){//获取Cookie
			var value='';
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(System.isset(arr) && System.isArray(arr)) {
				value = this.getItem(arr[2]);
			}else{
				var cookies=document.cookie.split("; ");
				for(var i=0,len=cookies.length;i<len;i++){
					arr=cookies[i].split('=');
					if(arr[0] === name) {
						value = this.getItem(arr[1]);
						break;
					}
				}
			}
			return value || null;
		},
		'getExpDate':function(timestamp){
            var d = new Date();
            d.setTime(timestamp);
			return d.toUTCString();
		},
		'remove':function(name){//
			var cval=this.cookie(name);
			if(cval!=null) document.cookie= name + "="+cval+";expires="+this.getExpDate(System.timestamp()-1);
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Cookie对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});
    /**
     * @author lhh
     * 产品介绍：
     * 创建日期：2018-10-13
     * 修改日期：2018-10-13
     * 名称：Cookie.get
     * 功能：cookie获取
     * 说明：
     * 注意：
	 * 获取cookie
     * @param name
     * @returns {*}
     */
	Cookie.get=function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }
        return null;
    };

	return Cookie;
});




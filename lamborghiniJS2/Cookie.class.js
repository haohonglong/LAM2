
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Cookie');

	var __this__=null;
	var document=window.document;
	var Cookie = System.Browser.extend({
		constructor: function() {
			__this__=this;
		},
		'_className':'Cookie',
		'__constructor':function(){},

		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2016-12-8
		 * 修改日期：2016-12-8
		 * 名称：cookie
		 * 功能：创建cookie
		 * 说明：
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
			D = D || {};
			if(1 === arguments.length){
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null) return unescape(arr[2]); return null;
			}else{
				document.cookie = name + "=" + escape(value) +
					((D.expires) ? "; expires=" + D.expires : "") +
					((D.path) ? "; path=" + D.path : "") +
					((D.domain) ? "; domain=" + D.domain : "") +
					((D.secure) ? "; secure" : "");
			}

		},
		'getCookie':function(name){//获取Cookie
			var cookies=document.cookie.split("; ");
			for(var i=0,c,len=cookies.length;i<len;i++){
				c=cookies[i].split('=');
				if(c[0]==name)
					return decodeURIComponent(c[1]);
			}
			return '';
		},
		'getCookie_2':function(name){
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			if(i<clen){
				while(i < clen){
					var j = i + alen;
					if (document.cookie.substring(i, j) == arg)
					{
						return this.getCookieVal(j);
					}
					i = document.cookie.indexOf(" ", i) + 1;
					if(i == 0) return false;
				}
			}else{
				return false;
			}
			return;
		},
		'getCookieVal':function(offset){
			var endstr = document.cookie.indexOf(";", offset);
			if(endstr == -1)
			{
				endstr = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, endstr));
		},
		'getExpDate':function(days, hours, minutes){
			var expDate = new Date();
			if(typeof(days) == "number" && typeof(hours) == "number" && typeof(hours) == "number")
			{
				expDate.setDate(expDate.getDate() + parseInt(days));
				expDate.setHours(expDate.getHours() + parseInt(hours));
				expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
				return expDate.toGMTString();
			}
		},
		'removeCookie':function(name){//
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=this.cookie(name);
			if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
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

	System['Cookie']=new Cookie();

});



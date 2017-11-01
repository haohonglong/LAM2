/**
 *
 * @author lhh
 * 产品介绍：创建一个XMLHTTP 对象
 * 创建日期：2016-10-17
 * 修改日期：2017-11-1
 * 名称：LAMJS.Xhr
 * 功能：
 * 说明：
 * 注意：
 * @return  ()						:
 * Example：
 */
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Xhr');
	var __this__=null;
	// Functions to create xhrs
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}

	function createActiveXHR() {
		try {
			return new window.ActiveXObject( "Microsoft.XMLHTTP" );
		} catch( e ) {}
	}



	var Xhr = System.Browser.extend({
		constructor: function () {
			this.base();
			__this__ = this;
			this.xhr =null;
		},
		'_className':'Xhr',
		'__constructor':function(){},
		/**
		 *
		 * @returns {null|*}
		 */
		'getXHR':function(){
			if(!this.xhr){
				this.xhr = Xhr.getXMLHttpRequest();
			}
			return this.xhr;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2016-10-7
		 * 修改日期：2016-10-7
		 * 名称：destructor
		 * 功能：在注销Xhr对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
	Xhr.getXMLHttpRequest=function() {
		if (window.XMLHttpRequest && !("file:" === window.location.protocol && ("ActiveXObject" in window))){
			return createStandardXHR();
		}
		try {
			return createActiveXHR();
		} catch (e) {
			throw new Error("browser doesn't support AJAX."+e.name);
		}
	};
	Xhr.Accept ={
		 "text":"text/plain"
		,"html":"text/html"
		,"xml":"application/xml, text/xml"
		,"json":"application/json, text/javascript"
		,"script":"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	};
	var XHR = Xhr.getXMLHttpRequest();
	function ajax(url,D){
		var defaults={
			type:'GET',
			data:{},
			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
			dataType:'text',
			async:true,
			success:function(){},
			error:function(){}
		};
		D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
		var myAjax = {
			// XMLHttpRequest IE7+, Firefox, Chrome, Opera, Safari ；  ActiveXObject IE6, IE5
			xhr:XHR,
			type:D.type,
			data:D.data,
			contentType:D.contentType,
			dataType:D.dataType,
			async:D.async,
			success:D.success,
			error:D.error,
			get: function () {
				this.xhr.open('get', url,this.async);
				this.onreadystatechange();
				this.xhr.send(null);
			},
			post: function () {
				this.xhr.open('post', url,this.async);
				this.onreadystatechange();
				this.xhr.send(this.data);
			},
			onreadystatechange: function () {
				this.xhr.setRequestHeader('Content-Type', this.contentType);
				this.xhr.setRequestHeader('Accept', Xhr.Accept[this.dataType]);
				var xhr = this.xhr;
				var self = this;
				xhr.onreadystatechange = function () {
					switch(xhr.readyState){
						case 0 :
							if(System.LAM_DEBUG){console.log(0,'未初始化....');}
							self.error(xhr.responseText);
							break;
						case 1 :
							if(System.LAM_DEBUG){console.log(1,'请求参数已准备，尚未发送请求...');}
							self.error(xhr.responseText);
							break;
						case 2 :
							if(System.LAM_DEBUG){console.log(2,'已经发送请求,尚未接收响应');}
							self.error(xhr.responseText);
							break;
						case 3 :
							if(System.LAM_DEBUG){console.log(3,'正在接受部分响应.....');}
							self.error(xhr.responseText);
							break;
						case 4 :
							if(System.LAM_DEBUG){console.log(4,'响应全部接受完毕');}
							if (200 == xhr.status) {
								self.success(xhr.responseText);
								if('script' === self.dataType){
									var script = document.createElement("script");
										script.type = "text/javascript";
										script.text = xhr.responseText;
										document.body.appendChild(script);
										document.body.removeChild(script);
								}
							}else{
								self.error(xhr.responseText);
							}
							break;
					}

				}
			}
		};
		myAjax.data = (function(json){ // 转成post需要的字符串.
			var arr = [];
			for(var k in json){
				arr.push(k,'=',json[k],'&');
			}
			arr.pop();
			return arr.join('');
		})(myAjax.data);

		if('post' === myAjax.type.toLowerCase()){
			myAjax.post();
		}else{
			myAjax.get();
		}

		return myAjax;
	}

	Xhr.ajax = ajax;

	System['Xhr']=Xhr;

});


/**
 *
 * @author lhh
 * 产品介绍：创建一个XMLHTTP 对象
 * 创建日期：2016-10-17
 * 修改日期：2017-11-3
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
	var allTypes = "*/".concat( "*" );
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
		constructor: function (url,D) {
			this.base();
			__this__ = this;
			var defaults = {
				xhr:Xhr.getXMLHttpRequest(),
				type:"GET",
				data:{},
				contentType:"application/x-www-form-urlencoded; charset=UTF-8",
				dataType:"text",
				async:true,
				user:"",
				password:"",
				success:function(){},
				error:function(){}
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			this.D = D;
			this.url         = url;
			this.xhr         = D.xhr;
			this.type        = D.type;
			this.data        = D.data;
			this.contentType = D.contentType;
			this.dataType    = D.dataType;
			this.async       = D.async;
			this.user        = D.user;
			this.password    = D.password;
			this.success     = D.success;
			this.error       = D.error;

			this.check();
			this.parseJson();
			if('post' === this.type.toLowerCase()){
				this.post();
			}else{
				this.get();
			}
		},
		'_className':'Xhr',
		'__constructor':function(){},
		'check':function(){
			if(!System.isset(this.success) || !System.isFunction(this.success)){this.success = function(){};}
			if(!System.isset(this.error)   || !System.isFunction(this.error)){this.error = function(){};}
		},
		'parseJson':function(json){
			json = json || this.data;
			var arr = [];
			for(var k in json){
				arr.push(k,'=',json[k],'&');
			}
			arr.pop();
			this.data = arr.join('');
		},
		/**
		 *
		 * @returns {null|*}
		 */
		'getXHR':function(){return this.xhr;},
		'get': function () {
			this.xhr.open('get', this.url,this.async,this.user,this.password);
			this.ready();
			this.xhr.send(null);
		},
		'post': function () {
			this.xhr.open('post', this.url,this.async,this.user,this.password);
			this.ready();
			this.xhr.send(this.data);
		},
		'ready':function(){
			this.xhr.setRequestHeader('Content-Type', this.contentType);
			this.xhr.setRequestHeader('Accept', Xhr.ajaxSettings.accepts[this.dataType]);
			this.xhr.onreadystatechange = this.onreadystatechange();
		},
		'loadScript':function(text){
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.text = text;
			document.body.appendChild(script);
			document.body.removeChild(script);
		},
		'onreadystatechange': function () {
			var self = this;
			var xhr = this.xhr;
			return function(){
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
						if (200 === xhr.status || 0 === xhr.status) {
							switch (self.dataType){
								case 'text':
									self.success(xhr.responseText);
									break;
								case 'html':
									self.success(xhr.responseText);
									break;
								case 'xml':
									self.success(xhr.responseXML);
									break;
								case 'json':
									self.success(System.eval(xhr.responseText));
									break;
								case 'script':
									self.loadScript(xhr.responseText);
									self.success(xhr.responseText);
									break;
								default :
									self.success(xhr.responseText);
							}
						}else{
							self.error(xhr.responseText);
						}
						break;
				}
			};
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
			System.error("browser doesn't support AJAX."+e.name);
		}
	};
	Xhr.ajaxSettings ={
		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},
		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},
		'accepts':{
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript",
			script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		}
	};
	Xhr.ajax = function(url,D){
		return new Xhr(url,D);
	};
	Xhr.getScript= function( url, callback ) {
		return Xhr.get( url, undefined, callback, "script" );
	};
	System.each( [ "get", "post" ], function( i, method ){
		Xhr[ method ] = function( url, data, callback, type ) {
			// shift arguments if data argument was omitted
			if (System.isset(data) && System.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
			return Xhr.ajax(url,{
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});

	System['Xhr']=Xhr;
});


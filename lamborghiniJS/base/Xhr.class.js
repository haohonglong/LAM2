/**
 *
 * @author lhh
 * 产品介绍：创建一个XMLHTTP 对象
 * 创建日期：2016-10-17
 * 修改日期：2018-9-4
 * 名称：LAMJS.Xhr
 * 功能：
 * 说明：
 * 注意：
 * @return  ()						:
 * Example：
 */
(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		System['Xhr'] = factory(System);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Browser','Xhr',System.classPath+'/base');
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
                beforeSend:function(XHR,Xhr){},
				error:function(){}
			};
			D = System.isPlainObject(D) ? System.merge(System.createDict(),[D,defaults]) : defaults;
			this.D = D;
			this.url         = url;
			this.xhr         = D.xhr;
			this.type        = D.type;
			this.data        = D.data;
			this.contentType = D.contentType;
			this.dataType    = D.dataType;
			this.async       = System.isBoolean(D.async) ? D.async : true;
			this.user        = D.user;
			this.password    = D.password;
			this.beforeSend  = D.beforeSend;
			this.success     = D.success;
			this.error       = D.error;

			this.check();
			this.parseJson();
            this.beforeSend(this.xhr,this);
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
		'parseJson':function(){
			if(System.isString(this.data)){return;}
			this.data = System.http_build_query(this.data);
		},
		/**
		 *
		 * @returns {null|*}
		 */
		'getXHR':function(){return this.xhr;},
		'get': function () {
			this.xhr.open('GET', this.url,this.async,this.user,this.password);
			this.ready();
			this.xhr.send();
		},
		'post': function () {
			this.xhr.open('POST', this.url,this.async,this.user,this.password);
			this.ready();
			this.xhr.send(this.data);
		},
		'ready':function(){
			this.xhr.setRequestHeader('Content-Type', this.contentType);
			this.xhr.setRequestHeader('Accept', Xhr.ajaxSettings.accepts[this.dataType]);
			this.xhr.onreadystatechange = this.onreadystatechange();
		},
		'loadScript':function(data){
			var src = this.url;
			if(!System.fileExisted(src)) {
				System.globalEval(data);
				if(System.isClassFile(src)){System.classes.push(src);}
				System.files.push(src);
			}
			return this;
		},
		'onreadystatechange': function () {
			var self = this;
			var xhr = this.xhr;
			return function(){
				if ((200 === xhr.status) && (4 === xhr.readyState)) {
					switch (self.dataType){
						case 'json':
							self.success(System.eval(xhr.responseText), xhr.status, xhr);
							break;
						case 'script':
							self.loadScript(xhr.responseText).success(xhr.responseText,xhr.status,xhr);
							break;
						default :
							self.success(xhr.responseText, xhr.status, xhr);
					}
				}else{
					self.error(xhr, xhr.status);
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
			script: /\b(?:java|ecma)script\b/,
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
	Xhr.getScript = function( url, callback ) {
		return Xhr.get( url, {
			dataType: "script",
			data: undefined,
			async: false,
			success: callback
		});
	};

	Xhr.getJSON = function( url, data, callback ) {
		return Xhr.get( url, {
			dataType: "json",
			data: data,
			success: callback
		});
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-12-28
	 * 修改日期：2018-1-17
	 * 名称：Xhr.import
	 * 功能：include指定的js文件
	 * 说明：System 参数不用传
	 * 注意：
	 * @param   (Array)url 			    NO NULL :要加载js文件
	 * @param   (String|Boolean)baseUrl 		   NULL :文件路径
	 * @param   (String)suffix 		       NULL :文件后缀名
	 * @returns {Xhr}
	 * Example：
	 */
	Xhr.import = function(url,baseUrl,suffix){
		if(System.isString(url)){
			var str = url;
			url = [];
			url.push(str);
		}
		if(!System.isArray(url) || System.arr_isEmpty(url)){
			return Xhr;
		}else{
			suffix = suffix || '.js';
			baseUrl = System.isset(baseUrl) ? baseUrl : System.ROOT;
			url.each(function(){
				var src=this;
				src = System.Loader.suffix_checkor(src,suffix);
				src = baseUrl ? baseUrl+src : src;
				if(!System.fileExisted(src)) {
					Xhr.getScript(src);
					if(System.isClassFile(src)){System.classes.push(src);}
					System.files.push(src);
				}
			});
		}
		return Xhr;
	};
	System.each( [ "get", "post" ], function( i, method ){
		Xhr[ method ] = function( url, D) {
			return Xhr.ajax(url,{
				type: method,
				dataType: D.dataType,
				data: D.data,
				async: D.async,
				success: D.success
			});
		};
	});

	return Xhr;
});



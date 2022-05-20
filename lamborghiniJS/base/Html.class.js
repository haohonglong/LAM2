(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Html'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Dom','Html',System.classPath+'/base');

	var FILEPATH = System.classPath+'/base/Html.class.js';

	System.listen(function () {
		if(System.isFunction(System.import)){
            System.import(['/Md5.class', '/Template.class'],System.classPath+'/base');
            if(System.LAM_ENV_DEV){
                System.import(['/Cache.class'],System.classPath+'/base');
			}else{
                System.import(['/Cache.class','/Storage.class'],System.classPath+'/base');
			}
			return true;
		}
    },1);

    var sAttribute   = System.Config.render.default.script.Attribute,
        cAttribute = System.Config.render.default.css.Attribute,
        Cache = null;
    function getCache(name){
        if(!Cache){
        	try{
                if(System.LAM_ENV_DEV){
                    Cache = new System.Cache(
                    	 name || 'template'
                        ,System.configure_cache.expires || 0);
                }else{
                    Cache = new System.Storage(
                    	 name || 'template'
                        ,System.configure_cache.type || sessionStorage
						,System.configure_cache.expires || 0);
                }
			}catch (e){
                throw e;
            }


        }
        return Cache;
    }

	var temp = new System.Template();
    function ajax_success_callback(data, textStatus, jqXHR) {
        temp.setData(this.tpData);
        temp.setDelimiters(this.delimiters);
        data = temp.parse(data);

        if(System.isFunction(this.capture)){data = this.capture(data);}
        if(parseInt(this.repeat) > 1 && System.isString(data)){data = this.loop(data);}
        if(this.success && System.isFunction(this.success)){
            this.success(data,textStatus,jqXHR);
        }else{
            if(this.$dom){
                this.$dom.after(data).remove();
            }
        }
    }

	var __this__=null;
	var Html = System.Dom.extend({
        /**
         *
         * @author: lhh
         * 产品介绍：
         * 创建日期：2016-1-15
         * 修改日期：2022-3-31
         * 名称： getFile
         * 功能：返回指定的文件
         * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
         * 注意：
         * @param 	(jQuery)$dom             	   NO NULL :
         * @param 	(Object)D                	   NO NULL :json 数据
         * @param 	(String)  	D.type             NO NULL :获取方式
         * @param 	(String)  	D.dataType         NO NULL :获取文件类型
         * @param 	(String)  	D.contentType      	  NULL :设置编码等
         * @param 	(String)  	D.url         	      NULL :请求地址
         * @param 	(String)  	D.url_404         	  NULL :404默认地址
         * @param 	(String)  	D.jump         	      NULL :404页面是否独立一个页面打开
         * @param 	(String|{}) D.data             	  NULL :请求地址的参数
         * @param 	(JSON) 		D.tpData               NULL :分配模版里的数据
         * @param 	(Array) 	D.delimiters          NULL :模版分隔符
         * @param 	(Number) 	D.repeat          	  NULL :模版循环次数(测试用)
         * @param 	(Boolean) 	D.async               NULL :是否异步加载
         * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
         * @param 	(Function)	D.beforeSend       	  NULL :在发送数据之前执行的方法
         * @param 	(Function)	D.capture       	  NULL :可以在第一时间捕获返回的数据字符串，处理修改后返回
         * @param 	(Function)	D.success       	  NULL :
         * @param 	(Function)	D.error       	  	  NULL :
         * @param 	(Function)	D.done       	  	  NULL :
         * @param 	(Function)	D.preform       	  NULL :
         * @return (void)
         * Example：
         *
         */
		constructor: function($dom,D) {
			this.base();
			__this__=this;
			var _this = this;
			this.symbol=[];
            //如果第一个是对象且不是jQuery对象
            if ($dom && System.isObject($dom) && System.isPlainObject($dom) && !System.is_instanceof_jQuery($dom)) {
                D = $dom;
                $dom = null;
            }

            this.$dom = $dom;
            this.dataType 	 = $dom && $dom.attr('dataType') 											|| D&&D.dataType 	||	"text";
            this.contentType = $dom && $dom.attr('contentType') 										|| D&&D.contentType ||	"application/x-www-form-urlencoded; charset=UTF-8";
            this.file  		 = $dom && $dom.attr('file')  												|| D&&D.url         ||  null;
            this.file_404  	 = $dom && $dom.attr('file_404')  				    						|| D&&D.file_404    ||  System.ERROR_404;
            this.type  		 = $dom && $dom.attr('type')  												|| D&&D.type  	 	||	System.XHR.type  ||  "GET";
            this.repeat  	 = $dom && $dom.attr('repeat') 		&& parseInt($dom.attr('repeat'))		|| D&&D.repeat  	||	1;
            this.delimiters  = $dom && $dom.attr('delimiters') 	&& $dom.attr('delimiters').split(',')	|| D&&D.delimiters  ||	System.Config.templat.delimiters;
            this.tpData  	 = $dom && $dom.attr('tp-data') 	&& System.eval($dom.attr('tp-data'))	|| D&&D.tpData  	||	null;
            this.data  		 = $dom && $dom.attr('data') 		&& System.eval($dom.attr('data'))		|| D&&D.data  	 	||	{};
            this.jump  	     = $dom && $dom.attr('jump') 		&& eval($dom.attr('jump'))  			|| D&&D.jump        ||  null;
            this.async 		 = $dom && $dom.attr('async') 		&& eval($dom.attr('async'))				|| D&&D.async 		||  false;
            this.cache 		 = $dom && $dom.attr('cache') 		&& eval($dom.attr('cache')) 			|| D&&D.cache 		||	false;
            this.beforeSend  = $dom && $dom.attr('beforeSend') 	&& System.eval($dom.attr('beforeSend'))	|| D&&D.beforeSend	||	0 ;
            this.capture 	 = $dom && $dom.attr('capture') 	&& System.eval($dom.attr('capture'))    || D&&D.capture		||	0 ;
            this.success 	 = $dom && $dom.attr('success') 	&& System.eval($dom.attr('success'))	|| D&&D.success	    ||	0 ;
            this.error 	 	 = $dom && $dom.attr('error') 		&& System.eval($dom.attr('error'))		|| D&&D.error	    ||	0 ;
            this.done 	 	 = $dom && $dom.attr('done') 		&& System.eval($dom.attr('done'))		|| D&&D.done	    ||	function(){} ;
            this.preform 	 = $dom && $dom.attr('preform') 	&& System.eval($dom.attr('preform'))	|| D&&D.preform		||	0 ;
            this.file     = System.template(this.file);
            this.file_404 = System.template(this.file_404);
            if(System.isFunction(this.preform)){this.preform();}

		},
		'_className':'Html',
		'__constructor':function(){},
		'init':function () {
            return this;
        },
        'loop':function (S) {
            var s = '',total = this.repeat >= 1 ? this.repeat : 1;
            while((total--) > 0){s+=S;}
            return s;
        },
        'get':function(){
            var _this = this,url = this.file,n = url.indexOf('?');
            if(System.isFunction(System.Cache) && System.isset(this.file)) {
                getCache().find('id', System.Md5.md5(n > -1 ? url.substring(0,n).trim() : url.trim()), function (index, id) {//路径一定要抛弃?带的参数,才可以md5
                    var cache = this;
                    if (-1 === index) {
                        _this.ajax(function(data){
                        	cache.add({
			                    "path":url.trim(),
			                    "type":System.isJsFile(url) ? 'js' : '',
			                    "content":data
			                });
                        });
                    }else{
                        ajax_success_callback.call(_this, this.get(index).content, null, null);
                    }
                });
            }
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2019-06-19
         * 修改日期：2022-03-31
         * 名称： success_callback
         * 功能：
         * 说明：
         * 注意：
         * @param data			NO NULL:返回的数据
         * @param textStatus
         * @param jqXHR
         */
		'success_callback':function (data, textStatus, jqXHR, saveCache) {
            if (System.isFunction(saveCache)) saveCache(data);
            ajax_success_callback.call(this,data,textStatus,jqXHR);
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2019-06-19
         * 修改日期：2019-06-19
         * 名称： error_callback
         * 功能：
         * 说明：
         * 注意：
         * @param XMLHttpRequest
         * @param textStatus
         * @param errorThrown
         */
		'error_callback':function (XMLHttpRequest, textStatus, errorThrown) {
            switch(XMLHttpRequest.status) {
				case 404:
					throw new Error("the file '"+this.file+"' was not found");
	                break;
	            default:

	        }
            if(this.error && System.isFunction(this.error)){
                this.error(XMLHttpRequest, textStatus, errorThrown);
            }
        },
        'html':function(obj){},
        'ajax':function (func) {
		    var _this = this;
            if(System.isset(this.file)){
                jQuery
					.ajax(_this.file,{
						type : 	  _this.type,
						data :    _this.data,
						async:    _this.async ? true : false,
						cache:    _this.cache ? true : false,
						contentType:_this.contentType,
						dataType: _this.dataType,
						beforeSend:function(jqXHR,settings){
							if(System.isFunction(_this.beforeSend)){
								_this.beforeSend(jqXHR,settings);
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
                            _this.error_callback(XMLHttpRequest, textStatus, errorThrown);
						},
                        success: function(data,textStatus,jqXHR){
                            _this.success_callback(data, textStatus, jqXHR, func);
                        }
					})
					.done(_this.done);
            }
        },

		'empty':function(){},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：Tab
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	var getFile=function($dom,D){Html.init($dom,D);};
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2019-06-19
     * 修改日期：2019-06-19
     * 名称： Html.init
     * 功能：实例化Html 的派生类时重定义此方法，可使override方法生效，否则一直被实例化的是Html类
     * 说明：
     * 注意：
     * @param $dom
     * @param D
     */
	Html.init=function ($dom,D) {(new Html($dom,D)).init().get();};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-3-12
	 * 修改日期：2016-10-14
	 * 名称： Html.getFile
	 * 功能：获取文件的内容
	 * 说明：覆写System.getFile 方法
	 * 注意：
	 * @param 	(String)  	D.url         	      NULL :请求地址
	 * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @returns {System}
	 * Example：
	 *
	 */
	Html.getFile=function(url,callBack,D){
		if(!System.isString(url)){throw new Error("Warning :url 必须是请求文件的路径");}

		getFile(System.merge({
			'url':url,
			'success':callBack
		},[D || {}]));

		return System;

	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-10-14
	 * 修改日期：2016-10-26
	 * 名称： Html.getFiles
	 * 功能：返回指定的多个文件
	 * 说明：支持链式调用
	 * 注意：
	 * @param 	(Array)  	D.urls         	      NULL :请求地址
	 * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @returns {Html|*}
	 */
	Html.getFiles=function(urls,callBack,D){
		if(!System.isArray(urls)){throw new Error("Warning :url 必须是请求文件的路径(数组格式)");}
		System.each(urls,function(){
			if(!System.fileExisted(this)){
				if(System.isClassFile(this)){
					System.classes.push(this);
				}
				System.files.push(this);
				Html.getFile(this,callBack,D);
			}

		});
		return System.Html;

	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-9
	 * 修改日期：2017-8-30
	 * 名称： Html.analysisTpl
	 * 功能：只能在 link,a,img 这几种标签范围内查找，并解析带自定义属性'[data-var=tpl]'元素的标签 或自定义的
	 * 说明：
	 * 注意：
	 * @return {void}
	 * Example：
	 *
	 */
	Html.analysisTpl=function(){
		var custom_attr=System.Config.templat.custom_attr || '[data-var=tpl]';
		var value;
		if(-1 === custom_attr.indexOf('[')){
			value ='['+custom_attr+']';
		}else{
			value = custom_attr;
		}

		var $value = $(value);
		if(!$value){return;}
		$value.each(function(){
			var $this=$(this);
			var attr=null;
			var tag = this.nodeName;
			switch(tag){
				case "LINK":
				case "A":
					attr = attr || 'href';
				case "IMG":
				case "IFRAME":
					attr = attr || 'src';
					value=System.template($this.attr(attr));
					$this.attr(attr,value);
				default :
					value=System.template($this.html());
					$this.html(value);
			}

		});

	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-1-15
	 * 修改日期：2018-4-10
	 * 名称： Html.include
	 * 功能：html文件里包含另一个文件
	 * 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @param 	(Object)D                NO NULL :json 数据
	 * @param 	(Function)D.callBack       	NULL :返回到会调函数里的内容:this: 当前include 节点;content:include 的文件
	 * @return {void}
	 * Example：
	 *
	 */
	Html.include=function($dom,D,
                          success){
        success = D && D.callBack || 0;
		//如果第一个是对象且不是jQuery对象
		if ($dom && System.isObject($dom) && System.isPlainObject($dom) && !System.is_instanceof_jQuery($dom)) {
			D = $dom;
			$dom = null;
			getFile(D);
			return;
		}

		if(!$dom) return;

		$dom.each(function(){
			var dom =this;
			if(success && System.isFunction(success)){
                D.success =function(content){
                    success.call(dom,content);
                };
            }
            var jump = eval($(this).attr('jump'));
            var path = $(this).attr('location');
            if(jump && System.isset(path)){
                location.href = path;
            }
			getFile($(dom),D);
		});

	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-4-7
	 * 修改日期：2018-11-30
	 * 名称： Html.load
	 * 功能：html文件里包含另一个文件
	 * 说明：跟Html.include方法不一样的地方是 这里是包裹include的内容
	 * 注意：
	 * @param 	(jQuery)$dom             NO NULL :
	 * @return ()
	 * Example：
	 *
	 */
	Html.load=function($dom){
		$dom.each(function(){
			var $this =$(this);
            Html.getFile($this.attr('file'),function(content){
                $this.html(content);
            });

        });
	};



	Html.tag = System.tag;

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-10-26
	 * 名称： scriptFile
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)src      NO NULL : 路径
	 * @param 	(Object)Attr        NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.scriptFile=function(src,Attr){
		Attr = Attr || System.clone(sAttribute);
		return System.script(src,Attr);
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-10-26
	 * 名称： a
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)href   		NO  NULL : 连接地址
	 * @param 	(Object)Attr            NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.linkFile=function(href,Attr){
		if(!System.isString(href)){throw new Error('Warning: link 标签href参数必须是字符串！');}
		Attr = Attr || System.clone(cAttribute);
		Attr.href = href;
		return Html.tag(true,'link',Attr);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-10-25
	 * 名称： script
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)content      NO NULL : 内容
	 * @param 	(Object)Attr            NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.script=function(content,Attr){
		Attr = Attr || {};
		Attr.type = Attr.type || 'text/javascript';
		return Html.tag('script',Attr,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-10-25
	 * 名称： style
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String|Array)content     NO NULL : 内容
	 * @param 	(Object)Attr             	 NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.style=function(content,Attr){
		Attr = Attr || {};
		Attr.type = Attr.type || 'text/css';
		return Html.tag('style',Attr,content);
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-10-26
	 * 名称： a
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)href   			NO  NULL : 连接地址
	 * @param 	(String|Array)content      NULL : 内容
	 * @param 	(Object)Attr               NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.a=function(href,content,Attr){
		if(!System.isString(href)){throw new Error('Warning: a标签href参数必须是字符串！');}
		Attr = Attr || {};
		content = content || '';
		Attr.href = href;
		return Html.tag('a',Attr,content);
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-4
	 * 修改日期：2016-10-26
	 * 名称： img
	 * 功能：
	 * 说明：
	 * 注意：length 是关键字 属性里禁止使用
	 * @param 	(String)src      NO NULL : 图片 路径
	 * @param 	(Object)Attr        NULL : 标签的属性
	 * @return (String)
	 * Example：
	 *
	 */
	Html.img=function(src,Attr){
		if(!System.isString(src)){throw new Error('Warning: img标签src参数必须是字符串！');}
		Attr = Attr || {};
		Attr.src = src;
		return Html.tag(true,'img',Attr);
	};

    Html.code_map={
    	 '&' : '&#38'
    	,'"' : '&#34'
    	,"'" : '&#39'
    	,'>' : '&#62'
    	,'<' : '&#60'
	};
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-4-19
     * 修改日期：2018-4-19
     * 名称： Html.encode
     * 功能：html 转成实体
     * 说明：
     * 注意：
     * @param {String}target
     * @returns {string}
     * Example：
     *
     */
    Html.encode=function (target) {
        target = String(target);
    	return target
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');

	};
    /**
     *
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-4-19
     * 修改日期：2018-4-19
     * 名称： Html.decode
     * 功能：实体转成html
     * 说明：
     * 注意：
     * @param {String}target
     * @returns {string}
     * Example：
     *
     */
    Html.decode=function (target) {
        target = String(target);
        return target
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&') //处理转义的中文和实体字符
            .replace(/&#([\d]+);/g, function ($0, $1) {
				return String.fromCharCode(parseInt($1, 10));
            })
	};

	System.getFile = Html.getFile;


	return Html;
});


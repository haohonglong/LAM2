
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2018-8-27
 * 名称：模版类
 * 功能：用于对模版标签里内容操作，模版渲染
 * 说明 :
 *
 * note :
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
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Template'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Dom','Template',System.classPath+'/base');

	var __this__=null;
	var guid=0;
	var Template = System.Dom.extend({
		constructor: function(Config) {
			this.base();
			__this__=this;
			this.guid=0;
			guid++;
			this.html=[];
			this.Config = Config || System.Config;
			//模板分隔符
			this.delimiters  = this.Config.templat.delimiters;
		},
		'_className':'Template',
		'create':function(){},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-9
		 * 修改日期：2018-11-10
		 * 名称：compile
		 * 功能：编译模版标签
		 * 说明：
		 * 注意：
		 * @param (String)S 			NO NULL:要查找的字符串
		 * @param (Object)D 			NO NULL:对象模板中的数据
		 * @param (Array)delimiters     NULL:模板分隔符
		 * @returns {String}
		 */
		'compile':function(S,D,delimiters){
			var self=this;
			var arr=[],v=[],$1,$2;
            delimiters = delimiters || this.delimiters;
			var delimiterLeft  = delimiters[0];
			var delimiterRight = delimiters[1];
			//没找到模版分隔符就返回传入的字符串
			if(S.indexOf(delimiterLeft) !== -1){
				S.split(delimiterLeft).each(function(){
					if(-1 === this.indexOf(delimiterRight)){
						arr.push(this);
					}else{//如果每个里有模版标签
						v=this.split(delimiterRight);
						$1=v[0].trim();
						$2=v[1].trim();
						arr.push([self.analysis($1,D),self.compile($2,D)].join('').trim());
					}
				});
			}else{
				return S ||'';
			}
			return arr.join('');
		},
		'replace':function(){},
		'analysis':function(vars,D,
							k,
							v,
							root){
			if(-1 !== vars.indexOf('.')){
				v=vars.split('.');
				if((k=v[0]) in D ){
					root=D[k];
					v.each(function(i){
						if(i!=0){
							root=root[this];
						}
					});
					return root;
				}
                if(v = System.eval(vars)){return v;}
			}else{
				if((k=vars) in D){
					return D[k];
				}
			}
			throw new Error(['Warning: 数据里没有分配',vars,'这个值'].join(' '));
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-10
		 * 修改日期：2016-4-7
		 * 名称：render
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param {String}view 			NO NULL	:指定渲染的页面路径
		 * @param {Object}D	    		NO NULL	:渲染到模版中的数据
		 * @param {Function}callBack 	   NULL :参数：(解析后模板字符串)
		 * @param {Object}Cajax	    	NO NULL	:设置Ajax参数
		 * @returns {void}
		 */
		'render':function(view,D,callBack,Cajax){
			var self=this,S;
			System.Html.getFile(view,function(content){
				S=self.compile(content,D);

				if(System.isFunction(callBack)){
					callBack(S);
				}else{
					System.print(S);
				}

			},Cajax);
			this.guid++;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Template对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});


	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-03-8
	 * 修改日期：2017-03-3
	 * 名称：Template.analysisVar
	 * 功能：解析变量
	 * 说明：
	 * 注意：
	 * @param vars
	 * @returns {var}
	 */
	Template.analysisVar=function(vars,
								  v,
								  root){

		if(-1 === vars.indexOf('.')){
			return System.eval(vars);
		}

		v=vars.split('.');
		root=System.eval(v[0]);
		v.each(function(i){
			if(i!=0){
				root=root[this];
			}
		});

		return root;


	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-03-8
	 * 修改日期：2018-11-10
	 * 名称：Template.templat
	 * 功能：替换模版中的变量
	 * 说明：变量式：__root__ ; 对象式：System.__root__
	 * 注意：
	 * @param (String)S NO NULL:要匹配的变量
	 * @param (Array)delimiters    NULL:模板分隔符
	 * @returns {String}
	 */
	Template.template=function(S,delimiters){
		if(!S) return null;
		delimiters = delimiters || System.Config.templat.delimiters;
		var delimiterLeft  = delimiters[0];
		var delimiterRight = delimiters[1];
		//没找到模版分隔符就返回传入的字符串
		if(-1 === S.indexOf(delimiterLeft)){
			return S ||'';
		}
		var ss=S.split('/'),arr=[],v=[],v2=[],$1,$2,$3;

		ss.each(function(){
			if(-1 === this.indexOf(delimiterLeft)){
				arr.push(this);
			}else{//如果每个里有模版标签
				v=this.split(delimiterLeft);
				$1=v[0] ? v[0] : '';
				v2=v[1].split(delimiterLeft)[0].trim().split(delimiterRight);
				$2=v2[0].trim();
				$3=v2[1] ? v2[1].trim() :'';
				arr.push([$1,Template.analysisVar($2),$3].join('').trim());

			}
		});

		return arr.join('/');
	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-03-9
	 * 修改日期：2017-3-3
	 * 名称：Template.findTpl
	 * 功能：查找模版标签
	 * 说明：
	 * 注意：
	 * @param (String)S 		 NO NULL:要查找的字符串
	 * @param (Array)delimiters    NULL:模板分隔符
	 * @returns {String}
	 */
	Template.findTpl=function(S,delimiters){
		if(!S) return null;
		var ss=[],arr=[],v=[],$1,$2;
		delimiters = delimiters || System.Config.templat.delimiters;
		var delimiterLeft  = delimiters[0];
		var delimiterRight = delimiters[1];
		//没找到模版分隔符就返回传入的字符串
		if(S.indexOf(delimiterLeft) !== -1){
			ss=S.split(delimiterLeft);
			ss.each(function(){
				if(-1 === this.indexOf(delimiterRight)){
					arr.push(this);
				}else{//如果每个里有模版标签
					v=this.split(delimiterRight);
					$1=v[0];
					$2=v[1].trim();
					arr.push([Template.analysisVar($1),Template.findTpl($2,delimiters)].join('').trim());

				}

			});
		}else{
			return S ||'';
		}

		return arr.join('');

	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-03-9
	 * 修改日期：2016-10-18
	 * 名称：Template.replaceTpl
	 * 功能：替换模版标签
	 * 说明：替换多个属性的模版标签，标签属性，用数组方式传递
	 * 注意：
	 * @param (String)selector 		NO NULL:选择器
	 * @param (String|Array)attr_name 	NO NULL:标签属性
	 * @param (Function)callback 	   NULL:回调函数
	 * @returns {String}
	 */
	Template.replaceTpl=function(selector,attr_name,callback){
		var value;
		$(selector).each(function(){
			if(callback && System.isFunction(callback)){
				callback.call(this);
			}else{
				var $this=$(this);
				if(System.isArray(attr_name)){
					System.each(attr_name,function(){
						value=Template.template($this.attr(this));
						if(value && System.isString(value)){
							$this.attr(this,value);

						}
					});
				}else{
					value=Template.template($this.attr(attr_name));
					if(value && System.isString(value)){
						$this.attr(attr_name,value);

					}
				}


			}

		});
		return System;
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：获取容器里带模板标签的html 字符串 ，然后迭代解析后输出到指定标签里
	 * 创建日期：2016-10-22
	 * 修改日期：2018-8-22
	 * 名称：Template.foreach
	 * @param {String}template NO NULL:容器里带模板标签的html 字符串
	 * @param {Array}data		NO NUll:解析模板标签的数据
	 * @param {Array}delimiters	   NUll:模板分隔符
	 * @returns {string} 返回解析后的字符串
	 * Example：
	 * 			html:
	 * 				<div class="result"></div>

	 template:
	 <script type="text/template-foreach:.result">
	 <li sort:id="{{id}}">
	 <div><a href="{{href}}">{{title}}</a></div>
	 <img src="{{imgSrc}}" alt="{{title}}">
	 </li>

	 </script>

	 data:
	 [
	 {
        id : '1',
        title : 'php web appliaction',
        href : 'http://www.baidu.com',
        imgSrc : 'http://www.baidu.com'
    },
	 {
        id : '2',
        title : 'java web appliaction',
        href : 'http://www.baidu.com',
        imgSrc : 'http://www.baidu.com'
    }]

	 js:
	 document.querySelector('.result').innerHTML=(System.Template.foreach($('[type="text/template-foreach:.result"]').html(), data,['{{','}}']));
	 */
	Template.foreach=function(template, data,delimiters){
		var i = 0,
			len = data.length,
			fragment = '';
		for(; i < len; i++){
			fragment += Template.compiler(template,data[i],delimiters);
		}
		return fragment;
	};
    /**
     * 产品介绍：
     * 创建日期：2016-10-22
     * 修改日期：2018-11-10
     * 名称：Template.compiler
     * 功能：模版变量解析器
     * @param {String}template
     * @param {JSON}data
     * @param {Array}delimiters
     * @returns {String}
     */
	Template.compiler=function (template, data,delimiters) {
        delimiters = delimiters || System.Config.templat.delimiters;
        var L = delimiters[0],R = delimiters[1],t, key, reg;
        for(key in data){
            reg = new RegExp(L+'\\s*' + key + '\\s*'+R, 'g');
            t = (t || template).replace(reg, data[key]).trim();
        }
        return t || template;
    };
	Template.getGuid=function(){
		return guid;
	};
	var T = null;
    /**
     * 产品介绍：
     * 创建日期：2018-08-21
     * 修改日期：2018-08-21
     * 名称：Template.compile
     * 功能：解析模版标签
     * 说明：
     * 注意：
     * @param S
     * @param D
     * @param delimiters
     * @returns {*|String}
     */
	Template.compile=function(S,D,delimiters){
		if(!T){T = new Template();}
        return T.compile(S,D,delimiters);
	};

    var cache={};
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-08-21
     * 修改日期：2018-08-21
     * 名称：Template.include
     * 功能：预处理 引入外面的文件
     * 说明：
     * 注意：
     * @param S
     * @returns {String}
     */
	Template.jQCompile=function (S,D) {
        var fn = !/\W/.test(S) ?
            cache[S] = cache[S] ||
                Template.jQCompile(document.getElementById(S).innerHTML) :

            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                S
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        return D ? fn( D ) : fn;

    };
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-08-26
     * 修改日期：2018-08-27
     * 名称：Template.include
     * 功能：预处理 引入外面的文件
     * 说明：
     * 注意：
     * @param S
     * @returns {String}
     */
	Template.include=function (S) {
        var re = new RegExp('<#include (([\\s\\S])*?)/>','gm');
        var k,v;
        if (re.test(S)) {
            S.match(re).each(function(){
            	var _this = this;
                var data ={},arr = this.split('" ');
                var first =arr[0].split(' ')[1];//保存被丢失的第一个参数
                arr.removeAt(0);//remove <#include
                arr.unshift(first);//被丢失的第一个参数，添加到数组里第一个位置
                arr.removeAt(arr.length-1);
                arr.each(function(){
                    var arr = this.split('=');
                    arr[0] = arr[0].replace(/^"/,'').replace('"$','');
                    arr[1] = arr[1].replace(/^"/,'').replace('"$','');
                    k = System.camelCase(arr[0].trim());
                    v = arr[1];
                    switch(k){
						case 'capture':
						case 'preform':
						case 'beforeSend':
						case 'success':
						case 'done':
						case 'data':
						case 'tpData':
						case 'delimiters':
						case 'repeat':
						case 'error':
							v = System.eval(v);
					}
                    data[k] =  v;
                });
                System.Html.getFile(data.file,function(content){
                    S = S.replace(_this,content);
				},data);

            });
        }
        return S;
    };



	System.merge(null,[{
		'analysisVar':Template.analysisVar,
		'compiler':Template.compiler,
		'template':Template.template,
		'findTpl':Template.findTpl,
		'replaceTpl':Template.replaceTpl
	}]);

	return Template;
});

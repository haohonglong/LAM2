
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2016-10-30
 * 名称：模版类
 * 功能：用于对模版标签里内容操作，模版渲染
 * 说明 :
 *
 * note :
 *
 *
 *
 */

window[GRN_LHH].run(function(undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Template');


	var __this__=null;
	var guid=0;
	var Template = System.Browser.extend({
		constructor: function(Config) {
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
		 * 修改日期：2017-3-3
		 * 名称：find
		 * 功能：查找模版标签
		 * 说明：
		 * 注意：
		 * @param (String)S NO NULL:要查找的字符串
		 * @param (Object)D NO NULL:对象模板中的数据
		 * @returns {String}
		 */
		'find':function(S,D){
			var self=this;
			var ss=[],arr=[],v=[],$1,$2;
			var delimiterLeft  = this.delimiters[0];
			var delimiterRight = this.delimiters[1];
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

						arr.push([self.analysis($1,D),self.find($2,D)].join('').trim());

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
				S=self.find(content,D);

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
	 * 修改日期：2017-2-23
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
				$2=v2[0];
				$3=v2[1] ? v2[1] :'';
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
	 * 修改日期：2017-3-3
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
						},
						 {
							id : '3',
							title : 'python web appliaction',
							href : 'http://www.baidu.com',
							imgSrc : 'http://www.baidu.com'
						},
						 {
							id : '4',
							title : 'js 权威指南',
							href : 'http://www.qq.com',
							imgSrc : 'http://www.qq.com'
						}]

	 			js:
	 				document.querySelector('.result').innerHTML=(System.Template.foreach($('[type="text/template-foreach:.result"]').html(), data,['{{','}}']));
	 */
	Template.foreach=function(template, data,delimiters){
		delimiters = delimiters || System.Config.templat.delimiters;
		var delimiterLeft  = delimiters[0];
		var delimiterRight = delimiters[1];
		var i = 0,
			len = data.length,
			fragment = '';
		function replace(obj){
			var t, key, reg;
			for(key in obj){
				reg = new RegExp(delimiterLeft + key + delimiterRight, 'ig');
				t = (t || template).replace(reg, obj[key]);
			}
			return t;
		}
		for(; i < len; i++){
			fragment += replace(data[i]);
		}
		return fragment;
	};

	Template.getGuid=function(){
		return guid;
	};


	System.merge(null,[{
						'analysisVar':Template.analysisVar,
						'template':Template.template,
						'findTpl':Template.findTpl,
						'replaceTpl':Template.replaceTpl
	}]);

	System['Template']=Template;

});
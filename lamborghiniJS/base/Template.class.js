
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2018-12-24
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
	System.is(System,'Component','Template',System.classPath+'/base');
    System.listen(function () {
        if(System.isFunction(System.import)){
            System.import(['/Compiler.class'],System.classPath+'/base');
            System.import(['/Html.class'],System.classPath+'/base');
            return true;
        }
    },1);


	var __this__=null;
	var guid=0;
	var Template = System.Component.extend({
		constructor: function(compiler) {
			this.base();
			__this__=this;
			this.guid=0;
			guid++;
			this.compiler = compiler || System.Compiler.getInstance();
			this.html=[];
		},
		'_className':'Template',
		'create':function(){},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-10
		 * 修改日期：2019-6-18
		 * 名称：render
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param {String}path 			NO NULL	:指定渲染视图页面路径
		 * @param {Object}D	    		NO NULL	:渲染到模版中的数据
		 * @param {Function}callBack 	   NULL :参数：(解析后模板字符串)
		 * @param {Object}Cajax	    	NO NULL	:设置Ajax参数
		 * @returns {String}
		 */
		'render':function(path,D,callBack,Cajax){
			var self=this,view="";
			System.Html.getFile(path,function(content){
                view = self.compiler.compile(content,D);
				if(System.isFunction(callBack)){
					callBack(view);
					view = null;
				}

			},Cajax);
			this.guid++;
			return view;
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
	 * 修改日期：2018-12-12
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
			fragment += System.compiler(template,data[i],delimiters);
		}
		return fragment;
	};

	Template.getGuid=function(){
		return guid;
	};
    /**
     * 产品介绍：
     * 创建日期：2018-08-21
     * 修改日期：2018-12-14
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
        return System.Compiler.getInstance().compile(S,D,delimiters);
	};


    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-08-21
     * 修改日期：2019-2-3
     * 名称：Template.jQCompile
     * 功能：jQuery模版解析引擎
     * 说明：<script type="text/html" compiler="jQuery">
     * 注意：
     * @param S{String} NOT NULL 内容
     * @param D{Object} NOT NULL 分配的数据
     * @returns {String}
     */
	Template.jQCompile=function (S,D) {
        var re = new RegExp('(<script type="text/html" compiler="jQuery">)([\\s\\S]*?)(</script>)','gim');
        var arr = [];
        while((arr = re.exec(S)) && System.isArray(arr)){
            S = S.replace(arr[0],function () {
                return System.Compiler.jQCompile(arr[2],D);
            });
            re.lastIndex = 0;
		}
        return S;

    };
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-08-21
     * 修改日期：2018-12-1
     * 名称：Template.extract_script_tag
     * 功能：根据标签提取它及里面的内容
     * 说明：
     * 注意：
     * @param tag{String}   NOT NULL标签名称
     * @param S{String}     NOT NULL内容
     * @returns {Object}
     */
	Template.extract_by_tag=function(tag,S){
		var re = new RegExp('(<'+tag+'(.*?)>)(.|\\n)*?(</'+tag+'>)','gim');
        var tags = [];
        if (re.test(S)) {
            S.match(re).each(function(){
                tags.push(this);
                S = S.replace(this,function () {
                    return '';
                });
			});

        }
        return {'content':S,'tags':tags};
	};
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2019-3-11
     * 修改日期：2019-6-13
     * 名称：Template.layout
     * 功能：可方便在视图页面里指定layout模版,设置title,可向layout模版里传递数据
     * 说明：
     * 注意：
     * @param S
     * @returns {String}
     */
    Template.layout=function(S){var reg = new RegExp('(<#)(layout|extends) (([\\s\\S])*?) (/>)','gm');
        var k,v;
        var arr_inc = [];
        if((arr_inc = reg.exec(S)) && System.isArray(arr_inc)){
            var data ={},arr = arr_inc[3].split('" ');
            arr.each(function(){
                var arr = this.split('="');
                arr[0] = arr[0].replace(/(^")|("$)/g,'');
                arr[1] = arr[1].replace(/(^")|("$)/g,'');
                k = System.camelCase(arr[0].trim());
                v = arr[1];
                switch(k){
                    case 'data':
                        try{
                            if(!System.empty(v)){
                                v = System.eval(v);
                            }
                        }catch (e){
                            throw new Error(e);
                        }

                }
                data[k] =  v;

            });
            S = S.replace(arr_inc[0],function () {
                return '';
            });
            data.content = S;
            return data;
        }
        return null;
    },
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2019-3-13
	 * 修改日期：2019-3-13
	 * 名称：Template.define
	 * 功能：预处理 在模版里定义常量
	 * 说明：
	 * 注意：
	 * @param S
	 * @returns {String}
	 */
	Template.define=function (S) {
        var reg_inc = new RegExp('(<#define) ([\\S]+)="([\\S]+)" (/>)','gm');
        var k,v;
        var arr_inc = [];
        while((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)){
            k = arr_inc[2].replace(/(^")|("$)/g,'').trim();
            v = arr_inc[3].replace(/(^")|("$)/g,'').trim();
            S = S.replace(arr_inc[0],'').replace(new RegExp(k,'g'),v);
            reg_inc.lastIndex = 0;
        }
        return S;
    },
    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2018-11-27
     * 修改日期：2019-1-3
     * 名称：Template.include
     * 功能：预处理 递归查找include外面指定的文件
     * 说明：
     * 注意：
     * @param S
     * @returns {String}
     */
	Template.include=function (S) {
        var reg_inc = new RegExp('(<#include) (([\\s\\S])*?) (/>)','gm');
        var k,v;
        var arr_inc = [];
        while((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)){
            var data ={},arr = arr_inc[2].split('" ');
            arr.each(function(){
                var arr = this.split('="');
                arr[0] = arr[0].replace(/(^")|("$)/g,'');
                arr[1] = arr[1].replace(/(^")|("$)/g,'');
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
                        try{
                            if(!System.empty(v)){
                                v = System.eval(v);
                            }
                        }catch (e){
                            throw new Error(e);
                        }

                }
                data[k] =  v;
            });
            System.Html.getFile(data.file,function(content){
                S = S.replace(arr_inc[0],function () {
                    return content;
                });
            },data);
            reg_inc.lastIndex = 0;
        }
        return S;
    };



	System.merge(null,[{
		'analysisVar':Template.analysisVar,
		'template':Template.template,
		'findTpl':Template.findTpl,
		'replaceTpl':Template.replaceTpl
	}]);

	return Template;
});

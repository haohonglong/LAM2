
/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2020-5-27
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
            System.import(['/Cache.class'],System.classPath+'/base');
            System.import(['/Compiler.class'],System.classPath+'/base');
            System.import(['/Html.class'],System.classPath+'/base');
            return true;
        }
    },1);


	var __this__=null;
	var guid=0;
    var _cache = new System.Cache('block');
    var temp = null;

	var Template = System.Component.extend({
		constructor: function(cache,compiler) {
			this.base();
			__this__=this;
			this.guid=0;
			guid++;
			this.cache = cache || _cache;
			_cache = this.cache;
			this.compiler = compiler || System.Compiler.getInstance();
			this.define_reg    = new RegExp('<#define ([\\S]+)="([\\S]+)" />','gm');
			this.define2_reg   = new RegExp('^#define# (([\\s\\S])*?) (([\\s\\S])*?) #end#$','gm');
			this.include_reg   = new RegExp('<#include (([\\s\\S])*?) />','gm');
			this.import_reg    = new RegExp('<#import (([\\s\\S])*?) />','gm');
			this.layout_reg    = new RegExp('<#(layout|extends) (([\\s\\S])*?) />','gm');
			this.set_block_reg = new RegExp('<#(beginBlock|Block:begin) (([\\s\\S])*?)>(([\\s\\S])*?)<#(endBlock|Block:end)>', 'gm');
			this.get_block_reg = new RegExp('<#=block (([\\s\\S])*?) />','gm');
			this.escape_reg    = new RegExp('<!--Escape:begin-->(([\\s\\S])*?)<!--Escape:end-->','gm');
			this.del_reg   	   = new RegExp('<!--Del:begin-->(([\\s\\S])*?)<!--Del:end-->','gm');
            this.script_reg    = new RegExp('<!--Script:begin-->(([\\s\\S])*?)<!--Script:end-->', 'gm');
			this.html=[];
			this.datas = null;
			this.delimiters = null;
		},
		'_className':'Template',
		'create':function(){},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-10
		 * 修改日期：2020-5-8
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
			var view="";
			try{
                Cajax.tpData = D;
                System.Html.getFile(path,function(content){
                    view = content;
                    if(System.isFunction(callBack)){
                        callBack(view);
                        view = null;
                    }

                },Cajax);
                this.guid++;
                return view;
			}catch (e){
                throw new Error(e);
			}

		},

        /**
         *
         * @author: lhh
         * 产品介绍：
         * 创建日期：2016-03-8
         * 修改日期：2017-03-3
         * 名称：analysisVar
         * 功能：解析变量
         * 说明：
         * 注意：
         * @param vars
         * @returns {var}
         */
        'analysisVar':function(vars,
                                      v,
                                      root){
        	try{
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
			}catch (e){
                throw new Error(e);
			}


		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-8
		 * 修改日期：2018-11-10
		 * 名称：templat
		 * 功能：替换模版中的变量
		 * 说明：变量式：__root__ ; 对象式：System.__root__
		 * 注意：
		 * @param (String)S NO NULL:要匹配的变量
		 * @param (Array)delimiters    NULL:模板分隔符
		 * @returns {String}
		 */
		'template':function(S,delimiters){
			if(!S) return null;
			var self= this;
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
					arr.push([$1,self.analysisVar($2),$3].join('').trim());

				}
			});

			return arr.join('/');
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-9
		 * 修改日期：2017-3-3
		 * 名称：findTpl
		 * 功能：查找模版标签
		 * 说明：
		 * 注意：
		 * @param (String)S 		 NO NULL:要查找的字符串
		 * @param (Array)delimiters    NULL:模板分隔符
		 * @returns {String}
		 */
		'findTpl':function(S,delimiters){
			try{
                if(!S) return null;
                var self = this;
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
                            arr.push([self.analysisVar($1),self.findTpl($2,delimiters)].join('').trim());

                        }

                    });
                }else{
                    return S ||'';
                }

                return arr.join('');
			}catch (e){
                throw new Error(e);
            }


		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-03-9
		 * 修改日期：2016-10-18
		 * 名称：replaceTpl
		 * 功能：替换模版标签
		 * 说明：替换多个属性的模版标签，标签属性，用数组方式传递
		 * 注意：
		 * @param (String)selector 		NO NULL:选择器
		 * @param (String|Array)attr_name 	NO NULL:标签属性
		 * @param (Function)callback 	   NULL:回调函数
		 * @returns {String}
		 */
		'replaceTpl':function(selector,attr_name,callback){
			var value;
			var self = this;
			$(selector).each(function(){
				if(callback && System.isFunction(callback)){
					callback.call(this);
				}else{
					var $this=$(this);
					if(System.isArray(attr_name)){
						System.each(attr_name,function(){
							value=self.template($this.attr(this));
							if(value && System.isString(value)){
								$this.attr(this,value);

							}
						});
					}else{
						value=self.template($this.attr(attr_name));
						if(value && System.isString(value)){
							$this.attr(attr_name,value);

						}
					}


				}

			});
			return System;
		},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2018-08-21
         * 修改日期：2018-12-1
         * 名称：extract_script_tag
         * 功能：根据标签提取它及里面的内容
         * 说明：
         * 注意：
         * @param tag{String}   NOT NULL标签名称
         * @param S{String}     NOT NULL内容
         * @returns {Object}
         */
        'extract_by_tag':function(tag,S){
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
		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2019-3-11
         * 修改日期：2020-2-05
		 * 名称：layout
		 * 功能：可方便在视图页面里指定layout模版,设置title,可向layout模版里传递数据
		 * 说明：
		 * 注意：
		 * @param S
		 * @returns {String}
		 */
		'layout':function(S){
			var reg = this.layout_reg;
			var k,v;
			var arr_inc = [];
			if((arr_inc = reg.exec(S)) && System.isArray(arr_inc)){
				try{
                    var data ={},arr = arr_inc[2].split('" ');
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
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

			}
			return null;
		},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2019-3-13
         * 修改日期：2020-2-05
         * 名称：define
         * 功能：预处理 在模版里定义常量
         * 说明：替换而且解析模版变量
         * 注意：
         * @param S
         * @returns {String}
         */
        'define':function (S) {
            var reg_inc = this.define_reg;
            var k,v;
            var arr_inc = [];
            while((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)){
            	try{
                    k = arr_inc[1].replace(/(^")|("$)/g,'').trim();
                    v = arr_inc[2].replace(/(^")|("$)/g,'').trim();
                    v = this.findTpl(v);
                    S = S.replace(arr_inc[0],'').replace(new RegExp(k,'g'),v);
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-02-12
         * 修改日期：2020-05-18
         * 名称：escape
         * 功能：指定哪一段代码在block区块内会被模版解析器忽略
         * 说明：
         * 注意：注意大小写！！！
         * usage：<!--Escape:begin-->这里的内容会被模版解析器忽略<!--Escape:end-->
         * @param S{String}     NOT NULL内容
         * @returns {String}
         */
        'escape':function(S){
            var reg_inc = this.escape_reg;
            var arr_inc = [];
            var id = "",content = "";
            var data ={};
            while ((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)) {
            	try{
                    content = this.block_once(arr_inc[1]);
                    S = S.replace(arr_inc[0],function () {
                        return content;
                    });
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },
		/**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-05-27
         * 修改日期：2020-05-27
         * 名称：empty
         * 功能：清空指定的字符串
         * 说明：
         * 注意：注意大小写！！！
         * usage：<!--Del:begin-->这里的内容会被清空<!--Del:end-->
         * @param S{String}     NOT NULL内容
         * @returns {String}	empty of string
         */
        'empty':function(S){
            var reg_inc = this.del_reg;
            var arr_inc = [];
            while ((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)) {
            	try{
                    S = S.replace(arr_inc[0],'');
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-05-18
         * 修改日期：2020-05-18
         * 名称：block_uniqid
         * 功能：the block_uniqid generated and saved then returned the block id
         * 说明：
         * @param content       要存入缓存的内容
         * @returns {string}    返回block_id
         */
        'block_uniqid':function(content){
            var data = {},id="";
            data.content = content;
            try{
                do{
                    id = System.uniqid();
                    data.id = id;
                }while(this.cache.find('id',id).index !== -1);
                this.cache.add(data);
                return id;
            } catch (e) {
                throw new Error(e.message + "block_uniqid");
            }

        },
        /**
         * 产品介绍：
         * 创建日期：2020-05-18
         * 修改日期：2020-05-18
         * 名称：block_once
         * 功能：自动生成唯一的bock
         * 说明：
         * @param content    要存入缓存的内容
         * @returns {string} 生成的block
         */
        'block_once':function(content){
            return '<#=block type="remove" id="'+this.block_uniqid(content)+'" />';
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-1-29
         * 修改日期：2020-4-15
         * 名称：setBlock
         * 功能：预处理 类似yii2 的 beginBlock，由一个唯一标识符定义block，可以继承使用（在block定义中调用<#=block id="xxx" />）,
         * 说明：type="override" 这个可选属性代表block id 发生冲突时会覆盖之前的block存储的内容,:true意思是现在的默认数据覆盖之前已存存储的，默认是false。之前与现在发生冲突时（无override值），默认现在是被忽略的
		 *      data="{}" 可以设置默认数据,func="function(index,id,reg){}" 可以执行一个行为,this代表Template对象
         * 注意：标签名大小写！！！
         * usage：<#(beginBlock|Block:begin) id="xxx" [type="override[:true]"] [data="{}"] [func="function(){}"]> ... <#(endBlock|Block:end)>
         * @param S
         * @returns {String}
         */
        'setBlock':function (S) {
            var reg_inc = this.set_block_reg;
            var arr_inc = [];
            var id = "",content="",k="",v="",type="",data ={};
            var __this = this;
            while ((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)) {
            	try{
                    content = "";
                    data = System.createDict();
                    var arr = arr_inc[2].split('" ');
                    arr.each(function(){
                        var arr = this.split('="');
                        arr[0] = arr[0].replace(/(^")|("$)/g,'');
                        arr[1] = arr[1].replace(/(^")|("$)/g,'');
                        k = System.camelCase(arr[0].trim());
                        v = arr[1];
                        data[k] =  v;
                    });
                    data.data    = System.eval(data.data) || null;
                    data.func    = System.eval(data.func) || null;
                    id    = data.id;
                    type  = data.type || null;

                    content = arr_inc[4];
                    content = this.getBlock(content);
                    content = this.escape(content);


                    data.content = content;

                    this.cache.find('id',id,function (index,id) {
                        if(-1 === index){
                            this.add(data);
                        }else{
                            if(type){
                                var override = type.split(':');
                                override[1] = System.eval(override[1]);
                                override[1] = System.isBoolean(override[1]) || 1 === override[1] ? override[1] : false;
                                if('override' === override[0]){
                                    var json = this.get(index);
                                    if(json.data && System.isPlainObject(json.data) || data.data && System.isPlainObject(data.data)){
                                        if(override[1]){
                                            data.data = System.merge(data.data,[json.data]);
                                        }else{
                                            data.data = System.merge(json.data,[data.data]);
                                        }
                                    }

                                    this.update(index,data);
                                }
                            }

                        }
                        if(System.isFunction(data.func)){
                            data.func.apply(__this,[arguments,arr_inc]);
                        }
                    });
                    S = S.replace(arr_inc[0],'');
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return this.getBlock(S);
        },
		/**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-5-27
         * 修改日期：2020-5-27
         * 名称：exec_script
         * 功能：在预处理指令加载时执行javascript代码
         * 说明：例如：block 中是调用不到当前页面的script标签中的脚本，因为预处理执行时间比script标签中的脚本早，解决方法有两种：
		 * 1.写在另一个脚本文件中，被加载进来
		 * 2.就是用这个方法解决
		 * 为了代码高亮显示在<!--Script:begin--> ... <!--Script:end-->的外面包裹一层<script type="text/javascript"></script>，
		 * 如果不想在页面打印<script type="text/javascript"></script>,可以用一个删除标签包裹着它。（删除标签的用法参看empty方法介绍）
		 *
		 * 如：<!--Del:begin--><script type="text/javascript"><!--Del:end-->
		 *     <!--Del:begin--></script><!--Del:end-->
         * 注意：标签名大小写！！！
         * usage：<!--Script:begin--> ... <!--Script:end-->
         * @param S
         * @returns {String}	empty of string
         */
        'exec_script':function (S) {
            var reg_inc = this.script_reg;
            var arr_inc = [];
            while ((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)) {
            	try{
                    System.globalEval(arr_inc[1]);
                    S = S.replace(arr_inc[0],'');
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-2-5
         * 修改日期：2020-3-2
         * 名称：getBlock
         * 功能：预处理-根据id标识符获取之前定义的block，可以由data属性分配数据
         * 说明：
         * 注意：
         * usage：<#=block id="xx" [data="{}"] [func="function(){}"] />
         * @param S
         * @returns {String}
         */
		'getBlock':function (S) {
            var reg_inc = this.get_block_reg;
            var arr_inc = [];
            var id = "",content="",k="",v="",type="";
            var __this = this;
            while ((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)) {
            	try{
                    content = "";
                    var data =System.createDict(),arr = arr_inc[1].split('" ');
                    arr.each(function(){
                        var arr = this.split('="');
                        arr[0] = arr[0].replace(/(^")|("$)/g,'');
                        arr[1] = arr[1].replace(/(^")|("$)/g,'');
                        k = System.camelCase(arr[0].trim());
                        v = arr[1];
                        data[k] =  v;
                    });
                    id   = data.id;
                    type = data.type || null;
                    data.data = System.eval(data.data) || null;
                    data.func    = System.eval(data.func) || null;
                    this.cache.find('id',id,function (index,id) {
                        if(-1 === index){
                            // throw new Error('Unknown id of blocks '+arr_inc[0]);
                        }else{
                            var json = this.get(index);
                            content  = json.content;

                            if(type && !System.LAM_DEBUG && "remove" === type){//删除cache中随机生产block id 的数据
                                this.remove(index);
                            }

                            if(json.data && System.isPlainObject(json.data) || data.data && System.isPlainObject(data.data)){
                                data.data = System.merge(data.data,[json.data]);
                            }
                            if(System.isPlainObject(data.data)){
                                // content = Template.compile(content,data.data);
                                content = System.Compiler.jQCompile(content,data.data);
                            }
                        }
                        if(System.isFunction(data.func)){
                            data.func.apply(__this,[arguments,arr_inc]);
                        }

                    });
                    S = S.replace(arr_inc[0],content);
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2019-7-25
         * 修改日期：2020-2-05
         * 名称：define2
         * 功能：预处理,可以包含include标签
         * 说明：只替换模版变量不解析
         * 注意：指令必须单独占一行，头尾都不能有空格或任何别的字符
         * usage：#define# __DATA__  <#include repeat="0" tp-data="{}"   file="__CUR__/papertext.json" /> #end#
         * @param S
         * @returns {String}
         */
        'define2':function (S) {
            var reg_inc = this.define2_reg;
            var k,v;
            var arr_inc = [];
            while((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)){
            	try{
                    k = arr_inc[1];
                    v = arr_inc[3];
                    v = this.include(v);
                    S = S.replace(arr_inc[0],'').replace(new RegExp(k,'g'),v);
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2019-8-7
         * 修改日期：2020-5-30
         * 名称：import
         * 功能：预处理 导入.js,在模版被解析的时候被加载,这比模版里System.import()方法加载的早
         * 说明：多个文件时,path里用','分割,首字母是'!'此时这个文件就会被忽略加载,type="css" 导入css文件,默认是js可以忽略这个属性,attr属性可以加自定义属性
         * 注意：
         * @example
         * 			<#define __PATH__="{{LAM.classPath}}" />
         * 			<#import path="/PopupLayer.class.js" root="__PATH__" />
         * @param S
         * @returns {String}
         */
        'import':function (S) {
            var reg_inc = this.import_reg;
            var k,v;
            var arr_inc = [];
            var loader = null;
            while((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)){
            	try{
                    var data ={},arr = arr_inc[1].split('" ');
                    arr.each(function(){
                        var arr = this.split('="');
                        arr[0] = arr[0].replace(/(^")|("$)/g,'');
                        arr[1] = arr[1].replace(/(^")|("$)/g,'');
                        k = System.camelCase(arr[0].trim());
                        v = arr[1];
                        data[k] =  v;
                    });
                    data.path    = data.path 	|| null;
                    data.root    = data.root ? data.root : false;
                    data.type    = data.type 	|| 'js';
                    data.write   = System.eval(data.write) || false;
                    data.befor   = System.eval(data.befor) || false;
                    data.attr    = System.eval(data.attr)  || null;
                    loader = null;

                    if(data.path) {
                        data.paths = [];
                        System.each(data.path.split(','),function () {
                            if(!System.hasIgnored(this)){
                                data.paths.push(this);
                            }
                        });
                        if('css' === data.type){
                            data.suffix  = data.suffix 	|| '.css';
                            data.rel     = data.rel 	|| 'stylesheet';
                            var data_css = {
                                'baseUrl':data.root,
                                'suffix':data.suffix,
                                'rel':data.rel,
                                'css':data.paths
                            };
                            if(data.attr && System.isPlainObject(data.attr)){
                                var arr = [];
                                System.each(data_css.css,function () {
                                    var attr = System.clone(data.attr);
                                    attr.href = this;
                                    arr.push(attr);
                                });
                                data_css.css = arr;
                            }
                            if(data.befor){
                                System.Loader.load(data_css).print();
                            }else{
                                loader = System.Loader.load(data_css);
                                loader._files = loader.get_files().join('');
                                loader.remove();
                            }
                        }else{
                            data.suffix  = data.suffix 	|| '.js';
                            if(data.write){//处理跨服务器xhr加载js报错异常:Uncaught TypeError: xxx is not a constructor 。这时就要用document.write() 方式加载来解决这个问题
                                if(data.attr && System.isPlainObject(data.attr)){
                                    var arr = [];
                                    System.each(data.paths,function () {
                                        var attr = System.clone(data.attr);
                                        attr.src = this;
                                        arr.push(attr);
                                    });
                                    data.paths = arr;
                                }
                                if(data.befor){//用 打印字符串方式，位置在head标签里
                                    System.import(data.paths,data.root,data.suffix,{'xhr':false}).print();
                                }else{//替换预处理占位符的位置
                                    loader = System.import(data.paths,data.root,data.suffix,{'xhr':false});
                                    loader._files = loader.get_files().join('');
                                    loader.remove();
                                }

                            }else{
                                System.import(data.paths,data.root,data.suffix);
                            }
                        }

                    }
                    S = S.replace(arr_inc[0],function () {
                        return loader ? loader._files : '';
                    });

                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
                }

            }
            return S;
        },

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2018-11-27
         * 修改日期：2020-5-19
         * 名称：include
         * 功能：预处理 递归查找include外面指定的文件
         * 说明：
         * 注意：
         * @param S
         * @returns {String}
         */
        'include':function (S) {
            var reg_inc = this.include_reg;
            var k,v;
            var arr_inc = [];
            while((arr_inc = reg_inc.exec(S)) && System.isArray(arr_inc)){
            	try{
                    var data ={},arr = arr_inc[1].split('" ');
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
                            case 'func':
                            case 'data':
                            case 'tpData':
                            case 'delimiters':
                            case 'repeat':
                            case 'error':
                                if(!System.empty(v)){
                                    v = System.eval(v);
                                }

                        }
                        data[k] =  v;
                    });

                    System.Html.getFile(data.file,function(content){
                        S = S.replace(arr_inc[0],function () {
                            if(System.isFunction(data.func)){
                            	data.content = content;
                                data.func();
                            }
                            return content;
                        });
                    },data);
                    reg_inc.lastIndex = 0;
				}catch (e){
                    throw new Error(e.message + arr_inc[0]);
				}

            }
            return S;
        },

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2019-8-25
         * 修改日期：2020-5-27
         * 名称：beforParse
         * 功能：
         * 说明：
         * 注意：
         * usage：
         * @param s
         * @returns {String}
         */
		'beforParse':function (s) {
            if(this.datas) {
                s = Template.compile(s,this.datas,this.delimiters);
            }
            s = this.define2(this.define(s));
            s = this.empty(s);
            s = this.import(s);
            s = this.exec_script(s);
            s = this.include(s);
            return s;
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2020-2-07
         * 修改日期：2020-5-15
         * 名称：afterParse
         * 功能：
         * 说明：
         * 注意：
         * usage：
         * @param s
         * @returns {*|String}
		 */
		'afterParse':function (s) {
            s = this.setBlock(s);
            return s;
        },
		'parse':function (s) {
			return this.afterParse(this.beforParse(s));
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
     * 创建日期：2019-8-25
     * 修改日期：2020-2-11
     * 名称：Template.getCache
     * 功能：返回当前的缓存对象
     * 说明：
     * 注意：
     * usage：
     * @returns {Cache}
     */
    Template.getCache=function () {
		return _cache;
    };

    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2020-4-13
     * 修改日期：2020-4-13
     * 名称：Template.getBlock
     * 功能：根据id 返回对应的block内容
     * 说明：
     * 注意：
     * usage：
     * @param id{String}
     * @param data{Json}
     * @returns {string}
     */
    Template.getBlock=function (id,data) {
        var content = "";
        var cache = Template.getCache();
        try{
            cache.find('id',id,function (index) {
                if(index !== -1){
                    var json = this.get(index);
                    content  = json.content;

                    if(json.data && System.isPlainObject(json.data) || data && System.isPlainObject(data)){
                        data = System.merge(data,[json.data]);
                    }
                    if(System.isPlainObject(data)){
                        // content = Template.compile(content,data);
                        content = System.Compiler.jQCompile(content,data);
                    }
                }

            });
            return content;
        }catch (e){
            throw new Error(e.message);
        }
    };



    /**
     * @author: lhh
     * 产品介绍：
     * 创建日期：2020-2-21
     * 修改日期：2020-2-21
     * 名称：Template.getTemplate
     * 功能：获取Template 单例对象
     * 说明：can be overwrite
     * 注意：
     * usage：
     * @param cache {Cache}
     * @param compiler {Compiler}
     * @returns {Template}
     */
    Template.getTemplate=function (cache,compiler) {
        if(!(temp instanceof Template)){
            temp = new Template(cache || _cache,compiler);
        }
        return temp;

    };

    temp = Template.getTemplate(null,null);

	System.merge(null,[{
		'analysisVar':temp.analysisVar,
		'template':temp.template,
		'findTpl':temp.findTpl,
		'replaceTpl':temp.replaceTpl
	}]);

	return Template;
});

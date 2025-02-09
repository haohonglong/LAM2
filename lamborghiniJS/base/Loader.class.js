/**
 *
 * @author: lhh
 * 产品介绍： 文件加载器
 * 创建日期：2014-9-9
 * 修改日期：2022-10-4
 * 名称：Loader
 * 功能：导入js;css;less 文件
 * 说明 :
 * 注意：
 *
 * Example：
 *
 */

(function(global,factory){
    'use strict';

    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    var System = global['LAM_20150910123700_'];
    if(!System){
        return;
    }else{
        var Loader = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Loader :
		typeof define === 'function' && define.amd ? define(Loader) : System.Cloader = Loader;
        
        System['Loadcommon'] = System['Loader'] = new Loader();
        System.merge(null,[{
            'import': System['Loader']['import']
            ,'loadScript': System['Loader']['loadScript']
        }]);


        System.export("lam.base.Loader", Loader);
        System.export("lam.base.Loader.import", System.import);
        System.export("lam.base.Loader.loadScript", System.loadScript);

    }

})(this,function(System){
    'use strict';
    System.is(System,'Html','Loader',System.classPath+'/base');
    var Html = System.require("lam.base.Html");
    var html,head,body,meta,script,link;
    var create;
    var sAttribute   = System.Config.render.default.script.Attribute;
    var cAttribute   = System.Config.render.default.css.Attribute;

    function initDom(){
        var self = this;
        //var load = window.onload;
        //window.onload=function(){
        //    if(System.isFunction(load)){
        //        load();
        //    }
        //
        //};
        var H=self.Config.render.H();
        html    = H.html;
        head    = H.head;
        body    = H.body;
        meta    = H.meta;
        script  = H.script;
        link    = H.link;
    }
    var __this__=null;
    var files = [];
    var Loader = Html.extend({
        constructor: function(Config){
            this.base();
            __this__ = this;
            this.Config = Config || System.Config;
            this.D = null;
            this.js  =[];
            this.css =[];
        },
        '_className':'Loader',
        '__constructor':function(){},
        /**
         *
         * @author: lhh
         * 名称： suffix_checkor
         * 功能：检查加载的文件路径是否已经包含后缀名,如果没有就添加返回，有就返回原路径
         * 创建日期：2016-11-3
         * 修改日期：2024-12-18
         * 说明：suffix == null 时，就忽略检查后缀名
         *
         * @param {String}str    文件路径
         * @param {String}suffix 对应文件的后缀名
         * @returns {*}
         */
        'suffix_checkor':function(str,suffix){
            var self = this;
            if(suffix){
                if("null" != suffix && -1 === str.indexOf(suffix)){
                    return str+suffix;
                }else{
                    return str;
                }

            }
            for(var i= 0,
                    suffixs=self.Config.render.suffixs,
                    len=suffixs.length;
                i<len;i++){
                if(str.indexOf(suffixs[i]) !== -1){
                    return true;
                }
            }
            return false;
        },
        /**
         *
         * @author: lhh
         * 名称：(void) replace_tpl
         * 功能：替换模板标签
         *  创建日期：2014-9-10
         *  修改日期：2016-9-10
         *  Example：
         *          <link LAM-VAR="template" href="{{_ROOT_}}/css/global.css" type="text/css" rel="stylesheet" />
         *          <img LAM-VAR="template" src="{{_ROOT_}}/images/a.jpg"  />
         *          <a LAM-VAR="template" href="{{_ROOT_}}/xxx.html" ></a>
         */
        'replace_tpl':function(){$(function(){System.Html.analysisTpl();});},
        /**
         *
         * @author: lhh
         * 名称： load
         * 功能：动态创建js,css 标签引入公共文件
         * 创建日期：2014-9-9
         * 修改日期：2017-10-13
         * 说明：js 和 css 任选其一
         * @params   (Object)D 			NO NULL :初始化参数
         * @param(Array)D.js		  	     NO NULL:js文件集合
         * @param(Array)D.css		  	     NO NULL:css文件集合
         * @param(String|Boolean)D.baseUrl		  	    NULL:文件路径
         * @param(String)D.suffix		  	    NULL:文件后缀名
         * 注意：
         rules:[
         {
            tag: 'css',
            single:true,
            use: [
              'style-loader',
              'css-loader'
            ],
            attr:{},
            after_fn:function(){}
          }
         ]
         * @returns {Loader}
         */
        'load':function(D){
            var self = this;
            create = System.Config.render.create;
            var suffix,rel,type,src="",href="",i= 0,node = null;
            var baseUrl=System.isset(D.baseUrl) ? D.baseUrl : System.ROOT;
            //link
            if(System.isArray(D.rules)){
                System.each(D.rules,function(){
                    var rule=this;
                    var after_fn=rule.after_fn;
                    var single=rule.single || false;
                    if(System.isPlainObject(this)){
                        //是否已加载过了
                        if(System.isArray(rule.use)){
                            System.each(rule.use,function(){
                                if(System.fileExisted(this)){
                                    return this;
                                }else{
                                    var attr = rule.attr;
                                    switch(rule.tag){
                                        case "script":
                                            attr.src = this;
                                            break;
                                        case "link":
                                            attr.href = this;
                                            break;
                                        default :

                                    }
                                    if(create){
                                        node = new System.Dom(rule.tag,attr);
                                        if(System.isset(after_fn) && System.isFunction(after_fn)){after_fn.call(node);}
                                        //node.style=true;
                                    }else{
                                        node = System.Html.tag(single,rule.tag,attr);
                                    }
                                    if(System.isClassFile(this)){
                                        System.classes.push(this);
                                    }
                                    files.push(node);
                                    System.files.push(this);
                                }
                            });
                        }

                    }
                });
            }else if(System.isArray(D.css) || System.isArray(D.link)){
                suffix  = D.suffix  || '.css';
                rel     = D.rel     || 'stylesheet';
                type    = D.type    || 'text/css';
                var tagName = "link";
                System.each(D.css || D.link,function(){
                    var css=this;
                    if(System.isString(css)){
                        css = __this__.suffix_checkor(css,suffix);
                        href = baseUrl ? baseUrl+css : css;
                        //是否已加载过了
                        if(System.fileExisted(href)){
                            return;
                        }else{
                            var attr = System.merge({'rel':rel,'type':type,'href':href},[cAttribute]);
                            self.load({'rules':[{tag: tagName,single:true,use: [href],attr:attr,after_fn:function(){this.style=true;}}]});
                        }
                    }else if(System.isPlainObject(css)){
                        css.href = __this__.suffix_checkor(css.href,suffix);
                        css.rel  = css.rel  || rel;
                        css.type = css.type || type;
                        css.href = baseUrl ? baseUrl+css.href : css.href;
                        //是否已加载过了
                        if(System.fileExisted(css.href)){
                            return;
                        }else{
                            System.merge(css,[cAttribute]);
                            self.load({'rules':[{tag: tagName,single:true,use: [css.href],attr:css,after_fn:function(){this.style=true;}}]});
                        }
                    }
                });
            }else if(System.isArray(D.js) || System.isArray(D.script)){//script
                suffix = D.suffix || '.js';
                var tagName = "script";
                System.each(D.js || D.script,function(){
                    var js=this;
                    if(System.isString(js)){
                        js = __this__.suffix_checkor(js,suffix);
                        src = baseUrl ? baseUrl+js : js;
                        //是否已加载过了
                        if(System.fileExisted(src)){
                            return;
                        }else{
                            var attr = System.clone(sAttribute);
                            attr['src'] = src;
                            self.load({'rules':[{tag: tagName,use: [src],attr:attr,after_fn:function(){this.script=true;}}]});
                        }
                    }else if(System.isPlainObject(js)){
                        js.src = __this__.suffix_checkor(js.src,suffix);
                        js.src = baseUrl ? baseUrl+js.src : js.src;
                        //是否已加载过了
                        if(System.fileExisted(js.src)){
                            return;
                        }else{
                            System.merge(js,[sAttribute]);
                            self.load({'rules':[{tag: tagName,use: [js.src],attr:js,after_fn:function(){this.script=true;}}]});
                        }
                    }
                });
            }else if(System.isArray(D.tag)){
                if(D.url){
                    if(System.fileExisted(D.url)){
                        return this;
                    }else{
                        System.files.push(D.url);
                    }
                }
                files.push(D.tag.join(''));
            }
            return this;
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2017-10-31
         * 修改日期：2018-4-25
         * 名称：loadScript
         * 功能：
         * 说明：
         * 注意：
         * @param url
         * @param callback
         * @returns {Loader}
         */
        'loadScript':function(url, callback){
            var self = this || System;
            var script = document.createElement("script") ;
            script.type = "text/javascript";
            if(System.fileExisted(url)){
                if(System.isFunction(callback)){callback();}
                return this;
            }
            initDom.call(self);
            if (script.readyState){ //IE
                script.onreadystatechange = function(){
                    if ("loaded" === script.readyState || "complete" === script.readyState){
                        script.onreadystatechange = null;
                        if(System.isFunction(callback)){callback();}
                    }
                };
            }else { //Others
                script.onload = function(){
                    if(System.isFunction(callback)){callback();}
                };
            }
            script.src = url;
            System.listen(function(){
                if(body){
                    body.appendChild(script);
                    if(self.Config.render.remove){body.removeChild(script);}
                    return true;
                }
            },1);

            if(System.isClassFile(url)){System.classes.push(url);}
            System.files.push(url);
            return this;
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-8-27
         * 修改日期：2020-2-3
         * 名称：import
         * 功能：导入指定的js文件
         * 说明：System 参数不用传
         * 注意：
         * @param   (Array)url 			    NO NULL :要加载js文件
         * @param   (String|Boolean)baseUrl 		   NULL :文件路径
         * @param   (String)suffix 		       NULL :文件后缀名
         * @param   (Object)X 		       		   NULL :是否异步加载配置参数
         * @param   (Boolean)X.xhr 		       NULL :是否异步加载，默认异步
         * @param   (Object)X.params 		       NULL :异步加载参数
         * @returns {Loader}返回当前对象可以链式调用import方法
         * Example：
         */
        'import':function(url,baseUrl,suffix,X){
            var self = this || System;
            if(System.isString(url)){
                var str = url;
                url = [];
                url.push(str);
            }
            if(!System.isArray(url) || System.arr_isEmpty(url)){return this;}
            suffix = suffix || '.js';
            baseUrl = System.isset(baseUrl) ? baseUrl : System.ROOT;
            var xhr_params = self.Config.XHR;
            var xhr =X && System.isPlainObject(X) && System.isBoolean(X.xhr) ? X.xhr : true;
            try {
                if(System.isset(importScripts) && System.isFunction(importScripts)){
                    url.each(function(){
                        var src=this;
                        src = __this__.suffix_checkor(src,suffix);
                        src = baseUrl ? baseUrl+src : src;
                        if(!System.fileExisted(src)){
                            importScripts(src);
                            if(System.isClassFile(src)){
                                System.classes.push(src);
                            }
                            System.files.push(src);
                        }
                    });
                }
            } catch (e) {
                if(System.Html.getFiles && System.isFunction(System.Html.getFiles) && xhr){//xhr方式加载 script 脚本文件
                    var arr=[];
                    System.each(url,function(){
                        var src=this;
                        src = __this__.suffix_checkor(src,suffix);
                        src = baseUrl ? baseUrl+src : src;
                        arr.push(src);
                    });
                    xhr_params.dataType='script';
                    System.Html.getFiles(arr,null,System.merge(X && System.isPlainObject(X.params) ? X.params : {},[xhr_params]));
                }else{
                    __this__.load({
                        'baseUrl':baseUrl,
                        'js':url,
                        'suffix':suffix
                    });
                }
            }
            return __this__;
        },
        /**
         *
         * @author: lhh
         * 名称：print
         * 功能：显示load() 里的文件
         * 创建日期：2015-9-2
         * 修改日期：2017-10-13
         * 说明：
         * 调用方式：
         * @returns {Loader}返回当前对象可以链式调用
         */
        'print':function(){
            var self = this || System;
            if(files.length < 1){return this;}
            if(!self.Config.render.create){//document.write() 方式引入外部文件(.js|.css)
                System.print(files.join(''));
            }else{
                if(System.isFunction(self.Config.render.create_callback)){
                    self.Config.render.create_callback(files,self);
                }else{
                    var append = self.Config.render.append;
                    initDom.call(self);
                    var fragment_style = System.Dom.createFragment();
                    var fragment_script = System.Dom.createFragment();
                    System.each(files,function(i){
                        if(System.isObject(this)){
                            this.timer = i*1000;
                            if(this.script){
                                if('befor' === append || 'after' === append){
                                    fragment_script.appendChild(this.node);
                                }else{
                                    if(0 === i){
                                        this.insertBefore(null,head.firstChild);
                                    }else{
                                        this.insertAfter(script[i-1]);
                                    }
                                }
                                //加载后要依次移除添加的script 节点
                                if(self.Config.render.remove){
                                    //3秒后依次移除添加的script 节点
                                    System.wait([this],function(node){
                                        node.delNode();
                                        // 浏览器不会回收这些属性所指向的对象.
                                        //手动删除它以免内存泄漏.
                                        System.free(node);
                                    },this.timer);
                                }
                            }else if(this.style){
                                fragment_style.appendChild(this.node);
                            }

                        }

                    });
                    head.appendChild(fragment_style);
                    if('befor' === append){
                        head.appendChild(fragment_script);
                    }else if('after' === append){
                        body.appendChild(fragment_script);
                    }

                }

            }

            this.remove();
            return this;

        },
        /**
         *
         * @author: lhh
         * 名称：remove
         * 功能：清空加载器里的数据
         * 创建日期：2016-3-21
         * 修改日期：2016-3-21
         * 说明：
         * 调用方式：
         */
        'remove':function(){files = [];},
        /**
         *
         * @author: lhh
         * 名称：get_files
         * 功能：
         * 创建日期：2015-9-2
         * 修改日期：2015-9-2
         * 说明：
         * 调用方式：
         */
        'get_files':function(){return files;},
        /**
         *
         * @author: lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){}
    });

    return Loader;

});





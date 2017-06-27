/**
 *
 * @author: lhh
 * 产品介绍： 文件加载器
 * 创建日期：2014.9.9
 * 修改日期：2016.10.27
 * 名称：Loader
 * 功能：导入js;css;less 文件
 * 说明 :
 * 注意：
 *
 * Example：
 *
 */
window[GRN_LHH].run([window,document],function(window,document,undefined){
    'use strict';
    var System=this;
    System.is(System,'Basis','Loader');

    var html,head,body,meta,script,link;
    var create;
    var sAttribute   = System.Config.render.default.script.Attribute;
    var cAttribute   = System.Config.render.default.css.Attribute;
    /**
     *
     * @returns {*|Dom}
     * @constructor
     */
    function CMyDom(){//创建Dom 对象
        System.is(System,'Dom');
        return new System.Dom();
    }
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
    var Loader = System.Base.extend({
        constructor: function(Config){
            __this__=this;
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
         * 修改日期：2016-11-3
         * 说明：
         *
         * @param {String}str    文件路径
         * @param {String}suffix 对应文件的后缀名
         * @returns {*}
         */
        'suffix_checkor':function(str,suffix){
            var self = this;
            if(suffix){
                if(-1 === str.indexOf(suffix)){
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
         * 修改日期：2017-3-16
         * 说明：js 和 css 任选其一
         * @params   (Object)D 			NO NULL :初始化参数
         * @param(Array)D.js		  	     NO NULL:js文件集合
         * @param(Array)D.css		  	     NO NULL:css文件集合
         * @param(String|Boolean)D.baseUrl		  	    NULL:文件路径
         * @param(String)D.suffix		  	    NULL:文件后缀名
         * 注意：
         * @return  (Object) 返回当前对象
         */
        'load':function(D){
            create = System.Config.render.create;
            var suffix,rel,type,len,src="",href="",i= 0,node = null;
            var baseUrl=System.isset(D.baseUrl) ? D.baseUrl : System.ROOT;
            //link
            if(D.css){
                suffix  = D.suffix  || '.css';
                rel     = D.rel     || 'stylesheet';
                type    = D.type    || 'text/css';

                for (i=0,len=D.css.length;i<len;i++){
                    var css=D.css[i];

                    if(System.isString(css)){
                        css = __this__.suffix_checkor(css,suffix);
                        href = baseUrl ? baseUrl+css : css;
                        //是否已加载过了
                        if(System.fileExisted(href)){
                            continue;
                        }else{
                            var attr = System.merge({'rel':rel,'type':type},[cAttribute]);
                            attr['href'] = href;
                            if(create){
                                node = CMyDom().create('link',attr);
                                node.style=true;
                            }else{
                                node = System.Html.linkFile(href,attr);
                            }

                            files.push(node);
                            System.files.push(href);
                        }


                    }else if(System.isObject(css)){
                        css.href = __this__.suffix_checkor(css.href,suffix);
                        css.rel  = css.rel  || rel;
                        css.type = css.type || type;
                        css.href = baseUrl ? baseUrl+css.href : css.href;
                        //是否已加载过了
                        if(System.fileExisted(css.href)){
                            continue;
                        }else{
                            System.merge(css,[cAttribute]);

                            if(create){
                                node = CMyDom().create('link',css);
                                node.style=true;
                            }else{
                                node = System.Html.linkFile(css.href,css);
                            }

                            files.push(node);
                            System.files.push(css.href);

                        }

                    }

                }
            }
            //script
            if(D.js){
                suffix = D.suffix || '.js';
                for (i=0,len=D.js.length;i<len;i++){
                    var js=D.js[i];
                    if(System.isString(js)){
                        js = __this__.suffix_checkor(js,suffix);
                        src = baseUrl ? baseUrl+js : js;
                        //是否已加载过了
                        if(System.fileExisted(src)){
                            continue;
                        }else{

                            var attr = System.clone(sAttribute);
                            attr['src'] = src;
                            if(create){
                                node = CMyDom().create('script',attr);
                                node.script=true;
                            }else{
                                node = System.Html.scriptFile(src,attr);
                            }

                            if(System.isClassFile(src)){
                                System.classes.push(src);
                            }
                            files.push(node);
                            System.files.push(src);
                        }



                    }else if(System.isObject(js)){
                        js.src = __this__.suffix_checkor(js.src,suffix);
                        js.src = baseUrl ? baseUrl+js.src : js.src;
                        //是否已加载过了
                        if(System.fileExisted(js.src)){
                            continue;
                        }else{
                            System.merge(js,[sAttribute]);
                            if(create){
                                node = CMyDom().create('script',js);
                                node.script=true;
                            }else{
                                node = System.Html.scriptFile(js.src,js);
                            }
                            if(System.isClassFile(js.src)){
                                System.classes.push(js.src);
                            }
                            files.push(node);
                            System.files.push(js.src);
                        }
                    }
                }
            }

            return this;
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-8-27
         * 修改日期：2016-11-3
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
            var self = this;
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
                System.is(System,'Html');
                if(System.Html.getFiles && System.isFunction(System.Html.getFiles) && xhr){//异步方式加载 script 脚本文件
                    var arr=[];
                    url.each(function(){
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
                    }).print();
                }
            }
            return this;
        },
        /**
         *
         * @author: lhh
         * 名称：print
         * 功能：显示load() 里的文件
         * 创建日期：2015-9-2
         * 修改日期：2016-10-27
         * 说明：
         * 调用方式：
         * @returns {Loader}返回当前对象可以链式调用
         */
        'print':function(){
            var self = this;
            if(files.length < 1){return this;}
            if(!self.Config.render.create){//document.write() 方式引入外部文件(.js|.css)
                System.print(files.join(''));
            }else{
                if(System.isFunction(self.Config.render.create_callback)){
                    self.Config.render.create_callback(files);
                }else{
                    var append = self.Config.render.append;
                    initDom.call(self);
                    System.each(files,function(i){
                        if(System.isObject(this)){
                            this.timer = i*1000;
                            if(this.script){
                                if('befor' === append){
                                    this.appendTo(head);
                                }else if('after' === append){
                                    this.appendTo(body);
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
                                this.appendTo(head);
                            }

                        }

                    });
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



    System['Cloader'] =Loader;
    System['Loadcommon'] = System['Loader'] =new Loader();


});




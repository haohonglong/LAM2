/**
 * 创建人：lhh
 * 创建日期:2015-3-20
 * 修改日期:2018-3-6
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 System.Config里的属性 和 GRN_LHH; 的值；
 *
 * note :
 *
 *
 *
 */

(function(window,undefined){
    'use strict';
    var ROOT="",_ROOT_="",System={},Config={},namespace="";
    //check
    if(window.GRN_LHH && window[window.GRN_LHH] != undefined){
        return;
    }else{
        window.GRN_LHH='System';
    }
    namespace = window.GRN_LHH;
    //js获取项目根路径，如： http://localhost:8083/uimcardprj
    function getRootPath(){
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        return(localhostPaht+projectName);
    }

    if(!window._ROOT_){
        _ROOT_ = window._ROOT_ = getRootPath();
    }else{
        _ROOT_ = window._ROOT_;
    }

    (function(factory){
        'use strict';
        window[namespace] = System = factory(System);
    })(function(System){
        'use strict';
        System.Config = Config = {
            'vendorPath':_ROOT_+'/lamborghiniJS',
            'LAM_DEBUG':true,
            'LAM_ENV':'dev',
            'Public':{
                 'ROOT':_ROOT_+'/documentation'
                ,'COMMON':_ROOT_+'/common'
                ,'PLUGINS':_ROOT_+'/common/plugins'
                ,'CONTROLLERS':_ROOT_+'/documentation/controllers'
                ,'VIEWS':_ROOT_+'/documentation/views'
                ,'ERROR_404':_ROOT_+'/documentation/views/404.html'
                ,'CSS':_ROOT_+'/documentation/css'
                ,'JS':_ROOT_+'/documentation/js'
            },
            'components':{
                'routeName':'r',
            },
            //hashcode 随机种子
            'random':10000,
            //定义模版标签
            'templat':{
                'custom_attr':'[data-var=tpl]',
                'delimiters':['{#','#}']
            },
            'files':[],
            'XHR':{//配置加载xhr 的公共参数
                'type': 'GET'
                ,'async':false
                ,'cache':true
                ,'beforeSend':function(){}
            },
            //配置基础文件
            'autoLoadFile':function(){
                ROOT = this.Public.ROOT;
                var PLUGINS = this.Public.PLUGINS;
                var classPath=this.getClassPath();
                return [
                    classPath+'/jQuery/jquery.js'
                    // ,classPath+'/build/base.min.js'
                    ,classPath+'/base/System.js'
                    ,classPath+'/base/Base.class.js'
                    ,classPath+'/base/Object.class.js'
                    ,classPath+'/base/Component.class.js'
                    ,classPath+'/base/HttpRequest.class.js'
                    ,classPath+'/base/Helper.class.js'
                    ,classPath+'/base/Browser.class.js'
                    ,classPath+'/base/Event.class.js'
                    ,classPath+'/base/Dom.class.js'
                    ,classPath+'/base/View.class.js'
                    ,classPath+'/base/Template.class.js'
                    ,classPath+'/base/Html.class.js'
                    ,classPath+'/base/Loader.class.js'

                    ,classPath+'/base/Base64.class.js'
                    ,classPath+'/base/Cache.class.js'
                    ,classPath+'/base/Controller.class.js'
                    ,classPath+'/base/Router.class.js'
                    ,PLUGINS+'/vue/vue.js'
                ];
            },

            //标签的渲染方式
            'render':{
                //加载文件的后缀名称
                'suffixs':['.js','.css'],
                //输出标签的方式 ()
                'fragment':null,
                //true : document.createElement(); false :document.write();
                'create':false,
                //加载后是否要移除添加过的script 节点
                'remove':true,
                'append':'befor',
                'default':{
                    'script':{
                        'Attribute':{
                            'type':'text/javascript',
                            //'async':'async',
                            //'defer':'defer',
                            'charset':'utf-8'
                        }
                    },
                    'css':{
                        'Attribute':{
                            'type':'text/css',
                            'rel':'stylesheet'
                        }
                    }
                },
                'H':function(){
                    return {
                        'html'    : document.getElementsByTagName('html')[0],
                        'head'    : document.getElementsByTagName('head')[0],
                        'body'    : document.getElementsByTagName('body')[0],
                        'meta'    : document.getElementsByTagName('meta')[0],
                        'script'  : document.getElementsByTagName('script')[0],
                        'link'    : document.getElementsByTagName('link')[0],
                        'div'    : document.getElementsByTagName('div')[0]
                    };
                },
                'bulid':function(tag,D){
                    tag = tag || "script";
                    var node;
                    var k;
                    var fragment;
                    node=document.createElement(tag);

                    for(k in D){
                        node[k] = D[k];
                    }

                    if(!Config.render.fragment){
                        Config.render.fragment = document.createDocumentFragment();
                    }
                    fragment = Config.render.fragment;

                    Config.render.fragment.appendChild(node);

                    return fragment;
                },
                /**
                 * 用createElement 创建标签并且设为异步
                 */
                'use':function(){
                    this.create=true;
                    this.default.script.Attribute.async='async';
                    this.default.script.Attribute.defer='defer';
                },
                /**
                 * 用document.write() 创建标签并且设为非异步
                 */
                'unuse':function(){
                    this.create=false;
                    this.default.script.Attribute.async='false';
                    this.default.script.Attribute.defer='';
                }
            },
            'init':{},
            'params':{},
            'getClassPath':function(){
                return this.vendorPath;
            }
        };

        System.wait=function(callback,time){
            time = time || 15000;
            window.setTimeout(function(){
                callback.call(System);
            }, time);
        };

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2016-9-30
         * 修改日期：2016-9-30
         * 名称：System.open
         * 功能：打开一个新文档，并擦除当前文档的内容
         * 说明：
         * 注意：
         * @return  {Document}
         */
        System.open=function(mimetype,replace){
            mimetype = mimetype || "text/html";
            replace = replace 	|| "replace";
            return document.open(mimetype,replace)
        };

        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-9-16
         * 修改日期：2016-9-30
         * 名称：System.print
         * 功能：输出
         * 说明：
         * 注意：
         * @param   (String)S 			NO NULL :
         * @return  (voide)						:
         * Example：
         */
        System.print=function(S){
            if(Config.render.create){
                Config.render.H().body.appendChild(Config.render.fragment);
            }else{
                // var document=System.open();
                document.write(S);
                // System.close(document);
            }
        };
        /**
         *
         * @param s
         * @returns {boolean}
         */
        System.isset=function(s){
            return (typeof s !== "undefined" &&  s !== null);
        };
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2016-9-30
         * 修改日期：2016-9-30
         * 名称：System.close
         * 功能：关闭输出文档流
         * 说明：
         * 注意：
         * @return  (voide)
         */
        System.close=function(document){
            document = document || window.document;
            document.close();
        };
        return System;
    });


    //加载初始化文件
    //=============================================================================================================
    (function(System){
        Config.files = Config.files || [];
        var tag = "script";
        var scriptAttribute = Config.render.default.script.Attribute;
        var i = 0,body;
        var len;
        var data = scriptAttribute;
        var classPath=Config.getClassPath();
        var files=[];
        //加载基础类
        var srcs =Config.autoLoadFile();
        body = Config.render.H().body;
        if(typeof requirejs != 'undefined'){
            requirejs.config({
                baseUrl: ''
                ,waitSeconds:0
            });
            requirejs(srcs,function(){});

        }else{
            //确保每个文件只加载一次
            var attrs=[];
            for(var k in scriptAttribute){
                attrs.push(k,'=','"',scriptAttribute[k],'"',' ');
            }
            if(srcs.length){
                for(i=0,len = srcs.length;i < len; i++){
                    if(Config.files.indexOf(srcs[i]) != -1){continue;}
                    Config.files.push(srcs[i]);
                    if(Config.render.create){
                        data.src = srcs[i];
                        Config.render.bulid(tag,data)
                    }else{
                        files.push('<',tag,' ',attrs.join(''),'src=','"',srcs[i],'"','>','<','/',tag,'>');
                    }
                }
                System.print(files.join(''));
            }
            //=================================================================================================================================
            //检测lamborghiniJS基础类文件是否加载成功
            //=================================================================================================================================
            i =0;
            var timer = setInterval(function(){
                i++;
                body = Config.render.H().body;
                console.log(i);
                if(body){
                    console.log(body);
                    if(!LAMJS){
                        throw new Error("does't find the lamborghiniJS's path of  Basis classes , now the path is :{"+classPath+"}");
                    }else{
                        LAMJS.main=function() {
                            'use strict';
                            var System=this;
                            System.use();
                            console.log('function of main  called');
                        };
                    }
                    clearInterval(timer);
                }
            },55);
            //=================================================================================================================================
        }
    })(System);
})(this);















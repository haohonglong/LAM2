/**
 * 创建人：lhh
 * 创建日期:2015-3-20
 * 修改日期:2016-10-27
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 System.Config里的属性 和 GRN_LHH; 的值；
 *
 * note :
 *
 *
 *
 */

'use strict';

//基础类的设置
if(!GRN_LHH){
    var GRN_LHH='System';
}

(function(global,namespace,System,Config){
    'use strict';
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

    if(!global._ROOT_){
        global._ROOT_ = getRootPath();

    }

    Config = System.Config = {
        'vendorPath':_ROOT_+'/lamborghiniJS',
        'LAM_DEBUG':true,
        'LAM_ENV':'dev',
        'Public':{
             'ROOT':_ROOT_
            ,'COMMON':_ROOT_+'/common'
            ,'PLUGINS':_ROOT_+'/plugins'
        },
        //hashcode 随机种子
        'random':10000,
        //定义模版标签
        'templat':{
            'custom_attr':'[data-var=tpl]',
            'delimiters':['{{','}}']
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
            var ROOT = this.Public.ROOT;
            var classPath=this.getClassPath();
            return [
                 classPath+'/jQuery/jquery.js'
                ,classPath+'/Basis.class.js'
                ,classPath+'/Base.class.js'
                ,classPath+'/BiObject.class.js'
                ,classPath+'/Loader.class.js'
                ,classPath+'/Component.class.js'
                ,classPath+'/Helper.class.js'
                ,classPath+'/Event.class.js'
                ,classPath+'/Browser.class.js'
                ,classPath+'/Dom.class.js'
                ,classPath+'/Html.class.js'
                ,classPath+'/Template.class.js'
                ,classPath+'/Controller.class.js'
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
                        //'async':true,
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
                    'link'    : document.getElementsByTagName('link')[0]
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
                this.default.script.Attribute.async=true;
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
        global.setTimeout(function(){
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
        var document=System.open();
        document.write(S);
        System.close(document);
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
        document = document || global.document;
        document.close();
    };

    global[namespace] = System;

})(window,GRN_LHH,{});

//加载初始化文件
(function(System,Config){
    'use strict';
    Config=System.Config;
    Config.files = Config.files || [];
    var tag = "script";
    var scriptAttribute = Config.render.default.script.Attribute;
    var i = 0;
    var len;
    var data = scriptAttribute;
    var classPath=Config.getClassPath();
    var ROOT=Config.Public.ROOT;
    var files=[];
    //加载基础类
    var srcs =Config.autoLoadFile();
    if(typeof requirejs != 'undefined'){
        requirejs.config({
             baseUrl: ''
            ,waitSeconds:0
        });
        requirejs(srcs,function(){});

    }else{
        //=================================================================================================================================
        if(Config.render.create){
            System.wait(function(){
                var H=Config.render.H();
                for(i=0,len = srcs.length;i < len; i++){
                    //确保每个文件只加载一次
                    if(Config.files.indexOf(srcs[i]) != -1){
                        continue;
                    }
                    Config.files.push(srcs[i]);
                    data.src = srcs[i];
                    Config.render.bulid(tag,data);
                }
                console.log(Config.render.fragment);
                H.head.appendChild(Config.render.fragment);
            },1);
        }else{
            var attrs=[];
            for(var k in scriptAttribute){
                attrs.push(k,'=','"',scriptAttribute[k],'"',' ');
            }
            for(i=0,len = srcs.length;i < len; i++){
                //确保每个文件只加载一次
                if(Config.files.indexOf(srcs[i]) != -1){
                    continue;
                }
                files.push('<',tag,' ',attrs.join(''),'src=','"',srcs[i],'"','>','<','/',tag,'>');
                Config.files.push(srcs[i]);

            }
            System.print(files.join(''));
        }

        //=================================================================================================================================
        //3分钟之后检测lamborghiniJS基础类文件是否加载成功
        //=================================================================================================================================
        System.wait(function(){
            if(!LAMJS){
                alert('cannot find Basis class! the lamborghiniJS\' path is :{'+classPath+'}');
            }else{
                LAMJS.run(function() {
                    'use strict';
                    var System=this;
                    var ROOT = System.Config.Public.ROOT;
                });
            }
        },30000);
        //=================================================================================================================================
    }
})(window[GRN_LHH]);










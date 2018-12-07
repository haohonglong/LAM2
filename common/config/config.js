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
    if(window.GRN_LHH && window[window.GRN_LHH] != undefined){return;}

    window.GRN_LHH='System';
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
        _ROOT_ = window._ROOT_ = window.location.pathname || getRootPath();
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
                 'ROOT':_ROOT_
                ,'ROUTE':''
                ,'COMMON':_ROOT_+'/common'
                ,'PLUGINS':_ROOT_+'/common/plugins'
                ,'Moudle':function(){return LAMJS.createDict();}
            },
            'components':{
                'routeName':'r',
            },
            //hashcode 随机种子
            'random':999,
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
                ROOT = this.Public.ROOT;
                var classPath=this.getClassPath();
                return [
                    classPath+'/jQuery/jquery.js'
                    ,classPath+'/build/base.min.js'

                    // ,classPath+'/base/Base.class.js'
                    // ,classPath+'/base/Object.class.js'
                    // ,classPath+'/base/Component.class.js'
                    // ,classPath+'/base/Compiler.class.js'
                    // ,classPath+'/base/Base64.class.js'
                    // ,classPath+'/base/Cache.class.js'
                    // ,classPath+'/base/HttpRequest.class.js'
                    // ,classPath+'/base/Helper.class.js'
                    // ,classPath+'/base/Browser.class.js'
                    // ,classPath+'/base/Event.class.js'
                    // ,classPath+'/base/Dom.class.js'
                    // ,classPath+'/base/View.class.js'
                    // ,classPath+'/base/Template.class.js'
                    // ,classPath+'/base/Html.class.js'
                    // ,classPath+'/base/Loader.class.js'

                    ,classPath+'/base/Controller.class.js'
                    ,classPath+'/base/Css.class.js'
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
                        'link'    : document.getElementsByTagName('link')[0],
                        'div'     : document.getElementsByTagName('div')[0]
                    };
                },
                'bulid':function(tag,D){
                    tag = tag || "script";
                    var node;
                    var k;
                    node=document.createElement(tag);
                    for(k in D){node[k] = D[k];}
                    if(!Config.render.fragment){Config.render.fragment = window.document.createDocumentFragment();}
                    Config.render.fragment.appendChild(node);
                    return node.outerHTML;
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
            'params':{},
            'getClassPath':function(){
                return this.vendorPath;
            }
        };
        return System;
    });

})(this);












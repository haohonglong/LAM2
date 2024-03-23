(function(global,factory){
	'use strict';

    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Router = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Router :
		typeof define === 'function' && define.amd ? define(Router) : System.Router = Router;
		System.export("lam.base.Router", Router);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Browser','Router',System.classPath+'/base');
    var Browser = System.require("lam.base.Browser");
    var CController = System.require("lam.base.Controller");
    var Compiler = System.require("lam.base.Compiler");
    var Template = System.require("lam.base.Template");
    var View = System.require("lam.base.View");

    if(!System.tempInstance) System.tempInstance = new Template(System.blockCacheInstance || null, Compiler.getInstance());
    if(!System.viewInstance) System.viewInstance = new View(System.tempInstance);
    
    var FILEPATH = System.classPath+'/base/Router.class.js';
    if(!System.isset(System.CONTROLLERS)) throw new Error("LAM.CONTROLLERS undefined");
    


    var isrun = false;

	var __this__=null;
	var Router = Browser.extend({
		constructor: function () {
			this.base();
			__this__ = this;

		},
		'_className':'Router',
		'__constructor':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Router对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
    /**
     *
     * @author lhh
     * 产品介绍：路由初始化
     * 创建日期：2015-4-2
     * 修改日期：2019-7-24
     * Router.init
     * 功能：
     * 说明：
     * 注意：
     * @param r
     * @param m
     * @returns {*}
     */
	Router.init=function(r,m){
        System.INDEX = System.INDEX || 'index.html?r=';
		r = r || 'r';
		m = m || 'm';
		r = System.get(r);
		m = System.get(m);
		var no = !System.isset(r);
		m = m ? m : null;
		r = r ? r : System.defaultRoute || 'site/index';
        System.defaultRoute = r;
        if(no) System.Browser.pushState(System.INDEX+System.defaultRoute);

	    var routeRules = System.routeRules;
	    if(routeRules){
	    	System.each(routeRules,function(k,v){
		    	if(k === r){
                    if(System.isFunction(v)) {
                        v();
                    } else {
                        r = v;
                        System.defaultRoute = r;
                        System.Browser.pushState(System.INDEX+System.defaultRoute);
                    }
                    
		    		return false;
		    	}
		    });
	    }
        if(System.isset(m) && !System.empty(m)){//分模块
			return {'r':r,'m':m};
        }else{
            return {'r':r,'m':false};
		}

	};

    /**
	 * 替换指定的占位符
     * @param tag	占位符名称
     * @param S
     * @param S2
     * @returns {*}
     */
    function rep_placeholder(tag,S,S2){
        var reg = new RegExp('<!#'+tag+'/>');
        var arr_inc = [];
        if((arr_inc = reg.exec(S)) && System.isArray(arr_inc)){
            S = S.replace(arr_inc[0],function () {
                return S2;
            });
        }
        return S;
    }



    /**
	 * 产品介绍：生成一个普通html，用于生产静态页便于输出
     * 创建日期：2023-1-2
     * 修改日期：2024-3-9
     * 名称：generator
     * @param view
     * @param excludedFiles {Array}
     * @returns {*|String|string}
     */
    function generator(view, excludedFiles) {
        var jses = [],css = [],head = [], LAM_INIT =  [];

        System.each(System.autoLoadFiles, function () {
            if(System.beforeBuildExcluded.in_array(this.name)) {// 排除不需要加载的js
                excludedFiles.push(this.path);
            }
        });

        System.each(System.files, function (i) {
            if(System.isJsFile(this)) { // 只加载不被排除的js路径
                if(!excludedFiles.in_array(this)) {
                    var array = System.beforeBuildExcluded;
                    for (var i = 0; i < array.length; i++) { 
                        if (this.indexOf(array[i]) !== -1) return; // 过滤掉不需要的js
                    }

                    jses.push(System.Html.scriptFile(this));
                }
                
			}else {
                if(System.isCssFile(this)) css.push(System.Html.linkFile(this));
            }
            
        });

        if(System.isFunction(System.LAM_INIT)) {
            LAM_INIT = System.LAM_INIT(System);
        } else {
            LAM_INIT.push(System.Html.script(`window._ROOT_ = "${System.ROOT}";`));
            LAM_INIT.push(System.Html.scriptFile(System.CONFIGURATIONJS));
            LAM_INIT.push(System.Html.scriptFile(System.SYSTEMJS));
            LAM_INIT.push(System.Html.script('LAM.init();'));
        }

        if(System.isFunction(System.head_fn)) {
            head = System.head_fn(System);
        }

        jses = jses.join("\n");
        head = head.join("\n");
        LAM_INIT = LAM_INIT.join("\n");
        css = css.join("\n");
        view = rep_placeholder('UTF8',view,'<meta charset="UTF-8">');
        view = rep_placeholder('LAM_INIT',view,LAM_INIT);
        view = rep_placeholder('HEAD',view,head);
        view = rep_placeholder('CSS',view,css);
        view = rep_placeholder('JS',view,jses);
        return view.trim();
    }

    /**
	 * performing a controller what you want and it can be by url and runs the action
     */
	Router.run=function (r,m) {
	    if(isrun) return;
	    isrun = true;

        var R = Router.init(r,m);
        r = R.r.split('/');
        var M = '';
        var str = r[0];
        var Controller = str.substring(0,1).toUpperCase()+str.substring(1);
        var ControllerName = Controller+'Controller';
        if(System.isString(R.m)) M = R.m+'/';
        var controllerPath = '/'+M+ControllerName+'.class.js';
        System.import([controllerPath], System.CONTROLLERS);

        var action = r[1]+'Action';
        var id = r[2];
        var view = null;
        System._content = null;
        id = System.eval(id);

        
        var controller = System.require("web.controllerInstance");
        if(!controller) {
            controller = new System[ControllerName]();
        }
    	
        controller.setView(System.viewInstance);
        System.export("this", controller);
    	if(controller instanceof CController){
    		if(action && System.isFunction(controller[action])) {
                controller.viewpath = System.VIEWS + '/' + M + Controller.toLowerCase();
                controller.init();
                controller[action](id);
                view = System.tempInstance.getBlock(System.tempInstance.content);

                //生产静态页便于输出
                var buildHtml = generator(view, [System.CONTROLLERS + controllerPath]); // this is  a content of html that was parsed and want to build
                System.export("this.buildHtml", buildHtml);
                
                if (System.isFunction(System.main)) {
                    view = System.main(view, buildHtml, controller, action, id);
                    System.export("this.content", view);
                    if (System.isset(view) && System.isString(view)) {
                        System.print(view);
                    }
                }
            }else{
                var error = new System.Error(null,
                     "the action's name '"+action+"' was not found", 
                     FILEPATH, 194);
    			throw new Error(error.getMessage());
    		}
    	} else {
            var error = new System.Error(null,
                     "the controller's name '"+ControllerName+"' was not found", 
                     FILEPATH, 203);
            throw new Error(error.getMessage());
        }

    };

    if(System.routeAutoRun){
        try {
            Router.run(System.routerId,System.moduleId);
        } catch (e) {
            console.error(e);
            System.View.ERROR_404(404, e.message);

        }
        
    }

	return Router;
});





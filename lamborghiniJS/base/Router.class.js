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
     * 产品介绍：Router.init
     * 创建日期：2015-4-2
     * 修改日期：2019-7-24
     * 名称：destructor
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
		    		r = v;
                    System.defaultRoute = r;
                    System.Browser.pushState(System.INDEX+System.defaultRoute);
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
        var reg = new RegExp('<!#'+tag+'/>','m');
        var arr_inc = [];
        if((arr_inc = reg.exec(S)) && System.isArray(arr_inc)){
            S = S.replace(arr_inc[0],function () {
                return S2;
            });
        }
        return S;
    }



    /**
	 *
     * @param view
     * @param excluded {Array}
     * @returns {*|String|string}
     */
    function generator(view, excluded) {
        var jses = [],css = [],head = [], excluded_names = ["Controller", "Router"];
        excluded = excluded || [];

        System.each(System.autoLoadFiles,function () {
            if (excluded_names.in_array(this.name) && !excluded.in_array(this.path)) {
                excluded.push(this.path);
            }
        });
        System.each(System.files,function () {
            if(!excluded.in_array(this)) {
                head.push(System.Html.scriptFile(this));
                excluded.push(this);
			}
        });
        System.each(System.files,function () {
            if(System.isJsFile(this)){
                if(!excluded.in_array(this)){
                    jses.push(System.Html.scriptFile(this));
                }
            }else{
                css.push(System.Html.linkFile(this));
            }
            
        });
        jses = jses.join("\n");
        head = head.join("\n");
        css = css.join("\n");
        view = rep_placeholder('UTF8',view,'<meta charset="UTF-8">');
        view = rep_placeholder('HEAD',view,head);
        view = rep_placeholder('CSS',view,css);
        view = rep_placeholder('JS',view,jses);
        return view.trim();
    }


    /**
	 * perform controller by url and run the action
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

        var temp = new Template(null, Compiler.getInstance());
        var _view = new View(temp);
    	var controller = new System[ControllerName]();
        controller.setView(_view);
        System.export("this", controller);
    	if(controller instanceof CController){
    		if(action && System.isFunction(controller[action])) {
                controller.viewpath = System.VIEWS + '/' + M + Controller.toLowerCase();
                controller.init();
                controller[action](id);
                view = temp.getBlock(temp.content);

                if (System.isset(view) && System.isString(view)) {
                    //生产静态页便于输出
                    System._content = generator(view, [System.CONTROLLERS + controllerPath]); // this is  a content of html that was parsed and want to build
                    System.export("this.content", view);
                }
                if (System.isFunction(System.main)) {
                    view = System.main(view, controller, action, id);
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





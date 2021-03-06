(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Router'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Browser','Router',System.classPath+'/base');
    if(!System.isset(System.CONTROLLERS)){throw new Error("LAM.CONTROLLERS undefined");}
    System.import(['/View.class'],System.classPath+'/base');

    var isrun = false;

	var __this__=null;
	var Router = System.Browser.extend({
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
     * @returns {*|String|string}
     */
    function generator(view) {
        var jses = [],css = [],head = [];

        var js_obj = System.Config.autoLoadFile();
        var systemjs = System.classPath+'/base/System.js';
        var config = System.ROOT+'/common/config/config.js';
        var exclude = [
            js_obj.Controller,
            // js_obj.View,
            js_obj.Router
        ];
        System.each(System.files,function () {
			if(this.indexOf('Controller') > -1){
                exclude.push(this);
			}
        });
        head.push(System.Html.scriptFile(config));
        head.push(System.Html.scriptFile(systemjs));
        System.each(js_obj,function () {
            if(!exclude.in_array(this)) {
                head.push(System.Html.scriptFile(this));
                exclude.push(this);
			}
        });
        System.each(System.files,function () {
            if(System.isJsFile(this)){
				if(!exclude.in_array(this)){
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
        try{
            var R = Router.init(r,m);
            r = R.r.split('/');
            var M = '';
            var str = r[0];
            var Controller = str.substring(0,1).toUpperCase()+str.substring(1);
            var ControllerName = Controller+'Controller';
            if(System.isString(R.m)) M = R.m+'/';
            System.import(['/'+M+ControllerName+'.class'],System.CONTROLLERS);

            var action = r[1]+'Action';
            var id = r[2];
            var view = null;
            System._content = null;
            id = System.eval(id);

        	var controller = new System[ControllerName]();
        	if(controller instanceof System.Controller){
        		if(action && System.isFunction(controller[action])) {
                    controller.viewpath = System.VIEWS + '/' + M + Controller.toLowerCase();
                    controller.init();
                    view = controller[action](id);
                    view = (new System.Template()).getBlock(view);
                    if (System.isset(view) && System.isString(view)) {
                        //生产静态页便于输出
                        System._content = generator(view);//there is saved the content of html that after parsed
                    }
                    if (System.isFunction(System.main)) {
                        view = System.main(view, controller, action, id);
                        if (System.isset(view) && System.isString(view)) {
                            System.print(view);
                        }
                    }
                }else{
        			throw new Error("the action '"+action+"' was not found");
        		}
        	}
        }catch(e){
        	System.View.ERROR_404(404,e.message +"\n"+ e.stack);
        	throw new Error(e);
        }
    };

    if(System.routeAutoRun){
        Router.run(System.routerId,System.moduleId);
    }

	return Router;
});





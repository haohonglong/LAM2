(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['View'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Component','View',System.classPath+'/base');

	var __this__=null;
	var View = System.Component.extend({
		constructor: function () {
			this.base();
			__this__ = this;
            this.suffix = '.html';
            this.viewpath = System.VIEWS;
            this.ajaxConfig = null;
            this.title = 'title';
		},
		'_className':'View',
		'__constructor':function(){},

        /**
         * @author lhh
         * 产品介绍：渲染视图
         * 创建日期：2019-02-3
         * 修改日期：2019-06-19
         * 名称：render
         * 功能：render the page
         * 说明：
         * 注意：
         * @param name{String}              NO NULL:name of view
         * @param data{Object}              NULL:assigning data for view
         * @param callback{Function}        NULL:callback
         * @param ajaxConfig{Object}        NULL:init ajax configure
         * @returns {string}
         */
        'render':function (name,data,callback,ajaxConfig) {
            data = data || System.createDict();
            data.title = data.title || this.title;
            if(!System.isFunction(callback)) {
                ajaxConfig = callback;
                callback = null;
            }
            data = data || {};
            ajaxConfig = System.merge({},[ajaxConfig,{
                file_404:System.ERROR_404,//the path of 404
                beforeSend:function(a,b){
                    this.async=false;
                }
            }]);
            if('/' !== name.trim().substring(0,1)){
                name = '/'+name;
            }
            name = this.viewpath+name+this.suffix;
            return (new System.Template().render(name,data,callback,ajaxConfig));

        },


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销View对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
    /**
	 *
	 *  @author lhh
	 *  产品介绍：
	 *  创建日期：2018-9-12
	 *  修改日期：2019-3-5
	 *  名称：View.ERROR_404
	 *  功能：when the page was not found then display the 404 page
	 *  说明：
	 *  注意：
	 *  @param (Number)code	       NO NULL    code of error
	 *  @param (String)message     NO NULL    message of error
	 *  @param (String)url            NULL    page of 404
	 *  @param (jQuery)$dom           NULL    element of include
	 *  @return  (void)
	 *  Example:
	 */
    View.ERROR_404 = function (code,message, url, $dom) {
    	var arg = arguments;
    	if(!System.isNumber(code)){
    		code = 404;
    		message = arg[0];
    		url = arg[1];
    		$dom = arg[2];
		}
        message = message || '404 Not Found';
        url = url || System.ERROR_404;
        new System.Template().render(url, {'code':code,'message': message}, function (content) {
            if ($dom && System.is_instanceof_jQuery($dom)) {
                $dom.after(content).remove();
            } else {
                System.print(content);
            }
            throw message;
        }, {
            beforeSend: function (a, b) {
                this.async = false;
            }
        });
    };

    return View;
});





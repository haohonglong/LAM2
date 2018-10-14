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
    System.import(['/View.class'],System.classPath+'/base');
    if(!System.isset(System.CONTROLLERS)){throw new Error("LAM.CONTROLLERS undefined");}

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

	(function () {
        var r = System.get('r').split('/');
        var str = r[0];
        var Controller = str.substring(0,1).toUpperCase()+str.substring(1);
        var ControllerName = Controller+'Controller';
        System.import(['/'+ControllerName],System.CONTROLLERS);

        var action = r[1];
        var id = r[2];
        action = action+'Action';
        id = System.eval(id);
        try{
            (new System[ControllerName]())[action](id);
        }catch(e){
            System.View.ERROR_404();
        }
    })();

	return Router;
});





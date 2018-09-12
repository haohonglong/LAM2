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
	System.is(System,'Dom','View',System.classPath+'/base');

	var __this__=null;
	var View = System.Dom.extend({
		constructor: function () {
			this.base();
			__this__ = this;
		},
		'_className':'View',
		'__constructor':function(){},


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
     * @author lhh
     * 产品介绍：
     * 创建日期：2019-9-12
     * 修改日期：2019-9-12
     * 名称：View.ERROR_404
     * 功能：not found of page then display the page of error_404
     * 说明：
     * 注意：
     * @return  (void)						:
     * Example：
     *
     */
	View.ERROR_404 = function () {
        new System.Template().render(System.ERROR_404,{},function(content){
            System.print(content);
        },{
            beforeSend:function(a,b){
                this.async=false;
            }
        });
    };
	return View;
});





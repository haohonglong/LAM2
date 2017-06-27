
/**
 * 创建人：lhh
 * 创建日期:2016/6/17
 * 修改日期:2016/6/17
 * 名称：Widget
 * 功能：
 * 说明 : 小部件，
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[GRN_LHH].run([window,window.document,jQuery],
	function(window,document,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Helper','Widget');

	var __this__=null;

	var Widget = System.Helper.extend({
		constructor: function () {
			__this__ = this;
		},
		'_className':'Widget',
		/**
		 *
		 * @author lhh
		 * 产品介绍：输入框
		 * 创建日期：2016-7-7
		 * 修改日期：2016-7-7
		 * 名称：input
		 * 功能：在注销Widget对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'input':function(){},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Widget对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});

	System['Widget']=Widget;

});



(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var BinaryTree = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = BinaryTree :
		typeof define === 'function' && define.amd ? define(BinaryTree) : System.BinaryTree = BinaryTree;
		System.export("lam.base.BinaryTree", BinaryTree);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Helper','BinaryTree',System.classPath+'/base');
	var Helper = System.require("lam.base.Helper");

	var None = Helper.extend({
		constructor: function (root) {
			this.base();
			this.root = root;
			this.left = null;
			this.right = null;
		},
		'_className':'None',
		'insert':function(){

		},
		'destructor':function(){}
	});

	var __this__=null;
	var BinaryTree = System.Helper.extend({
		constructor: function () {
			this.base();
			__this__ = this;

		},
		'_className':'BinaryTree',
		'insert':function(key){
			var node = new Node(key);

		},
		'search':function(){},
		'sort':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销BinaryTree对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	return BinaryTree;
});






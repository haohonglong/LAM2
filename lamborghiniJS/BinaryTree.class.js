
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Helper','BinaryTree');

	var None = System.Helper.extend({
		constructor: function (root) {
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

	System['BinaryTree']=BinaryTree;

});




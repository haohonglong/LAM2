/**
 * @author: lhh
 * 产品介绍：
 * 创建日期：2015-8-26
 * 修改日期：2017-10-13
 * 名称：
 * 功能：操作VNode
 * 说明：
 * 注意：
 * Example：
 *
 */

(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['VNode'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Dom','VNode',System.classPath+'/base');
	var __this__=null;
	
	var VNode = System.Dom.extend({
		constructor: function(single,tag,Attr,text,comment){
			if(!System.isBoolean(single)){
				comment = text;
				text    = Attr;
				Attr    = tag;
				tag     = single;
				single  = false;
			}
            if(!System.isString(tag)){throw new Error('Warning :标签名称必须是字符串');}
			this.base(tag,Attr);
			__this__=this;
			this.single    = single  || false;
			this.tag       = tag     || '';
			this.text      = text    || '';
			this.comment   = comment || '';
			this.Attr      = this.Dtree;


		},
		'_className':'VNode',
		'__constructor':function(){},
		

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销VNode对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
	
	return VNode;
});

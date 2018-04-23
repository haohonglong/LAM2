(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		System['Linklist'] = factory(System);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Node','Linklist',System.classPath+'/base');
	var __this__=null;
	var Linklist = System.Node.extend({
		constructor: function (single,tag,Attr,text,children,comment){
			__this__ = this;
			this.base(single,tag,Attr,text,children,comment);
		},
		'_className':'Linklist',
		'__constructor':function(){},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Linklist对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});
    Linklist.createElement=function( single, tag, Attr, text, children, comment ){
        return new Linklist( single, tag, Attr, text, children, comment );
    };

	return Linklist;
});






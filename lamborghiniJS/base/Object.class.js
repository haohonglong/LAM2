/**
 * @author：lhh
 * 创建日期:2015-3-20
 * 修改日期:2019-7-1
 * 名称：Object类
 * 功能：服务于派生类生成hashCode
 * 标准 :
 * 说明 :
 *
 * note :
 *
 *
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
		(System['Object'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Base','Object',System.classPath+'/base');
	var __this__=null;

	var Object = System.Base.extend({
		constructor: function() {
			__this__=this;
			if(!(System.app instanceof System.Object)){
				System.app=this;
				System.each(System.components,function(name,value){
					if(name in System.app){return true;}
					if(System.isFunction(value)){
						System['app'][name] = value.call(System.app,System);
					}
				});
			}
			this._hashCode=Object.generate();
		},
		'_className':'Object',
		'_disposed':false,
		'_id':null,
		'getDisposed':function(){
			return this._disposed;
		},
		/**
		 *
		 * @returns {*}
		 */
		'hashCode':function(){
			return this._hashCode;
		},


		'getId':function(){
			return this._id;
		},
		'equals':function(o){
			if(!o._hashCode) {Object.toHashCode(o);}
			return (this._hashCode === o._hashCode);
		},

		'setId':function(v){
			this._id=v;
		},
		'getUserData':function(){
			return this._userData;
		},
		'setUserData':function(v){
			this._userData=v;
		},
		'toHashCode':function(){
			return Object.toHashCode(this);
		},
		'dispose':function(){
			this._disposed=true;
			delete this._userData;
		},
		'toString':function(){
			if(this._className)
				return"[object "+this._className+"]";
			return"[object Object]";
		},
		'getProperty':function(sPropertyName){
			var getterName="get"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
			if(System.isFunction(this[getterName]))
				return this[getterName]();
			throw new Error("No such property, "+sPropertyName);
		},
		'setProperty':function(sPropertyName,oValue){
			var setterName="set"+sPropertyName.charAt(0).toUpperCase()+sPropertyName.substr(1);
			if(System.isFunction(this[setterName]))
				this[setterName](oValue);
			else throw new Error("No such property, "+sPropertyName);
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Object对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});


	Object._hashCodeCounter=0;
	Object._hashCodePrefix='';
	Object.generate=function(n){
		var code = Object._hashCodePrefix+System.hash(System.timestamp().toString(),n || System.hashLength || 32);
        Object._hashCodeCounter++;
        return System.md5(code);
	};
	Object.toHashCode=function(o){
		if(o._hashCode!=null)
			return o._hashCode;
		return o._hashCode=Object.generate();
	};
	//节点元素唯一标示符
    Object.key = 'node-id';
    //自增长数字
    var id = 0;
    Object.g_key_id = function(){return '_'+id++;};

	return Object;
});





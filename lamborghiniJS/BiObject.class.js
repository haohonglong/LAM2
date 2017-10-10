
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Basis','BiObject');

	var __this__=null;
	var BiObject = System.Base.extend({
		constructor: function() {
			__this__=this;
			this._hashCode=BiObject.generate();
		},
		'_className':'BiObject',
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
			if(!o._hashCode) {BiObject.toHashCode(o);}
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
			return BiObject.toHashCode(this);
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
		 * 功能：在注销BiObject对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});


	BiObject._hashCodeCounter=1;
	BiObject._hashCodePrefix="hc";
	BiObject.generate=function(){
		return BiObject._hashCodePrefix+Math.round(Math.random()*System.random)+BiObject._hashCodePrefix+BiObject._hashCodeCounter++;
	};
	BiObject.toHashCode=function(o){
		if(o._hashCode!=null)
			return o._hashCode;
		return o._hashCode=BiObject.generate();
	};


	System['BiObject']=BiObject;

});



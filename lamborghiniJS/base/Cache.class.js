/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2017-11-7
 * 名称：Cache类
 * 功能：缓存
 * 说明 : 
 *        
 * note : 
 * 		  
 *		
 * 
 */
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Cache');
	var __this__=null;


	var Cache = System.Browser.extend({
		constructor: function(name,type){
			this.base();
			__this__=this;
			this.caches = [];
			this.name = name || 'cache';
			this.Storage = type || localStorage;
		},
		'_className':'Cache',
		/**
		 *
		 * @returns {*}
		 */
		'isStorage':function(){return System.isset(this.Storage)},
		'getItem':function(){
			if(this.isStorage()){
				this.caches = (JSON.parse(this.Storage.getItem(this.name))) || this.caches;
			}
			return this;
		},
		/**
		 *
		 * @param index
		 * @returns {*}
		 */
		'get':function(index){
			index = System.isset(index) ? index : null;
			if(System.isset(index) && System.isNumeric(index)){
				return this.getItem().caches[index];
			}
			return this;
		},
		/**
		 *
		 * @param key
		 * @param value
		 * @param callback
		 * @returns {Cache}
		 */
		'cache':function(key,value,callback){
			if(System.isFunction(callback)){
				var index = this.getItem().exist(key,value);
				callback.call(this,index,value);
			}
			return this;
		},
		'setItem':function(){
			if(this.isStorage()){
				this.Storage.setItem(this.name,JSON.stringify(this.caches));
			}
			return this;
		},
		/**
		 *
		 * @param Obj
		 * @returns {Cache}
		 */
		'set':function(Obj){
			this.caches.push(Obj);
			this.setItem();
			return this;
		},
		/**
		 *
		 * @param index
		 * @param Obj
		 * @returns {Cache}
		 */
		'update':function(index,Obj){
			this.caches[index] = Obj;
			this.setItem();
			return this;
		},
		'exist':function(key,value){
			var caches = this.caches;
			for(var i=0,len=caches.length;i<len;i++){
				if((key in caches[i]) && (value === caches[i][key])){
					return i;
				}
			}
			return -1;
		},
		'clear':function(){
			if(this.isStorage()){
				this.Storage.clear();
			}
			this.caches = [];
			return this;
		},
		'remove':function(index){
			index = index || null;
			if(System.isset(index) && System.isNumeric(index)){
				var caches = this.caches;
				if (index > -1 && index < caches.length-1) {
					caches.removeAt(index);
					this.setItem();
					// delete cache[index];
				}
			}else{
				this.Storage.removeItem(this.name);
				this.caches = [];
			}
			return this;
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Cache对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	System['Cache'] = Cache;

});
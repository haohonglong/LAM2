
/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2017-8-11
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
	var cache = [],cache_name='',
		myStorage = null,
		isStorage=function(){
			if(typeof(myStorage) !== "undefined") {
				return true;
			} else {
				return false;
			}
		};

//========================================================

	function set(value,name){
		value = value || cache;
		name = name || cache_name;
		if(isStorage()){
			clear();
			myStorage.setItem(name,JSON.stringify(value));
		}
	}
	function remove(name){
		name = name || cache_name;
		if(isStorage()){
			myStorage.removeItem(name);
		}
	}

	function clear() {
		if(isStorage()){
			myStorage.clear();
		}else{
			cache = [];
		}

	}

	function get(name) {
		name = name || cache_name;
		if(isStorage()){
			return (JSON.parse(myStorage.getItem(name))) || cache;
		}else{
			return cache;
		}

	}
//========================================================

	var Cache = System.Browser.extend({
		constructor: function(name,type){
			__this__=this;
			this.caches = [];
			cache_name = name || 'cache';
			this.cache_name = cache_name;
			this.myStorage = type || localStorage;
		},
		'_className':'Cache',
		'init':function(){
			myStorage  = this.myStorage;
			cache_name = this.cache_name;
		},
		'cache':function(key,value,callback){
			this.init();
			cache = get();
			var index = this.exist(key,value);
			if($.isFunction(callback)){
				callback.call(this,index);
			}
			return index;
		},
		'set':function(Obj,key,value){
			this.init();
			// if(-1 == this.exist(key,value)){
			Obj[key] = value;
			cache.push(Obj);
			set();
			// }
		},
		'update':function(index,Obj){
			this.init();
			cache[index] = Obj;
			set();
		},
		'get':function(index){
			this.init();
			return System.isset(index) ? cache[index] : cache;
		},
		'exist':function(key,value){
			this.init();
			for(var i=0,len=cache.length;i<len;i++){
				if((key in cache[i]) && (value == cache[i][key])){
					return i;
				}
			}
			return -1;
		},

		'clear':function(){
			this.init();
			this.remove();
			clear();
		},
		'remove':function(index){
			this.init();
			if(index){
				if (index > -1 && index < cache.length-1) {
					cache.splice(index, 1);
					// delete cache[index];
				}
			}else{
				cache = [];
			}
			set();
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

/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2017-1-5
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
	var cache = [],Cache,cache_name='',
		isStorage=function(){
			if(typeof(Storage) !== "undefined") {
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
			sessionStorage.setItem(name,JSON.stringify(value));
		}
	}
	function remove(name){
		name = name || cache_name;
		if(isStorage()){
			sessionStorage.removeItem(name);
		}
	}

	function clear() {
		if(isStorage()){
			sessionStorage.clear();
		}else{
			cache = [];
		}

	}

	function get(name) {
		name = name || cache_name;
		if(isStorage()){
			return (JSON.parse(sessionStorage.getItem(name))) || cache;
		}else{
			return cache;
		}

	}
//========================================================

	var Cache = System.Browser.extend({
		constructor: function(name){
			__this__=this;
			this.caches = [];
			cache_name = name || 'cache';
			this.cache_name = cache_name;
		},
		'_className':'Cache',
		'cache':function(key,value,callback){
			cache = get();
			var index = this.exist(key,value);
			if($.isFunction(callback)){
				callback.call(this,index);
			}
			return index;
		},
		'set':function(Obj,key,value){
			// if(-1 == this.exist(key,value)){
			Obj[key] = value;
			cache.push(Obj);
			set();
			// }
		},
		'update':function(index,Obj){
			cache[index] = Obj;
			set();
		},
		'get':function(index){
			return System.isset(index) ? cache[index] : cache;
		},
		'exist':function(key,value){
			for(var i=0,len=cache.length;i<len;i++){
				if((key in cache[i]) && (value == cache[i][key])){
					return i;
				}
			}
			return -1;
		},

		'clear':function(){
			this.remove();
			clear();
		},
		'remove':function(index){
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
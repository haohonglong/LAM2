/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2018-5-18
 * 名称：Cache类
 * 功能：缓存
 * 说明 :
 *        
 * note :
 * example:
 *
 * new LAM.Cache('mt11').find('jobId',1,function (index,id) {
		var data={
			"id":id,
			"jobId":id,
			"job":"程序员",
			"name":"李明",
			"addres":"雨花台区软件大道",
			"city":"南京",
			"sex":"男"
		};
		if(-1 === index){
			this.add(data);
		}else{
			this.update(index,data);
			text = this.get(index).name;
			this.remove(index);
			console.log(text);

		}
	});
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
		(System['Cache'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Component','Cache',System.classPath+'/base');
	var __this__=null;

	var Cache = System.Component.extend({
        /**
         * @author lhh
         * 产品介绍：
         * 创建日期:2017-1-5
         * 修改日期:2018-5-16
         * 功能：
         * 说明：
         * 注意：
         * @param {String}name  							NOT NULL 缓存标示
         * @param {timeStamp}expires 						NULL 	 失效期的时间戳
         */
		constructor: function(name,expires){
			this.base();
			__this__=this;
			this.caches = [];
			this.name = name || 'cache';
			this.expires = System.isset(expires) && System.isNumber(expires) && (expires > 0) ? expires : 0;
			this.key = "";
			this.value = "";
		},
		'_className':'Cache',
        'isStorage':function(){},
		'setItem':function(){return this;},
		'getItem':function(){return this;},
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期:2017-1-5
		 * 修改日期:2018-5-18
		 * 名称：find
		 * 功能：
		 * 说明：入口处,所有set,get,update,search,del 都在 callback 里操作;callback里this指的是Cache 实例化当前对象
		 * 注意：
		 * @param {String}key  		存储数据的标示符key
		 * @param {String}value		存储数据的标示符value
		 * @param {Function}callback
		 * @returns {Cache}
		 */
		'find':function(key,value,callback){
			this.key   = key.toString().trim();
			this.value = value.toString().trim();
			if(System.isFunction(callback)){
				var index = this.getItem().exists(this.key,this.value);
				callback.call(this,index,this.value);
			}
			return this;
		},
		/**
		 *
		 * @param index
		 */
		'get':function(index){
			if(System.isset(index) && System.isNumeric(index)){
				return this.getItem().caches[index];
			}
		},

		/**
         * @author lhh
         * 产品介绍：
         * 创建日期:2017-1-5
         * 修改日期:2018-5-16
         * 名称：add
         * 功能：添加数据，可以设置一个有效期
         * 说明：
         * 注意：
		 * @param {json}data
		 * @param {timeStamp}expires 	NULL 失效期的时间戳
		 * @returns {Cache}
		 */
		'add':function(data,expires){
			data[this.key] = this.value;
			data['expires'] = expires || this.expires;
			this.caches.push(data);
			this.setItem();
			return this;
		},
        'set':function(data,expires){
            this.add(data,expires);
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
		/**
		 * @author lhh
		 * 产品介绍：
		 * 创建日期:2017-1-5
		 * 修改日期:2018-5-16
		 * 名称：exists
		 * 功能：检查数据是否存在，如果存在返回数据被存储在哪个数组的下标，不存在返回-1
		 * 说明：
		 * 注意：
		 * @param {String}key
		 * @param {String}value
		 * @returns {number}
		 */
		'exists':function(key,value){
			key   = key   || this.key;
			value = value || this.value;
			var caches = this.caches;
			for(var i=0,len=caches.length;i<len;i++){
				if((key in caches[i]) && (value === caches[i][key])){
					var expires = caches[i].expires;
					if(System.isset(expires) && System.isNumber(expires) && expires !==0){
						if(System.timestamp() >= expires){//当前时间大于等于设定时间
							this.remove(i);
							return -1;
						}
					}
					return i;
				}
			}
			return -1;
		},
        'clear':function(){
            this.caches = [];
            return this;
        },
        'remove':function(index){
            if(System.isset(index) && System.isNumeric(index)){
                var caches = this.caches;
                if (index > -1 && index <= caches.length-1) {
                    caches.removeAt(index);
                    this.setItem();
                }
            }else{
                this.clear();
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

	return Cache;
});

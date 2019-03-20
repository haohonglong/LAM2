/**
 * 创建人：lhh
 * 创建日期:2017-1-5
 * 修改日期:2018-5-18
 * 名称：Storage类
 * 功能：缓存
 * 说明 : 存数据时先存储到数组里，后由数组存储到Storage，取数据先从Storage里取然后在把数据赋给数组，最后从数组里取出数据,可以设置一个失效期
 *        
 * note :
 * example:
 *
 * new LAM.Storage('mt11',localStorage).find('jobId',1,function (index,id) {
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
		(System['Storage'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System,'Cache','Storage',System.classPath+'/base');
	var __this__=null;

	var Storage = System.Cache.extend({
        /**
         * @author lhh
         * 产品介绍：
         * 创建日期:2017-1-5
         * 修改日期:2018-5-16
         * 功能：
         * 说明：
         * 注意：
         * @param {String}name  							NOT NULL 缓存标示
         * @param {localStorage | sessionStorage}type		NOT NULL 	 缓存类型
         * @param {timeStamp}expires 						NULL 	 失效期的时间戳
         */
		constructor: function(name,type,expires){
			this.base(name,expires);
			__this__=this;
			this.Storage = type || localStorage;
		},
		'_className':'Storage',
		/**
		 *
		 * @returns {*}
		 */
		'isStorage':function(){return (System.isset(this.Storage) && System.isset(this.Storage.setItem))},
		'setItem':function(){
			if(this.isStorage()){
				try{
					this.Storage.setItem(this.name,System.Json.stringify(this.caches));
				}catch (e){
                    if ('QUOTA_EXCEEDED_ERR' === e.name || 'NS_ERROR_DOM_QUOTA_REACHED' === e.name) {
                        throw new Error(['Warning: ',this.name,' 存储已满'].join(''));
                    } else {
                        // todo
                    }

				}
			}
			return this;
		},
		'getItem':function(){
			if(this.isStorage()){
				this.caches = (System.Json.parse(this.Storage.getItem(this.name))) || this.caches;
			}
			return this;
		},
		'clear':function(){
			if(this.isStorage()){
				this.Storage.clear();
			}
			this.caches = [];
			return this;
		},
		'remove':function(index){
			if(System.isset(index) && System.isNumeric(index)){
				var caches = this.caches;
				if (index > -1 && index <= caches.length-1) {
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
		 * 功能：在注销Storage对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	return Storage;
});

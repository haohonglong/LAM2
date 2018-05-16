/**
 * 创建人：lhh
 * 创建日期：2016-12-8
 * 修改日期：2018-5-16
 * 名称：Cookie2
 * 功能：cookie
 * 说明 :
 *
 * note :
 * example:
 *
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
		System['Cookie2'] = factory(System);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Browser','Cookie2',System.classPath+'/base');
	var __this__=null;
	var Cookie2 = System.Browser.extend({
        /**
         * @author lhh
         * 产品介绍：
         * 创建日期:2017-1-5
         * 修改日期:2018-5-16
         * 功能：
         * 说明：
         * 注意：
         * @param {String}name  							NOT NULL 缓存标示
         * @param {timeStamp}D.expires 						NULL 	 失效期的时间戳
         */
        constructor: function(name,D){
            this.base();
            __this__=this;
            var defaults = {
                 "expires":0
				,"path":null
				,"domain":null
				,"secure":false
            };
            D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
            this.caches	= [];
            this.name 		= name || 'm_11';
            this.expires 	= System.isNumber(D.expires) && (D.expires > 0) ? this.getExpDate(D.expires) : 0;
            this.path 		= D.path;
            this.domain 	= D.domain;
            this.secure 	= D.secure;
            this.key = "";
            this.value = "";
        },
		'_className':'Cookie2',
		'__constructor':function(){},
		'setItem':function(){
            document.cookie = this.name + "=" + JSON.stringify(this.caches) +
                ((this.expires) > 0 ? "; expires=" + this.getExpDate(this.expires) : "") +
                (System.isset(this.path) ? "; path=" + this.path : "") +
                (System.isset(this.domain) ? "; domain=" + this.domain : "") +
                ((this.secure) ? "; secure" : "");
            return this;
		},
		'getItem':function(){
            var value='',name = this.name;
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(System.isset(arr) && System.isArray(arr)) {
                value = arr[2];
            }else{
                var cookies=document.cookie.split("; ");
                for(var i=0,len=cookies.length;i<len;i++){
                    arr=cookies[i].split('=');
                    if(arr[0] === name) {
                        value = arr[1];
                        break;
                    }
                }
            }
            this.caches = JSON.parse(value || null) || [];
            return this;
		},

        /**
         * @author lhh
         * 产品介绍：
         * 创建日期:2017-1-5
         * 修改日期:2017-11-9
         * 名称：cache
         * 功能：
         * 说明：入口处,所有set,get,update,search,del 都在 callback 里操作;callback里this指的是Cache 实例化当前对象
         * 注意：
         * @param {String}key  		存储数据的标示符key
         * @param {String}value		存储数据的标示符value
         * @param {Function}callback
         * @returns {Cookie2}
         */
		'cookie':function(key,value,callback){
            this.key   = key.toString().trim();
            this.value = value.toString().trim();
            if(System.isFunction(callback)){
                var index = this.getItem().exists(this.key,this.value);
                callback.call(this,index,this.value);
            }
            return this;
		},
		'set':function(data,expires){
            data[this.key] = this.value;
            data['expires']= expires || this.expires;
			this.caches.push(data);
			this.setItem();
			return this;

		},
        /**
         *
         * @param index
         * @param Obj
         * @returns {Cookie2}
         */
        'update':function(index,Obj){
            this.caches[index] = Obj;
            this.setItem();
            return this;
        },
		'get':function(index){//获取Cookie2
            if(System.isset(index) && System.isNumeric(index)){
                return this.getItem().caches[index];
            }
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
		'getExpDate':function(timestamp){
            var d = new Date();
            d.setTime(timestamp);
			return d.toUTCString();
		},
        'clear':function(){
            this.remove_();
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
                this.clear();
            }
            return this;
        },
		'remove_':function(){//
			this.getItem();
			if(this.caches!=null) document.cookie= this.name + "="+this.caches+";expires="+this.getExpDate(System.timestamp()-1);
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Cookie2对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	return Cookie2;
});




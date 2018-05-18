/**
 * 创建人：lhh
 * 创建日期：2018-5-16
 * 修改日期：2018-5-18
 * 名称：PowerCookie
 * 功能：cookie
 * 说明 :
 *
 * note :
 * example:
 *
 * new LAM.PowerCookie('mt11').find('jobId',1,function (index,id) {
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
 *
 */
(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		System['PowerCookie'] = factory(System);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Cache','PowerCookie',System.classPath+'/base');
	var __this__=null;
	var PowerCookie = System.Cache.extend({
        /**
         * @author lhh
         * 产品介绍：
         * 创建日期:2018-5-16
         * 修改日期:2018-5-17
         * 功能：
         * 说明：
         * 注意：
         * @param {String}name  							NOT NULL 缓存标示
         * @param {timeStamp}D.expires 						NULL 	 失效期的时间戳
         */
        constructor: function(name,D){
            __this__=this;
            var defaults = {
                 "expires":0
				,"path":null
				,"domain":null
				,"secure":false
            };
            D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
            this.base(name,D.expires);
            this.path 		= System.isset(D.path) && System.isString(D.path) && !System.empty(D.path.trim()) ? D.path.trim() : null;
            this.domain 	= System.isset(D.domain) && System.isString(D.domain) && !System.empty(D.domain.trim()) ? D.domain.trim() : null;
            this.secure 	= System.isset(D.secure) && System.isBoolean(D.secure) ? D.secure : false;

        },
		'_className':'PowerCookie',
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
            if(System.isJson(value) || value.toString().trim().match(/^\[\{/)) {
                this.caches = JSON.parse(value);
            }
            return this;
		},
		'getExpDate':function(timestamp){
            var d = new Date();
            d.setTime(timestamp);
			return d.toUTCString();
		},
        'remove':function(index){//
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
		'clear':function(){//删除cookie
			this.getItem();
			if(this.caches!=null) document.cookie= this.name + "="+this.caches+";expires="+this.getExpDate(System.timestamp()-1);
			this.caches = [];
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2018-5-16
		 * 修改日期：2018-5-16
		 * 名称：destructor
		 * 功能：在注销PowerCookie对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	return PowerCookie;
});




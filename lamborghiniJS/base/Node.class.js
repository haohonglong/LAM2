(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		System['Node'] = factory(System);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Helper','Node',System.classPath+'/base');

	var __this__=null;
    var guid = 0,
        Elements=System.createDict(),
        setElement = function (k,v) {
            if(!Elements[k]){
                Elements[k] = v;
            }
        };
	var Node = System.Helper.extend({
		constructor: function (single,tag,Attr,text,children,comment){
			__this__ = this;
			this.base();
            if(!System.isBoolean(single)){
                comment = children;
                children = text;
                text    = Attr;
                Attr    = tag;
                tag     = single;
                single  = false;
            }
            if(System.isString(Attr) || System.isArray(Attr)){//属性可以省略
                text = Attr;
                Attr = System.createDict();
            }
            this.single    = single  || false;
            this.tag       = tag     || null;
            this.text      = text    || '';
            this.children  = children|| null;
            this.comment   = comment || '';
            this.parent    = null;
            this.childrens =[];
            this.Attr = System.createDict();
		},
		'_className':'Node',
		'__constructor':function(){},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-8-26
         * 修改日期：2018-4-22
         * 名称： create
         * 功能：创建节点元素
         * 说明：
         * 注意：下面俩个参数是必须的
         * @param 	{Object}Attr             	NO NULL : 标签的属性
         * @returns {Node}
         */
        'create':function(Attr){
            var kid = 'kid_'+guid++;
            Attr['Helper-kid'] = kid;
            var _this = this;
            if(!this.single){
                if(System.isArray(this.children)){
                    System.each(this.children,function(){
                        if(System.isObject(this)){
                        	_this.childrens.push(this);
						}
                    });
                }else if(System.isObject(this.children)){
                    this.childrens.push(this.children);
                }
            }

            var k,v;
            for(k in Attr){
                v = Attr[k];
                if('__proto__' === k)continue;
                this.Attr[k] = v;
            }
            setElement(kid,this);
            return this;
        },

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Node对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	return Node;
});






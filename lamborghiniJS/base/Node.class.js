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
    var node_key = System.Object.key,
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
            if(!System.isString(text)){
                children = text;
                text = '';
            }
            this.single    = single  || false;
            this.tag       = tag     || null;
            this.text      = text    || '';
            this.children  = children|| null;
            this.comment   = comment || '';
            this.parent    = null;
            this.childrens =[];
            this.Attr = System.createDict();
            //构造有参数时
            if(arguments.length){
                if(System.empty(this.tag)){throw new Error('Warning 缺少标签名称');return;}
                if(!System.isString(this.tag)){throw new Error('Warning :标签名称必须是字符串');return;}
                var key = System.Object.g_key_id();
                Attr[node_key] = key;
                this[System.camelCase(node_key)] = key;
                setElement(key,this);
                this.init();
                this.create(Attr);
                this.run();
            }
		},
		'_className':'Node',
		'__constructor':function(){},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2018-4-23
         * 修改日期：2018-4-23
         * 名称： create
         * 功能：创建节点元素
         * 说明：
         * 注意：下面俩个参数是必须的
         * @param 	{Object}Attr             	NO NULL : 标签的属性
         * @returns {Node}
         */
        'create':function(Attr){
            var _this = this;
            if(!this.single){
                if(System.isArray(this.children)){
                    System.each(this.children,function(){
                        if(System.isObject(this) && (this instanceof Node)){
                            this.parent = _this;
                        	_this.childrens.push(this);
						}
                    });
                }else if(System.isObject(this.children) && (this.children instanceof Node)){
                    this.children.parent = this;
                    this.childrens.push(this.children);
                }
            }

            var k,v;
            for(k in Attr){
                v = Attr[k];
                if('__proto__' === k)continue;
                this.Attr[k] = v;
            }
            return this;
        },
        'init':function(){},
        'run':function(){},
        'getParent':function () {
              if(System.isset(this.parent) && (this.parent instanceof Node)){
                  return this.parent;
              }else{
                  return null;
              }
        },

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2018-4-23
		 * 修改日期：2018-4-23
		 * 名称：destructor
		 * 功能：在注销Node对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

    Node.getParent=function(node){
        if(System.isset(node) && (node instanceof Node) && System.isset(node.parent) && (node.parent instanceof Node)){
            return node.parent;
        }else{
            return null;
        }
    };
    Node.createElement=function( single, tag, Attr, text, children, comment ){
        return new Node( single, tag, Attr, text, children, comment );
    };

	return Node;
});






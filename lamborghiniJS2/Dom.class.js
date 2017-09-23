/**
 * @author: lhh
 * 产品介绍：
 * 创建日期：2015-8-26
 * 修改日期：2017-9-23
 * 名称：
 * 功能：操作dom
 * 说明：
 * 注意：
 * Example：
 *
 */
window[GRN_LHH].run([window,document,jQuery],function(window,document,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Browser','Dom');

	var __this__=null;
	var Dom = System.Browser.extend({
		constructor: function(tag,D) {
			__this__=this;
			this.root=document;
			this.node=null;
			this.attributes=[];
			this.Dtree = {};
			//构造有参数时
			if(arguments.length){this.create(tag,D);}
			this.fragment = document.createDocumentFragment();
		},
		'_className':'Dom',
		'__constructor':function(){},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2017-9-23
		 * 名称： create
		 * 功能：创建节点元素
		 * 说明：
		 * 注意：下面俩个参数是必须的
		 * @param 	{String}tag             NO NULL : 标签名称
		 * @param 	{Object}D             	NO NULL : 标签的属性
		 * @returns {Dom}
		 */
		'create':function(tag,D){
			tag = tag || "div";
			if(System.empty(tag)){throw new Error('Warning 缺少标签名称');}
			this.node=document.createElement(tag);
			this.attributes = this.node.attributes;
			var k;
			for(k in D){
				this.Dtree[k] = D[k];
				this.attr(k,D[k]);
			}
			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2016-7-13
		 * 名称： get
		 * 功能：获取节点元素
		 * 说明：
		 * 注意：
		 * @return (node)
		 * Example：
		 *
		 */
		'get':function(){
			return this.node;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-6-15
		 * 修改日期：2016-7-13
		 * 名称： getType
		 * 功能：获取元素的节点类型
		 * 说明：
		 * 注意：
		 * @returns {Number}
		 */
		'getType':function(){
			return Dom.getType(this.node);
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2015-12-08
		 * 名称： createFragment
		 * 功能：创建文档碎片节点
		 * 说明：
		 * 注意：
		 * @returns {Dom}
		 */
		'createFragment':function(){
			if(!this.fragment) {
				this.fragment = document.createDocumentFragment();
			}
			if(this.node){
				this.appendTo(this.fragment);
			}

			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-1-16
		 * 修改日期：2016-1-16
		 * 名称： getFragment
		 * 功能：获取文档碎片
		 * 说明：
		 * 注意：
		 * @returns {Dom}
		 */
		'getFragment':function(){
			if(this.fragment){
				this.fragment
			}else{
				return this;
			}


		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2016-10-26
		 * 名称： innerHTML
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param 	{String}html             NO NULL : html 内容
		 * @returns {string}
		 * Example：
		 */
		'html':function(html) {
			if(html){
				this.node.innerHTML = html;

			}else{
				return this.node.innerHTML;
			}
			//勿删
			//for (this.createFragment(); this.node.firstChild;) {
			//	this.fragment.appendChild(this.node.firstChild);
			//}
			//return this.fragment.childNodes.length > 1 ? this.fragment : this.fragment.removeChild(this.fragment.firstChild);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2017-03-02
		 * 名称： innerHTML
		 * 功能：克隆节点
		 * 说明：logic true:下面的子孙节点一块克隆下来 ；false:只克隆当前节点 (默认)
		 * 注意：
		 * @param node
		 * @param logic
		 * @returns {Node}
		 */
		'clone':function(node,logic){
			node  = node || this.node;
			logic = logic || false;
			if(logic){
				return node.cloneNode(true);
			}else{
				return node.cloneNode(false);
			}
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-12-08
		 * 修改日期：2016-7-13
		 * 名称： removeAttr
		 * 功能：node 中删除指定的属性名及值
		 * 说明：
		 * 注意：
		 * @param name	NO NULL:属性名字
		 * @param node	   NULL:节点
		 * @returns {Dom}
		 */
		'removeAttr':function(name,node){
			node = node || this.node;
			node.removeAttribute(name);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-7-20
		 * 名称： hasAttr
		 * 功能：node 中是否有指定的属性名
		 * 说明：
		 * 注意：
		 * @param name	NO NULL:属性名字
		 * @param node	   NULL:节点
		 * @returns {boolean}
		 */
		'hasAttr':function(name,node,
						   attributes){
			node = node || this.node;
			if(node.hasAttribute){
				return node.hasAttribute(name);
			}else{
				attributes =node && node.attributes || this.attributes;
				for(var i=0,len=attributes.length;i<len;i++){
					if(attributes[i].nodeName === name)
						return true;
				}
				return false;
			}

		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称： append
		 * 功能：指定的节点插入到当前节点里
		 * 说明：
		 * 注意：
		 * @param newNode
		 * @param oldNode
		 * @returns {Dom}
		 */
		'append':function(newNode,oldNode){
			if(!newNode){throw new Error('Warning :必须指定要插入的节点');}
			oldNode = oldNode || this.node;
			oldNode.appendChild(newNode);
			return this;

		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称： appendTo
		 * 功能：当前节点里插入到指定的节点里
		 * 说明：
		 * 注意：
		 * @param oldNode
		 * @param newNode
		 * @returns {Dom}
		 */
		'appendTo':function(oldNode,newNode){
			if(!oldNode){throw new Error('Warning :必须指定当前节点要被插入到哪个节点里');}
			newNode = newNode || this.node;
			oldNode.appendChild(newNode);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：getTagName
		 * 功能：获取节点的标签名称
		 * 说明：
		 * 注意：
		 * @returns {string}
		 */
		'getTagName':function(){
			return Dom.getName(this.node);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2017-9-13
		 * 名称：delNode
		 * 功能：删除指定的节点，参数不填默认删除当前的节点
		 * 说明：
		 * 注意：
		 * @returns {Dom}
		 */
		'delNode':function(){//在它的父节点调用removeChild 然后把它自身移除
			this.node = Dom.removeNode(this.node);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：getParent
		 * 功能：获取指定节点的父节点
		 * 说明：
		 * 注意：
		 * @returns {Node}
		 */
		'getParent':function(){//获取当前节点的父节点
			return Dom.getParent(this.node);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：replaceNode
		 * 功能：替换节点
		 * 说明：
		 * 注意：
		 * @param newChild
		 * @param oldChild 希望删除的节点对象
		 * @returns {Dom}
		 */
		'replaceNode':function(newChild, oldChild){//替换节点
			if(!oldChild){throw new Error('Warning :必须填写您希望删除的节点对象 oldChild');}
			newChild = newChild || this.node;
			this.getParent(oldChild).replaceChild(newChild , oldChild);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：insertBefore
		 * 功能：在您指定的已有子节点之前插入新的子节点
		 * 说明：
		 * 注意：
		 * @param newNode 		需要插入的节点对象
		 * @param referenceNode	可选。在其之前插入新节点的子节点。如果未规定，则 insertBefore 方法会在结尾插入 newNode。
		 * @returns {Dom}
		 */
		'insertBefore':function(newNode , referenceNode){
			newNode = newNode || this.node;
			this.getParent(referenceNode).insertBefore(newNode , referenceNode);
			return this;

		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-27
		 * 名称：insertAfter
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param node
		 * @param newNode
		 * @returns {*}
		 */
		'insertAfter':function(node,newNode){
			newNode = newNode || this.node;
			if(node.nextSibling){//如果node有下一个节点的话
				this.insertBefore(newNode,this.nextSibling(node));
			}else{
				this.append(this.getParent(node),newNode);
			}
			return node;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：delNodeMore
		 * 功能：删除多个节点
		 * 说明：
		 * 注意：
		 * @returns {Dom}
		 */
		'delNodeMore':function(){//
			var __this___ = this;
			System.each(arguments,function(k,v){
				__this___.delNode(this);
			});
			return this;

			//var node;
			//for(var i=0;i<arguments.length;i++){
			//	node = arguments[i];
			//	this.delNode(node);
			//}
		},



		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2016-8-20
		 * 名称： attr
		 * 功能：节点元素属性的获取或设置操作
		 * 说明：
		 3: 添加(node,String,String)
		 2:两个参数String类型：添加；否则获取(String,String)
		 1:参数String类型：获取 ；参数Object类型 设置(String|{})
		 * 注意：
		 * @returns {*}
		 * Example：
		 *
		 */
		'attr':function(){
			var node,name,value,
				len=arguments.length;
			switch (len){
				case 1:
					var D= arguments[0];
					if(System.isObject(D)){
						var k;
						for(k in D){
							this.attr(this.node,k,D[k]);
						}
					}else if(System.isString(D)){
						return this.attr(null,D);
					}

					break;
				case 2:
					if(System.isString(arguments[0])){
						this.attr(this.node,arguments[0],String(arguments[1]));
						break;
					}

					if(!arguments[0].getAttribute){
						arguments[0] = null;
					}

					node=arguments[0] || this.node;
					name=arguments[1];
					try{
						return node.getAttribute(name);
					}catch(e){
						throw new Error("Warning without the method of getAttribute "+e.name);
					}

					break;
				case 3:
					node=arguments[0] || this.node;
					name=arguments[1];
					value=arguments[2];
					try{
						node.setAttribute(name,value);
					}catch(e){
						throw new Error("Warning without the method of setAttribute "+e.name);
					}
					break;

				default:
			}

			return this;

		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：find
		 * 功能：
		 * 说明：
		 * 注意：
		 */
		'find':function(){},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：firstChild
		 * 功能：查找下面的元素是不是节点元素
		 * 说明：
		 * 注意：
		 * @returns {*}
		 */
		'firstChild':function(){//
			return Dom.firstChild(this.node);
		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：lastChild
		 * 功能：查找元素最后节点是不是节点元素
		 * 说明：
		 * 注意：
		 * @returns {*}
		 */
		'lastChild':function(){//
			return Dom.lastChild(this.node);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：previousSibling
		 * 功能：查找前一个节点是否是元素节点排除所有非元素节点
		 * 说明：
		 * 注意：
		 * @returns {*}
		 */
		'previousSibling':function(){//
			return Dom.previousSibling(this.node);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2016-10-26
		 * 名称：nextSibling
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param node
		 * @returns {*}
		 */
		'nextSibling':function(){
			return Dom.nextSibling(this.node);
		},
		'empty':function(){},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2017-9-11
		 * 名称：$
		 * 功能：选择器功能
		 * 说明：
		 * 注意：
		 * @param id {String}
		 * @returns {*}
		 */
		'$':function(id){return Dom.$(id);},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-9-11
		 * 修改日期：2017-9-11
		 * 名称：$$
		 * 功能：选择器功能
		 * 说明：
		 * 注意：
		 * @param id {String}
		 * @returns {*}
		 */
		'$$':function(id){return Dom.$$(id);},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2017-3-8
		 * 名称：addClass
		 * 功能：给指定元素添加类名
		 * 说明：
		 * 注意：
		 *
		 * @param node
		 * @param className
		 * @returns {*}
		 */
		'addClass':function(node,className){//
			node = node || this.node;
			if (this.hasClass(className,node)){return node;}
			return Dom.addClass(node,className);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-13
		 * 修改日期：2017-3-8
		 * 名称：removeClass
		 * 功能：删除指定元素类名
		 * 说明：
		 * 注意：
		 *
		 * @param node
		 * @param className
		 * @returns {*}
		 */
		'removeClass':function(node,className){
			node = node || this.node;
			return Dom.removeClass(node,className);
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2017-03-02
		 * 名称：[] hasClass
		 * 功能：查找指定的阶段中的是否有匹配的class 名称
		 * 说明：
		 * 注意：
		 * @param   {String}className 		NO NULL :要查找的类名称
		 * @param   {Element}node 				NO NULL :dom节点
		 * @return  {Boolean}
		 * Example：
		 */
		'hasClass':function(className,node){
			return Dom.hasClass(node || this.node,className);
		},
		/**
		 *
		 * @author lhh
		 * 产品介绍：
		 * 创建日期：2014-11-28
		 * 修改日期：2017-03-02
		 * 名称：getElementsByClassName
		 * 功能：获取类名集合
		 * 说明：
		 * 注意：
		 * @param   {String}s 		NO NULL :要查找的类名称
		 * @param   (Dom)p 					   NULL :父级dom节点
		 * @param   {String}t 				   NULL :标签名称
		 * @return  (Array)					返回匹配的节点集合
		 * Example：
		 */
		'getElementsByClassName':function(s,p,t){
			return Dom.getElementsByClassName(s,p,t);
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Dom对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-23
	 * 名称：Dom.$
	 * 功能：选择器功能
	 * 说明：
	 * 注意：
	 * @param id {String}
	 * @param context{Element} 上下文元素
	 * @returns {*}
	 */
	Dom.$=function(id,context){
		context = context || document;
		id = id.toString().trim();
		if(document.querySelector){return context.querySelector(id);}
		if(id.indexOf('#') !== 0){return context.getElementById(id.replace(/^#/g,'').trim());}
		if(id.indexOf('.') !== -1){return Dom.getElementsByClassName(id.replace(/^\./g,'').trim(),context,'*');}
		if(id.indexOf('[') !== -1){return Dom.find(id,context);}
		return context.getElementsByTagName(id);
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-11
	 * 名称：Dom.$$
	 * 功能：选择器功能
	 * 说明：
	 * 注意：
	 * @param id {String}
	 * @param context{Element} 上下文元素
	 * @returns {*}
	 */
	Dom.$$=function(id,context){
		context = context || document;
		id = id.toString().trim();
		if(document.querySelectorAll){return context.querySelectorAll(id);}
		return Dom.$(id,context);
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-14
	 * 修改日期：2017-9-23
	 * 名称：Dom.find
	 * 功能：查找匹配的节点
	 * 说明：
	 * 注意：
	 * @param search{String}
	 * @param context{Element}
	 * @returns {*}
	 */
	Dom.find=function(search,context){
		context = context || document;
		if(context.nodeType !== 1 && context.nodeType !== 9){throw new Error('Warning: context 必须是一个dom 节点元素 ');}
		if(!System.isString(search)){throw new Error('Warning: search 必须是字符串类型 ');}

		var arr = [],name="",value="";
		var selector = null;
		var elements = [];
		if(search.indexOf('[') !== -1){//如果是属性选择符 ［xxx="xx"］
			selector = "arrt";
			search = search.replace(/^\[/g,'').replace(/\]$/g,'').replace(/"/g,'');
			arr = search.split("=");
			arr[0] = arr[0].toString().trim();
			arr[1] = arr[1].toString().trim();
			name = arr[0];
		}else if(search.indexOf('.') !== -1){//如果是类选择符
			selector = "class";
			search = search.replace(/^\./g,'').replace(/"/g,'').trim();
			arr = [];
			arr[1] = search;
			name = selector;
		}else if(search.indexOf('#') !== -1){//如果是id选择符
			selector = "id";
			search = search.replace(/^#/g,'').replace(/"/g,'').trim();
			arr = [];
			arr[1] = search;
			name = selector;
		}else{//标签选择器
			selector = "tag";
			search = search.replace(/"/g,'').trim();
			name = search;
		}
		switch (selector){
			case 'id':
				return Dom.$('#'+search);
			case 'class':
				return Dom.$$('.'+search);
		}
		System.each(context.getElementsByTagName('*'),function(){
			if(1 === this.nodeType){
				if("tag" === selector){
					if(this.nodeName.toLocaleLowerCase() === name.toLocaleLowerCase()){
						elements.push(this);
					}
				}else{
					value = this.getAttribute(name);
					if("class" === selector){
						if(value && value.split(" ").in_array(arr[1])){
							elements.push(this);
						}
					}else if(value && value === arr[1]){
						elements.push(this);
					}
				}
			}
		});

		return elements;

	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-18
	 * 修改日期：2017-9-23
	 * 名称：Dom.closest
	 * 功能：查找最近匹配的祖先元素
	 * 说明：
	 * 注意：
	 *
	 * @param element{Element} 当前元素
	 * @param search{String}
	 * @returns {*}
	 */
	Dom.closest=function(element,search){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		if(!System.isString(search)){throw new Error('Warning: search 必须是字符串类型 ');}
		if(System.isHTMLHtmlEment(element)){return element;}
		var arr = [],name="",value="";
		var selector = null;
		if(search.indexOf('[') !== -1){//如果是属性选择符 ［xxx="xx"］
			selector = "arrt";
			search = search.replace(/^\[/g,'').replace(/\]$/g,'').replace(/"/g,'');
			arr = search.split("=");
			arr[0] = arr[0].toString().trim();
			arr[1] = arr[1].toString().trim();
			name = arr[0];
		}else if(search.indexOf('.') !== -1){//如果是类选择符
			selector = "class";
			search = search.replace(/^\./g,'').replace(/"/g,'').trim();
			arr = [];
			arr[1] = search;
			name = selector;
		}else if(search.indexOf('#') !== -1){//如果是id选择符
			selector = "id";
			search = search.replace(/^#/g,'').replace(/"/g,'').trim();
			arr = [];
			arr[1] = search;
			name = selector;
		}else{//标签选择器
			selector = "tag";
			search = search.replace(/"/g,'').trim();
			name = search;
		}

		while(element = element.parentNode){
			if(System.isHTMLHtmlEment(element)){return element;}
			if(1 === element.nodeType){
				if("tag" === selector){
					if(element.nodeName.toLocaleLowerCase() === name.toLocaleLowerCase()){
						return element;
					}
				}else{
					value = element.getAttribute(name);
					if("class" === selector){
						if(value && value.split(" ").in_array(arr[1])){
							return element;
						}
					}else if(value && value === arr[1]){
						return element;
					}
				}
			}
		}
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-28
	 * 修改日期：2014-12-22
	 * 名称：Dom.setStyle
	 * 功能：对多个节点元素批量设置同一个样式
	 * 说明：
	 * 注意：
	 * @param   {Array}nodes 			NO NULL :dom节点集合
	 * @param   {String}attr 			NO NULL :要设置样式属性
	 * @param   {String}value 			NO NULL :要设置样式属性的值
	 * @return  {*}
	 * Example：
	 */
	Dom.setStyle=function(nodes,attr,value){
		if(System.empty(nodes) || System.isString(nodes)){
			throw new Error('Warning: nodes 不能为空，或不能是字符串类型');
		}
		for(var i=0,len=nodes.length;i<len;i++){
			nodes[i].style[attr]=value;
		}
	};
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-28
	 * 修改日期：2014-12-22
	 * 名称：Dom.css
	 * 功能：设置
	 * 说明：
	 * 注意：
	 * @param   (Array)nodes 			NO NULL :dom节点集合
	 * @param   ({})D 			        NO NULL :多个样式数据 {k:v[,k:v[,...]]}
	 * @return  (void)
	 * Example：
	 */
	Dom.css=function(nodes,D){
		for(var prop in D){
			if(!D.hasOwnProperty(prop)) continue;
			Dom.setStyle(nodes,prop,D[prop]);
		}
	};
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-28
	 * 修改日期：2017-3-8
	 * 名称：[] hasClass
	 * 功能：查找指定的阶段中的是否有匹配的class 名称
	 * 说明：
	 * 注意：
	 * @param   {Element}node 			NO NULL :dom节点
	 * @param   {String}className 	NO NULL :要查找的类名称
	 * @returns {boolean}
	 */
	Dom.hasClass=function(node,className){
		if(node.classList){
			return node.classList.contains(className);
		}else{
			var names = node.className || node.getAttribute('class');
			if ((new RegExp("\\b"+className+"\\b")).test(names)){
				return true;
			}
		}
		return false;
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-28
	 * 修改日期：2017-9-11
	 * 名称：[] removeClass
	 * 功能：删除指定的class 名称
	 * 说明：
	 * 注意：
	 * @param   {Element}node 			NO NULL :dom节点
	 * @param   {String}className 	NO NULL :要查找的类名称
	 * @returns {*}
	 */
	Dom.removeClass=function(node,className){
		if (!Dom.hasClass(node,className)){return node;}
		if(node.classList){
			node.classList.remove(className);
		}else{
			var names = node.className || node.getAttribute('class');
			names = names.replace(new RegExp("\\b"+className+"\\b"),"").trim();
			if(node.className){
				node.className = names;
			}else{
				node.setAttribute('class',names);
			}
		}
		return node;
	};
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-28
	 * 修改日期：2017-9-11
	 * 名称：[] addClass
	 * 功能：添加指定的class 名称
	 * 说明：
	 * 注意：
	 * @param   {Element}node 			NO NULL :dom节点
	 * @param   {String}className 	NO NULL :要查找的类名称
	 * @returns {*}
	 */
	Dom.addClass=function(node,className){
		if (Dom.hasClass(node,className)){return node;}
		if(node.classList){
			node.classList.add(className);
		}else{
			var names = node.className || node.getAttribute('class');
			names = names.split(/\s+/);
			names.push(className);
			node.setAttribute('class',names.join(" ").trim());
		}
		return node;
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-11-28
	 * 修改日期：2017-9-11
	 * 名称：Dom.getElementsByClassName
	 * 功能：获取所有对应的类名称的集合
	 * 说明：
	 * 注意：
	 * @param   {String}s			 NO NULL :class 名称
	 * @param 	{Element}context 	上下文元素
	 * @param   {String}t 				NULL :tagName
	 * @returns {*|Array}			返回匹配的节点集合
	 */
	Dom.getElementsByClassName=function(s,context,t){//使用class获取元素
		context = context || document;
		if(document.getElementsByClassName){return context.getElementsByClassName(s);}
		var reg=new RegExp('\\b'+s+'\\b');
		var arr=[];
		var element=context.getElementsByTagName(t || '*');
		System.each(element,function(){
			if(reg.test(this.className || this.getAttribute('class')) || Dom.hasClass(this,s)){
				arr.push(this);
			}
		});
		return arr;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-7-13
	 * 修改日期：2017-9-19
	 * 名称：Dom.shtmlspecialchars
	 * 功能：替换字符串里指定的字符
	 * 说明：
	 * 注意：
	 * @param str{String}
	 * @param D{Object}
	 * @returns {*}
	 */
	Dom.shtmlspecialchars=function(str,D) {
		var defaults = {
			'chars':{
				'&': '&',
				'"': '"',
				'<': '<',
				'>': '>'
			}
		};
		D = System.isPlainObject(D) ? System.extend(D,[defaults]) : defaults;
		if(System.empty(str)){return false}
		var chars = D.chars;
		var k;
		for(k in chars){
			str = str.replace(eval('/'+k+'/g'), chars[k]);
		}
		return str;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-7-13
	 * 修改日期：2017-8-10
	 * 名称：Dom.filterSpaceNode
	 * 功能：过滤元素中包含的所有空白节点
	 * 说明：
	 * 注意：
	 * @param nodes
	 * @returns {Array}
	 */
	Dom.filterSpaceNode=function(nodes){//
		var ret=[];
		System.each(nodes,function(){
			if(3 === this.nodeType && /^\s+$/.test(this.nodeValue)) return true;//查找是否是文本节点且有空格
			ret.push(this);
		});
		return ret;
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2016-6-16
	 * 修改日期：2016-6-16
	 * 名称：Dom.zIndex
	 * 功能：设置或获取 z-index
	 * 说明：
	 * 注意：
	 * @param   (jQuery Object)$node 	NULL :jQuery object
	 * @param   (Number)zIndex 			NULL :设置z-index
	 * @return  (Number)
	 * Example：
	 */
	Dom.zIndex=function( $node,zIndex ) {
		$node = $node;
		if ( zIndex !== undefined ) {
			return $node.css( "zIndex", zIndex );
		}

		if ($node.length) {
			var elem = $($node[0]), position, value;
			while ( elem.length && elem[0] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if (position === "absolute" || position === "relative" || position === "fixed"){
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-19
	 * 名称：Dom.nextSibling
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {*}
	 */
	Dom.nextSibling=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		if(System.isHTMLHtmlEment(element)){return element;}
		if(element.nextSibling){
			var n=element.nextSibling;
			if(1 === n.nodeType) return n;
			while(n = n.nextSibling){//查找下一个节点----->下一个节点------->下一个节点.........直到没有节点为止
				if(1 === n.nodeType) return n;
			}
		}
		return element;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-19
	 * 名称：Dom.previousSibling
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {*}
	 */
	Dom.previousSibling=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		if(System.isHTMLHtmlEment(element)){return element;}
		if(element.previousSibling){
			var n=element.previousSibling;
			if(1 === n.nodeType) return n;
			while(n=n.previousSibling){//查找上一个节点----->上一个节点------->上一个节点.........直到没有节点为止
				if(1 === n.nodeType) return n;
			}
		}
		return null;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-19
	 * 名称：Dom.lastChild
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {*}
	 */
	Dom.lastChild=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		if(System.isHTMLHtmlEment(element)){return element;}
		if(element.lastChild){//有子节点的话
			var n=element.lastChild;
			if(1 === n.nodeType) return n;
			return Dom.previousSibling(n);
		}
		return null;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-19
	 * 名称：Dom.firstChild
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {*}
	 */
	Dom.firstChild=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		if(System.isHTMLHtmlEment(element)){return element;}
		if(element.firstChild){//有子节点的话
			var n=element.firstChild;
			if(1 === n.nodeType) return n;
			return Dom.nextSibling(n);
		}
		return null;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-13
	 * 修改日期：2017-9-19
	 * 名称：Dom.removeNode
	 * 功能：删除指定节点元素
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {Node}
	 */
	Dom.removeNode=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		return element.parentNode.removeChild(element);
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-13
	 * 修改日期：2017-9-19
	 * 名称：Dom.getParent
	 * 功能：获取指定节点的父节点元素
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {Node}
	 */
	Dom.getParent=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		return element.parentNode;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-13
	 * 修改日期：2017-9-19
	 * 名称：Dom.getName
	 * 功能：获取指定节点的标签名称
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {string}
	 */
	Dom.getName=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		return element.nodeName;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2017-9-13
	 * 修改日期：2017-9-19
	 * 名称：Dom.getType
	 * 功能：获取指定节点的类型
	 * 说明：
	 * 注意：
	 * @param element{Element}
	 * @returns {Number}
	 */
	Dom.getType=function(element){
		if(element.nodeType !== 1){throw new Error('Warning: element 必须是一个dom 节点元素 ');}
		return element.nodeType;
	};
	System['Dom']=Dom;

});
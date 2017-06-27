
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Helper','FindParentObject');
	System.is(System,'Dom');

	var __this__=null;
	var Node = System.Dom.extend({
		constructor: function (name,node){
			this.name=name;
			this.node=node;
			this.next=null;
		},
		/**
		 * 添加链表
		 * @param next
		 */
		'add':function(next){
			if(this.next != null){
				this.next.add(next);
			}else{
				this.next=next;
			}
		},
		/**
		 * 输出链表
		 * @param node
		 */
		'print':function(node){
			if(node!=null){
				if(node.next!=null){
					this.print(node.next);
				}
			}
		},
		/**
		 * 查找节点
		 * @param name
		 * @returns {*}
		 */
		'findNode':function(name){
			if(this.name === name){
				return true;
			}else{
				if(this.next!=null){
					return this.next.findNode(name);
				}
			}
			return false;
		},
		/**
		 * 删除指定节点
		 * @param node
		 * @param name
		 */
		'delNode':function(node,name){
			if(this.name==name){
				node.next=this.next
			}else{
				if(this.next!=null){
					this.next.delNode(this,name);
				}
			}
		}
	});

	var Link = Node.extend({
		constructor: function () {
			this.root=null;
		},
		'add':function(key,node){
			var node=new Node(key,node);
			if(this.root==null){
				this.root=node;
			}else{
				this.root.add(node);
			}
		},
		'find':function(key){
			if(this.root!=null){
				return this.root.findNode(key);
			}else{
				return false;
			}
		},
		/**
		 * 删除节点
		 * @param name
		 */
		'del':function(name){
			if(this.find(name)){
				if(this.root.name==name){
					if(this.root.next!=null){
						this.root=this.root.next;
					}else{
						this.root=null;
					}
				}else{
					if(this.root.next!=null){
						this.root.next.delNode(this.root,name);
					}
				}
			}
		},
		/**
		 * 输出
		 */
		'print':function(){
			if(this.root!=null){
				this.root.print(this.root);
			}
		}
	});

	var FindParentObject = System.Helper.extend({
		constructor: function () {
			__this__=this;
			this.root=null;
		},
		'_className':'FindParentObject',
		'__constructor':function(){},
		'find':function(obj,key){
			if(!System.isObject(obj)) {return false;}
			this.root=obj;
			if(key in obj){
				return obj;
			}

			for(var k in obj){
				this.find(obj[k],key);
			}


		},
		'set':function(Link,key,node){
			Link.add(key,node);
		},
		'getLink':function(){
			return new Link();
		},



		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销FindParentObject对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});
	System['FindParentObject']=FindParentObject;

});




/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：css类
 * 功能：服务于基于jQuery 的类
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
	System.is(System,'Browser','Css');


	var __this__=null;
	var document=window.document;



	var Css = System.Browser.extend({
		constructor: function(D) {
			__this__=this;
			var defaults ={
				"element":document.getElementById('div') || null
			};
			D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
			this.element = D.element;
		},
		'_className':'Css',

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Css对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	/**
	 * @author lhh
	 * 产品介绍：获取元素样式
	 * 创建日期：2015-4-2
	 * 修改日期：2017-9-11
	 * 名称：getComputedStyle
	 * 功能：获取元素样式，还可以获取伪类元素样式
	 * 说明：
	 * 注意：
	 * @param element 		NO NULL :用于获取计算样式的Element
	 * @param style	  		NO NULL :
	 * @param pseudoElt		   NULL :指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
	 * @returns {*}
	 */
	Css.getComputedStyle=function(element,style,pseudoElt){//（对象，属性名）获取当前的style元素里的css属性值
		return element.currentStyle? element.currentStyle[style] : document.defaultView.getComputedStyle(element,pseudoElt || null).getPropertyValue(style);
		//document.defaultView.getComputedStyle 这是w3c标准方法，取得元素的样式信息，因为有些样式是在外部css文件定义的，所以用element.style是取不到的 如果是IE,可以用 element.currentStyle["style"]
	};
	Css.getPropertyValue=function(){};
	Css.addRule=function(sheet,selector,cssText,i){//向指定样式表中添加一个CSS规则
		if(sheet.insertRule){//W3c
			sheet.insertRule(selector+"{"+cssText+"}",i);
		}else if(sheet.addRule){//IE
			sheet.addRule(selector,cssText,i);
		}
	};
	Css.delRule=function(sheet,index){
		if(sheet.deleteRule){
			sheet.deleteRule(index);
		}else if(sheet.removeRule){
			sheet.removeRule(index);
		}
	};
	/**
	 * @author lhh
	 * 产品介绍：设置元素样式
	 * 创建日期：2017-9-11
	 * 修改日期：2017-9-11
	 * 名称：css
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param element
	 * @param obj
	 */
	Css.css=function(element,obj){
		if(System.isPlainObject(obj)){
			System.each(obj,function(k,v){
				element.style[k] = v;
			});
		}

	};


	Css.setLinkStyle=function(D){//动态切换样式表
		/**forexample:
		 {
            'csslink':document.getElementById('dom'),
            'url':"skin/style/css/",
            'event':'onclick',
            'skin1':$('dom')

        }
		 */
		var key;
		var set=function(key){
			D[key][D['event']]=function(){
				D["csslink"].setAttribute("href",D["url"]+key+".css");
			};
		};
		for(key in D){
			if("csslink"===key || "url"===key || "event"===key) {continue;}
			set(key);
		}
	};

	System['Css']=Css;

});

/**
 * 创建人：lhh
 * 创建日期:2015-7-22
 * 修改日期:2016-9-10
 * 名称：助手类
 * 功能：
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[GRN_LHH].run([window,window.document],function(window,document,undefined){
	'use strict';
	var System=this;
	System.is(System,'Component','Helper');
	var __this__=null;

	var Helper = System.Component.extend({
		constructor: function() {
			__this__=this;
		},
		'_className':'Helper',
		//'init':function(){},
		'create':function(){},
		'add':function(){},
		'remove':function(){},
		'set':function(){},
		'get':function(){},
		'resize':function(){},
		'scroll':function(){},
		'run':function(){},
		'setOption':function(){},
		'redirect':function(){},
		'print':function(){},
		'checkout':function(){},
		'render':function(){},
		'find':function(){},
		'replace':function(){},
		'analysis':function(){},
		'__constructor':function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Helper对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});


	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) inputSizeGetProportion
	 * 功能：输入宽和高返回尺寸的比例
	 * 参数：Number $a
	 * 		 Number $b
	 * Example:
	 *		Basis.inputSizeGetProportion(1280,720);
	 *		w = 1280;
	 *		h = 720;
	 *		n = gcd(w, h);
	 *		echo w/n, ':', h/n;
	 *
	 */
	Helper.inputSizeGetProportion=function(w, h) {
		var gcd=function($a,$b){
			if($a%$b){
				return gcd($b, $a%$b);
			}else{
				return $b;
			}
		};

		var n=gcd(w,h);
		return w/n+' : '+h/n;
	};

	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(String) forSize
	 * 功能：输入1280px 参考尺寸返回一个什么样的宽度符合被平均分成3份并且符合 4:6 的一个尺寸
	 * 参数：Number a
	 * 		 Number b
	 * 		 Number size
	 * 		 Number n
	 * Example:
	 *		Basis.forSize(4,6,1280,3);
	 *		return :1280被平分3份后能被4整除，width,height
	 *
	 */
	Helper.forSize=function(a, b,size,n) {
		var w,h;
		w=h=0;
		while(true){
			if(0 === size%n && size !=0){
				//求出符合几比几的宽度
				w=size/n;
				if(0 === w%a){
					//求出符合几比几的高度
					h=(w/a)*b;
					return size+'被平分'+n+'份后能被'+a+'整除,得出最适合尺寸是：\
 						 W: ('+size+'/'+n+')='+w+'  \
						 H: ('+size+'/'+n+'/'+a+'*'+b+')='+h;
				}

			}
			size++;
		}

	};

	/**
	 * 创建日期：2014-9-3
	 * 修改日期：2014-9-3
	 * 名称：(Array) getToSize
	 * 功能：输入开始尺寸到结束尺寸范围内获取几比几的一个比例下有多少组尺寸符合
	 * 参数：Number a
	 * 		 Number b
	 * 		 Number s 开始值
	 * 		 Number e 结束值
	 *
	 * Example:
	 *		Basis.getToSize(4,6,1280,15000);
	 *
	 */
	Helper.getToSize=function(a, b,s,e) {
		if(!s) return;
		var arry=[];
		while(true){
			if(0 === s%a && s !=0){
				//arry.push({'w':s,'h':s/a*b});
				arry.push('{w:'+s+', h:'+(s/a*b)+'}');
			}
			if(s>e){
				return arry;
			}
			s++;
		}

	};
	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-11-27
	 * 修改日期：2015-9-7
	 * 名称：Helper.isjQuery
	 * 功能：检查jQuery是否已加载
	 * 说明：
	 * 注意：
	 * @param(String)src 			NO NULL : 要加载jQuery文件的路径
	 * @param(jQuery)$	        	   NULL : jQuery
	 * @return (String | Boolean)
	 * Example：
	 *
	 */
	Helper.isjQuery=function(src,$){
		$ = $ || window.jQuery;
		return (!$ ? System.import([src]) : 0);
	};



	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-5-27
	 * 修改日期：2015-5-27
	 * 名称：Helper.define
	 * 功能：程序主方法
	 * 说明：可传多个参数第一个必须是数组，在回调里接收的参数跟传来的参数一一对应
	 * 注意：
	 * @param   (Array)args 			NO NULL :传入的参数
	 * @param   (Function)callback 		NO NULL :调用main 方法要执行的操作
	 * @return  (voide)						:
	 * Example：
	 */
	Helper.define=function(args,callback){


	};

	System['Helper']=Helper;

});
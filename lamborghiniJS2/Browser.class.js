
/**
 * 创建人：lhh
 * 创建日期:2015/7/22	
 * 修改日期:2015/7/23	
 * 名称：浏览器兼容类
 * 功能：服务于基于jQuery 的类
 * 说明 : 这个基类不允许被直接实例化，要实例化它的派生类。
 *        
 * note : 
 * 		  
 *		
 * 
 */

window[GRN_LHH].run([window,window['document'],jQuery],function(window,document,$,undefined){
	'use strict';
	var System=this;
	System.is(System,'Helper','Browser');
	System.is(System,'Event');

	var __this__=null;
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-30
	 * 修改日期：2014-12-30
	 * 名称：private (int) getExplorer
	 * 功能：判断浏览器种类
	 * 说明：返回值对照：1:chrome;
	 * 					 2:Firefox;
	 * 					 3:ie;
	 * 					 4:Safari;
	 * 					 5:Opera
	 * 					 0:Other
	 * 注意：
	 * @param   (void)
	 * @return  {Number}
	 * Example：
	 */
	var getExplorer=function() {
		var explorer = window.navigator.userAgent ;
		//ie
		if (explorer.indexOf("MSIE") >= 0) {
			return 3;
		}
		//firefox
		else if (explorer.indexOf("Firefox") >= 0) {
			return 2;
		}
		//Chrome
		else if(explorer.indexOf("Chrome") >= 0){
			return 1;
		}
		//Opera
		else if(explorer.indexOf("Opera") >= 0){
			return 5;
		}
		//Safari
		else if(explorer.indexOf("Safari") >= 0){
			return 4;
		}else{
			return 0;
		}
	};
	var Browser = System.Helper.extend({
		constructor: function() {
			__this__=this;
		},
		'_className':'Browser',
		'__constructor':function(){},
		'resize_super':function(){},
		'scroll_super':function(){},
		'where':function(){},

		/**
		 * 创建日期：2014/11/28
		 * 修改日期：2016-9-8
		 * 名称：autoScreenCenter
		 * 功能：自动居中屏幕，回调函数可以不传，传过回调函数后就能在一个指定范围中垂直居中对齐
		 * @param	$div(jQuery obj) NO NULL : //被居中的容器
		 * @param 	padding(intger)     NULL : callBack
		 * @param 	fn(Function)        NULL : callBack 自定义居中外围的容器
		 * @return  (Browser)
		 *
		 *
		 */
		'autoScreenCenter':function($div,pandding,fn){
			pandding = pandding || 0;
			if('fixed' != $div.css('position') && 'absolute' != $div.css('position')){
				$div.css('position','absolute');

			}

			this.resize_super = Browser.resize($div,function($window){
				if(System.isFunction(fn)){
					fn.call($div,$window);
				}else{
					Browser.setElemAutoCenter($div,pandding);
				}
			});
			this.setFixed($div);
			return this;

		},
		/**
		 * 创建日期：2014/12/1
		 * 修改日期：2015/11/10
		 * 名称：(vido) setFixed
		 * 功能：给元素设置固定样式
		 * @param	$div(jQuery obj) NO NULL : //被设置的元素
		 * @return  (Browser)
		 *
		 *
		 */
		'setFixed':function($div){
			if('fixed' != $div.css('position')){
				$div.css('position','absolute');
				this.scroll_super = function(){
					this.resize_super();
					Browser.fixed_element($div);
				};
			}
			return this;
		},
		'showDialog':function(url){
			var feature;
			if(document.all){//IE
				feature="dialogWidth:300px;dialogHeight:200px;status:no;help:no";
				this.window=window.showModalDialog(url,null,feature);
			}else{
				//modeBrowserDialog可以将modal换成dialog=yes
				feature ="width=300,height=200,menubar=no,toolbar=no,location=no,";
				feature+="scrollbars=no,status=no,modal=yes";
				this.window=window.open(url,null,feature);
			}
		},
		'showDialog_close':function(){
			if(this.window){
				this.window.close();
			}

		},


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Browser对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'destructor':function(){}
	});



	Browser.getExplorer=function(){
		return getExplorer();
	};
	Browser.isIE=function(){
		return !!window.ActiveXObject;
		//简短
		//return !-[1,];
		//浏览器检测
		//return /MSIE/.test(navigator.userAgent);
	};
	Browser.isIE6=function(){
		//if(!-[1,] && !window.XMLHttpRequest){
		if(Browser.isIE() && !window.XMLHttpRequest){
			return true;
		}else{
			return false;
		}
	};
	Browser.isIE8=function(){
		if(Browser.isIE() && !!document.documentMode){
			return true;
		}else{
			return false;
		}
	};
	Browser.isIE7=function(){
		if(Browser.isIE() && !Browser.isIE6() && !Browser.isIE8()){
			return true;
		}else{
			return false;
		}
	};

	Browser.isFirefox=function(){
		return (2===getExplorer());
	};
	Browser.isChrome=function(){
		return (1===getExplorer());
	};
	Browser.isSafari=function(){
		return (4===getExplorer());
	};
	Browser.isOpera=function(){
		return (5===getExplorer());
	};


	Browser.fixEvt = System.Event.fixEvt;
	Browser.bind = System.Event.bind;
	Browser.mousewheel = System.Event.mousewheel;


	/**
	 * 创建日期：2014/8/29
	 * 修改日期：2017/3/9
	 * 名称： getBodySize
	 * 功能：获取网页的宽度和高度
	 * @param 	String size   	需要的宽（w）或高（h）
	 * @param 	Numver n   		获取哪种方式 默认不用输入
	 * @return  (Number | Array) 如果参数size存在，则返回相应宽或高，如果size没有写则返回数组
	 */
	Browser.getBodySize=function(size,n) {
		var bodySize = [];
		switch(n){
			case 1:
				if($(document.body).width()>$(window).width() && $(document.body).width()>$(document).width()){
					bodySize['w']=$(document.body).width();
				}else if($(window).width()>$(document).width()){
					bodySize['w']=$(window).width();
				}else{
					bodySize['w']=$(document).width();
				}


				if($(document.body).height()>$(window).height() && $(document.body).height()>$(document).height()){
					bodySize['h']=$(document.body).height();
				}else if($(window).height()>$(document).height()){
					bodySize['h']=$(window).height();
				}else{
					bodySize['h']=$(document).height();
				}

				break;
			default:
				bodySize['w']=($(document.body).width()>$(window).width())? $(document.body).width():$(window).width();
				bodySize['h']=($(document.body).height()>$(window).height())? $(document.body).height():$(window).height();


		}
		if(System.LAM_DEBUG){
			console.log('window:'+$(window).height() +'|document.body:'+$(document.body).height() +'|document:'+$(document).height()+'|bodySize[h]:'+bodySize['h']+'|bodySize:'+bodySize)
		}
		return size?bodySize[size]:bodySize;
	};



	/**
	 * 创建日期：
	 * 修改日期：
	 * 名称：getViewWH
	 * 功能：了解两个名词：BackCompat 标准兼容模式关闭（怪异模式）CSS1Compat 标准兼容模式开启
	 *		这个方法为获取页面可视区域的高度，普通情况下，window.innerHeight 即可获取，如果是正常模式，并且有clientHeight的情况下，
	 *		document.documentElement.clientHeight 获取的就是可视区域高度。在怪异模式下，是使用document.body获取。
	 * @param   (voide)
	 * @return  (Object)
	 *
	 */
	Browser.getViewWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=window["inner".concat(a)] || document.compatMode ==="CSS1Compat" && document.documentElement["client".concat(a)] || document.body["client".concat(a)];
		});
		return wh;
	};

	/**
	 * 创建日期：
	 * 修改日期：
	 * 名称： getBodyWH
	 * 功能： 这个为获取页面的高度，用于iframe的自适应时候获取。
	 * @param   (voide)
	 * @return  (Object)
	 */
	Browser.getBodyWH=function(){
		var wh = {};
		"Height Width".replace(/[^\s]+/g,function(a){
			var b = a.toLowerCase();
			wh[b]=document.compatMode ==="CSS1Compat" && document.documentElement["scroll".concat(a)] || document.body["scroll".concat(a)];
		});
		return wh;
	};
	Browser.befor_scrollTop = 0;
	/**
	 * 创建日期：2014/12/1
	 * 修改日期：2016-9-8
	 * 名称： fixed_element
	 * 功能： 固定元素 （模拟css fixed 功能）
	 * @param (jQuery)$elem 被fixed 的元素
	 * @param (jQuery)$context 出现滚动条的容器，默认是窗口
	 * @param (Boolean)animate 是否有缓冲效果 默认没有
	 */
	Browser.fixed_element=function($elem,$context,animate){
		$context = $context || $(document);
		var befor_scrollTop = Browser.befor_scrollTop;
		var scrollTop = $context.scrollTop();
		var top = $elem.offset().top;

		if(scrollTop > 0 || befor_scrollTop < scrollTop){
			top+=scrollTop;
		}else if(scrollTop < 0 || befor_scrollTop > scrollTop){
			top-=scrollTop;
		}
		if(animate){
			$elem.stop();
			$elem.animate({'top':top});


		}else{
			$elem.css({'top':top});
		}

		Browser.befor_scrollTop = scrollTop;
		if(System.LAM_DEBUG){
			console.log(scrollTop);
		}
	};



	Browser.addFavorite_2=function(address,name){//添加到收藏夹（地址，关键字）
		if(window.external && ("addFavorite" in window.external)){//IE
			window.external.addFavorite(address,name);
		}else if(window.sidebar && window.sidebar.addPanel){//FF
			window.sidebar.addPanel(name,address,name);
		}else{
			alert("加入收藏失败，请按Ctrl+D进行添加");
		}
	};

	/**
	 * 名称：addFavorite
	 * 功能：加入到收藏夹
	 *
	 */
	Browser.addFavorite=function(name,url){
		var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd': 'CTRL';
		if(document.all){
			window.external.addFavorite(url,name);
		}else if(window.sidebar){
			window.sidebar.addPanel(name,url, "");
		}else{
			alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');
		}
	};


	Browser.getDPI=function() {
		var arrDPI = [];
		if (window.screen.deviceXDPI) {
			arrDPI[0] = window.screen.deviceXDPI;
			arrDPI[1] = window.screen.deviceYDPI;
		}
		else {
			var tmpNode = document.createElement("DIV");
			tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
			document.body.appendChild(tmpNode);
			arrDPI[0] = parseInt(tmpNode.offsetWidth);
			arrDPI[1] = parseInt(tmpNode.offsetHeight);
			tmpNode.parentNode.removeChild(tmpNode);
		}
		return arrDPI;
	};

	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-25
	 * 修改日期：2014-12-25
	 * 名称：getScrollTop
	 * 功能：获取滚动条距离顶端的距离
	 * 说明：支持IE6
	 * 注意：
	 * @return {Number}
	 * Example：
	 */
	Browser.getScrollTop=function(){
		var scrollPos;
		if (window.pageYOffset){
			scrollPos = window.pageYOffset;
		}else if (document.compatMode && document.compatMode != 'BackCompat'){
			scrollPos = document.documentElement.scrollTop;
		}else if (document.body) {
			scrollPos = document.body.scrollTop;
		}
		return scrollPos;
	};

	Browser.getDocument_body=function(){
		return document.documentElement || document.body;
	};


	/**
	 * 创建日期：2014/12/1
	 * 修改日期：2014/12/1
	 * 名称：(vido) Browser.setFixed
	 * 功能：给元素设置固定样式
	 * @param	$div(jQuery obj) NO NULL : //被设置的元素
	 * @param 	fn(Function)        NULL : callBack 在scroll 时要执行的行为
	 * @return  (Function)
	 *
	 *
	 */
	Browser.setFixed=function($div,fn){
		if('fixed' != $div.css('position')){
			$div.css('position','absolute');
			var scroll=function(){
				System.isFunction(fn) && fn();
				Browser.fixed_element($div);
			};
			return scroll;
		}

	};
	/**
	 *
	 * @author lhh
	 * 功能：让元素水平垂直居中
	 * 名称：Browser.setElemAutoCenter
	 * 创建日期：2016-9-8
	 * 修改日期：2016-9-8
	 * @param   $div{jQuery} NO NULL : //被居中的容器
	 * @param 	padding{int}    NULL :容器的padding 值
	 * @return  (void)
	 * 调用方式：
	 *
	 */
	Browser.setElemAutoCenter=function($div,pandding){
		$div = $div || this;
		if('fixed' != $div.css('position') && 'absolute' != $div.css('position')){
			$div.css('position','absolute');

		}
		var size=System.autoCenter($(window).width(),$div.width(),
			$(window).height(),$div.height(),pandding || 0);
		$div.css({
					'top' :size.y+'px',
			      	'left':size.x+'px'
				});

	};

	/**
	 *
	 * @author lhh
	 * 功能：窗口重新调整大小
	 * 名称：Browser.resize
	 * 创建日期：2014-11-28
	 * 修改日期：2014-11-28
	 * @param	        $div(jQuery obj) NO NULL : //被居中的容器
	 * @param(Object) 	fn(Function)     NO NULL : callBack
	 * @return  (Function) 时时计算垂直水平居中的函数原型
	 * 调用方式：
		 Browser.resize($('div'),function(){
							 var size=window.System.autoCenter($(window).width(),this.width(),
															   $(window).height(),this.height(),100);
								this.css({'top':size.y+'px',
										 'left':size.x+'px'
										});
						});
	 *
	 */
	Browser.resize=function($div,fn){
		if(!System.isFunction(fn)) {
			throw new Error("缺少回调函数");
			return null;
		}
		return function(){
			fn.call($div,{'w':$(window).width(),'h':$(window).height()});
		};
	};


	/**
	 * 创建日期：2014/8/26
	 * 修改日期：2014/8/26
	 * 名称：(vido) setIEfixed
	 * 功能：IE 6,7固定位置
	 * 参数： $elem (jQuery obj)
	 * @return  (Function)
	 *
	 */
	Browser.setIEfixed=function($elem){
		if(Browser.isIE6()){
			$elem.css('position','absolute');
			var scroll=function(){
				$elem.animate({'top': $(document).scrollTop()},10);
			};
			return scroll;
		}
	};
	Browser.innerSize=function(){//获取浏览器窗口视口宽度和高度
		return{
			width  : window.innerWidth  || document.documentElement.clientWidth,
			height : window.innerHeight || document.documentElement.clientHeight
		};
	};
	
	/**
	 *
	 * @author lhh
	 * 功能：滚动
	 * 名称：Browser.scroll
	 * 创建日期：2015-11-06
	 * 修改日期：2015-11-06
	 * @param()
	 * @return
	 * 调用方式：

	 *
	 */
	Browser.scroll = function(){};


	System['Browser']=Browser;

});
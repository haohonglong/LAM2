# LAM2
继承用 <a href="http://dean.edwards.name/weblog/2006/03/base/" target="_blank">Base.js</a>


	name    ：LamborghiniJS(OO JS)
	version ：2.0.5
	author  ：lhh
	创建日期 ：2017-8-27
	修改日期 ：2018-1-22


# 产品介绍：

	LamborghiniJS 不是插件，是一种javascript OO思想实现的类库，它可以为生产应用框架做更好的基础服务。
	LamborghiniJS 的诞生初衷是自2013年起,为解决自己工作方便写的小工具,发展到现在的一个类库思想实现.
	LamborghiniJS 的目的:继承、覆写、重用！ 少写重复性的代码,封装已通过测试功能的成熟代码,便于以后开发中复用.
	LamborghiniJS 里有命名空间的概念,每一个类都要通过命名空间去调用.(参考 二、开发约定 类结构)
	LamborghiniJS 里有文件加载器机制,可以在.js文件里直接加载其它.js文件(参考 五、文件加载器)
	LamborghiniJS 里有沙箱机制(参考 十四、沙箱)
	LamborghiniJS 里有hashcode概念（参考 十五、hashcode）
	LamborghiniJS 里有模版标签概念（参考 十八、模版标签）
	LamborghiniJS 里有MVC概念（参考 十九、MVC）
	LamborghiniJS 里有缓存概念（参考 二十一、缓存机制）

	现有的实例：
		选项卡、拖拽、常用工具、弹出层、幻灯、棋盘、缩略图、自适应布局、html5绘图基础类
	如要根据项目需求要修改或扩展现有的这些实例，要这样做：
		1.创建一个子类继承父类(现有的实例的类)
		2.覆写父类里的成员(属性和方法)
	(继承参考 六、继承)


# 文件说明：
		
#### 文件夹结构：
		|-LAM      		 #项目根目录
			|-documentation  #手册文档
			|-demo 		 #
				|-views	 #html文件
					|-index	 #html文件
						|-config.js	 #当前配置文件
			|-composer  #脚手架工具
			|-common  #公共文件
				|-css  
				|-js  
				|-data #json数据  
				|-plugins #插件  
				|-config  #配置文件存放位置
					|-config.js  #主配置文件
					|-init.js  #每个页面公用的.js文件
			|-lamborghiniJS  #lamborghiniJS 核心类库文件
			|-project  	 #项目demo文件
				|-controllers #控制器渲染对应的页面
				|-views   #项目中所有页面
				|-doc #文档说明
				|-css #只关联当前项目
				|-js  #只关联当前项目
				|-images #只关联当前项目

	类成员属性：
		 class:
			 |-Basis.class
				|-
			 |-BiObject.class
				|-
			 |-Component.class
				|-
         
            
         


# 类库声明：
	
# 类库说明：
	
### 使用：
		1.给全局变量_ROOT_ 分配路径（这一步可以省略，可以在当前配置文件里配置）
			<script type="text/javascript">var _ROOT_ = '../..'</script>
		2.引入当前配置文件或主配置文件,文件的位置可以随便放，也可放在项目根目录（具体配置参考 一、配置）
			<script type="text/javascript" src="./config.js"></script>
		3.可以使用LAMJS对象了。
			<script type="text/javascript">
				LAMJS.run(function() {
					'use strict';
					var System=this;
					// doing here coded ....
				});
			</script>
		>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>	
		tip:
			
			config.js 分为两个，一个是当前配置文件(对应当前的视图或控制器的位置)，一个是主配置文件。
			当前配置文件是跟视图文件或者控制器文件在同级目录里，
			当前配置文件的作用：
				1.配置项目主目录路径（修改factory函数的第二和第三参数）
				2.检测类库文件是否已被加载过
				3.引入主配置文件
			内容如下：
			>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				(function(window,factory){
                    'use strict';
                    factory(window,"../..","/common/config/config.js");
                })(typeof window !== "undefined" ? window : this,function(window,ROOT,url){
                    'use strict';
                    if(window.GRN_LHH && window[GRN_LHH] != undefined){return;}
                    if(!window._ROOT_){
                        window._ROOT_ = ROOT;
                    }else{
                        ROOT = window._ROOT_;
                    }
                    var tag = "script",attrs=[];
                    attrs.push('type="text/javascript"');
                    url=ROOT+url;
                    document.write('<',tag,' ',attrs.join(' '),'src=','"',url,'"','>','<','/',tag,'>');
                });

			<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
		

## 一、主配置文件配置 参考 二、开发约定
		tip:
			只有主配置文件和当前配置文件跟项目绑定的,类库文件可以在开发过程中任何时候，更改到其它地方（多个项目公用一个类库文件夹，此时类库文件夹就可移动项目文件夹外面）,移动后只要重新修改主配置文件 vendorPath 的值即可。
	    主配置文件详细内容见 common/config/config.js
		
		
        根据下面三条修改主配置文件对应的参数
			1.修改 GRN_LHH 的值
			2.修改 System.Config.vendorPath 的值
		
		为什么要像上面这样做呢？当文件里引用外部文件的位置发生改变不用打开每个页面修改，只要修改一个地方就可以解决。
		想一下如果我的所有静态都都写好了，要是多个项目共享一个LAM 类库（不需要项目里都再copy 一个LAM,当然你也可以这么做）。这时要移动LAM文件夹的位置,通常做法修改每个页面里引用LAM类库的src，
		如果一两个还可以，但要是n个文件呢，是不是我们都要每个文件都要打开修改一遍呢，当然有些IDE 有批量修改的功能（批量修改还会误操作）。如果我们只修改一个地方就解决这个问题，这样是不是比批量修改更快呢？而且避免误操作。
		所以上面的配置文件就是包含解决这个问题的方式。

		主配置文件文件里做的事情是：
			1.配置类库文件的路径信息及别的相关信息
			2.加载基础类文件
			3.加载加载器工具
			4.加载初始化文件(或是init.js)
			5.检测框架文件路径加载是否正确

		'init.js'文件里做的事情是：加载每个页面通用的js文件
		 (参考 五、文件加载器)


## 二、开发约定
	
		'GRN_LHH'(GRN 是 'GLOBAL—REGISTER-NAMESPACE' 的缩写) 在'config.js'里设定,常量名: GRN_LHH 是框架里定死的禁止改动，可以修改变量的值,
		也就是说框架的命名空间可以用户自定义（参考 四、命名空间灵活 与其他插件无冲突）。
		禁止修改'Basis.class.js'里的 'GRN_LHH' 的值。
		成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
		调用基类的静态成员方法:(调用接口.类名称.静态成员)。
        基类不允许被直接实例化，要实例化它的派生类。
        
        
        1.全局常量:字符大写，俩边各一个下横线
        	expmple:
        		_ROOT_  = '项目根目录';
        2.全局变量:字符小写
        	
        3.对象里的私有属性
        
            

        不能被直接实例化的类：
        	{
        		'Basis'      		:function(){},
        		'Component'      	:function(){},
        		'Helper'     		:function(){},
        		'Browser'    		:function(){}
        	}

        所有类列表
        	{}代表单例对象
        all classes：
        	{
        		'Basis'      		:function(){},
        		'Loader'   		    :{},
        		'BiObject'   		:function(){},
        		'Component'      	:function(){},
        		'Cache'				:function(){},
        		'Helper'     		:function(){},
        		'Controller'     	:function(){},
        		'Browser'    		:function(){},
        		'Template'    		:function(){},
        		'Event'      		:function(){},
        		'Dom'        		:function(){},
        		'Cookie'     		:function(){},
        		'Html'        		:function(){},
        		'Drag'       		:function(){},
        		'Drag_xy'    		:function(){},
        		'Error'      		:function(){},
        		'FakeSelect' 		:function(){},
        		'Fsc'        		:function(){},
        		'Less'       		:function(){},
        		'Linklist'   		:function(){},
        		'PopupLayer' 		:function(){},
        		'Roll'       		:function(){},
        		'Layout'            :function(){},
                'AutoLayout'        :function(){},
                'Thumbnail'         :function(){},
        		'Slider'     		:function(){},
        		'Sport'      		:function(){},
        		'Tab'        		:function(){},
        		'Tools'      		:{},
        		'Css'        		:function(){},
        		'FindParentObject'	:function(){},
        		'Widget'			:function(){},
                'Tree'				:function(){},
        		'Html5': {
					'Svg': function(){},
					'Canvas': function(){},
					'Shape': function(){},//基本形
					'Chess': function(){}//棋盘类
				},
				'View': function(){},
				'Validation':function(){},
				'Widget': function(){}
        	}

			类结构:(继承参考 六、继承) 继承用basejs方式 
			Example: 
				window[GRN_LHH].run([window],function(window,undefined){
					'use strict';
					var System=this;
					System.is(System,'superName','className');
					
					var __this__=null;

					var className = System.superName.extend({
                    		constructor: function (D){
                    			
                    		},
                    		/**
                    		 *
                    		 * @author lhh
                    		 * 产品介绍：析构方法
                    		 * 创建日期：2015-4-2
                    		 * 修改日期：2015-4-2
                    		 * 名称：destructor
                    		 * 功能：在注销Fsc对象时调用此方法
                    		 * 说明：
                    		 * 注意：
                    		 * @return  ()						:
                    		 * Example：
                    		 */
                    		'destructor':function(){}
                    	});
                    
                    	System['className']=className;

				});


## 三、功能模块扩充
		功能独立 易于扩充 不影响原有功能
		1.归并对象LAMJS.merge();(参考 八、框架里的属性和方法)
			
		2.克隆对象LAMJS.clone();(参考 八、框架里的属性和方法)
		
		3.实例化后，晚期扩充成员的方法
			var obj=new window['interfaceName'].classNme();
			obj.merge(args,override);
			参数说明：
					@param :(Array)args   	 要合并对象的集合
					@param :(Boolean)override 是否覆盖同名键名值,默认 false 是不覆盖
			上面的方法是在当前实例中扩充成员

## 四、命名空间灵活 与其他插件无冲突
		命名空间接口设计的宗旨是:只要修改一处即可搞定一切与第三方插件的冲突，命名空间的命名权限提供给用户，用户可以随意命名。
		命名空间接口定义: var GRN_LHH='interfaceName';
        命名空间接口调用: window[GRN_LHH]  或者 window['interfaceName'] 或者 LamborghiniJS_20150910123700_ 或者 LAMJS
		命名空间接口的设计是灵活的，修改接口名不影响库文件里的内核代码及类接口。
        与第三方插件发生冲突时解决方法:  修改主配置文件config.js 里的变量 'GRN_LHH' 里的值 即可。'GRN_LHH' 是命名空间接口的密钥 作用是定义命名空间。
        note:不能在框架加载完成后修改 'GRN_LHH' 里的值，必须在没加载前修改！！！ 


## 五、文件加载器
		文件加载器检测机制(参考 十、检测机制 文件加载器)
		文件加载器有load()和import()两种调用方法。
		1.执行import()方法时，先调用importScript()方法 加载 .js
		2.如果1 不能执行，就用xhr方式加载 .js ，这种方式可以在.js文件里直接加载其它.js文件
		3.如果不支持xhr方式，就调用 load() 方法
			1.下面这种不仅适合脚本文件和样式文件的引入还适合less文件的引入。load方法是加载指定的文件到加载器中，load方法可以链式调用多个不同类型文件，当调用到print方法的时候才会一次性从加载器里输出到页面中
				LAMJS.Loader
					.load({
						'baseUrl':jsPath,//baseUrl 默认是 项目的根目录（_ROOT_）
						'suffix':'.js',//
						'js':[
							'/Helper.class',
							'/Browser.class',
							'/Drag.class',
							'/Dom.class',
							'/Tools.class',
							'/PaintBase.class'
						]
					})
					.load({
						'baseUrl':cssPath,
						'suffix':'.css',
						'rel':'stylesheet',
						'css':[
							{'href':'/Browser','class':'c1'},
							{'href':'/Drag','id':'t2'},
							'/reset',
							'/global',
							'/lib'
						]
					})
					//按照规则加载任何标签如:meat 后缀名不能省略。（load link script 最终走的这个方法）
					.load({rules:[
								  {
									 tag: 'css',
									 single:false,
									 use: [
									   '/global.css',
                                       '/lib.css'
									 ],
									 attr:{},
									 after_fn:function(){}
								   }
							   ]})
					.load({
						'baseUrl':lessPath,
						'suffix':'.less',
						'rel':'stylesheet/less',
						'css':[
							'/reset',
							'/global',
							'/lib'
						]
					}).print();
					
			上面依次输出的是js、css、less文件。用对象的方式可以传自定义参数

			2.调用加载器时打印出指定标签(或自定义标签)
						LAMJS.Loader
            					.load({//打印指定的标签（tag 属性是打印出指定的标签）
            						'tag':[
            							System.Html.tag(true,'meta',{"name":"csrf-param","content":"_csrf"}),
            							System.Html.tag(true,'meta',{"name":"csrf-param","content":"YWdSbEhVZnElMDUmGRQnMwsQGg4ROFUCDg8qDSlkNggVHmYpAXgtRg=="}),
            							System.Html.tag('title',{},'PaperPass论文检测_论文查重_免费论文检测系统_毕业论文抄袭检测'),
            							System.Html.tag(true,'meta',{"name":"description","content":"★PaperPass★论文检测-全球首个中文论文相似度检测网站;提供论文查重,免费论文检测系统,毕业论文抄袭检测。最权威,动态指纹技术保障,已服务超300万人论文检测。"}),
            							System.Html.tag(true,'meta',{"name":"keywords","content":"论文,论文检测,论文查重,免费论文检测,检测系统,论文抄袭,毕业论文"}),
            						]
            					})
            					.print();
				
			注意：tag 、js 、css 属性名称在load方法里只能选择一个。选择了tag属性时其余的属性都可不用,打印指定标签时必须要调用Html对象里的静态方法tag
				
			3.下面这种仅适合脚本文件的引入（只引入脚本时推荐使用这种方式）
			用xhr方式加载 System.Xhr.include() 和 System.import() 这俩方法几乎类似,不同的时 System.import() 调用的是jQuery ajax 方式 ，System.Xhr.include() 用的是原生的XMLHttpRequest
				System.import(['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js'],false);

				System
					.import([
						'/Browser.class'
					],System.classPath);
					
					System.classPath 不填的话 默认是 项目的根目录（System.ROOT）

				非xhr方式添加自定义参数
				System
					.import([
						{'src':'/Browser.class','data-main':'scripts/main.js'},
						{'src':'/Drag.class','attr':2},
						{'src':'/Drag_xy.class','attr':3},
						{'src':'/Dom.class','attr':4}
					],System.classPath,null,{xhr:false});
				
				也可以链式调用
				System
					.import(['http://apps.bdimg.com/libs/jquery/1.6.4/jquery.js'],false)
					.import([
	                    '/Browser.class',
	                    '/Drag.class',
	                    '/Dom.class',
	                    '/Tools.class',
	                    '/PaintBase.class'
	                ],System.classPath);



## 六、继承
		在类继承之前要先进行检测。
		每一个组件除了继承基类中的配置属性以外, 还会根据需要增加自己的配置属性, 另外 子类中有的时候还会把父类的一些配置属性的含义及用途重新定义
		System.is方法是检测的作用。检测父类是否已注册过。检测子类名称是否与已注册的类名重名了。这句话必须放在第一行。
		LAM2 继承用basejs方式 

## 七、原始对象的原型链上扩充的方法列表
			Function.method();
			
			Date.format();
			
			String.trim();
			String.filterChar();
			String.findStr();
			String.compareTwoStr(s);
			
			Array.indexOf();
			Array.lastIndexOf();
			Array.remove();
			Array.del();
			Array.contains();
			Array.copy();
			Array.insertAt();
			Array.insertBefore();
			Array.removeAt();
			Array.remove();
			Array.each();
			Array.filter();
			Array.in_array();
			Array.clone();
				 名称：clone
                 功能：克隆数组
                 说明：跟copy 是等效的 推荐用clone
                 注意：
                 @param   (void)
                 调用方式：
                 @return  (Array)返回克隆后的数组
                 Example：[2,3].clone();
			Array.merge(arr,override);
				 名称：merge
                 功能：合并数组
                 说明：
                 注意：
                 @param   (Array)arr				NO NULL : //要被合并的数组
                 @param   (Boolean)override 		   NULL : //是否覆盖相同的值,true : 覆盖；false : 不覆盖；默认不覆盖
                 调用方式：
                 @return  (Array)返回复制后的数组
                 Example：下面俩种方式任选其一
                 		a.merge(b).merge(c).merge(e).merge(f);
                  		a.merge(b.merge(c.merge(d.merge(e.merge(f)))));

## 八、框架里的属性和方法
		属性：	
			
			LAMJS.app//这个属性代表当前实例化后的对象  
		方法：	
			LAMJS.is(Obj,useClassName,className,path);
				 产品介绍： class文件检验器
				 名称： System.is
				 功能：检测namespace是否合法，检测要使用的类是否已加载过,如没加载就调用System.import()方法加载要使用的类，(namespace 必须是对象，useClassName是类名称)；检测要定义的类名称之前是否已注册过。
				 说明：子类继承父类之前调用此方法检测父类之前是否有加载过，如果填写第三参数可检测当前的类是否跟之前的类重名了
				 注意：当Obj 类型是对象时 useClassName 参数必须要传！ 没传命名空间时 useClassName 参数可以省略不传
				 @param  (Object)namespace 	       		 NULL : 命名空间
				 @param  (String)useClassName     	  	 NULL : 要使用的类名称
				 @param  (String)className         	　　 NULL : 当前类的名称
				 @param  (String)path         	　　     NULL : 要使用的类的路径
				 @return (Boolean)
			LAMJS.run(args,callback);//此方法提供俩个参数，
				 名称：run
                 功能：程序主方法
                 说明：
				 @param   (Array)args 			       NULL :传入的参数,里面的的元素和回调函数的参数试一一对应的。（可选）
				 @param   (Function)callback 		NO NULL :在运行此方法要立马执行的操作,这里的this指的是LAMJS 对象（必选）
				 @return  (Object) 返回callback 里的返回值
			LAMJS.then(args,callback);
				 名称：then
				 功能：支持链式调用，总是返回当前命名空间对象，
				 说明：跟run方法类似，不同的是run 返回的是callback里的返回值。
				 注意：
				 @param   (Array)args 			       NULL :传入的参数,里面的的元素和回调函数的参数试一一对应的。（可选）
                 @param   (Function)callback 		NO NULL :在运行此方法要立马执行的操作,这里的this指的是LAMJS 对象（必选）
			LAMJS.wait(args,callback,time);//在延时的时间后在执行，默认时间是3秒
				 名称：wait
				 功能：支持链式调用，总是返回当前命名空间对象，
				 说明：与main方法功类似,不同的是每隔规定的时间数再去调用传进来的函数
				 注意：
				 @param   (Array)args 			   NULL :传入的参数,里面的的元素和回调函数的参数试一一对应的。（可选）
				 @param   (Function)callback 		NO NULL :在运行此方法要等待多长时间才执行的操作,这里的this指的是LAMJS 对象（必选）
				 @param   (Number)time 			   NULL :等待执行的时间
				 @return  (System)
			LAMJS.use();   用document.createElement() 引入js,css 
            LAMJS.unuse(); 用document.write() 引入js,css
			LAMJS.print('s'[,1,'a',...]);//打印
			LAMJS.get(name);
				 名称：get
		         功能：根据指定的url参数获取相对应的参数值
		         说明：
		         注意：
		         @param   (String)name            NO NULL :参数名称
		         @return  {String}
				
			LAMJS.import(url,baseUrl,suffix,X);（参考 五、文件加载器）
				 名称：import
	             功能：导入指定的js文件
	             注意：
	             @param   (Array)url 			    NO NULL :要加载js文件
	             @param   (String)baseUrl 		   NULL :文件路径
	             @param   (String)suffix 		       NULL :文件后缀名
	             @param   (Object)X 		       NULL :是否异步加载配置参数
			LAMJS.Loader.replace_tpl();//替换模板标签
			LAMJS.Loader.load(D);//导入js,css.less 文件（参考 五、文件加载器）
				  名称： load
                  功能：动态创建js,css 标签引入公共文件
                  说明：js 和 css 任选其一
                  @params   (Object)D 			NO NULL :初始化参数
                  @param(Array)D.js		  	     NO NULL:js文件集合
                  @param(Array)D.css		  	     NO NULL:css文件集合
                  @param(String)D.baseUrl		  	    NULL:文件路径
                  @param(String)D.suffix		  	    NULL:文件后缀名
                  注意：
                  @return  (Object) 返回当前对象
			
			LAMJS.arr_isEmpty();
			LAMJS.queues();//队列
			LAMJS.length();//获取对象成员的长度
			LAMJS.eval();
				 名称：eval
                 功能：对表达式字符串，或 json 进行eval 再处理
                 说明：
                 注意：
                 @param   {*}expression 			NO NULL :表达式字符串
                 @return  {*}	
			LAMJS.proxy();
			LAMJS.putIndexGetObjectTheValue();
			LAMJS.search();
				 名称： search
	             功能：递归对象搜索
	             说明：如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象为止
	             注意：
	             @param 	(Object)D             			NO NULL : 对象
	             @param 	(Funtion)callback             	NO NULL : 回调方法
	             @returns {Object}
			LAMJS.extends(subClass,superClass,type,args);
				 名称：System.extends
                 功能：子类继承父类对象
                 说明：System类范围内
                 注意：这里的this指向的不是 System 对象
                 @param   (Object)this 			NO NULL :子类对象
                 @param   (Function)subClass 		   NULL :子类名称
                 @param   (Function)superClass   	NO NULL :父类名称
                 @param   (String)type 			NO NULL :1:原型链反射继承;2(默认):对象冒充方式继承
                 @param   ([])args 			   	   NULL :继承父类时传的构造参数
                 @return  (void)
                 Example：
                 		对象冒充方式继承:System.extends.call(this,subClass,superClass,type,[,extraParameters]);
                 		原型链继承:System.extends(subClass,superClass,type);
			LAMJS.extend();
			LAMJS.merge([true,]target,args[,override]);
					名称：merge
					功能：一个或多个对象合并成一个指定的对象,默认同名的键值前面的不会被覆盖
					说明：
					注意：
                    @param : (Boolean)deep  		   NULL :是否要深度拷贝对象(可填)
                    @param :(Object)target   合并后的对象。null 代表给命名空间本身进行扩展，(必填)
                    @param :(Array)args   	 要合并对象的集合(必填)
                    @param :(Boolean)override 是否覆盖同名键名值,默认 false 是不覆盖(可填)
                    @return  (target)返回合并后的类
			LAMJS.clone([true],className);//克隆对象
				 名称：clone
                 功能：对象克隆
                 说明：_hashCode里的'_'代表是从别的对象克隆来的，如果'_'前面的字符相同就说明俩对象是克隆关系
                 注意：
                 @param   (Boolean)deep  		   	   NULL :是否要深度拷贝对象
                 @param   (Object)className 		NO NULL : 要克隆的类
                 @return  (Object)				:返回克隆后的新对象
			LAMJS.is();
				 名称： is
	             功能：检测System是否合法，检测要使用的类是否已加载过；检测要定义的类名称之前是否已注册过。
	             说明：子类继承父类之前调用此方法检测父类之前是否有加载过，如果填写第三参数可检测当前的类是否跟之前的类重名了
	             注意：
	             @param  (Object)System 	       		NO NULL : 命名空间
	             @param 	(String)useClassName     	NO NULL : 要使用的类名称
	             @param 	(String)className         	　　NULL : 当前类的名称
	             @return (Boolean)
			LAMJS.isJson(s);
				 名称：isJson
				 功能：检查字符串是否是json格式
				 说明：
				 注意：
				 @param s{String}
                 @returns {boolean}
			LAMJS.isclone(className);
				 名称：isclone
		         功能：检查对象是否是克隆对象
		         说明：'_'代表是从别的对象克隆来的，如果'_'前面的字符相同就说明俩对象是克隆关系
		         注意：
		         @param   (Object)className 		NO NULL : 检查的对象
		         @returns {boolean}
			LAMJS.isPlainObject();//是否是纯对象
			LAMJS.log();
			LAMJS.autoCenter(W,w,H,h,p);
				 名称：autoCenter
	             功能：元素自定垂直居中容器中间
	             说明：
	             注意：
	             @param(Number) 		NO NULL : W  容器宽
	             @param(Number) 		NO NULL : w  元素宽
	             @param(Number) 		NO NULL : H  容器高
	             @param(Number) 		NO NULL : h  元素高
	             @param(Number) 		NULL 	: p  有padding值时
	             @return (Object) 返回居中位置的xy 坐标
	             Example：
	             		System.autoCenter(500,10,500,10,0);
			LAMJS.fileExisted();
			LAMJS.Basis.extends();
		
			
			LAMJS.Event.bind(dom,evt,fn);
				 名称：bind
                 功能：给dom节点绑定指定事件
                 说明：
                 注意：
                 @param   (Dom)dom 			NO NULL :dom节点对象
                 @param   (String)evt 		NO NULL :事件类型
                 @param   (Function)fn 		NO NULL :绑定事件对象的函数
			LAMJS.Event.unbind(dom,evt,fn);	 
			LAMJS.Event.fixEvt(event);
				 名称：Event.fixEvt
                 功能：解决事件兼容问题
                 说明：
                 注意：
                 @param   (event)event 			NO NULL :
                 @return  {window.even}
			LAMJS.Event.mousewheel(dom,fn);
				 名称：mousewheel
                 功能：鼠标滚轮事件注册
                 说明：dom 是滚动的范围区域
                 注意：这个功能只能在鼠标滚动时返回滚动的方向,和滚轮滚动判断方向的值
                 @param   (Dom)dom 			NO NULL :dom节点对象
                 @param   (Function)fn 		NO NULL :返回滚动方向和滚轮滚动的值
			
			
			LAMJS.Browser.innerSize();///获取浏览器窗口视口宽度和高度
			LAMJS.Browser.getViewWH();//获取可视区域宽高,返回对象
			LAMJS.Browser.getBodyWH();
				 名称： getBodyWH
                 功能： 这个为获取页面的高度，用于iframe的自适应时候获取。
                 @param   (voide)
                 @return  (Object)
			LAMJS.Browser.fixed_element($elem,$context,animate);
				 名称： fixed_element
                 功能： 固定元素 （模拟css fixed 功能）
                 @param (jQuery)$elem 被fixed 的元素
                 @param (jQuery)$context 出现滚动条的容器，默认是窗口
                 @param (Boolean)animate 是否有缓冲效果 默认没有
			LAMJS.Browser.addFavorite();//加入到收藏夹
			LAMJS.Browser.getDPI();//
			LAMJS.Browser.getScrollTop();
				 名称：getScrollTop
                 功能：获取滚动条距离顶端的距离
                 说明：支持IE6
                 @return {Number}
			LAMJS.Browser.getExplorer();
				 名称：getExplorer
                 功能：判断浏览器种类
                 注意：
                 说明：返回值对照：
                                     1:chrome;
                     				 2:Firefox;
                  					 3:ie;
                 					 4:Safari;
                 					 5:Opera
                 					 0:Other
                 @return  {Number}
			LAMJS.Browser.setFixed();
			LAMJS.Browser.isIE();
			LAMJS.Browser.isIE6();
			LAMJS.Browser.isIE7();
			LAMJS.Browser.isIE8();
			LAMJS.Browser.isFirefox();
			LAMJS.Browser.isChrome();
			LAMJS.Browser.isSafari();
			LAMJS.Browser.isOpera();
			LAMJS.Browser.resize($div,fn);
					 功能：窗口重新调整大小
                	 名称：resize
                	 @param	        $div(jQuery obj) NO NULL : //被居中的容器
                	 @param(Object) 	fn(Function)     NO NULL : callBack
                	 @return  (Function) 时时计算垂直水平居中的函数原型
                	 调用方式：
                		 LAMJS.Browser.resize($('div'),function(){
                							 var size=window.System.autoCenter($(window).width(),this.width(),
                															   $(window).height(),this.height(),100);
                								this.css({'top':size.y+'px',
                										 'left':size.x+'px'
                										});
                						});
                	 
			LAMJS.Browser.setIEfixed($elem);
				 名称：(vido) setIEfixed
                 功能：IE 6,7固定位置
                 参数： $elem (jQuery obj)
                 @return  (Function)
			LAMJS.Browser.getDPI();
			LAMJS.Browser.addFavorite();
			LAMJS.Browser.setElemAutoCenter();//
			
			LAMJS.Template.template(S);
                 名称：templat
                 功能：替换模版中的变量
                 说明：
                 注意：
                 @param (String)S NO NULL:要匹配的变量
                 @returns {String}
            LAMJS.Template.replaceTpl(selector,attr_name,callback);
                 名称：replaceTpl
                 功能：替换模版标签
                 说明：
                 注意：
                 @param (String)selector 		NO NULL:选择器
                 @param (String)attr_name 	NO NULL:标签属性
                 @param (Function)callback 	   NULL:回调函数
                 @returns {String}
			
			LAMJS.Html.load($dom); 
				 名称： load
                 功能：html文件里包含另一个文件,扩充jQuery load方法
                 说明：跟Html.include方法不一样的地方是 这里调用的是jQuery load方法
                 注意：
                 @param 	(jQuery)$dom             NO NULL :
                 @return ()
			LAMJS.Html.include($dom,D); 
					 名称： Html.include
                	 功能：html文件里包含另一个文件
                	 说明：只有两个参数可选,第一个参数是jQuery 对象,第二个是json 对象
                	 注意：
                	 @param 	(jQuery)$dom             NO NULL :
                	 @param 	(Object)D                NO NULL :json 数据
                	 @param 	(Function)D.callBack       	NULL :返回到会调函数里的内容:this: 当前include 节点;content:include 的文件
                	 @return {void}
			LAMJS.Html.getFile(url,callBack,D); 
				 名称： getFile
                 功能：返回指定的文件
                 说明：支持链式调用
                 注意：
                 @param 	(String)  	D.url         	      NULL :请求地址
                 @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
                 @param 	(Object)D                	   NO NULL :json 数据
                 @param 	(String)  	D.type             NO NULL :获取方式
                 @param 	(String)  	D.dataType         NO NULL :获取文件类型
                 @param 	(String|{}) D.data             	  NULL :请求地址的参数
                 @param 	(Boolean) 	D.async               NULL :是否异步加载
                 @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
                 @returns {Html|*}
			LAMJS.Html.getFiles(url,callBack,D); 
				 名称： Html.getFiles
                 功能：返回指定的多个文件
                 说明：支持链式调用
                 注意：
                 @param 	(Array)  	D.urls         	      NULL :请求地址
                 @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
                 @param 	(Object)D                	   NO NULL :json 数据
                 @param 	(String)  	D.type             NO NULL :获取方式
                 @param 	(String)  	D.dataType         NO NULL :获取文件类型
                 @param 	(String|{}) D.data             	  NULL :请求地址的参数
                 @param 	(Boolean) 	D.async               NULL :是否异步加载
                 @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
                 @returns {Html|*}
			
			LAMJS.Html.tag(name,single,Attr,content); 
				 名称： tag
	             功能：动态返回指定的标签
	             说明：
	             注意：length 是关键字 属性里禁止使用
	             @param 	(Boolean)single          NULL : 成对标签还是单一标签，false 是成对标签,true 是单标签
	             @param 	(String)name          NO NULL : 标签名称
	             @param 	(Object)Attr             NULL : 标签的属性
	             @param 	(String|Array)content    NULL : 内容
	             @return (String) 返回标签字符串
				
				第一参数是标签名称。
				第二参数，是否是单标签 true | false (默认可不填)。
				第三参数是标签里的所有属性，（可选）.
				第四个参数是标签里的内容（可选）。
				example:
					LAMJS.Html.tag('p', {},'这是一个p标签');
					上面的代码生成下面的字符串
						<p>这是一个p标签</p>
					可以嵌套n个标签，方式如下：
					    LAMJS.run(function () {
	                        'use strict';
	                        var System = this;
	                        System.Html.tag('nav',{},
									System.Html.tag('ul', {'class': 'pagination'},
											(function(){
												var arr=[];
												var li;
												li =System.Html.tag('li',{},
														System.Html.tag('a',{'href':'#','aria-label':'Previous'},
																System.Html.tag('span', {'aria-hidden':'true'},'&laquo;')
														)
												);
												
												arr.push(li);
												
												for(var i=1;i<=5;i++){
													arr.push(System.Html.tag('li',{},
															System.Html.tag('a', {'href':'#'},i)
													));
				
												}
												li = System.Html.tag('li',{},
														System.Html.tag('a', {'href':'#','aria-label':'Next'},
																System.Html.tag('span', {'aria-hidden':'true'},'&laquo;')
														)
												);
												arr.push(li);
												return arr;
											})()
					
									)
								);
	                        
	                    });
						
					
					上面的代码生成下面的字符串
					
					<nav>
	                  <ul class="pagination">
	                    <li>
	                      <a href="#" aria-label="Previous">
	                        <span aria-hidden="true">&laquo;</span>
	                      </a>
	                    </li>
	                    <li><a href="#">1</a></li>
	                    <li><a href="#">2</a></li>
	                    <li><a href="#">3</a></li>
	                    <li><a href="#">4</a></li>
	                    <li><a href="#">5</a></li>
	                    <li>
	                      <a href="#" aria-label="Next">
	                        <span aria-hidden="true">&raquo;</span>
	                      </a>
	                    </li>
	                  </ul>
	                </nav>
                
            LAMJS.Html.renderTagAttributes(Attr);
                 名称： Html.renderTagAttributes
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(Object)Attr             	NO NULL : 标签的属性
                 @return (String) 返回属性符串
            LAMJS.Html.scriptFile(Attr,src);
                 名称： scriptFile
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(String)src      NO NULL : 路径
                 @param 	(Object)Attr        NULL : 标签的属性
                 @return (String)
            LAMJS.Html.linkFile(Attr,href);
                 名称： a
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(String)href   			NO  NULL : 连接地址
                 @param 	(Object)Attr                NULL : 标签的属性
                 @return (String)
            LAMJS.Html.script(Attr,content);
                 名称： script
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(String|Array)content   NO NULL : 内容
                 @param 	(Object)Attr               NULL : 标签的属性
                 @return (String)
            LAMJS.Html.style(Attr,content);
                 名称： style
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(String|Array)content      NULL : 内容
                 @param 	(Object)Attr               NULL : 标签的属性
                 @return (String)
            LAMJS.Html.a(href,Attr,content);
                 名称： a
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(String)href   			NO  NULL : 连接地址
                 @param 	(String|Array)content       NULL : 内容
                 @param 	(Object)Attr                NULL : 标签的属性
                 @return (String)
            LAMJS.Html.img(src,Attr);
                 名称： img
                 功能：
                 说明：
                 注意：length 是关键字 属性里禁止使用
                 @param 	(String)src      NO NULL : 图片 路径
                 @param 	(Object)Attr        NULL : 标签的属性
                 @return (String)
            LAMJS.Html.analysisTpl();
                 名称： analysisTpl
                 功能：只能在 link,a,img 这几种标签范围内查找并解析带自定义属性'LAM-VAR=TPL=template'元素的标签
                 说明：
                 注意：
                 @return {void}
				
		
## 九、错误机制
			throw new Error(msg);
## 十、检测机制
			1.数据类型检测
				LAMJS.isNull(); 	 	
				LAMJS.isUndefined(); 	
				LAMJS.isset(); 	 	
				LAMJS.empty(); 	 	
				LAMJS.error(); 	 	
				LAMJS.isEmptyObject(); 
				LAMJS.arr_isEmpty(); 	
				LAMJS.gettype(); 		
				LAMJS.isObject(); 		
				LAMJS.isString(); 		
				LAMJS.isArray(); 		
				LAMJS.isFunction(); 	
				LAMJS.isBoolean(); 	
				LAMJS.isRegExp(); 		
				LAMJS.isDate(); 		
				LAMJS.isBlob(); 		
				
				LAMJS.isHTMLDocument();
				LAMJS.isHTMLBodyElement();
				LAMJS.isHTMLHeadElement();
				LAMJS.isHTMLCollection();
				LAMJS.isXMLHttpRequest();
				LAMJS.isXMLSerializer();
        	
        	2.文件类型检测
        		LAMJS.is(namespace,superClass,class);//检查父类是否存在(不存在 抛异常)，当前定义的类是否已定义过了(已定义过 抛异常)
        		LAMJS.isClassFile();//检测文件名是否包含'.class'关键字 
        	3.文件加载器：
				文件加载器可以防止同一路径下的同名文件被二次加载！
				因为每个被加载的文件都会被注册到系统的文件加载器里保存，每次加载前先去检测加载器里的文件是否存在，不存在才去加载。
				加载器里的文件生命周期到页面关闭为止。要查看里面的文件可访问 window['interfaceName'].files，这是一个数组。
				要查看带.class 后缀的所有文件可访问 window['interfaceName'].classes，这也是个数组。window['interfaceName'] 也可以用 LAMJS
				之前在别的地方引入的文件它也能会检测到是否是同名文件。

## 十一、基础类非独立浏览器环境（浏览器有专用的类）， 可应用服务器nodejs 。
## 十二、说明格式
		
			/**
			 * @author: lhh
			 * 产品介绍：
			 * 创建日期：2014-11-28
			 * 修改日期：2014-11-28
			 * 名称：
			 * 功能：
			 * 说明：
			 * 注意：
			 * @param   (String)param 			NO NULL :
			 * @return   :
			 * Example：
			 */

## 十三、组件的配置属性
	
## 十四、沙箱(Sandbox)
		
		LAMJS.run()是LamborghiniJS 的沙箱机制 
		沙箱的作用防止全局变量污染
		
		
		
	
## 十五、hashcode
		this.equals(Object) 方法
		equals()方法的作用是比较俩对象是否是同一个对象。
		 _hashCode 属性值, 这个值是一个字符串 是new 一个对象时随机生成的，不同的对象的_hashCode 是不同的，由此根据这个原理可以比对两个对象是否相等。
		给对象创建_hashCode属性有两种方式
		1.实例化时自动生成
		2.调用静态的 BiObject.toHashCode()方法生成(如果检查对象里已有_hashCode 就返回,不会重新生成新的值)
		当前实例的对象的toHashCode()方法可以返回_hashCode 如果没有就创建并返回
		
## 十六、标签创建方式(在配置文件中设置)
			标签创建方式有两种：
				1.document.createElement()
				2.document.write()
		
## 十七、页面里包含另一个页面(.html include 另一个.html文件)
        功能：
			1.设定一个占位符标签
			2.根据占位符里file参数请求另一个页面，然后替换掉当前占位符
		警告:有些浏览器要支持跨域才可以!!!，解决方法：在服务器环境里运行
		步骤：
			1.自定义标签:<include file="{{LAMJS.ROOT}}/views/include/header.html" 
								  beforeSend="function(a,b){
		                              this.dataType='html';
                                      this.async=true;
                         }"></include>
                 note:beforeSend 属性是可选的，这里的this就是jQuery Ajax的settings,在发送之前设置jQuery Ajax提供的所有参数，
                                     这里就可以设置一个beforeSend回调函数，其余的参数都可以在这个函数里设置,
                                     在beforeSend回调函数里设置file 参数 要换成 url 参数。
                                     函数里的两个参数请参考jQuery Ajax API。
                 {{LAMJS.ROOT}}（ 参考 十八、模版标签 3）
                  
                
			2.先要加载Html.class 类文件
				//run方法可以修改创建tag方式 
				LAMJS.run(function(){
						var System=this;
						3. Html.include 方法 根据include 标签里的file 找到指定的html 文件替换当前的include 标签
						System.Html.include($('include'));
						
						也可用Html.load 方法 替代Html.include 不同的是：它调用jQuery load 方法 include 标签里只有一个file属性,把请求的内容包裹在占位符里，而不是像Html.include方法是请求的内容替换占位符。
						System.Html.load($('include'));
						
						

				 });
				 
## 十八、模版标签
	 查找解析指定元素属性里的模板标签
		 1. 
		    解析link,a,img,iframe 标签的属性值里的变量
		    解析标签里内容里的全部变量（除 link,a,img,iframe 标签外）
			<link data-var="tpl" rel="stylesheet" type="text/xxx" href="{{LAMJS.ROOT}}/"/>
			<a data-var="tpl" rel="stylesheet" href="{{LAMJS.ROOT}}/"/>跳转</a>
			<img data-var="tpl" src="{{LAMJS.ROOT}}/"/>
			怎么工作的？
			1.在需要解析的标签上放指定的自定义属性 data-var="tpl"(也可以通过 common/config/config.js 文件的 'Config.templat.custom_attr' 属性 修改自定义属性)
			2.在window.onload 函数里 调用 LAMJS.Html.analysisTpl(); 静态方法
			note:
				1.自定义属性data-var="tpl"一定要有。否则不会解析模板标签。
				2一定要在页面元素加载完毕才能调用LAMJS.Html.analysisTpl()
			
		 2.解析指定HTML元素的模板标签 (不需要放指定的自定义属性 data-var="tpl")
			LAMJS.replaceTpl(selector,attr_name);
				 功能：替换模版标签
				 说明：
				 注意：
				 @param (String)selector 		NO NULL:选择器标示符
				 @param (String)attr_name 	NO NULL:标签属性
			example:解析所有link 标签 href 的模板标签
				<link rel="stylesheet" type="text/css" href="{{LAMJS.ROOT}}/project/common/css/bootstrap.css"/>
				LAMJS.replaceTpl('link','href');     
			
		 3.模板标签: {{LAMJS.ROOT}} 等同于 {{LAMJS.Config.Public.ROOT}} 
			这里的 LAMJS.Config.Public.ROOT 是变量(模板标签里内容就是js 变量)，LAMJS会解析换成变量的值。{{LAMJS.Config.Public.ROOT}} 跟{{_ROOT_}}意思相同，都是项目根目录位置
			 这里推荐使用LAMJS.Config.Public.ROOT 或 LAMJS.ROOT 因为 _ROOT_ 是全局变量容易被外部人为修改。（_ROOT_ 的值修改 不会影响到 LAMJS.Config.Public.ROOT 的值）。
			 note:模板标签里一定要放已定义过的变量才能被解析正常工作，否则将会报错，不能正常工作！
			模板标签分隔符设置与修改   （参考 二十、配置参数 一、模板标签分隔符设置与修改）
			 
			
	 
	 note:  用MVC方式渲染页面就不用这种方式，MVC渲染请参考 十九、MVC。
			修改模板标签分隔符参考 二十、配置参数 一、模板标签分隔符
	
## 十九、MVC (详细demo看project目录里)
				
	访问url格式：
		localhost/project/controllers/controllerName.html?r=view
			controllers:控制器文件夹
			controllerName:控制器文件名称（对应视图文件的文件夹，如：index）
			r:接收控制器中的方法名的参数。r关键字可以在控制器中自定义
			view：调用对应控制器中的方法（对应着视图文件名）
	//controllers/index.html

  1. Controller 范例一、参考 [LAM](https://github.com/haohonglong/LAM)
													
  2. Controller 范例二、(面向对象方式):
	
			LAMJS.run(function() {
					'use strict';
					var System = this;
					var __this__=null;
					System.is(System,'Controller','IndexController');
					var ROOT  = System.ROOT;
					var views = System.Config.Public.ROOT+'/project/views/index';
					var IndexController = System.Controller.extend({
						constructor: function (init){
							this.base(init || {});
							__this__=this;
		
					},
					'_className':'IndexController',
					'indexAction':function(){
						new System.Template().render(views+'/index.html',{
							'ROOT':ROOT,
							'D':{
								'title':'你好，世界！',
								'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
							}
		
						},function(content){
							System.print(content);
						},{
							beforeSend:function(a,b){
								this.async=true;
							}
						});
					},
		
		
		
					/**
					 *
					 * @author lhh
					 * 产品介绍：析构方法
					 * 创建日期：2015-4-2
					 * 修改日期：2015-4-2
					 * 名称：destructor
					 * 功能：在注销IndexController对象时调用此方法
					 * 说明：
					 * 注意：
					 * @return  ()
					 * Example：
					 */
					'destructor':function(){}
				});
				new IndexController();
			});
			
			render参数：
				参数1：请求视图的路径
				参数2：替换视图中模板标签的数据（这里就是MVC中的M ）
				参数3：视图路径请求成功后返回视图文件(String) 
				参数4：设置请求Ajax 的参数(必须是json类型)
			  
			note:
		
				不要忘了方法名称前缀action
				注1： System.Html.include($('include'))是可选的， 要放在渲染视图的下面。
						MVC方式的include标签的action属性值是请求的控制器，而后通过控制器请求视图，而不是直接去请求视图。
						错误的方式：System.Html.include($('include'))放在视图里。
				注2：beforeSend函数里的this就是Ajax的settings,在发送之前设置jQuery Ajax提供的所有参数。
												render方法参数4就可以设置一个beforeSend回调函数，其余的参数都可以在这里设置。
												函数里的两个参数请参考jQuery Ajax API。
			//views/index/index.html
				<!DOCTYPE html>
				<html>
				<head>
					<title>{{title}}</title>
					<link rel="stylesheet" type="text/css" href="{{ROOT}}/project/common/css/bootstrap.css"/>
					<!--[if lt IE 8]>
					<script>
						alert('请使用谷歌、火狐浏览器！');
					</script>
					<![endif]-->
				
				
				</head>
				<body>
					<div class="container">
						<div class="jumbotron">
							<h1>{{D.title}}</h1>
							<p>{{D.content}}</p>
							<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
						</div>
					</div>
				</body>
				</html>
                
               
                
## 二十、配置参数
	一、模板标签分隔符设置与修改
		1.设置模板分隔符： 
			 在配置文件 的templat里配置左右分隔符是个数组：delimiters
			 也可在单独视图里定义，只匹配当前页面里的分隔符与别的页面没关系，不会改变全局配置
		 2.修改模板分隔符：(用MVC方式：设置在控制器方法里)
			 LAMJS.Config.templat.delimiters[0]  = '${{';
			 LAMJS.Config.templat.delimiters[1] = '}}$';
                     
                     

## 二十一、缓存机制
    
## 二十二、参考附录
	一、闭包：(内部函数总是可以访问的函数外部的变量和参数，即使在外部函数返回)
			  AB俩函数，A包裹B并返回B的原型后被A外的变量c引用，此时B就是闭包。闭包在外面可以访问到A里面的变量。
			  闭包的作用就是在A执行完并返回后，闭包使得Javascript的垃圾回收机制GC不会收回A所占用的资源，因为A的内部函数B的执行需要依赖A中的变量。
	二、回收机制：
				在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。
				因为函数A被B引用，B又被A外的c引用，这就是为什么函数A执行后不会被回收的原因。
                     
                     

                   


	








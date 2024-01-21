/*!
 * LAM2 JavaScript Library
 * created by lhh
 * https://github.com/haohonglong/lam2
 *
 */


/**
 * @author：lhh
 * 创建日期:2015-3-20
 * 修改日期:2024-1-20
 * 		  :2022-10-23
 * 名称：系统接口
 * 功能：服务于派生类
 * 标准 : 类及成员名称一旦定义不能轻易修改，如若修改就要升级版本！如若在遇到与第三方插件发生冲突要修改，请参考基类里的说明文档。
 * 命名空间接口定义: var GRN_LHH='interfaceName';
 * 命名空间接口调用: window[GRN_LHH]  或者 window['interfaceName']
 * 说明 : 成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
 *        命名空间接口的设计是灵活的，修改接口名不影响库文件里的内核代码及类接口。
 *        命名空间接口设计的宗旨是:只要修改一处就可搞定一切与第三方插件的冲突。
 *        与第三方插件发生冲突时解决方法:  修改变量 'GRN_LHH' 里的值 即可。'GRN_LHH' 是命名空间接口的密钥 作用是定义命名空间。
 * 	      调用基类的静态成员方法:(调用接口.静态成员)。
 * 	      这个基类不允许被直接实例化，要实例化它的派生类。
 * 	      页面中要引入'config.js'这个文件。
 * 	      'GRN_LHH' 的设定也在'config.js'里设定,不要修改这里的 'GRN_LHH' 的值。
 * 	      window['interfaceName'].app :这个对象代表当前实例化后的对象
 *
 * note :
 *
 *
 *
 */

(function (global, factory) {
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var UNIQUE = "LAM_20150910123700_";
	var System = global[UNIQUE] || null;
	if (System) {
		return;
	} else {
		var namespace = global.GRN_LHH;
		if (!namespace) { namespace = {}; }
		System = factory(global, namespace);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = System :
		typeof define === 'function' && define.amd ? define(System) :
		global['LAM'] = global['LAMJS'] = global[UNIQUE] = global[namespace] = System;
	}

})(this, function (global, namespace, undefined) {
	'use strict';

	var _module = null;

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-11-22
	 * 修改日期：2022-9-1
	 * 		  ：2022-10-23
	 * 名称：module
	 * 功能：模块
	 * 说明：
	 * 注意：
	 * Example：
	 */
	function module(System){
		_module = System.createDict();
		_module.exports = System.createDict();
	}

	// Used for trimming whitespace
	var VERSION = "v2.1.6.1",
		Interface = {},
		System = {},
		once = true,
		timers = [],

		// Save a reference to some core methods
		class2type = {},//Object.prototype equal {}
		deletedIds = [],//Array.prototype equal []
		toString = class2type.toString,
		getPrototypeOf = Object.getPrototypeOf,
		hasOwn = class2type.hasOwnProperty,
		push = deletedIds.push,
		slice = deletedIds.slice,
		concat = deletedIds.concat,
		indexOf = deletedIds.indexOf,
		trimLeft = /^\s+/,
		trimRight = /\s+$/,
		// Support: Android<4.1, IE<9
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;


	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.9.28
	 * 修改日期：2017.9.11
	 * 名称：private type
	 * 功能：判断数据是什么类型的
	 * 说明：
	 * 注意：
	 * @param   {String}type 			NO NULL :
	 * @return  {Function}
	 * Example：
	 */
	function type(type) {
		return function (obj) {
			return (toString.call(obj) === "[object " + type + "]");
		};
	}

	var isObject = type("Object"),
		isJSON = type("JSON"),
		isString = type("String"),
		isArray = Array.isArray || type("Array"),
		isFunction = type("Function"),
		isBoolean = type("Boolean"),
		isNumber = type("Number"),
		isDate = type("Date"),
		isRegExp = type("RegExp"),
		isBlob = type("Blob"),
		isNull = type("Null"),
		isUndefined = type("Undefined");

	function isWindow(obj) {
		return (null != obj && obj == obj.window);
	}

	function is_instanceof_jQuery(obj) {
		if (obj instanceof jQuery)
			return true;
		else
			return false;
	}


	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2019-1-3
	 * 名称：runtime
	 * 功能：run 时执行的方法
	 * 说明：可传多个参数第一个必须是数组，在回调里接收的参数跟传来的参数一一对应
	 * 注意：不能链式调用，如要链式调用，用 System.then方法
	 * @param   (Array)args 			   NULL :传入的参数
	 * @param   (Function)callback 		NO NULL :callback 里的this 是被克隆后的对象，修改this里面的成员不会影响LAM 的源对象。
	 * 											每个沙箱里的this 都是一个单独的克隆，这样可避免污染 LAM 源对象和别的沙箱。
	 * @return  {*} 返回callback 里的返回值
	 * Example：
	 */
	function runtime(args, callback) {
		if (!arguments.length) { throw new Error('Warning: 至少要有一个参数'); }
		if (System.isFunction(args)) {
			callback = args;
			args = null;
		}
		if (!System.isFunction(callback)) { throw new Error('Warning: 参数必须要有一个 Function 类型'); }

		var _this = this.clone(true, this);
		if (args) {
			if (System.isArray(args)) {
				return callback.apply(_this, args);
			} else {
				return callback.call(_this, args);
			}
		} else {
			return callback.call(_this);
		}

	}



	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015.10.28
	 * 修改日期：2015.10.28
	 * 名称：isFloat
	 * 功能：判断是否是浮点数
	 * 说明：
	 * 注意：
	 * @param   (void)
	 * 调用方式：
	 * @return  (Boolean)
	 * Example：isFloat(2.5)
	 */
	function isFloat(n) {
		if (n.toString().indexOf('.') != -1) {
			return true;
		}
		return false;
	}


	//对象里禁用的关键字
	var arr_Object_key = ['_hashCode', 'length', 'list'];




	//interface
	//==================================================================================


	/**
	 * @author: lhh
	 * 产品介绍：所有类的接口
	 * 创建日期：2015-9-6
	 * 修改日期：2018-12-7
	 * 名称：Interface
	 * 功能：

	 * 说明：
	 * 注意：
	 */
	Interface = {
		'Base': {},
		'Object': {},
		'Loader': {},
		'Component': {},
		'Compiler': {},
		'Base64': {},
		'Cache': {},
		'HttpRequest': {},
		'Dropdown': {},
		'Helper': {},
		'Controller': {},
		'Router': {},
		'Model': {},
		'module': {
			"exports": {}
		},
		'Module': {},
		'Html': {},
		'Browser': {},
		'Css': {},
		'Template': {},
		'Event': {},
		'Node': {},
		'Dom': {},
		'VNode': {},
		'Cookie': {},
		'Storage': {},
		'PowerCookie': {},
		'Drag': {},
		'Drag_xy': {},
		'Error': {},
		'FakeSelect': {},
		'AutoLayout': {},
		'Xhr': {},
		'Fsc': {},
		'BinaryTree': {},
		'Linklist': {},
		'PopupLayer': {},
		'Roll': {},
		'Layout': {},
		'Slider': {},
		'Sport': {},
		'Tools': {},//(single)
		'Tab': {},
		'Thumbnail': {},
		'FindParentObject': {},
		'Tree': {},
		'Sort': {},
		'EditTables': {},
		'Json': {},
		'Html5': {
			'Svg': {},
			'Canvas': {},
			'Shape': {},//基本形
			'Chess': {}//棋盘类
		},
		'View': {},
		'Validation': {},
		'Widget': {}
	};

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014-12-23
	 * 修改日期：2015-7-10
	 * 名称：System
	 * 功能：
	 * 属性列表:
	 *			guid
	 *			app
	 *			classes
	 * 方法列表:
	 *			isset
	 *			empty
	 *			isNumeric
	 *			error
	 *			type
	 *			isObject
	 *			isString
	 *			isArray
	 *			isFunction
	 *			contains
	 *			main
	 *			run
	 *			wait
	 *			then
	 *			config
	 *			define
	 *			require
	 *			eval
	 *			print
	 *			import
	 *			length
	 *			proxy
	 *			isEmptyObject
	 *			arr_isEmpty
	 *			queues
	 *			putIndexGetObjectTheValue
	 *			search
	 *			is
	 *			isJson
	 *			isPlainObject
	 *			log
	 *			defined
	 *			merge
	 *			free
	 *			clone
	 *			createDict
	 *			extends
	 *			extend
	 *			extends_f
	 *			override
	 *			autoCenter
	 *			isClassFile
	 *			fileExisted
	 *			template
	 *			findTpl
	 *			replaceTpl
	 *			analysisVar
	 *			getRootPath
	 *			timestamp
	 *			http_build_query
	 *			exit
	 * 对象列表:
	 *			Function
	 *			Date
	 *			String
	 *			Array
	 * 说明：System对象已继承了上面定义对象里的所有方法
	 * 注意：
	 */
	System = {
		"VERSION": VERSION,
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2020-5-12
		 * 名称：System.main
		 * 功能：程序主方法
		 * 说明：此方法在Router.run 方法里解析完视图后被调用,这个方法可以在LAM.bootstrap()调用前overwrite
		 * 注意：
		 * @param   view       {String}			:视图
		 * @param   controller {Controller} 	:当前控制器实例对象
		 * @param   action     {String}		    :方法名称
		 * @param   id         {String}		    :id
		 * @returns {String}   
		 */
		'main': function (view, controller, action, id) { return view },
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2019-1-13
		 * 名称：System.exit
		 * 功能：中断退出程序，且报错
		 * 说明：
		 * 注意：
		 * @param   (String)message 			   NULL :错误信息
		 */
		'exit': function (message) { throw new Error(message || 0); },

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2022-9-1
		 * 名称：System.run
		 * 功能：程序主方法
		 * 说明：
		 * 注意：
		 * @param   (Array)args 			   NULL :传入的参数
		 * @param   (Function)callback 		NO NULL :在运行此方法要立马执行的操作,这里的this指的是LAMJS 对象（必选）
		 * @return  {*} 返回callback 里的返回值
		 * Example：
		 */
		'run': function (args, callback) { return runtime.apply(this, [args, callback]); },

		'init': function (Config) {
			module(System);
			System.Config = Config || System.isFunction(System.configure) ? System.configure.call(System, System) : (System.isset(System.Config) && System.Config);
			System.Config.files = System.Config.files || [];
			System.classPath = System.LAMPATH = System.Config.getClassPath(System);
			System.configure_cache = System.Config.configure_cache || System.createDict();
			System.components = System.merge({}, [System.Config.components]) || System.createDict();
			System.each(System.merge({}, [System.Config]), function (name) { System[name] = this; });
			System.each(System.merge({}, [System.components]), function (name) {
				if (!(name in System)) { System[name] = this; }
			});
			
			System.each(System.merge({}, [System.Public(System)]), function (name) {
				if (!(name in System)) { 
					if(System.isFunction(this)) {
						System[name] = this(System); 
					} else {
						System[name] = this; 
					}
				}
			});
			System.BASE64ENCODE = System.isset(System.BASE64ENCODE) && System.isBoolean(System.BASE64ENCODE) ? System.BASE64ENCODE : true;
			System.routeAutoRun = System.isset(System.routeAutoRun) && System.isBoolean(System.routeAutoRun) ? System.routeAutoRun : true;
			System.LAM_DEBUG = System.Config.LAM_DEBUG;
			System.LAM_ENV = System.Config.LAM_ENV;
			System.LAM_ENV_PROD = 'prod' === System.LAM_ENV;
			System.LAM_ENV_DEV = 'dev' === System.LAM_ENV;
			System.LAM_ENV_TEST = 'test' === System.LAM_ENV;
			//hashcode 随机种子
			System.random = System.Config.random || 10000;
			//不允许外部直接修改，添加，删除 配置里面指定的参数！只能读取
			//Object.freeze(System.Config);
			//Object.freeze(System.Config.Public);
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2022-10-5
		 * 修改日期：2022-10-5
		 * 名称：System.getAutoLoadFile
		 * 功能：获取基础类文件
		 * 说明：
		 * 注意：
		 * Example：
		 */
		'getAutoLoadFile': function(classPath) {
			classPath = classPath || System.classPath;
			return [
				{ 'name': 'jquery', 'path': classPath + '/jQuery/jquery.js' }
				,{ 'name': 'Base', 'path': classPath + '/base/Base.class.js' }
				,{ 'name': 'Object', 'path': classPath + '/base/Object.class.js' }
				,{ 'name': 'Component', 'path': classPath + '/base/Component.class.js' }
				,{ 'name': 'Error', 'path': classPath + '/base/Error.class.js' }
				,{ 'name': 'Md5', 'path': classPath + '/base/Md5.class.js' }
				,{ 'name': 'Base64', 'path': classPath + '/base/Base64.class.js' }
				,{ 'name': 'Compiler', 'path': classPath + '/base/Compiler.class.js' }
				,{ 'name': 'Cache', 'path': classPath + '/base/Cache.class.js' }
				,{ 'name': 'PowerCookie', 'path': classPath + '/base/PowerCookie.class.js' }
				,{ 'name': 'Storage', 'path': classPath + '/base/Storage.class.js' }
				,{ 'name': 'HttpRequest', 'path': classPath + '/base/HttpRequest.class.js' }
				,{ 'name': 'Helper', 'path': classPath + '/base/Helper.class.js' }
				,{ 'name': 'Browser', 'path': classPath + '/base/Browser.class.js' }
				,{ 'name': 'Event', 'path': classPath + '/base/Event.class.js' }
				,{ 'name': 'Dom', 'path': classPath + '/base/Dom.class.js' }
				,{ 'name': 'View', 'path': classPath + '/base/View.class.js' }
				,{ 'name': 'Template', 'path': classPath + '/base/Template.class.js' }
				,{ 'name': 'Html', 'path': classPath + '/base/Html.class.js' }
				,{ 'name': 'Loader', 'path': classPath + '/base/Loader.class.js' }
				,{ 'name': 'Controller', 'path': classPath + '/base/Controller.class.js' }
				,{ 'name': 'Model', 'path': classPath + '/base/Model.class.js' }
				// ,{ 'name': 'Router', 'path': classPath + '/base/Router.class.js' }
			];
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2020-3-16
		 * 修改日期：2022-5-28
		 * 名称：System.autoload
		 * 功能：加载基础类
		 * 说明：
		 * 注意：
		 * Example：
		 */
		'autoload': function () {
			var classPath = System.classPath, tag = 'script',
				scriptAttribute = System.Config.render.default.script.Attribute,
				data = scriptAttribute, files = [];

			var autoLoadFile = System.Config.autoLoadFile(System);
			var srcs = autoLoadFile.files || [],
				MINI = autoLoadFile.mini || false;

			System.excluded = System.excluded || [];

			// 这种格式可以防止浏览器默认对key自动排序
			var jses = this.getAutoLoadFile(classPath);

			if (!MINI) {
				if (srcs.length) {
					for (var i = 0, len = jses.length; i < len; i++) {
						for (var j = i; j < srcs.length; j++) {
							if (srcs[j].name === jses[i].name) { // 同名时优先用配置文件覆盖默认的
								if (srcs[j].path !== jses[i].path) jses[i].path = srcs[j].path;
								srcs.removeAt(j);
								break;
							}
						}
					}

					for (var i = 0, len = srcs.length; i < len; i++) {
						jses.push(srcs[i]);
					}
				}
				srcs = jses;
			}

			if (System.excluded.length) { // 不加载autoLoadFiles里指定的js
				srcs = [];
				System.each(jses, function(){
					if (!System.excluded.in_array(this.name)) {
						srcs.push(this);
					}
				});
			}

			System.autoLoadFiles = srcs;

			System.each(System.autoLoadFiles, function (i) {
				var path = this.path;
				if (System.fileExisted(path)) return true;
				System.files.push(path);
				if (System.isClassFile(path)) System.classes.push(path);
				if (System.Config.render.create) {
					data.src = path;
					System.Config.render.bulid(tag, data)
				} else {
					files.push(System.script(path, scriptAttribute));
				}
			});
			System.files.unshift(System.CONFIGURATION_PATH, classPath + '/base/System.js');
			System.BUILDPATH = System.isset(System.BUILDPATH) ? System.BUILDPATH : System.ROOT;
			System.print(files.join(''));
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018-11-22
		 * 修改日期：2022-3-30
		 * 名称：bootstrap
		 * 功能：加载初始化文件
		 * 说明：
		 * 注意：
		 * 调用方式：
     * @param Config
		 * @returns {System}
		 */
		'bootstrap': function (Config) {
			this.init(Config).autoload();
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018-7-14
		 * 修改日期：2018-7-14
		 * 名称：System.once
		 * 功能：行为仅执行一次
		 * 说明：
		 * 注意：
		 * @param fn
		 * @returns {Function}
		 */
		'once': function (fn) {
			var called = false;
			var _this = this.clone(true, this);
			return function () {
				if (!called) {
					called = true;
					//[].slice.call(arguments) arguments 转成数组
					// _this.run([].slice.call(arguments),fn);
					fn.apply(_this, arguments);
				}
			};
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2016-8-25
		 * 名称：System.wait
		 * 功能：支持链式调用，总是返回当前命名空间对象，
		 * 说明：与main方法功类似,不同的是每隔规定的时间数再去调用传进来的函数
		 * 注意：
		 * @param   (Array)args 			   NULL :传入的参数,里面的的元素和回调函数的参数试一一对应的。（可选）
		 * @param   (Function)callback 		NO NULL :在运行此方法要等待多长时间才执行的操作,这里的this指的是LAMJS 对象（必选）
		 * @param   (Number)time 			   NULL :等待执行的时间
		 * @return  (System)
		 * Example：
		 */
		'wait': function (args, callback, time) {
			if (System.isFunction(args)) {
				callback = args;
				time = arguments[1];
				args = undefined;
			}
			if (System.isFunction(callback)) {
				time = time || 3000;

				callback.timer = setTimeout(function () {
					System.run(args, callback);
					clearTimeout(callback.timer);
				}, time);
			}
			return this;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018-4-18
		 * 修改日期：2020-3-5
		 * 名称：System.listen
		 * 功能：支持链式调用，总是返回当前命名空间对象，
		 * 说明：启动一个监听器，callback 不返回true 监听器就不停止，一直监听
		 * 注意：callback是Array，对象与function混合使用时，israndom为false时结果是出乎意料的
		 * @param   {Function|Array}callback 		NO NULL :启动监听器要做的操作,Array中每个元素是对象时可以给每个func设置time
		 * @param   {Number}time 			           NULL :监听时间间隔
		 * @param   {Boolean}israndom 			       NULL :callback是Array时每个func是否是随机被调用的，默认false,是轮循被调用
		 * @return  {System}
		 * Example：
		 */
		'listen': function (callback, time, israndom) {
			time = time || 3000;
			if (System.isFunction(callback)) {
				callback.timer = setInterval(function () {
					if (callback(callback.timer)) { System.stop(callback.timer); }
				}, time);
				timers.push(callback.timer);
			} else if (System.isArray(callback)) {
				israndom = israndom || false;
				var i = -1;
				System.each(callback, function (index) {
					if (System.isObject(this)) {
						this.time = this.time || time;
						this.index = index;
						this.timer = setInterval(function () {
							if (israndom) {
								i = Math.floor(Math.random() * callback.length);
							} else {
								if (callback.length === i) { i = -1; }
								i++;
							}
							var json = callback[i];
							if (System.isFunction(json.func) && json.func(json.timer)) {
								System.stop(json.timer);
								callback.removeAt(json.index);
							}
						}, this.time);
						timers.push(this.timer);
					} else {
						this.index = index;
						this.timer = setInterval(function () {
							if (israndom) {
								i = Math.floor(Math.random() * callback.length);
							} else {
								if (callback.length === i) { i = -1; }
								i++;
							}
							var func = callback[i];
							if (System.isFunction(func) && func(func.timer)) {
								System.stop(func.timer);
								callback.removeAt(func.index);
							}
						}, time);
						timers.push(this.timer);
					}

				});
			}
			return this;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018-5-15
		 * 修改日期：2018-7-29
		 * 名称：System.stop
		 * 功能：停止 System.listen
		 * 说明：没有参数就停止全部监听器
		 * 注意：
		 * @param   (Number)id 			   NULL :定时器
		 * @return  (void)
		 */
		'stop': function (id) {
			if (arguments.length > 0) {
				if (System.isNumber(id) && timers.in_array(id)) {
					timers.remove(id);
					clearInterval(id);
				}
			} else {
				System.each(timers, function (i, id) {
					clearInterval(id);
				});
				timers = [];
			}

		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-4-11
		 * 修改日期：2016-8-23
		 * 名称：System.then
		 * 功能：支持链式调用，总是返回当前命名空间对象，
		 * 说明：跟run方法类似，不同的是run 返回的是callback里的返回值。
		 * 注意：
		 * @param   (Array)args 			   NULL :传入的参数
		 * @param   (Function)callback 		NO NULL :在运行此方法要立马执行的操作,这里的this指的是LAMJS 对象（必选）
		 * @return  (System)
		 * Example：
		 */
		'then': function (args, callback) {
			this.run(args, callback);
			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-8-26
		 * 修改日期：2016-8-26
		 * 名称：System.eval
		 * 功能：对json 或 function 的字符串 进行eval 处理
		 * 说明：
		 * 注意：
		 * @param   {String}expression 		NO NULL :表达式字符串
		 * @return  {*}								:
		 * Example：
		 */
		'eval': function (expression) {
			try {
				// if(System.isJson(expression) && System.isJSON(JSON)){
				return JSON.parse(expression);
				// }
			} catch (e) {
				return eval('(' + expression + ')');
			}


		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-12-29
		 * 修改日期：2017-12-29
		 * 名称：System.globalEval
		 * 功能：
		 * 说明：
		 * 注意：
		 * @param   {String}data 		NO NULL :
		 * @return  {void}
		 * Example：
		 */
		'globalEval': function (data) {
			if (System.isset(data) && System.isString(data) && data.trim()) {
				// We use execScript on Internet Explorer
				// We use an anonymous function so that context is window
				// rather than jQuery in Firefox
				(global.execScript || function (data) {
					global["eval"].call(global, data);
					// jscs:ignore requireDotNotation
				})(data);
			}
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-20
		 * 修改日期：2014-12-20
		 * 名称：queues
		 * 功能：队列
		 * 说明：
		 * 注意：
		 * @param   (Array)arr          NO NULL :
		 * @param   (Number)n           NO NULL :算时间差的值
		 * @param   (Function)fn        NO NULL :
		 * Example：
		 */
		'queues': function (arr, n, fn) {
			if (!isFunction(fn)) return -1;
			var time = 0;
			for (var i = 0, len = arr.length; i < len; i++) {
				time = n * i;
				fn.call(arr[i], time, i);

			}
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2016-7-19
		 * 名称：length
		 * 功能：获取对象成员的长度
		 * 说明：
		 * 注意：
		 * @param   (Object | Array | String)D 			   NULL :指定的对象
		 * @returns {Number}
		 */
		'length': function (D) {
			if (!isObject(D) && !isArray(D) && !isString(D)) {
				throw new Error('Warning: 参数必须是Object 或 Array 或 String');
				return -1;
			}

			if (isObject(D)) {
				return getObjectLength.call(D);
			}

			if (isArray(D) || isString(D)) {
				return D.length;

			}

		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-23
		 * 修改日期：2015-3-18
		 * 名称：proxy
		 * 功能：改变指定对象里的this指向
		 * 说明：
		 * 注意：
		 * @param   (Function)fn       NO NULL :将要被改变作用域的函数
		 * @param   (Object)context    NO NULL :一个object，那个函数的作用域会被设置到这个object上来。
		 * @return  ()
		 * Example：
		 */
		'proxy': function (fn, context) {
			if (isString(context)) {
				var tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			var args = slice.call(arguments, 2),
				proxy = function () {
					return fn.apply(context, args.concat(slice.call(arguments)));
				};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || proxy.guid || System.guid++;

			return proxy;
		},
		/**
		 *
		 * @author：lhh
		 * 功能：输入一个键值对应的个数返回对应的值
		 * 名称：putIndexGetObjectTheValue
		 * 创建日期：2014.6.15
		 * 修改日期：2016.2.25
		 * @param (Object)D 		NO NULL :
		 * @param (int)n 			NO NULL :
		 * @return ()
		 */
		'putIndexGetObjectTheValue': function (D, n) {
			var i = 0, k;
			//输入的一定是对象和数字
			if (isObject(D) && isNumeric(n)) {
				//防止输入的下标大于对象的长度
				if (getObjectLength.call(D) >= n) {
					for (k in D) {
						if (i == n) {
							return D[k];
						} else {
							i++;
						}
					}
				}

			}
			return false;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-2-29
		 * 修改日期：2020-5-18
		 * 名称： each
		 * 功能：遍历数组或对象
		 * 说明：
		 * 注意：
		 * @param 	{Array | Object}arr     		NO NULL :
		 * @param 	{Function}callback             	NO NULL : 回调方法
		 * @returns {*}
		 */
		'each': function (obj, callback) {
			var key, item;
			if (!obj || !callback) { throw new Error('Warning: : 两个参数是必传的'); }
			if (System.isNumber(obj) || System.isBoolean(obj)) { throw new Error('Warning: ' + obj + ': 数据类型非法！'); }
			if (!System.isFunction(callback)) { throw new Error('Warning: :第二参数 必须是个callback！'); }
			if (System.isPlainObject(obj)) {
				for (key in obj) {
					item = obj[key];
					if (false === callback.call(item, key, item, obj)) break;
				}
			} else {
				for (var i = 0, len = obj.length; i < len; i++) {
					item = obj[i];
					if (false === callback.call(item, i, item, obj)) break;
				}
			}
			return obj;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-26
		 * 修改日期：2017-7-14
		 * 名称： search
		 * 功能：递归对象搜索
		 * 说明：如果对象的属性的值还是一个对象的话就递归搜索，直到对象下的属性不是对象为止
		 * 注意：
		 * @param 	(Object)D             			NO NULL : 对象
		 * @param 	(Funtion)callback             	NO NULL : 回调方法
		 * @returns {Object}
		 * Example：
		 *
		 */
		'search': function (D, callback) {
			var loop, totalLoop, recursion = true;
			totalLoop = loop = 0;
			var list = function (D, callback) {
				if (!System.isArray(D) && !System.isPlainObject(D)) { return D; }
				if (!System.isFunction(callback)) { throw new Error('Warning: 第二参数 必须是个callback'); }
				//算出找到指定内容，所需要遍历的次数
				loop++;
				System.each(D, function (k, v) {
					totalLoop++;
					if (false === callback.apply(D, [k, v, loop, totalLoop])) {
						if (System.LAM_DEBUG) { console.log('共遍历' + loop + '次找到了'); }
						recursion = false;
						return false;
					}
					//如果没找到，就继续递归搜索
					if (v && recursion) { list(v, callback); }
				});
			};
			list(D, callback);
			return { 'totalLoop': totalLoop, 'loop': loop };
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-10-10
		 * 修改日期：2017-10-10
		 * 名称：createDict
		 * 功能：创建字典
		 * 说明：
		 * 注意：
		 * @returns {Object}
		 */
		'createDict': function () {
			var result = {};
			result.__proto__ = null;
			return result;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018-4-22
		 * 修改日期：2018-4-22
		 * 名称：toDict
		 * 功能：过滤对象里__proto__ 属性，返回新对象
		 * 说明：
		 * 注意：
		 * @returns {Object}
		 */
		'toDict': function (obj) {
			var dict = System.createDict(), k;
			for (k in obj) {
				if ('__proto__' === k) continue;
				dict[k] = obj[k];
			}
			return dict;
		},


		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-3-27
		 * 修改日期：2018-7-14
		 * 名称：merge
		 * 功能：一个或多个对象合并成一个指定的对象
		 * 说明：默认同名的键值前面的不会被覆盖
		 * 注意：
		 * @param  (Boolean)deep  		   NULL :是否要深度拷贝对象
		 * @param  (Object)target  		NO NULL :target 合并后的对象。null 代表合并到命名空间这个对象里
		 * @param  (Array)args   		NO NULL :要合并对象的集合
		 * @param  (Boolean)override 	   NULL :是否覆盖同名键名值,默认 false 是不覆盖
		 * @return  (target ｜ this) 返回合并后的对象
		 * Example：
		 *		System.merge({},[A[,...]],false);
		 */
		'merge': function (target, args, override) {
			var deep = false, self = this;

			if (System.isBoolean(target)) {
				deep = target;
				target = arguments[1];
				args = arguments[2];
				override = arguments[3];
			}
			if (!System.isArray(args)) { throw new Error('Warning: args 不是一个数组'); }
			var len = args.length;
			if (arguments.length < 2) { throw new Error('Warning: 最少要传2个参数'); }

			override = override || false;
			target = target || this;
			var key;
			var i = 0;
			if (!len) { throw new Error('Warning: args不能为空'); }

			for (; i < len; i++) {
				for (key in args[i]) {
					if (!override && (key in target)) { continue; }
					var value = args[i][key];
					if (deep && (System.isPlainObject(value) || System.isArray(value))) {
						target[key] = self.merge(deep, System.createDict(), [target[key], value], override);
					} else {
						target[key] = value;
					}

				}
			}

			return target;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-13
		 * 修改日期：2022-4-20
		 * 名称：clone
		 * 功能：对象克隆
		 * 说明：_hashCode里的'::'代表是从别的对象克隆来的，如果'::'前面的字符相同就说明俩对象是克隆关系
		 * 注意：
		 * @param   (Boolean)deep  		   	   NULL :是否要深度拷贝对象
		 * @param   (Object)className 		NO NULL : 要克隆的类
		 * @return  (Object)				:返回克隆后的新对象
		 * Example：
		 */
		'clone': function (className) {
			var deep = false;
			if (System.isBoolean(className)) {
				deep = className;
				className = arguments[1];
			}
			var obj = null;
			obj = System.merge(deep, System.createDict(), [className]);
			if (obj['_hashCode']) {
				obj['_hashCode'] += '::' + System.Object.generate();
			} else {
				obj['_hashCode'] = System.Object.generate();
			}
			return obj;

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-15
		 * 修改日期：2022-4-20
		 * 名称：isclone
		 * 功能：检查对象是否是克隆对象
		 * 说明：'_'代表是从别的对象克隆来的，如果'_'前面的字符相同就说明俩对象是克隆关系
		 * 注意：
		 * @param   (Object)className 		NO NULL : 检查的对象
		 * @returns {boolean}
		 */
		'isclone': function (obj) {
			if (!obj._hashCode) return false;
			if (-1 === obj._hashCode.indexOf('::')) {
				return false;
			} else {
				return true;
			}

		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2019-7-4
		 * 修改日期：2022-4-20
		 * 名称：isRelClone
		 * 功能：检查俩对象是否是克隆关系
		 * 说明：
		 * 注意：
		 * @param {Object}obj1
		 * @param {Object}obj2
		 * @param {Number}n
		 * @returns {boolean}
		 */
		'isRelClone': function (obj1, obj2, n) {
			n = n || 0;
			if (obj1._hashCode && obj2._hashCode) {
				var arr1 = obj1._hashCode.split('::');
				var arr2 = obj2._hashCode.split('::');

				var hash1 = 1 === arr1.length ? arr1[0].toString() : arr1[n].toString();
				var hash2 = 1 === arr2.length ? arr2[0].toString() : arr2[n].toString();
				return hash1 === hash2;
			}
			return false;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2019-7-4
		 * 修改日期：2022-4-20
		 * 名称：isDirectClone
		 * 功能：检查俩对象是否是直接克隆关系
		 * 说明：
		 * 注意：
		 * @param obj1
		 * @param obj2
		 * @returns {boolean}
		 */
		'isDirectClone': function (origin, cloned) {
			var ori_arr = origin._hashCode.split('::');
			var clo_arr = cloned._hashCode.split('::');
			var len = clo_arr.length;
			return ((1 === (clo_arr.length - ori_arr.length)) && (clo_arr[len - 2] === ori_arr[len - 2]));
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-3-8
		 * 修改日期：2017-3-8
		 * 名称：System.free
		 * 功能：删除对象下所有成员
		 *
		 * @param Obj
		 */
		'free': function (Obj) {
			for (var prop in Obj) {
				delete Obj[prop];
			}
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-3-18
		 * 修改日期：2015-3-18
		 * 名称：System.extends_f
		 * 功能：在指定对象的原型链上动态扩充方法
		 * 说明：调用call方法改变this指针
		 * 注意：不调用call方法，就是在window.System对象上扩充方法
		 * @param   (Object)this 			NO NULL :指定对象
		 * @param   (String)name   			NO NULL :扩充的方法名称
		 * @param   (Function)fn 			NO NULL :方法原型
		 * @return  (Object) 返回扩充的对象
		 * Example：
		 *		在Basis 的原型上扩充一个set方法
		 *		System.extends_f.call(Basis,'set',function(){});
		 *
		 *		在window.System 的原型上扩充一个set方法
		 *		System.extends_f('set',function(){});
		 *
		 */
		'extends_f': function (name, fn) {
			if (!this.prototype[name]) {
				this.prototype[name] = fn;
			}
			return this;
		},
		
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-10-23
		 * 修改日期：2016-11-9
		 * 		  ：2022-10-23
		 * 名称：System.require
		 * 功能：调用export的接口
		 * 说明：
		 * 注意：
		 * @param {String} name
		 * @returns {*}					:
		 * Example：
		 */
		 'require':function(name){
			if(name){
				if(_module.exports[name]){
					return _module.exports[name];
				}else{
					return null;
				}
			} else {
				return System.clone(true, _module.exports);
			}
			
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-10-23
		 * 修改日期：2016-10-23
		 * 		  ：2022-10-23
		 * 名称：System.export
		 * 功能：设置对外提供接口
		 * 说明：
		 * 注意：
		 * @param {String} name
		 * @param {*} value
		 * @return  (voide)						:
		 * Example：
		 */
		'export':function(name,value){
			if(_module.exports[name]){
				throw new Error(['Warning: \'',name,'\' 名称已经存在,请换个名字'].join(''));
			}else{
				_module.exports[name] = value;
			}
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍： class文件检验器
		 * 创建日期：2015-8-18
		 * 修改日期：2017-12-25
		 * 名称： System.is
		 * 功能：检测namespace是否合法，检测要使用的类是否已加载过,如没加载就调用System.import()方法加载要使用的类，(namespace 必须是对象，useClassName是类名称)；检测要定义的类名称之前是否已注册过。
		 * 说明：子类继承父类之前调用此方法检测父类之前是否有加载过，如果填写第三参数可检测当前的类是否跟之前的类重名了
		 * 注意：当Obj 类型是对象时 useClassName 参数必须要传！ 没传命名空间时 useClassName 参数可以省略不传
		 * @param  (Object)namespace 	       		 NULL : 命名空间
		 * @param  (String)useClassName     	  	 NULL : 要使用的类名称
		 * @param  (String)className         	　　 NULL : 当前类的名称
		 * @param  (String)path         	　　     NULL : 要使用的类的路径
		 * @return (Boolean)
		 * Example：
		 *
		 */
		'is': function (namespace, useClassName, className, path) {
			var arg_len = arguments.length;
			path = path || System.classPath;
			if (System.isString(namespace)) {
				//两个参数时 参数类型全部是字符串
				if (2 === arg_len) {
					className = useClassName;
					useClassName = namespace;
					namespace = null;
					if (!System.isFunction(System.eval(useClassName))) {
						throw new Error(["Warning: cannot find the class file ", "'/", useClassName, ".class'"].join(''));
					}
					if (!System.empty(System.eval(className)) && System.isFunction(System.eval(className))) {
						throw new Error(["Warning: the Class name ", "'", className, "'", " has been defined"].join(''));
					}
				} else if (1 === arg_len) {//只有一个参数时 功能：检测函数或方法是否之前已定义过了
					className = namespace;
					useClassName = null;
					namespace = null;
					if (!System.empty(System.eval(className)) && System.isFunction(System.eval(className))) {
						throw new Error(["Warning: the Class name ", "'", className, "'", " has been defined"].join(''));
					}
				}
			} else {
				if (!(useClassName in namespace)) {
					throw new Error(["Warning: ", namespace, " is not a legitimate object or ", "'", useClassName, "'", " is not a legitimate"].join(''));
				}
				className = className || null;
				if (!System.isFunction(namespace[useClassName])) {
					try {
						System.import(['/' + useClassName + '.class'], path);
					} catch (e) {
						throw new Error(e + [" --- Warning: cannot find the class file ", "'/", useClassName, ".class'"].join(''));
					}

				}
				if (!System.empty(className) && System.isFunction(namespace[className])) {
					throw new Error(["Warning: the Class name ", "'", className, "'", " has been defined"].join(''));
				}
			}
			return true;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-02
		 * 修改日期：2018-4-12
		 * 名称：System.isClassFile
		 * 功能：检查是否是类文件
		 * 说明：
		 * 注意：
		 * @param   (String)path 			NO NULL :路径名称
		 * @return  (Boolean)
		 * Example：
		 *
		 */
		"isClassFile": function (path) {
			//查找是否有.class这个关键字
			return this.isTheFile(path, 'class\\.js');
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2022-3-9
		 * 修改日期：2022-3-9
		 * 名称：System.isTheFile
		 * 功能：是指定文件的后缀名吗
		 * 说明：
		 * 注意：
		 * @param   (String)url 			NO NULL :路径名称
		 * @param   (String)suffix 			NO NULL :后缀名称
		 * @returns {boolean}
		 * 
		 */
		"isTheFile": function (url, suffix) {
			var n = url.indexOf('?');
			if (n > -1) url = url.substring(0, n).trim(); // 先要抛弃问号和后面的参数
			if (url.search(new RegExp("\\." + suffix + "$", "i")) > -1) return true;
			return false;
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018-11-11
		 * 修改日期：2022-3-9
		 * 名称：System.isJsFile
		 * 功能：检查是否是js文件
		 * 说明：
		 * 注意：
		 * @param   (String)url 			NO NULL :路径名称
		 * @param   (String)suffix 			NULL :后缀名称
		 * @returns {boolean}
		 */
		"isJsFile": function (url, suffix) {
			return this.isTheFile(url, suffix || 'js');
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2020-2-05
		 * 修改日期：2022-3-9
		 * 名称：System.isCssFile
		 * 功能：检查是否是css文件
		 * 说明：
		 * 注意：
		 * @param   (String)url 			NO NULL :路径名称
		 * @param   (String)suffix 			NULL :后缀名称
		 * @returns {boolean}
		 */
		"isCssFile": function (url, suffix) {
			return this.isTheFile(url, suffix || 'css');
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-8-20
		 * 修改日期：2018-4-9
		 * 名称：System.fileExisted
		 * 功能：检查系统加载器里的文件是否已加载过,class.js 是否已加载过了
		 * 说明：
		 * 注意：
		 * @param file		NO NULL
		 * @param namespace NULL
		 * @returns {boolean}
		 */
		'fileExisted': function (file, namespace) {
			if (System.files.in_array(file)) {
				return true;
			} else if (System.isClassFile(file)) {
				var arr, className;
				namespace = namespace || System;
				if (file.indexOf("/") != -1) {
					arr = file.split("/");
					file = arr[arr.length - 1];
				}
				if (file.indexOf(".") != -1) {
					arr = file.split(".");
					className = arr[0].firstToUpperCase();
					//这个文件已经加载过了
					if (System.isFunction(namespace[className])) return true;
				}
			}
			return false;
		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍： 函数检验器
		 * 创建日期：2016-9-18
		 * 修改日期：2016-9-18
		 * 名称： System.function_exists
		 * 功能：检验全局函数是否已定义过了
		 * 说明：
		 * 注意：
		 * @param 	(String)fun_name         	　　NULL : 全局函数名称
		 * @return (Boolean)
		 * Example：
		 *
		 */
		'function_exists': function (fun_name) {
			if (global[fun_name] && System.isFunction(global[fun_name])) {
				return true;
			}
			return false;

		},

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-8-23
		 * 修改日期：201711-2
		 * 名称： System.isPlainObject
		 * 功能：是否是纯对象
		 * 说明：摘抄jQuery isPlainObject()
		 * 注意：
		 * @param {Object}obj
		 * @returns {boolean}
		 */
		'isPlainObject': function (obj) {
			var key;
			if (!System.isset(obj) || !System.isObject(obj) || System.isArray(obj) || obj.nodeType || System.isWindow(obj)) {
				return false;
			}
			try {
				// Not own constructor property must be Object
				if (obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch (e) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			for (key in obj) { }
			return key === undefined || hasOwn.call(obj, key);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-10-9
		 * 修改日期：2017-10-9
		 * 名称： System.hasOwnProperty
		 * 功能：对象里是否包含指定的属性(key),有就返回值
		 * 说明：
		 * 注意：
		 * @param {Object}obj
		 * @param {String}key
		 * @returns {*}
		 */
		'hasOwnProperty': function (obj, key) {
			if (obj.hasOwnProperty(key)) {
				return obj[key];
			}
			return null;
		},


		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-10-24
		 * 修改日期：2017-10-24
		 * 名称： System.timestamp
		 * 功能：生成时间戳
		 * 说明：
		 * 注意：
		 * @returns {Number}
		 */
		'timestamp': function () {
			if (!Date.now) {
				Date.now = function now() {
					return new Date().getTime();
				};
			}
			return Date.now();
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-9-4
		 * 修改日期：2018-12-7
		 * 名称： Html.renderTagAttributes
		 * 功能：
		 * 说明：
		 * 注意：length 是关键字 属性里禁止使用
		 * @param 	(Object)Attr             	NO NULL : 标签的属性
		 * @return (Array) 返回属性数组
		 * Example：
		 *
		 */
		'renderTagAttributes': function (Attr) {
			Attr = !Attr || !System.isPlainObject(Attr) ? System.createDict() : Attr;
			var attrs = [];
			if (System.isEmptyObject(Attr)) { return attrs; }
			System.each(Attr, function (k, v) {
				attrs.push(' ', k, '="', v, '"');
			});

			return attrs;
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-8-25
		 * 修改日期：2019-7-6
		 * 名称： tag
		 * 功能：动态返回指定的标签
		 * 说明：
		 * 注意：length 是关键字 属性里禁止使用
		 * @param 	(Boolean)single            NULL : 成对标签还是单一标签，false 是成对标签
		 * @param 	(String)name            NO NULL : 标签名称
		 * @param 	(Object)Attr               NULL : 标签的属性
		 * @param 	(String|Array)content      NULL : 内容
		 * @return (String)
		 * Example：
		 *
		 */
		'tag': function (single, name, Attr, content) {
			var args = arguments;
			var len = args.length;
			if (0 === len || len > 4) { throw new Error('Warning :参数至少有一个，且参数个数不能超过4个'); }
			if (!System.isBoolean(single)) {
				name = args[0];
				Attr = args[1] || {};
				content = args[2] || '';
				single = false;
			} else {
				if (!System.isString(args[1])) { throw new Error('Warning :缺少标签名称'); }
				single = args[0];
				name = args[1] || null;
				Attr = args[2] || {};
				content = args[3] || '';
			}
			if (System.isString(Attr) || System.isArray(Attr)) {//属性可以省略
				content = Attr;
				Attr = {};
			}

			content = System.isNumeric(content) ? String(content) : content;

			//check
			if (System.empty(name) || !System.isString(name)) { throw new Error('Warning :标签名称不能为空，只能是字符串！'); }
			if (Attr && !System.isPlainObject(Attr)) { throw new Error('Warning :<' + name + '>标签的属性,{Attr}参数必须是一个对象！'); }
			if (content && !(System.isString(content) || System.isArray(content))) { throw new Error('Warning :<' + name + '>标签内容必须是字符串或者是数组'); }

			var tag = [];
			tag.push('<', name);
			//拼接属性
			if (Attr && System.isPlainObject(Attr) && !System.isEmptyObject(Attr)) {
				Attr = System.toDict(Attr);
				tag.push(System.renderTagAttributes(Attr).join(''));
			}

			if (single) {
				tag.push(' />');
			} else {
				tag.push('>');
				if (!System.empty(content)) {
					if (System.isArray(content)) {
						tag.push(content.join(''));
					} else {
						tag.push(content);
					}
				}
				tag.push('</', name, '>');
			}
			return tag.join('');
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-9-4
		 * 修改日期：2019-7-6
		 * 名称： script
		 * 功能：
		 * 说明：
		 * 注意：length 是关键字 属性里禁止使用
		 * @param 	(String)src      NO NULL : 路径
		 * @param 	(Object)Attr        NULL : 标签的属性
		 * @return (String)
		 * Example：
		 */
		'script': function (src, Attr) {
			if (!System.isString(src)) { throw new Error('Warning: script 标签src参数必须是字符串！'); }
			Attr.src = src;
			Attr.type = Attr.type || 'text/javascript';
			return System.tag('script', Attr);
		},
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-9-30
		 * 修改日期：2016-9-30
		 * 名称：System.open
		 * 功能：打开一个新文档，并擦除当前文档的内容
		 * 说明：
		 * 注意：
		 * @return  {Document}
		 */
		'open': function (mimetype, replace) {
			mimetype = mimetype || "text/html";
			replace = replace || "replace";
			return document.open(mimetype, replace)
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-9-16
		 * 修改日期：2016-9-30
		 * 名称：System.print
		 * 功能：输出
		 * 说明：
		 * 注意：
		 * @param   (Object)D 			NO NULL :传入的参数
		 * @return  (voide)						:
		 * Example：
		 * 		System.print('s'[,1,'a',...])
		 */
		'print': function () {
			// var document=System.open();
			var arr = System.printf.apply(Array, arguments);
			document.write(arr.join(' '));
			// System.close(document);
		},
		'Json': {
			/**
			 * @author: lhh
			 * 产品介绍：
			 * 创建日期：2019-3-19
			 * 修改日期：2019-3-19
			 * 名称：System.stringify
			 * 功能：JSON对象转字符串
			 * 说明：
			 * 注意：
			 * @param   (Object|Array)D 			NO NULL :
			 * @return  (String)						:
			 * Example：
			 */
			'stringify': function (D) {
				return JSON.stringify(D);
			},

			/**
			 * @author: lhh
			 * 产品介绍：
			 * 创建日期：2019-3-19
			 * 修改日期：2019-3-19
			 * 名称：System.parse
			 * 功能：字符串转JSON对象
			 * 说明：
			 * 注意：
			 * @param   (String)str 			NO NULL :
			 * @return  (JSON)						:
			 * Example：
			 */
			'parse': function (str) {
				return JSON.parse(str);
			}
		},
		/**
 		 *
		 * @param hashLength
		 * @returns {string}
		 */
		'hash': function (code, hashLength) {
			var Md5 = System.require("lam.base.Md5");
			code = code || null;
			hashLength = Number(hashLength);
			if (!System.isset(hashLength) || !System.isNumeric(hashLength) || hashLength < 1) { hashLength = 32; }
			var ar = [];
			ar[0] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			ar[1] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			ar[2] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			ar[3] = code && System.isString(code) && code.split('') || [];
			ar[4] = "~!@#$%^&*()_+{}<>?:|=";
			ar[5] = System.timestamp().toString();
			ar = ar[0].merge(ar[1]).merge(ar[2]).merge(ar[3]).merge(ar[4].split('')).merge(ar[5].split(''));
			var arr = [];
			var al = ar.length;
			for (var i = 0; i < hashLength; i++) {
				arr.push(ar[Math.floor(Math.random() * al)]);
			}

			return Md5.md5(arr.join('')).replace(/[_\s]/g, '');
		},

		'uniqid': function (hashLength) {
			return this.hash(System.timestamp().toString(), hashLength);
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-9-30
		 * 修改日期：2016-9-30
		 * 名称：System.close
		 * 功能：关闭输出文档流
		 * 说明：
		 * 注意：
		 * @return  (voide)
		 */
		'close': function (document) {
			document = document || global.document;
			document.close();
		}
	};

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2022-3-10
	 * 修改日期：2022-3-10
	 * 名称： System.getFile
	 * 功能：获取文件的内容
	 * 说明：支持链式调用。Html.getFile 覆写了此方法, 
	 *		因为Template类里调用了这个方法。Html类和Template类耦合度太紧，
	 *		目前只能先想到用这样一个约定的接口方法，用来临时解耦，
	 *		以后有更好的方案替代Html类,那么也要参照Html.getFile方法在替代的类里覆写了此方法！！！
	 * 注意：
	 * @param 	(String)  	D.url         	      NULL :请求地址
	 * @param 	(Function)	D.callBack       	  NULL :参数：文件里的内容
	 * @param 	(Object)D                	   NO NULL :json 数据
	 * @param 	(String)  	D.type             NO NULL :获取方式
	 * @param 	(String)  	D.dataType         NO NULL :获取文件类型
	 * @param 	(String|{}) D.data             	  NULL :请求地址的参数
	 * @param 	(Boolean) 	D.async               NULL :是否异步加载
	 * @param 	(Boolean) 	D.cache           	  NULL :是否缓存默认true
	 * @returns {System}
	 * Example：
	 *
	 */
	System.getFile = function (url, callBack, D) { return System; };


	System.String = System.createDict();
	System.Number = {
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016-7-6
		 * 修改日期：2016-7-6
		 * 名称：System.Number.limit
		 * 功能：限制数字位数
		 * 说明：
		 * 注意：
		 *
		 * @param (Number)n				NO NULL : 要限制的数字
		 * @param (Number)limit			NO NULL : 限制的位数，默认是9位
		 * @returns {string}
		 */
		'limit': function (n, limit) {
			limit = limit || 9;
			return n.toString().trim().substr(0, limit);
		},
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017-12-29
		 * 修改日期：2017-12-29
		 * 名称：System.Number.by
		 * 功能：修复俩浮点数相乘得数怪异问题 如： 0.8*0.8
		 * 说明：
		 * 注意：
		 *
		 * @param (Number)a
		 * @param (Number)b
		 * @returns {number}
		 */
		'by': function (a, b) {
			return ((10000 * a * b) / 10000);
		}
	};
	System.Array = {
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016.8.21
		 * 修改日期：2016.8.21
		 * 名称：System.Array.in_array
		 * 功能：搜索数组中是否存在指定的值
		 * 说明：
		 * 注意：
		 * @param   (String|Number|Boolean|Object|Array)search		NO NULL : 必需。规定要在数组搜索的值。
		 * @param   (Array)array						   			NO NULL : 必需, 规定要搜索的数组。
		 * 调用方式：
		 * @return  (Boolean)
		 * Example：
		 */

		'in_array': function (serch, array) {
			return Array.in_array.call(array, serch);
		}
	};


	//check
	System.isNull = isNull;
	System.isUndefined = isUndefined;
	System.isset = isset_;
	System.empty = empty_;
	System.error = error;
	System.isEmptyObject = isEmptyObject;
	System.arr_isEmpty = arr_isEmpty;
	System.type = type;
	System.isObject = isObject;
	System.isJSON = isJSON;
	System.isobject = function (obj) {
		return obj !== null && typeof obj === 'object';
	};
	System.isString = isString;
	System.isArray = isArray;
	System.isFunction = isFunction;
	System.isBoolean = isBoolean;
	System.isRegExp = isRegExp;
	System.isDate = isDate;
	System.isBlob = isBlob;

	System.isWindow = isWindow;
	System.is_instanceof_jQuery = is_instanceof_jQuery;

	System.arr_Object_key = arr_Object_key;
	System.arr_Object_key_has = arr_Object_key_has;
	System.contains = contains;
	//check Number
	System.isNumber = isNumber;
	System.isNumeric = isNumeric;
	System.isFloat = isFloat;

	System.guid = 0;
	System.classPath = './';
	System.classes = [];
	System.files = [];
	System.Super = System.createDict();
	System.app = null;
	System.Object = Object.prototype || System.createDict();
	System.Function = Function.prototype || System.createDict();
	System.Date = Date.prototype || System.createDict();
	System.String = String.prototype || System.createDict();
	System.Array = Array.prototype || System.createDict();


	System.printf = prints;

	//==================================================================================

	//函数在原型里定义一个方法
	Function.prototype.method = function (name, fn) {
		if (!this.prototype[name]) {
			this.prototype[name] = fn;
		}
		return this;
	};
	// from http://javascript.crockford.com/inheritance.html
	Function
		.method('inherits', function (parent) {
			this.prototype = new parent();
			var d = {},
				p = this.prototype;
			this.prototype.constructor = parent;
			this.method('uber', function uber(name) {
				if (!(name in d)) {
					d[name] = 0;
				}
				var f, r, t = d[name], v = parent.prototype;
				if (t) {
					while (t) {
						v = v.constructor.prototype;
						t -= 1;
					}
					f = v[name];
				} else {
					f = p[name];
					if (f == this[name]) {
						f = v[name];
					}
				}
				d[name] += 1;
				r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
				d[name] -= 1;
				return r;
			});
			return this;
		})
		.method('swiss', function (parent) {
			for (var i = 1; i < arguments.length; i += 1) {
				var name = arguments[i];
				this.prototype[name] = parent.prototype[name];
			}
			return this;
		});

	/**
	 *
	 * 对Date的扩展，将 Date 转化为指定格式的String
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * 例子：
	 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	 * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	 *
	 *
	 */

	Date.method('format', function (fmt) {
		var o = {
			"M+": this.getMonth() + 1,                 //月份
			"d+": this.getDate(),                    //日
			"h+": this.getHours(),                   //小时
			"m+": this.getMinutes(),                 //分
			"s+": this.getSeconds(),                 //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds()             //毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	});

	String
		.method('trim', function () {
			return this.replace(/(^\s*)|(\s*$)/g, "");
		})
		/**
 		 * trim 指定的字符
		 */
		.method('trim_str', function (str) {
			return trim(this, str);
		})

		/**
		 *
		 * @author：lhh
		 * 创建日期：2014-12-22
		 * 修改日期：2015-10-28
		 * 名称：filterChar
		 * 功能：过滤所有字符串返回数字
		 * 说明：
		 * 注意：
		 * @param(void)
		 * @return (Number)
		 * Example：String.filterChar()
		 */
		.method('filterChar', function () {
			return Number(this.replace(/[^\d]*/ig, ""));
		})

		/**
		 *
		 * @author：lhh
		 * 创建日期：2014-12-22
		 * 修改日期：2015-10-28
		 * 名称：findStr
		 * 功能：查找匹配的字符
		 * 说明：
		 * 注意：
		 * @return (String)
		 * Example：String.findStr()
		 */
		.method('findStr', function () {
			if (System.empty(this)) {
				return false;
			}
			return this.match(/[^\d]*/i);
		})

		/**
		 *
		 * @author：lhh
		 * 创建日期：2016-3-28
		 * 修改日期：2016-3-28
		 * 名称：firstToUpperCase
		 * 功能：首字母大写
		 * 说明：
		 * 注意：
		 * @return (String)
		 * Example：String.firstToUpperCase()
		 */
		.method('firstToUpperCase', function () {
			return this.replace(/(\w)/, function (v) { return v.toUpperCase() });
		})



		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2015-10-28
		 * 名称：compareTwoStr
		 * 功能：比较俩个字符是否相等
		 * 说明：
		 * 注意：
		 * @param   (String)s 			NO NULL :要比较的字符串
		 * @param   (Boolean)
		 * Example：String.compareTwoStr('aaa')
		 */
		.method('compareTwoStr', function (s) {
			if (System.empty(this) || System.empty(s)) {
				return false;
			}
			var s1, s2;
			s1 = this.match(/[^\d]*/i);
			s2 = s.match(/[^\d]*/i);
			if (s1.length === s2.length && s1 === s2) {
				return true;
			} else {
				return false;
			}
		});



	Array
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2015-10-28
		 * 名称：indexOf
		 * 功能：在指定的数组中查找对应的元素如果有，就返回元素在数组里的的下标，否则就放回-1
		 * 说明：
		 * 注意：
		 * @param   (val)d
		 * @returns   (Number)
		 * Example：
		 */
		.method('indexOf', function (d) {
			for (var i = 0, len = this.length; i < len; i++) {
				if (this[i] === d)
					return i;
			}
			return -1;
		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2015-10-28
		 * 名称：lastIndexOf
		 * 功能：在指定的数组中查找对应的元素如果有，就返回元素在数组里的的下标，否则就放回-1
		 * 说明：同indexOf一样不同的是，从数组尾部开始检索
		 * 注意：
		 * @param   (val)d
		 * @returns   (Number)
		 * Example：
		 */
		.method('lastIndexOf', function (d) {
			for (var i = this.length - 1; i >= 0; i--) {
				if (this[i] === d)
					return i;
			}
			return -1;
		})

		/**
		 * 数组根据下标删除一个元素，返回一个删除后的数组
		 * @param n
		 * @returns
		 */
		.method('del', function (n) {//n表示第几项，从0开始算起。
			//prototype为对象原型，注意这里为对象增加自定义方法的方法。
			if (n < 0) {  //如果n<0，则不进行任何操作。
				return this;
			} else {
				return this.slice(0, n).concat(this.slice(n + 1, this.length));
			}
			/*
			 concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
						 这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
						 组成的新数组，这中间，刚好少了第n项。
			 slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
			 */
		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2016.8.20
		 * 修改日期：2016.8.20
		 * 名称：in_array
		 * 功能：搜索数组中是否存在指定的值
		 * 说明：
		 * 注意：
		 * @param   (String|Number|Boolean|Object|Array)search		NO NULL : 必需。规定要在数组搜索的值。
		 * @param   (Array)array						   			   NULL : 规定要搜索的数组。
		 * 调用方式：
		 * @return  (Boolean)
		 * Example：
		 */
		.method('in_array', function (search, array) {
			array = array || this;
			if (-1 === array.indexOf(search)) {
				return false;
			}
			return true;
		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2014-12-22
		 * 修改日期：2015-10-28
		 * 名称：contains
		 * 功能：数组中是否包括指定的元素
		 * 说明：等同in_array 功能
		 * 注意：
		 * @param   (val)d
		 * @returns   (Boolean)
		 * Example：
		 */
		.method('contains', function (d) {
			return this.indexOf(d) != -1;
		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.10.27
		 * 修改日期：2015.10.27
		 * 名称：clone
		 * 功能：克隆数组
		 * 说明：跟copy 是等效的 推荐用clone
		 * 注意：
		 * @param   (void)
		 * 调用方式：
		 * @return  (Array)返回克隆后的数组
		 * Example：[].clone();
		 */
		.method('clone', function () {
			if (this.concat) {
				return this.concat();
			}
			return this.copy();

		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.2.28
		 * 修改日期：2015.2.28
		 * 名称：copy
		 * 功能：复制数组
		 * 说明：跟clone 是等效的
		 * 注意：
		 * @param   (void)
		 * 调用方式：
		 * @return  (Array)返回复制后的数组
		 * Example：[].copy();
		 */
		.method('copy', function () {
			var arr = [];
			for (var i = 0, l = this.length; i < l; i++) {
				arr.push(this[i]);
			}
			return arr;
		})

		.method('insertAt', function (d, i) {
			this.splice(i, 0, d);
		})
		.method('insertBefore', function (d, d2) {
			var i = this.indexOf(d2);
			if (-1 === i) {
				this.push(d);
			} else {
				this.splice(i, 0, d);
			}
		})
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.2.28
		 * 修改日期：2015.2.28
		 * 名称：removeAt
		 * 功能：根据数组下标删除对应元素
		 * 说明：
		 * 注意：
		 * @param   {Number}i
		 * 调用方式：
		 * @return  {void}
		 */
		.method('removeAt', function (i) { this.splice(i, 1); })
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.2.28
		 * 修改日期：2015.2.28
		 * 名称：remove
		 * 功能：移除数组里指定元素
		 * 说明：
		 * 注意：
		 * @param   {*}d
		 * 调用方式：
		 * @return  {void}
		 */
		.method('remove', function (d) {
			var i = this.indexOf(d);
			if (-1 === i) { return; }
			this.splice(i, 1);
		})
		.method('each', function (callback) {
			System.each(this, callback);
		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.2.28
		 * 修改日期：2015.2.28
		 * 名称：merge
		 * 功能：合并数组
		 * 说明：
		 * 注意：
		 * @param   (Array)arr				NO NULL : //要被合并的数组
		 * @param   (Boolean)override 		   NULL : //是否覆盖相同的值,true : 覆盖；false : 不覆盖；默认不覆盖
		 * 调用方式：
		 * @return  (Array)返回复制后的数组
		 * Example：下面俩种方式任选其一
		 * 		a.merge(b).merge(c).merge(e).merge(f);
		 * 		a.merge(b.merge(c.merge(d.merge(e.merge(f)))));
		 */
		.method('merge', function (arr, override) {

			if (!isArray(arr)) {
				throw new Error(['Warning:', arr, '不是数组'].join(' '));
			}
			if (!override && this.concat) {
				return this.concat(arr);
			}
			var i = 0;
			var a = this.clone();
			var len = arr.length;

			while (i < len) {
				if (override && a.in_array(arr[i])) {
					i++;
					continue;
				}
				a.push(arr[i]);
				i++;
			}
			return a;
		})
		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2018.4.3
		 * 修改日期：2018.4.3
		 * 名称：merge_sort
		 * 功能：数组归并排序
		 * 说明：
		 * 注意：
		 * 调用方式：
		 * @return  (Array)返回排序后的数组
		 * Example：
		 */
		.method('merge_sort', function () {
			var merge = function (left, right) {
				var final = [];
				while (left.length && right.length)
					final.push(left[0] <= right[0] ? left.shift() : right.shift());
				return final.merge(left.merge(right));
			};
			var len = this.length;
			if (len < 2) return this;
			var mid = len / 2;
			return merge(this.slice(0, parseInt(mid)).merge_sort(), this.slice(parseInt(mid)).merge_sort());
		})

		/**
		* @author: lhh
		* 产品介绍：
		* 创建日期：2018.8.30
		* 修改日期：2018.8.30
		* 名称：unique
		* 功能：去重
		* 说明：
		* 注意：
		* 调用方式：
		* @return  (Array)返回去重后的数组
		* Example：
		*/
		.method('unique', function (arr) {
			arr = this;
			var hash = [];
			for (var i = 0; i < arr.length; i++) {
				if (hash.indexOf(arr[i]) == -1) {
					hash.push(arr[i]);
				}
			}
			return hash;
		})



		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.2.28
		 * 修改日期：2015.2.28
		 * 名称：filter
		 * 功能：根据回调条件过滤数组里的数据
		 * 说明：
		 * 注意：
		 * @param   (Function)fn 		NO NULL :
		 * @param   (Object)D			NO NULL :
		 * 调用方式：
		 * @return  (Array)返回过滤后符合条件的元素
		 * Example：
		 */
		.method('filter', function (fn, D) {
			if (!isFunction(fn)) {
				return this;
			}
			D = D || global;
			var a = [];
			for (var i = 0, len = this.length; i < len; ++i) {
				if (!fn.call(D, this[i], i, this)) {
					continue;
				}
				a.push(this[i]);
			}
			return a;
		})
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.11.12
		 * 修改日期：2018.3.27
		 * 名称：min
		 * 功能：找出数组里最小的数字
		 * 说明：
		 * 注意：
		 * 调用方式：
		 * @return  (Number)
		 * Example：
		 */
		.method('min', function () {
			var i = this.length,
				min = this[0];

			while (i--) {
				if (this[i] < min) {
					min = this[i];
				}
			}
			return min;
		})

		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015.11.12
		 * 修改日期：2018.3.27
		 * 名称：max
		 * 功能：找出数组里最大的数字
		 * 说明：
		 * 注意：
		 * 调用方式：
		 * @return  (Number)
		 * Example：
		 */
		.method('max', function () {
			var i = this.length,
				max = this[0];

			while (i--) {
				if (this[i] > max) {
					max = this[i];
				}
			}
			return max;
		})
		/**
		 *
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2017.07.05
		 * 修改日期：2017.07.05
		 * 名称：array_chunk
		 * 功能：将一个数组分割成多个
		 * 说明：
		 * 注意：
		 * 调用方式：
		 * @param size  每个数组的单元数目
		 * @param array 需要操作的数组
		 * @returns {Array}
		 * Example：
		 */
		.method('array_chunk', function (size, array) {
			array = array || this;
			var result = [];
			for (var x = 0; x < Math.ceil(array.length / size); x++) {
				var start = x * size;
				var end = start + size;
				result.push(array.slice(start, end));
			}
			return result;
		});


	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-8-27
	 * 修改日期：2017-7-12
	 * 名称：getObjectLength
	 * 功能：获取对象成员的长度
	 * 说明：
	 * 注意：这里的this是调用时改变成指定的对象
	 * @return  (Number) 返回对象里成员数量
	 * Example：
	 */
	function getObjectLength() {
		var n = 0, k;
		if (Object.keys) {
			return Object.keys(this).length;
		}

		for (k in this) {
			n++;
		}
		return n;
	}

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-9-1
	 * 修改日期：2017-7-12
	 * 名称： arr_Object_key_has
	 * 功能：检查 arr_Object_key 这个数组里是否有相同的关键字。有返回true 否则 false;
	 * 说明：
	 * 注意：
	 * @param 	(String)key             	NO NULL : 关键字
	 * @return (Boolean)
	 * Example：
	 *
	 */
	function arr_Object_key_has(key) {
		var arr = System.arr_Object_key;
		if (System.isArray(arr) && arr.in_array(key)) {
			return true;
		}
		return false;
	}




	function contains(parentNode, childNode) { }
	function isEmptyObject(obj) {
		for (var name in obj) { return false; }
		return true;
	}
	function arr_isEmpty(arr) {
		if (!isArray(arr)) { throw new Error('Warning: arr 不是一个数组'); }
		return (!arr.length);
	}
	function error(msg) {
		//try {
		throw new Error(msg);
		//} catch (e) {
		//}

	}
	//检测是否是数字
	function isNumeric(n) {
		return !isNaN(n);
	}
	function isset_(s) {
		return (typeof s !== "undefined" && s !== null);
	}

	function empty_(s) {
		s = s.toString().trim();
		return !(isset_(s) && s.length > 0);
	}

	function isset() {
		//  discuss at: http://phpjs.org/functions/isset/
		var a = arguments, l = a.length, i = 0;
		if (!l) { throw new Error('Warning: Empty isset'); }
		while (i !== l) {
			if (!isset_(a[i])) { return false; }
			i++;
		}
		return true;
	}
	function empty(mixedVar) {
		//  discuss at: http://locutus.io/php/empty/
		var undef, key, i, len, emptyValues = [undef, null, false, 0, '', '0'];
		for (i = 0, len = emptyValues.length; i < len; i++) {
			if (mixedVar === emptyValues[i]) {
				return true
			}
		}
		if (typeof mixedVar === 'object') {
			for (key in mixedVar) {
				if (mixedVar.hasOwnProperty(key)) {
					return false
				}
			}
			return true
		}
		return false
	}

	function trim(str, charlist) {
		//  discuss at: http://locutus.io/php/trim/
		// original by: Kevin van Zonneveld (http://kvz.io)
		// improved by: mdsjack (http://www.mdsjack.bo.it)
		// improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
		// improved by: Kevin van Zonneveld (http://kvz.io)
		// improved by: Steven Levithan (http://blog.stevenlevithan.com)
		// improved by: Jack
		//    input by: Erkekjetter
		//    input by: DxGx
		// bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
		//   example 1: trim('    Kevin van Zonneveld    ')
		//   returns 1: 'Kevin van Zonneveld'
		//   example 2: trim('Hello World', 'Hdle')
		//   returns 2: 'o Wor'
		//   example 3: trim(16, 1)
		//   returns 3: '6'

		var whitespace = [
			' ',
			'\n',
			'\r',
			'\t',
			'\f',
			'\x0b',
			'\xa0',
			'\u2000',
			'\u2001',
			'\u2002',
			'\u2003',
			'\u2004',
			'\u2005',
			'\u2006',
			'\u2007',
			'\u2008',
			'\u2009',
			'\u200a',
			'\u200b',
			'\u2028',
			'\u2029',
			'\u3000'
		].join('');
		var l = 0;
		var i = 0;
		str += '';

		if (charlist) { whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1'); }
		for (i = 0, l = str.length; i < l; i++) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(i);
				break;
			}
		}
		for (i = l - 1, l = str.length; i >= 0; i--) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(0, i + 1);
				break;
			}
		}
		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	}

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-9-16
	 * 修改日期：2015-9-16
	 * 名称：prints
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param   (Array)arguments    NO NULL :传入的参数
	 * @return  (Array)						:
	 * Example：
	 *
	 */
	function prints() {
		var i, arg = arguments, len = arg.length, arr = [];
		for (i = 0; i < len; i++) {
			arr.push(arg[i]);
		}
		return arr;
	}


	(function () {
		var arr = [];
		arr.push('LamborghiniJS(OO JS) VERSION : ' + VERSION);
		arr.push("*     *        *       *");
		arr.push("*    *  *     * *     *  *");
		arr.push("*   *    *   *   *   *    *");
		arr.push("*  * **** * *     * *      *");
		arr.push("* *        *       *        *");
		arr.push('******************************');
		console.log(arr.join('\n'));
	})();
	return System.merge(null, [Interface, global[namespace] || {}]);
});

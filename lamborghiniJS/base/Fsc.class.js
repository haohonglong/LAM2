/**
 *
 * @author lhh
 * 产品介绍：创建文件流对象
 * 创建日期：2016-10-17
 * 修改日期：2022-8-28
 * 名称：LAMJS.Fsc
 * 功能：
 * 说明：
 * 注意：
 * @return  ()						:
 * Example：
 */

(function(global,factory){
	'use strict';

	global = typeof globalThis !== 'undefined' ? globalThis : global || self;
	var System = global['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		var Fsc = factory(System);
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Fsc :
		typeof define === 'function' && define.amd ? define(Fsc) : System.Fsc = Fsc;
		System.export("lam.base.Fsc", Fsc);
	}

})(this,function(System){
	'use strict';
	System.is(System,'Xhr','Fsc',System.classPath+'/base');
	var Xhr = System.require("lam.base.Xhr");

	var __this__=null;
	var Fsc = Xhr.extend({
		constructor: function (url,D){
			this.base(url,D);
			__this__=this;
			this.fso =null;
			this.file=null;
		},
		'_className':'Fsc',
		'__constructor':function(){},
		'cFsc':function(){
			var __this__=this;
			if(this.fso){
				return this.fso;
			}
			if(ActiveXObject){//IE
				this.fso = new ActiveXObject("Scripting.FileSystemObject");
			}else{

			}
			return this.fso;
		},

		'createTextFile':function(fso,file){
			fso = fso || this.cFsc();
			this.file=fso.CreateTextFile(file, true);
			return this.file;
		},
		'writeLine':function(file,str,n){
			file =file || this.file;
			file.WriteLine(str);
			if(n){
				file.WriteBlankLines(n); //换行
			}
		},
		'fclose':function(file){
			file = file || this.file;
			file.close();
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

	return Fsc;
});



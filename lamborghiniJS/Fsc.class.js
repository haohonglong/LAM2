/**
 *
 * @author lhh
 * 产品介绍：创建文件流对象
 * 创建日期：2016-10-17
 * 修改日期：2016-10-17
 * 名称：LAMJS.Fsc
 * 功能：
 * 说明：
 * 注意：
 * @return  ()						:
 * Example：
 */
window[GRN_LHH].run([window],function(window,undefined){
	'use strict';
	var System=this;
	System.is(System,'Xhr','Fsc');


	var __this__=null;
	var Fsc = System.Xhr.extend({
		constructor: function (D){
			__this__=this;
			this.fso =null;
			this.file=null;
			this.xhr = D.xhr || new System.Xhr().getXHR();
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

	System['Fsc']=Fsc;

});


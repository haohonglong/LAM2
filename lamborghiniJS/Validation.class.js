
/**
 * 创建人：lhh
 * 创建日期:2016/3/17
 * 修改日期:2016/3/17
 * 名称：
 * 功能：前端验证
 * 说明 :
 *
 * note :
 *
 *
 *
 */
window[GRN_LHH].run([window,window.document,jQuery],
	function(window,document,$,undefined){
		'use strict';
	var System=this;
	System.is(System,'Browser','Validation');
	var __this__=null;
	var Validation = System.Browser.extend({
		constructor: function (D){
			System.Basis.extends.call(this,System.Browser);
			__this__=this;
			var defaults={
				'$message':$('.help-block')
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

			this.init = init;
			this.$message = init.$message;


		},
		'_className':'Validation',
		'__constructor':function(){},
		/**
		 *
		 * @author lhh
		 * 产品介绍：输入框
		 * 创建日期：2016-7-7
		 * 修改日期：2016-7-7
		 * 名称：input
		 * 功能：
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'input': function(){},
		/**
		 *
		 * @author lhh
		 * 产品介绍：输入框
		 * 创建日期：2016-7-7
		 * 修改日期：2016-7-7
		 * 名称：select
		 * 功能：
		 * 说明：
		 * 注意：
		 * @return  ()
		 * Example：
		 */
		'select': function(){},

		/**
		 *
		 * @author lhh
		 * 产品介绍：提交表单
		 * 创建日期：2016-7-7
		 * 修改日期：2016-7-7
		 * 名称：submit
		 * 功能：提交表单时触发 onsubmit 事件
		 * 说明：
		 * 注意：
		 * @param (jQuery)	D$self		NO NUll :
		 * @param (Function)D.callback	NO NUll :
		 */
		'submit' : function (D){
			var $self,callback;
			var __this__ = this;

			var defaults={
				'$self':null,
				'callback':function(){},
				'$message':$('.help-block')
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
			$self 	 		= init.$self;
			callback 	 	= init.callback;

			this.$message.text('');
			var $form = $self ? $self.closest('form') : $('form');
			$form.on('submit',function(event){
				//如果验证通不过 返回 false
				if(!callback(this)){
					event.preventDefault();

				}
			}).trigger('submit');
		},

		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Validation对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){

		}
	});

	Validation.reg={
		'email'   : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		'email_2' : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		'email_3' : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		'phone'   : /^(13[0-9]{9})|(15[89][0-9]{8})$/,
		'number'  : /[0-9]/
	};

	System['Validation']=Validation;

});



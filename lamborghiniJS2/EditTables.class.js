/**
 * JS实现可编辑的表格
 * 用法:new EditTables(tb1);
 *
 **/

window[GRN_LHH].run([window,window.document,jQuery],
	function(window,document,$,undefined){
		'use strict';
		var System=this;
		System.is(System,'Dom','EditTables');
		var __this__=null;
		var fixEvent = System.Browser.fixEvt;

		var defaultOptions = {
			cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
				'text-align', 'font', 'font-size', 'font-family', 'font-weight',
				'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
			editor: $('<input>')
		};

		/**
		 *设置多个表格可编辑
		 * @param table
		 * @param D
		 * @constructor
		 */
		var EditTables = System.Dom.extend({
			constructor: function(table,D) {
				__this__=this;
				var defaults={
					'event':'click'
				};
				var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;
				var parent= table[0] || document;

				this.init   = init;
				this.table  = table;
				this.parent = parent;

				this.run();

			},
			'_className':'EditTables',
			/**
			 *
			 */
			'run':function(){
				var __this__ = this;
				var init     = this.init;
				var parent   = this.parent;
				var table    = this.table;

				$(parent).off(init['event'],'[data-input="add"]');
				$(parent).on(init['event'],'[data-input="add"]',function(){
					__this__.addRow(table,1);
				});
				$(parent).off(init['event'],'[data-input="del"]');
				$(parent).on(init['event'],'[data-input="del"]',function(){
					__this__.deleteRow(table,1);
				});
				$(parent).off(init['event'],'[data-input="reset"]');
				$(parent).on(init['event'],'[data-input="reset"]',function(){
					window.location.reload();
				});
				$(parent).off(init['event'],'[data-input="submit"]');
				$(parent).on(init['event'],'[data-input="submit"]',function(event){
					event = fixEvent(event);
					__this__.getTableData(table,1);
					event.preventDefault();

				});


				this.setTableCanEdit(this.table);
				return this;
			},
			/**
			 * 设置表格是可编辑的
			 * @param table
			 * @returns {EditTables}
			 */
			'setTableCanEdit':function(table) {
				for (var i = 1; i < table.rows.length; i++) {
					this.setRowCanEdit(table.rows[i]);
				}
				return this;
			},
			/**
			 *
			 * @param row
			 * @returns {EditTables}
			 */
			'setRowCanEdit':function(row) {
				var __this__ =this;
				System.each(row.cells,function(j){
					//如果当前单元格指定了编辑类型，则表示允许编辑
					var editType = $(this).attr("edit-type");
					if (!editType) {
						//如果当前单元格没有指定，则查看当前列是否指定
						editType = row.parentNode.rows[0].cells[j].getAttribute("edit-type");
						//editType = $(this).closest('tr').attr("edit-type");
					}
					if (editType) {
						this.onclick = function () {
							__this__.editCell(this);
						}
					}
				});
				return this;

			},
			/**
			 * 设置指定单元格可编辑
			 * @param element
			 * @param editType
			 * @returns {EditTables}
			 */
			'editCell':function(element, editType) {
				var $element = $(element);
				editType = editType || $element.attr("edit-type");
				if (!editType) {
					//如果当前单元格没有指定，则查看当前列是否指定
					editType = element.parentNode.parentNode.rows[0].cells[element.cellIndex].getAttribute("edit-type");
				}

				switch (editType) {
					case "input-text":
						this.createTextBox(element, element.innerHTML);
						break;
					case "select":
						this.createDropDownList(element);
						break;
					default:
				}
				return this;
			},
			/**
			 * 为单元格创建可编辑输入框
			 * @param element
			 * @param value
			 * @returns {EditTables}
			 */
			'createTextBox':function(element, value) {
				var __this__ = this;
				var $element = $(element);
				//检查编辑状态，如果已经是编辑状态，跳过
				var editState = $element.attr("edit-state");
				if (editState != "true") {
					//设置文本框当前值
					if (!value) {
						value = element.getAttribute("Value");
					}
					//创建文本框
					var input=System.Html.tag('input',true,{'type':'text','EditTables':'editCell_TextBox','value':value});
					var $input = $(input);
					var textBox = $input[0];

					//设置文本框的失去焦点事件
					$input.on('blur',function(){
						__this__.canceleditCell(this.parentNode, this.value);
					});

					//textBox.onblur = function () {
					//	__this__.canceleditCell(this.parentNode, this.value);
					//};
					//向当前单元格添加文本框
					this.clearChild(element);
					$element.append($input);
					textBox.focus();
					textBox.select();

					//改变状态变量
					$element.attr('edit-state','true').parent().parent().attr('CurrentRow',element.parentNode.rowIndex);
				}
				return this;
			},
			/**
			 * 为单元格创建选择框
			 * @param element
			 * @param value
			 * @returns {EditTables}
			 */
			'createDropDownList':function(element, value) {
				var __this__ = this;
				var $element = $(element);
				//检查编辑状态，如果已经是编辑状态，跳过
				var editState = $element.attr("edit-state");
				var select,options=[];

				if (editState != "true") {
					//添加列表项
					var items = $element.attr("data-items");
					if (!items) {
						items = element.parentNode.parentNode.rows[0].cells[element.cellIndex].getAttribute("data-items");
					}

					if (items) {
						items = eval("[" + items + "]");
						System.each(items,function(){
							var option=System.Html.tag('option',{'type':'text','text':this.text,'value':this.value},this.text);
							options.push(option);


						});


					}

					//设置列表当前值
					if (!value) {
						value = $element.attr("value");
					}
					//创建下接框
					select=System.Html.tag('select',{'EditTables':'editCell_DropDownList','value':value},options);

					var $select = $(select);
					var downList = $select[0];
					//设置创建下接框的失去焦点事件
					$select.on('blur',function(){
						__this__.canceleditCell(this.parentNode, this.value, this.options[this.selectedIndex].text);
					}).focus();

					//向当前单元格添加创建下接框
					this.clearChild(element);
					$element.append($select);
					downList.focus();

					//记录状态的改变
					$element.attr('edit-state','true').parent().parent().attr('LastEditRow',element.parentNode.rowIndex);
				}
				return this;

			},
			/**
			 * 取消单元格编辑状态
			 * @param element
			 * @param value
			 * @param text
			 * @returns {EditTables}
			 */
			'canceleditCell':function(element, value, text) {
				var $element = $(element);
				$element.attr('value',value);
				$element.attr('edit-state','false');

				if (text) {
					element.innerHTML = text;
				} else {
					element.innerHTML = value;
				}

				//检查是否有公式计算
				this.checkexpression(element.parentNode);
				return this;
			},
			/**
			 * 清空指定对象的所有字节点
			 * @param element
			 * @returns {EditTables}
			 */
			'clearChild':function(element) {
				element.innerHTML = "";
				return this;
			},
			/**
			 * 提取指定行的数据，JSON格式
			 * @param row
			 * @returns {{}}
			 */
			'getRowData':function(row) {
				var rowData = {};
				var name;

				System.each(row.cells,function(j){
					name = row.parentNode.rows[0].cells[j].getAttribute("Name");
					if (name) {
						var value = this.getAttribute("Value");
						if (!value) {
							value = this.innerHTML;
						}

						rowData[name] = value;
					}
				});

				//alert("ProductName:" + rowData.ProductName);
				//或者这样：alert("ProductName:" + rowData["ProductName"]);
				return rowData;

			},
			/**
			 * 检查当前数据行中需要运行的字段
			 * @param row
			 * @param expn
			 * @returns {EditTables}
			 */
			'checkexpression':function(row,expn) {
				var __this__ = this;
				System.each(row.cells,function(j){
					expn = row.parentNode.rows[0].cells[j].getAttribute("expression");
					//如指定了公式则要求计算
					if (expn) {
						var result = __this__.expression(row, expn);
						var format = row.parentNode.rows[0].cells[j].getAttribute("Format");
						if (format) {
							//如指定了格式，进行字值格式化
							this.innerHTML = __this__.formatNumber(__this__.expression(row, expn), format);
						} else {
							this.innerHTML = __this__.expression(row, expn);
						}
					}
				});
				return this;

			},
			/**
			 * 计算需要运算的字段
			 * @param row
			 * @param expn
			 * @returns {Object}
			 */
			'expression':function(row, expn) {
				var rowData = this.getRowData(row);
				var name;
				//循环代值计算
				System.each(row.cells,function(j){
					name = row.parentNode.rows[0].cells[j].getAttribute("Name");
					if (name) {
						var reg = new RegExp(name, "i");
						expn = expn.replace(reg, rowData[name].replace(/\,/g, ""));
					}
				});

				return eval(expn);
			},
			/**
			 * 格式化数字显示方式
			 * 用法
			 * formatNumber(12345.999,'#,##0.00');
			 * formatNumber(12345.999,'#,##0.##');
			 * formatNumber(123,'000000');
			 * @param num
			 * @param pattern
			 * @returns {string}
			 * example:
			 formatNumber('','')=0
			 formatNumber(123456789012.129,null)=123456789012
			 formatNumber(null,null)=0
			 formatNumber(123456789012.129,'#,##0.00')=123,456,789,012.12
			 formatNumber(123456789012.129,'#,##0.##')=123,456,789,012.12
			 formatNumber(123456789012.129,'#0.00')=123,456,789,012.12
			 formatNumber(123456789012.129,'#0.##')=123,456,789,012.12
			 formatNumber(12.129,'0.00')=12.12
			 formatNumber(12.129,'0.##')=12.12
			 formatNumber(12,'00000')=00012
			 formatNumber(12,'#.##')=12
			 formatNumber(12,'#.00')=12.00
			 formatNumber(0,'#.##')=0
			 */
			'formatNumber':function(num, pattern) {
				var strarr = num ? num.toString().split('.') : ['0'];
				var fmtarr = pattern ? pattern.split('.') : [''];
				var retstr = '';

				// 整数部分
				var str = strarr[0];
				var fmt = fmtarr[0];
				var i = str.length - 1;
				var comma = false;
				for (var f = fmt.length - 1; f >= 0; f--) {
					switch (fmt.substr(f, 1)) {
						case '#':
							if (i >= 0) retstr = str.substr(i--, 1) + retstr;
							break;
						case '0':
							if (i >= 0) retstr = str.substr(i--, 1) + retstr;
							else retstr = '0' + retstr;
							break;
						case ',':
							comma = true;
							retstr = ',' + retstr;
							break;
					}
				}
				if (i >= 0) {
					if (comma) {
						var l = str.length;
						for (; i >= 0; i--) {
							retstr = str.substr(i, 1) + retstr;
							if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
						}
					}
					else retstr = str.substr(0, i + 1) + retstr;
				}

				retstr = retstr + '.';
				// 处理小数部分
				str = strarr.length > 1 ? strarr[1] : '';
				fmt = fmtarr.length > 1 ? fmtarr[1] : '';
				i = 0;
				for (var f = 0; f < fmt.length; f++) {
					switch (fmt.substr(f, 1)) {
						case '#':
							if (i < str.length) retstr += str.substr(i++, 1);
							break;
						case '0':
							if (i < str.length) retstr += str.substr(i++, 1);
							else retstr += '0';
							break;
					}
				}
				return retstr.replace(/^,+/, '').replace(/\.$/, '');
			},
			/**
			 * 添加行
			 * @param table
			 * @param index
			 * @returns {Node|*}
			 */
			'addRow':function(table, index) {
				var lastRow = table.rows[table.rows.length - 1];
				var newRow = lastRow.cloneNode(true);
				table.tBodies[0].appendChild(newRow);
				this.setRowCanEdit(newRow);
				return newRow;

			},
			/**
			 * 删除行
			 * @param table
			 * @param index
			 * @returns {EditTables}
			 */
			'deleteRow':function(table, index) {
				for (var i = table.rows.length - 1; i > 0; i--) {
					var chkOrder = table.rows[i].cells[0].firstChild;
					if (chkOrder) {
						if (chkOrder.type = "CHECKBOX") {
							if (chkOrder.checked) {
								//执行删除
								table.deleteRow(i);
							}
						}
					}
				}
				return this;
			},
			/**
			 * 提取表格的值,JSON格式
			 * @param table
			 * @returns {Array}
			 */
			'getTableData':function(table) {
				var __this__ =this;
				var tableData = [];
				alert("行数：" + table.rows.length);
				for (var i = 1; i < table.rows.length; i++) {
					tableData.push(__this__.getRowData(table.rows[i]));
				}

				return tableData;

			},
			'resize':function(){

			},
			/**
			 *
			 * @author lhh
			 * 产品介绍：析构方法
			 * 创建日期：2015-4-2
			 * 修改日期：2015-4-2
			 * 名称：destructor
			 * 功能：在注销EditTables对象时调用此方法
			 * 说明：
			 * 注意：
			 * @return  ()                      :
			 * Example：
			 */
			'destructor':function(){}
		});

	System['EditTables']=EditTables;

});

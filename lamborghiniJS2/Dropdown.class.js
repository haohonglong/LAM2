/**
 * @author: lhh
 * 产品介绍：
 * 创建日期：2017-7-2
 * 修改日期：2017-7-4
 * 名称： dropdownMenu
 * 功能：bootstrap下拉框选中所选的放入输入框
 * 说明：boot-dropdown-tag="input" 这个属性放到 显示内容的元素。
 * 注意：
 * @param   (Object)D            		  NULL :初始化数据
 * @param   (String)D.delimiter    NULL :分隔符
 * @param   (String)D.delimiter.text    NULL :显示内容，每个词之间分隔符 默认" , "
 * @param   (String)D.delimiter.input    NULL :传给后台id之间分隔符 默认","
 * @param   (String)D.select             NULL :下拉框的包裹层
 * @param   (String)D.text             NULL :显示在输入框的信息
 * @param   (String)D.list            NULL :
 * @param   (String)D.option            NULL :
 * @param   (String)D.event             NULL :触发下拉框的事件，默认时click
 * @return (void)
 *html_strure:
 <div boot-dropdown-tag="parent_1">
     <div class="dropdown" boot-dropdown-tag="select_1">
         <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
             <span boot-dropdown-tag="text"></span>
             <span class="caret"></span>
         </button>
         <input type="hidden" boot-dropdown-tag="input">
         <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" boot-dropdown-tag="list">
             <li data-id="1"><a href="#">北京</a></li>
             <li data-id="2"><a href="#">天津</a></li>
             <li data-id="3"><a href="#">上海</a></li>
             <li data-id="8"><a href="#">江苏</a></li>
         </ul>
     </div>
     <div class="dropdown" boot-dropdown-tag="select_2">
         <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
             <span boot-dropdown-tag="text"></span>
             <span class="caret"></span>
         </button>
         <input type="hidden" boot-dropdown-tag="input">
         <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" boot-dropdown-tag="list">
             <li data-id="1"><a href="#">北京</a></li>
             <li data-id="2"><a href="#">天津</a></li>
             <li data-id="3"><a href="#">上海</a></li>
             <li data-id="8"><a href="#">江苏</a></li>
         </ul>
     </div>
 </div>
 *
 */

window[GRN_LHH].run([window],function(window,undefined){
    'use strict';
    var System=this;
    System.is(System,'Browser','Dropdown');
    var __this__=null;

    var Dropdown = System.Browser.extend({
        'constructor': function(D) {
            var defaults={
                'delimiter':{
                    'text':' , ',
                    'input':','
                },
                'parent' : '#parent',
                'select' : '[boot-dropdown-tag="select"]',
                'text'  : '[boot-dropdown-tag="text"]',
                'input' : '[boot-dropdown-tag="input"]',
                'list': '[boot-dropdown-tag="list"]',
                'option': 'li',
                'event' : 'click'
            };
            D = $.isPlainObject(D) ? $.extend({},defaults,D) : defaults;
            this.D = D;
            this.$parent  = $(D.parent);
            this.$select  = $(D.select);
            this.$text   = this.$select.find(D.text);
            this.$input  = this.$select.find(D.input);
            this.$list = this.$select.find(D.list);
            this.delimiter = D.delimiter;
            this.contents = [];
            this.vals = [];
            this.ID = -1;
            this.guid = 0;
        },

        'event':function(callBack){
            var D = this.D;
            var __this__ = this;
            $(__this__.$list).closest(__this__.$select).off(D.event,D.option);
            $(__this__.$list).closest(__this__.$select).on(
                D.event,
                D.option,
                function(event){
                    var id = $(this).data().id;
                    __this__.event = event;
                    __this__.eventTarget = this;
                    __this__.ID = id;

                    if($.isFunction(callBack)){
                        callBack.call(this);
                    }else{
                        __this__.$text.text($(this).text());
                        __this__.$input.val(id);
                    }
                });

        },
        /**
         *
         * @param callBack  NULL :回调返回三参数:this (当前点击的li元素); $text(当前输入框) ;$input(input )
         */
        'run':function(callBack){
            if(this.D.event){
                this.event(callBack);
            }
            return this;

        },

        /**
         *
         * @param D
         * @param D.$text
         * @param D.$input
         */
        'add':function(D){
            if(!D){
                D = {};
            }

            var $text  = D.$text  || this.$text;
            var $input = D.$input || this.$input;
            var $eventTarget = $(this.eventTarget);
            var text = $.trim($eventTarget.text());
            var id = $.trim($eventTarget.data().id);
            var t_i = $.inArray(text, this.contents);
            var v_i = $.inArray(id, this.vals);
            var old_text,old_input;
            if(0 === this.guid){
                old_text = $.trim($text.text());
                old_input = $.trim($input.val());
                if(!System.empty(old_text)){this.contents.push(old_text);}
                if(!System.empty(old_input)){this.vals.push(old_input);}
            }
            this.guid++;

            if(-1 === t_i){
                this.contents.push(text);
            }else{
                this.contents.splice(t_i,1);
            }
            if(-1 === v_i){
                this.vals.push(id);
            }else{
                this.vals.splice(v_i,1);
            }

            $text.text(this.contents.join(this.delimiter.text));
            $input.val(this.vals.join(this.delimiter.input));


            return this;
        },
        'delOption':function(id){
            this.$list.find('[data-id="'+id+'"]').remove();
        },

        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Dropdown对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()						:
         * Example：
         */
        'destructor':function(){}
    });

    System['Dropdown']=Dropdown;

});
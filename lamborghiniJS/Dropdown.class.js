window[GRN_LHH].run([jQuery],function($,undefined){
    'use strict';
    var System=this;
    System.is(System,'Dom','Dropdown',System.classPath+'/base');
    var __this__=null;

    var Dropdown = System.Dom.extend({
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
        "constructor": function(D) {
            this.base();
            var defaults={
                "delimiter":{
                    "text":' , ',
                    "input":','
                },
                "parent" : '#parent',
                "select" : '[boot-dropdown-tag="select"]',
                "text"   : '[boot-dropdown-tag="text"]',
                "input"  : '[boot-dropdown-tag="input"]',
                "list"   : '[boot-dropdown-tag="list"]',
                "option" : 'li',
                "event"  : 'click'
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
        /**
         *
         * @param callBack
         */
        "event":function(callBack){
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
        "run":function(callBack){
            if(this.D.event){
                this.event(callBack);
            }
            return this;

        },

        /**
         *
         * @param D
         */
        "set":function(D){
            D = D || this;
            D.$text.html(this.contents.join(this.delimiter.text));
            D.$input.val(this.vals.join(this.delimiter.input));
        },

        /**
         *
          * @returns {Dropdown}
         */
        "add":function(){
            var $eventTarget,text,id,i,old_text,old_input;
            $eventTarget = $(this.eventTarget);
            text = $.trim($eventTarget.text());
            id = $.trim($eventTarget.data().id);
            i = $.inArray(id, this.vals);
            if(0 === this.guid){
                old_text = $.trim(this.$text.text());
                old_input = $.trim(this.$input.val());
                if(!System.empty(old_text)){this.contents.push(old_text);}
                if(!System.empty(old_input)){this.vals.push(old_input);}
            }
            this.guid++;

            if(-1 === i){
                this.contents.push(text);
                this.vals.push(id);
            }else{
                this.contents.splice(i,1);
                this.vals.splice(i,1);
            }

            this.set();
            return this;
        },
        /**
         * 移除已经添加过的内容及id
         * @param id
         * @returns {{}}
         */
        "remove":function(id){
            var i = $.inArray(id, this.vals);
            var option = null;
            if(i > -1){
                option={
                    "id"   : id,
                    "text" : this.contents[i]
                };
                this.vals.splice(i,1);
                this.contents.splice(i,1);
                this.set();
            }
            return option;
        },
        /**
         *
          * @param li
         * @returns {Dropdown}
         */
        "appendLi":function(li){
            this.$list.append(li);
            return this;
        },
        /**
         *
          * @param id
         * @returns {Dropdown}
         */
        "delOption":function(id){
            this.$list.find('[data-id="'+id+'"]').remove();
            return this;
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
        "destructor":function(){}
    });

    System['Dropdown']=Dropdown;

});
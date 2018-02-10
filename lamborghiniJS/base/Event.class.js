(function(IT,factory){
    'use strict';
    var System = IT['LAM_20150910123700_'];

    if(!System){
        return;
    }else{
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
        typeof define === 'function' && define.amd ? define(factory(System)) :
        (System['Event'] = factory(System));
    }

})(this,function(System){
    'use strict';
    System.is(System,'Browser','Event',System.classPath+'/base');
    var __this__=null;
    var Event = System.Browser.extend({
        constructor: function(e){
            this.base();
            __this__=this;
            /*--------------------------------------------------------------------------------------------------*/

            var _e  = null;
            this._e = _e =Event.fixEvt(e);
            var ie = (_e.stopPropagation == undefined);
            this.event = _e;
            this.type  = _e.type;
            this.timeStamp = new Date();

            this.altKey    = _e.altKey   || false;
            this.ctrlKey   = _e.ctrlKey  || false;
            this.shiftKey  = _e.shiftKey || false;
            this.metaKey   = _e.metaKey  || false;

            this.keyCode   = ie ? _e.keyCode : _e.which;

            // left:1, right:2, middle:4
            switch(_e.button){
                case 0:
                    this.button = 1;
                    break;
                case 1:
                    this.button = ie ? 1 : 4;
                    break;
                default:
                    this.button = _e.button;
                    break;
            }

            switch(_e && _e.keyCode){
                case Event.keyCode.ESCAPE:// 按 Esc
                    break;
                case 113:// 按 F2
                    break;
                case Event.keyCode.ENTER:// enter 键
                    _e.keyCode=9;
                    return false;
                    break;
                case Event.keyCode.TAB:// Tab 键

                    break;


            }

            this.clientX    = ie ? (_e.clientX + document.documentElement.scrollLeft - document.body.clientLeft) : _e.pageX;
            this.clientY    = ie ? (_e.clientY + document.documentElement.scrollTop  - document.body.clientTop ) : _e.pageY;
            this.offsetX    = ie ? _e.offsetX : _e.layerX;
            this.offsetY    = ie ? _e.offsetY : _e.layerY;
            this.srcElement = ie ? _e.srcElement : _e.target;

            this.fromElement= ie ? _e.fromElement :  ((this.type == "mouseover")? _e.relatedTarget : (this.type == "mouseout"  ? _e.target : undefined));

            this.toElement  = ie  ? _e.toElement   : ((this.type == "mouseout")  ? _e.relatedTarget : (this.type == "mouseover" ? _e.target : undefined));

        },
        '_className':'Event',
        '__constructor':function(){},
        'cancelBubble': function(){
            if(this._e.stopPropagation){
                this._e.stopPropagation();
            }else{
                this._e.cancelBubble = true;
            }
        },
        'getEventXY':function(){
            return {x:this.clientX, y:this.clientY};
        },
        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Event对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){

        }
    });


    /**
     *
     * @author lhh
     * 产品介绍：
     * 创建日期：2015-1-15
     * 修改日期：2017-11-2
     * 名称：Event.fixEvt
     * 功能：解决事件兼容问题
     * 说明：
     * 注意：
     * @param   (event)event 			NO NULL :
     * @return  {window.even}
     * Example：
     */
    Event.fixEvt=function(event){//解决事件兼容问题
        //event = event || window.event || arguments.callee.caller.arguments[0];
        event = event || window.event;
        var doc = document.documentElement, body = document.body;
        //解决mouseover与mouserout事件不停切换的问题（问题不是由冒泡产生的）
        if("mouseover" === event.type){
            event.relatedTarget = event.fromElement;
        }else if("mouseout" === event.type){
            event.relatedTarget = event.toElement;
        }
        //IE下没有下面的属性和方法，需要自定义下
        // Support: IE<9
        // Fix target property (#1925)
        if ( !event.target ) {
            event.target = event.srcElement || document;
            event.layerX = event.offsetX;
            event.layerY = event.offsetY;
            event.pageX  = event.clientX + (doc && doc.scrollLeft ||  body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY  = event.clientY + (doc && doc.scrollTop  ||  body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = event.metaKey || false;
            //停止事件冒泡方法
            event.stopPropagation = function(){event.cancelBubble=true;};
            //阻止事件的默认行为，例如click <a>后的跳转
            event.preventDefault  = function(){event.returnValue=false;};
        }
        // Support: Safari 6-8+
        // Target should not be a text node (#504, #13143)
        if ( event.target.nodeType === 3 ) {
            event.target = event.target.parentNode;
        }
        return event;
    };

    /**
     *
     * 创建日期：2014-12-22
     * 修改日期：2017-11-2
     * 功能:绑定事件的句柄
     * @param event
     */
    function addEventHandler(event){//哪个事件发生了？
        event=Event.fixEvt(event);
        var fns=this.fns[event.type],
            fn=function(){};
        for (var i= 0,len = fns.length;i < len;i++) {
            fn = fns[i];
            if (System.isset(fn) && System.isFunction(fn)){fn.call(this,event);}
        }
    }
    /**
     *
     * @author lhh
     * 产品介绍：
     * 创建日期：2014-12-22
     * 修改日期：2017-11-2
     * 名称：Event.addEvent
     * 功能：给dom节点绑定指定事件
     * 说明：
     * 注意：
     * @param   (Dom)dom 			NO NULL :dom节点对象
     * @param   (String)evt 		NO NULL :事件类型
     * @param   (Function)fn 		NO NULL :绑定事件对象的函数
     * Example：
     */
    function addEvent(dom,evt,fn){
        if(!System.isFunction(dom.addEventListener)){
            if('DOMMouseScroll' === evt){evt = 'mousewheel';}
        }
        if(dom.addEventListener){
            if(System.isset(window.opera) && System.isOpera(window.opera)){
                dom.addEventListener(evt,function(e){fn.call(this,Event.fixEvt(e));},false);
            }else{
                dom.addEventListener(evt,fn,false);
            }
        }else if(dom.attachEvent){
            dom.attachEvent("on"+evt,fn);
        }else{
            if(!System.isPlainObject(dom.fns)) dom.fns={};
            //检测有没有存储事件名的数组
            if(!System.isArray(dom.fns[evt])) {dom.fns[evt] = [];}
            var fns=dom.fns[evt];
            for(var i=0,len=fns.length;i < len; i++){
                if(fns[i].toString().trim() === fn.toString().trim()) return dom;//判断之前是否有添加过要添加的事件监听函数
            }
            //没添加就把函数保存到数组中
            fns.push(fn);
            fn.index=fns.length-1;
            if(System.isFunction(dom["on"+evt])){//检测是否已经注册过事件监听函数
                if(dom["on"+evt] !== addEventHandler){
                    fns.push(dom["on"+evt]);
                }
            }
            dom["on"+evt]=addEventHandler;
        }
        return dom;
    }

    /**
     * @author lhh
     * 产品介绍：
     * 创建日期：2014-12-22
     * 修改日期：2017-11-2
     * 名称：Event.unbind
     * 功能：解除绑定指定事件
     * 说明：
     * 注意：
     * @param dom
     * @param {String}evtype
     * @param {Function}fn
     * @returns {Dom}
     */
    function unbind(dom,evtype,fn){//删除事件监听
        if (dom.removeEventListener) {
            if(System.isset(window.opera) && System.isOpera(window.opera)){
                dom.removeEventListener(evtype,function(e){fn.call(this,Event.fixEvt(e));},false);
            }else{
                dom.removeEventListener(evtype,fn,false);
            }
        }else{
            var fns=dom.fns || {};
            fns=fns[evtype] || [];
            for (var i=0;i<fns.length;i++) {
                if (fns[i].toString().trim() === fn.toString().trim()) {
                    fns.removeAt(i);
                    break;
                }
            }
        }
        return dom;
    }
    Event.createEvent=function(){
        var evt = document.createEvent('Events');
        return evt;
    };
    /**
     * 自定义事件
     * 创建日期：2017-9-1
     * 修改日期：2018-1-4
     * @param event
     * @param params
     * @returns {Event}
     * @constructor
     */
    Event.CustomEvent=function(event, params){
        var defaults={
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        params = System.isPlainObject(params) ? System.merge({},[params,defaults]) : defaults;
        var evt = document.createEvent("CustomEvent");
        return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail),
            evt;
    };
    Event.CustomEvent.prototype = window.Event.prototype;
    if (!System.isset(window.CustomEvent)) {
        window.CustomEvent = Event.CustomEvent;
    }


    Event.bind=function(dom,evt,fn){//给某个对象添加多个事件监听函数
        return addEvent(dom,evt,fn);
    };
    Event.unbind =function(dom,evt,fn){//删除事件监听
        return unbind(dom,evt,fn);
    };
    /**
     *
     * @author lhh
     * 产品介绍：
     * 创建日期：2014-12-22
     * 修改日期：2017-11-1
     * 名称：Event.mousewheel
     * 功能：鼠标滚轮事件注册
     * 说明：dom 是滚动的范围区域
     * 注意：这个功能只能在鼠标滚动时返回滚动的方向,和滚轮滚动判断方向的值
     * @param   (Function)fn 		NO NULL :返回滚动方向和滚轮滚动的值
     * @returns {Function}
     * usage：Event.bind(dom,"DOMMouseScroll",Event.mousewheel(function(){}));
     */
    Event.mousewheel=function(fn){
        //鼠标滚轮事件处理函数
        var fnMouseWheel=function(e) {
            e = Event.fixEvt(e);
            var wheelDelta = e.wheelDelta || e.detail; //鼠标滚动值，可由此判断鼠标滚动方向
            if (wheelDelta === -120 || wheelDelta === 3 || wheelDelta < 0){
                fn.call(e,{'direction':'down','wheelDelta':wheelDelta});
            }else if (wheelDelta === 120 || wheelDelta === -3 || wheelDelta > 0){
                fn.call(e,{'direction':'up','wheelDelta':wheelDelta});
            }
        };
        return fnMouseWheel;
    };

    Event.keyCode= {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        F2: 113,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };

    return Event;
});




/**
 * 创建日期：2014-10-18
 * 修改日期：2017-3-9
 * 修改说明：添加partial属性可以指定某个区域可以拖到，不填默认拖到出入的dom
 *           添加this.arr_mouserDragValues属性可以存储鼠标拖动的距离集合
 *           在move方法中执行f_move这个回调方法传递一个参数，是时时返回每次拖拽时上下移动的数值
 *           2014-12-15
 *           添加了not_overflow方法用来限制拖拽时不能溢出限定范围外
 *           添加了this.limit属性用来限定拖拽范围，如果不设默认是拖拽的区域
 * 名称：Drag
 * 功能：1.自由拖拽
 *       2.鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
 *       (Object)   init
 * Example:
 *          getElementById('node'),{
 *                              //拖拽方向
 *                              (String)    'coord':'x'
 *                              //允许拖拽的区域
 *                              (dom_node)  'arear': getElementById('node')
 *                              }
 *      
 * 
 */


window[GRN_LHH].run([window],function(window,undefined){
    'use strict';
    var System=this;
    System.is(System,'Browser','Drag');
    System.is(System,'Event');

    var __this__=null;

    //事件兼容类方法
    var fixEvt=System.Event.fixEvt;
    //初始化限制范围左边和上边的溢出检测变量
    var getRealStyle=function(e,key){//（对象，属性名）获取当前的style元素里的css属性值
        return e.currentStyle? e.currentStyle[key] : document.defaultView.getComputedStyle(e,false)[key];
        //document.defaultView.getComputedStyle 这是w3c标准方法，取得元素的样式信息，因为有些样式是在外部css文件定义的，所以用element.style是取不到的 如果是IE,可以用 element.currentStyle["name"]
    };

    var set_postion=function(dom){
        var position = getRealStyle(dom,'position');
        if(!('absolute' === position || 'fixed' === position)){
            dom.style.position='absolute';
        }

    };
    var Drag = System.Browser.extend({
        constructor: function(dom,init) {
            __this__=this;
            if(!dom) return this;
            //初始化
            this.L=this.T=this.disX=this.disY=0;
            this.dom=dom;
            this.drag_=false;
            set_postion(this.dom);
            init = init || {};

            //记录鼠标拖动的距离集合
            this.obj_mouserDragValue  = {'x':0,'y':0};
            this.arr_mouserDragValues = [];
            this.init(init);

        },
        '_className':'Drag',
        '__constructor':function(){},
        'init':function(init){
            var __this__=this;
            if(!System.isEmptyObject(init)){
                this.arear      = init.arear        || null;
                this.coord      = init.coord        || null;
                this.noText     = init.noText       || null;
                this.sport      = init.sport        || null;
                this.f_start    = init.f_start      || null;
                this.f_end      = init.f_end        || null;
                this.f_move     = init.f_move       || null;
                this.partial    = init.partial      || this.dom;
                //是否存储拖拽时的坐标值，默认不存储
                this.isGetMouseDragValues = init.isGetMouseDragValues || false;
                //限定拖拽的范围
                this.limit       = init.limit        || this.dom;
                //限定一个范围内不让溢出,true 是溢出
                this.b_ovf       = init.b_ovf        || false;
            }

            this.partial.onmousedown=function(e){
                e = fixEvt(e);
                __this__.drag_=true;
                __this__.fnDown(e);

                if(__this__.noText){//拖动时不选择里面的文字
                    return false;
                }

            };
        },

        /**
         * 鼠标按下去的操作
         * @param e
         */
        'fnDown':function(e){
            var __this__=this;
            e = fixEvt(e);
            //保存鼠标点击下的xy坐标
            this.disX = e.clientX - this.dom.offsetLeft;
            this.disY = e.clientY - this.dom.offsetTop;
            //设置捕获范围
            if(this.dom.setCapture){//鼠标按下去的时候全局捕获，兼容非标准浏览器
                this.dom.setCapture();
            }else if(window.captureEvents){
                window.captureEvents(e.MOUSEMOVE | e.MOUSEUP);
            }
            e.stopPropagation();
            document.onmousemove=function(e){
                e = fixEvt(e);
                if(!__this__.drag_) return false;
                __this__.move(e);
            };
            document.onmouseup=function(e){
                e = fixEvt(e);
                __this__.fnUp(e);

            };
        },

        //当鼠标移动时做的操作
        'move':function(e){
            var __this__=this;
            e = fixEvt(e);
            var L,T;
            L = T = 0;
            L=this.L=e.clientX-this.disX;
            T=this.T=e.clientY-this.disY;
            this.obj_mouserDragValue={'x':L,'y':T};
            switch(this.coord){
                case 'x':
                    return this.move_level(e);
                    break;
                case 'y':
                    return this.move_vertical(e);
                    break;
                default://自由拖拽
                    this.free();
            }
            //时时返回每次按住不松开移动时x,y数值(返回的是数组)
            if(System.isString(this.f_move)){
                this.f_move.call(this,this.obj_mouserDragValue);
            }
            //存储记录鼠标拖动的距离集合(这个数组长度非常大,会消耗内存)
            if(this.isGetMouseDragValues){
                this.arr_mouserDragValues.push(this.obj_mouserDragValue);
            }
        },
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2015-9-2
         * 修改日期：2015-9-2
         * 名称：set_postion
         * 功能：手动设置坐标位置
         * 说明：
         * 注意：
         * @param   (int)x 			NO NULL :x坐标
         * @param   (int)y 			NO NULL :y坐标
         * @return  (voide)
         * Example：
         */
        'set_postion':function(x,y){
            this.L = x;
            this.T = y;
            this.not_overflow();
            this.dom.style.left = this.L+'px';
            this.dom.style.top  = this.T+'px';
        },
        //拖拽不要溢出到现在范围外
        'not_overflow':function(){
            var __this__=this;
            if(this.L < 0){
                this.L = 0;
            }else if(this.L > document.documentElement.clientWidth  - this.limit.offsetWidth){
                this.L   =    document.documentElement.clientWidth  - this.limit.offsetWidth;
            }

            if(this.T < 0){
                this.T = 0;
            }else if(this.T > document.documentElement.clientHeight - this.limit.offsetHeight){
                this.T   =    document.documentElement.clientHeight - this.limit.offsetHeight;
            }
            return this;
        },
        'free':function(){
            var __this__=this;
            if(!this.b_ovf){
                this.not_overflow();
            }

            this.dom.style.left = this.L+'px';
            this.dom.style.top  = this.T+'px';
            return this;
        },
        'move_level':function(){
            var __this__=this;
            if(!this.b_ovf){
                this.not_overflow();
            }
            __this__.dom.style.left = this.L+'px';
            return this;

        },
        'move_vertical':function(){
            var __this__=this;
            if(!this.b_ovf){
                this.not_overflow();
            }
            __this__.dom.style.top = this.T+'px';
            return this;
        },
        'fnUp':function(e){
            e = fixEvt(e);
            var __this__=this;
            __this__.drag_=false;

            //取消捕获范围
            //鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
            if(this.dom.releaseCapture){
                this.dom.releaseCapture();
            }else if(window.captureEvents){
                window.captureEvents(e.MOUSEMOVE|e.MOUSEUP);
            }

            document.onmousemove=null;
            document.onmouseup=null;

        },
        //只获取这一次的拖拽的值 返回一维数组
        'getCurrentMouserDragValue':function(){
            return this.obj_mouserDragValue;
        },
        //获取每次拖拽时上下移动的数值集合
        'getMouserDragValues':function(){
            return this.arr_mouserDragValues;
        },
        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Drag对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){}
    });

    System['Drag']=Drag;



});

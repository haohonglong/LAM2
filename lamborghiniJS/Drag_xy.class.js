
/**
 * 创建日期：2014-10-18
 * 修改日期：2014-10-22
 * 名称：Drag_xy
 * 功能：鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
         (Object)   init
 * Example:
            new window.System.Drag_xy(document.getElementById("first"),{
                                                       'coord':'y',
                                                       'that':F,
                                                       'window_h':window_h,
                                                       'arear':$sidebar[0],//
                                                       'sport':sport//运动对象
                                                     });
 *      
 * 
 */

window[GRN_LHH].run([window],function(window,undefined){
    'use strict';
    var System=this;
    System.is(System,'Drag','Drag_xy');
    var __this__=null;
    var fixEvt = System.Event.fixEvt;
    //是否到最后了
    var whetherToLast=function(coord,that){
            switch(coord){
                case 'x':
                    if(that.dom.width <= that.window_w+Math.abs(that.dom.offsetLeft)){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                case 'y':
                    if(that.dom.height <= that.window_h+Math.abs(that.dom.offsetTop)){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                default:

            }

        },
    //对横纵向判读：如果头部没东西了就把区域拉到开始位置，如果末尾没东西了就拉到最后一个的位置
        backTo=function(coord,that){
            switch(coord){
                case 'x':
                    if(that.dom.offsetLeft>0){
                        that.sport.Animate(that.dom,{
                            'left':0
                        },30);


                        that.dom.style.left=0;
                    }else if(whetherToLast('x',that)){
                        //如果容器的宽度小于屏幕的宽度就把left 的值为0
                        if(that.dom.width > that.window_w){
                            that.sport.Animate(that.dom,{
                                'left':-(that.dom.width-that.window_w)
                            },30);



                            that.dom.style.left=-(that.dom.width-that.window_w)+'px';
                        }else{
                            that.dom.style.left=0;
                            return false;
                        }



                    }
                    break;
                case 'y':
                    if(that.dom.offsetTop>0){
                        that.sport.Animate(that.dom,{
                            'top':0
                        },30);

                        that.dom.style.top=0;
                    }else if(whetherToLast('y',that)){
                        var window_h=that.window_h;
                        if(that.dom.height > window_h){
                            that.sport.Animate(that.dom,{
                                'top':-(that.dom.height-window_h)
                            },30);

                            that.dom.style.top=-(that.dom.height-window_h)+'px';
                        }else{
                            that.dom.style.top=0;
                            return false;
                        }

                    }
                    break;
                default:

            }

        };

    var Drag_xy = System.Drag.extend({
        constructor: function(dom,init){//实现鼠标拖动元素

            if(!dom  && !init.coord) return this;

            this.base(dom,init);
            __this__=this;

            if(init.that) this.X=init.that;
            if(init.window_w) this.window_w=init.window_w;
            if(init.window_h) this.window_h=init.window_h;
        },
        '_className':'Drag_xy',
        '__constructor':function(){},
        'fnDown':function(e){
            var __this__=this;
            e = fixEvt(e);
            this.disX = e.clientX - this.dom.offsetLeft;
            this.disY = e.clientY - this.dom.offsetTop;
            //设置捕获范围
            if(this.dom.setCapture){//鼠标按下去的时候全局捕获，兼容非标准浏览器
                this.dom.setCapture();
            }else if(window.captureEvents){
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            e.stopPropagation();

            document.onmousemove=function(e){
                __this__.move(e);
            };

            document.onmouseup=function(){
                if(__this__.dom.width){
                    backTo('x',__this__);
                }

                if(__this__.dom.height){
                    backTo('y',__this__);
                    //竖向拖的横向操作防止移除窗口时的位置出现回不去的问题
                    var X=__this__.X;
                    if(X.dom.width){
                        backTo('x',X);
                    }

                }
                __this__.fnUp();
            };
        },

        //垂直拖拽要做的事
        'move_vertical':function(e){
            var __this__=this;
            var X=this.X;
            X.dom.disX = e.clientX - X.dom.offsetLeft;
            document.onmousemove=function(e){
                var t=e.clientY-__this__.disY;
                __this__.dom.style.top = t+'px';
                var l=e.clientX-X.dom.disX;
                X.dom.style.left = l+'px';


                var mouseup=function(){
                    if(X.dom.width){
                        backTo('x',X);
                        X.dom.onmouseup=null;

                        //取消捕获范围
                        //鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
                        if(X.dom.releaseCapture){
                            X.dom.releaseCapture();
                        }else if(window.captureEvents){
                            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                        }


                    }

                    if(__this__.arear){
                        __this__.arear.onmouseup = null;
                    }

                    //取消捕获范围
                    //鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
                    if(__this__.arear && __this__.arear.releaseCapture){
                        __this__.arear.releaseCapture();
                    }else if(window.captureEvents){
                        window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                    }

                };

                if(__this__.arear){
                    __this__.arear.onmouseup = mouseup;
                }

                X.dom.onmouseup=mouseup;

            };
        },
        /**
         *
         * @author lhh
         * 产品介绍：析构方法
         * 创建日期：2015-4-2
         * 修改日期：2015-4-2
         * 名称：destructor
         * 功能：在注销Drag_xy对象时调用此方法
         * 说明：
         * 注意：
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){}
    });

    System['Drag_xy']=Drag_xy;



});






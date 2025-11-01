/**
 * 创建日期：2014-10-18
 * 修改日期：2024-1-1
 * 名称：Drag
 * 功能：拖拽功能类，支持自由拖拽、垂直/水平拖拽、边界限制等
 * 说明：完全兼容 IE6+ 浏览器，提供丰富的拖拽功能
 * 
 * 参数：
 * @param {HTMLElement} dom - 要拖拽的DOM元素
 * @param {Object} init - 配置选项
 * @param {HTMLElement} init.arear - 允许拖拽的区域
 * @param {string} init.coord - 拖拽方向 'x'|'y'|null(自由拖拽)
 * @param {boolean} init.noText - 拖动时是否禁止文字选择
 * @param {boolean} init.sport - 是否启用平滑运动
 * @param {Function} init.f_start - 拖拽开始回调
 * @param {Function} init.f_end - 拖拽结束回调
 * @param {Function} init.f_move - 拖拽移动回调
 * @param {HTMLElement} init.partial - 可拖拽的区域
 * @param {boolean} init.isGetMouseDragValues - 是否存储拖拽坐标值
 * @param {HTMLElement} init.limit - 拖拽范围限制元素
 * @param {boolean} init.b_ovf - 是否允许溢出边界
 * @param {Object} init.boundary - 自定义边界限制 {left, top, right, bottom}
 * 
 * Example:
 * 
 * // 自由拖拽
 * var drag1 = new Drag(document.getElementById('drag1'));
 * 
 * // 水平拖拽，限制在容器内
 * var drag2 = new Drag(document.getElementById('drag2'), {
 *     coord: 'x',
 *     limit: document.getElementById('container'),
 *     f_move: function(position) {
 *         console.log('当前位置:', position);
 *     }
 * });
 * 
 * // 垂直拖拽，不允许溢出
 * var drag3 = new Drag(document.getElementById('drag3'), {
 *     coord: 'y',
 *     b_ovf: false,
 *     f_start: function() {
 *         console.log('拖拽开始');
 *     },
 *     f_end: function() {
 *         console.log('拖拽结束');
 *     }
 * });
 */
(function(global, factory) {
    'use strict';

    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    var System = global['LAM_20150910123700_'];

    if (!System) {
        return;
    } else {
        var Drag = factory(System);
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = Drag :
        typeof define === 'function' && define.amd ? define(Drag) : System.Drag = Drag;
        System.export("lam.base.Drag", Drag);
    }

})(this, function(System) {
    'use strict';
    System.is(System, 'Browser', 'Drag', System.classPath + '/base');
    var Browser = System.require("lam.base.Browser");
    
    // 动态加载依赖
    System.import([
        '/Event.class',
        '/Css.class'
    ], System.classPath + '/base');

    // 事件兼容类方法
    var fixEvt = System.Event.fixEvt;

    var Drag = Browser.extend({
        /**
         * 构造函数
         * @param {HTMLElement} dom - 要拖拽的DOM元素
         * @param {Object} init - 配置选项
         */
        constructor: function(dom, init) {
            this.base();
            
            if (!dom) {
                console.error('Drag: DOM元素不能为空');
                return this;
            }
            
            // 初始化属性
            this.L = this.T = this.disX = this.disY = 0;
            this.dom = dom;
            this.drag_ = false;
            this._isDragging = false;
            
            // 记录鼠标拖动的距离集合
            this.obj_mouserDragValue = {'x': 0, 'y': 0};
            this.arr_mouserDragValues = [];
            
            // 初始化位置和配置
            this.init_postion();
            this.init(init || {});
        },

        '_className': 'Drag',

        /**
         * 初始化配置
         * @param {Object} init - 配置选项
         */
        'init': function(init) {
            var __this__ = this;
            
            // 设置配置项
            this.arear = init.arear || null;
            this.coord = init.coord || null;
            this.noText = init.noText || false;
            this.sport = init.sport || false;
            this.f_start = init.f_start || null;
            this.f_end = init.f_end || null;
            this.f_move = init.f_move || null;
            this.partial = init.partial || this.dom;
            this.isGetMouseDragValues = init.isGetMouseDragValues || false;
            this.limit = init.limit || this.dom;
            this.b_ovf = init.b_ovf || false;
            this.boundary = init.boundary || null;
            this.enabled = init.enabled !== false; // 默认启用
            
            // 绑定拖拽事件
            this._bindEvents();
        },

        /**
         * 绑定事件
         * @private
         */
        '_bindEvents': function() {
            var __this__ = this;
            
            // 清除旧事件
            this.partial.onmousedown = null;
            
            this.partial.onmousedown = function(e) {
                if (!__this__.enabled) return;
                
                e = fixEvt(e);
                __this__.drag_ = true;
                __this__._isDragging = true;
                __this__.fnDown(e);

                // 拖动时不选择文字
                if (__this__.noText) {
                    return false;
                }
            };
            
            // 支持触摸事件
            this.partial.ontouchstart = function(e) {
                if (!__this__.enabled) return;
                
                __this__.drag_ = true;
                __this__._isDragging = true;
                __this__.fnDown(e.touches[0]);
                
                if (__this__.noText) {
                    return false;
                }
            };
        },

        /**
         * 初始化 position
         */
        'init_postion': function() {
            var dom = this.dom;
            var position = System.Css.getComputedStyle(dom, 'position');
            
            if (position === 'static') {
                dom.style.position = 'absolute';
            }
            
            // 记录初始位置
            this.initialLeft = dom.offsetLeft;
            this.initialTop = dom.offsetTop;
        },

        /**
         * 鼠标按下事件处理
         * @param {Event} e - 事件对象
         */
        'fnDown': function(e) {
            var __this__ = this;
            e = fixEvt(e);
            
            // 保存鼠标点击位置
            this.disX = e.clientX - this.dom.offsetLeft;
            this.disY = e.clientY - this.dom.offsetTop;
            
            // 设置捕获范围 (IE 兼容)
            if (this.dom.setCapture) {
                this.dom.setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            
            // 阻止事件冒泡
            e.stopPropagation();
            
            // 绑定移动和抬起事件
            document.onmousemove = function(e) {
                e = fixEvt(e);
                if (!__this__.drag_) return false;
                __this__.move(e);
            };
            
            document.onmouseup = function(e) {
                e = fixEvt(e);
                __this__.fnUp(e);
            };
            
            // 触摸事件
            document.ontouchmove = function(e) {
                if (!__this__.drag_) return false;
                __this__.move(e.touches[0]);
                e.preventDefault();
            };
            
            document.ontouchend = function(e) {
                __this__.fnUp(e);
            };
            
            // 拖拽开始回调
            if (System.isFunction(this.f_start)) {
                this.f_start.call(this, e);
            }
        },

        /**
         * 鼠标移动事件处理
         * @param {Event} e - 事件对象
         */
        'move': function(e) {
            var __this__ = this;
            e = fixEvt(e);
            
            // 计算新位置
            var L = this.L = e.clientX - this.disX;
            var T = this.T = e.clientY - this.disY;
            
            this.obj_mouserDragValue = {'x': L, 'y': T};
            
            // 根据拖拽方向处理移动
            switch (this.coord) {
                case 'x':
                    this.move_level();
                    break;
                case 'y':
                    this.move_vertical();
                    break;
                default:
                    this.free();
            }
            
            // 移动回调
            if (System.isFunction(this.f_move)) {
                this.f_move.call(this, this.obj_mouserDragValue);
            }
            
            // 存储拖拽坐标记录
            if (this.isGetMouseDragValues) {
                this.arr_mouserDragValues.push({
                    x: L,
                    y: T,
                    timestamp: new Date().getTime()
                });
            }
        },

        /**
         * 自由拖拽
         */
        'free': function() {
            if (!this.b_ovf) {
                this._applyBoundary();
            }
            
            this.dom.style.left = this.L + 'px';
            this.dom.style.top = this.T + 'px';
        },

        /**
         * 水平拖拽
         */
        'move_level': function() {
            if (!this.b_ovf) {
                this._applyBoundary();
            }
            
            this.dom.style.left = this.L + 'px';
        },

        /**
         * 垂直拖拽
         */
        'move_vertical': function() {
            if (!this.b_ovf) {
                this._applyBoundary();
            }
            
            this.dom.style.top = this.T + 'px';
        },

        /**
         * 应用边界限制
         * @private
         */
        '_applyBoundary': function() {
            var boundary = this._getBoundary();
            
            // 水平边界
            if (this.L < boundary.left) {
                this.L = boundary.left;
            } else if (this.L > boundary.right) {
                this.L = boundary.right;
            }
            
            // 垂直边界
            if (this.T < boundary.top) {
                this.T = boundary.top;
            } else if (this.T > boundary.bottom) {
                this.T = boundary.bottom;
            }
        },

        /**
         * 获取边界范围
         * @returns {Object} 边界对象
         * @private
         */
        '_getBoundary': function() {
            if (this.boundary) {
                return this.boundary;
            }
            
            var limit = this.limit;
            return {
                left: 0,
                top: 0,
                right: document.documentElement.clientWidth - limit.offsetWidth,
                bottom: document.documentElement.clientHeight - limit.offsetHeight
            };
        },

        /**
         * 鼠标抬起事件处理
         * @param {Event} e - 事件对象
         */
        'fnUp': function(e) {
            var __this__ = this;
            
            this.drag_ = false;
            this._isDragging = false;
            
            // 取消捕获范围
            if (this.dom.releaseCapture) {
                this.dom.releaseCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            
            // 清除事件
            document.onmousemove = null;
            document.onmouseup = null;
            document.ontouchmove = null;
            document.ontouchend = null;
            
            // 拖拽结束回调
            if (System.isFunction(this.f_end)) {
                this.f_end.call(this, e);
            }
        },

        /**
         * 设置位置
         * @param {number} x - X坐标
         * @param {number} y - Y坐标
         */
        'set_postion': function(x, y) {
            this.L = x;
            this.T = y;
            
            if (!this.b_ovf) {
                this._applyBoundary();
            }
            
            this.dom.style.left = this.L + 'px';
            this.dom.style.top = this.T + 'px';
        },

        /**
         * 重置到初始位置
         */
        'reset': function() {
            this.set_postion(this.initialLeft, this.initialTop);
        },

        /**
         * 启用拖拽
         */
        'enable': function() {
            this.enabled = true;
        },

        /**
         * 禁用拖拽
         */
        'disable': function() {
            this.enabled = false;
            this.drag_ = false;
            this._isDragging = false;
        },

        /**
         * 获取当前拖拽位置
         * @returns {Object} 位置对象 {x, y}
         */
        'getCurrentMouserDragValue': function() {
            return this.obj_mouserDragValue;
        },

        /**
         * 获取拖拽历史记录
         * @returns {Array} 拖拽记录数组
         */
        'getMouserDragValues': function() {
            return this.arr_mouserDragValues;
        },

        /**
         * 清除拖拽记录
         */
        'clearDragHistory': function() {
            this.arr_mouserDragValues = [];
        },

        /**
         * 是否正在拖拽
         * @returns {boolean}
         */
        'isDragging': function() {
            return this._isDragging;
        },

        /**
         * 设置边界限制
         * @param {Object} boundary - 边界对象 {left, top, right, bottom}
         */
        'setBoundary': function(boundary) {
            this.boundary = boundary;
        },

        /**
         * 获取当前位置
         * @returns {Object} 位置对象 {left, top}
         */
        'getPosition': function() {
            return {
                left: this.L,
                top: this.T
            };
        },

        /**
         * 析构方法
         */
        'destructor': function() {
            // 清理事件
            this.partial.onmousedown = null;
            this.partial.ontouchstart = null;
            document.onmousemove = null;
            document.onmouseup = null;
            document.ontouchmove = null;
            document.ontouchend = null;
            
            // 清理属性
            this.dom = null;
            this.partial = null;
            this.limit = null;
            this.arear = null;
            this.arr_mouserDragValues = null;
        }
    });

    return Drag;
});
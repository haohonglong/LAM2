/**
 * 围棋游戏 - 完整修复版本
 */
(function(global, factory) {
    'use strict';

    global = typeof globalThis !== 'undefined' ? globalThis : global || self;
    var System = global['LAM_20150910123700_'];

    if (!System) {
        return;
    } else {
        var GoGame = factory(System);
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = GoGame :
        typeof define === 'function' && define.amd ? define(GoGame) : System['Html5']['GoGame'] = GoGame;
        System.export("lam.GoGame", GoGame);
    }

})(this, function(System) {
    'use strict';
    System.is(System.Html5, 'Shape', 'GoGame', System.classPath + '/base');
    var Shape = System.require("lam.base.Shape");
    
    var GoGame = Shape.extend({
        /**
         *
         * @author: lhh
         * 产品介绍：围棋游戏主类
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： constructor
         * 功能：初始化围棋游戏实例
         * 说明：构造函数，设置棋盘大小并初始化游戏
         * 注意：需要传入DOM元素和棋盘大小参数
         * @param 	(HTMLElement)dom         	  NO NULL : 画布DOM元素
         * @param 	(Number)size                  NO NULL : 棋盘大小
         * Example：
         */
        constructor: function(dom, size) {
            this.base(dom);
            
            this.boardSize = Math.max(9, Math.min(19, parseInt(size) || 19));
            this.gameMode = 'human';
            this.aiPlayer = 2;
            this.aiLevel = 'medium';
            this.initGame();
            this.bindEvents();
        },

        '_className': 'GoGame',

        /**
         *
         * @author: lhh
         * 产品介绍：围棋游戏初始化
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： initGame
         * 功能：初始化游戏状态和棋盘
         * 说明：设置画布尺寸、游戏状态变量、初始化棋盘数据
         * 注意：包含移动端适配和AI自动开始逻辑
         * Example：
         */
        'initGame': function() {
            console.log("初始化围棋游戏，棋盘大小:", this.boardSize);
            
            // 移动端适配
            this.isMobile = this.detectMobile();
            this.padding = this.isMobile ? 20 : 25;
            
            // 动态调整格子大小
            const screenWidth = window.innerWidth;
            if (this.isMobile) {
                this.gridSize = Math.max(20, Math.min(35, Math.floor((screenWidth - 80) / this.boardSize)));
            } else {
                this.gridSize = this.boardSize === 9 ? 40 : this.boardSize === 13 ? 35 : 30;
            }
            
            this.stoneRadius = Math.floor(this.gridSize * 0.45);
            
            // 计算画布尺寸
            this.boardWidth = (this.boardSize - 1) * this.gridSize;
            this.boardHeight = (this.boardSize - 1) * this.gridSize;
            this.canvasWidth = this.boardWidth + this.padding * 2;
            this.canvasHeight = this.boardHeight + this.padding * 2;
            
            console.log("画布尺寸:", this.canvasWidth, "x", this.canvasHeight);
            
            // 设置画布尺寸
            this.theCanvas.width = this.canvasWidth;
            this.theCanvas.height = this.canvasHeight;
            this.theCanvas.style.width = this.canvasWidth + 'px';
            this.theCanvas.style.height = this.canvasHeight + 'px';
            this.theCanvas.style.touchAction = 'none';
            
            // 游戏状态
            this.board = [];
            this.currentPlayer = 1;
            this.gameOver = false;
            this.moveHistory = [];
            this.capturedStones = { black: 0, white: 0 };
            this.lastMove = null;
            this.koPoint = null;
            this.passes = 0;
            this.touchStartPos = null;
            this.hoverPos = null;
            this.isProcessingClick = false;
            
            this.initBoard();
            this.drawBoard();
            
            // 如果是AI先手，自动开始
            if (this.gameMode === 'ai' && this.aiPlayer === 1) {
                console.log("AI先手，开始思考...");
                System.wait(() => {
                    this.makeAIMove();
                }, 800);
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：移动端检测
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： detectMobile
         * 功能：检测是否为移动设备
         * 说明：通过用户代理和屏幕宽度判断
         * 注意：返回布尔值，true表示移动设备
         * @return 	(Boolean)         	  是否为移动设备
         * Example：
         */
        'detectMobile': function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：设置游戏模式
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： setGameMode
         * 功能：设置游戏模式（双人对战或人机对战）
         * 说明：设置游戏模式并触发AI思考
         * 注意：如果设置为AI模式且轮到AI，会自动开始AI思考
         * @param 	(String)mode         	  NO NULL : 游戏模式 'human' 或 'ai'
         * Example：
         */
        'setGameMode': function(mode) {
            console.log("设置游戏模式:", mode);
            this.gameMode = mode;
            if (mode === 'ai' && this.currentPlayer === this.aiPlayer && !this.gameOver) {
                System.wait(() => {
                    this.makeAIMove();
                }, 500);
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：设置AI玩家
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： setAIPlayer
         * 功能：设置AI执子颜色
         * 说明：设置AI玩家编号（1为黑棋，2为白棋）
         * 注意：设置后会立即生效
         * @param 	(Number)player         	  NO NULL : AI玩家编号
         * Example：
         */
        'setAIPlayer': function(player) {
            console.log("设置AI玩家:", player);
            this.aiPlayer = player;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：设置AI难度
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： setAILevel
         * 功能：设置AI难度级别
         * 说明：设置AI的思考难度
         * 注意：当前版本仅支持基础难度
         * @param 	(String)level         	  NO NULL : 难度级别
         * Example：
         */
        'setAILevel': function(level) {
            console.log("设置AI难度:", level);
            this.aiLevel = level;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：初始化棋盘数据
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： initBoard
         * 功能：初始化棋盘二维数组
         * 说明：创建指定大小的二维数组并初始化为0（空位）
         * 注意：棋盘坐标从0开始，0表示空位，1表示黑棋，2表示白棋
         * Example：
         */
        'initBoard': function() {
            console.log("初始化棋盘");
            this.board = [];
            for (let i = 0; i < this.boardSize; i++) {
                this.board[i] = [];
                for (let j = 0; j < this.boardSize; j++) {
                    this.board[i][j] = 0;
                }
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：绘制棋盘
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： drawBoard
         * 功能：绘制完整的棋盘界面
         * 说明：包括棋盘背景、网格线、星位、棋子和高亮效果
         * 注意：每次游戏状态变化后需要调用此方法重绘
         * Example：
         */
        'drawBoard': function() {
            const ctx = this.theCanvas.getContext('2d');
            
            // 清空画布
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            
            // 绘制棋盘背景
            ctx.fillStyle = '#DCB35C';
            ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            
            // 绘制网格线
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = this.isMobile ? 1.5 : 1;
            
            for (let i = 0; i < this.boardSize; i++) {
                // 竖线
                ctx.beginPath();
                ctx.moveTo(this.padding + i * this.gridSize, this.padding);
                ctx.lineTo(this.padding + i * this.gridSize, this.padding + this.boardHeight);
                ctx.stroke();
                
                // 横线
                ctx.beginPath();
                ctx.moveTo(this.padding, this.padding + i * this.gridSize);
                ctx.lineTo(this.padding + this.boardWidth, this.padding + i * this.gridSize);
                ctx.stroke();
            }
            
            // 绘制星位
            this.drawStarPoints(ctx);
            
            // 绘制棋子
            this.drawStones(ctx);
            
            // 高亮最后一步
            if (this.lastMove) {
                this.highlightLastMove(ctx);
            }
            
            // 绘制悬停效果
            if (!this.isMobile && this.hoverPos) {
                this.drawHoverEffect(ctx);
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：绘制星位
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： drawStarPoints
         * 功能：在棋盘上绘制星位标记
         * 说明：根据棋盘大小绘制相应的星位点
         * 注意：不同棋盘大小有不同的星位布局
         * @param 	(CanvasRenderingContext2D)ctx         	  NO NULL : 画布上下文
         * Example：
         */
        'drawStarPoints': function(ctx) {
            const points = this.getStarPoints();
            ctx.fillStyle = '#000000';
            const starSize = this.isMobile ? 4 : 3;
            
            points.forEach(point => {
                const x = this.padding + point[0] * this.gridSize;
                const y = this.padding + point[1] * this.gridSize;
                
                ctx.beginPath();
                ctx.arc(x, y, starSize, 0, Math.PI * 2);
                ctx.fill();
            });
        },

        /**
         *
         * @author: lhh
         * 产品介绍：获取星位坐标
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getStarPoints
         * 功能：根据棋盘大小返回星位坐标数组
         * 说明：支持9路、13路、19路棋盘的标准星位布局
         * 注意：返回的坐标是棋盘坐标，不是像素坐标
         * @return 	(Array)         	  星位坐标数组
         * Example：
         */
        'getStarPoints': function() {
            switch (this.boardSize) {
                case 9:
                    return [[2,2], [2,6], [6,2], [6,6], [4,4]];
                case 13:
                    return [[3,3], [3,9], [6,6], [9,3], [9,9]];
                case 19:
                    return [
                        [3,3], [3,9], [3,15],
                        [9,3], [9,9], [9,15],
                        [15,3], [15,9], [15,15]
                    ];
                default:
                    return [];
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：绘制所有棋子
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： drawStones
         * 功能：在棋盘上绘制所有已落的棋子
         * 说明：遍历棋盘数组，为每个非空位置绘制相应颜色的棋子
         * 注意：使用渐变效果增强棋子立体感
         * @param 	(CanvasRenderingContext2D)ctx         	  NO NULL : 画布上下文
         * Example：
         */
        'drawStones': function(ctx) {
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] !== 0) {
                        this.drawStone(ctx, i, j, this.board[i][j] === 1);
                    }
                }
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：绘制单个棋子
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： drawStone
         * 功能：在指定位置绘制一个棋子
         * 说明：使用径向渐变创建立体效果，包含边框
         * 注意：黑白棋使用不同的渐变颜色
         * @param 	(CanvasRenderingContext2D)ctx         	  NO NULL : 画布上下文
         * @param 	(Number)i                  NO NULL : 棋盘横坐标
         * @param 	(Number)j                  NO NULL : 棋盘纵坐标
         * @param 	(Boolean)isBlack           NO NULL : 是否为黑棋
         * Example：
         */
        'drawStone': function(ctx, i, j, isBlack) {
            const x = this.padding + i * this.gridSize;
            const y = this.padding + j * this.gridSize;
            
            // 创建渐变
            const gradient = ctx.createRadialGradient(
                x - 3, y - 3, 1,
                x, y, this.stoneRadius
            );
            
            if (isBlack) {
                gradient.addColorStop(0, '#666666');
                gradient.addColorStop(0.7, '#333333');
                gradient.addColorStop(1, '#000000');
            } else {
                gradient.addColorStop(0, '#ffffff');
                gradient.addColorStop(0.6, '#f8f8f8');
                gradient.addColorStop(1, '#e8e8e8');
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, this.stoneRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // 边框
            ctx.strokeStyle = isBlack ? '#000000' : '#888888';
            ctx.lineWidth = this.isMobile ? 1.5 : 1;
            ctx.stroke();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：高亮最后一步
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： highlightLastMove
         * 功能：在最后落子的位置绘制红色圆圈标记
         * 说明：使用红色圆圈标记上一步落子位置
         * 注意：只在有最后一步记录时绘制
         * @param 	(CanvasRenderingContext2D)ctx         	  NO NULL : 画布上下文
         * Example：
         */
        'highlightLastMove': function(ctx) {
            const x = this.padding + this.lastMove.i * this.gridSize;
            const y = this.padding + this.lastMove.j * this.gridSize;
            
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = this.isMobile ? 3 : 2;
            ctx.beginPath();
            ctx.arc(x, y, this.isMobile ? 5 : 4, 0, Math.PI * 2);
            ctx.stroke();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：绘制悬停效果
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： drawHoverEffect
         * 功能：在鼠标悬停位置绘制虚线圆圈
         * 说明：显示当前可落子位置的预览效果
         * 注意：只在非移动端且位置有效时绘制
         * @param 	(CanvasRenderingContext2D)ctx         	  NO NULL : 画布上下文
         * Example：
         */
        'drawHoverEffect': function(ctx) {
            if (this.hoverPos && this.isValidPosition(this.hoverPos.i, this.hoverPos.j) && 
                this.board[this.hoverPos.i][this.hoverPos.j] === 0) {
                
                const x = this.padding + this.hoverPos.i * this.gridSize;
                const y = this.padding + this.hoverPos.j * this.gridSize;
                
                ctx.strokeStyle = this.currentPlayer === 1 ? '#000000' : '#666666';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.arc(x, y, this.stoneRadius * 0.7, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：处理棋盘点击
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： handleBoardClick
         * 功能：处理棋盘上的点击事件
         * 说明：将点击坐标转换为棋盘坐标并尝试落子
         * 注意：包含防重复点击处理
         * @param 	(Number)clientX         	  NO NULL : 点击的X坐标
         * @param 	(Number)clientY         	  NO NULL : 点击的Y坐标
         * Example：
         */
        'handleBoardClick': function(clientX, clientY) {
            if (this.isProcessingClick) {
                console.log("正在处理点击，忽略重复事件");
                return;
            }
            
            this.isProcessingClick = true;
            
            const rect = this.theCanvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            console.log("点击坐标:", clientX, clientY, "转换为:", x, y);
            
            // 计算格子坐标
            const i = Math.round((x - this.padding) / this.gridSize);
            const j = Math.round((y - this.padding) / this.gridSize);
            
            console.log("计算出的格子坐标:", i, j);
            
            if (this.isValidPosition(i, j)) {
                console.log("坐标有效，尝试落子");
                this.placeStone(i, j);
            } else {
                console.log("坐标无效，忽略点击");
            }
            
            System.wait(() => {
                this.isProcessingClick = false;
            }, 100);
        },

        /**
         *
         * @author: lhh
         * 产品介绍：处理触摸开始
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： handleTouchStart
         * 功能：记录触摸开始的位置和时间
         * 说明：用于区分点击和滑动操作
         * 注意：阻止事件冒泡和默认行为
         * @param 	(TouchEvent)event         	  NO NULL : 触摸事件
         * Example：
         */
        'handleTouchStart': function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            const touch = event.touches[0];
            this.touchStartPos = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };
        },

        /**
         *
         * @author: lhh
         * 产品介绍：处理触摸移动
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： handleTouchMove
         * 功能：处理触摸移动事件
         * 说明：阻止默认行为，不处理具体移动逻辑
         * 注意：主要用于阻止页面滚动
         * @param 	(TouchEvent)event         	  NO NULL : 触摸事件
         * Example：
         */
        'handleTouchMove': function(event) {
            event.preventDefault();
            event.stopPropagation();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：处理触摸结束
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： handleTouchEnd
         * 功能：处理触摸结束事件，判断是否为点击
         * 说明：根据触摸时长和移动距离判断是否为有效点击
         * 注意：短时间小距离的触摸被视为点击
         * @param 	(TouchEvent)event         	  NO NULL : 触摸事件
         * Example：
         */
        'handleTouchEnd': function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (!this.touchStartPos) return;
            
            const touch = event.changedTouches[0];
            const endTime = Date.now();
            const duration = endTime - this.touchStartPos.time;
            
            const dx = touch.clientX - this.touchStartPos.x;
            const dy = touch.clientY - this.touchStartPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (duration < 1000 && distance < 30) {
                this.handleBoardClick(touch.clientX, touch.clientY);
            }
            
            this.touchStartPos = null;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：处理鼠标点击
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： handleMouseClick
         * 功能：处理鼠标点击事件
         * 说明：包装鼠标点击事件，调用棋盘点击处理
         * 注意：阻止事件冒泡和默认行为
         * @param 	(MouseEvent)event         	  NO NULL : 鼠标事件
         * Example：
         */
        'handleMouseClick': function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log("鼠标点击事件");
            this.handleBoardClick(event.clientX, event.clientY);
        },

        /**
         *
         * @author: lhh
         * 产品介绍：更新悬停位置
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： updateHoverPosition
         * 功能：根据鼠标位置更新悬停效果
         * 说明：将鼠标位置转换为棋盘坐标并更新悬停显示
         * 注意：只在非移动端有效
         * @param 	(Number)clientX         	  NO NULL : 鼠标X坐标
         * @param 	(Number)clientY         	  NO NULL : 鼠标Y坐标
         * Example：
         */
        'updateHoverPosition': function(clientX, clientY) {
            if (this.isMobile) return;
            
            const rect = this.theCanvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            const i = Math.round((x - this.padding) / this.gridSize);
            const j = Math.round((y - this.padding) / this.gridSize);
            
            if (this.isValidPosition(i, j) && this.board[i][j] === 0) {
                if (!this.hoverPos || this.hoverPos.i !== i || this.hoverPos.j !== j) {
                    this.hoverPos = { i, j };
                    this.drawBoard();
                }
            } else if (this.hoverPos) {
                this.hoverPos = null;
                this.drawBoard();
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：落子处理
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： placeStone
         * 功能：在指定位置落子并处理游戏逻辑
         * 说明：包含合法性检查、提子处理、劫争判断等
         * 注意：包含完整的围棋规则实现
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Boolean)         	  是否成功落子
         * Example：
         */
        'placeStone': function(i, j) {
            console.log("尝试落子: 坐标(", i, ",", j, "), 当前玩家:", this.currentPlayer);
            console.log("该位置状态:", this.board[i][j] === 0 ? "空" : "有棋子");
            
            if (this.gameOver) {
                this.showMessage("游戏已结束");
                return false;
            }

            if (this.gameMode === 'ai' && this.currentPlayer === this.aiPlayer) {
                this.showMessage("现在是AI思考时间");
                return false;
            }

            if (!this.isValidPosition(i, j)) {
                console.log("无效位置:", i, j);
                this.showMessage("无效位置");
                return false;
            }

            if (this.board[i][j] !== 0) {
                console.log("位置已有棋子:", i, j, "棋子类型:", this.board[i][j]);
                this.showMessage("该位置已有棋子");
                return false;
            }

            if (this.isKo(i, j)) {
                this.showMessage("劫争，不能立即提回");
                return false;
            }

            // 临时落子检查
            this.board[i][j] = this.currentPlayer;
            const captured = this.findCapturedStones(i, j);
            const hasLiberty = this.hasLiberty(i, j);
            
            console.log("检查结果 - 气:", hasLiberty, "提子:", captured.length);
            
            if (!hasLiberty && captured.length === 0) {
                this.board[i][j] = 0;
                this.showMessage("自杀着法不允许");
                return false;
            }

            if (captured.length > 0) {
                console.log("提子数量:", captured.length);
                this.removeStones(captured);
            }

            this.lastMove = { i, j, player: this.currentPlayer, captured };
            this.moveHistory.push(this.lastMove);
            this.passes = 0;

            this.updateKoPoint(captured);
            this.hoverPos = null;
            this.drawBoard();
            
            console.log("落子成功，切换玩家");
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

            if (this.gameMode === 'ai' && !this.gameOver && this.currentPlayer === this.aiPlayer) {
                console.log("轮到AI思考");
                System.wait(() => {
                    this.makeAIMove();
                }, 600);
            }
            
            return true;
        },

       /**
         *
         * @author: lhh
         * 产品介绍：AI落子决策
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： makeAIMove
         * 功能：AI根据当前局面选择落子位置
         * 说明：使用智能评估函数选择最佳落子位置
         * 注意：包含多种难度级别和围棋策略
         * Example：
         */
        'makeAIMove': function() {
            if (this.gameOver || this.currentPlayer !== this.aiPlayer || this.aiThinking) {
                console.log("AI不满足移动条件");
                return;
            }
            
            this.aiThinking = true;
            console.log("AI开始思考，难度:", this.aiLevel);
            
            const moves = this.getAllValidMoves();
            console.log("AI找到合法着法:", moves.length);
            
            if (moves.length === 0) {
                console.log("AI选择虚着");
                this.aiThinking = false;
                this.pass();
                return;
            }
            
            let bestMove;
            switch (this.aiLevel) {
                case 'easy':
                    bestMove = this.getEasyAIMove(moves);
                    break;
                case 'medium':
                    bestMove = this.getMediumAIMove(moves);
                    break;
                case 'hard':
                    bestMove = this.getHardAIMove(moves);
                    break;
                default:
                    bestMove = this.getMediumAIMove(moves);
            }
            
            console.log("AI选择:", bestMove);
            
            System.wait(() => {
                if (bestMove) {
                    this.placeStone(bestMove.i, bestMove.j);
                }
                this.aiThinking = false;
            }, this.getAIThinkingTime());
        },

        /**
         *
         * @author: lhh
         * 产品介绍：简单AI决策
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getEasyAIMove
         * 功能：简单难度AI随机选择合法移动
         * 说明：从所有合法移动中随机选择一个
         * 注意：适合初学者练习
         * @param 	(Array)moves         	  NO NULL : 合法移动数组
         * @return 	(Object)         	  选择的移动位置
         * Example：
         */
        'getEasyAIMove': function(moves) {
            const randomIndex = Math.floor(Math.random() * moves.length);
            return moves[randomIndex];
        },

        /**
         *
         * @author: lhh
         * 产品介绍：中等AI决策
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getMediumAIMove
         * 功能：中等难度AI使用基础策略选择移动
         * 说明：考虑位置价值、攻击和防御
         * 注意：平衡进攻和防守
         * @param 	(Array)moves         	  NO NULL : 合法移动数组
         * @return 	(Object)         	  选择的移动位置
         * Example：
         */
        'getMediumAIMove': function(moves) {
            let bestMove = null;
            let bestScore = -Infinity;
            
            for (const move of moves) {
                let score = this.evaluateMove(move);
                
                // 添加随机性避免模式化
                score += Math.random() * 15;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            
            return bestMove;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：困难AI决策
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getHardAIMove
         * 功能：困难难度AI使用高级策略选择移动
         * 说明：综合考虑多种围棋战术要素
         * 注意：模拟专业棋手的思考方式
         * @param 	(Array)moves         	  NO NULL : 合法移动数组
         * @return 	(Object)         	  选择的移动位置
         * Example：
         */
        'getHardAIMove': function(moves) {
            let bestMove = null;
            let bestScore = -Infinity;
            
            for (const move of moves) {
                let score = this.evaluateMove(move);
                
                // 高级策略评估
                score += this.evaluateStrategicPosition(move);
                score += this.evaluateCapturePotential(move);
                score += this.evaluateDefense(move);
                score += this.evaluateInfluence(move);
                
                // 减少随机性，增加确定性
                score += Math.random() * 5;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            
            return bestMove;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：移动基础评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateMove
         * 功能：评估移动的基础得分
         * 说明：考虑位置价值、气数和连接性
         * 注意：这是所有难度级别的核心评估函数
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  评估得分
         * Example：
         */
        'evaluateMove': function(move) {
            let score = 0;
            const centerI = Math.floor(this.boardSize / 2);
            const centerJ = Math.floor(this.boardSize / 2);
            
            // 1. 中心位置偏好（开局阶段更重要）
            const distanceFromCenter = Math.abs(move.i - centerI) + Math.abs(move.j - centerJ);
            score += (this.boardSize - distanceFromCenter) * 3;
            
            // 2. 边角价值（根据棋盘阶段调整）
            const isCorner = (move.i === 0 || move.i === this.boardSize - 1) && 
                            (move.j === 0 || move.j === this.boardSize - 1);
            const isEdge = (move.i === 0 || move.i === this.boardSize - 1 || 
                        move.j === 0 || move.j === this.boardSize - 1);
            
            if (isCorner) {
                score += 25; // 角部价值
            } else if (isEdge) {
                score += 15; // 边部价值
            }
            
            // 3. 气数评估
            score += this.evaluateLiberty(move) * 8;
            
            // 4. 连接现有棋子的能力
            score += this.evaluateConnection(move) * 12;
            
            // 5. 攻击对方棋子的潜力
            score += this.evaluateAttack(move) * 10;
            
            return score;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：气数评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateLiberty
         * 功能：评估落子后的气数情况
         * 说明：计算移动后该位置和周围的气数
         * 注意：气数越多，棋子越安全
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  气数得分
         * Example：
         */
        'evaluateLiberty': function(move) {
            let libertyScore = 0;
            
            // 临时放置棋子
            this.board[move.i][move.j] = this.currentPlayer;
            
            // 检查新棋子的气
            const liberties = this.countLiberties(move.i, move.j);
            libertyScore += liberties * 2;
            
            // 检查是否减少对方的气
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    const opponentLiberties = this.countLiberties(ni, nj);
                    if (opponentLiberties === 1) {
                        libertyScore += 20; // 可以提子
                    } else if (opponentLiberties === 2) {
                        libertyScore += 10; // 威胁提子
                    }
                }
            }
            
            // 恢复棋盘
            this.board[move.i][move.j] = 0;
            
            return libertyScore;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：计算气数
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： countLiberties
         * 功能：计算指定位置棋子组的气数
         * 说明：使用BFS算法计算整个棋子组的空相邻点
         * 注意：返回的是整个组的气数，不是单个棋子的气
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Number)         	  气数数量
         * Example：
         */
        'countLiberties': function(i, j) {
            const color = this.board[i][j];
            const visited = new Set();
            const liberties = new Set();
            const queue = [[i, j]];
            
            while (queue.length > 0) {
                const [x, y] = queue.shift();
                const key = `${x},${y}`;
                
                if (visited.has(key)) continue;
                visited.add(key);
                
                const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                for (const [dx, dy] of neighbors) {
                    const nx = x + dx, ny = y + dy;
                    
                    if (this.isValidPosition(nx, ny)) {
                        if (this.board[nx][ny] === 0) {
                            liberties.add(`${nx},${ny}`);
                        } else if (this.board[nx][ny] === color) {
                            queue.push([nx, ny]);
                        }
                    }
                }
            }
            
            return liberties.size;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：连接性评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateConnection
         * 功能：评估移动与现有棋子的连接能力
         * 说明：计算与同色棋子的连接潜力
         * 注意：连接性好的棋子更易形成眼位
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  连接性得分
         * Example：
         */
        'evaluateConnection': function(move) {
            let connectionScore = 0;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            // 检查与同色棋子的连接
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === this.currentPlayer) {
                    connectionScore += 15; // 直接连接
                }
            }
            
            // 检查跳连接（小飞等）
            const jumps = [[0,2], [2,0], [0,-2], [-2,0], [1,1], [1,-1], [-1,1], [-1,-1]];
            for (const [dx, dy] of jumps) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === this.currentPlayer) {
                    // 检查中间点是否为空或对方棋子
                    const midI = move.i + Math.floor(dx/2);
                    const midJ = move.j + Math.floor(dy/2);
                    if (this.isValidPosition(midI, midJ)) {
                        if (this.board[midI][midJ] === 0) {
                            connectionScore += 8; // 跳连接
                        } else if (this.board[midI][midJ] === (this.currentPlayer === 1 ? 2 : 1)) {
                            connectionScore += 5; // 对方棋子间隔的连接
                        }
                    }
                }
            }
            
            return connectionScore;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：攻击性评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateAttack
         * 功能：评估移动的攻击潜力
         * 说明：计算对对方棋子的威胁程度
         * 注意：优先攻击气少的对方棋子
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  攻击性得分
         * Example：
         */
        'evaluateAttack': function(move) {
            let attackScore = 0;
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            
            // 临时放置棋子
            this.board[move.i][move.j] = this.currentPlayer;
            
            // 检查是否可以立即提子
            const captured = this.findCapturedStones(move.i, move.j);
            if (captured.length > 0) {
                attackScore += captured.length * 30; // 提子价值
            }
            
            // 检查对对方棋子的威胁
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    const opponentLiberties = this.countLiberties(ni, nj);
                    if (opponentLiberties === 1) {
                        attackScore += 25; // 致命威胁
                    } else if (opponentLiberties === 2) {
                        attackScore += 15; // 严重威胁
                    }
                }
            }
            
            // 恢复棋盘
            this.board[move.i][move.j] = 0;
            
            return attackScore;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：战略位置评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateStrategicPosition
         * 功能：评估移动的战略价值
         * 说明：考虑星位、关键点等战略位置
         * 注意：根据游戏阶段调整权重
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  战略位置得分
         * Example：
         */
        'evaluateStrategicPosition': function(move) {
            let strategicScore = 0;
            
            // 星位价值
            const starPoints = this.getStarPoints();
            for (const point of starPoints) {
                if (move.i === point[0] && move.j === point[1]) {
                    strategicScore += 20; // 星位价值
                    break;
                }
            }
            
            // 三三、四四等高目位置
            if (this.boardSize === 19) {
                const highMoves = [
                    [3,3], [3,15], [15,3], [15,15], // 三三
                    [4,4], [4,14], [14,4], [14,14]  // 四四
                ];
                for (const [x, y] of highMoves) {
                    if (move.i === x && move.j === y) {
                        strategicScore += 18;
                        break;
                    }
                }
            }
            
            return strategicScore;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：提子潜力评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateCapturePotential
         * 功能：评估移动的提子潜力
         * 说明：计算未来几步内提子的可能性
         * 注意：考虑连续攻击的可能性
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  提子潜力得分
         * Example：
         */
        'evaluateCapturePotential': function(move) {
            let captureScore = 0;
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            
            // 检查周围对方棋子的脆弱性
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    const groupSize = this.getGroup(ni, nj).length;
                    const liberties = this.countLiberties(ni, nj);
                    
                    if (liberties === 1) {
                        captureScore += groupSize * 10; // 立即提子
                    } else if (liberties === 2) {
                        captureScore += groupSize * 5; // 威胁提子
                    }
                }
            }
            
            return captureScore;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：防守评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateDefense
         * 功能：评估移动的防守价值
         * 说明：保护己方薄弱棋子的能力
         * 注意：防守得分在己方棋子受威胁时更重要
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  防守得分
         * Example：
         */
        'evaluateDefense': function(move) {
            let defenseScore = 0;
            
            // 检查是否保护己方气少的棋子
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === this.currentPlayer) {
                    const liberties = this.countLiberties(ni, nj);
                    if (liberties === 1) {
                        defenseScore += 25; // 救活己方棋子
                    } else if (liberties === 2) {
                        defenseScore += 15; // 加强己方棋子
                    }
                }
            }
            
            return defenseScore;
        },
        /**
         *
         * @author: lhh
         * 产品介绍：获取AI思考时间
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getAIThinkingTime
         * 功能：根据AI难度级别返回思考时间
         * 说明：不同难度的AI有不同的思考延迟
         * 注意：思考时间影响游戏体验和AI表现
         * @return 	(Number)         	  思考时间（毫秒）
         * Example：
         */
        'getAIThinkingTime': function() {
            switch (this.aiLevel) {
                case 'easy':
                    return 800 + Math.random() * 400; // 0.8-1.2秒
                case 'medium':
                    return 1200 + Math.random() * 600; // 1.2-1.8秒
                case 'hard':
                    return 1800 + Math.random() * 800; // 1.8-2.6秒
                default:
                    return 1000;
            }
        },
        /**
         *
         * @author: lhh
         * 产品介绍：影响力评估
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： evaluateInfluence
         * 功能：评估移动对棋盘的影响力
         * 说明：计算落子后对周围区域的控制力
         * 注意：影响力大的位置更有战略价值
         * @param 	(Object)move         	  NO NULL : 移动位置对象
         * @return 	(Number)         	  影响力得分
         * Example：
         */
        'evaluateInfluence': function(move) {
            let influenceScore = 0;
            
            // 计算对周围3x3区域的影响力
            for (let dx = -2; dx <= 2; dx++) {
                for (let dy = -2; dy <= 2; dy++) {
                    const ni = move.i + dx, nj = move.j + dy;
                    if (this.isValidPosition(ni, nj)) {
                        const distance = Math.abs(dx) + Math.abs(dy);
                        const influence = 10 - distance * 2; // 距离越近影响力越大
                        if (influence > 0) {
                            influenceScore += influence;
                        }
                    }
                }
            }
            
            return influenceScore;
        },

        

        /**
         *
         * @author: lhh
         * 产品介绍：获取所有合法着法
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getAllValidMoves
         * 功能：获取当前所有合法的落子位置
         * 说明：遍历棋盘所有空位，检查是否符合围棋规则
         * 注意：排除劫争位置和自杀着法
         * @return 	(Array)         	  合法着法数组
         * Example：
         */
        'getAllValidMoves': function() {
            const moves = [];
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] === 0 && !this.isKo(i, j)) {
                        this.board[i][j] = this.currentPlayer;
                        const captured = this.findCapturedStones(i, j);
                        const hasLiberty = this.hasLiberty(i, j);
                        this.board[i][j] = 0;
                        
                        if (hasLiberty || captured.length > 0) {
                            moves.push({ i, j });
                        }
                    }
                }
            }
            return moves;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：虚着（Pass）
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： pass
         * 功能：处理玩家虚着操作
         * 说明：记录虚着历史，连续两次虚着结束游戏
         * 注意：虚着后切换玩家，可能触发AI思考
         * Example：
         */
        'pass': function() {
            if (this.gameOver) return;
            
            this.moveHistory.push({ player: this.currentPlayer, pass: true });
            this.passes++;
            this.lastMove = null;
            this.koPoint = null;
            
            if (this.passes >= 2) {
                this.gameOver = true;
                this.calculateScore();
            } else {
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                
                if (this.gameMode === 'ai' && !this.gameOver && this.currentPlayer === this.aiPlayer) {
                    System.wait(() => {
                        this.makeAIMove();
                    }, 500);
                }
            }
            
            this.drawBoard();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：检查位置有效性
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： isValidPosition
         * 功能：检查坐标是否在棋盘范围内
         * 说明：验证坐标是否在棋盘有效范围内
         * 注意：坐标从0开始，最大为boardSize-1
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Boolean)         	  位置是否有效
         * Example：
         */
        'isValidPosition': function(i, j) {
            const isValid = i >= 0 && i < this.boardSize && j >= 0 && j < this.boardSize;
            return isValid;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：检查劫争
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： isKo
         * 功能：检查指定位置是否为劫争位置
         * 说明：判断位置是否与上次提子的位置相同
         * 注意：劫争规则禁止立即提回单个棋子
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Boolean)         	  是否为劫争位置
         * Example：
         */
        'isKo': function(i, j) {
            return this.koPoint && this.koPoint.i === i && this.koPoint.j === j;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：检查棋子气
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： hasLiberty
         * 功能：检查指定位置的棋子是否有气
         * 说明：使用BFS算法检查棋子或棋子组是否有相邻空位
         * 注意：无气的棋子会被提掉
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Boolean)         	  是否有气
         * Example：
         */
        'hasLiberty': function(i, j) {
            const color = this.board[i][j];
            const visited = new Set();
            const queue = [[i, j]];
            
            while (queue.length > 0) {
                const [x, y] = queue.shift();
                const key = `${x},${y}`;
                
                if (visited.has(key)) continue;
                visited.add(key);
                
                const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                for (const [dx, dy] of neighbors) {
                    const nx = x + dx, ny = y + dy;
                    
                    if (this.isValidPosition(nx, ny)) {
                        if (this.board[nx][ny] === 0) return true;
                        if (this.board[nx][ny] === color) queue.push([nx, ny]);
                    }
                }
            }
            return false;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：查找被提棋子
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： findCapturedStones
         * 功能：查找因落子而被提掉的对方棋子
         * 说明：检查落子位置周围的对方棋子组是否有气
         * 注意：只检查相邻的对方棋子
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Array)         	  被提棋子数组
         * Example：
         */
        'findCapturedStones': function(i, j) {
            const captured = [];
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = i + dx, nj = j + dy;
                
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    if (!this.hasLiberty(ni, nj)) {
                        const group = this.getGroup(ni, nj);
                        captured.push(...group);
                    }
                }
            }
            
            return captured;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：获取棋子组
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getGroup
         * 功能：获取与指定位置相连的同色棋子组
         * 说明：使用BFS算法查找所有相连的同色棋子
         * 注意：返回包含所有相连棋子的数组
         * @param 	(Number)i         	  NO NULL : 棋盘横坐标
         * @param 	(Number)j         	  NO NULL : 棋盘纵坐标
         * @return 	(Array)         	  棋子组数组
         * Example：
         */
        'getGroup': function(i, j) {
            const color = this.board[i][j];
            const group = [];
            const visited = new Set();
            const queue = [[i, j]];
            
            while (queue.length > 0) {
                const [x, y] = queue.shift();
                const key = `${x},${y}`;
                
                if (visited.has(key)) continue;
                visited.add(key);
                group.push([x, y]);
                
                const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                for (const [dx, dy] of neighbors) {
                    const nx = x + dx, ny = y + dy;
                    
                    if (this.isValidPosition(nx, ny) && this.board[nx][ny] === color) {
                        queue.push([nx, ny]);
                    }
                }
            }
            
            return group;
        },

        /**
         *
         * @author: lhh
         * 产品介绍：移除棋子
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： removeStones
         * 功能：从棋盘上移除指定棋子
         * 说明：将指定位置的棋子设为空，并更新提子计数
         * 注意：同时更新劫争位置
         * @param 	(Array)stones         	  NO NULL : 要移除的棋子数组
         * Example：
         */
        'removeStones': function(stones) {
            for (const [i, j] of stones) {
                this.board[i][j] = 0;
            }
            
            if (this.currentPlayer === 1) {
                this.capturedStones.black += stones.length;
            } else {
                this.capturedStones.white += stones.length;
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：更新劫争点
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： updateKoPoint
         * 功能：根据提子情况更新劫争位置
         * 说明：如果只提掉一个棋子，记录为劫争位置
         * 注意：多个棋子被提时不设置劫争
         * @param 	(Array)captured         	  NO NULL : 被提棋子数组
         * Example：
         */
        'updateKoPoint': function(captured) {
            if (captured.length === 1) {
                this.koPoint = { i: captured[0][0], j: captured[0][1] };
            } else {
                this.koPoint = null;
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：计算得分
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： calculateScore
         * 功能：计算游戏最终得分
         * 说明：使用简单的地域计算法估算得分
         * 注意：显示游戏结果和胜利信息
         * Example：
         */
        'calculateScore': function() {
            let blackScore = this.capturedStones.black;
            let whiteScore = this.capturedStones.white + 6.5;
            
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] === 1) blackScore++;
                    else if (this.board[i][j] === 2) whiteScore++;
                }
            }
            
            let winner = blackScore > whiteScore ? '黑棋' : '白棋';
            let scoreDiff = Math.abs(blackScore - whiteScore);
            
            this.showMessage(`游戏结束！${winner}胜利，领先${scoreDiff.toFixed(1)}目`);
        },

        /**
         *
         * @author: lhh
         * 产品介绍：获取游戏状态
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： getGameState
         * 功能：返回当前游戏状态的快照
         * 说明：提供游戏状态的完整信息供外部使用
         * 注意：返回的对象包含深拷贝的数据
         * @return 	(Object)         	  游戏状态对象
         * Example：
         */
        'getGameState': function() {
            return {
                board: this.board.map(row => [...row]),
                currentPlayer: this.currentPlayer,
                gameOver: this.gameOver,
                capturedStones: { 
                    black: this.capturedStones.black, 
                    white: this.capturedStones.white 
                },
                lastMove: this.lastMove ? { ...this.lastMove } : null,
                moveCount: this.moveHistory.length,
                gameMode: this.gameMode,
                aiPlayer: this.aiPlayer,
                aiLevel: this.aiLevel,
                boardSize: this.boardSize,
                passes: this.passes
            };
        },

        /**
         *
         * @author: lhh
         * 产品介绍：显示消息
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： showMessage
         * 功能：在控制台显示游戏消息
         * 说明：将游戏消息输出到控制台
         * 注意：实际应用中可替换为UI显示
         * @param 	(String)message         	  NO NULL : 要显示的消息
         * Example：
         */
        'showMessage': function(message) {
            console.log("围棋消息:", message);
            // 调用全局的showMessage函数
            if (typeof GoGame.showMessage === 'function') {
                GoGame.showMessage(message);
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：绑定事件
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： bindEvents
         * 功能：绑定所有用户交互事件
         * 说明：包括鼠标、触摸等事件的绑定
         * 注意：根据设备类型绑定不同的事件
         * Example：
         */
        'bindEvents': function() {
            console.log("绑定事件，设备类型:", this.isMobile ? "移动端" : "桌面端");
            
            // 移除可能存在的旧事件监听器
            this.theCanvas.removeEventListener('click', this.boundMouseClick);
            this.theCanvas.removeEventListener('touchstart', this.boundTouchStart);
            this.theCanvas.removeEventListener('touchmove', this.boundTouchMove);
            this.theCanvas.removeEventListener('touchend', this.boundTouchEnd);
            this.theCanvas.removeEventListener('mousemove', this.boundMouseMove);
            
            // 绑定新的事件监听器
            this.boundMouseClick = this.handleMouseClick.bind(this);
            this.boundTouchStart = this.handleTouchStart.bind(this);
            this.boundTouchMove = this.handleTouchMove.bind(this);
            this.boundTouchEnd = this.handleTouchEnd.bind(this);
            this.boundMouseMove = this.updateHoverPosition.bind(this);
            
            this.theCanvas.addEventListener('click', this.boundMouseClick);
            this.theCanvas.addEventListener('touchstart', this.boundTouchStart, { passive: false });
            this.theCanvas.addEventListener('touchmove', this.boundTouchMove, { passive: false });
            this.theCanvas.addEventListener('touchend', this.boundTouchEnd, { passive: false });
            
            if (!this.isMobile) {
                this.theCanvas.addEventListener('mousemove', this.boundMouseMove);
            }
        },

        /**
         *
         * @author: lhh
         * 产品介绍：重新开始游戏
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： restart
         * 功能：重新开始游戏
         * 说明：重置游戏状态并重新初始化
         * 注意：保持当前的游戏模式和棋盘大小
         * Example：
         */
        'restart': function() {
            console.log("重新开始游戏");
            this.initGame();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：撤销上一步
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： undo
         * 功能：撤销上一步操作
         * 说明：恢复到上一步的游戏状态
         * 注意：只能撤销一步，且不能在人机对战中使用
         * Example：
         */
        'undo': function() {
            if (this.gameMode === 'ai') {
                this.showMessage("人机对战不支持悔棋");
                return;
            }
            
            if (this.moveHistory.length === 0) {
                this.showMessage("没有可撤销的着法");
                return;
            }
            
            const lastMove = this.moveHistory.pop();
            this.currentPlayer = lastMove.player;
            
            if (lastMove.pass) {
                this.passes--;
            } else {
                this.board[lastMove.i][lastMove.j] = 0;
                
                if (lastMove.captured && lastMove.captured.length > 0) {
                    for (const [i, j] of lastMove.captured) {
                        this.board[i][j] = this.currentPlayer === 1 ? 2 : 1;
                    }
                }
            }
            
            this.lastMove = this.moveHistory.length > 0 ? this.moveHistory[this.moveHistory.length - 1] : null;
            this.drawBoard();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：AI移动
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： aiMove
         * 功能：外部调用的AI移动接口
         * 说明：提供给Vue组件调用的AI移动方法
         * 注意：直接调用makeAIMove方法
         * Example：
         */
        'aiMove': function() {
            this.makeAIMove();
        },

        /**
         *
         * @author: lhh
         * 产品介绍：销毁游戏
         * 创建日期：2025-11-02
         * 修改日期：2025-11-02
         * 名称： destructor
         * 功能：清理游戏资源
         * 说明：移除事件监听器，清理内存
         * 注意：在移除游戏实例前调用
         * Example：
         */
        'destructor': function() {
            console.log("销毁围棋游戏");
            
            // 移除事件监听器
            this.theCanvas.removeEventListener('click', this.boundMouseClick);
            this.theCanvas.removeEventListener('touchstart', this.boundTouchStart);
            this.theCanvas.removeEventListener('touchmove', this.boundTouchMove);
            this.theCanvas.removeEventListener('touchend', this.boundTouchEnd);
            this.theCanvas.removeEventListener('mousemove', this.boundMouseMove);
        }
    });

    // 静态方法
    GoGame.showMessage = function(message) {
        console.log("围棋:", message);
        if (typeof alert !== 'undefined') {
            alert(message);
        }
    };

    return GoGame;
});
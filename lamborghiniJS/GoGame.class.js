/**
 * 围棋游戏 - 完整可工作版本
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
        constructor: function(dom, size) {
            this.base(dom);
            
            this.boardSize = Math.max(9, Math.min(19, parseInt(size) || 19));
            this.gameMode = 'human'; // 'human' 或 'ai'
            this.aiPlayer = 2; // AI执白
            this.aiLevel = 'fast'; // 'fast' 快速模式
            this.initGame();
        },

        '_className': 'GoGame',

        'initGame': function() {
            // 棋盘参数
            this.padding = 25;
            this.gridSize = this.boardSize === 9 ? 40 : this.boardSize === 13 ? 35 : 28;
            this.stoneRadius = Math.floor(this.gridSize * 0.42);
            
            // 计算画布尺寸
            this.boardWidth = (this.boardSize - 1) * this.gridSize;
            this.boardHeight = (this.boardSize - 1) * this.gridSize;
            this.canvasWidth = this.boardWidth + this.padding * 2;
            this.canvasHeight = this.boardHeight + this.padding * 2;
            
            // 设置画布尺寸
            this.theCanvas.width = this.canvasWidth;
            this.theCanvas.height = this.canvasHeight;
            
            // 游戏状态
            this.board = [];
            this.currentPlayer = 1; // 1:黑, 2:白
            this.gameOver = false;
            this.moveHistory = [];
            this.capturedStones = { black: 0, white: 0 };
            this.lastMove = null;
            this.koPoint = null;
            this.passes = 0;
            
            this.initBoard();
            this.drawBoard();
        },
        'setGameMode': function(mode) {
            this.gameMode = mode;
        },

        'setAIPlayer': function(player) {
            this.aiPlayer = player;
        },
        'setAILevel': function(level) {
            this.aiLevel = level;
        },
        'initBoard': function() {
            // 初始化空棋盘
            this.board = [];
            for (let i = 0; i < this.boardSize; i++) {
                this.board[i] = [];
                for (let j = 0; j < this.boardSize; j++) {
                    this.board[i][j] = 0;
                }
            }
        },

        'drawBoard': function() {
            const ctx = this.theCanvas.getContext('2d');
            
            // 清空画布
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            
            // 绘制棋盘背景
            ctx.fillStyle = '#DCB35C';
            ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            
            // 绘制网格线
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            
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
        },
        'drawStarPoints': function(ctx) {
            const points = this.getStarPoints();
            ctx.fillStyle = '#000000';
            
            points.forEach(point => {
                const x = this.padding + point[0] * this.gridSize;
                const y = this.padding + point[1] * this.gridSize;
                
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        },
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
        'drawStones': function(ctx) {
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] !== 0) {
                        this.drawStone(ctx, i, j, this.board[i][j] === 1);
                    }
                }
            }
        },
        'drawStone': function(ctx, i, j, isBlack) {
            const x = this.padding + i * this.gridSize;
            const y = this.padding + j * this.gridSize;
            
            // 创建渐变
            const gradient = ctx.createRadialGradient(
                x - 2, y - 2, 1,
                x, y, this.stoneRadius
            );
            
            if (isBlack) {
                gradient.addColorStop(0, '#2a2a2a');
                gradient.addColorStop(1, '#000000');
            } else {
                gradient.addColorStop(0, '#ffffff');
                gradient.addColorStop(0.8, '#f0f0f0');
                gradient.addColorStop(1, '#e0e0e0');
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, this.stoneRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // 边框
            ctx.strokeStyle = isBlack ? '#000000' : '#666666';
            ctx.lineWidth = 1;
            ctx.stroke();
        },
        'highlightLastMove': function(ctx) {
            const x = this.padding + this.lastMove.i * this.gridSize;
            const y = this.padding + this.lastMove.j * this.gridSize;
            
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.stroke();
        },
        'placeStone': function(i, j) {
            if (this.gameOver) {
                this.showMessage("游戏已结束");
                return false;
            }

            // 在人机模式下，如果当前是AI回合，不允许玩家落子
            if (this.gameMode === 'ai' && this.currentPlayer === this.aiPlayer) {
                this.showMessage("现在是AI思考时间");
                return false;
            }

            if (!this.isValidPosition(i, j)) {
                this.showMessage("无效位置");
                return false;
            }

            if (this.board[i][j] !== 0) {
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
            
            // 如果是自杀且没有提子，不允许
            if (!hasLiberty && captured.length === 0) {
                this.board[i][j] = 0;
                this.showMessage("自杀着法不允许");
                return false;
            }

            // 提子
            if (captured.length > 0) {
                this.removeStones(captured);
            }

            // 记录移动
            this.lastMove = { i, j, player: this.currentPlayer, captured };
            this.moveHistory.push(this.lastMove);
            this.passes = 0;

            // 更新劫点
            this.updateKoPoint(captured);

            // 重绘
            this.drawBoard();
            
            // 切换玩家
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

            // 如果是AI模式且游戏未结束，触发AI思考
            if (this.gameMode === 'ai' && !this.gameOver && this.currentPlayer === this.aiPlayer) {
                setTimeout(() => {
                    this.fastAIMove();
                }, 100);
            }



            
            return true;
        },
        'fastAIMove': function() {
            if (this.gameOver) return;
            
            console.log("AI快速思考中...");
            
            // 快速获取所有可能的合法着法
            const moves = this.getQuickValidMoves();
            
            if (moves.length === 0) {
                // 如果没有合法着法，AI选择虚着
                this.pass();
                return;
            }
            
            // 快速评估并选择最佳着法
            const bestMove = this.quickEvaluateMoves(moves);
            
            if (bestMove) {
                this.placeStone(bestMove.i, bestMove.j);
            }
        },
        'getQuickValidMoves': function() {
            const moves = [];
            const centerI = Math.floor(this.boardSize / 2);
            const centerJ = Math.floor(this.boardSize / 2);
            
            // 优先检查中心区域和重要位置
            const searchAreas = this.getSearchAreas();
            
            for (const area of searchAreas) {
                for (let i = area.startI; i <= area.endI; i++) {
                    for (let j = area.startJ; j <= area.endJ; j++) {
                        if (this.board[i][j] === 0 && !this.isKo(i, j)) {
                            // 快速检查是否为合法着法
                            if (this.quickIsValidMove(i, j)) {
                                moves.push({ i, j });
                                
                                // 如果找到足够多的候选点，提前返回
                                if (moves.length >= 20) {
                                    return moves;
                                }
                            }
                        }
                    }
                }
            }
            
            return moves;
        },
        'getSearchAreas': function() {
            const areas = [];
            const center = Math.floor(this.boardSize / 2);
            
            // 1. 优先搜索最后落子周围
            if (this.lastMove && !this.lastMove.pass) {
                const range = 3;
                areas.push({
                    startI: Math.max(0, this.lastMove.i - range),
                    endI: Math.min(this.boardSize - 1, this.lastMove.i + range),
                    startJ: Math.max(0, this.lastMove.j - range),
                    endJ: Math.min(this.boardSize - 1, this.lastMove.j + range)
                });
            }
            
            // 2. 搜索四个角
            const cornerSize = 4;
            areas.push({ startI: 0, endI: cornerSize, startJ: 0, endJ: cornerSize });
            areas.push({ startI: 0, endI: cornerSize, startJ: this.boardSize - 1 - cornerSize, endJ: this.boardSize - 1 });
            areas.push({ startI: this.boardSize - 1 - cornerSize, endI: this.boardSize - 1, startJ: 0, endJ: cornerSize });
            areas.push({ startI: this.boardSize - 1 - cornerSize, endI: this.boardSize - 1, startJ: this.boardSize - 1 - cornerSize, endJ: this.boardSize - 1 });
            
            // 3. 搜索四条边
            const edgeSize = 3;
            areas.push({ startI: 0, endI: edgeSize, startJ: 0, endJ: this.boardSize - 1 });
            areas.push({ startI: this.boardSize - 1 - edgeSize, endI: this.boardSize - 1, startJ: 0, endJ: this.boardSize - 1 });
            areas.push({ startI: 0, endI: this.boardSize - 1, startJ: 0, endJ: edgeSize });
            areas.push({ startI: 0, endI: this.boardSize - 1, startJ: this.boardSize - 1 - edgeSize, endJ: this.boardSize - 1 });
            
            // 4. 最后搜索整个棋盘（如果前面没找到足够候选）
            areas.push({ startI: 0, endI: this.boardSize - 1, startJ: 0, endJ: this.boardSize - 1 });
            
            return areas;
        },
        'quickIsValidMove': function(i, j) {
            // 快速检查合法性，不进行完整的DFS
            this.board[i][j] = this.currentPlayer;
            
            let hasLiberty = false;
            let canCapture = false;
            
            // 快速检查四个方向
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            for (const [dx, dy] of neighbors) {
                const ni = i + dx, nj = j + dy;
                if (this.isValidPosition(ni, nj)) {
                    if (this.board[ni][nj] === 0) {
                        hasLiberty = true;
                    } else if (this.board[ni][nj] !== this.currentPlayer) {
                        // 快速检查是否能提子
                        const oppNeighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                        let oppLiberties = 0;
                        for (const [dx2, dy2] of oppNeighbors) {
                            const ni2 = ni + dx2, nj2 = nj + dy2;
                            if (this.isValidPosition(ni2, nj2) && this.board[ni2][nj2] === 0) {
                                oppLiberties++;
                                if (oppLiberties > 1) break;
                            }
                        }
                        if (oppLiberties <= 1) {
                            canCapture = true;
                        }
                    }
                }
            }
            
            this.board[i][j] = 0;
            return hasLiberty || canCapture;
        },
        'quickEvaluateMoves': function(moves) {
            if (moves.length === 0) return null;
            
            let bestMove = moves[0];
            let bestScore = -Infinity;
            
            // 快速评估前几个候选点
            const evaluateCount = Math.min(10, moves.length);
            
            for (let k = 0; k < evaluateCount; k++) {
                const move = moves[k];
                let score = this.quickEvaluateMove(move);
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            
            return bestMove;
        },
        'quickEvaluateMove': function(move) {
            let score = 0;
            const centerI = Math.floor(this.boardSize / 2);
            const centerJ = Math.floor(this.boardSize / 2);
            
            // 1. 距离中心得分（开局阶段重要）
            const distanceToCenter = Math.abs(move.i - centerI) + Math.abs(move.j - centerJ);
            score += (this.boardSize - distanceToCenter) * 3;
            
            // 2. 角部得分
            const isCorner = (move.i < 3 || move.i > this.boardSize - 4) && 
                            (move.j < 3 || move.j > this.boardSize - 4);
            if (isCorner) {
                score += 25;
            }
            
            // 3. 边部得分
            const isEdge = move.i < 3 || move.i > this.boardSize - 4 || 
                          move.j < 3 || move.j > this.boardSize - 4;
            if (isEdge && !isCorner) {
                score += 15;
            }
            
            // 4. 连接自己棋子得分
            score += this.quickEvaluateConnection(move) * 8;
            
            // 5. 攻击对方棋子得分
            score += this.quickEvaluateAttack(move) * 12;
            
            // 6. 提子机会得分（快速检查）
            score += this.quickEvaluateCapture(move) * 30;
            
            // 7. 随机性避免模式化
            score += Math.random() * 5;
            
            return score;
        },
        'quickEvaluateConnection': function(move) {
            let connectionScore = 0;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === this.currentPlayer) {
                    connectionScore += 1;
                }
            }
            
            return connectionScore;
        },
        'quickEvaluateAttack': function(move) {
            let attackScore = 0;
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    // 快速检查对方棋子气数
                    let liberties = 0;
                    const oppNeighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                    for (const [dx2, dy2] of oppNeighbors) {
                        const ni2 = ni + dx2, nj2 = nj + dy2;
                        if (this.isValidPosition(ni2, nj2) && this.board[ni2][nj2] === 0) {
                            liberties++;
                            if (liberties > 2) break;
                        }
                    }
                    if (liberties === 1) attackScore += 10;
                    else if (liberties === 2) attackScore += 5;
                }
            }
            
            return attackScore;
        },
        'quickEvaluateCapture': function(move) {
            let captureScore = 0;
            
            // 模拟落子
            this.board[move.i][move.j] = this.currentPlayer;
            
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    // 快速检查是否能立即提子
                    let liberties = 0;
                    const oppNeighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                    for (const [dx2, dy2] of oppNeighbors) {
                        const ni2 = ni + dx2, nj2 = nj + dy2;
                        if (this.isValidPosition(ni2, nj2) && this.board[ni2][nj2] === 0) {
                            liberties++;
                            if (liberties > 1) break;
                        }
                    }
                    if (liberties === 0) {
                        captureScore += 1; // 可以提子
                    }
                }
            }
            
            // 恢复棋盘
            this.board[move.i][move.j] = 0;
            
            return captureScore;
        },
        'aiMove': function() {
            if (this.gameOver) return;
            
            console.log("AI思考中...");
            
            // 获取所有可能的合法着法
            const moves = this.getAllValidMoves();
            
            if (moves.length === 0) {
                // 如果没有合法着法，AI选择虚着
                this.pass();
                return;
            }
            
            // 简单的AI策略：随机选择+基础评估
            const bestMove = this.evaluateMoves(moves);
            
            if (bestMove) {
                this.placeStone(bestMove.i, bestMove.j);
            } else {
                // 如果没有找到好的着法，随机选择
                const randomMove = moves[Math.floor(Math.random() * moves.length)];
                this.placeStone(randomMove.i, randomMove.j);
            }
        },
        'getAllValidMoves': function() {
            const moves = [];
            
            for (let i = 0; i < this.boardSize; i++) {
                for (let j = 0; j < this.boardSize; j++) {
                    if (this.board[i][j] === 0 && !this.isKo(i, j)) {
                        // 检查是否为合法着法
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
        'evaluateMoves': function(moves) {
            let bestScore = -Infinity;
            let bestMove = null;
            
            for (const move of moves) {
                let score = this.evaluateMove(move);
                
                // 给中心区域加分（围棋的基本策略）
                const centerI = Math.floor(this.boardSize / 2);
                const centerJ = Math.floor(this.boardSize / 2);
                const distanceToCenter = Math.abs(move.i - centerI) + Math.abs(move.j - centerJ);
                score += (this.boardSize - distanceToCenter) * 2;
                
                // 给边角加分（占角）
                if ((move.i < 3 || move.i > this.boardSize - 4) && 
                    (move.j < 3 || move.j > this.boardSize - 4)) {
                    score += 10;
                }
                
                // 给连接自己棋子的位置加分
                score += this.evaluateConnection(move) * 3;
                
                // 给攻击对方棋子的位置加分
                score += this.evaluateAttack(move) * 5;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            
            return bestMove;
        },
        'evaluateMove': function(move) {
            let score = 0;
            
            // 模拟落子
            this.board[move.i][move.j] = this.currentPlayer;
            const captured = this.findCapturedStones(move.i, move.j);
            
            // 提子得分
            score += captured.length * 20;
            
            // 检查是否形成眼位
            if (this.formsEye(move.i, move.j)) {
                score += 15;
            }
            
            // 恢复棋盘
            this.board[move.i][move.j] = 0;
            
            return score;
        },
        'evaluateConnection': function(move) {
            let connectionScore = 0;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === this.currentPlayer) {
                    connectionScore += 5;
                }
            }
            
            return connectionScore;
        },
        'evaluateAttack': function(move) {
            let attackScore = 0;
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            
            for (const [dx, dy] of neighbors) {
                const ni = move.i + dx, nj = move.j + dy;
                if (this.isValidPosition(ni, nj) && this.board[ni][nj] === opponent) {
                    // 检查这个对方棋子是否危险
                    const group = this.getStoneGroup(ni, nj);
                    const liberties = this.countLiberties(group);
                    if (liberties <= 2) {
                        attackScore += (3 - liberties) * 10;
                    }
                }
            }
            
            return attackScore;
        },
        'formsEye': function(i, j) {
            // 简单的眼位判断
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            let sameColorCount = 0;
            let emptyCount = 0;
            
            for (const [dx, dy] of neighbors) {
                const ni = i + dx, nj = j + dy;
                if (this.isValidPosition(ni, nj)) {
                    if (this.board[ni][nj] === this.currentPlayer) {
                        sameColorCount++;
                    } else if (this.board[ni][nj] === 0) {
                        emptyCount++;
                    }
                }
            }
            
            return sameColorCount >= 3;
        },
        'countLiberties': function(group) {
            const liberties = new Set();
            
            for (const stone of group) {
                const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                for (const [dx, dy] of neighbors) {
                    const ni = stone.i + dx, nj = stone.j + dy;
                    if (this.isValidPosition(ni, nj) && this.board[ni][nj] === 0) {
                        liberties.add(`${ni},${nj}`);
                    }
                }
            }
            
            return liberties.size;
        },
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
                
                // 如果是AI模式且游戏未结束，触发AI思考
                if (this.gameMode === 'ai' && !this.gameOver && this.currentPlayer === this.aiPlayer) {
                    setTimeout(() => {
                        this.fastAIMove();
                    }, 100);
                }
            }
            
            this.drawBoard();
        },
        'isValidPosition': function(i, j) {
            return i >= 0 && i < this.boardSize && j >= 0 && j < this.boardSize;
        },

        'isKo': function(i, j) {
            return this.koPoint && this.koPoint.i === i && this.koPoint.j === j;
        },

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
                        if (this.board[nx][ny] === 0) {
                            return true;
                        }
                        if (this.board[nx][ny] === color) {
                            queue.push([nx, ny]);
                        }
                    }
                }
            }
            return false;
        },

        'findCapturedStones': function(i, j) {
            const opponent = this.currentPlayer === 1 ? 2 : 1;
            const captured = [];
            const checked = new Set();
            
            const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
            for (const [dx, dy] of neighbors) {
                const ni = i + dx, nj = j + dy;
                
                if (this.isValidPosition(ni, nj) && 
                    this.board[ni][nj] === opponent && 
                    !checked.has(`${ni},${nj}`)) {
                    
                    const group = this.getStoneGroup(ni, nj);
                    const groupKey = group.map(stone => `${stone.i},${stone.j}`).join(';');
                    
                    if (!checked.has(groupKey) && !this.groupHasLiberty(group)) {
                        captured.push(...group);
                        checked.add(groupKey);
                    }
                }
            }
            
            return captured;
        },

        'getStoneGroup': function(i, j) {
            const color = this.board[i][j];
            const group = [];
            const visited = new Set();
            const queue = [[i, j]];
            
            while (queue.length > 0) {
                const [x, y] = queue.shift();
                const key = `${x},${y}`;
                
                if (visited.has(key)) continue;
                visited.add(key);
                group.push({ i: x, j: y });
                
                const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                for (const [dx, dy] of neighbors) {
                    const nx = x + dx, ny = y + dy;
                    
                    if (this.isValidPosition(nx, ny) && 
                        this.board[nx][ny] === color && 
                        !visited.has(`${nx},${ny}`)) {
                        queue.push([nx, ny]);
                    }
                }
            }
            return group;
        },

        'groupHasLiberty': function(group) {
            for (const stone of group) {
                const neighbors = [[0,1], [1,0], [0,-1], [-1,0]];
                for (const [dx, dy] of neighbors) {
                    const ni = stone.i + dx, nj = stone.j + dy;
                    if (this.isValidPosition(ni, nj) && this.board[ni][nj] === 0) {
                        return true;
                    }
                }
            }
            return false;
        },

        'removeStones': function(stones) {
            for (const stone of stones) {
                this.board[stone.i][stone.j] = 0;
                
                if (this.currentPlayer === 1) {
                    this.capturedStones.black++;
                } else {
                    this.capturedStones.white++;
                }
            }
        },

        'updateKoPoint': function(captured) {
            this.koPoint = null;
            if (captured.length === 1) {
                this.koPoint = { i: captured[0].i, j: captured[0].j };
            }
        },

        'calculateScore': function() {
            // 简化版计分
            const blackScore = this.capturedStones.black;
            const whiteScore = this.capturedStones.white + 6.5;
            
            let result = `游戏结束！\n`;
            result += `黑棋: ${blackScore}分\n`;
            result += `白棋: ${whiteScore}分\n`;
            
            if (blackScore > whiteScore) {
                result += "黑棋胜！";
            } else {
                result += "白棋胜！";
            }
            
            this.showMessage(result);
        },

        'undo': function() {
            if (this.moveHistory.length === 0) {
                this.showMessage("没有可撤销的步骤");
                return;
            }
            
            const lastMove = this.moveHistory.pop();
            
            if (lastMove.pass) {
                this.passes--;
                this.currentPlayer = lastMove.player;
            } else {
                this.board[lastMove.i][lastMove.j] = 0;
                
                for (const stone of lastMove.captured) {
                    this.board[stone.i][stone.j] = lastMove.player === 1 ? 2 : 1;
                    
                    if (lastMove.player === 1) {
                        this.capturedStones.black--;
                    } else {
                        this.capturedStones.white--;
                    }
                }
                
                this.currentPlayer = lastMove.player;
            }
            
            this.gameOver = false;
            this.drawBoard();
        },

        'restart': function() {
            this.initGame();
        },

        'bindEvents': function() {
            const self = this;
            
            this.theCanvas.addEventListener('click', function(event) {
                const rect = self.theCanvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                const i = Math.round((x - self.padding) / self.gridSize);
                const j = Math.round((y - self.padding) / self.gridSize);
                
                if (self.isValidPosition(i, j)) {
                    self.placeStone(i, j);
                }
            });
        },

        'getGameState': function() {
            return {
                board: this.board.map(row => [...row]),
                currentPlayer: this.currentPlayer,
                gameOver: this.gameOver,
                capturedStones: { ...this.capturedStones },
                lastMove: this.lastMove,
                moveCount: this.moveHistory.length,
                gameMode: this.gameMode,
                aiPlayer: this.aiPlayer
            };
        },

        'showMessage': function(message) {
            GoGame.showMessage(message);
        },

        'destructor': function() {
            this.theCanvas.onclick = null;
        }
    });

    GoGame.showMessage=function(message){
        console.log("围棋:", message);
        if (typeof alert !== 'undefined') {
            alert(message);
        }
    };



    return GoGame;
});
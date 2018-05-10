var Game = function() {
	//dome 元素
	var gameDiv, nextDiv, SCORE = 0,
		scoreEle, over,
		//游戏矩阵
		gameData = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		//当前方块
		cur,
		//下一个方块
		next,
		//divs
		nextDivs = [],
		gameDivs = [],
		//初始化div
		initDiv = function(container, data, divs) {
			if(container.childNodes.length>0){
				container.innerHTML = '';
			};
			for(var i = 0, len = data.length; i < len; i++) {
				var div = [];
				for(var j = 0; j < data[0].length; j++) {
					var newNode = document.createElement('div');
					newNode.className = 'none';
					newNode.style.top = (i * 20) + 'px';
					newNode.style.left = (j * 20) + 'px';
					container.appendChild(newNode);
					div.push(newNode);
				};
				divs.push(div);
			}
		},
		//刷新div
		refreshDiv = function(data, divs) {
			for(var i = 0, len = data.length; i < len; i++) {
				for(var j = 0; j < data[0].length; j++) {
					var g_data = data[i][j],
						g_d = divs[i][j];
					if(g_data === 0) {
						g_d.className = 'none';
					} else if(g_data === 1) {
						g_d.className = 'done';
					} else if(g_data === 2) {
						g_d.className = 'current';
					}
				}
			}
		},
		//清楚数据
		clearData = function() {
			for(var i = 0; i < cur.data.length; i++) {
				for(var j = 0; j < cur.data[0].length; j++) {
					if(check(cur.origin, i, j)) {
						gameData[cur.origin.x + i][cur.origin.y + j] = 0;
					}
				}
			}
		},
		//检测点是否合法
		check = function(pos, x, y) {
			if(pos.x + x < 0) {
				return false;
			} else if(pos.x + x >= gameData.length) {
				return false;
			} else if(pos.y + y < 0) {
				return false;
			} else if(pos.y + y >= gameData[0].length) {
				return false;
			} else if(gameData[pos.x + x][pos.y + y] == 1) {
				return false;
			} else {
				return true
			}
		},
		//检测数据是否合法
		isValid = function(pos, data) {
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < data[0].length; j++) {
					if(data[i][j] != 0) {
						if(!check(pos, i, j)) {
							return false;
						}
					}
				}
			}
			return true;
		},
		//设置数据
		setDate = function() {
			for(var i = 0; i < cur.data.length; i++) {
				for(var j = 0; j < cur.data[0].length; j++) {
					if(check(cur.origin, i, j)) {
						gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
					}
				}
			}
		},
		//下移
		down = function() {
			if(cur.canDown(isValid)) {
				clearData();
				cur.down();
				setDate();
				refreshDiv(gameData, gameDivs);
				return true;
			} else {
				return false;
			}
		},
		//left
		left = function() {
			if(cur.canLeft(isValid)) {
				clearData();
				cur.left();
				setDate();
				refreshDiv(gameData, gameDivs);
			}
		},
		//right
		right = function() {
			if(cur.canRight(isValid)) {
				clearData();
				cur.right();
				setDate();
				refreshDiv(gameData, gameDivs);
			}
		},
		//旋转
		rotate = function() {
			if(cur.canRotate(isValid)) {
				clearData();
				cur.rotate();
				setDate();
				refreshDiv(gameData, gameDivs);
			}
		},
		//方块到底部后固定
		fixed = function() {
			for(var i = 0; i < cur.data.length; i++) {
				for(var j = 0; j < cur.data[0].length; j++) {
					if(check(cur.origin, i, j)) {
						if(gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
							gameData[cur.origin.x + i][cur.origin.y + j] = 1;
						}
					}
				}
			};
			refreshDiv(gameData, gameDivs);
		},
		//使用下一个方块
		performNext = function(type, dir) {
			cur = next;
			setDate(cur);
			next = SquareFactory.prototype.make(type, dir);
			refreshDiv(gameData, gameDivs);
			refreshDiv(next.data, nextDivs);
		},
		//消行
		checkClear = function() {
			var scores = false;
			for(var i = gameData.length - 1; i >= 0; i--) {
				var clear = true;
				for(var j = 0; j < gameData[0].length; j++) {
					if(gameData[i][j] != 1) {
						clear = false;
						break;
					}
				}
				if(clear) {
					SCORE += 1;
					score(SCORE);
					for(var m = i; m > 0; m--) {
						for(var n = 0; n < gameData[0].length; n++) {
							gameData[m][n] = gameData[m - 1][n]
						}
					};
					for(var n = 0; n < gameData[0].length; n++) {
						gameData[0][n] = 0;
					};
					scores = true;
					i++;
				}
			};
		},
		score = function(s) {
			var score = s * 10;
			scoreEle.innerHTML = score;
		},
		//游戏结束
		checkGameOver = function() {
			var gameOver = false;
			for(var i = 0; i < gameData[0].length; i++) {
				if(gameData[1][i] == 1) {
					gameOver = true;
				}
			};
			return gameOver;
		},
		//显示游戏结束
		showOver = function() {
			var h = document.documentElement.clientHeight;
			over.style.height = h + 'px';
			over.style.display = 'block'
		},
		hideOver = function() {
			over.style.display = 'none';
			score(0);
		},
		//初始化
		init = function(doms, type, dir) {
			gameDiv = doms.gameDivs;
			nextDiv = doms.nextDivs;
			scoreEle = doms.score1;
			over = doms.over;
			hideOver();
				next = SquareFactory.prototype.make(type, dir);
				initDiv(gameDiv, gameData, gameDivs);
				initDiv(nextDiv, next.data, nextDivs);
				refreshDiv(next.data, nextDivs);
		};
	//导出API
	this.init = init;
	this.down = down;
	this.left = left;
	this.right = right;
	this.rotate = rotate;
	this.fixed = fixed;
	this.performNext = performNext;
	this.checkClear = checkClear;
	this.checkGameOver = checkGameOver;
	this.showOver = showOver;
	this.clearData = clearData;
	this.fall = function() {
		while(down()) {
			down()
		}
	};
}
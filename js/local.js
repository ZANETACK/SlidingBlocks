
var Local = function(){
	//游戏对象
	var game, 
	//时间间隔
	INTERVAL = 800,
	//定时器
	timer = null,
	//绑定键盘事件
	bindKeyEvent  = function(){
		document.onkeydown = function(e){
			var k = e.keyCode;
			if(k == 38){//up
				game.rotate();
			}else if(k ==39 ){//right
				game.right();
			}else if(k ==40 ){//down
				game.down();
			}else if(k ==37 ){//left
				game.left()
			}else if(k ==32 ){//space
				game.fall();
			}
		}
	},
	//移动
	move = function(){
		if(!game.down()){
			game.fixed();
			game.checkClear();
			var gameOver = game.checkGameOver();
			if(gameOver){
				stop();
			}else{
				game.performNext(generateType(), generateDir());
			}
		};
	},
	//随机生成一个方块
	generateType = function(){
		return Math.ceil(Math.random() * 9) - 1;
	},
	//随机生成一个旋转次数
	generateDir = function(){
		return Math.ceil(Math.random() * 4) - 1;
	},
	//开始
	start = function(){
		var doms = {
			gameDivs: document.getElementById('game'),
			nextDivs: document.getElementById('next'),
			score1: document.getElementById('score1'),
			score2: document.getElementById('score2'),
			over:document.getElementById('over')
		};
		game = new Game;
		game.init(doms,generateType(), generateDir());
		bindKeyEvent();
		game.performNext(generateType(), generateDir());
		timer = setInterval(move, INTERVAL);
		this.down = game.down;
		this.left = game.left;
		this.right = game.right;
		this.rotate = game.rotate;
		this.clearData = game.clearData;
	},
	//结束
	stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		};
		document.onkeydown = null;
		game.showOver();
	};
	//导出API
	this.start = start;
}

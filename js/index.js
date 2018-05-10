var local = new Local();
local.start();
//按钮事件 
var left = id('left'),
	right = id('right'),
	rotate = id('rotate'),
	down = id('down'),
	startGame = id('startGame'),
	cancelGame = id('cancelGame');
var serInterDown, serInterLeft, serInterRight;

btnStyle(left, function(type, e) {
	if(type == 'start') {
		serInterLeft = setInterval(function() {
			local.left();
		}, 70)
	};
	if(type == 'end') {
		clearInterval(serInterLeft)
	}
});
btnStyle(right, function(type, e) {
	if(type == 'start') {
		serInterRight = setInterval(function() {
			local.right();
		}, 70)
	};
	if(type == 'end') {
		clearInterval(serInterRight)
	}
});
btnStyle(rotate, function(type, e) {
	if(type == 'end') {
		local.rotate();
	}
});
btnStyle(down, function(type, e) {
	if(type == 'start') {
		serInterDown = setInterval(function() {
			local.down();
		}, 20)
	};
	if(type == 'end') {
		clearInterval(serInterDown)
	}
});
startGame.onclick=function(){
	local.clearData();
	local.start();
}
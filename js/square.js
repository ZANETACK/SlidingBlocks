var Square = function() {
	//方块数
	this.data = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	//原点
	this.origin = {
		x: 0,
		y: 0
	};
	//方向
	this.dir = 0;
};
Square.prototype = {
	canDown: function(isValid) {
		var test = {};
		test.x = this.origin.x + 1;
		test.y = this.origin.y;
		return isValid(test, this.data);
	},
	down: function() {
		this.origin.x = this.origin.x + 1;
	},
	canLeft: function(isValid) {
		var test = {};
		test.x = this.origin.x;
		test.y = this.origin.y - 1;
		return isValid(test, this.data);
	},
	left: function() {
		this.origin.y = this.origin.y - 1;
	},
	canRight: function(isValid) {
		var test = {};
		test.x = this.origin.x;
		test.y = this.origin.y + 1;
		return isValid(test, this.data);
	},
	right: function() {
		this.origin.y = this.origin.y + 1;
	},
	canRotate: function(isValid) {
		var d = (this.dir + 1) % 4;
		var test = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		for(var i=0;i<this.data.length;i++){
			for(var j=0;j<this.data[0].length;j++){
				test[i][j] = this.rotates[d][i][j];
			}
		}
		return isValid(this.origin, test);
	},
	rotate: function(num) {
		if(!num) num = 1;
		this.dir = (this.dir + num) % 4;
		for(var i=0;i<this.data.length;i++){
			for(var j=0;j<this.data[0].length;j++){
				this.data[i][j] = this.rotates[this.dir][i][j];
			}
		}
	}
}
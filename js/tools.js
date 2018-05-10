(function(w) {
	//获取id
	w.id = function(ele) {
		return document.getElementById(ele)
	};
	//按钮特效
	w.btnStyle = function(ele,callback) {
		ele.ontouchstart = function(e) {
			ele.style.boxShadow = '0px 2px 4px 1px #1b1e2f'
			callback('start',e)
		};
		ele.ontouchend = function(e) {
			ele.style.boxShadow = '0px 4px 4px 1px #1b1e2f',
			callback('end',e)
		}
	}
})(window)
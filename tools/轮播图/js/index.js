//轮播图滚动的方法
var scrollPic = function(){
	// banner
	var banner = document.getElementsByClassName("i-banner")[0];
	// 图片的宽度
	var width = banner.offsetWidth;

	//图片盒子
	var imgBox = banner.getElementsByTagName("ul")[0];

	//小圆点盒子
	var pointBox = banner.getElementsByTagName("ul")[1];

	//小圆点数组
	var pointList = pointBox.getElementsByTagName("li");

	var  index = 1;
	var timer ;
	//手指滑动效果
	var startX = 0;
	var moveX = 0;
	var endX = 0;

	//定义一个过渡函数
	//图片的盒子定义过渡效果
	var addTransition = function(){
		imgBox.style.transition = "all .3s ease 0s";
		imgBox.style.webkitTransition = "all .3s ease 0s";
	} 

	//去掉过渡函数
	var removeTransition = function(){
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	} 

	//盛放图片的盒子改变位置
	var setTransform = function(t){
		imgBox.style.transform = "translate("+t+"px)";
		imgBox.style.webkitTransform = "translate("+t+"px)";
	} 

	//小圆点变化
	var setpoint = function(n){
		//首先把所有的圆点类名置为空
		for (var i = 0; i < pointList.length; i++) {
			pointList[i].className = '';
		};
		//对于n做一个判断，当到达最后一个点的时候，下一次转成第一个
		//当 n 小于 0 的时候  就放到最后一个点上
		if (n >= 5) {
			n = 1;
		}else if(n <= 0){
			n = 4;
		}
		//因为index 从0 开始计算，所以 用到 n-1
		pointList[n-1].className ='on';
	}


	//定时器
	timer = setInterval(function(){
		/* 
		 * index代表开始的序号
		 * width的代表每张图片的宽度
		 * */
		index++;
		//添加过渡效果
		addTransition();
		//盛放图片的ul改变位置
		setTransform(-index*width);
		//调用小圆点变化函数
		setpoint(index);
	}, 3000)

	//监听函数
	//transitionend 事件 在 CSS 完成过渡后触发。
	imgBox.addEventListener('transitionEnd', function(){
		//对序号做判断
		if (index >= 5) {
			index = 1;
		}else if(index <= 0){
			index = 4;
		}

		removeTransition();
		//盛放图片的ul改变位置
		setTransform(-index*width);
	},false)
	// 加webkit前缀，做兼容性调试
	imgBox.addEventListener('webkitTransitionEnd', function(){
		if (index >= 5) {
			index = 1;
		}else if(index <= 0){
			index = 4;
		}

		removeTransition();
		setTransform(-index*width);
	},false)



	//触摸事件开始
	imgBox.addEventListener('touchstart', function(e){
		// 记录开始的位置
		startX = e.touches[0].clientX;
	})

	//触摸滑动事件开始
	imgBox.addEventListener('touchmove', function(e){
		//清除定时器
		clearInterval(timer);
		// 清除默认的滚动事件
		e.preventDefault();
		// 记录开始的位置
		endX = e.touches[0].clientX;
		//记录移动的位置
		moveX = startX - endX;

		removeTransition();
		setTransform(-index * width - moveX)
	})

	//触摸滑动事件结束
	imgBox.addEventListener('touchend', function(e){
		//如果移动的距离大雨三分之一是
		if( Math.abs(moveX) > (1/3*width) && endX != 0){
			// 向左
			if (moveX > 0) {
				index++;
			}else{
				index--;
			}
			// 改变位置
			setTransform(-index*width);
			setpoint(index);

		}

		// 回到原来的位置
		addTransition();
		setTransform(-index*width);

		startX = 0;
		endX = 0;

		clearInterval(timer);

		//定时器
		timer = setInterval(function(){
			index++;
			addTransition();
			setTransform(-index*width);
			setpoint(index);
		}, 3000)

	})

}

//最后 调用 banner方法
scrollPic();
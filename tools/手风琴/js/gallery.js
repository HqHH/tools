
//

function Xygallery(id,option){
//				2.1获取id
	var container = document.getElementById('xy-gallery');
//				2.2判断id里面有没有xy-gallery样式,如果没有则添加
	if(container.className.indexOf('xy-gallery') == -1) container.className += ' xy-gallery';
	
//				2.3格子会遇到的状态 写进一个数组里面  选择数组option

	var stateOption = {
		activeWidth:340,
		activeHeight:400,
		defaultWidth:130,
		defaultHeight:40
	}
	
//				2.4汇总 盒子状态,用户传的行列
//				Object.assign()  继承对象属性 
	option = Object.assign({},stateOption,option);
//				2.5如果没有传行列，或者传的行列数大于图片的总数量则报错
	if(option.width && option.height && option.width*option.height != container.children.length) throw "width and weight not null or not greater than";
	console.log(option)
	
//				定时随机激活一个
	setInterval(function(){
		var loop = Math.floor(Math.random()*21)
		activePhoto(loop)
		
	},4000)
	
	

//				获取时间
	var lastTime = new Date(0);
	var runId = 0;
	
	
	//3,封装激活图片的方法
	function activePhoto(index){
		
//					清楚计时器
		clearTimeout(runId);
		
//					获取现在时间
		var isDate = new Date();
		
//					如果现在与外面个时间的间隔小于3秒则进行操作,否则不动
		if(isDate - lastTime < 300){
			runId = setTimeout(function(){
				activePhoto(index);
			})
			
			return;
		}
//					时间调回一致
		lastTime = isDate;
		
		
		//3.1传入值用取余   取商的方法赋值给x坐标y坐标
		var ix = index%option.width
		var iy = Math.floor(index/option.width)
//					console.log(ix,iy)		
		
		//3.4设置容器的宽度        传入的列减去1乘以未激活的宽度+一个激活的宽度
		container.style.width = (option.width-1)*option.defaultWidth+option.activeWidth+'px';
		
		for	(var y=0;y<option.height;y++){
			for( var x=0 ; x<option.width;x++){
				//3.2获取0-19的下标数，把所有下标的元素给一个变量
				var cindex = y*option.width+x
				var item = container.children[cindex]
				if(ix == x && iy == y){
					item.style.width = option.activeWidth+'px'
					item.style.height = option.activeHeight+'px'	
				}else if(ix == x){
					item.style.width = option.activeWidth+'px'
					item.style.height = option.defaultHeight+'px'	
					
				}else if(iy == y){
					item.style.height = option.activeHeight+'px'	
					item.style.width = option.defaultWidth+'px'	
				}else{
					item.style.height = option.defaultHeight+'px'	
					item.style.width = option.defaultWidth+'px'	
				}	
			}	
		}
	}
	//默认激活一个
	activePhoto(0)
	Array.prototype.forEach.call(container.children,function(item,index){
		
//					console.log(item,index)
		item.addEventListener('mouseenter',function(){
			activePhoto(index)
		})
		
	})
	

	
}	
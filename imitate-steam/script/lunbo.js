var oBox=document.getElementById("box");
	var oUl=oBox.getElementsByTagName("ul");
	var oImage=oUl[0].getElementsByTagName("li");
	var oNumber=oUl[1].getElementsByTagName("li");
	var index=0;
	var timer=null; //用于实现淡入淡出
	var play_timer=null;//用于实现自动的计时器

	for(var i=0;i<oNumber.length;i++){
		oNumber[i].index=i;
		oNumber[i].onmouseover=function(){
			show(this.index);
		}
	}

	function show(x){
		for(var i=0;i<oNumber.length;i++){
			oNumber[i].className="";
			// oImage[i].className="";
			//我们发现以上的""的css元素已经被我们改变，因此这种方法不行。
			oImage[i].style["opacity"]=0;
			//上面这句等同于 oImage[i].style.opacity=0;
			oImage[i].style.filter="alpha(opacity=0)";

		}
		oNumber[x].className="current";
		// oImage[x].className="current";
		//注释掉上方，开始我们不突兀的淡入淡出轮播

		var alpha=0;
		//变量记录透明度变化(淡入淡出实现的根本)
		clearInterval(timer);
		//停止计时器，自行体会，主要用于切换之中
		timer=setInterval(function(){
			alpha+=2;
			alpha>100  &&  (alpha=100);
			oImage[x].style.opacity=alpha/100;
			alpha==100 && clearInterval(timer);
		},20);

		index=x;
	}


	oBox.onmouseover=function(){
		clearInterval(play_timer);
	}
	function Auto(){
		play_timer=setInterval(function(){
			if(index<oNumber.length-1){
				index++;
			}else{
				index=0;
			}

			show(index);
		},2000);
	}
	oBox.onmouseout=function(){
		Auto();
	}
	Auto();


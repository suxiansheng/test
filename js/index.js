$(function () {
	var tou = document.querySelector('#tou');
	var shen = document.querySelector('#shen');
	tou.addEventListener('mouseover', function () {
		if (shen.offsetHeight == 0) {
			shen.style.height = "465px";
		};
	});
	tou.addEventListener('mouseout', function () {
		if (shen.offsetHeight == 465) {
			shen.style.height = "0px";
		};
	});


	var arrow_l = document.querySelector('.arrow_l');
	var arrow_r = document.querySelector('.arrow_r');
	var focus = document.querySelector('.focus');
	var foucswidth = focus.offsetWidth; //宽方向长度 width + 左右padding + 左右border-width
	focus.addEventListener('mouseenter', function () { //鼠标经过事件 
		arrow_l.style.display = 'block'; //左小箭头 显示
		arrow_r.style.display = 'block'; //右小箭头 显示
		clearInterval(timer); //销毁定时器
		timer = null; //清空定时器变量值
	});
	focus.addEventListener('mouseleave', function () { //鼠标离开事件
		arrow_l.style.display = 'none'; //左小箭头 影藏
		arrow_r.style.display = 'none'; //右小箭头 影藏
		timer = setInterval(function () { //定时器变量重新赋值,调用点击右按钮事件,定时2s一次
			arrow_r.click(); //右箭头点击事件
		}, 2000); //定时器周期时间
	});
	var ul = focus.querySelector('ul');
	var ol = focus.querySelector('.circle');
	for (var i = 0; i < ul.children.length; i++) { //遍历多少张图
		var li = document.createElement('li'); //创建元素li也就是ol里面的小圆点
		li.setAttribute('index', i); //在小圆点上加上自定义属性,值为循环次数
		ol.appendChild(li); //ol添加上小圆点li 依次往后添加
		li.addEventListener('click', function () { //小圆点li 的点击事件
			for (var i = 0; i < ol.children.length; i++) { //循环遍历小圆点个数
				ol.children[i].className = ''; //清空小圆点的选中CSS样式
			};
			this.className = 'current'; //给当前点击的小圆点li添加选中current样式
			var index = this.getAttribute('index'); //获取当前点击的小圆点li的index 属性值
			num = circle = index; //将小圆点li的index属性值 赋值给 num 和circle
			anminate(ul, -index * foucswidth); //动画函数,远动元素自然是ul(包裹图片的ul),参数为小圆点的index值(也就是第几个)乘以宽度
		});
	};
	// ol.children[0].className = 'current';
	var first = ul.children[0].cloneNode(true); //深度复制第一个图的li
	ul.appendChild(first); //继续将其创建到ul最后
	var num = 0;
	var circle = 0;
	var flag = true;
	arrow_r.addEventListener('click', function () { //右侧小图标点击事件
		if (flag) {
			flag = false; //控制点击频率,每次点击都会强制为假,执行完动画自会重新赋值为真
			if (num == ul.children.length - 1) { //判断 图片的个数-1(因为多创建了第一个元素放到最后所以减一) 是否等于num变量

				ul.style.left = 0; //如果相等则瞬间调回ul的left值为0 ,相当于跳回第一张图
				num = 0; //然后继续清空num 
			};
			num++; //每点击一下 num则+1
			anminate(ul, -num * foucswidth, function () { //动画函数 ul(包裹所有图片)的运动,运动的长度= 负的li长度*num
				flag = true; //控制点击频率,点完才会让判断值为真
			});
			circle++; //图片序号传值给函数使用
			circle = circle == ol.children.length ? circle = 0 : circle; //判断传值是否等于小圆点个数,若等于就重新为0 ,否则正常返回
			circlechange(); //调用小圆点样式判断变化函数
		}
	});
	arrow_l.addEventListener('click', function () {
		if (flag) {
			flag = false;
			if (num == 0) {
				num = ul.children.length - 1;
				ul.style.left = -num * foucswidth + 'px';
			};
			num--;
			anminate(ul, -num * foucswidth, function () {
				flag = true;
			});
			circle--;
			circle = circle < 0 ? circle = ol.children.length - 1 : circle;
			circlechange();
		}
	});

	function circlechange() { //让每次点击都清除所有小圆点选中样式,然后让当前的添加样式,关键在于circle的传值与图片数组序号相同
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		};
		ol.children[circle].className = 'current';
	};

	var timer = setInterval(function () { //默认启动的轮播事件,自动执行2s一次的右按钮点击一次的事件
		arrow_r.click();
	}, 2000);
	var tooltop = $(".recommemd").offset().top;
	var flag = true;
	Rollingevent();
	toggletool();

	function toggletool() {
		if ($(document).scrollTop() >= tooltop) {
			$(".fixetool").fadeIn();
		} else {
			$(".fixetool").fadeOut();
		}
	};

	function Rollingevent() {
		if (flag) {
			$(".froor .w").each(function (i, n) {
				if ($(document).scrollTop() >= $(n).offset().top) {
					$(".fixetool li").eq(i).addClass("current").siblings().removeClass();
				}
			})
		}
	}
	$(window).scroll(function () {
		toggletool();
		Rollingevent();
	});

	$(".fixetool li").click(function () {
		flag = false;
		var current = $(".froor .w").eq($(this).index()).offset().top;
		$("body,html").stop().animate({
			scrollTop: current
		}, function () {
			flag = true;
		})
		$(this).addClass("current").siblings().removeClass();
	});


})
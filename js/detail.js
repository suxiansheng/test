$(function () {
    $('.detail-tab-list li').click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        var index = $(this).index();
        $('.detail-tab-con .item').eq(index).show().siblings().hide();
    });
    var preview = document.querySelector('.preview-img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    preview.addEventListener('mousemove', function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskmax = preview.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskmax) {
            maskX = maskmax;
        };
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskmax) {
            maskY = maskmax;
        };
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        var bigimg = document.querySelector('.bigimg');
        var bigmax = bigimg.offsetWidth - big.offsetWidth;
        var bigx = maskX * bigmax / maskmax;
        var bigy = maskY * bigmax / maskmax;
        bigimg.style.left = -bigx + 'px';
        bigimg.style.top = -bigy + 'px';
    });
})
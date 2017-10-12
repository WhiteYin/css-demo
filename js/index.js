$(document).ready(
    function () {
        var navBox = $("#nav-box");
        var box = $('#show-box');
        var des = $('#description');
        var style = $('#editor');
        var boxClass = '';
        var canvas = document.querySelector("#canvas");
        var context = canvas.getContext("2d");

        //当鼠标移入下拉框区域，新增类样式.show
        navBox.bind('mouseenter', function () {
            $(this).addClass('show');
        });
        //当鼠标移入下拉框区域，删除类样式.show
        navBox.bind('mouseleave', function () {
            $(this).removeClass('show');
        });
        //选中某个选项
        $('.option').bind('click', function () {
            var that = $(this);
            //下拉框消失
            navBox.removeClass("show");
            //取选项的内容冒号前的部分，否则内容过长导致选择栏变形
            var text = that.text().split(':')[0];
            //文本更改为选项文本
            $('#nav-text').text(text);
            boxClass = that.attr('data-class');
            //清除原有的类
            box.attr('class', '');
            //展示div块添加指定的类
            box.addClass(boxClass);
        });
        //绘制直线
        $('#draw-lines').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.strokeStyle = '#f00';
            context.moveTo(40, 220);
            context.lineTo(100, 80);
            context.lineTo(350, 180);
            context.stroke();
        });
        //绘制不同粗细的直线
        $('#linewidth-lines').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            context.beginPath();
            context.lineWidth = 5;
            context.moveTo(10, 100);
            context.lineTo(300, 100);
            context.stroke();

            context.beginPath();
            context.lineWidth = 10;
            context.moveTo(10, 200);
            context.lineTo(300, 200);
            context.stroke();
            
            context.beginPath();
            context.lineWidth = 20;
            context.moveTo(10, 300);
            context.lineTo(300, 300);
            context.stroke();
        });
        //绘制字母M
        $("#draw-m").bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.lineWidth = 10;
            context.lineJoin = 'bavel';
            context.lineCap = 'round';
            
            context.moveTo(100, 350);
            context.lineTo(150, 100);
            context.lineTo(200, 350);
            context.lineTo(250, 100);
            context.lineTo(300, 350);
            context.stroke();
        });
        //绘制虚线
        $("#draw-dash").bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.lineWidth = 10;

            context.setLineDash([20, 10,10,10]);
            context.moveTo(100, 200);
            context.lineTo(300, 200);
            context.stroke();
        });
        //绘制三角形
        $('#draw-triangle').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.strokeStyle = '#0f0';
            context.lineJoin = 'round';
            context.moveTo(50,50);
            context.lineTo(250,350);
            context.lineTo(250, 50);
            context.closePath();
            context.stroke();
        });
        //绘制矩形
        $('#draw-rect').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.strokeStyle = '#aaf';
            context.strokeRect(50, 50, 200, 200);
            context.fillStyle = '#028';
            context.fillRect(100, 100, 150, 150);
            context.clearRect(180, 180, 50, 50);
        });
        //绘制圆形
        $('#draw-circle').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(100, 100, 50, 0, (3 / 2) * Math.PI, false);
            context.stroke();

            context.beginPath();
            context.arc(300, 300, 50, (4 / 3) * Math.PI, true);
            context.fill();
        });
        //使用arcTo绘制圆弧
        $('#draw-circle-arcto').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.moveTo(200, 100);
            context.lineTo(300, 100);
            context.arcTo(100, 100, 200, 400, 50);
            context.stroke();
        });
        //文本
        $('#draw-text').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            var text = "HELLO WORLD";
            context.font = "bold 20px 微软雅黑";
            context.textAlign = "left";
            context.strokeText(text, 100, 100);
            context.strokeText(text, 100, 150, 50);
            context.fillText(text, 100, 200);
            context.beginPath();
            context.textAlign = "center";
            context.strokeText(text, 100, 250);
        });
        //图片
        $('#draw-img').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();

            var img = new Image();
            img.src = '../img/avatar.jpg';
            //图片加载完再绘画
            img.onload = function () {
                context.drawImage(img, 200, 200, 100, 100);
                context.drawImage(img, 0, 0, 100, 100, 100, 100,100, 100);
            }
        });
        //图片平铺
        $('#draw-img-repeat').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();

            var img = new Image();
            img.src = '../img/avatar.jpg';
            //图片加载完再绘画
            img.onload = function () {
                var pattern = context.createPattern(img, 'repeat');
                context.fillStyle = pattern;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
        });
        //图片裁剪
        $('#clip-img').bind('click', function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(200, 200, 100, 0, 2 * Math.PI);
            
            context.clip();

            var img = new Image();
            img.src = '../img/avatar.jpg';
            img.onload = function () {
                context.drawImage(img, 100, 100);
            }
        })
    }
);
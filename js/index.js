$(document).ready(
    function () {
        var navBox = $("#nav-box");
        var box = $('#show-box');
        var des = $('#description');
        var style = $('#editor');
        var boxClass = '';

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
    }
);
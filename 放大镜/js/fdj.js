window.onload = function () {
    let left = document.querySelector(".left")
    let fdj = document.querySelector(".fdj")
    let right = document.querySelector(".right")
    let img = document.querySelector(".right img")
    let cover = document.querySelector(".cover")
    //拖拽功能(主要是触发三个事件：onmousedown\onmousemove\onmouseup)  
    var drag = document.getElementById('drag');  
  
    //点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)  
    drag.onmousedown = function(e) {  
        var e = e || window.event; //兼容ie浏览器  
        let diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
        let diffY = e.clientY - drag.offsetTop;  
  
            if(typeof drag.setCapture!='undefined'){  
                drag.setCapture();  
            }  
  
        document.onmousemove = function(e) {  
            var e = e || window.event; //兼容ie浏览器  
            let left=e.clientX-diffX;  
            let top=e.clientY-diffY;  
  
            //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条  
            if(left<0){  
                left=0;  
            }else if(left >window.innerWidth-drag.offsetWidth){  
                left = window.innerWidth-drag.offsetWidth;  
            }  
            if(top<0){  
                top=0;  
            }else if(top >window.innerHeight-drag.offsetHeight){  
                top = window.innerHeight-drag.offsetHeight;  
            }  
  
            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
            drag.style.left = left+ 'px';  
            drag.style.top = top + 'px';  
        };  
        document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动  
            this.onmousemove = null;  
            this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
  
            //修复低版本ie bug  
            if(typeof drag.releaseCapture!='undefined'){  
                drag.releaseCapture();  
            }  
        };  
    };  
    cover.onmousemove = function(e){
         //获取事件对象
        let ev = window.event || e
        //获取鼠标位置
        let mouseleft = ev.offsetX
        let mousertop = ev.offsetY
        //计算遮罩位置
        let fdjleft = mouseleft - 110;
        let fdjtop = mousertop - 100;
        //判断
        if (fdjleft<0) {
            fdjleft = 0
        }
        if (fdjleft > 180) {
            fdjleft = 180
        }
        if (fdjtop < 0) {
            fdjtop = 0
        }
        if (fdjtop > 200) {
            fdjtop = 200
        }
        //移动遮罩
        fdj.style.left = fdjleft + 'px'
        fdj.style.top = fdjtop + 'px'
        //计算右侧图片位置
        let rightleft = fdjleft * -2
        let righttop = fdjtop * -2
        //让右侧图片移动
        img.style.left = rightleft + 'px'
        img.style.top = righttop + 'px'
    }
    left.onmouseenter = function () {
        fdj.style.display = "block"
        right.style.display = "block"
    }
    left.onmouseleave = function () {
        fdj.style.display = "none"
        right.style.display = "none"
    }
}

define(["zepto","zeptoTouch","iscrollProbe","require","exports","module"],function($,zT,iscrollProbe,require,exports,module) {//定义一个模块
    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of a's properties until after b returns a value.
    //console.log($,zT,IScroll,exports);

    return function(jsonData){
        /*
         type:请求类型,
         url:请求地址,
         data:发送的数据,
         error:function(xhr,status,error){

         },
         success:function(data){

         }
         */
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止浏览器的默认行为

        var myScroll=new IScroll(".container",{
            /*scrollbars:true,//滚动条
             mouseWheel:false,//滚轮是否开启
             interactiveScrollbars:true,//是否可拖拽滚动条
             shrinkScrollbars:"scale",//滚动条有弹性
             bounce:true,//网页的反弹
             startY:0,//设置初始滚动位置
             scrollX:false,//默认值,设置水平不滚动
             scrollY:true,//默认值,设置垂直默认滚动*/
            probeType:1,//1滚动不繁忙时触发，2表示隔一段时间出发，3表示每一像素触发
            click:true//让a连接跳转有效
        });

        var webScrollObj={
            appendNode:$('.append'),
            loadNode:$('.reload'),
            reLoadBool:false,
            appendBool:false
        };

        myScroll.on("scroll",function(){
            var loadAppendHeight=webScrollObj.loadNode.height();//得到加载更多的高度
            //console.log(this.y,loadAppendHeight,this.wrapperHeight,this.maxScrollY);//this.y滚去的距离;//this.wrapperHeight可视区域;this.maxScrollY可以滚动的最大高度
            if(this.y>loadAppendHeight)//刷新
            {
                webScrollObj.loadNode.text('松开刷新');
                webScrollObj.reLoadBool=true;
            }
            else if(this.y-this.maxScrollY<-loadAppendHeight*1.5)//加载更多
            {
                //console.log(11);
                webScrollObj.appendNode.text('松开加载');
                webScrollObj.appendBool=true;
            }

            if(this.maxScrollY==0){//判断是否现实加载更多的文字
                webScrollObj.appendNode.hide();
            }
            else{
                webScrollObj.appendNode.show();
            }

        });

        myScroll.on("scrollEnd",function(){
            if(webScrollObj.reLoadBool){//下拉刷新
                window.location.reload();
            }

            var that=this;
            if(webScrollObj.appendBool){//加载更多，请求ajax
                webScrollObj.appendBool=false;
                $.ajax({
                    type:jsonData.type?jsonData.type:"get",
                    url:jsonData.url,
                    data:jsonData.data?jsonData.data:"",
                    dataType:'json',
                    success:function(arr){
                        jsonData.success(arr,$,webScrollObj);
                        that.refresh();//（更新）重新计算滚动高度。
                    },
                    error:function(a,b,c){
                        alert("请求有误，稍后重试");
                    }
                });
            }
        });
    };
});
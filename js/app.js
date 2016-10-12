////////////////加载模块用
requirejs.config({
    baseUrl:"js/",//配置基础路径
    //urlArgs:"v=1.2.2",//对所有的js文件加版本信息
    paths:{
        zepto:"lib/zepto.min",//起别名
        zeptoTouch:'lib/zepto-touch',
        iscrollProbe:"lib/iscroll-probe",
        scrollAppendMore:"scrollAppendMore.js?v=1.0.1"
    },
    shim:{ //如果js文件不支持AMD
        'iscrollProbe': {
            exports: 'iscrollProbe'
        }
    }
});

function loactionFileUrl(){//判断是哪个html文件
    var loactionUrl=location.href;
    var endPos=loactionUrl.lastIndexOf(".");
    if(endPos==-1)
    {
        return "index";
    }

    var startPos=loactionUrl.lastIndexOf("/",endPos)+1;
    return loactionUrl.substring(startPos,endPos);
}

if(loactionFileUrl()=="car_sale"){
    requirejs(['scrollAppendMore'],function(scrollAppendMore){//得到模块
        scrollAppendMore({
            type:"get",
            url:"json/json.json",
            dataType:'json',
            success:function(arr,$,webScrollObj){
                var divWapper=$('<div/>');

                for(var i in arr){
                    var divNode=$('<div/>');//创建div
                    divNode.attr('class',"clist");
                    var aNode=$("<a/>");
                    aNode.attr('href',arr[i].aLink);

                    var imgNode=$("<img/>");
                    imgNode.attr('src',arr[i].carSrc);
                    imgNode.attr('class',arr[i].imgClass);
                    aNode.append(imgNode);

                    var h3Node=$("<h3/>");
                    h3Node.html(arr[i].h3Cnt);
                    aNode.append(h3Node);

                    var span1Node=$("<span/>");
                    span1Node.html(arr[i].priceNum);
                    span1Node.attr('class',arr[i].span1Class);
                    aNode.append(span1Node);
                    var span2Node=$("<span/>");
                    span2Node.html(arr[i].priceUnit);
                    span2Node.attr('class',arr[i].span2Class);
                    aNode.append(span2Node);
                    var span3Node=$("<span/>");
                    span3Node.html(arr[i].watch);
                    span3Node.attr('class',arr[i].span3Class);
                    aNode.append(span3Node);
                    divNode.append(aNode);
                    divWapper.append(divNode);
                }
                $('#list').append(divWapper.html());
                divWapper=null;
                webScrollObj.appendNode.text('更多加载');
            },
            error:function(a,b,c){
                alert("请求有误，稍后重试");
            }
        });
    });
}


requirejs(["iscrollProbe"],function(iscrollProbe){
    console.log(iscrollProbe,IScroll);
});
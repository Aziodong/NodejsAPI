/**
 * Created by 董 on 2015/9/16.
 */
/*
 socket是建立在TCP和IP之上的，可以理解为一个空洞和管道，通过它发送数据和接收数据。
 HTTP协议中的数据是利用TCP协议传输的，所以支持HTTP也就一定支持TCP。好了，不讲太多，下面看一下node.js中对应这些概念的模块有哪些。
 net模块可以建立TCP的服务器端和Socket客户端。
 http模块通过这个模块是建立http的服务器端和客户端，http模块建立在net模块之上。
 https模块通过这个模块可以建立https的服务器端和客户端，https模块建立在http模块和tls模块之上（tls模块在“加密解密”一章有详解）
 dgram模块这个模块对应的就是UDP协议的操作。
*/

//Socket是什么
//所谓socket通常也称作"套接字"，应用程序通常通过"套接字"向网络发出请求或者应答网络请求。
//形象的描述是，socket是一个管道两端的口，当客户端和服务器建立连接后，这个管道就形成了，那么两端可以通过socket（口）写入和读取数据到另一端。

//socket服务端
var net=require('net');
var server =net.createServer(function(socket){
    console.log('有客户进入');

    //和客户打招呼
    socket.write("你好啊");

    //打印来自客户端的信息
    socket.on('data',function(data){
        console.log(data.toString());
    });

    //监听error或end事件
    socket.on('error',function(){
        console.log("客户已断开");
    });
    socket.on('end',function(){
        console.log("客户已断开");
    });
});
//监听8124断开等待客户访问
server.listen(8124,function(){
    console.log('启动服务');
});

//客户端程序
var socket= net.connect({port:8124},function(){
    console.log("连接服务器成功!");
    process.stdin.on('data',function(str){
        //输入quit时关闭客户端
        if(str.toString("utf8").trim()=="quit"){
            process.exit(1);//退出客户端
        }else{
            //把数据发送到服务器端
            socket.wri(str);
        }
    })
})
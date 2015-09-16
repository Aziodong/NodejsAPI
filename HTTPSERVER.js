/**
 * Created by 董 on 2015/9/16.
 */
var http=require('http');
var server=http.createServer(function(incoming,response){
    response.write('hello');
    response.end();
});
server.on("connection",function(){
    console.log("qidong！");
})
server.listen(8080);
//server对象是http.Server实例，incomingMsg对象是http.IncomingMessage实例,response对象是http.ServerResponse实例。

//http.Server类
//http.Server是net.Server的子类。
//事件
//request
//有客户访问请求数据库资源时，会产生这个事件，这个事件的监听器可接收两个参数，incomingMessage和response.
// 前面的http.createServer(function(incomingMsg,response)...) 也是加入一个监听器。
//connection
//'connection'事件和net.Server的一致，可参阅。监听器会接收到一个socket，和net.Server一致，也可通过incomingMessage.socket得到。
//close
//'close'事件是当服务器关闭时产生
//checkContinue
//'checkContinue' 事件，是当客户端发送 Expect:100-continue 请求时产生的事件，
// 客户之所以这么做，是先要请求一下服务器是否同意继续发送主体内容，这个一般不会用到，有兴趣的可以搜索一下 Expect:100-continue 相关资料。
//connect
//'connect'事件，是当客户请求方法是"CONNECT"时，会产生的事件，下面写个例子：
/*
// 服务器
 var http = require("http");
 var server = http.createServer();
 server.on("connect",function(req,socket,head){
 ......
 })
 server.listen(8080)

 // 客户端
 var http = require("http");
 var req = http.request({
 port:8080,
 method:"CONNECT"
 },function(res){
 ......
 })
 req.end();
*/

//upgrade
//'upgrade' 事件，是当请求头部信息有 upgrade 属性时产生这个事件。例如的html5 websocket协议，请求时就会产生这个事件。

//clientError
//'clientError'事件，是客户端出现异常时抛出，这里的异常并不能通过request.destory来模拟，只能通过throw抛出异常来模拟，看例子：

/*
var http = require("http");
var server = http.createServer();
server.on("clientError",function(exception,socket){
    console.log("客户端有错误")
})
server.listen(8080)

// 客户端
var http = require("http");
var req = http.request(8080)
setTimeout(function(){
    throw new Error(); // 抛出异常
},1000);
*/

//server.listen(port, [hostname], [backlog], [callback])
//port 参数，是打开一个服务器端的监听端口，如果是0，表示由系统分配一个随机端口。
//host[可选]参数，表示主机名，如果设置localhost那么就拒绝通过127.0.0.1访问服务器的客户端。
//backlog[可选]参数，表示同时访问的最大数，默认511。
//callback[可选]参数，回调函数，http server已经准备妥当时会调用它。

//server.close([callback])

//server.setTimeout(msecs,callback)
//设置客户端空闲超时的监听器。注意，这个不是设置服务器超时,而是指客户端与服务器建立的socket超时。
// msecs以毫秒为单位，callback(socket) 是超时监听器，监听器会获得一个socket参数。server.timeout值默认是120000毫秒。

var http=require('http');
var socket=require('net').Socket;
var server=http.createServer();
server.on('request',function(req,res){
    //不调用res.end来模拟超时
});

server.timeout=3000;
server.on("timeout",funtion(s){
    console.log(s instanceof socket);//true
});

server.listen(8080);

//写法2

server.on('request',function(req,res){
    //不调用res.end模拟超时
});
server.setTimeout(5000.function(s){
    console.log(s instanceof socket);//true
});

server.listen(8080);
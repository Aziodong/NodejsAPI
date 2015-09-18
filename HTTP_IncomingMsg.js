/**
 * Created by 董 on 2015/9/18.
 */
var http=require('http');
/*
//request是msg对象
var server= http.createServer(function(reuest,response){

});

var server= http.createServer();

server.on('request',function(request,response){

});

//response是msg对象
var request= http.request(options,function(response){

});

var request= http.request(options);
request.on('response',function(response){

});

var request=http.get(options,function(response){

});

 msg并不一定代表请求对象，有时候也代表响应对象。msg可以理解为另一端socket发送来（或返回来）的数据，
 所以http.IncomingMessage是stream.Readable的子类，也就是只读的。
*/

//事件
//data
//当接收到数据时会产生这个事件，事件监听器会接收到数据。注意，如果不对这个事件添加监听器，那么数据会丢失。
//incomingMessage.on('data',function(chunk){ ... });

//end
//如果在这个之后不会再产生数据了，那么就会发出这个事件。这个事件只发生一次。
//incomingMessage.on('end',function(){ ... })

//close
//这个事件的产生是当服务器端response.end() 调用之前客户端关闭造成的。看如下代码：
/*
* var http = require("http");
 var server = http.createServer();
 server.on("request",function(req,res){

 req.on("close",function(){
 console.log("close")
 })
 res.write("hello!");
 // res.end();
 })
 server.listen(8080);
* */

//属性
//header;得到头部信息
/*
var server=http.createServer();
server.on('request', function (req, res) {
    console.log(req.headers);
    res.end();
}).listen(8080);
*/

//请求头部属性
/*
* host , 客户端指定自己想访问的WEB服务器的域名/IP 地址和端口号。
*
* connection , 有两个值close（告诉WEB服务器或者代理服务器，在完成本次请求的响应后，断开连接，不要等待本次连接的后续请求了）。keepalive（告诉WEB服务器或者代理服务器，在完成本次请求的响应后，保持连接，等待本次连接的后续请求）。
*
* accept, 告诉WEB服务器自己接受什么介质类型， /表示任何类型，type/* 表示该类型下的所有子类型，type/sub-type。
*
* user-agent, 浏览器表明自己的身份（是哪种浏览器）。
*
* accept-encoding , 浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法  （gzip，deflate）
*
* accept-language , 浏览器申明自己接收的语言跟字符集的区别。
*
* accept-charset , 浏览器申明自己接收的字符集。
* */

//响应头
/*
var req = http.get("http://www.iqiyi.com/"
    ,function(res){
        console.log(res.headers)
    })
*/
/*
* Cache- Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置 Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store、max-age、 max-stale、min-fresh、only-if-cached，响应消息中的指令包括public、private、no-cache、no- store、no-transform、must-revalidate、proxy-revalidate、max-age。各个消息中的指令含义如 下： Public指示响应可被任何缓存区缓存。Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。 no-cache指示请求或响应消息不能缓存 no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应。max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。
* set-cookie设置和页面关联的Cookie。
* expires 指定应该在什么时候认为文档已经过期，从而不再缓存它。
* server 服务器名字。
* content-length  表示内容长度。
* x-xss-protection  XSS筛选器,主要用于防御反射型跨站攻击，网站一般都会设置为 0 。
* x-frame-options 可用于指示是否应该允许浏览器呈现在一个页面FRAME 或 IFRAME 中。 以确保网站内容是不是嵌入到其它网站。使用X-Frame-Options 有两种可能的值：DENY ：该页无法显示在一个框架中。SAMEORIGHT ：页面只能显示在页面本网站的框架中。
* */

//msg.httpVersion :http版本
//msg.method :请求方法GET/POST
//msg.url请求的URL
//msg.statusCode :响应状态，存在于响应对象中

var server =http.createServer();
server.on('request',function(req,res){
    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.url);
    res.end();
});
server.listen(8080);

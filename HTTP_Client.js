/**
 * Created by 董 on 2015/9/18.
 */
//两种方式:有两种方式创建http客户端，http.request(options[, callback])和 http.get(options, callback) 。

//http.request(options, callback)
/*
options：

protocol: Protocol to use. Defaults to 'http'.
 host: A domain name or IP address of the server to issue the request to. Defaults to 'localhost'.
 hostname: Alias for host. To support url.parse() hostname is preferred over host.
 family: IP address family to use when resolving host and hostname. Valid values are 4 or 6. When unspecified, both IP v4 and v6 will be used.
 port: Port of remote server. Defaults to 80.
 localAddress: Local interface to bind for network connections.
 socketPath: Unix Domain Socket (use one of host:port or socketPath).
 method: A string specifying the HTTP request method. Defaults to 'GET'.
 path: Request path. Defaults to '/'. Should include query string if any. E.G. '/index.html?page=12'. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future.
 headers: An object containing request headers.
 auth: Basic authentication i.e. 'user:password' to compute an Authorization header.
 agent: Controls Agent behavior. When an Agent is used request will default to Connection: keep-alive. Possible values:
 undefined (default): use globalAgent for this host and port.
 Agent object: explicitly use the passed in Agent.
 false: opts out of connection pooling with an Agent, defaults request to Connection: close.
 */

var http=require('http');

var req=http.request({host:'www.baidu.com'},function(res){
    console.log(res.headers);
});

req.end()

var req2=http.request('www.baidu.com',function(res){
    console.log(res.headers);
});

req2.end();

//http.get(options[, callback])
//这个方法是起到方便作用的，它无非就是设置 options.method = GET, 还会调用一下 req.end。 下面写两段代码，作用都是一样的。
/*
* var http = require("http");
 var req = http.get("http://www.google.com"
 ,function(res){
 console.log(res.headers)
 })

 var http = require("http");
 var req = http.request({host:"www.google.com"}
 ,function(res){
 console.log(res.headers)
 })
 req.end();

* */

//通过http.request方法返回了一个http.ClientRequest对象，ClientRequest对象是stream.Writable子类。下面就对该对象进行详细讲解。

//response事件
//当服务器有响应时会产生response事件。此事件的监听器会接收到一个响应对象，这个响应对象是一个http.IncomingMessage对象。
// http.request方法的第二个参数实际上就是这个事件的监听器。
/*
* var http = require("http");
 var req = http.request({host:"www.google.com"})
 req.on("response",function(res){
 ... ...
 })
 req.end();
* */

//socket事件
//请求对象建立好后，内部会创建一个net.Socket对象，然后会激发该事件，socket事件的监听器接收的参数就是该socket对象，该事件无论是否调用req.end()都会产生。
//req.on('socket',function(socket){});

//"connect","upgrade"和"continue" 事件
//客户端通过connect，upgrade或continue方式访问服务器，如果收到服务器的回应，就会激发对应的事件。
/*
* req.on('connect', function(res, socket, head) {
 console.log('got connected!');
 }

 req.on('upgrade', function(res, socket, head) {
 console.log('got upgraded!');
 }

 req.on('continue',function(){

 })
* */

//request.write(chunk, [encoding])
//这个方法会发送一大块的数据chunk，chunk可以是Buffer或String类型，可多次调用这个方法，
//encoding[可选]参数，chunk是字符串时是通过这个参数进行编码后发送出去的，encoding默认是utf8。

//request.end([data], [encoding])
//完成请求发送

//request.abort()
//终止请求


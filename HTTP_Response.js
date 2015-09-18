/**
 * Created by 董 on 2015/9/18.
 */
var http=require('http');
/*
* 之所以叫服务器端响应对象是区别于客户端响应对象的，因为客户端的响应对象res是个IncomingMessage对象，也就是只读对象，而InomingMessage是stream.Readable子类，
* 而服务器端响应对象res是http.ServerResponse对象，是可写对象，而ServerResponse是stream.Writable子类。
* */
/*

var server=http.createServer();
server.on('request',function(req,res){
    //服务器res是ServerResponse对象
    res.end();
});

var req=http.request({host:'www.baidu.com'});
req.on('response',function(res){
    //客户端res是IncomingMessage对象
})
*/

//response对象它只定义了close事件，这个事件的产生是当客户端非正常关闭所产生的，res.end 不会造成close事件。看下面例子：
/*
var server=http.createServer();
server.on('request',function(req,res){
    res.on('close',function(){
        console.log('close');
    });
});
*/
//运行服务器，通过浏览器访问localhost:8080 ，由于没有res.end() 代码，所以浏览器始终处于等待数据状态，这时关闭浏览器，服务器终端就有打印出close。

//response.writeHead(statusCode[, statusMessage][, headers])
/*
 这个方法是用来写响应头部信息的，这个应该在发送body主体之前调用，前面章节介绍过 statusCode是状态码，也可通过response.statusCode = 404 设置，
 比如404是告诉客户端没有找到资源。状态码可以搜索会找到详细信息说明，这里不进行详细介绍，1xx的代码代表请求已被接受，需要继续处理。
 2xx这一类型的状态码，代表请求已成功被服务器接收、理解、并接受。3xx 重定向。4xx 请求错误。5xx表示服务器错误。

 resonPhrase[可选]参数，这个是个字符串，用于简单说明的。比如：“服务器因为维护暂时无法正常访问....”

 headers[可选]参数，这个是个Object对象，用于设置响应头信息的，前面章节有详细介绍。
 也可通过response.setHeader(name, value)方式进行设置。
* */

var server2=http.createServer();
server2.on('request',function(req,res){
   var body=new Buffer('你好','utf8');
    res.writeHeader(200,'Success',{
        "Content-Length":body.length,
        "Content-Type":"text/plain"
    });
    res.write(body,"utf8");
    res.end();
});
server2.listen(8080);

//response.setTimeout(msecs, callback)
//response.headersSent 这个是只读属性，表示响应头是否被发送出去了 ， true/false
//response.sentDate 这个属性默认是 true，表示发送头部时会把发送响应时间信息加入到头部信息中

//response.setHeader(name, value) / response.getHeader(name) / response.removeHeader(name)
//设置，获取，删除头部

//response.write(chunk, [encoding])
//这个和前几章讲解的socket.write和stream.write方法很类似，尤其是和request.write使用方法一样。
// 这里要强调的一点是当调用这个方法时，内部会检查 response.headersSent，也就是判断是否头部信息已经发送出去了，
// 如果没发送就会先发送头部信息，然后再发送chunk数据块。由于前面看过很多write的使用方式，这里就不举例了。

//response.end([data], [encoding])
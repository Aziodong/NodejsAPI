/**
 * Created by 董 on 2015/9/18.
 */
var dgram=require('dgram');
var server=dgram.createSocket('udp4');
server.bind(8080);

server.on('message',function(msg,rinfo){
    console.log(msg.toString());
});

//client
var client=dgram.createSocket('udp4');
process.stdin.on('data',function(data){
    client.send(data,0,data.length,8080,"localhost");
});

//创建UDP socket对象
//dgram.createSocket(type, [callback])
/*
* type参数，可以是 udp4或udp6 对应ipv4和ipv6，现在还是以ipv4为主，所以都选用 udp4。
*
* callback[可选]参数，是message事件的监听器。
*
* return 返回的是一个socket对象，这个socket对象不是net.Socket类型，而是dgram.Socket对象。
*
* */
var serverSocket=dgram.createSocket('udp4',function(msg){
    console.log(msg.toString());
});

//Class: dgram.Socket

//事件
//message
//message事件监听器会接收到两个参数 callback(msg,rinfo)，
// msg表示接收到的数据，是Buffer类型。
// rinfo是一个json对象，rinfo类似如下信息 { address: '127.0.0.1', family: 'IPv4', port: 59615, size: 5 } 。
// address表示发送信息主机的ip地址，port表示发送信息主机的端口，size表示信息的byte数量。看下面例子：

var socket2=dgram.createSocket('udp4');
socket2.on('message',function(msg,rinfo){
    console.log(msg.toString());
});
socket2.bind(8080);

//listening
//listening事件是当socket准备好接收信息时会触发该事件。看下面代码：
//socket2.on('listening',function(){;})

//close
//当调用socket.close() 时激发close事件。

//error
//当socket内部发生错误时，会激发error事件。

//socket.send(buf, offset, length, port, address, [callback])
/*
* buf参数表示发送的信息，是Buffer类型。
* offset参数是发送buf的起始位置。
* length参数是发送buf的长度。
* port参数表示发送到目标主机端口。
* address参数表示发送到目标主机的地址。
* callback(err,bytes)[可选]回调函数，但发送完成后调用这个回调函数，err表示错误信息，bytes表示发送出去的字节数量。
* */

//socket.address()
//得到本地socket信息，信息类似于 { address: '0.0.0.0', family: 'IPv4', port: 8080 }
//但调用这个方法必须是激发listening事件之后，否则会抛出异常。

//socket.setBroadcast(flag)
//这个方法是设置是否UDP广播，简单说就是发送一条信息，本地局域网内的UDP主机能收到这条消息，广播地址是 255.255.255.255 。
//注意，调用这个方法也必须是激发listening事件之后，否则会抛出异常。
//flag:true/false

//socket.setTTL(ttl) ttl:1-255,默认64
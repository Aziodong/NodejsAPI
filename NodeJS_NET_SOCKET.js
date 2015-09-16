/**
 * Created by 董 on 2015/9/16.
 */
//net模块有两个类，一个是Socket和Server，下面先讲解Socket。
//net.Socket实现了stream.Duplex双工接口，具有了读写的能力。
//创建SOCKET
//方法1
var net require('net');
var socket= new net.Socket();

socket.connect(8124,function(){
    console.log(socket.address);
});
/*
* socket.connect(port, [host], [connectListener]) 方法是连接服务器的方法，
* port表示连接到服务器的端口号；
* host[可选]参数是服务器地址，默认是localhost；
* connectListener[可选]参数是个'connect'事件监听器，当连接建立后会触发'connect'事件，但当连接建立失败时，会触发‘error’事件。
* */

//方法2
//net.connect(port, [host], [connectListener])#
//net.createConnection(port, [host], [connectListener])
//这两个方法一模一样，名字不同而已，前面我们已经看过一个net.connect例子了，和第一个方法参数相同，不过多讲解。
var client = net.connect({port: 8124},
    function() { //'connect' listener
        console.log('connected to server!');
        client.write('world!\r\n');
    });
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
client.on('end', function() {
    console.log('disconnected from server');
});


//方法3
//net.createServer([connectionListener])方法在例子中见过，下面详细讲解。
//connectionListener(socket)是“connection”事件监听器，当有客户端连接进来时，
// 会触发“connection”事件，而这个监听器的socket参数就是被动创建的，是对应连接进来的客户端，当然这是可选参数。
//connectionListener是可选参数，如果省略了又如何得到socket呢？答案很简单，看下面代码：
var server =net.createServer();
server.on("connection",function(socket){
    //......
});

//Socket对象的属性
/*
* socket.remoteAddress 属性是远程socket的地址。
 *socket.remotePort 远程socket的端口号。
* socket.localAddress 本地socket地址。
* socket.localPort 本地socket端口号。
* socket.bytesRead 接收到的字节数。
* socket.bytesWritten  发送出去的字节数。这里的字节量是累积的。
* */

var server2= net.createServer();
server.on("connection",function(socket){
    console.log("远端端口"+socket.remotePort);
    console.log("远端地址"+socket.remoteAddress);
    console.log("本地端口"+socket.localPort);
    console.log("本地地址"+socket.localAddress);
    socket.on("data",function(data){
        console.log(data.toString());
        console.log("接收的字节"+socket.bytesRead);
        socket.write("send byte ....");
        console.log("发送的字节"+socket.bytesWritten);
    })
});

server.listen(8124,function(){
    console.log("服务器已启动");
});


//socket.setEncoding 参看“流”一章，有详细说明。
//socket.write(data, [encoding], [callback])
//data参数，要发送出去的数据，data可以是字符串类型或Buffer类型。encoding[可选]参数，编码方式，默认utf8，当data是字符串类型时有效。callback[可选]参数，写入成功后被调用。

//socket.end([data], [encoding]);
//如果有个data参数，那么相当于：
//socket.write(data,[encoding],function(){
//socket.end();
//})
//socket.end()就是发出FIN，至于FIN信号，可以理解为告诉另一端socket结束了，然后自己也会结束生命周期，而另一端会触发"end"事件。

//socket.destory()
//这个方法也是结束生命周期，不过是残酷的被kill了，服务器端不会触发‘end’事件，因为没有发出FIN信号就自杀了，所以另一端会触发"error",

//socket.pause()
//这个方法是暂停接受读取数据的动作，也就暂时停止触发socket.on("data"...)事件了。

//socket.resume()
//恢复读取动作。

//客户端数据量超过1000000byte则关闭

//服务端代码
var serverss=net.createServer();
serverss.on('connection',function(socket){
    socket.on('data',function(data){
       //接收数据大于1MB,则关闭连接
        if(socket.bytesRead>1000000){
            socket.pause();
            socket.write("数据量太大，3秒内自动关闭连接！");
            setTimeout(function(){
                socket.destory();
            },3000);
        }
    });
});

server.listen(8124,function(){
    console.log("服务器已启动!");
});

//客户端代码
var fs=require('fs');
var filedata= fs.readFileSync("/1.pdf");

var socketClient=net.connect(8124,"localhost",function(){
    socket.write(filedata);
});

socket.on("data",function(data){
    //服务器发来的信息
    console.log(data.toString());
});

//socket.setTimeout(timeout, [callback]);
/*
* 这个方法可以设定空闲超时，timeout是毫秒为单位的，如果设置timeout = 0，那么将撤销先前设置的超时，
* callback是添加个超时监听器，当有'timeout'事件时会被调用，这是可选的，可以使用 socket.on("timeout",callback)方式进行监听。
* */

//开发个程序，但客户端空闲10秒钟就会给服务器强行断开。代码如下：
//服务端
var server4= net.createServer();
server4.on("connection",function(socket){
    console.log("10秒空闲退出");
    socket.setTimeout(10*1000,function(){
        console.log("踢出");
        socket.destory();
    });
});

server4.listen(8124,function(){
    console.log("服务器已启动")
});

//客户端
var socket5= net.connect(8124);
socket5.on('data',function(data){
    console.log(data.toString());
});

//socket.address()
//返回一个对象，类似 { address: '127.0.0.1', family: 'IPv4', port: 53068 }

//socket对象事件
//data事件
//当接收到数据时会产生这个事件，事件监听器会接收到数据。
//end事件
//另一端socket调用了end() 方法时，会产生这个事件。
//timeout事件
//前面已详细说明，就是当socket空闲超时的时候，产生的事件。
//drain事件
//当调用socket.write方法时，会发送数据，内部有个缓冲区，每次清空缓冲区后都会产生drain事件。
//error事件
//但有错误产生时，会产生这个事件，一旦产生这个事件，内部也会产生“close”事件。
//close事件


//Server对象
//Server对象是等待有连接进入的管家，当客户端把一个管线丢给服务器，服务器接到后就建立了连接，
//管线两端都有口，也就是socket，管线是中空的，所以服务器和客户端可以相互发送数据和接收数据。

//net.createServer([connectionListener])
//创建服务器的方法，connectionListener[可选]是Server对象产生‘connection’事件的监听器。
// 这里可以指定，也可以通过 server.on("connection",connectionListener)指定。

//var server = net.createServer();
//server.on("connection",function(socket) {})

//server.listen(port, [host], [backlog], [callback])
//即使调用net.createServer 建立了Server对象，但还需要调用 server.listen 启动服务器的监听方法。
//port 参数，是打开一个服务器端的监听端口，如果是0，表示由系统分配一个随机端口。
//host[可选]参数，允许连入的客户端主机，可以是ip或域名。
//backlog[可选]参数，表示同时访问的最大数，默认511。
//callback[可选]参数，表示server对象产生“listening”事件的监听器，“listening”事件的产生表示server已经准备妥当，要接受客户端请求了。

//server.close([callback])
//这个方法可以保留现有的连接，拒绝新的连接建立。
//callback[可选]，是监听服务器的“close”事件的监听器，调用server.close不能产生close事件。
//close事件的产生有几种情况，第一种情况是当产生error事件时也会产生close事件，
// 第二种情况是调用过server.close方法后，已有的连接都断开连接后，会产生close事件。
//server.address() 同socket.address
//server.getConnections(callback)获取当前连接数
//这是异步方法，得到当前连接数，callback(err,count)回调函数，count是当前连接数量。

//server事件
//listening
//当服务器准备好接受客户端请求时，产生此事件。
//connection事件
//有新连接进入时，产生此事件。
//close事件
//服务器关闭时，会产生此事件。
//error事件
//当发生错误时产生error事件，同时也会产生close事件。

//检查IP地址
//net.isIP(input)
//检查input字符串是否是IP，return 0 表示无效，return 4 表示IPv4，return 6表示IPv6。
//net.ipIPv4(input)
//net.ipIPv6(input)

console.log(net.isIP("12.444.22.2")); // 0
console.log(net.isIP("112.11.22.122")); // 4
console.log(net.isIP("fe80::dc15:8005:801c:82bb")); // 6
console.log(net.isIPv4("22.212.12.122")); // true
console.log(net.isIPv6("22.212.12.122")); // false
console.log(net.isIPv6("fe80::dc15:8005:801c:82bb")); // true
/**
 * Created by 董 on 2015/9/18.
 */
var cdr=require('child_process');
cdr.fork(__dirname+"/child.js");

//创建子进程，用默认浏览器打开网页
cdr.exec("start http://www.iqiyi.com");
//child_process.exec(command, callback)
//command:command 执行命令，例如 ls -a
//callback(error:Error,stdout:Buffer,stderr:Buffer)
//return:子进程对象
var exec=require('child_process').exec;

var child=exec("dir",function(err,stdout,stderr){
    console.log(stdout);
});

//杀死主进程
//process.exit(0)/process.abort() :杀死主进程

//杀死子进程
//child_process.kill/child_process.disconnect()
var cp=cdr.fork(__dirname+"/child.js");
setTimeout(function(){
    cp.kill()
    //cp.disconnect();
},3000);

//进程间发送数据
//child.send(message, [sendHandle])
/*
* 该方法可以发送数据信息到另一个进程，message是JSON对象，不能发送Function或者是本地对象。sendHandle[可选]数据，这个是数据可以是TCP服务器或Socket对象。
* */
//监听：child.on("message",function(message,senHandle){})
/*
* process 表示自身进程。而 fork 出来的进程，相对于当前进程，fork出来的都是子进程，这句话要理解好。
* 所有process 都不认为自己是子进程，而只有别的进程通过 fork 它时，fork它的这个所谓主进程会当作它是子进程。
*process.on("message") 接收到“主进程”发来的信息。
* cp.on("message") 接受“子进程” 发来的信息。
* 每次fork 都会创建一个新的子进程。当主进程调用 cp.send 时，并不是所有子进程都能接收到，而只有当前fork出来的能接收到。
* */

//查看进程相关信息：
/*
* process.pid 得到进程的PID
* process.execPath  得到node命令程序的完整路径
* process.cwd()  得到当前的工作目录
* process.env  得到环境变量（很多条信息）
* process.version  得到 node 版本号
* process.versions  得到node版本号和它依赖库的版本，比如可以得到openssl和v8的版本信息。
* process.title  终端名称，可读写。
* process.arch  得到系统架构名称，比如windows7 得到的结果是 ia32
* process.platform 得到系统平台名称，比如windows7 得到的结果是 win32
* process.memoryUsage() 得到当前进程的内存使用情况。
* process.uptime() 进程从运行到现在的时间
* */


//process.nextTick(callback)
/*
* 这个方法就是延迟执行callback，比如密集递归运输或大型运算，可以通过这个方法让其他代码程序有运行的机会，
* 因为NODE.JS是单进程的，所以密集运算需要这个方法。
* */

//process.maxTickDepth:最大tick深入，默认1000

//process.hrtime()  精准测试运行间隔
/*
* 这个方法的功能是第一次运行 var time1 = process.hrtime() , time1是个参考时间，格式是[秒,纳秒]，
* 然后在另外一行代码调用 var time2 = process.hrtime(time1) , time2 就是从参考时间time1到运行这段代码的时间间隔，time2的格式还是[秒,纳秒] 格式，也就是时间间隔是多少秒+多少纳秒。
* */

var time=process.hrtime();

setTimeout(function(){
    var diff=process.hrtime(time);
    console.log('耗时 %d 纳秒',diff[0]*1e9+diff[1]);
},1000);

//process.stderr/process.stdout :输出流，streamWritable对象

//process.stdin 输入流 ；stream.Readable对象

process.stdin.on('data',function(data){
    process.stdout.write(data+"\n");
})
/**
 * Created by 董 on 2015/9/14.
 */
/*
* 流，通俗来说是可读、可写或可读写的对象。
* 比如打开一个文件流，就可以对文件流对象进行读写操作，比如一个request http请求，也是一个流对象，流对象继承了EventEmitter（参看“事件机制”一章）。
* 流stream这个模块本身提供了抽象类作为扩展基础，
* 之后章节介绍的文件系统、网络系统、加密解密、压缩解压模块中都使用了流，根据自身系统的需要扩展了stream模块的抽象类。
* node.js 提供了流的抽象类：stream.Readable 可读抽象类。stream.Writable 可写抽象类。
* */
var Readable=require('stream').Readable;
// 这样创建不会抛出任何异常
var reader = new Readable();
// 打印一下这个对象有什么吧
//console.log(reader);

var reader2= new Readable({
    objectMode:true,
    encoding:"utf8",
    highWaterMark:1024*10
});
console.log(reader2);
//encoding属性默认为null。用于Buffer编码所用。
//highWaterMark属性默认是16KB，相当于一个量杯，从底层读取数据保存在内部一个“小桶”里，当小桶装满后或底层资源就这么多时，就会返回（读取）一桶数据，
// 如果底层还有数据，那么就继续装桶，这个桶的最大值就是highWaterMark定义的。当然这个依赖实现类，实现类实现_read方法。
//objectMode属性默认为false，表示调用read(size)时,根据size大小返回底层数据；
//objectMode=true 时，size参数失效，会返回内部储存的数据。（这个不太好理解，后面会用例子讲解清楚）。

function TestRead(data,options){
    this._buf=data;
    this._po=0;
    Readable.call(this,options);
};
TestRead.prototype=Object.create(Readable.prototype,{
    constructor:{
        value:TestRead
    },
    _read:{
        value:function(n){
            if(this._po>=this._buf.length){
                this.push(null);
            }else{
                var ct= this._buf.slice(this._po,this._po+n>this._buf.length?this._buf.length:this._po+n);
                this.push(ct);
            }
            this._po+=n;
        }
    }
});

// 要读取的数据
var buf  = new Buffer([
    0x12,0x22,
    0x32,0x11,
    0x22,0x33,
    0x23,0x23,
    0x44,0x22,
    0x34,0x56,
    0x91,0x90,
    0x43]);

// 实例化个对象
var read = new TestRead(buf,{highWaterMark:1});
console.log(read.read(1));
console.log(read.read(1));
console.log(read.read(5));
console.log(read.read());

//通过这个结果，可以看出，默认objectMode = false时，那么read(size)可以访问byte数量。如果size越除了底层数据，那么返回null。

//objectMode=true,read的size属性失效
var read2= new TestRead(buf,{highWaterMark:4,objectMode:true});
console.log(read2.read(2));
console.log(read2.read(1));
console.log(read2.read(3));

//readable._read(size)
/*
* 这应该是实现子类调用的方法，不应该由外界调用。所有Readable子类必须通过实现这个方法，达到从底层读取数据的功能。
* size参数是个参考参数，这个参数就是 highWaterMark定义的；这个参数的含义，是每次从底层数据读取的最大byte数量。
* 每次调用都应该底层读取一段新的数据，读取到数据后，通过this.push(data)方法推送到读队列。（参看前面的例子）
* */

//readable.push(data)
/*
* data可以是Buffer|String|NULL，方法返回Boolean值，当push(false)时，就会retrun false，否则true。
* 这个方法应该是由_read方法内部调用的，当第一次push数据到读队列，内部会触发“readable”事件，当push(null) 时，内部会触发
* */

//readable.unshift(data)
/*
* 顾名思义，就是push方法的反方向，也就是插入到数据块前方。其余功能和特性与push一样。
* */

//readable.setEncoding(encoding)
/*
* 这个是设置编码的，底层数据返回的是String类型的数据时有效，也可以在构造函数设置，前面已提到。
* */

//readable.read([size])
/*
* 前面根据实例介绍了read方法，read方法和_read方法不是一个概念，要分开理解。
* 调用 read之后才会激发 "readable" 事件。有几种情况：
* 当objectMode = true时， read(0)将返回null，没什么现象和作用，read()会返回当前缓冲区数据，并刷新缓冲区。
* read(2)或read(18)效果和read()效果一致。
* 当objectMode = false时，read(0)将返回null，并且缓冲区不会刷新，会把下一次的push数据和缓冲区的数据合并。
* read()会返回当前缓冲区数据，并刷新缓冲区，这个和objectMode=true时的情况一致。
* read(n) 情况比较复杂，第一种情况：n大小在原始数据范围内时，会返回相应多的数据，并且会把highWaterMark变成n大小，
* 如果再调用read(n2)一次，那么highWaterMark会再次增大。第二种情况，n大小超出原始数据范围时，会返回null，
* hightWaterMark和第一种情况一样增大，但不会消耗数据，这种情况下data事件会直接获得全部数据。
* */

//readable.pause();
/*
* 暂停流读取。并执行一次 readable.read()，注意是不参数read()。
* */

//readable.resume();
/*
* 恢复流读取。并执行一次 readable.read()。
* */

//写入流
var Writable=require("stream").Writable;
var writer= new Writable({
    hignWaterMark:2,
    decodeStrings:false
});

function TestWrite(options){
    Writable.call(this,options);
    this.buffer=[];
};
TestWrite.prototype=Object.create(Writable.prototype,{
   constructor:{
       value:TestWrite
   },
    _write:{
        value:function(chunk,encoding,cb){
            this.buffer.push(chunk.toString());
            cb();
        }
    }
});

var wobj= new TestWrite();
wobj.write("helloworld");
//Writable对象可以调用end方法表示写入完成，当调用end()方法后会激发 finish 事件。
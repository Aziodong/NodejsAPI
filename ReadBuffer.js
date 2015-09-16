/**
 * Created by 董 on 2015/9/14.
 */
/*
* 参看上一节“Buffer的写入数据”,本节的概念与上节相同。同时写方法和读方法是一一对应的。
* 下面简单举例说明Buffer的读取操作。
* */
//buf.readUInt8(offset, [noAssert])
/*
* return 返回读取到的Number。
 offset 参数，读取的起始位置，不可省略。
 noAssert[可选]参数，
 默认false当超出buf的范围时会抛出异常，
 设置true超出buf范围不会抛出异常，读取范围内的byte，丢弃超出的部分。
* */

var buf= new Buffer(8);
buf.fill(0);
buf.writeUInt8(12,0);
console.log(buf.readUInt8(0));//12

buf.fill(0);
buf.writeUInt16LE(12,0);
console.log(buf.readUInt16LE(0));//12

buf.fill(0);
buf.writeUInt32LE(12,0);
console.log(buf.readUInt32LE(0));

buf.fill();
buf.writeUInt32BE(12,0);
console.log(buf.readUInt32BE(0));

//buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])
/*
* 可以通过copy方法读取一个buffer的数据拷贝到另一个buffer对象内。
* targetBuffer参数表示拷贝到的目标buffer。
* targetStart[可选]表示拷贝targetBuffer的起始位置，默认 0 。
* sourceStart[可选]表示原buffer拷贝的起始位置，默认 0 。
* sourceEnd[可选] 表示原buffer拷贝的结束位置，默认buf.length 。
* */
var sourceBuf= sourceBuf=new Buffer("世界你好");
var targetBuf= new Buffer(6);
sourceBuf.copy(targetBuf,0,3,9);
/*
*  字符串       世         界         你         好
 bytes     e4 b8 96   e7 95 8c   e4 bd a0   e5 a5 bd
 sourceBuf.copy(targetBuf,0,3,9);
 e7 95 8c e4 bd a0  六个字节是最终被拷贝的bytes
* */
console.log(targetBuf.toString());
console.log(Buffer.byteLength(sourceBuf));//12
console.log(sourceBuf);

var sourceBuf2= new Buffer("世界你好");
var targetBuf2= new Buffer(6);
var targetBuf3= new Buffer(9);
sourceBuf2.copy(targetBuf2);
sourceBuf2.copy(targetBuf3);
console.log(targetBuf2.toString());
console.log(targetBuf3.toString());
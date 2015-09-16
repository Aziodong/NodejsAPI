/**
 * Created by 董 on 2015/9/14.
 */
//buf.writeXXX(value, offset, [noAssert]);
/*
* value 参数，要写入的值，这个值必须是整数或浮点数，不可省略
 offset 参数，写入的起始位置，不可省略。

 noAssert[可选]参数，
 默认false当超出buf的范围时会抛出异常，
 设置true超出buf范围不会抛出异常，写入范围内的byte，丢弃超出的部分。
 node.js 读取和写入数据，支持的类型有：
 Int8八位有符号整数、
 UInt8八位无符号整数、
 Int16LE/Int16BE十六位有符号整数、
 UInt16LE/UInt16BE十六位无符号整数、
 UInt32LE/UInt32BE三十二位无符号整数、
 Int32LE/Int32BE三十二位有符号整数、
 FloatLE/FloatBE三十二位单精度浮点数、
 DoubleLE/DoubleBE六十四位双精度浮点数。
* */
//写入一个整数
var buf=new Buffer(4);
var num=0x0c;//整数12的16进制

buf.fill();

buf.writeInt8(num,0);
console.log(buf);
buf.fill();

buf.writeUInt8(num,0);
console.log(buf);
buf.fill();

buf.writeInt16BE(num,0);
console.log(buf);
buf.fill();

buf.writeInt16LE(num,0);
console.log(buf);
buf.fill();

buf.writeInt32BE(num,0);
console.log(buf);
buf.fill();

buf.writeInt32LE(num,0);
console.log(buf);
buf.fill();
/*
* 通过这个例子说明，LE 和 BE的区别是数据结构的排列顺序正好颠倒，
* 例如Int16BE用<00 0c="">结构储存12，Int16LE用<0c 00="">结构储存。
* UIntXXX表示无符号IntXXX表示有符号。另外，我们温习一下，八位占用1个byte，
* 16位占用2个byte，32位占用4个byte，64占用8个byte，位数的由来是因为一个byte有8个bit。
* 位数越高表达的数的范围就越大。
* */

//浮点和整数大同小异，例：
var buf1=new Buffer(8);
var num=2342342.567;

buf1.writeFloatBE(num,0);
console.log(buf1);
buf.fill();

buf1.writeFloatLE(num,0);
console.log(buf1);
buf1.fill();

buf1.writeDoubleBE(num,0);
console.log(buf1);
buf1.fill();

buf1.writeDoubleLE(num,0);
console.log(buf1);
buf1.fill();

//buf.fill(value, [offset], [end])
/**
 * value 参数，表示填充值 [但这里要注意:fill内部只会用值数据的第一个byte进行填充]
 offset[可选]参数，填充的开始位置，默认0，如果超出buf范围会抛出异常。
 end[可选]参数，填充的结束位置，默认buf.length，如果超出buf范围会抛出异常。
 */

var buf3=new Buffer(4);
buf.fill();
console.log(buf3);
var value=new Buffer("你好","utf16le");
console.log(value);

buf3.fill("你好");
console.log(buf3.toString());
//这个例子我们看到“你好”占用的第一个字节 0x60 填充了整个buf，之所以采用utf16le，因为这是fill方法内部的默认编码。

var buf4= new Buffer(4);
buf4.fill(0);
buf4.fill("你好",2);//填充buf4的3-4byte
console.log(buf4);
buf4.fill(0);
buf4.fill("你好",2,3);//填充buf的第三个byte
console.log(buf4);
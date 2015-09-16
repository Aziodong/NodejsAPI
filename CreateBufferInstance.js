/**
 * Created by john on 2015/9/10.
 */
/*
* Buffer类是一个全局的直接处理二进制数据的类型。
* 纯Javascript对于Unicode的处理是友好的，而对二进制并不友好。但处理TCP数据流和文件系统，必须要处理字节流，所以node.js提供一套策略来创建和操作字节流。
* 数据储存在一个Buffer实例中，一个Buffer的大小是固定的，类似于不可变的整数数组。
* Buffer与字符串之间的转换需要指定明确的编码。
* Buffer支持的编码：
* 'ascii'编码，只为7位的ASCII的数据。这个编码方法非常快！
* 'utf8' 编码，支持Unicode字符。
* 'utf16le' 编码，小端编码的Unicode字符。对（u10000 ~ u10FFFF）的支持。
* 'ucs2' 是 'utf16le' 编码的别名。
* 'base64' 是 Base64字符串编码。
* 'hex' 表示十六进制编码，每个byte编码为两个十六进制字符。
*
*
* 一个Buffer对象也可以使用一个类型数组。Buffer对象克隆到一个ArrayBuffer，用作类型数组存储支持。
* node.js提供的Buffer和标准类型化数组是两套不同的系统，所以Buffer和ArrayBuffer的内存不共享。
*
* 可以使用类型化数组处理网络协议、二进制文件图片等二进制数据，这个在之前是无法做到的，这也是HTML5标准化支持。
*
* 类型化数组包括以下类，ArrayBuffer、DataView、Int8Array、Uint8Array、Int16Array、Uint16Array、Int32Array、Uint32Array、Float32Array、Float64Array。
*ArrayBuffer:
* 表示原始数据的缓冲区，用于存储不同类型化数组的数据。
* 无法从 ArrayBuffer 读取或向其写入，但是，可将其传递给类型化数组或 DataView 对象 以解释原始缓冲区。
*
* DataView:
* 可以使用 DataView 对象 来将不同类型的二进制数据读取和写入ArrayBuffer中的任何位置。
* */

//new Buffer(size)
/*
 参数size定义了数组大小，Buffer长度是不可变的。
 注意：new Buffer(size) 时，并非“一定会”创建一个内容为“空”的对象，可以借助 buf.fill()测底清空。
* */
var buf1 = new Buffer(3);
console.log(buf1);

buf1.fill();
console.log(buf1);

var buf2=new Buffer(5);
console.log(buf2.length);
buf2.write('Hello World');

console.log(buf2.toString());//��ӡHello ��ΪBuffer����Ϊ5
console.log(buf2.length);

//new Buffer(array)
/*
 要求是octet数组，也就是btye数组。
 一个btye是八位bit，简单的说就是 从 0 ~ 255
* */
var buf3= new Buffer([0,2,42,255]);
console.log(buf3[3]);

var buf4= new Buffer([12,257,258,259.4]);
console.log(buf4[1]);
console.log(buf4[2]);//测试2 当超出0~255范围时,内部会求256的余数。即x%256,如果是浮点数则会向下取整
console.log(buf4[3]);

var buf5= new Buffer([15.1]);
console.log(buf5[0]);

//new Buffer(str, [encoding])
/*
*可以通过字符串创建一个Buffer实例，第二个参数表示字符编码方式（可选）。默认UTF8
* */
var buf6=new Buffer("你好世界");
console.log(buf6.toString());
console.log(buf6.length);

var buf7=new Buffer("你好世界","ascii");
console.log(buf7.toString());//乱码，中文不在ascii字符集内部
var buf8=new Buffer("hello world","ascii");
console.log(buf8.toString());

//用编码ucs2也就是utf16le编码创建Buffer实例。我们会发现buf.length不是2而是4，这个原因是utf16le编码表示一个字符要用2个btye。
var buf8= new Buffer("你好","utf16le");
console.log(buf8.toString("ucs2"));
console.log(buf8.length);
var buf9=new Buffer("ab","utf16le");
console.log(buf9.toString("ucs2"));
console.log(buf9.length);

//用默认编码utf8创建Buffer实例。我们会发现buf.length和buf2.length的长度不同，这个原因是因为utf8编码可以智能的转换编码方式。
//utf8表示一个中文字符需要3个byte，而utf16le只需要2个byte，而utf8表示一个英文字母只需1个byte，而utf16le还是需要2个byte。所以，各有优缺点，在实际应用中灵活选择编码方式。
//如果中英文混合字符串那么统一采用utf8比较省空间，绝大多数都是中文的情况采用ucs2（utf16le）编码比较省空间。
var buf9=new Buffer("ab");
console.log(buf9.length);//打印2
var buf10=new Buffer("你好");
console.log(buf10.length);//打印6

//hex编码,16进制编码字符串
var buf11 = new Buffer("你好");
console.log(buf11.length);           // 打印6，也就是6个byte。
var hexstr = buf11.toString("hex");  // HEX编码把每个byte编译为两个十六进制字符。
console.log(hexstr);               // 打印出 e4bda0e5a5bd，是hex编码后的值。

console.log(hexstr.length);        // 打印出 12
// 以下是把hex编码字符串转换为UTF8字符串。
var buf12 = new Buffer(hexstr,"hex");  // 通过hex编码创建一个新Buffer实例。
console.log(buf12.toString("utf8"));     // 打印 ”你好“

//buffer.slice([start],[end])
/*
* 创建Buffer对象，还可以slice方法从已有Buffer对象划分出新的Buffer对象。
* start[可选]参数，表示截取的起始位置,默认 0。
* end[可选]参数，表示截取的结束位置，默认buf.length 。
* */
var buf13= new Buffer("你好");
var buf14=buf1.slice();
console.log(buf14.toString());

var buf15=buf13.slice(3);
console.log(buf15.toString());//截取3-6的字节

var buf16=new Buffer("世界你好");
var buf17=buf16.slice(3,9);
console.log(buf17.toString());
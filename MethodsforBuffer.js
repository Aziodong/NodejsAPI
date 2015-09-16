/**
 * Created by 董 on 2015/9/10.
 */
//Buffer.isEncoding(编码方式);
//判断编码方式是否支持
console.log(Buffer.isEncoding("GB2312"));
console.log(Buffer.isEncoding("UTF8"));
console.log(Buffer.isEncoding("UCS2"));
console.log(Buffer.isEncoding("UTF16LE"));
console.log(Buffer.isEncoding("ASCII"));
console.log(Buffer.isEncoding("BASE64"));
console.log(Buffer.isEncoding("HEX"));

//Buffer.isBuffer(obj)判断是否obj是Buffer类型对象
var o1="",o2= new Buffer(1);
console.log(Buffer.isBuffer(o1));
console.log(Buffer.isBuffer(o2));

//Buffer.byteLength(string, [encoding]) 获得特定编码下一个字符串所占用btye的数量。默认编码为UTF8
//还应注意的是，字符串与编码应该是正确的对应关系，比如中文用 ascii 编码方式，显然得不到正确的 byteLength；而base64和hex的编码也要输入对应的字符串形式。
var str="你好";
var buf=new Buffer(str);
console.log(Buffer.byteLength(str));//6
var hexStr=buf.toString("hex");//转换为hex编码字符串
var base64Str=buf.toString("base64");
console.log(hexStr);
console.log(base64Str);
console.log(Buffer.byteLength(hexStr,"hex"));//6
console.log(Buffer.byteLength(base64Str,"base64"));//6

//ucs2与utf8占用的byte length是不相同的。
var str2="你好";
var buf2=new Buffer(str2);
console.log(Buffer.byteLength(str,"utf8"))//6
console.log(Buffer.byteLength(str,"ucs2"))//4

//Buffer.concat(list, [totalLength]) 合并多个buffer对象，并返回一个新的buffer对象。
/*
* list 是一个数组，数组值必须是Buffer对象。
* totalLength[可选] 指定合并后buffer对象的总长。
* 如果 list只有一个buffer，直接返回这个buffer对象
* 如果 list有多个buffer,会重新创建一个新的buffer对象。
* list有多个buffer情况下，如果不指定totalLength，那么会循环多个buffer得到其长度，这增加了多余的计算。所以明确指定totalLength更快。
* 指定了totalLength后则返回的Buffer长度为totalLength长度
* */

var tb;
tb = Buffer.concat([new Buffer(10)],20)
console.log(tb.length);   // 20


tb = Buffer.concat([ new Buffer(10) , new Buffer(5) ]);
console.log(tb.length);   // 15


tb = Buffer.concat([ new Buffer(10) , new Buffer(5) ], 20);
console.log(tb.length);   // 20


tb = Buffer.concat([ new Buffer(10) , new Buffer(222) ], 20);
console.log(tb.length);   // 20

try{
    tb = Buffer.concat([ new Buffer(20) , new Buffer(222) ], 20);//20
    console.log(tb.length);
}catch(e){
    console.log("第一个buffer.length >= totalLength");
}
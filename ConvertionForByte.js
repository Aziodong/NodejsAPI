/**
 * Created by 董 on 2015/9/14.
 */
//buffer转json
var buf= new Buffer("你好");
console.log(buf.toJSON());
console.log(buf);
console.log(buf.toString());
//json转buffer
var jsonObj=[ 228, 189, 160, 229, 165, 189 ];
var buf2= new Buffer(jsonObj);
console.log(buf2.toString());
//buffer转string
var buf3= new Buffer([ 228, 189, 160, 229, 165, 189 ]);
console.log(buf3.toString());
console.log(buf3.toString("base64"));
console.log(buf3.toString("hex"));
console.log(buf3.toString("utf8",0,3));
var num1=32;
console.log(num1.toString(2));

//Buffer转类型化数组ArrayBuffer
//Buffer类型与ArrayBuffer之间的转换，
//可通过Uint8Array八位无符号整数对象来进行转换，原因是Uint8Array以byte(8bit)为单元的数据数组，而Buffer也是，所以可以利用这一点轻松转换。

function toArrayBuffer(buffer){
    var ab= new ArrayBuffer(buffer.length);
    var view=new Uint8Array(ab);

    for(var i=0;i<buffer.length;i++){
        view[i]=buffer[i];
    }
    return view.buffer;
}

var buf4= new Buffer("你好");
var abc= toArrayBuffer(buf4);
console.log(abc instanceof ArrayBuffer);
console.log(abc);

//类型化数组ArrayBuffer转Buffer
function toBuffer(ab){
    var buffer=new Buffer(ab.byteLength);
    var view =new Uint8Array(ab);
    for(var i=0;i<buffer.length;i++){
        buffer[i]=view[i];
    }
    return buffer;
};
var arb= new ArrayBuffer(10);
var bf= toBuffer(arb);
console.log(bf instanceof Buffer);
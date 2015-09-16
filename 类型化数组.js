/**
 * Created by 董 on 2015/9/14.
 */
/*
* ArrayBuffer对象是HTML5标准，也就说明在浏览器和node.js都能使用。
*表示二进制数据的原始缓冲区，该缓冲区用于存储各种类型化数组的数据。
* 无法直接读取或写入 ArrayBuffer，但可根据需要将其传递到类型化数组或 DataView 对象 来解释原始缓冲区。
* */
/*
* 不能像Buffer对象那样操作它，那么如何读与写呢？答案就是ArrayBuffer针对不同的类型定义了相关类，通过这些类实例化对象对其进行操作。
* 这些个类型虽然名字和Buffer定义的读写方法名不完全一致，但仔细观察会发现，都是可以对号入座的。
* 类型化数组类型表示可编制索引和操纵的 ArrayBuffer 对象 的各种视图。
* 这些个类包括：Int8Array 、Uint8Array 、Int16Array 、Uint16Array 、Int32Array 、Uint32Array 、Float32Array 、Float64Array
* 例1. 创建的buf内部有8个bytes，我们想让第二个字节储存12，代码如下。
* */
//创建ArrayBuffer对象
var buf= new ArrayBuffer(8);
console.log(buf.byteLength);
var arr= new Uint16Array(buf,0);
arr.set([12],0);
console.log(buf);

//类型数组构造方法
//new XXXArray( length ); 参数length , 指定数组的长度。
var int8Array= new Int8Array(1);
console.log(int8Array.byteLength);
var uint8Array= new Uint8Array(1);
console.log(uint8Array.byteLength);
//..........................

//new XXXArray( array ); array ,该数组中包含的数组（或类型化数组）。
// 内容将初始化为给定数组或类型化数组的内容，且每个元素均转换为此类型。
var int8Array2= new Int8Array([22,24]);
console.log(int8Array2.byteLength);
var uint8Array= new Uint8Array([22,24]);
console.log(uint8Array.byteLength);
//...........................
//new XXXArray( buffer, byteOffset, length);
// buffer，此数组类型表示的 ArrayBuffer。
// byteOffset 可选，指定与 此类型数组将开始的缓冲区的开始处的偏移量（以字节为单位），
// length，数组的长度。
var ab= new ArrayBuffer(20);
var int16Array= new Int16Array(ab,0,10);
console.log(int16Array.length);//2,表示数组长度
console.log(int16Array.byteLength);

//类型数组具有的属性
//buffer 属性 只读。 获取此数组引用的 ArrayBuffer。
//byteLength 属性 只读。 此数组的从其 ArrayBuffer 开始的长度（以字节为单位）在构造时已固定。
//byteOffset 属性 只读。 此数组的从其 ArrayBuffer 开始的偏移量（以字节为单位）在构造时已固定。
var arr3=new Uint16Array(2);
arr3.set([12],0);
arr3.set([322],1);
console.log(arr3.buffer);
console.log(arr3.byteLength);
console.log(arr3.length);
console.log(arr3.byteOffset);
console.log(arr3[0]);

//类型数组具有的方法
//set(array, offset) 方法，在指定offset位置写入类型化或非类型化数组。
//subarray() 方法,为此数组获取 ArrayBuffer 存储的新视图。
var arr4= new Uint16Array(4);
arr4.set([12,34,666,980]);
console.log(arr4.length);
var subarr4= arr4.subarray(1,3);
console.log(subarr4.length);
console.log(subarr4[0]);
console.log(subarr4[1]);
//BYTES_PER_ELEMENT , 数组中的每个元素的大小（以字节为单位）。
console.log(arr4.BYTES_PER_ELEMENT);

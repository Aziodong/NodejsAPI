/**
 * Created by 董 on 2015/9/21.
 */
/*
* Cipher对象用来加密，Decipher对象用来解密。也就是说创建Cipher对象然后调用它的一些“神秘”方法把数据加密，
* 反过来通过创建一个Decipher对象，然后调用它的“秘密”方法把加密的数据解密，还原到原始数据。
*
* 通过 crypto.createCipher(algorithm, key) 或 crypto.createCipheriv(algorithm, key, key2) 可以创建 Cipher对象。
*
* 第二个方法多了一个key2，可以理解为是多加了一个key，不过kye2必须是8个字符，多也不行，少也不行。
* 第一个参数algorithm算法是专门用于加密的算法，可以通过crypto.getCiphers() 得到一个算法数组。
* */
'use strict'
var crypto=require("crypto");

var cipher=crypto.createCipheriv("bf","111","12345678");

/*
* 通过调用Ciphter对象的update和final可以得到加密后的数据。通过ciphter.update(data)方法加密data数据，然后return返回部分加密的数据，
* 可多次调用update方法，最后调用 ciphter.final() 返回剩余的加密数据。这里要注意的是调用update(data)并不一定返回对应的data加密后的数据，
* 所以正确的流程是，每次调用update，然后把返回的数据相加，最后调用一次final，再把final返回的数据相加，得到完整的加密后的数据。
* */
var cipher=crypto.createCipher("bf","111");
var s="";
s+=cipher.update("aaa","utf8","hex");
s+=cipher.update("bbb","utf8","hex");
s+=cipher.update("ccc","utf8","hex");
s+=cipher.final("hex");
console.log(s);

/*
* crypto.createDecipher(algorithm, key) 和 crypto.createDecipheriv(algorithm, key, key2) 对应  crypto.createCipher(algorithm, key) 和 crypto.createCipheriv(algorithm, key, key2) 方法。
* */
var decipher=crypto.createDecipher("bf","111");
var o="";
o+=decipher.update(s,"hex","utf8");
o+=decipher.final("utf8");
console.log(o);

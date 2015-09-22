/**
 * Created by 董 on 2015/9/21.
 */
'use strict'
//验证数据的完整性
var crypto=require('crypto');

var md5hash=crypto.createHash('md5');

var str="hi";

md5hash.update(str);

var hexstr=md5hash.digest("hex");

console.log(hexstr);

md5hash=crypto.createHash("md5");
md5hash.update(str);

hexstr=md5hash.digest("hex");

console.log(hexstr);

md5hash=crypto.createHash("md5");
md5hash.update(str);
md5hash.update("leo");
hexstr=md5hash.digest("hex");
console.log(hexstr);


var shahash=crypto.createHash("sha1");
shahash.update("my name is acuzio");
console.log("sha str:"+shahash.digest("hex"));


var hmac=crypto.createHmac("sha1","lol");
hmac.update("my name is acuzio");
console.log(hmac.digest("hex"));
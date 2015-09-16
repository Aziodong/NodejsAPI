/**
 * Created by 董 on 2015/9/16.
 */
var fs=require('fs');
//创建文件夹
fs.mkdir('mydir',function(err){
    console.log(err);
});
//同步实现
//fs.mkdirSync('mydir');

//删除文件夹
fs.rmdir('mydir',function(err){
    console.log(err);
});

//同步实现
//fs.rmdirSync('mydir');

//重命名
fs.rename('mydir','mydir2',function(err){
    console.log(err);
});

//同步方式
fs.renameSync('mydir','mydir2');

//查看当前目录下的文件及文件夹
fs.readdir('.',function(err,files){
    console.log(files);
});

//同步实现代码
var files =fs.readdirSync('.');
console.log(files);

//查看文件夹属性
fs.stat(".",function(err,stats){
    console.log("stats.isFile() ->" + stats.isFile())
    console.log("stats.isDirectory() -> " + stats.isDirectory())
    console.log("stats.isBlockDevice() ->" + stats.isBlockDevice())
    console.log("stats.isCharacterDevice()" + stats.isCharacterDevice())
    console.log("stats.isSymbolicLink() -> "+stats.isSymbolicLink())
    console.log("stats.isFIFO() ->" + stats.isFIFO())
    console.log("stats.isSocket()-> " + stats.isSocket())
});

//这段代码和第一个实现代码一样，所不同的是使用了 fs.lstat方法，这个方法和stat方法的差别是，如果第一个参数是文件链接（linux用户比较熟悉）,
// 那么stats.isSymbolicLink()会为真，而stats.isFile()和stats.isDirectory()为假。文件链接在node.js中可以通过fs.link方法来创建（可参看下一节“文件操作”）。
fs.lstat(".",function(err,stats){
    console.log("stats.isFile() ->" + stats.isFile())
    console.log("stats.isDirectory() -> " + stats.isDirectory())
    console.log("stats.isBlockDevice() ->" + stats.isBlockDevice())
    console.log("stats.isCharacterDevice()" + stats.isCharacterDevice())
    console.log("stats.isSymbolicLink() -> "+stats.isSymbolicLink())
    console.log("stats.isFIFO() ->" + stats.isFIFO())
    console.log("stats.isSocket()-> " + stats.isSocket())
});

//这个实现方式，效果和前两种一样，不同点就是使用了fs.fstat方法，这个方法的第一个参数不是文件路径，而是文件描述符fd，
// 通过fs.openSync同步方法得到了当前目录的fd文件描述符。
var fd = fs.openSync(".","r");
fs.fstat(fd,function(err,stats){
    console.log("stats.isFile() ->" + stats.isFile())
    console.log("stats.isDirectory() -> " + stats.isDirectory())
    console.log("stats.isBlockDevice() ->" + stats.isBlockDevice())
    console.log("stats.isCharacterDevice()" + stats.isCharacterDevice())
    console.log("stats.isSymbolicLink() -> "+stats.isSymbolicLink())
    console.log("stats.isFIFO() ->" + stats.isFIFO())
    console.log("stats.isSocket()-> " + stats.isSocket())
})

//以上三种方法的同步方法
var stats = fs.statSync(".")
console.log("stats.isFile() ->" + stats.isFile())
console.log("stats.isDirectory() -> " + stats.isDirectory())
console.log("stats.isBlockDevice() ->" + stats.isBlockDevice())
console.log("stats.isCharacterDevice()" + stats.isCharacterDevice())
console.log("stats.isSymbolicLink() -> "+stats.isSymbolicLink())
console.log("stats.isFIFO() ->" + stats.isFIFO())
console.log("stats.isSocket()-> " + stats.isSocket())

var stats = fs.lstatSync(".")
console.log("stats.isFile() ->" + stats.isFile())
console.log("stats.isDirectory() -> " + stats.isDirectory())
console.log("stats.isBlockDevice() ->" + stats.isBlockDevice())
console.log("stats.isCharacterDevice()" + stats.isCharacterDevice())
console.log("stats.isSymbolicLink() -> "+stats.isSymbolicLink())
console.log("stats.isFIFO() ->" + stats.isFIFO())
console.log("stats.isSocket()-> " + stats.isSocket())

var fd = fs.openSync(".","r");
var stats = fs.fstatSync(fd)
console.log("stats.isFile() ->" + stats.isFile())
console.log("stats.isDirectory() -> " + stats.isDirectory())
console.log("stats.isBlockDevice() ->" + stats.isBlockDevice())
console.log("stats.isCharacterDevice()" + stats.isCharacterDevice())
console.log("stats.isSymbolicLink() -> "+stats.isSymbolicLink())
console.log("stats.isFIFO() ->" + stats.isFIFO())
console.log("stats.isSocket()-> " + stats.isSocket())

//监听文件夹
//通过fs.watch方法可以监听一个文件或文件夹，这里监听了当前文件夹。
// 这里有几种情况，当创建一个文件夹或文件时，eventname是rename，filename是新创建的文件夹或文件的名称。
// 当删除一个文件夹或文件时，eventname是rename，filename是null。
// 当更改一个文件内容或文件（文件夹）名时，eventname是change，filename是被更改的那个文件的文件名。
fs.watch('.',function(eventname,filename){
    console.log(eventname);
    console.log(filename);
});

//监听方法2
//fs.watch会返回一个fs.FSWatcher对象，通过watch监听来达到同样目的，
// watch.close() 可以关闭监听，watch.on("error",callback)可以监听错误。
var watch=fs.watch('.');
watch.on("change",function(eventname,filename){
    console.log(eventname);
    console.log(filename);
});

/**
 * Created by 董 on 2015/9/16.
 */
var fs =require('fs');
//fs.open(path, flags, callback)
//fs.openSync(path,flags) 是同步方法，return fd,如果有错误直接throw抛出错误。
//path 参数，表示要打开文件的路径，flags标志参数，它限制打开的文件是可读、可写或可读写等方式，
// callback(err,fd)回调方法中fd表示打开文件的文件描述符。这里不好理解的是flags标志参数。
//fs.write(fd, buffer, offset, length, position, callback)
fs.open('new.txt','w+',function(err,fd){
    var buf= new Buffer("3332222你好啊");
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){
        console.log(err);
    });
});

/*
* flag标志及其意义
* "r" 表示，打开文件进行读取。如果该文件不存在，将发生异常。
* "r+" 表示，打开文件进行读取和写入。如果该文件不存在，将发生异常。
* "rs" 与 "r" 一样，但采用同步方式，这个方式很消耗性能，一般情况下不会用到。
* "rs+" 与 "r+" 一样，但采用同步方式，这个方式很消耗性能，一般情况下不会用到。
* "w" 表示，打开文件进行写入。如果文件不存在会创建一个文件，这种写入方式会全部删除旧有的数据，然后再写入数据。
* "w+" 表示，打开文件进行读取和写入。如果文件不存在会创建一个文件，这种写入方式会全部删除旧有的数据，然后再写入数据。
* "wx" 和 "w" 相同，不同的是它是独占模式。
* "wx+" 和 "w+" 相同，不同的是它是独占模式。
* "a" 表示，打开文件进行追加，如果文件不存在会创建一个文件，这个模式不同于"w"，它不会删除旧有的数据，而是会在后面追加数据。
* "a+"  表示，打开文件进行追加和读取，如果文件不存在会创建一个文件，这个模式不同于"w"，它不会删除旧有的数据，而是会在后面追加数据。
* "ax" 和 "a" 相同，不同的是它是独占模式。
* "ax+" 和 "ax" 相同，不同的是它是独占模式。
* */
//fs.write(fd, buffer, offset, length, position, callback)
/*
*fd参数，文件描述符，通过fs.open得到。
*buffer参数，是要写入的数据，Buffer对象，buffer尺寸的大小设置最好是8的倍数，效率较高。
*offset参数，要写入buffer的起始位置。
* length参数，要写入buffer的长度。通过offset和length规定buffer中那些数据应该被写入到文件。
* position参数，写入到文件的什么位置。
* callback((err, written, buffer)回调方法，当出现异常会抛出err，written是写入了多少bytes，buffer写入的数据。
* */

//fs.writeFile(filename, data, [options], callback)
//fs.writeFileSync(filename, data, [options])
//filename String类型， 文件名称。
//data String | Buffer类型，要写入的数据。
//options[可选] Objectl 类型，默认值 {encoding:"utf8",flag:"w"}
fs.writeFile('myfile.txt','JS WOO!',function(err){
    if(!err){
        console.log('写入成功');
    }
});

//fs.appendFile(filename, data, [options], callback)
//fs.appendFileSync(filename, data, [options]) 同步方式。

//读文件
//判断文件是否是PNG文件
fs.open("myFile.txt","r",function(err,fd){
    var header=new Buffer([137,80,78,71,13,10,26,10]);
    var buf=new Buffer(8);
    fs.read(fd,buf,0,buf.length,0,function(err,bytesread,buffer){
        if(header.toString()===buffer.toString()){
            console.log("是PNG文件");
        }
    })
});

//fs.readFile(filename, [options], callback)
//fs.readFileSync(filename,[options]) 同步方式，retur读取到的数据。
/*
* filename String类型，表示要读取的文件名
* options[可选] Object类型，默认值是 {encoding:null,flag:"r"}
* callback(err,data) 回调函数，data表示读取的数据。
* */

//截断文件
//截断文件，说白了就是把整个文件内容删除了，然后再加入new Buffer(len)的空数据，这个方法多数情况没什么用。以下是方法。
/*
* fs.ftruncate(fd, len, callback)
* fs.ftruncateSync(fd, len)
* fs.truncate(path, len, callback)
* fs.truncateSync(path, len)
* */

fs.open("myfile.txt","w",function(err,fd){
    fs.ftruncate(fd,5,function(err){
        console.log(err);
    })
});

fs.truncateSync("myFile.txt",5);

//文件链接
//文件链接在“文件系统概述”中用官方口气介绍了一次。但通俗点更好理解，
// 说白了就是为一个文件创建一个特殊的链接，这个链接看起来像是一个文件，
// 和快捷方式很像，这样理解就可了，熟悉linux  ln命令的对文件链接会很熟悉这个概念。

fs.linkSync("file.txt","filelink.txt");

fs.link("file.txt","filelink.txt",function(err){
    console.log(err);
});

//更改文件的查看和更新时间
fs.utimes("file.txt",new Date("1990-01-01"),new Date("1991-01-01"),function(err){
});
//同步方式
//fs.utimesSync(path, atime, mtime) 同步方式
/*
* path:String  更改的文件名字路径。
* atime:Date 查看时间。
* mtime:Date 更改时间。
* callback(err) 回调函数。
* */

//fs.futimes(fd, atime, mtime, callback)
//fs.futimesSync(fd, atime, mtime)
//和utimes方法一样，只不过第一个参数是 fd 文件描述符。

//监听文件
//fs.watchFile(filename, [options], listener)
/*
* filename:String 要监听的文件名。
* options[可选]:Object，默认值是{ persistent: true, interval: 5007 } ,
* persistent表示是否持久运作，这个意思是，true的时候当前process进程不会退出，如果是false，就不会阻止当前进程退出，
* 不过可以使用 setInterval 方法模拟 persistent:true 。 interval 表示监听间隔，以毫秒为单位。
* listener(currentStat,previousStat)，监听器，一旦文件有变化就会触发这个回调函数，
* currentStat是更改后当前的文件状态，previousStat表示更改前的状态，这两个参数是fs.Stats类型。（参看“文件夹操作”一节）。
* */
//停止监听文件
//fs.unwatchFile(filename, [listener])
/*
* filename 要停止监听的文件名。
* listener[可选]，表示要停止监听的监听器。如果不指定，那么将会停止全部监听文件的监听器。
* */

var handler1= function(event,filename){
    console.log("1");
}
var handler2=function(event,filename){
    console.log("2");
}

fs.watchFile("file.txt",handler1);

fs.watchFile("file.txt",handler2);

setTimeout(function(){
    fs.unwatch("file.txt",handler1);
},20000);
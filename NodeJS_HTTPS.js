/**
 * Created by 董 on 2015/9/21.
 */
/*
* 需要先配置openssl
* 但这里需要两个文件，key.pem和cert.pem，这两个文件是必须的，
* 简单理解这两个文件是用来加密和解密的即可，要创建这两个文件需要系统里安装openssl，下面是创建命令。
*
* step1:
* openssl genrsa -out key.pem 1024
*
* step2:
* openssl req -new -key key.pem -out csr.pem
*
* step3:
* openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem
*
* 完成后，就会生成key.pem和cert.pem两个文件，复制到程序的同级目录。
* */

//创建服务端
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000);


//客户端
var https = require('https');
https.get(
    "https://raw.github.com/brighthas/jsdm/master/index.js",
    function(res){
        res.on("data",function(chunk){
            console.log(chunk.toString());
        })
    });
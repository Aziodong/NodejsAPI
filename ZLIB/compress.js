/**
 * Created by 董 on 2015/9/21.
 */
var zlib=require('zlib');
var fs=require('fs');

var readfile=fs.createReadStream('input.txt');
var writefile=fs.createWriteStream("input.txt.gz");

var gzip=zlib.createGzip();

readfile.pipe(gzip).pipe(writefile);
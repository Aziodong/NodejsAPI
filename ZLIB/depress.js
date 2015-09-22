/**
 * Created by 董 on 2015/9/21.
 */
var zlib=require('zlib');
var fs=require('fs');

var readfile=fs.createReadStream('input.txt.gz');
var writefile=fs.createWriteStream("out.txt");

var depress=zlib.createGunzip();

readfile.pipe(depress).pipe(writefile);
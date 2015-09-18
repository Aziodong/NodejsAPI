var cdr=require('child_process');
var cp=cdr.fork(__dirname+"/child.js");

cp.on("message",function(msg){
    console.log(msg);
    cp.send("Hi");
});

/**
 * Created by 董 on 2015/9/18.
 */
process.on("message",function(m){
    console.log(m);
})
setInterval(function(){
    process.send("hello");
});
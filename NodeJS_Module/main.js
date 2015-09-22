/**
 * Created by 董 on 2015/9/21.
 */
//模块化的作用是可以让代码更易于管理。下面开发2个模块，然后用主程序加载这2个模块。
/*
* main.js是主程序，通过require加载模块，exports 和 module.exports 是模块的出口，exports 是 module.exports 的辅助写法，
* module.exports = xxx 这种写法是合法的，而exports = xxx这种写法是错误的，exports.xxx = xxx这种写法才是合法的。
*
* 如果定义的模块中同时使用 moudle.exports 和 exports ，那么会忽略exports的定义。
* */
var math2=require('math2');
var math=require('./mathmodule');

console.log(math.add(2,3));
console.log(math.cut(3,2));

console.log(math2.division(9,3));
console.log(math2.multipli(2,3));
/*
* 模块分为核心模块，文件模块。
* 核心模块就是核心库，例如http模块，当通过require("http")模块时，即使自己定义了http模块，但系统还是会返回核心模块。
*
* 除了核心模块，都是文件模块，也就是自己定义的模块文件。
* 加载文件模块可以采用绝对路径，相对路径和node_modules目录下。
*
* 相对路径和绝对路径这里就不解释了，node_modules目录下的意思是require会先查找当前目录下是否有 node_moudules目录，
* 如果有会先在这个目录查找模块，如果没有再向上级目录找是否有node_moudles目录一直到根目录，如果都没有会抛出异常。
* 如果把模块放在node_moudles目录下，那么采用require("modulename")写法和加载核心目录的写法一致，这个要区别于相对目录的require("./modulename")写法。
*
* require("./test.js") 如果写了完整的文件名会准确加载这个文件，如果没有写入扩展名require("./test")，
* 那么会尝试加载 test.js 然后是test.json。 系统会把test.js解析为一个js文件，而会把test.json解析为一个json文件。
*
* */

//package.json定义包


//module的属性与方法
//module.exports 必须要立即执行，否则模块不会被加载
//下边代码不会执行
setTimeout(function(){
    module.exports={a:"hello"};
})

//module.require(id)
//require是module.require的简写方式。
//module.id
//模块文件的完整路径，main.js如果是主启动文件，那么它自身调用 console.log(module.id) ，只会打印出 "." 。
console.log(module.id);
console.log(math.id);
console.log(math2.id);

//module.filename
//这个和module.id功能一样，即使是main.js调用console.log(module.filename)也会打印出完整的文件路径。
console.log(module.filename);

//module.loaded
//判断模块是否被加载完成，true/false。
console.log(module.loaded);

//modul.parent:获取父模块e
console.log(module.parent);
//module.children:获取子模块
console.log(module.children);


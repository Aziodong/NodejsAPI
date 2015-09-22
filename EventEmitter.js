/**
 * Created by 董 on 2015/9/21.
 */
/*
* 当继承EventEmitter，成为其子类就具备了emit激发事件方法和addListener添加监听器的方法。
* 在node.js核心库中很多类都继承自EventEmitter，例如前面章节介绍的stream和socket等操作，有类似于 on("...",function(){}) 的写法。
* */
'use strict'
var EventEmitter= require('events').EventEmitter;
var inherits=require('util').inherits;

function User(name){
    EventEmitter.call(this);
    this._name=name;
};

inherits(User,EventEmitter);

User.prototype.changeName=function(name){
    this._name=name;
    this.emit("change name",name);
};

var me= new User("leo");

me.addListener("change name",function(newname){
    console.log(`new name:${newname}`);
}).on('change name',function(username){
    console.log('add a new listener:'+username);
});

console.log(me.listeners('change name'));

console.log(EventEmitter.listenerCount(me,'change name'));

me.changeName("EEEEE");
/*
* User类继承了EventEmitter，changeName被调用后，通过emit激发change name事件。
* 后面创建一个User对象me，通过me.on方法添加一个change name事件的监听器，后面调用me.changeName方法后，激发了change name事件，
* 从而调用了监听器，打印出内容
* */
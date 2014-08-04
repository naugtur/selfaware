var assert = require('assert');
var selfAware = require('./index');

function Dummy(foo){
  this.foo = foo;
}

Dummy.prototype.getFoo = function(){
  return this.foo;
}

var aDummy = new Dummy(1);

aDummy.ownMethod = function(){
  return this.foo;
}

assert(typeof aDummy.getFoo.call({}) == "undefined","expected no foo")
assert(typeof aDummy.ownMethod.call({}) == "undefined","expected no foo")

selfAware(aDummy);

assert(aDummy.getFoo.call({}) == 1,"expected foo to equal 1");
assert(aDummy.ownMethod.call({}) == 1,"expected foo to equal 1");


console.log('all ok');

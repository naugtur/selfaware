
var selfAware = function(self){

  function makeAware(method){
    var awareMethod;
    if(method.length<8){
      awareMethod = function(){
        return method.call(self,arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
      };
    }else{
      awareMethod = function(){
        return method.apply(self,arguments);
      };
    }

    awareMethod.forceCall = function(){
      return Function.prototype.call.apply(method,arguments);
    }

    awareMethod.forceApply = function(t,a){
      return method.apply(t,a);
    }

    return awareMethod;
  }

  for (var m in self){
    if(self[m].call && self[m].call.call){
      //function enough
      self[m] = makeAware(self[m]);
    }
  }

  return self;
}
if(module && module.exports){
  module.exports = selfAware;
}

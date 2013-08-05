define(["models/baseAttribute"], function(mBaseAttribute){

    function Bonus(name, val){
        mBaseAttribute.BaseAttribute.call(this, name, val);
    }
    
    Bonus.prototype = Object.create(mBaseAttribute.BaseAttribute.prototype);
    Bonus.prototype.constructor = Bonus;
    
    return {Bonus : Bonus};
});
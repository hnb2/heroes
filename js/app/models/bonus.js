define(["models/baseAttribute"], function(mBaseAttribute){

    function Bonus(name, val){
        this.name = name;
        this.val = new Number(val);
    }
    
    Bonus.prototype = new mBaseAttribute.BaseAttribute();
    Bonus.prototype.constructor = Bonus;
    
    return {Bonus : Bonus};
});
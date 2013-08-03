define([], function(){

    function BaseAttribute(name, val){
        this.name = name;
        this.val = val;
    }
    
    BaseAttribute.prototype.getVal = function getVal(){
        return this.val;
    };
    
    BaseAttribute.prototype.getName = function getName(){
        return this.name;
    };
    
    BaseAttribute.prototype.toString = function toString(){
        return this.name + " : " + this.val;
    };
    
    BaseAttribute.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };
    
    return {BaseAttribute : BaseAttribute};
});
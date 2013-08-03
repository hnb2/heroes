define([], function(){

    function BaseAttribute(name, val){
        this.name = name;
        this.val = new Number(val);
    }
    
    BaseAttribute.prototype.getVal = function getVal(){
        return this.val;
    };
    
    BaseAttribute.prototype.getName = function getName(){
        return this.name;
    };
    
    return {BaseAttribute : BaseAttribute};
});
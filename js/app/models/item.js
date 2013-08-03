//Only to be inherited by child classes
define([], function(){

    function Item(id, name, desc, value){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.value = value;
    }
    
    Item.prototype.toString = function toString(){
        return "[" + this.id + "] " + this.name + " : " + this.description + " Worth " + this.value + " gold coins.";
    };
    
    return {Item : Item};

});
define([], function(){

    function Command(name, description, params, returnType){
        this.name = name;
        this.description = description;
        this.params = params;
        this.returnType = returnType;
    }
    
    Command.prototype.exec = function(args, context){
        throw new Error("Must be implemented !!!");
    };
    
    Command.prototype.toString = function toString(){
        var l = (typeof this.params !== "undefined")?this.params.length:0;
        return this.name + " - " + this.description + " - " + l + " param(s) - " + this.returnType;
    };
    
    Command.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };

    return {Command: Command};
});
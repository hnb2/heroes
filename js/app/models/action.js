define([], function(){

    function Action(actionName, opts){
        this.actionName = actionName;
        this.effects = opts.effects;
        this.output = opts.output;
    }
    
    Action.prototype.toString = function toString(){
        return this.name + " - " + this.output + " : " + this.effects;
    };
    
    return {Action : Action};

});
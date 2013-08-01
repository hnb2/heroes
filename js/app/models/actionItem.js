//Only to be inherited by child classes
define(["models/item"], function(mItem){

    function ActionItem(id, name, desc, value, action){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.value = value;
        
        //New field
        this.action = action;
    }
    
    ActionItem.prototype = new mItem.Item();
    
    ActionItem.prototype.constructor = ActionItem;
    
    ActionItem.prototype.use = function use(source, target){
        target.set(this.action.effects);
        
        var out =  source.name + " " + this.action.actionName + " " + this.name;
        if(source !== target)
            out += " at " + target.name;
            
        if(this.action.output)
            out += " ." + this.action.output;
        
        return out;
    };
    
    return {ActionItem : ActionItem};

});
define(["models/item"], function(mItem){

    function ActionItem(id, name, desc, value){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.value = value;
    }
    
    ActionItem.prototype = new mItem.Item();
    
    ActionItem.prototype.constructor = ActionItem;
    
    ActionItem.prototype.use = function use(creature){
        throw new Error("This method should be implemented by any ActionItem");
    };
    
    return {ActionItem : ActionItem};

});
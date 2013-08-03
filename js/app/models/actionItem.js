//Only to be inherited by child classes
define(["models/item"], function(mItem){

    function ActionItem(id, name, desc, value, opts){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.value = value;
        
        //New field
        this.setOpts(opts);
    }
    
    ActionItem.prototype = new mItem.Item();
    
    ActionItem.prototype.constructor = ActionItem;

    ActionItem.prototype.setOpts = function setOpts(opts){
        this.bonuses = new Array();
        
        if(typeof opts !== "undefined"){
            var self = this;
            opts.forEach(function(item){
                self.bonuses.push(item);  
            });
        }
    };   
    
    ActionItem.prototype.use = function use(target){
        this.bonuses.forEach(function(item){
            target.update(item);  
        });
        
        return target.name + " used " + this.name;
    };
    
    ActionItem.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };
    
    return {ActionItem : ActionItem};

});
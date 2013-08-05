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
        
            //Bonuses
            if(typeof opts.bonuses !== "undefined"){
                var self = this;
                opts.bonuses.forEach(function(item){
                    self.bonuses.push(item);  
                });
            }
            
            //Position constraint
            this.constraint = opts.constraint;
        }
    };
    
    ActionItem.prototype.use = function use(source, target){
        this.bonuses.forEach(function(item){
            target.update(item);  
        });
        
        var out = source.name + " used " + this.name;
        if(source !== target)
            out += " on " + target.name; 
        
        return out;
    };
    
    ActionItem.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };
    
    return {ActionItem : ActionItem};

});
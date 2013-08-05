define(["models/item"], function(mItem){

    function ActionItem(id, name, desc, value, opts){
        mItem.Item.call(this, id, name, desc, value);
        
        //New field
        this.setOpts(opts);
    }
    
    ActionItem.prototype = Object.create(mItem.Item.prototype);
    
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
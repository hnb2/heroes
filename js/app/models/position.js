define([], function(){
    function Position(id, to, name, desc, opts){
        this.id = id;
        this.to = to;
        this.name = name;
        this.description = desc;
        
        this.set(opts);
    }
    
    Position.prototype.set = function set(opts){
        if(typeof opts === "undefined")
            opts = {};
            
        this.monsters = opts.monsters || this.monsters;
        this.items = opts.items || this.items;
        this.light = (typeof opts.light === "undefined")?true:opts.light;
    };
    
    Position.prototype.toString = function toString(){
        var out = (! this.light)?"[DARK] ":"";
        
        out += this.name + ": " + this.description;
        out += "\t You can go to : [" + this.to + "]";
        
        if(this.monsters && this.monsters.length > 0){
            out += "\t " + this.monsters.length + " monster(s) : " + this.monsters; 
        }
        
        if(this.items && this.items.length > 0){
            out += "\t " + this.items.length + " items(s) : " + this.items; 
        }
        
        return out;
    };
    
    return {Position : Position};
});
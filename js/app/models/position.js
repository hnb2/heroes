define([], function(){
    function Position(id, to, name, desc, opts){
        this.id = id;
        this.to = to;
        this.name = name;
        this.description = desc;
        
        if(typeof opts === "undefined")
            opts = {};
            
        this.monsters = opts.monsters;
        this.items = opts.items;
    }
    
    Position.prototype.toString = function toString(){
        var out = this.name + ": " + this.description;
        out += "\t You can go to : [" + this.to + "]";
        
        if(this.monsters){
            out += "\t " + this.monsters.length + " monster(s) : " + this.monsters; 
        }
        
        if(this.items){
            out += "\t " + this.items.length + " items(s) : " + this.items; 
        }
        
        return out;
    };
    
    return {Position : Position};
});
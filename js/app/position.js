define([], function(){
    function Position(id, to, name, desc, monsters){
        this.id = id;
        this.to = to;
        this.name = name;
        this.description = desc;
        this.monsters = monsters;
    }
    
    Position.prototype.toString = function toString(){
        var out = this.name + ": " + this.description;
        out += "\t You can go to : [" + this.to + "]";
        if(this.monsters){
            out += "\t " + this.monsters.length + " monster(s) : " + this.monsters; 
        }
        
        return out;
    };
    
    return {Position : Position};
});
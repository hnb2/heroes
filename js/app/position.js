define([], function(){
    function Position(id, to, name, desc, monsters){
        this.id = id;
        this.to = to;
        this.name = name;
        this.description = desc;
        this.monsters = monsters;
    }
    
    return {Position : Position};
});
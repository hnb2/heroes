define([], function(){
    function Position(id, to, name, desc){
        this.id = id;
                this.to = to;
        this.name = name;
        this.description = desc;
    }
    
    return {Position : Position};
});
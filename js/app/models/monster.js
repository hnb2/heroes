define(["models/creature"], function(mCreature){

    function Monster(id, name, opts){
        this.id = id;
        this.name = name;
        
        //Initialize the fields
        this.setOpts(opts);
    }
    
    //Monster inherits of Creature
    Monster.prototype = new mCreature.Creature();
    
    //Set the constructor
    Monster.prototype.constructor = Monster;
    
    return {Monster : Monster};
});
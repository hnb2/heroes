define(["models/creature"], function(mCreature){

    function Monster(name, opts){
        this.name = name;
        
        //Initialize the fields
        this.initialize(opts);
    }
    
    //Monster inherits of Creature
    Monster.prototype = new mCreature.Creature();
    
    //Set the constructor
    Monster.prototype.constructor = Monster;
    
    return {Monster : Monster};
});
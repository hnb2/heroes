define(["models/creature"], function(mCreature){

    function Monster(id, name, opts){
        mCreature.Creature.call(this, id, name,  undefined, opts);
    }
    
    //Monster inherits of Creature
    Monster.prototype = new mCreature.Creature();
    
    //Set the constructor
    Monster.prototype.constructor = Monster;
    
    return {Monster : Monster};
});
define(["creature"], function(mCreature){

    function Monster(name, opts){
        this.name = "[MONSTER] " + name;
        
        //Redefine new values
        this.hp = opts.hp || 50;
        this.atk = opts.atk || 5;
        this.atkChance = opts.atkChance || {min: 50, max:100};
        this.dodgeChance = opts.dodgeChance || {min: 0, max:3};
    }
    
    //Monster inherits of Creature
    Monster.prototype = new mCreature.Creature(this.name, {});
    
    //Set the constructor
    Monster.prototype.constructor = Monster;
    
    return {Monster : Monster};
});
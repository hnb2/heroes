define(["models/creature"], function(mCreature){

    function Hero(name, opts){
        this.name = "[HERO] " + name;
        
        //Initialize the fields
        this.initialize(opts);
    }
    
    //Hero inherits of Creature
    Hero.prototype = new mCreature.Creature();
    
    //Set the constructor
    Hero.prototype.constructor = Hero;
    
    return {Hero : Hero};
});
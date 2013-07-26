define(["creature"], function(mCreature){

    function Hero(name, opts){
        this.name = "[HERO] " + name;
        
        //Redefine new values
        this.hp = opts.hp || 120;
        this.atk = opts.atk || 15;
        this.atkChance = opts.atkChance || {min: 80, max:100};
        this.dodgeChance = opts.dodgeChance || 7;
    }
    
    //Hero inherits of Creature
    Hero.prototype = new mCreature.Creature(this.name, {});
    
    //Set the constructor
    Hero.prototype.constructor = Hero;
    
    return {Hero : Hero};
});
define(["fightUtils"], function(mFightUtils){

    //Base for monsters and heroes
    function Creature(name, opts){
        this.name = name;
        this.hp = opts.hp || 100;
        this.atk = opts.atk || 15;
        this.atkChance = opts.atkChance || {min: 0, max:100};
        this.dodgeChance = opts.dodgeChance || 0;
        this.position = 0;
    }
    
    Creature.prototype.attack = function attack(creature){
        //Get a random value between min and max
        var rand = mFightUtils.rand(this.atkChance.min, this.atkChance.max);
        
        if(rand === this.atkChance.max)
            console.log(this.name + " did a perfect attack !");

        //Will create a damage = original atk * rand%
        var dmg = Math.floor( this.atk * (rand / 100) );
        
        console.log(this.name + "[" + this.hp + " hp] inflicted " + dmg + " dmg points to " + creature.name + "[" + creature.hp + " hp]" );
        
        //Inflict the damages
        creature.takeDamage(dmg);
    };
    
    Creature.prototype.takeDamage = function takeDamage(dmg){
        //Test for dodging the attack
        var chance = mFightUtils.chance(this.dodgeChance);
        
        if(chance){
            console.log(this.name + " dodged the attack !!");
        }
        else{
            //Take the damage
            if(this.hp - dmg <= 0)
                this.hp = 0;
            else
                this.hp = this.hp - dmg;
        }
    };
    
    Creature.prototype.heal = function heal(hp){
        if(!this.dead){
            this.hp += hp;
            console.log(this.name + " has recovered " + hp + " health points.");
        }
    };
    
    Creature.prototype.isDead = function isDead(){
        return (this.hp === 0);
    };
    
    Creature.prototype.move = function move(pos){
        var out = this.name + " has moved from " + this.position.name + " to " + pos.name;
        this.position = pos;
        return out;
    };
    
    Creature.prototype.getPosition = function getPosition(){
        return this.position;
    };

    return {Creature : Creature};
});
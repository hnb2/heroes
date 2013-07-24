define(["fightUtils"], function(mFightUtils){

    //Base for monsters and heroes
    function Creature(name, opts){
        this.name = name;
        this.hp = opts.hp || 100;
        this.atk = opts.atk || 15;
        this.atkChance = opts.atkChance || {min: 0, max:100};
        this.dodgeChance = opts.dodgeChance || {min: 0, max:100};
    }
    
    Creature.prototype.attack = function attack(creature){
        var rand = mFightUtils.rand(this.atkChance.min, this.atkChance.max);
        
        if(rand === this.atkChance.max)
            console.log(this.name + " did a perfect attack !");
        
        //Will create a value between 80% and 100% of the original atk
        var dmg = Math.floor( this.atk * (rand / 100) );
        
        //Inflict the damages
        creature.takeDamage(dmg);
    };
    
    Creature.prototype.takeDamage = function takeDamage(dmg){
        //Test for dodging the attack
        var chance = mFightUtils.chance(this.dodgeChance.min, this.dodgeChance.max);
        
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

    return {Creature : Creature};
});
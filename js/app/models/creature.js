define(["utils/fightUtils"], function(mFightUtils){

    //Base for monsters and heroes
    function Creature(name){
        this.name = name;
        
        this.id = 0;
        this.hp = 100;
        this.maxHp = this.hp;
        this.atk = 15;
        this.atkChance = {min: 50, max:100};
        this.dodgeChance = 3;
        this.position = 0;
    }
    
    //Merge the options, to be used only once to initialize the class
    Creature.prototype.initialize = function initialize(opts){
        if(typeof opts === "undefined")
            return;
            
        this.id = opts.id || this.id;
        this.hp = opts.hp || this.hp;
        this.maxHp = this.hp;
        this.atk = opts.atk || this.atk;
        this.atkChance = opts.atkChance || this.atkChance;
        this.dodgeChance = opts.dodgeChance || this.dodgeChance;
    };
    
    Creature.prototype.attack = function attack(creature){
        //Get a random value between min and max
        var rand = mFightUtils.rand(this.atkChance.min, this.atkChance.max);
        
        var criticalHit = false;
        
        if(rand === this.atkChance.max)
            criticalHit = true;

        //Will create a damage = original atk * rand%
        var dmg = Math.floor( this.atk * (rand / 100) );
        
        //Inflict the damages
        creature.takeDamage(dmg);
        
        var out = "\t " + this.name + "[" + this.hp + " hp] inflicted " + dmg + " dmg points";
        if(criticalHit)
            out += " (CRITICAL HIT)";
        out +=  " to " + creature.name + "[" + creature.hp + " hp left]";
        
        return out;
    };
    
    Creature.prototype.takeDamage = function takeDamage(dmg){
        //Test for dodging the attack
        var chance = mFightUtils.chance(this.dodgeChance);
        
        if(chance){
            return this.name + " dodged the attack !!";
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
            if(this.hp + hp < this.maxHp)
                this.hp += hp;
            else
                this.hp = this.maxHp;
                
            return this.name + " has recovered " + hp + " health points.";
        }
    };
    
    Creature.prototype.isDead = function isDead(){
        return (this.hp === 0);
    };
    
    Creature.prototype.move = function move(pos){
        var out;
        if(typeof this.position.monsters === "undefined" || this.position.monsters.length === 0){
            out = this.name + " has moved from " + this.position.name + " to " + pos.name + ".";
            out += "\t " + pos.toString();
            this.position = pos;
        }
        else{
            out = "Monster(s) are blocking the way !";
        }
        
        return out;
    };
    
    Creature.prototype.getPosition = function getPosition(){
        return this.position;
    };
    
    Creature.prototype.toString = function toString(){
        return this.name + " - " + this.hp + "/" + this.maxHp + " hp - " + this.atk + " dmg max - " + this.dodgeChance + " % chance to dodge."; 
    };

    return {Creature : Creature};
});
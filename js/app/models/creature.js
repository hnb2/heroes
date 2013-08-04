define(["utils/fightUtils", "models/attributes", "models/attributeType"], function(mFightUtils, mAttributes, mAttributeType){

    //Base for monsters and heroes
    function Creature(id, name, pos, opts){
        this.id = id;
        this.name = name;
        this.position = pos;
        this.setOpts(opts);
    }
    
    //USED ONLY ONCE FOR INITIALIZATION
    Creature.prototype.setOpts = function setOpts(opts){
        if(typeof opts === "undefined")
            opts = {};
            
        this.attributes = new mAttributes.Attributes(opts.attributes);
    };
    
    //Helper method to retrieve attributes
    Creature.prototype.getAttr = function getAttr(name){
        return this.attributes.get(name);
    };
    
    Creature.prototype.attack = function attack(creature){

        var dmg = this.getAttr( mAttributeType.DMG );
  
      //Get a random value between min and max of dmg
        var rand = mFightUtils.rand(dmg.min, dmg.val);
        
        var criticalHit = false;
        
        if(rand === dmg.val)
            criticalHit = true;
        
        //Final damage amount
        var finalDmg = rand;
        
        //Inflict the damages
        if( ! this.isDead() )
            creature.takeDamage( finalDmg );
        
        var out = "\t " + this.name + "[" + this.getAttr( mAttributeType.HP ) + "] inflicted " + finalDmg + " dmg points";
        
        if(criticalHit)
            out += " (CRITICAL HIT)";
            
        out +=  " to " + creature.name + "[" + creature.getAttr( mAttributeType.HP ) + " left]";
        
        return out;
    };
    
    Creature.prototype.takeDamage = function takeDamage(dmg){
        //Test for dodging the attack
        var dexterity = this.getAttr( mAttributeType.DEXTERITY );
        
        if(typeof dexterity !== "undefined"){
            //Every 2 points of dexterity, there is 1% chance to dodge the attack
            var result = Math.floor(dexterity.getVal() / 2);
            var chance = mFightUtils.chance(result);
        
            if(chance){
                return this.name + " dodged the attack !!";
            }
        }
        
        this.getAttr( mAttributeType.HP ).decrease(dmg);
    };
    
    /*Creature.prototype.heal = function heal(hp){
        if(!this.dead){
            if(this.hp + hp < this.maxHp)
                this.hp += hp;
            else
                this.hp = this.maxHp;
                
            return this.name + " has recovered " + hp + " health points.";
        }
    };*/
    
    Creature.prototype.isDead = function isDead(){
        return (this.getAttr( mAttributeType.HP ).getVal() === 0);
    };
    
    Creature.prototype.update = function update(bonus){
        var attr = this.getAttr(bonus.getName());
        if(typeof attr !== "undefined"){
            attr.addBonus(bonus);
        }
    };
    
    Creature.prototype.move = function move(pos){
        var out;
        
        var light = this.position.getAttr( mAttributeType.LIGHT );
        if(typeof light !== "undefined" && light.getVal() === 0){
            out = "You cannot find your way in the dark !";
        }
        else if(typeof this.position.monsters !== "undefined" && this.position.monsters.length > 0){
            out = "Monster(s) are blocking the way !";
        }
        else{
            out = this.name + " has moved from " + this.position.name + " to " + pos.name + ".";
            out += "\t " + pos.toString();
            this.position = pos;
        }

        
        return out;
    };
    
    Creature.prototype.getPosition = function getPosition(){
        return this.position;
    };
    
    Creature.prototype.use = function use(target, item){
        return item.use(this, target);
    };
    
    Creature.prototype.toString = function toString(){
        return this.name + " >> " + this.attributes.toString();
    };
    
    Creature.prototype.toJson = function toJson(){
        return JSON.stringify(this);
    };

    return {Creature : Creature};
});
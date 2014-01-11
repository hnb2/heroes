/**
 * Base class for Hero and Monster
 * @class Creature
 * @author Pierre Guillemot
 */
define(["utils/fightUtils", "models/attributes", "models/attributeType"],
    function (mFightUtils, mAttributes, mAttributeType) {

    /**
     * Constructor
     * @method Creature
     * @param {Number} _id       ID of the creature
     * @param {String} _name     Name of the creature
     * @param {Object} _position Position of the creature 
     * @param {Object} _opts     Options
     * @return {Nothing}
     * @public
     */
    function Creature(_id, _name, _position, _opts) {
        /**
         * Unique identifier of the creature
         */
        var id;

        /**
         * Name of the creature
         */
        var name;

        /**
         * Position of the creature
         */
        var position;

        /**
         * Array of attributes of the creature
         */
        var attributes;

        /**
         * Getter for id
         * @method getId
         * @return {Number} id of the creature
         * @public
         */
        this.getId = function () {
            return id;
        };

        /**
         * Getter for name
         * @method getName
         * @return {String} name of the creature
         * @public
         */
        this.getName = function () {
            return name;
        };

        /**
         * Setter for name
         * @method setName
         * @param {String} _name new name for the creature
         * @return {Nothing}
         * @public
         */
        this.setName = function (_name) {
            name = _name;
        };

        /**
         * Getter for position
         * @method getPosition
         * @return {Object} position of the creature
         * @public
         */
        this.getPosition = function () {
            return position;
        };
        
        /**
         * Setter for position
         * @method setPosition
         * @param {Object} _position new position for the creature
         * @return {Nothing}
         * @public
         */
        this.setPosition = function (_position) {
            position = _position;
        };

        /**
         * Getter for attributes
         * @method getAttributes
         * @return {Array} attributes of the creature
         * @public
         */
        this.getAttributes = function () {
            return attributes;
        };

        //If no options have been passed, create an empty dict
        if (_opts === undefined) {
            _opts = {};
        }
            
        //Initialize the attributes
        attributes = new mAttributes.Attributes(_opts.attributes);
    }
    
    /**
     * Return an attribute of the creature
     * @method getAttribute
     * @param {String} _name name of the attribute to find
     * @return {Object} attribute or undefined if not found
     * @public
     */
    Creature.prototype.getAttribute = function (_name) {
        return this.getAttributes().get(name);
    };
   
    /**
     * Make a creature attack another one to inflict damages
     * @method attack
     * @param {Object} _creature the target to attack
     * @return {Nothing}
     * @public
     */
    Creature.prototype.attack = function (_creature) {

        var dmg = this.getAttribute(mAttributeType.DMG);
  
        //Get a random value between min and max of dmg
        var rand = mFightUtils.rand(dmg.min, dmg.val);
        
        var criticalHit = false;
        
        if (rand === dmg.val) {
            criticalHit = true;
        }
        
        //Final damage amount
        var finalDmg = rand;
        
        //Inflict the damages
        if (! this.isDead()) {
            _creature.takeDamage(finalDmg);
        }

        var out =
            "\t " +
            this.getName() +
            "[" +
            this.getAttribute(mAttributeType.HP) +
            "] inflicted " +
            finalDmg +
            " dmg points";
        
        if (criticalHit) {
            out += " (CRITICAL HIT)";
        }

        out +=
            " to " +
            _creature.getName() +
            "[" +
            _creature.getAttribute(mAttributeType.HP) +
            " left]";
        
        return out;
    };
   
    /**
     * Manage the result of the attack when a creature is 
     * being attacked (take damage, dodge, ...)
     * @method takeDamage
     * @param {Number} _dmg amount of damage to take
     * @return {Nothing}
     * @public
     */
    Creature.prototype.takeDamage = function (_dmg) {
        //Test for dodging the attack
        var dexterity = this.getAttr(mAttributeType.DEXTERITY);
        
        if (dexterity !== undefined) {
            //Every 2 points of dexterity, 
            // there is 1% chance to dodge the attack
            var result = Math.floor(dexterity.getValue() / 2);
            var chance = mFightUtils.chance(result);
        
            if (chance) {
                return this.getName() + " dodged the attack !!";
            }
        }
        
        this.getAttribute(mAttributeType.HP).decrease(_dmg);
    };
   
    /**
     * Helper method to determine if the creature is dead or not
     * @method isDead
     * @return {Boolean} true if dead, false otherwise
     * @public
     */
    Creature.prototype.isDead = function () {
        return (this.getAttribute(mAttributeType.HP).getValue() === 0);
    };
   
    /**
     * Applies a bonus on one of the creature's attribute
     * @method updateAttribute
     * @param {Object} _bonus bonus to apply
     * @return {Nothing}
     * @public
     */
    Creature.prototype.updateAttribute = function (_bonus) {
        var attr = this.getAttribute(_bonus.getName());
        if (attr !== undefined) {
            attr.addBonus(_bonus);
        }
    };
    
    /**
     * Move the creature from its current position to a new one
     * @method move
     * @param {Object} _position new position to move to
     * @return {Nothing}
     * @public
     */
    Creature.prototype.move = function (_position) {
        var currentPosition = this.getPosition();

        if (currentPosition.isDark()) {
            throw new Error(
                "You cannot find your way in the dark !"
            );
        }
        
        if (currentPosition.hasMonsters()) {
            throw new Error(
                "Monster(s) are blocking the way !"
            );
        }
        
        this.setPosition(_position);
    };
     
   
    /**
     * The creature will use an item on a target
     * @method use
     * @param {Object} _target target
     * @param {Object} _item   item to use on the target
     * @return {Boolean} true if success, false if error/failure
     * @public
     */
    Creature.prototype.use = function (_target, _item) {
        return _item.use(this, _target);
    };
    
    /**
     * Returns a string representation of a creature
     * @method toString
     * @return {String} return the name and the attributes
     * @public
     */
    Creature.prototype.toString = function () {
        return this.getName() +
            " >> " +
            this.getAttributes().toString();
    };
    
    /**
     * Returns a JSON representation of a creature
     * @method toJson
     * @return {String} JSON representation of this creature
     * @public
     */
    Creature.prototype.toJson = function () {
        return JSON.stringify(this);
    };

    return {Creature : Creature};
});

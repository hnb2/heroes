/**
 * Inherits of Creature.
 * @class Monster
 * @author Pierre Guillemot
 */
define(["models/creature"], function (mCreature) {

    /**
     * Constructor
     * @method Monster
     * @param {Number} _id   id of the monster
     * @param {String} _name name of the monster
     * @param {Object} _opts options
     * @return {Nothing}
     * @public
     */
    function Monster(_id, _name, _opts) {
        mCreature.Creature.call(this, _id, _name,  undefined, _opts);
    }
    
    //Monster inherits of Creature
    Monster.prototype = new mCreature.Creature();
    
    //Set the constructor
    Monster.prototype.constructor = Monster;
    
    return {Monster : Monster};
});

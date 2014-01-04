/**
 * A bonus is an attribute which applies to another. For instance:
 * A dexterity bonus applies on the dexterity attribute.
 * Inherits of BaseAttribute.
 * @class Bonus
 * @author Pierre Guillemot
 */
define(["models/baseAttribute"], function (mBaseAttribute) {

    /**
     * Constructor
     * @method Bonus
     * @param {String} _name  name of the bonus
     * @param {Number} _value value of the bonus
     * @return {Nothing}
     * @public
     */
    function Bonus(_name, _value) {
        //Calls the parent constructor
        mBaseAttribute.BaseAttribute.call(this, _name, _value);
    }
    
    Bonus.prototype = Object.create(mBaseAttribute.BaseAttribute.prototype);
    Bonus.prototype.constructor = Bonus;
    
    return {Bonus : Bonus};
});

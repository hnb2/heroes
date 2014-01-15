/**
 * Inherits of Base Attribute, wrapps the access to the value.
 * @class Attribute
 * @author Pierre Guillemot
 */
define(["models/baseAttribute"], function (mBaseAttribute) {

    /**
     * Constructor
     * @method Attribute
     * @param {String} _name  name of the attribute
     * @param {Number} _value value of the attribute
     * @param {Object} _opts  options
     * @return {Nothing}
     * @public
     */
    function Attribute(_name, _value, _opts) {
        //Calls the Base Attribute constructor
        mBaseAttribute.BaseAttribute.call(this, _name, _value);
       
        /**
         * Original value of the attribute
         * @property originalValue
         * @type Object
         */
        var originalValue = this.getValue();
   
        //If no options are set, create an empty dict 
        if (_opts === undefined) {
            _opts = {};
        }
        
        /**
         * Minimum value allowed for this attribute. Default on 0.
         * @property min
         * @type Number
         * @default 0
         */
        var min = _opts.min || 0;

        /**
         * Maximum value allowed for this attribute. Is optionnal.
         * @property max
         * @type Number
         */
        var max = _opts.max || undefined;
        
        /**
         * Array of bonuses the Attribute has
         * @property bonuses
         * @type Array
         */
        var bonuses = _opts.bonuses || [];

        /**
         * Getter for min
         * @method getMin
         * @return {Number} the minimun value of this attribute
         * @public
         */
        this.getMin = function () {
            return min;
        };

        /**
         * Getter for max
         * @method getMax
         * @return {Number} the maximun value of this attribute,
         * returns undefined if not set (constructor behaviour)
         * @public
         */
        this.getMax = function () {
            return max;
        };

        /**
         * Getter for bonuses
         * @method getBonuses
         * @return {Array} array of bonuses
         * @public
         */
        this.getBonuses = function () {
            return bonuses;
        };

        /**
         * Wrapper for setting the value of the attribute.
         * It will take in account the minimun and maximum values.
         * @method setVal
         * @param {String} _value new value of the attribute
         * @return {Nothing}
         * public
         */
        this.setVal = function (_value) {
            //If the new value is greater than the minimun allowed
            if (_value >= this.getMin()) {
                //If there is a maximum defined
                if (this.getMax() !== undefined) {
                    if (_value < this.getMax()) {
                        this.setValue(_value);
                    } else {
                        this.setValue(this.getMax());
                    }
                } else { //If not
                    this.setValue(_value);
                }
            } //If the value if less than the minimum allowed
            else if (_value < this.getMin()) {
                //Set the value as the minimum
                this.setValue(this.getMin());
            }
        };
    }
    
    Attribute.prototype = Object.create(mBaseAttribute.BaseAttribute.prototype);
    Attribute.prototype.constructor = Attribute;
       
    //TODO: find out what this is for  
    Attribute.prototype.increaseCoeff = function (coeff) {
        this.setVal(this.val + (this.val *= coeff));
    };
    
    //TODO: find out what this is for  
    Attribute.prototype.decreaseCoeff = function (coeff) {
        this.setVal(this.val - (this.val *= coeff));
    };
   
    /**
     * Increase the value of the attribute by _value, will take
     * the absolute value of the parameter to make sure the
     * value if positive.
     * @method increase
     * @param {Number} _number number to add to the value
     * @return {Nothing}
     * @public
     */
    Attribute.prototype.increase = function (_number) {
        this.setVal(this.getValue() + Math.abs(_number));
    };
    
    /**
     * Decrease the value of the attribute by _value.
     * @method increase
     * @param {Number} _number number to subtract to the value
     * @return {Nothing}
     * @public
     */
    Attribute.prototype.decrease = function (_number) {
        this.setVal(this.getValue() - _number);
    };
    
    /**
     * Reset the value of the attribute to its original one.
     * @method reset
     * @return {Nothing}
     * @private
     */
    Attribute.prototype._reset = function () {
        this.setValue(this.getOriginalValue());
    };
   
    /**
     * Add a bonus to the attribute
     * @method addBonus
     * @param {Object} _bonus bonus to apply to the attribute
     * @return {Nothing}
     * @public
     */
    Attribute.prototype.addBonus = function (_bonus) {
        //Add the bonus
        //TODO: Create a class Bonuses similar to Attributes
        this.getBonuses().push(_bonus);

        //Calculate the effect of the bonuses
        this.calculateBonus();
    };
    
    //TODO: Review and test 
    Attribute.prototype.removeBonus = function (bonus) {
        //TODO: Create a class Bonuses similar to Attributes
       //TODO: implement 

        //Calculate the effect of the bonuses
        this.calculateBonus();
    };
    
    /**
     * Calculate the bonuses effect and apply it to the attribute
     * @method calculateBonus
     * @return {Nothing}
     * @public
     */
    Attribute.prototype.calculateBonus = function () {
        var self = this;

        this.getBonuses().forEach(function (bonus) {
            self.increase(bonus.getValue());
        });
    };
    
    /**
     * Return a string representation of the Attribute
     * @method toString
     * @return {String} name and valuem plus the maximum allowed
     * value as a string
     * @public
     */
    Attribute.prototype.toString = function () {
        //TODO: is it possible to exploit the parent toString ?
        var out = this.getName() + " : " + this.getValue();
        
        //Check if the maximum if defined
        if (this.getMax() !== undefined) {
            out += "/" + this.getMax();
        }
            
        return out;
    };
    
    /**
     * Return a json representation of the Base attribute
     * @method toJson
     * @return {String} fields of the attribute as JSON
     * @public
     */
    Attribute.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    
    return {
        Attribute : Attribute
    };
});

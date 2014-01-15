/**
 * Basic attribute, it is a simple key/value object
 * with getters and setters
 * @class BaseAttribute
 * @author Pierre Guillemot
 */
define([], function () {

    
    /**
     * Constructor 
     * @method BaseAttribute
     * @param {String} _name   name of the attribute
     * @param {String} _value  value of the attribute
     * @return {Nothing}
     * @public
     */
    function BaseAttribute(_name, _value) {
        /**
         * Name of the attribute
         * @property name
         * @type String
         */
        var name;

        /**
         * Value of the attribute
         * @property value
         * @type Number
         */
        var value;

        /**
         * Getter for the value
         * @method getValue
         * @return {Number} the value of the attribute
         * @public
         */
        this.getValue = function () {
            return value;
        };

        /**
         * Setter for the value
         * @method setValue
         * @param {Number} _value the new value of the attribute
         * return {Nothing}
         * @public
         */
        this.setValue = function (_value) {
            value = _value;
        };
        
        /**
         * Getter for the name
         * @method getName
         * @return {String} the name of the attribute
         * @public
         */
        this.getName = function () {
            return name;
        };

        /**
         * Setter for the name
         * @method setName
         * @param {String} _name the new name of the attribute
         * @return {Nothing}
         * @public
         */
        this.setName = function (_name) {
            name = _name;
        };

        //Set the name and value
        this.setName(_name);
        this.setValue(_value);
    }
        
    /**
     * Return a string representation of the Base attribute
     * @method toString
     * @return {String} name and value as a string
     * @public
     */
    BaseAttribute.prototype.toString = function () {
        return this.getName() + " : " + this.getValue();
    };
    
    /**
     * Return a json representation of the Base attribute
     * @method toJson
     * @return {String} name and value as JSON
     * @public
     */
    BaseAttribute.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    
    return {
        BaseAttribute : BaseAttribute
    };
});

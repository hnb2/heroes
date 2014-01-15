/**
 * Base Item class
 * @class Item
 * @author Pierre Guillemot
 */
define([], function () {

    /**
     * Constructor
     * @method Item
     * @param {Number} _id          Id of the item 
     * @param {String} _name        name of the item
     * @param {String} _description description of the item
     * @param {Number} _value       value of the item
     * @return {Nothing}
     * @public
     */
    function Item(_id, _name, _description, _value) {
        /**
         * Unique identifier of the item
         * @property id
         * @type Number
         */
        var id;

        /**
         * Name of the item
         * @property name
         * @type String
         */
        var name;

        /**
         * Description of the item, is optionnal
         * @property description
         * @type String
         */
        var description;

        /**
         * Value of the item
         * @property value
         * @type Number
         */
        var value;

        /**
         * Getter for id
         * @method getId
         * @return {Number} the ID of the item
         * @public
         */
        this.getId = function () {
            return id;
        };

        /**
         * Getter for name
         * @method getName
         * @return {String} the name of the item
         * @public
         */
        this.getName = function () {
            return name;
        };

        /**
         * Getter for description
         * @method getDescription
         * @return {String} the description of the item
         * @public
         */
        this.getDescription = function () {
            return description;
        };

        /**
         * Getter for value
         * @method getValue
         * @return {Number} the value of the item
         * @public
         */
        this.getValue = function () {
            return value;
        };

        //TODO: use setters
        id = _id;
        name = _name;
        description = _description;
        value = _value;
    }
   
    /**
     * Return a string representation of the Item
     * @method toString
     * @return {String} id, name, description and value of the item
     * @public
     */
    Item.prototype.toString = function () {
        return "[" +
            this.getId() +
            "] " +
            this.getName() +
            " : " +
            this.getDescription() +
            " Worth " +
            this.getValue() +
            " gold coins.";
    };
    
    return {Item : Item};

});

/**
 * Define a position in the map
 * @class Position
 * @author Pierre Guillemot
 */
define(["models/attributes", "models/attributeType"],
    function (mAttributes, mAttributeType) {
   
    /**
     * Constructor
     * @method Position
     * @param {Number} _id          ID of the position
     * @param {Array}  _to          Array of next positions' IDs
     * @param {String} _name        name of the position
     * @param {String} _description description of the position
     * @param {Object} _opts        options
     * @return {Nothing}
     * @public
     */
    function Position(_id, _to, _name, _description, _opts) {

        /**
         * Unique identifier of the position
         */
        var id;

        /**
         * Array of identifier of next positions
         */
        var to;

        /**
         * Name of the position
         */
        var name;

        /**
         * Description of the position
         */
        var description;
       
        /**
         * Array of monsters located at this position
         */
        var monsters;

        /**
         * Array of items located at this position
         */
        var items;

        /**
         * Attributes of the position
         * e.g: locked, dark, ...
         */
        var attributes;

        /**
         * Getter for id
         * @method getId
         * @return {Number} ID of the position
         * @public
         */
        this.getId = function () {
            return id;
        };

        /**
         * Getter for to
         * @method getTo
         * @return {Array} Array of Ids of the next positions
         * @public
         */
        this.getTo = function () {
            return to;
        };

        /**
         * Getter for name
         * @method getName
         * @return {String} name of the position
         * @public
         */
        this.getName = function () {
            return name;
        };

        /**
         * Getter for description
         * @method getDescription
         * @return {String} Description of the position
         * @public
         */
        this.getDescription = function () {
            return description;
        };

        /**
         * Getter for monsters
         * @method getMonsters
         * @return {Array} Array of monsters ID
         * @public
         */
        this.getMonsters = function () {
            return monsters;
        };

        /**
         * Getter for items
         * @method getItems
         * @return {Array} Array of items ID
         * @public
         */
        this.getItems = function () {
            return items;
        };

        /**
         * Getter for attributes
         * @method getAttributes
         * @return {Array} Array of attributes
         * @public
         */
        this.getAttributes = function () {
            return attributes;
        };

        if (_opts === undefined) {
            _opts = {};
        }

        id = _id;
        to = _to;
        name = _name;
        description = _description;

        monsters = _opts.monsters || [];
        items = _opts.items || [];
        attributes = new mAttributes.Attributes(_opts.attributes);
    }
    
    /**
     * Return an attribute of the position by name
     * @method getAttribute
     * @param {String} _name name of the attribute to find
     * @return {Object} an attribute if found, undefined otherwise
     * @public
     */
    Position.prototype.getAttribute = function (_name) {
        return this.getAttributes().get(_name);
    };
   
    /**
     * Update an attribute by applying a bonus
     * @method updateAttribute
     * @param {Object} _bonus bonus to apply
     * @return {Nothing}
     * @public
     */
    Position.prototype.updateAttribute = function (_bonus) {
        var attr = this.getAttribute(_bonus.getName());
        if (attr !== undefined) {
            attr.addBonus(_bonus);
        }
    };
   
    /**
     * Helper method to determine if a position is "Dark" or not
     * @method isDark
     * @return {Boolean} true if is dark, false otherwise
     * @public
     */
    Position.prototype.isDark = function () {
        var light = this.getAttribute(mAttributeType.LIGHT);
        
        return (light !== undefined && light.getVal() === 0);
    };
    
    /**
     * Check if the position has monsters
     * @method hasMonsters
     * @return {Boolean} true if has monsters, false otherwise
     * @public
     */
    Position.prototype.hasMonsters = function () {
        //TODO: create a util method for this kind of things
        return this.getMonsters() !== undefined  &&
            this.getMonsters().length > 0;
    };
 
    /**
     * Check if the position has items
     * @method hasItems
     * @return {Boolean} true if has items, false otherwise
     * @public
     */
    Position.prototype.hasItems = function () {
        return this.getItems() !== undefined &&
            this.getItems().length > 0;
    };

    /**
     * Return a string representation of the position
     * @method toString
     * @return {String} all the information about the position
     * @public
     */
    Position.prototype.toString = function () {
        var out = this.isDark() ? "[DARK] " : "";
        
        out +=
            this.getName() +
            " : " +
            this.getDescription() +
            " You can move to : " +
            this.getTo() +
            ".";
        
        if (this.hasMonsters()) {
            out +=
                "\t " +
                this.getMonsters().length +
                " monster(s) : " +
                this.getMonsters() +
                ".";
        }
        
        if (this.hasItems()) {
            out +=
                "\t " +
                this.getItems().length +
                " items(s) : " +
                this.getItems() +
                ".";
        }
        
        return out;
    };
    
    return {Position : Position};
});

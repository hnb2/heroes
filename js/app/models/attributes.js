/**
 * Array of Attribute, is used as a wrapper to access them
 * @class Attributes
 * @author Pierre Guillemot
 */
define([], function () {

    /**
     * Constructor
     * @method Attributes
     * @param {Object} _opts options
     *
     *
     */
    function Attributes(_opts) {
        /**
         * Array of attributes
         */
        var attributes = [];
        
        /**
         * Getter for attributes
         * @method getAttributes
         * @return {Array} all the attributes
         * @public
         */
        this.getAttributes = function () {
            return attributes;
        };

        if (_opts !== undefined) {
            //TODO: Proxy this
            var self = this;
            _opts.forEach(function (attribute) {
                self.add(attribute);
            });
        }
    }
    
    /**
     * Add or update an attribute
     * @method add
     * @param {Object} _attribute attribute to add or update
     * @return {Nothing}
     * @public
     */
    Attributes.prototype.add = function (_attribute) {
        this.set(_attribute);
    };
    
    /**
     * Finds an attribute based on its name
     * @method get
     * @param {String} _name name of the attribute to find
     * @return {Object} the attribute if found, undefined otherwise
     * @public
     */
    Attributes.prototype.get = function (_name) {
        //TODO: optimize this 
        for (var i = 0; i < this.getAttributes().length; i++) {
            var currentAttribute = this.getAttributes()[i];
            if (currentAttribute.getName() === _name) {
                return currentAttribute;
            }
        }
        
        return undefined;
    };
   
    /**
     * TODO: change the name
     * Add or update an attribute in the array
     * @method set
     * @param {Object} _attribute the attribute to add or update
     * @return {Nothing}
     * @public
     */
    Attributes.prototype.set = function (_attribute) {
        //Validate the attribute
        if (_attribute === undefined) {
            throw new Error(
                "Error, the attribute is undefined !"
            );
        }
   
        //Retrieve the attribute 
        var ref = this.get(_attribute.getName());
        
        if (ref === undefined) {
            this.getAttributes().push(_attribute);
        } else {
            //TODO: implement
            throw new Error("Not yet implemented !");
        }
    };

    /**
     * Returns a string representation of all the attributes in the array
     * @method toString
     * @return {String} a string representation of every attributes
     * @public
     */
    Attributes.prototype.toString = function () {
        var delimiter = " || ";
        var out = "";

        this.getAttributes().forEach(function (attribute) {
            out += attribute.toString();
            out += delimiter;
        });
        
        //Remove the extra delimiter
        out = out.substr(
            0,
            out.length - delimiter.length
        );
        
        return out;
    };
    
    /**
     * Return a json representation of Attributes
     * @nethod toJson
     * @return {String} JSON representation of all the attributes in the array
     * @public
     */
    Attributes.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    
    return {
        Attributes : Attributes
    };
});

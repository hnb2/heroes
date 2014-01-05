/**
 * Loads the map JSON file into an object and retrieve positions
 * @class Map
 * @author Pierre Guillemot
 */
define(
["ext/xhr", "models/position", "models/attribute", "models/bonus"],
function (mXhr, mPosition, mAttribute, mBonus) {

    /**
     * Constructor
     * @method Map
     * @return {Nothing}
     * @public
     */
    function Map() {
        /**
         * Holds the positions from the map JSON file
         */
        var map = [];

        /**
         * Getter for map
         * @method getMap
         * @return {Array} the array of positions
         * @public
         */
        this.getMap = function () {
            return map;
        };
    }
   
    /**
     * Loads the map file into an object
     * @method loadMap
     * @param {String} _fileName name of the json map file
     * @return {Nothing}
     * @public
     */
    Map.prototype.loadMap = function (_fileName) {
        var self = this;

        //Async load the map file
        return mXhr("Get", "data/" + _fileName + ".json").then(function (success) {
            var rootObject = JSON.parse(success.responseText);
            
            //Loop on all the positions
            rootObject.path.forEach(function (item) {

                //Get the attributes
                var attributes = [];
                if (item.attributes) {
                
                    item.attributes.forEach(function (attr) {
                    
                        //Bonuses first
                        var bonuses = [];
                        if (attr.bonuses) {
                            attr.bonuses.forEach(function (bonus) {
                                //Create bonuses
                                bonuses.push(
                                    new mBonus.Bonus(bonus.name, bonus.val)
                                );
                            });
                        }
                        
                        //Create attributes
                        attributes.push(
                            new mAttribute.Attribute(
                                attr.name,
                                attr.val,
                                {
                                    min: attr.min,
                                    max: attr.max,
                                    bonuses: bonuses
                                }
                            )
                        );
                    });
                }

                //Finally create positions
                self.getMap().push(
                    new mPosition.Position(
                        item.id,
                        item.to,
                        item.name,
                        item.desc,
                        {
                            monsters: item.monsters,
                            items: item.items,
                            attributes: attributes
                        }
                    )
                );
            });
            
            return success.response;
        },
        function (error) {
            console.log(error);
            
            return error.response;
        });
    };
   
    /**
     * Return the first position of the map. Used to initialize
     * the hero when launching the game.
     * @method getFirstPosition
     * @return {Object} Position object
     * @public
     */
    Map.prototype.getFirstPosition = function () {
        return this.getMap()[0];
    };
   
    /**
     * Return a position in the map based on its ID
     * @method getPosition
     * @param {Number} _id id of the position
     * @return {Object} Position if found, undefined otherwise
     * @public
     */
    Map.prototype.getPosition = function (_id) {
        for (var i = 0; i < this.getMap().length; i++) {
            var currentPosition = this.getMap()[i];
            if (currentPosition.getId() === _id) {
                return currentPosition;
            }
        }
        
        return undefined;
    };
    
    return {Map : Map};
});

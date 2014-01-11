/**
 * Inherits of Creature, represents the player.
 * @class Hero
 * @author Pierre Guillemot
 */
define(["models/creature"], function (mCreature) {

    /**
     * Constructor
     * @method Hero
     * @param {String} _name name of the hero
     * @param {Object} _opts options
     * @return {Nothing}
     * @public
     */
    function Hero(_name, _opts) {
        mCreature.Creature.call(this, 0, _name,  undefined, _opts);
        
        /**
         * A bag which contains items
         */
        var inventory = [];

        /**
         * Getter for inventory
         * @method getInventory
         * @return {Array} array of items of the hero
         * @public
         */
        this.getInventory = function () {
            return inventory;
        };
    }
    
    //Hero inherits of Creature
    Hero.prototype = Object.create(mCreature.Creature.prototype);
    
    //Set the constructor
    Hero.prototype.constructor = Hero;
    
    /**
     * Return an item from the inventory
     * TODO: put this in a separate class
     * @method getItem
     * @param {Number} _id id of the item
     * @return {Object} item if found, else undefined
     * @public
     */
    Hero.prototype.getItem = function (_id) {
        for (var i = 0; i < this.getInventory().length; i++) {
            var currentItem = this.getInventory()[i];
            if (currentItem.id === _id) {
                return currentItem;
            }
        }
        
        return undefined;
    };
    
    /**
     * Add an item to the inventory
     * TODO: should be put in a separate class
     * @method take
     * @param {Object} _item the item to add in the inventory
     * @return {Nothing}
     * @public
     */
    Hero.prototype.take = function (_item) {
        this.getInventory().push(_item);
        
        return _item.getName() + " has been added to the bag";
    };
    
    /**
     * Return the name of the hero to display in the view
     * @method getDisplayName
     * @return {String} Gives a default name if not set, else the name
     * @public
     */
    Hero.prototype.getDisplayName = function () {
        var heroName = this.getName();
        if (heroName === undefined) {
            heroName = "The one without a name";
        }

        return heroName;
    };

    return {Hero : Hero};
});

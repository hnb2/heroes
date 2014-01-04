/**
 * Inherits of Item, represents an item you can use like a key or
 * a torch for instance.
 * @class ActionItem
 * @author Pierre Guillemot
 */
define(["models/item"], function (mItem) {

    function ActionItem(_id, _name, _description, _value, _opts) {
        mItem.Item.call(this, _id, _name, _description, _value);
       
        //Bonuses given by the item 
        this.bonuses = [];
            
        if (_opts !== undefined) {
        
            //Bonuses
            if (_opts.bonuses !== undefined) {
                var self = this;
                _opts.bonuses.forEach(function (item) {
                    self.bonuses.push(item);
                });
            }
            
            //Position constraint
            this.constraint = _opts.constraint;
        }
    }
    
    ActionItem.prototype = Object.create(mItem.Item.prototype);
    ActionItem.prototype.constructor = ActionItem;
   
    /**
     * Uses an action itemm needs a source and a target.
     * e.g: the hero uses a key on a door, or a torch in a room
     * @method use
     * @param {Object} _source Creature type
     * TODO: check the _target parameter
     * @param {Object} _target Not sure anymore ...
     * @return {Nothing}
     * @public
     */
    ActionItem.prototype.use = function (_source, _target) {
        this.bonuses.forEach(function (item) {
            _target.update(item);
        });
        
        var out = _source.getName() + " used " + this.getName();
        if (_source !== _target) {
            out += " on " + _target.getName();
        }

        return out;
    };
   
    /**
     * Returns a JSON representation of the ActionItem
     * @method toJson
     * @return {String} a JSON representation of the action item
     * @public
     */
    ActionItem.prototype.toJson = function () {
        return JSON.stringify(this);
    };
    
    return {ActionItem : ActionItem};

});

/**
 * "inventory" returns information about all the items in the
 * bag of the hero.
 * @class InventoryCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/inventoryView"],
    function (mCommand, mInventoryView) {

    /**
     * Constructor
     * @method InventoryCommand
     * @return {Nothing}
     * @public
     */
    function InventoryCommand() {
        mCommand.Command.call(this,
            'inventory',
            'Check your bag',
            undefined,
            'dom'
        );
    }
    
    InventoryCommand.prototype = Object.create(mCommand.Command.prototype);
    InventoryCommand.prototype.constructor = InventoryCommand;
    
    /**
     * Returns information about all the items in the inventory
     * of the hero.
     * @method exec
     * @param {Array}  _args    is empty here
     * @param {Object} _context contains the environment
     * @return {Object} view object
     * @public
     */
    InventoryCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
        
        //Get the content of the inventory of the hero    
        var bag = env.hero.getInventory();
        
        return mInventoryView.inventorySuccess(bag);
    };
    
    return {InventoryCommand: InventoryCommand};
});

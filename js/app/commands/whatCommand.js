/**
 * "what <id>: returns information about an item"
 * @class WhatCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/whatView"],
    function (mCommand, mWhatView) {

    /**
     * Constructor
     * @method WhatCommand
     * @return {Nothing}
     * @public
     */
    function WhatCommand() {
        mCommand.Command.call(this,
            'what',
            'Get information about an item',
            [
                {
                    name: 'id',
                    type: 'number',
                    description: 'The id of the item'
                }
            ],
            'dom'
        );
    }
    
    WhatCommand.prototype = Object.create(mCommand.Command.prototype);
    WhatCommand.prototype.constructor = WhatCommand;
   
    /**
     * Returns information about an item
     * @method exec
     * @param {Array}  _args    id: id of the item to get info
     * @param {Object} _context contains the environment
     * @return {Object} view object
     * @public
     */
    WhatCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
    
        //Get the current position
        var currentPosition = env.hero.getPosition();
        
        //Get the ID from the arguments
        var itemId = _args.id;

        if (currentPosition.hasItems() &&
            currentPosition.getItems().indexOf(itemId) !== -1) {
            //Get the item
            var item = env.items.getItem(itemId);
            
            return mWhatView.whatSuccess(item);
        }
    
        return mWhatView.whatError();
    };
    
    return {WhatCommand: WhatCommand};
});

/**
 * "take <id>" takes an item and put it inside the hero
 * 's inventory.
 * @class TakeCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/takeView"],
    function (mCommand, mTakeView) {

    /**
     * Constructor
     * @method TakeCommand
     * @return {Nothing}
     * @public
     */
    function TakeCommand() {
        mCommand.Command.call(this,
            'take',
            'Take an item',
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
    
    TakeCommand.prototype = Object.create(mCommand.Command.prototype);
    TakeCommand.prototype.constructor = TakeCommand;
    
    /**
     * Takes an item into the hero's inventory
     * @method exec
     * @param {Array}  _args    id: id of the item to use
     * @param {Object} _context contains the environment
     * @return {Object} view object
     * @public
     */
    TakeCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
    
        //Get the current position of the hero
        var currentPosition = env.hero.getPosition();
        
        //Get the ID of the item to take
        var itemId = _args.id;

        //Position of the item in the array
        var itemIndex = currentPosition.getItems().indexOf(itemId);

        if (currentPosition.hasItems() && itemIndex !== -1) {
            //Get the item
            var item = env.items.getItem(itemId);
            
            //Check for monsters
            if (currentPosition.hasMonsters()) {
                return mTakeView.takeImpossible();
            }

            //We remove it from the position
            currentPosition.getItems().splice(itemIndex, 1);
            
            return mTakeView.takeSuccess(env.hero, item);
        }

        //Cannot find the item
        return mTakeView.takeError();
    };
    
    return {TakeCommand: TakeCommand};
});

/**
 * "who <id>" command will return information about a creature
 * @class WhoCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/whoView"],
    function (mCommand, mWhoView) {

    /**
     * Constructor 
     * @method WhoCommand
     * @return {Nothing}
     * @public
     */
    function WhoCommand() {
        mCommand.Command.call(this,
            'who',
            'Get information about a creature',
            [
                {
                    name: 'id',
                    type: 'number',
                    description: 'The id of the creature'
                }
            ],
            'out'
        );
    }
    
    WhoCommand.prototype = Object.create(mCommand.Command.prototype);
    WhoCommand.prototype.constructor = WhoCommand;

    /**
     * Gets information about a creature in the current position
     * @method exec
     * @param {Array}  _args    id: id of the creature to get info
     * @param {Object} _context contains the environment
     * @return {Object} view object
     * @public
     */
    WhoCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
    
        //Get the current position
        var currentPosition = env.hero.getPosition();
       
        //Get the creature ID from the argument of the command 
        var creatureId = _args.id;

        //Check if the creature is present in the current position 
        if (currentPosition.hasMonsters() &&
                currentPosition.getMonsters().indexOf(creatureId) !== -1) {

            //Get the monster
            var monster = env.monsters.getMonster(creatureId);

            return mWhoView.whoSuccess(monster);
        }
        
        return mWhoView.whoError();
    };
    
    return {WhoCommand: WhoCommand};
});

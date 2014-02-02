/**
 * "move <id>" command, make the hero move from one point
 * to an adjacent one.
 * @class MoveCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/moveView"],
    function (mCommand, mMoveView) {

    /**
     * Constructor
     * @method MoveCommand
     * @return {Nothing}
     * @public
     */
    function MoveCommand() {
        mCommand.Command.call(
            this,
            'move',
            'Move to a destination',
            [
                {
                    name: 'id',
                    type: 'number',
                    description: 'The id of the location to go'
                }
            ],
            'out'
        );
    }
    
    MoveCommand.prototype = Object.create(mCommand.Command.prototype);
    MoveCommand.prototype.constructor = MoveCommand;
   
    /**
     * Moves the hero from one point to the other if possible,
     * takes in account the current position status (dark, monsters))
     * @method exec
     * @param {Array} _args     id: id of the location to go to
     * @param {Object} _context contains the environment
     * @return {Object} view object
     * @public
     */
    MoveCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
        
        //Get the hero current position
        var currentPosition = env.hero.getPosition();
        
        //Get the ID of the choosen position
        var positionId = _args.id;

        //If the next position is part of the available path 
        // of the current position, go on.
        var nextPosition;
        if (currentPosition.getTo().indexOf(positionId) !== -1) {
            nextPosition = env.map.getPosition(positionId);
        }
        
        //If the position has not been found
        if (nextPosition === undefined) {
            return mMoveView.moveError(env.hero);
        }
 
        //Dark
        if (currentPosition.isDark()) {
            return mMoveView.positionIsDark();
        }

        //Monsters    
        if (currentPosition.hasMonsters()) {
            return mMoveView.positionHasMonsters();
        }

        //Successful move
        var view = mMoveView.moveSuccess(
            env.hero,
            currentPosition,
            nextPosition
        );

        //Move the hero
        env.hero.move(nextPosition);
    
        return view;
    };
    
    return {MoveCommand: MoveCommand};
});

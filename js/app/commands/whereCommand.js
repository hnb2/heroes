/**
 * "where" command, will return information about the position
 * @class WhereCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/whereView"],
    function (mCommand, mWhereView) {

    /**
     * Constructor
     * @method WhereCommand
     * @return {Nothing}
     * @public
     */
    function WhereCommand() {
        mCommand.Command.call(
            this,
            'where',
            'Check what is around you',
            undefined,
            'out'
        );
    }
    
    WhereCommand.prototype = Object.create(mCommand.Command.prototype);
    WhereCommand.prototype.constructor = WhereCommand;
   
    /**
     * Return information about the current position of the hero
     * @method exec
     * @param {Array} _args     no arguments for this command
     * @param {Object} _context contains the hero
     * @return {Object} View
     * @public
     */
    WhereCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
        
        //Getting the position of the hero
        var position = env.hero.getPosition();
        
        return mWhereView.where(position);
    };
    
    return {WhereCommand: WhereCommand};
});

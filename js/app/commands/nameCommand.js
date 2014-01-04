/**
 * "name <name>" gives the hero a name, can only be used once.
 * @class NameCommand
 * @author Pierre Guillemot
 */
define(["commands/command"], function (mCommand) {

    /**
     * Constructor
     * @method NameCommand
     * @return {Nothing}
     * @public
     */
    function NameCommand() {
        mCommand.Command.call(
            this,
            'name',
            'Set your name !',
            [
                {
                    name: 'name',
                    type: 'string',
                    description: 'The name you chose to bear for eternity...'
                }
            ],
            'out'
        );
    }
    
    NameCommand.prototype = Object.create(mCommand.Command.prototype);
    NameCommand.prototype.constructor = NameCommand;
    
    /**
     * Allow the user to change name once
     * @method exec
     * @param {Object} _args    argument "name"
     * @param {Object} _context contains the environment
     * @return {Object} View
     * @public
     */
    NameCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
                    
        if (env.hero.getName() === undefined) {
            if (_args.name === undefined) {
                var content = [];
                content.push(
                    env.domHelper.createText(
                        "error",
                        "Please enter a valid name."
                    )
                );

                content.push(
                    env.domHelper.createCommand(
                        "name",
                        "name"
                    )
                );
                
                return env.domHelper.appendArray(content);
            } else {
                //Set the name
                env.hero.setName(_args.name);
        
                return env.domHelper.createText(
                    "name",
                    "Thou shall now be known as " +
                    env.hero.getName()
                );
            }
        } else {
            return env.domHelper.createText(
                "error",
                "It is too late for you " +
                env.hero.name +
                " !"
            );
        }
    };
    
    return {NameCommand: NameCommand};
});

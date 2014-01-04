/**
 * "whoami" This will return information about the hero
 * @class WhoAmICommand
 * @author Pierre Guillemot
 */
define(["commands/command"], function (mCommand) {

    /**
     * Constructor
     * @method WhoAmICommand
     * @return {Nothing}
     * @public
     */
    function WhoAmICommand() {
        mCommand.Command.call(
            this,
            'whoami',
            'It is about time you get to know yourself !',
            undefined,
            'out'
        );
    }
    
    WhoAmICommand.prototype = Object.create(mCommand.Command.prototype);
    WhoAmICommand.prototype.constructor = WhoAmICommand;
    
    WhoAmICommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;

        var content = [];

        if (env.hero.getName() === undefined) {
            content.push(
                env.domHelper.createText(
                    "info",
                    "You should pick a name !"
                )
            );

            content.push(
                env.domHelper.createCommand(
                    "name",
                    "name"
                    )
                );
        } else {
            content.push(
                env.domHelper.createText(
                    "info",
                    env.hero.getName()
                    )
                );
        }
        content.push(
            env.domHelper.createText(
                "info",
                ">> " +
                env.hero.getAttributes().toString()
                )
            );
        
        return env.domHelper.appendArray(content);
    };
    
    return {WhoAmICommand: WhoAmICommand};
});

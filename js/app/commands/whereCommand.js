/**
 * "where" command, will return information about the position
 * @class WhereCommand
 * @author Pierre Guillemot
 */
define(["commands/command"], function (mCommand) {

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
     * @return {Nothing}
     * @public
     */
    WhereCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
        
        //Getting the position of the hero
        var position = env.hero.getPosition();
        
        var content = [];
        
        //Dark
        if (position.isDark()) {
            content.push(
                env.domHelper.createText(
                    "dark",
                    "[DARK]"
                )
            );
        }

        //Basic description
        content.push(
            env.domHelper.createText(
                "info",
                position.getName() + " : " + position.getDescription()
            )
        );
        
        //Directions
        content.push(
            env.domHelper.createText(
                "info",
                "You can move to :"
            )
        );

        position.getTo().forEach(function (toPosition) {
            content.push(
                env.domHelper.createCommand(
                    "move " + toPosition,
                    toPosition
                )
            );
        });
        
        //Monsters
        if (position.hasMonsters()) {
            var monsters = position.getMonsters();

            content.push(
                env.domHelper.createText(
                    "info",
                    monsters.length +
                    " monster:"
                )
            );

            monsters.forEach(function (monster) {
                content.push(
                    env.domHelper.createCommand(
                        "who " + monster,
                        monster
                    )
                );
            });
        }
        
        //Items
        if (position.hasItems()) {
            var items = position.getItems();

            content.push(
                env.domHelper.createText(
                    "info",
                    items.length + " items(s) :"
                )
            );

            items.forEach(function (item) {
                content.push(
                    env.domHelper.createCommand(
                        "what " + item,
                        item
                    )
                );
            });
        }
        
        return env.domHelper.appendArray(content);
    };
    
    return {WhereCommand: WhereCommand};
});

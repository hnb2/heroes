/**
 * "use <id> <target>" Use an item on a target
 * @class UseCommand
 * @author Pierre Guillemot
 */
define(["commands/command"], function (mCommand) {

    /**
     * Constructor
     * @method UseCommand
     * @return {Nothing}
     * @public
     */
    function UseCommand() {
        mCommand.Command.call(this,
            'use',
            'Use an item',
            [
                {
                    name: 'id',
                    type: 'number',
                    description: 'The id of the item'
                },
                {
                    name: 'target',
                    type: 'string',
                    description: 'Which target (env, me, monster)'
                }
            ],
            'dom'
        );
    }
    
    UseCommand.prototype = Object.create(mCommand.Command.prototype);
    UseCommand.prototype.constructor = UseCommand;
    
    /**
     * Uses an item from the hero's inventory on a target
     * @method exec
     * @param {Array}  _args    id:id of the item in the hero's inventory
     *                          target: id of the targeted creature or
     *                          position.
     * @param {Object} _context contains the environment
     * @return {Object} View object
     * @public
     */
    UseCommand.prototype.exec = function (_args, _context) {
        //Creating a "shortcut"
        var env = _context.environment;
    
        //Get the hero's current position
        var currentPosition = env.hero.getPosition();

        //Get the Item ID from the argument
        var itemId = _args.id;

        //Get the identifier of the target
        var targetId = _args.target;

        //Get the item
        var item = env.hero.getItem(itemId);
        
        if (item === undefined) {
            return env.domHelper.createText("error", "Not found in your inventory !");
        }
        
        //Target identification
        var target;
        switch (targetId) {
            case "env":
                target = currentPosition;
                break;
            case "me":
                target = env.hero;
                break;
            default:
                target = env.hero;
        }
    
        //Check for constraints on the item
        if (item.constraint !== undefined) {
            if (item.constraint === currentPosition.getId()) {
                return env.domHelper.createText(
                    "action",
                    env.hero.use(target, item)
                );
            }

            return env.domHelper.createText(
                "error",
                "You cannot use this here !"
            );
        }

        return env.domHelper.createText(
            "action",
            env.hero.use(target, item)
        );
    };
    
    return {UseCommand: UseCommand};
});

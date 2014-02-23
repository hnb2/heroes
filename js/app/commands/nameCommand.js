/**
 * "name <name>" gives the hero a name, can only be used once.
 * @class NameCommand
 * @author Pierre Guillemot
 */
define(["commands/command", "views/nameView"],
    function (mCommand, mNameView) {

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

        if (_args.name === undefined) {
            return mNameView.nameError();
        }

        //If the hero name is not set yet
        if (env.hero.getName() === undefined) {
            //Set the name
            env.hero.setName(_args.name);

            return mNameView.nameSuccess(env.hero);
        }

        //If the hero name is already set
        return mNameView.nameAlreadySet(env.hero);
    };
    
    return {NameCommand: NameCommand};
});

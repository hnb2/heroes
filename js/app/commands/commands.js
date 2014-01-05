/**
 * Keeps a registry of all the available commands
 * @class Commands
 * @author Pierre Guillemot
 */
define(
[
    "commands/nameCommand",
    "commands/whereCommand",
    "commands/moveCommand",
    "commands/whoCommand",
    "commands/whoAmICommand",
    "commands/fightCommand",
    "commands/whatCommand",
    "commands/takeCommand",
    "commands/inventoryCommand",
    "commands/useCommand"
],
function (
    mNameCommand,
    mWhereCommand,
    mMoveCommand,
    mWhoCommand,
    mWhoAmICommand,
    mFightCommand,
    mWhatCommand,
    mTakeCommand,
    mInventoryCommand,
    mUseCommand
) {

    /**
     *
     */
    function Commands() {
        /**
         * Array which will contains all the commands
         */
        var commands = [];

        /**
         * Getter for commands
         * @method getCommands
         * @return {Array} commands
         * @public
         */
        this.getCommands = function () {
            return commands;
        };
        
        //Will keep a dictionnary of commands
        this.register(new mNameCommand.NameCommand());
        this.register(new mWhereCommand.WhereCommand());
        this.register(new mMoveCommand.MoveCommand());
        this.register(new mWhoCommand.WhoCommand());
        this.register(new mWhoAmICommand.WhoAmICommand());
        this.register(new mFightCommand.FightCommand());
        this.register(new mWhatCommand.WhatCommand());
        this.register(new mTakeCommand.TakeCommand());
        this.register(new mInventoryCommand.InventoryCommand());
        this.register(new mUseCommand.UseCommand());
    }
    
    /**
     * Adds a command inside the registry
     * @method register
     * @param {Object} _command a command to register
     * @return {Nothing}
     * @public
     */
    Commands.prototype.register = function (_command) {
        //Debug purpose
        console.log(_command.toString());

        //Add the command to the registry
        //TODO: should check for duplicates
        this.getCommands().push(_command);
    };
  
    return {Commands: Commands};
});
